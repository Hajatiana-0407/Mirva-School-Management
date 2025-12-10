<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ClasseModel extends CI_Model
{
    protected $table = 'classe';
    protected $primaryKey = 'id_classe';

    protected $searchs = ['c.denomination' , 'n.niveau'];

    public function __construct()
    {
        parent::__construct();
    }
    public function findAllQuery()
    {
        $user_identity = $this->session->userdata('user_identity');
        $role_id = $user_id = $this->session->userdata('role_id');
        $id_eleve = null;

        if ($role_id === 'student' && isset($user_identity['id_eleve'])) {
            $id_eleve = $user_identity['id_eleve'];
        }

        // ----------------------------------------
        //  Filtre élève : on récupère la classe
        // ----------------------------------------
        $classe_id = null;

        if ($role_id === 'student' && $id_eleve !== null) {
            $this->db->select('i.classe_id_classe')
                ->from('inscription i')
                ->join('annee_scolaire as', 'as.id_annee_scolaire = i.annee_scolaire_id_annee_scolaire', 'inner');

            // Année scolaire actif
            $this->db->where('as.isActif', '1');


            $eleveData = $this->db->where('eleve_id_eleve', $id_eleve)
                ->order_by('id_inscription', 'DESC')
                ->get()
                ->row_array();

            // RESET obligatoire ! Sinon la requête principale va hériter des join/where précédents
            $this->db->reset_query();

            if ($eleveData) {
                $classe_id = $eleveData['classe_id_classe'];
            }
        }

        $this->db->select('*')
            ->from($this->table . ' c')
            ->join('niveau n', 'n.id_niveau = c.niveau_id_niveau', 'left');
        if ($classe_id) {
            $this->db->where('c.id_classe', $classe_id);
        }

        return $this->db->order_by($this->primaryKey, 'DESC');
    }


    // ======= READ =======
    public function findAllData($classes = [])
    {
        foreach ($classes as &$classe) {
            $classe['matiere']['listes'] = $this->db->select('m.*')
                ->from('classe c')
                ->join('niveau n', 'n.id_niveau = c.niveau_id_niveau', 'inner')
                ->join('matiere_niveau mn', 'mn.niveau_id_niveau = n.id_niveau', 'inner')
                ->join('matiere m', 'mn.matiere_id_matiere = m.id_matiere', 'inner')
                ->where('c.id_classe', $classe['id_classe'])
                ->get()->result();
            $classe['matiere']['id_classe'] = $classe['id_classe'];
        }

        // Liste des enseignant pour chaque classe
        foreach ($classes as &$classe) {
            $classe['prof']['listes'] = $this->db->select('p.*')
                ->from('classe c')
                ->join('classe_proffesseur_matiere cpm', 'cpm.classe_id_classe = c.id_classe', 'inner')
                ->join('personnel p', 'p.id_personnel = cpm.professeur_id_professeur', 'inner')
                ->join('type_personnel tp', 'tp.id_type_personnel = p.id_type_personnel', 'inner')
                ->where('c.id_classe', $classe['id_classe'])
                ->where('tp.type', 'Enseignant')
                ->group_by('p.id_personnel')
                ->get()->result();
            $classe['prof']['id_classe'] = $classe['id_classe'];
        }

        // Liste de eleve inscrit dans la classe
        foreach ($classes as &$classe) {
            $classe['eleve']['listes'] = $this->db->select('e.*')
                ->from('eleve e')
                ->join('inscription i', 'i.eleve_id_eleve = e.id_eleve', 'inner')
                ->join('classe c', 'c.id_classe = i.classe_id_classe', 'inner')
                ->join('annee_scolaire an', 'an.id_annee_scolaire = i.annee_scolaire_id_annee_scolaire', 'inner')
                ->where('an.isActif', '1')
                ->where('c.id_classe', $classe['id_classe'])
                ->get()->result();
            $classe['eleve']['id_classe'] = $classe['id_classe'];
        }
        return $classes;
    }


    public function findOneById($id)
    {
        if (!!!$id)
            return [];
        $classe = $this->db->select('*')
            ->from($this->table)
            ->join('niveau', 'niveau.id_niveau = ' . $this->table . '.niveau_id_niveau', 'left')
            ->order_by($this->primaryKey, 'DESC')
            ->where('id_classe', $id)
            ->get()
            ->row();

        $classe->matiere['listes'] = $this->db->select('m.*')
            ->from('classe c')
            ->join('niveau n', 'n.id_niveau = c.niveau_id_niveau', 'inner')
            ->join('matiere_niveau mn', 'mn.niveau_id_niveau = n.id_niveau', 'inner')
            ->join('matiere m', 'mn.matiere_id_matiere = m.id_matiere', 'inner')
            ->where('c.id_classe', $classe->id_classe)
            ->get()->result();
        $classe->matiere['id_classe'] = $classe->id_classe;


        $classe->prof['listes'] = $this->db->select('p.*')
            ->from('classe c')
            ->join('classe_proffesseur_matiere cpm', 'cpm.classe_id_classe = c.id_classe', 'inner')
            ->join('personnel p', 'p.id_personnel = cpm.professeur_id_professeur', 'inner')
            ->join('type_personnel tp', 'tp.id_type_personnel = p.id_type_personnel', 'inner')
            ->where('c.id_classe', $classe->id_classe)
            ->where('tp.type', 'Enseignant')
            ->group_by('p.id_personnel')
            ->get()->result();
        $classe->prof['id_classe'] = $classe->id_classe;

        $classe->eleve['listes'] = $this->db->select('e.*')
            ->from('eleve e')
            ->join('inscription i', 'i.eleve_id_eleve = e.id_eleve', 'inner')
            ->join('classe c', 'c.id_classe = i.classe_id_classe', 'inner')
            ->join('annee_scolaire an', 'an.id_annee_scolaire = i.annee_scolaire_id_annee_scolaire', 'inner')
            ->where('an.isActif', '1')
            ->where('c.id_classe', $classe->id_classe)
            ->get()->result();
        $classe->eleve['id_classe'] = $classe->id_classe;

        return $classe;
    }



    // ======= GET CLASSE BY ID_MATIERE =======
    public function getAllClasseByIdMatiere($id_matiere)
    {
        $classes = $this->db->select('classe.*')
            ->from('classe')
            ->join('niveau', 'niveau.id_niveau = classe.niveau_id_niveau', 'left')
            ->join('matiere_niveau', 'matiere_niveau.niveau_id_niveau = niveau.id_niveau', 'left')
            ->where('matiere_niveau.matiere_id_matiere', $id_matiere)
            ->get()
            ->result();

        foreach ($classes as &$classe) {
            $classe->matiere['listes'] = $this->db->select('m.*')
                ->from('classe c')
                ->join('niveau n', 'n.id_niveau = c.niveau_id_niveau', 'inner')
                ->join('matiere_niveau mn', 'mn.niveau_id_niveau = n.id_niveau', 'inner')
                ->join('matiere m', 'mn.matiere_id_matiere = m.id_matiere', 'inner')
                ->where('c.id_classe', $classe->id_classe)
                ->get()->result();
            $classe->matiere['id_classe'] = $classe->id_classe;
        }

        // Liste des enseignant pour chaque classe
        foreach ($classes as &$classe) {
            $classe->prof['listes'] = $this->db->select('p.*')
                ->from('classe c')
                ->join('classe_proffesseur_matiere cpm', 'cpm.classe_id_classe = c.id_classe', 'inner')
                ->join('personnel p', 'p.id_personnel = cpm.professeur_id_professeur', 'inner')
                ->join('type_personnel tp', 'tp.id_type_personnel = p.id_type_personnel', 'inner')
                ->where('c.id_classe', $classe->id_classe)
                ->where('tp.type', 'Enseignant')
                ->group_by('p.id_personnel')
                ->get()->result();
            $classe->prof['id_classe'] = $classe->id_classe;
        }

        // Liste de eleve inscrit dans la classe
        foreach ($classes as &$classe) {
            $classe->eleve['listes'] = $this->db->select('e.*')
                ->from('eleve e')
                ->join('inscription i', 'i.eleve_id_eleve = e.id_eleve', 'inner')
                ->join('classe c', 'c.id_classe = i.classe_id_classe', 'inner')
                ->join('annee_scolaire an', 'an.id_annee_scolaire = i.annee_scolaire_id_annee_scolaire', 'inner')
                ->where('an.isActif', '1')
                ->where('c.id_classe', $classe->id_classe)
                ->get()->result();
            $classe->eleve['id_classe'] = $classe->id_classe;
        }
        return $classes;
    }
}
