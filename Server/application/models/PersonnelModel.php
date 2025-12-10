<?php
defined('BASEPATH') or exit('No direct script access allowed');

class PersonnelModel extends CI_Model
{
    protected $table = 'personnel';
    protected $primaryKey = 'id_personnel';
    protected $searchs = ['personnel.nom', 'personnel.prenom', 'personnel.telephone', 'personnel.addresse', 'personnel.matricule_personnel', 'personnel.numero_cin' , 'personnel.email'];

    public function __construct()
    {
        parent::__construct();
    }


    public function filtreQuery($statut, $type , $date_debut, $date_fin)
    {
        $builder = $this->findAllQuery();

        // Filtre statut
        if (!empty($statut)) {
            $builder->where('personnel.status', $statut);
        }
        // Filtre type
        if (!empty($type) && $type != 0) {
            $builder->where('personnel.id_type_personnel ', $type);
        }

        // Filtre date début
        if (!empty($date_debut)) {
            $builder->where('personnel.date_embauche >=', $date_debut);
        }

        // Filtre date fin
        if (!empty($date_fin)) {
            $builder->where('personnel.date_embauche <=', $date_fin);
        }

        return $builder;
    }

    public function findAllQuery()
    {
        return $this->db->select('*')
            ->from($this->table)
            ->join('type_personnel', "{$this->table}.id_type_personnel = type_personnel.id_type_personnel", 'left')
            ->order_by($this->primaryKey, 'DESC');
    }

    public function findOneById($id)
    {
        $query = $this->db->select('*')
            ->from($this->table)
            ->where($this->primaryKey, $id)
            ->join('type_personnel', "{$this->table}.id_type_personnel = type_personnel.id_type_personnel", 'left')
            ->get();
        return $query->row();
    }

    public function findOneDetailsByMatricule($matricule = '')
    {
        if ($matricule === '' || !$matricule)
            return false;
        $query = $this->db->select('*')
            ->from($this->table)
            ->where('matricule_personnel', $matricule)
            ->join('type_personnel', "{$this->table}.id_type_personnel = type_personnel.id_type_personnel", 'left')
            ->get();
        return $query->row();
    }
}
