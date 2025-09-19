<?php
defined('BASEPATH') or exit('No direct script access allowed');

class EtudiantModel extends CI_Model
{
    protected $table = 'eleve';
    protected $primaryKey = 'id_eleve';

    public function __construct()
    {
        parent::__construct();
    }

    // ? ======= READ =======
    public function findAll()
    {
        return $this->db->select($this->table . '.* , c.* , n.*')
            ->from($this->table)
            ->join('inscription i', 'i.eleve_id_eleve = ' . $this->table . '.' . $this->primaryKey, 'left')
            ->join('classe c', 'c.id_classe = i.classe_id_classe', 'left')
            ->join('niveau n', ' n.id_niveau = c.niveau_id_niveau', 'left')
            ->order_by($this->primaryKey, 'DESC')
            ->group_by($this->table . '.' . $this->primaryKey)
            ->get()
            ->result_array();
    }


    public function findOneById($id)
    {
        if (!!!$id)  return null;
        return $this->db->select($this->table . '.* , c.* , n.*')
            ->from($this->table)
            ->join('inscription i', 'i.eleve_id_eleve = ' . $this->table . '.' . $this->primaryKey, 'left')
            ->join('classe c', 'c.id_classe = i.classe_id_classe', 'left')
            ->join('niveau n', ' n.id_niveau = c.niveau_id_niveau', 'left')
            ->order_by($this->primaryKey, 'DESC')
            ->get()
            ->row_array();
    }

}
