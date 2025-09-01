<?php
class EnseignantModel extends CI_Model
{
    protected $table = 'personnel';
    protected $pk = 'id_personnel';

    public function __construct()
    {
        parent::__construct();
    }

    public function findAll()
    {
        $query = $this->db->select('*')
            ->from($this->table)
            ->join('type_personnel', "{$this->table}.id_type_personnel = type_personnel.id_type_personnel", 'left')
            ->order_by($this->primaryKey, 'DESC')
            ->like('type_personnel.type', 'Enseignant')
            ->get();
        return $query->result_array();
    }
}
