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
    public function findAllQuery()
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
            ->where($this->primaryKey, $id)
            ->order_by($this->primaryKey, 'DESC')
            ->get()
            ->row_array();
    }

    public function findDetailsByMat($matricule = '')
    {
        if (!!!$matricule)  return null;
        $etudiant =  $this->db->select($this->table . '.* , c.* , n.* ')
            ->from($this->table)
            ->join('inscription i', 'i.eleve_id_eleve = ' . $this->table . '.' . $this->primaryKey, 'left')
            ->join('classe c', 'c.id_classe = i.classe_id_classe', 'left')
            ->join('niveau n', ' n.id_niveau = c.niveau_id_niveau', 'left')
            ->where($this->table . '.matricule_etudiant', $matricule)
            ->get()
            ->row_array();

        if ($etudiant) {

            // ===================== Information sur la mere de l'etudiant ===================== //
            $etudiant['mere'] = $this->db->select('p.*')
                ->from('parents_eleves pe')
                ->where('eleve_id_eleve', $etudiant['id_eleve'])
                ->join('parents p', 'pe.parent_id_parent = p.id_parent', 'left')
                ->where('type', 'mère')
                ->get()
                ->row_array();

            // ===================== Information sur le père de l'etudiant  ===================== //
            $etudiant['pere'] = $this->db->select('p.*')
                ->from('parents_eleves pe')
                ->where('eleve_id_eleve', $etudiant['id_eleve'])
                ->join('parents p', 'pe.parent_id_parent = p.id_parent', 'left')
                ->where('type', 'père')
                ->get()
                ->row_array();

            // ===================== Informations sur le tuteur  ===================== //
            $etudiant['tuteur'] = $this->db->select('p.*')
                ->from('parents_eleves pe')
                ->where('eleve_id_eleve', $etudiant['id_eleve'])
                ->join('parents p', 'pe.parent_id_parent = p.id_parent', 'left')
                ->where('type', 'tuteur')
                ->get()
                ->row_array();
        }

        return $etudiant;
    }
}
