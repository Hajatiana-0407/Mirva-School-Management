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
    public function findAllQuery(): array
    {
        $user_identity = $this->session->userdata('user_identity');
        $role_id = $this->session->userdata('role_id');
        $id_eleve = null;
        $id_personnel = null;

        if ($role_id === 'student' && isset($user_identity['id_eleve'])) {
            $id_eleve = $user_identity['id_eleve'];
        }
        if ($role_id === 'teacher' && isset($user_identity['id_personnel'])) {
            $id_personnel = $user_identity['id_personnel'];
        }

        if (isset($id_personnel)) {
            // ----------------------------------------
            //  L'utilisateur est une enseignant
            // ----------------------------------------
            $enseignants = $this->db->select('p.nom , p.prenom , p.id_personnel')
                ->from('personnel p')
                ->where('p.id_personnel', $id_personnel)
                ->group_by('p.id_personnel')
                ->get()->result_array();

            foreach ($enseignants as $key => &$enseignant) {
                # code...
                if ($enseignant) {
                    $this->db->select('adt.*, m.* , m.denomination as matiere, c.* ,c.denomination as classe, p.id_personnel, p.nom, p.prenom')
                        ->from($this->table . ' adt')
                        ->join('classe_proffesseur_matiere cpm', 'cpm.id_assignation = adt.assignation_id', 'inner')
                        ->join('matiere m', 'm.id_matiere = cpm.matiere_id_matiere', 'inner')
                        ->join('classe c', 'c.id_classe = cpm.classe_id_classe', 'inner')
                        ->join('personnel p', 'p.id_personnel = cpm.professeur_id_professeur', 'inner')
                        ->where('p.id_personnel', $id_personnel)
                        ->group_by('adt.id_edt');
                    $enseignant['edt'] = $this->db->get()->result_array();
                    $this->db->reset_query();
                }
            }

            return $enseignants;
        } else {
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
            $this->db->order_by('id_classe', 'DESC');
            $this->db->limit(1);
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

            }
            return $classes;
        }

    }



    public function findOneById($classe_id = null, $id_personnel = null)
    {
        // ----------------------------------------
        //  Rechercher toutes les classe disponnible 
        // ----------------------------------------
        if (!$classe_id && !$id_personnel)
            return null;

        if ($id_personnel) {
            // ----------------------------------------
            //  L'utilisateur est une enseignant
            // ----------------------------------------
            $enseignant = $this->db->select('p.nom , p.prenom , p.id_personnel')
                ->from('personnel p')
                ->where('p.id_personnel', $id_personnel)
                ->get()->row_array();
            if ($enseignant) {
                $this->db->select('adt.*, m.* , m.denomination as matiere, c.* ,c.denomination as classe, p.id_personnel, p.nom, p.prenom')
                    ->from($this->table . ' adt')
                    ->join('classe_proffesseur_matiere cpm', 'cpm.id_assignation = adt.assignation_id', 'inner')
                    ->join('matiere m', 'm.id_matiere = cpm.matiere_id_matiere', 'inner')
                    ->join('classe c', 'c.id_classe = cpm.classe_id_classe', 'inner')
                    ->join('personnel p', 'p.id_personnel = cpm.professeur_id_professeur', 'inner')
                    ->where('p.id_personnel', $id_personnel)
                    ->group_by('adt.id_edt');
                $enseignant['edt'] = $this->db->get()->result_array();
                $this->db->reset_query();

                return $enseignant;
            }
            return [];
        } else {
            $this->db->select('*')->from('classe c');

            if ($classe_id)
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

            return $classe;
        }
    }


    public function inserteEdt($datas, $id_classe = null, $id_personnel = null)
    {

        foreach ($datas as $value) {
            // $this->db->where('assignation_id', $value['assignation_id']);
            $this->db->where('heure_debut', $value['heure_debut']);
            $this->db->where('jour_id', $value['jour_id']);
            $this->db->delete($this->table);
        }
        if ($id_personnel !== null) {
            $this->db->insert_batch($this->table, $datas);
            return $this->findOneById(null, $id_personnel);
        }
        $this->db->insert_batch($this->table, $datas);
        return $this->findOneById($id_classe);

    }
}
