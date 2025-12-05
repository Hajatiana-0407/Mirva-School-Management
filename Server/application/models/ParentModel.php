<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ParentModel extends CI_Model
{
    protected $table = 'parents';
    protected $primaryKey = 'id_parent';

    public function __construct()
    {
        parent::__construct();
    }

    // ? ======= READ =======
    public function findAllQuery()
    {
        return $this->db->select($this->table . '.* , pe.type')
            ->from($this->table)
            // ?Type
            ->join('parents_eleves pe', 'pe.parent_id_parent =' . $this->table . '.id_parent', 'left')
            ->order_by($this->primaryKey, 'DESC')
            ->group_by($this->table . '.' . $this->primaryKey)
            ->get()
            ->result_array();
    }

    public function findOneById($id)
    {
        if (!!!$id)  return null;
        return $this->db->select($this->table . '.* , pe.type')
            ->from($this->table)
            // ?Type
            ->join('parents_eleves pe', 'pe.parent_id_parent =' . $this->table . '.id_parent', 'left')
            ->where($this->primaryKey, $id)
            ->get()
            ->row_array();
    }

}
