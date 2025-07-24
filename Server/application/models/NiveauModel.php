<?php
defined('BASEPATH') or exit('No direct script access allowed');

class NiveauModel extends CI_Model
{
    protected $table = 'niveau';
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
    public function findAllLevelData()
    {
        return $this->db->select($this->table . '.* , COUNT(classe.id_classe) as total_classe ,  COUNT(matiere_niveau.niveau_id_niveau) as total_matiere')
            ->from($this->table)
            ->join('classe', 'classe.niveau_id_niveau = ' . $this->table . '.' . $this->primaryKey, 'left')
            ->join('matiere_niveau', 'matiere_niveau.niveau_id_niveau = ' . $this->table . '.' . $this->primaryKey, 'left')
            ->order_by($this->primaryKey, 'DESC')
            ->group_by($this->table . '.' . $this->primaryKey)
            ->get()
            ->result_array();
    }

    public function findOneById($id)
    {
        return $this->db->select($this->table . '.* , COUNT(classe.id_classe) as total_classe ,  COUNT(matiere_niveau.niveau_id_niveau) as total_matiere')
            ->from($this->table)
            ->join('classe', 'classe.niveau_id_niveau = ' . $this->table . '.' . $this->primaryKey, 'left')
            ->join('matiere_niveau', 'matiere_niveau.niveau_id_niveau = ' . $this->table . '.' . $this->primaryKey, 'left')
            ->where($this->primaryKey, $id)
            ->group_by($this->table . '.' . $this->primaryKey)
            ->get()
            ->row();
    }

    // ======= CREATE =======
    public function insert($data)
    {
        $inserted = $this->db->insert($this->table, $data);

        if ($inserted) {
            $inserted_id = $this->db->insert_id();

            return $this->findOneById($inserted_id);
        }

        return false;
    }

    // ======= UPDATE =======
    public function update($id, $data)
    {
        $updated =  $this->db->where($this->primaryKey, $id)
            ->update($this->table, $data);
        if ($updated) {
            return  $this->findOneById($id);
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
        if (count($data)) {
            return true;
        }
        return false;
    }

}
