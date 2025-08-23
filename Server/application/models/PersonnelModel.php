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
    
    public function findAll()
    {
        $query = $this->db->select('*')
                          ->from($this->table)
                          ->join('type_personnel', "{$this->table}.id_type_personnel = type_personnel.id_type_personnel", 'left')
                            ->order_by( $this->primaryKey  , 'DESC')
                            ->get();
        return $query->result_array();
    }
}
