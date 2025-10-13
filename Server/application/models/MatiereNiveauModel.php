<?php
defined('BASEPATH') or exit('No direct script access allowed');

class MatiereNiveauModel extends CI_Model
{
    protected $table = 'matiere_niveau';

    public function __construct()
    {
        parent::__construct();
    }

    // ======= READ =======
    public function getLelvelSubjectByIdNiveau($id)
    {
        return $this->db->select('*')
            ->from($this->table)
            ->where('niveau_id_niveau', $id)
            ->get()
            ->result_array();
    }

    // ======= DELETE =======
    public function deleteByLevelAndSubject($level, $subject)
    {
        $this->db->where('niveau_id_niveau', $level)
            ->where('matiere_id_matiere', $subject)
            ->delete($this->table);
    }

    // ======= UPDATE =======
    public function updateMaterielNiveau($idLevel, $idSubject, $data )
    {
        $this->db->where('niveau_id_niveau ', $idLevel); 
        $this->db->where('matiere_id_matiere  ', $idSubject); 
        return $this->db->update( $this->table , $data ); 
    }
}
