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

    // ======= FIND ALL =======
    public function findAllLevelData()
    {
        $niveaux =  $this->db->select($this->table . '.* , COUNT(c.id_classe) as total_classe ,  COUNT(mn.niveau_id_niveau) as total_matiere')
            ->from($this->table)
            ->join('classe c', 'c.niveau_id_niveau = ' . $this->table . '.' . $this->primaryKey, 'left')
            ->join('matiere_niveau mn', 'mn.niveau_id_niveau = ' . $this->table . '.' . $this->primaryKey, 'left')
            ->order_by($this->primaryKey, 'DESC')
            ->group_by($this->table . '.' . $this->primaryKey)
            ->get()
            ->result();

        // Liste des matieres pour chaque niveau
        foreach ($niveaux as  &$niveau) {
            $niveau->matiere['listes'] = $this->db->select('mn.matiere_id_matiere , mn.coefficient ,   m.*')
                ->from('matiere_niveau mn')
                ->join('matiere m', 'm.id_matiere = mn.matiere_id_matiere', 'inner')
                ->where('mn.niveau_id_niveau', $niveau->id_niveau)
                ->group_by('m.id_matiere')
                ->get()->result();
            $niveau->matiere['id_niveau'] = $niveau->id_niveau;
        }

        // Liste des classe pour chaque niveau
        foreach ($niveaux as  &$niveau) {
            $niveau->classe['listes'] = $this->db->select('c.*')
                ->from('classe c')
                ->where('c.niveau_id_niveau', $niveau->id_niveau)
                ->get()->result();
        }
        return $niveaux;
    }

    // ======= FIND ONE BY ID =======
    public function findOneById($id)
    {
        $niveau =  $this->db->select($this->table . '.* , COUNT(classe.id_classe) as total_classe  ,  COUNT(matiere_niveau.niveau_id_niveau) as total_matiere')
            ->from($this->table)
            ->join('classe', 'classe.niveau_id_niveau = ' . $this->table . '.' . $this->primaryKey, 'left')
            ->join('matiere_niveau', 'matiere_niveau.niveau_id_niveau = ' . $this->table . '.' . $this->primaryKey, 'left')
            ->where($this->primaryKey, $id)
            ->group_by($this->table . '.' . $this->primaryKey)
            ->get()
            ->row();

        $niveau->matiere['listes'] = $this->db->select('mn.matiere_id_matiere , mn.coefficient , ,  m.*')
            ->from('matiere_niveau mn')
            ->join('matiere m', 'm.id_matiere = mn.matiere_id_matiere', 'inner')
            ->where('mn.niveau_id_niveau', $niveau->id_niveau)
            ->group_by('m.id_matiere')
            ->get()->result();
        $niveau->matiere['id_niveau'] = $niveau->id_niveau;

        $niveau->classe['listes'] = $this->db->select('c.*')
            ->from('classe c')
            ->where('c.niveau_id_niveau', $niveau->id_niveau)
            ->get()->result();

        return $niveau;
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

    // ======= Prendre les niveau lié a une prof donner  =======
    public function getLevelByTeacherId($id)
    {
        $niveaux =  $this->db->select($this->table . '.* , COUNT(c.id_classe) as total_classe ,  COUNT(mn.niveau_id_niveau) as total_matiere')
            ->from($this->table)
            ->join('classe c', 'c.niveau_id_niveau = ' . $this->table . '.' . $this->primaryKey, 'left')
            ->join('classe_proffesseur_matiere cpm', 'cpm.classe_id_classe = c.id_classe', 'inner')
            ->where('cpm.professeur_id_professeur', $id)
            ->join('matiere_niveau mn', 'mn.niveau_id_niveau = ' . $this->table . '.' . $this->primaryKey, 'left')
            ->order_by($this->primaryKey, 'DESC')
            ->group_by($this->table . '.' . $this->primaryKey)
            ->get()
            ->result();

        // Liste des matieres pour chaque niveau
        foreach ($niveaux as  &$niveau) {
            $niveau->matiere['listes'] = $this->db->select('mn.matiere_id_matiere , mn.coefficient ,   m.*')
                ->from('matiere_niveau mn')
                ->join('matiere m', 'm.id_matiere = mn.matiere_id_matiere', 'inner')
                ->where('mn.niveau_id_niveau', $niveau->id_niveau)
                ->group_by('m.id_matiere')
                ->get()->result();
            $niveau->matiere['id_niveau'] = $niveau->id_niveau;
        }

        // Liste des classe pour chaque niveau
        foreach ($niveaux as  &$niveau) {
            $niveau->classe['listes'] = $this->db->select('c.*')
                ->from('classe c')
                ->where('c.niveau_id_niveau', $niveau->id_niveau)
                ->get()->result();
        }
        return $niveaux;
    }
}
