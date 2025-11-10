<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ExerciceModel extends CI_Model
{
    protected $table = 'exercice';
    protected $primaryKey = 'id_exercice';

    public function __construct()
    {
        parent::__construct();
    }


    public function findAll()
    {
        $session = $this->session->userData();

        // Définition du niveau de l'élève si applicable
        $niveau_utilisateur = null;
        if ($session['role_id'] == 'student') {
            $niveau_utilisateur = $this->db
                ->select('n.*')
                ->from('inscription i')
                ->join('annee_scolaire a', 'a.id_annee_scolaire = i.annee_scolaire_id_annee_scolaire', 'inner')
                ->join('classe c', 'c.id_classe = i.classe_id_classe', 'inner')
                ->join('niveau n', 'n.id_niveau = c.niveau_id_niveau', 'inner')
                ->where('a.isActif', 1)
                ->where('i.eleve_id_eleve', isset($session['user_identity']['id_eleve']) ? $session['user_identity']['id_eleve'] : null)
                ->get()
                ->row();
        }

        // Construction de la requête principale
        $this->db->select('
        e.id_exercice,
        e.slug, 
        e.titre, 
        e.published, 
        e.description AS exercice_description, 
        e.ficher_principale, 
        e.fichier_support, 
        e.id_matiere,
        e.id_prof, 
        e.id_niveau, 
        e.created_at,
        m.denomination,
        m.abbreviation,
        m.couleur, 
        n.niveau, 
        n.cycle, 
        p.nom,
        p.prenom,
        p.photo ')
            ->from('exercice e')
            ->join('matiere m', 'm.id_matiere = e.id_matiere', 'inner')
            ->join('niveau n', 'n.id_niveau = e.id_niveau', 'inner')
            ->join('personnel p', 'p.id_personnel = e.id_prof', 'left');

        // Si c'est un enseignant → afficher uniquement ses leçons
        if ($session['role_id'] == 'teacher'  ) {
            $this->db->where('e.id_prof', isset($session['user_identity']['id_personnel']) ? $session['user_identity']['id_personnel'] : null);
        }

        // Si c'est un élève → afficher les leçons de son niveau uniquement
        if ($session['role_id'] == 'student' && $niveau_utilisateur !== null) {
            $this->db
                ->where('n.id_niveau', $niveau_utilisateur->id_niveau)
                ->where('e.published', 1);
        }

        // Si aucun niveau trouvé pour un élève → renvoyer une liste vide
        if ($session['role_id'] == 'student' && $niveau_utilisateur === null) {
            return [];
        }

        // Exécution finale
        return $this->db
            ->group_by('e.id_exercice')
            ->order_by('e.created_at', 'DESC')
            ->get()
            ->result_array();
    }


    public function findOneById($id)
    {
        $session = $this->session->userData();

        // Définition du niveau de l'élève si applicable
        $niveau_utilisateur = null;
        if ($session['role_id'] == 'student') {
            $niveau_utilisateur = $this->db
                ->select('n.*')
                ->from('inscription i')
                ->join('annee_scolaire a', 'a.id_annee_scolaire = i.annee_scolaire_id_annee_scolaire', 'inner')
                ->join('classe c', 'c.id_classe = i.classe_id_classe', 'inner')
                ->join('niveau n', 'n.id_niveau = c.niveau_id_niveau', 'inner')
                ->where('a.isActif', 1)
                ->where('i.eleve_id_eleve', isset($session['user_identity']['id_eleve']) ? $session['user_identity']['id_eleve'] : null)
                ->get()
                ->row();
        }

        $this->db->select('
                e.id_exercice,
                e.slug , 
                e.titre  , 
                e.published , 
                e.description as exercice_description , 
                e.ficher_principale, e.fichier_support , 
                e.id_matiere ,
                e.id_prof , 
                e.id_niveau, 
                e.created_at,
                m.denomination ,
                m.abbreviation ,
                m.couleur , 
                n.niveau , 
                n.cycle , 
                p.nom ,
                p.prenom ,
                p.photo')
            ->from('exercice e')
            ->join('matiere m', 'm.id_matiere = e.id_matiere', 'inner')
            ->join('niveau n', 'n.id_niveau = e.id_niveau', 'inner')
            ->join('personnel p', 'p.id_personnel = e.id_prof', 'left')
            ->where($this->primaryKey, $id);


        // Si c'est un enseignant → afficher uniquement ses leçons
        if ($session['role_id'] == 'teacher'  ) {
            $this->db->where('e.id_prof', isset($session['user_identity']['id_personnel']) ? $session['user_identity']['id_personnel'] : null);
        }

        // Si c'est un élève → afficher les leçons de son niveau uniquement
        if ($session['role_id'] == 'student' && $niveau_utilisateur !== null) {
            $this->db
                ->where('n.id_niveau', $niveau_utilisateur->id_niveau)
                ->where('e.published', 1);
        }

        // Si aucun niveau trouvé pour un élève → renvoyer une liste vide
        if ($session['role_id'] == 'student' && $niveau_utilisateur === null) {
            return [];
        }
        // Exécution finale
        return $this->db
            ->group_by('e.id_exercice')
            ->order_by('e.created_at', 'DESC')
            ->get()
            ->row_array();
    }
}
