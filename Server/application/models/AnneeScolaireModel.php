<?php
defined('BASEPATH') or exit('No direct script access allowed');

class AnneeScolaireModel extends CI_Model
{
    protected $table = 'annee_scolaire';
    protected $primaryKey = 'id_annee_scolaire';
    protected $searchs = ['annee_scolaire.nom', 'annee_scolaire.description'];

    public function __construct()
    {
        parent::__construct();
    }


    // Read
    public function findAllQuery()
    {
        return $this->db->select('*')
            ->from($this->table)
            ->order_by('isActif', 'DESC')
            ->order_by($this->primaryKey, 'DESC');
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
    // ======= Change Active =======
    public function changeActiveSchoolYear($id)
    {
        $element = $this->db
            ->get_where($this->table, [$this->primaryKey => $id])
            ->row();

        if ($element) {
            $this->db->where($this->primaryKey, $id);
            $this->db->update($this->table, ['isActif' => 1]);

            // Desactiver les autres années scolaires
            $this->db->where($this->primaryKey . ' <>', $id);
            $this->db->update($this->table, ['isActif' => 0]);
            return true;
        }
        return false;
    }
}
