<?php
defined('BASEPATH') or exit('No direct script access allowed');

class PersonnelModel extends CI_Model
{
    protected $table = 'personnel';
    protected $primaryKey = 'id_personnel';

    public function __construct()
    {
        parent::__construct();
    }

    public function findAllQuery()
    {
        $query = $this->db->select('*')
            ->from($this->table)
            ->join('type_personnel', "{$this->table}.id_type_personnel = type_personnel.id_type_personnel", 'left')
            ->order_by($this->primaryKey, 'DESC')
            ->get();
        return $query->result_array();
    }

    public function findOneById($id)
    {
        $query = $this->db->select('*')
            ->from($this->table)
            ->where($this->primaryKey, $id)
            ->join('type_personnel', "{$this->table}.id_type_personnel = type_personnel.id_type_personnel", 'left')
            ->get();
        return $query->row();
    }

    public function findOneDetailsByMatricule($matricule = '')
    {
        if ($matricule === '' || !$matricule) return false;
        $query = $this->db->select('*')
            ->from($this->table)
            ->where('matricule_personnel', $matricule )
            ->join('type_personnel', "{$this->table}.id_type_personnel = type_personnel.id_type_personnel", 'left')
            ->get();
        return $query->row();
    }
}
