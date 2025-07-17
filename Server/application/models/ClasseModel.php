<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ClasseModel extends CI_Model {
    protected $table = 'classes';
    protected $primaryKey = 'id_classe';

    public function __construct()
    {
        parent::__construct();
    }

    // ======= READ =======
    public function findAll()
    {
        return $this->db->select('*')
            ->from($this->table)
            ->order_by($this->primaryKey, 'DESC')
            ->get()
            ->result_array();
    }

    public function findOneById($id)
    {
        return $this->db->select('*')
            ->from($this->table)
            ->where($this->primaryKey, $id)
            ->get()
            ->row_array();
    }

    // ======= CREATE =======
    public function insert($data)
    {
        return $this->db->insert($this->table, $data);
    }

    // ======= UPDATE =======
    public function update($id, $data)
    {
        return $this->db->where($this->primaryKey, $id)
            ->update($this->table, $data);
    }

    // ======= DELETE =======
    public function delete($id)
    {
        return $this->db->where($this->primaryKey, $id)
            ->delete($this->table);
    }
}