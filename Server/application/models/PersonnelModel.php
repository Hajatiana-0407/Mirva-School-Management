<?php
defined('BASEPATH') or exit('No direct script access allowed');

class PersonnelModel extends CI_Model
{
    protected $table = 'personnel';
    protected $primaryKey = 'id_personnel';
    protected $searchs = ['personnel.nom', 'personnel.prenom', 'personnel.telephone', 'personnel.addresse', 'personnel.matricule_personnel', 'personnel.numero_cin'];

    public function __construct()
    {
        parent::__construct();
    }

    public function findAllQuery()
    {
        return $this->db->select('*')
            ->from($this->table)
            ->join('type_personnel', "{$this->table}.id_type_personnel = type_personnel.id_type_personnel", 'left')
            ->order_by($this->primaryKey, 'DESC');
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
        if ($matricule === '' || !$matricule)
            return false;
        $query = $this->db->select('*')
            ->from($this->table)
            ->where('matricule_personnel', $matricule)
            ->join('type_personnel', "{$this->table}.id_type_personnel = type_personnel.id_type_personnel", 'left')
            ->get();
        return $query->row();
    }
}
