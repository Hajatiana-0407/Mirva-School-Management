<?php
defined('BASEPATH') or exit('No direct script access allowed');

class AnneeScolaireModel extends CI_Model
{
    protected $table = 'annee_scolaire';
    protected $primaryKey = 'id_annee_scolaire';

    public function __construct()
    {
        parent::__construct();
    }


    // ======= CREATE =======
    public function insert($data)
    {
        $inserted = $this->db->insert($this->table, $data);

        if ($inserted) {
            $inserted_id = $this->db->insert_id();

            // Desactiver les autres années scolaires
            $this->db->where($this->primaryKey . ' <>', $inserted_id);
            $this->db->update($this->table, ['isActif' => 0]);

            return $this->findOneById($inserted_id);
        }

        return false;
    }


    // ======= DELETE =======
    public function delete($id)
    {
        $element = $this->db
            ->get_where($this->table, [$this->primaryKey => $id])
            ->row();
        if ($element) {
            $deleted = $this->db
                ->where($this->primaryKey, $id)
                ->delete($this->table);

            if ($deleted) {
                if ($element->isActif === '1') {
                    // Si l'année scolaire supprimée était active, activer la dernière année scolaire
                    $this->makeActiveTheLastSchoolYear();
                }
                return $id;
            }
        }
        return false;
    }


    // ======= Make active the laste schoolYear =======
    public function makeActiveTheLastSchoolYear()
    {
        $lastSchoolYear = $this->db->select('*')
            ->from($this->table)
            ->order_by($this->primaryKey, 'DESC')
            ->limit(1)
            ->get()
            ->row_array();

        if ($lastSchoolYear) {
            $this->db->where($this->primaryKey, $lastSchoolYear[$this->primaryKey]);
            $this->db->update($this->table, ['isActif' => 1]);
            return true;
        }
        return false;
    }
}
