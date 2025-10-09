<?php
class EnseignantModel extends CI_Model
{
    protected $table = 'personnel';
    protected $primaryKey = 'id_personnel';

    public function __construct()
    {
        parent::__construct();
    }

    public function findAll()
    {
        $query = $this->db->select('*')
            ->from($this->table)
            ->join('type_personnel', "{$this->table}.id_type_personnel = type_personnel.id_type_personnel", 'left')
            ->group_by($this->primaryKey)
            ->order_by($this->primaryKey, 'DESC')
            ->like('type_personnel.type', 'Enseignant')
            ->get();
        $enseignants =  $query->result_array();
        // Classe pour chaque enseignant
        foreach ($enseignants as &$enseignant) {
            $classes = $this->db->select('c.* , n.* , cpm.matiere_id_matiere')
                ->from('classe c')
                ->join('niveau n', 'c.niveau_id_niveau = n.id_niveau', 'left')
                ->join('classe_proffesseur_matiere cpm', 'c.id_classe = cpm.classe_id_classe', 'inner')
                ->where('cpm.professeur_id_professeur', $enseignant[$this->primaryKey])
                ->get()
                ->result_array();

            // matiere pour chaque classe correspondante
            foreach ($classes as &$classe) {
                $matieres = $this->db->select('m.*')
                    ->from('matiere m')
                    ->where('m.id_matiere', $classe['matiere_id_matiere'])
                    ->get()
                    ->result_array();
                $classe['matieres'] = $matieres;
            }
            $enseignant['classes'] = $classes;
        }
        unset($enseignant);
        return $enseignants;
    }


    public function findOneById($id)
    {
        if (!!!$id)  return null;
        $query = $this->db->select('*')
            ->from($this->table)
            ->join('type_personnel', "{$this->table}.id_type_personnel = type_personnel.id_type_personnel", 'left')
            ->where('type_personnel.type', 'Enseignant')
            ->where($this->primaryKey, $id)
            ->get();
        $enseignant =  $query->row_array();
        
        // Classe pour chaque enseignant
        $classes = $this->db->select('c.* , n.* , cpm.matiere_id_matiere')
            ->from('classe c')
            ->join('niveau n', 'c.niveau_id_niveau = n.id_niveau', 'left')
            ->join('classe_proffesseur_matiere cpm', 'c.id_classe = cpm.classe_id_classe', 'inner')
            ->where('cpm.professeur_id_professeur', $enseignant[$this->primaryKey])
            ->get()
            ->result_array();

        // matiere pour chaque classe correspondante
        foreach ($classes as &$classe) {
            $matieres = $this->db->select('m.*')
                ->from('matiere m')
                ->where('m.id_matiere', $classe['matiere_id_matiere'])
                ->get()
                ->result_array();
            $classe['matieres'] = $matieres;
        }

        $enseignant['classes'] = $classes;
        return $enseignant;
    }
}
