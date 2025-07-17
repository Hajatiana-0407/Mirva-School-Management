<?php
defined('BASEPATH') or exit('No direct script access allowed');

class NiveauModel extends CI_Model
{
    protected $table = 'niveaux';
    protected $primaryKey = 'id_niveau';

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
        $updated =  $this->db->where($this->primaryKey, $id)
            ->update($this->table, $data);
        if ($updated) {
            return $this->db->where($this->primaryKey, $id)
                ->get($this->table)
                ->row();
        }
        return $updated;
    }

    // ======= DELETE =======
    public function delete($id)
    {
        return $this->db->where($this->primaryKey, $id)
            ->delete($this->table);
    }

    public function isNiveauExist($niveau = '')
    {
        $query = $this->db->where('niveau', $niveau)
            ->get($this->table);
        if ($query->row() ) {
            return true;
        }
        return false;
    }
}
