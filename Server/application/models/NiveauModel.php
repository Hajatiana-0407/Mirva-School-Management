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
        $inserted = $this->db->insert($this->table, $data);

        if ($inserted) {
            $inserted_id = $this->db->insert_id();

            return $this->db
                ->get_where($this->table, [$this->primaryKey  => $inserted_id])
                ->row();
        }

        return false;
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
        $element = $this->db
            ->get_where($this->table, [$this->primaryKey => $id])
            ->row();
        if ($element) {
            $deleted = $this->db
                ->where($this->primaryKey, $id)
                ->delete($this->table);

            if ($deleted) {
                return $id;
            }
        }
        return false;
    }

    public function isNiveauExist($niveau = '', $id = null)
    {
        $query = $this->db->where('niveau', $niveau);
        if ($id) {
            $query->where($this->primaryKey . ' <>', $id);
        }
        $data = $query->get($this->table)->result();
        if ( count( $data )) {
            return true;
        }
        return false;
    }
}


