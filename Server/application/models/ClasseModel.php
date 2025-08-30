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
    public function findAllClasseData()
    {
        return $this->db->select('*')
            ->from($this->table)
            ->join('niveau', 'niveau.id_niveau = ' . $this->table . '.niveau_id_niveau', 'left')
            ->order_by($this->primaryKey, 'DESC')
            ->get()
            ->result_array();
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


    // ======= GET CLASSE BY ID_MATIERE =======
    public function getAllClasseByIdMatiere( $id_matiere ){
        return $this->db->select('classe.*')
            ->from('classe')
            ->join('niveau', 'niveau.id_niveau = classe.niveau_id_niveau', 'left')
            ->join('matiere_niveau', 'matiere_niveau.niveau_id_niveau = niveau.id_niveau', 'left')
            ->where('matiere_niveau.matiere_id_matiere', $id_matiere)
            ->get()
            ->result_array();
    }
}
