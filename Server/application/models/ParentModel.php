<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ParentModel extends CI_Model
{
    protected $table = 'parent';
    protected $primaryKey = 'id_parent';

    public function __construct()
    {
        parent::__construct();
    }

    // ? ======= READ =======
    public function findAll()
    {
        return $this->db->select($this->table . '.* , e.nom , e.prenom , e.matricule_etudiant , e.photo')
            ->from($this->table)
            // ?Eleve
            ->join('eleve e', 'e.parent_id_parent =' . $this->table . '.' . $this->primaryKey, 'left')
            ->order_by($this->primaryKey, 'DESC')
            ->group_by($this->table . '.' . $this->primaryKey)
            ->get()
            ->result_array();
    }

    public function findOneById($id)
    {
        if (!!!$id)  return null;
        return $this->db->select($this->table . '.* , e.nom , e.prenom , e.matricule_etudiant , e.photo')
            ->from($this->table)
            // ?Eleve
            ->join('eleve e', 'e.parent_id_parent =' . $this->table . '.' . $this->primaryKey, 'left')
            ->where($this->primaryKey, $id)
            ->get()
            ->row_array();
    }
}
