<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ParentModel extends CI_Model
{
    protected $table = 'parents';
    protected $primaryKey = 'id_parent';
    protected $searchs = ['parents.nom', 'parents.prenom', 'parents.telephone', 'parents.email', 'parents.adresse', 'parents.profession', 'parents.telephone_travail'];
    public function __construct()
    {
        parent::__construct();
    }

    public function filtreQuery($type): mixed
    {
        $builder = $this->findAllQuery();
        // Filtre type
        if (!empty($type)) {
            $builder->where('pe.type ', $type);
        }
        return $builder;
    }

    // ? ======= READ =======
    public function findAllQuery()
    {
        return $this->db->select($this->table . '.* , pe.type')
            ->from($this->table)
            // ?Type
            ->join('parents_eleves pe', 'pe.parent_id_parent =' . $this->table . '.id_parent', 'left')
            ->order_by($this->primaryKey, 'DESC')
            ->group_by($this->table . '.' . $this->primaryKey);
    }

    public function findOneById($id)
    {
        if (!!!$id)
            return null;
        return $this->db->select($this->table . '.* , pe.type')
            ->from($this->table)
            // ?Type
            ->join('parents_eleves pe', 'pe.parent_id_parent =' . $this->table . '.id_parent', 'left')
            ->where($this->primaryKey, $id)
            ->get()
            ->row_array();
    }

}
