<?php
defined('BASEPATH') or exit('No direct script access allowed');

class EmploiDuTempsModel extends CI_Model
{
    protected $table = 'emploi_du_temps';
    protected $primaryKey = 'id_edt';

    public function __construct()
    {
        parent::__construct();
    }
    // ======= READ =======
    public function findAll(): array
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

        // ----------------------------------------
        //  Rechercher toutes les classe disponnible 
        // ----------------------------------------
        $this->db->select('*')->from('classe c');
        $this->db->limit(10);
        if ($classe_id) {
            $this->db->where('c.id_classe', $classe_id);
        }
        $classes = $this->db->get()->result_array();
        $this->db->reset_query();

        // Si il n'y a pas de classe on return []
        if (empty($classes))
            return [];

        // ----------------------------------------
        //  Requête principale (emploi du temps)
        // ----------------------------------------
        $empoi_du_temps = [];
        foreach ($classes as $key => &$classe) {
            $this->db->select('adt.*, m.* , m.denomination as matiere, c.* ,c.denomination as classe, p.id_personnel, p.nom, p.prenom')
                ->from($this->table . ' adt')
                ->join('classe_proffesseur_matiere cpm', 'cpm.id_assignation = adt.assignation_id', 'inner')
                ->join('matiere m', 'm.id_matiere = cpm.matiere_id_matiere', 'inner')
                ->join('classe c', 'c.id_classe = cpm.classe_id_classe', 'inner')
                ->join('personnel p', 'p.id_personnel = cpm.professeur_id_professeur', 'inner')
                ->where('c.id_classe', $classe['id_classe'])
                ->group_by('adt.id_edt');
            $classe['edt'] = $this->db->get()->result_array();
            $this->db->reset_query();

            // Filtre professeur
            // if ($role_id === 'teacher' && isset($user_identity['id_personnel'])) {
            //     $this->db->where('cpm.professeur_id_professeur', $user_identity['id_personnel']);
            // }
        }

        return $classes;


        // // Filtre élève (classe)
        // if ($role_id === 'student' && $classe_id !== null) {
        //     $this->db->where('cpm.classe_id_classe', $classe_id);
        // }

        // return $this->db->get()->result_array();
    }



    public function findOneById($classe_id = null)
    {
        // ----------------------------------------
        //  Rechercher toutes les classe disponnible 
        // ----------------------------------------
        if (!!!$classe_id)
            return null;

        $this->db->select('*')->from('classe c');
        $this->db->where('c.id_classe', $classe_id);
        $classe = $this->db->get()->row_array();
        $this->db->reset_query();

        if (!$classe)
            return null;


        // ----------------------------------------
        //  Requête principale (emploi du temps)
        // ----------------------------------------
        $this->db->select('adt.*, m.* , m.denomination as matiere, c.* ,c.denomination as classe, p.id_personnel, p.nom, p.prenom')
            ->from($this->table . ' adt')
            ->join('classe_proffesseur_matiere cpm', 'cpm.id_assignation = adt.assignation_id', 'inner')
            ->join('matiere m', 'm.id_matiere = cpm.matiere_id_matiere', 'inner')
            ->join('classe c', 'c.id_classe = cpm.classe_id_classe', 'inner')
            ->join('personnel p', 'p.id_personnel = cpm.professeur_id_professeur', 'inner')
            ->where('c.id_classe', $classe_id)
            ->group_by('adt.id_edt');
        $classe['edt'] = $this->db->get()->result_array();
        $this->db->reset_query();

        // Filtre professeur
        // if ($role_id === 'teacher' && isset($user_identity['id_personnel'])) {
        //     $this->db->where('cpm.professeur_id_professeur', $user_identity['id_personnel']);
        // }

        return $classe;


        // // Filtre élève (classe)
        // if ($role_id === 'student' && $classe_id !== null) {
        //     $this->db->where('cpm.classe_id_classe', $classe_id);
        // }

        // return $this->db->get()->result_array();
    }


    public function inserteEdt($datas , $id_classe)
    {
        foreach ($datas as $value) {
            // $this->db->where('assignation_id', $value['assignation_id']);
            $this->db->where('heure_debut', $value['heure_debut']);
            $this->db->where('jour_id', $value['jour_id']);
            $this->db->delete($this->table);
        }
        $this->db->insert_batch($this->table, $datas);
        return $this->findOneById($id_classe);
    }
}
