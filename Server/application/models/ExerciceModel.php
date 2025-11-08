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
        $user = $_POST['user'] ?? null;
        $user_data = $user['user_data'] ?? null;
        $user_info = $user['user_info'] ?? null;
        $role = $user_data['role'] ?? null;

        // Définition du niveau de l'élève si applicable
        $niveau_utilisateur = null;
        if ($role === 'Étudiant' && isset($user_info['id_eleve'])) {
            $niveau_utilisateur = $this->db
                ->select('n.*')
                ->from('inscription i')
                ->join('annee_scolaire a', 'a.id_annee_scolaire = i.annee_scolaire_id_annee_scolaire', 'inner')
                ->join('classe c', 'c.id_classe = i.classe_id_classe', 'inner')
                ->join('niveau n', 'n.id_niveau = c.niveau_id_niveau', 'inner')
                ->where('a.isActif', 1)
                ->where('i.eleve_id_eleve', $user_info['id_eleve'])
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
        p.photo
    ')
            ->from('exercice e')
            ->join('matiere m', 'm.id_matiere = e.id_matiere', 'inner')
            ->join('niveau n', 'n.id_niveau = e.id_niveau', 'inner')
            ->join('personnel p', 'p.id_personnel = e.id_prof', 'left');

        // Si c'est un enseignant → afficher uniquement ses leçons
        if ($role === 'Enseignant' && isset($user_info['id_personnel'])) {
            $this->db->where('e.id_prof', $user_info['id_personnel']);
        }

        // Si c'est un élève → afficher les leçons de son niveau uniquement
        if ($role === 'Étudiant' && $niveau_utilisateur !== null) {
            $this->db
                ->where('n.id_niveau', $niveau_utilisateur->id_niveau)
                ->where('e.published', 1);
        }

        // Si aucun niveau trouvé pour un élève → renvoyer une liste vide
        if ($role === 'Étudiant' && $niveau_utilisateur === null) {
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
        if (!!!$id)  return null;
        $user = $_POST['user'] ?? null;
        $user_data = $user['user_data'] ?? null;
        $user_info = $user['user_info'] ?? null;
        $role = $user_data['role'] ?? null;

        // Définition du niveau de l'élève si applicable
        $niveau_utilisateur = null;
        if ($role === 'Étudiant' && isset($user_info['id_eleve'])) {
            $niveau_utilisateur = $this->db
                ->select('n.*')
                ->from('inscription i')
                ->join('annee_scolaire a', 'a.id_annee_scolaire = i.annee_scolaire_id_annee_scolaire', 'inner')
                ->join('classe c', 'c.id_classe = i.classe_id_classe', 'inner')
                ->join('niveau n', 'n.id_niveau = c.niveau_id_niveau', 'inner')
                ->where('a.isActif', 1)
                ->where('i.eleve_id_eleve', $user_info['id_eleve'])
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
        if ($role === 'Enseignant' && isset($user_info['id_personnel'])) {
            $this->db->where('e.id_prof', $user_info['id_personnel']);
        }

        // Si c'est un élève → afficher les leçons de son niveau uniquement
        if ($role === 'Étudiant' && $niveau_utilisateur !== null) {
            $this->db
                ->where('n.id_niveau', $niveau_utilisateur->id_niveau)
                ->where('e.published', 1);
        }

        // Si aucun niveau trouvé pour un élève → renvoyer une liste vide
        if ($role === 'Étudiant' && $niveau_utilisateur === null) {
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
