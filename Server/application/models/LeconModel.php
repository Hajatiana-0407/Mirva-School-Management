<?php
defined('BASEPATH') or exit('No direct script access allowed');

class LeconModel extends CI_Model
{
    protected $table = 'lecon';
    protected $primaryKey = 'id_lecon';

    public function __construct()
    {
        parent::__construct();
    }

    public function filtreQuery($niveau, $matiere, $query, $date_debut, $date_fin)
    {
        $builder = $this->findAllQuery();

        // Filtre niveau
        if (!empty($niveau) && $niveau != 0) {
            $builder->where('l.id_niveau', $niveau);
        }

        // Filtre matière
        if (!empty($matiere) && $matiere != 0) {
            $builder->where('l.id_matiere', $matiere);
        }

        // Filtre date début
        if (!empty($date_debut)) {
            $builder->where('l.created_at >=', $date_debut);
        }

        // Filtre date fin
        if (!empty($date_fin)) {
            $builder->where('l.created_at <=', $date_fin);
        }

        // Recherche globale
        if (!empty($query)) {
            $builder->group_start();

            $builder->like('l.titre', $query);
            $builder->or_like('l.description', $query);
            $builder->or_like('n.niveau', $query);
            $builder->or_like('m.denomination', $query);
            $builder->or_like('m.abbreviation', $query);

            // Recherche nom+prenom combinés
            $builder->or_like('CONCAT(p.nom, " ", p.prenom)', $query, 'both', false);

            $builder->group_end();
        }

        return $builder;
    }



    public function findAllQuery()
    {
        $session = $this->session->userData();

        // Si l'utilisateur est non connecter
        if (!isset($session['role_id']))
            return [];

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
        l.id_lecon,
        l.slug, 
        l.titre, 
        l.published, 
        l.description AS lecon_description, 
        l.ficher_principale, 
        l.fichier_support, 
        l.id_matiere,
        l.id_prof, 
        l.id_niveau, 
        l.created_at,
        m.denomination,
        m.abbreviation,
        m.couleur, 
        n.niveau, 
        n.cycle, 
        p.nom,
        p.prenom,
        p.photo ')
            ->from('lecon l')
            ->join('matiere m', 'm.id_matiere = l.id_matiere', 'inner')
            ->join('niveau n', 'n.id_niveau = l.id_niveau', 'inner')
            ->join('personnel p', 'p.id_personnel = l.id_prof', 'left');

        // Si c'est un enseignant → afficher uniquement ses leçons
        if ($session['role_id'] == 'teacher') {
            $this->db->where('l.id_prof', isset($session['user_identity']['id_personnel']) ? $session['user_identity']['id_personnel'] : null);
        }

        // Si c'est un élève → afficher les leçons de son niveau uniquement
        if ($session['role_id'] == 'student' && $niveau_utilisateur !== null) {
            $this->db
                ->where('n.id_niveau', $niveau_utilisateur->id_niveau)
                ->where('l.published', 1);
        }

        // Si aucun niveau trouvé pour un élève → renvoyer une liste vide
        if ($session['role_id'] == 'student' && $niveau_utilisateur === null) {
            return [];
        }

        // Exécution finale
        return $this->db
            ->group_by('l.id_lecon')
            ->order_by('l.created_at', 'DESC');
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
                l.id_lecon,
                l.slug , 
                l.titre  , 
                l.published , 
                l.description as lecon_description , 
                l.ficher_principale, l.fichier_support , 
                l.id_matiere ,
                l.id_prof , 
                l.id_niveau, 
                l.created_at,
                m.denomination ,
                m.abbreviation ,
                m.couleur , 
                n.niveau , 
                n.cycle , 
                p.nom ,
                p.prenom ,
                p.photo')
            ->from('lecon l')
            ->join('matiere m', 'm.id_matiere = l.id_matiere', 'inner')
            ->join('niveau n', 'n.id_niveau = l.id_niveau', 'inner')
            ->join('personnel p', 'p.id_personnel = l.id_prof', 'left')
            ->where($this->primaryKey, $id);
        // Si c'est un enseignant → afficher uniquement ses leçons
        if ($session['role_id'] == 'teacher') {
            $this->db->where('l.id_prof', isset($session['user_identity']['id_personnel']) ? $session['user_identity']['id_personnel'] : null);
        }

        // Si c'est un élève → afficher les leçons de son niveau uniquement
        if ($session['role_id'] == 'student' && $niveau_utilisateur !== null) {
            $this->db
                ->where('n.id_niveau', $niveau_utilisateur->id_niveau)
                ->where('l.published', 1);
        }

        // Si aucun niveau trouvé pour un élève → renvoyer une liste vide
        if ($session['role_id'] == 'student' && $niveau_utilisateur === null) {
            return [];
        }

        // Exécution finale
        return $this->db
            ->group_by('l.id_lecon')
            ->order_by('l.created_at', 'DESC')
            ->get()
            ->row_array();
    }
}