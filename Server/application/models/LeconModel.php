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


    public function findAll()
    {
        // !  Si l'utilisateur connecter est une eleve 
        $niveau_utilisateur = null;
        if (isset($_POST['user']['user_data']) && $_POST['user']['user_data']['role'] == 'Étudiant') {
            $niveau_utilisateur  = $this->db->select('n.*')
                ->from('inscription i')
                ->join('annee_scolaire as', 'as.id_annee_scolaire = i.annee_scolaire_id_annee_scolaire', 'inner')
                ->join('classe c', 'c.id_classe = i.classe_id_classe', 'inner')
                ->join('niveau n', 'n.id_niveau = c.niveau_id_niveau', 'inner')
                ->where('as.isActif', '1')
                ->where('i.eleve_id_eleve', $_POST['user']['user_info']['id_eleve'])
                ->get()->row();
        }

        $this->db->select('
                l.id_lecon,
                l.slug , 
                l.titre  , 
                l.published  , 
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
            ->join('personnel p', 'p.id_personnel = l.id_prof', 'left');

        // ! Si l'utilisateur connecter est le porffesseur 
        if (isset($_POST['user']['user_data']) && $_POST['user']['user_data']['role'] == 'Enseignant') {
            $this->db->where('l.id_prof', $_POST['user']['user_info']['id_personnel']);
        }
        // !  Si l'utilisateur connecter est une eleve 
        if ($niveau_utilisateur !== null) {
            $this->db->where('n.id_niveau', $niveau_utilisateur->id_niveau)
                ->where('l.published', '1');
        }

        return $this->db->group_by('l.id_lecon')
            ->order_by('l.created_at', 'DESC')
            ->get()
            ->result_array();
    }


    public function findOneById($id)
    {
        if (!!!$id)  return null;
        // !  Si l'utilisateur connecter est une eleve 
        $niveau_utilisateur = null;
        if (isset($_POST['user']['user_data']) && $_POST['user']['user_data']['role'] == 'Étudiant') {
            $niveau_utilisateur  = $this->db->select('n.*')
                ->from('inscription i')
                ->join('annee_scolaire as', 'as.id_annee_scolaire = i.annee_scolaire_id_annee_scolaire', 'inner')
                ->join('classe c', 'c.id_classe = i.classe_id_classe', 'inner')
                ->join('niveau n', 'n.id_niveau = c.niveau_id_niveau', 'inner')
                ->where('as.isActif', '1')
                ->where('i.eleve_id_eleve', $_POST['user']['user_info']['id_eleve'])
                ->get()->row();
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
            

        // ! Si l'utilisateur connecter est le porffesseur 
        if (isset($_POST['user']['user_data'])  && $_POST['user']['user_data']['role'] == 'Enseignant') {
            $this->db->where('l.id_prof', $_POST['user']['user_info']['id_personnel']);
        }
        // !  Si l'utilisateur connecter est une eleve 
        if ($niveau_utilisateur !== null) {
            $this->db->where('n.id_niveau', $niveau_utilisateur->id_niveau)
                ->where('l.published', '1');
        }

        return $this->db->group_by('l.id_lecon')
            ->get()
            ->row_array();
    }
}
