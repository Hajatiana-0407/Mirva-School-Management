<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ClasseModel extends CI_Model
{
    protected $table = 'classe';
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
    public function findAllClasseData()
    {
        return $this->db->select('*')
            ->from($this->table)
            ->join('niveau', 'niveau.id_niveau = ' . $this->table . '.niveau_id_niveau', 'left')
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
                ->select('*')
                ->from($this->table)
                ->where($this->primaryKey , $inserted_id )
                ->join('niveau', 'niveau.id_niveau = ' . $this->table . '.niveau_id_niveau', 'left')
                ->get()->row();
        }

        return false;
    }

    // ======= UPDATE =======
    public function update($id, $data)
    {
        $updated =  $this->db->where($this->primaryKey, $id)
            ->update($this->table, $data);
        if ($updated) {
            return $this->db
                ->select('*')
                ->from($this->table)
                ->where($this->primaryKey , $id )
                ->join('niveau', 'niveau.id_niveau = ' . $this->table . '.niveau_id_niveau', 'left')
                ->get()->row();
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

    public function isExist($champs = [], $id = null)
    {
        $query = $this->db;
        $i = 0;
        $query->where($this->primaryKey . ' <>', $id);
        foreach ($champs as $key => $value) {
            if ($i == 0) {
                $query->where($key, $value);
            } else {
                $query->or_where($key, $value);
            }
            $i++;
        }
        $data = $query->get($this->table)->result();
        if (count($data)) {
            return true;
        }
        return false;
    }

    public function insertBatch($data = [])
    {
        return $this->db->insert_batch($this->table, $data);
    }
}
