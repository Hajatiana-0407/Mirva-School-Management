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
    public function findAllQuery()
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
            $niveau->classe['id_niveau'] = $niveau->id_niveau;
        }

        // Liste des enseignant pour chaque niveau
        foreach ($niveaux as  &$niveau) {
            $niveau->prof['listes'] = $this->db->select('p.*')
                ->from('classe c')
                ->join('niveau n', 'n.id_niveau = c.niveau_id_niveau', 'inner')
                ->join('classe_proffesseur_matiere cpm', 'cpm.classe_id_classe = c.id_classe', 'inner')
                ->join('personnel p', 'p.id_personnel = cpm.professeur_id_professeur', 'inner')
                ->join('type_personnel tp', 'tp.id_type_personnel = p.id_type_personnel', 'inner')
                ->where('n.id_niveau', $niveau->id_niveau)
                ->where('tp.type', 'Enseignant')
                ->group_by('p.id_personnel')
                ->get()->result();
            $niveau->prof['id_niveau'] = $niveau->id_niveau;
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
        $niveau->classe['id_niveau'] = $niveau->id_niveau;

        $niveau->prof['listes'] = $this->db->select('p.*')
            ->from('classe c')
            ->join('niveau n', 'n.id_niveau = c.niveau_id_niveau', 'inner')
            ->join('classe_proffesseur_matiere cpm', 'cpm.classe_id_classe = c.id_classe', 'inner')
            ->join('personnel p', 'p.id_personnel = cpm.professeur_id_professeur', 'inner')
            ->join('type_personnel tp', 'tp.id_type_personnel = p.id_type_personnel', 'inner')
            ->where('n.id_niveau', $niveau->id_niveau)
            ->where('tp.type', 'Enseignant')
            ->group_by('p.id_personnel')
            ->get()->result();
        $niveau->prof['id_niveau'] = $niveau->id_niveau;

        return $niveau;
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
            $niveau->classe['id_niveau'] = $niveau->id_niveau;
        }

        // Liste des enseignant pour chaque niveau
        foreach ($niveaux as  &$niveau) {
            $niveau->prof['listes'] = $this->db->select('p.*')
                ->from('classe c')
                ->join('niveau n', 'n.id_niveau = c.niveau_id_niveau', 'inner')
                ->join('classe_proffesseur_matiere cpm', 'cpm.classe_id_classe = c.id_classe', 'inner')
                ->join('personnel p', 'p.id_personnel = cpm.professeur_id_professeur', 'inner')
                ->join('type_personnel tp', 'tp.id_type_personnel = p.id_type_personnel', 'inner')
                ->where('n.id_niveau', $niveau->id_niveau)
                ->where('tp.type', 'Enseignant')
                ->group_by('p.id_personnel')
                ->get()->result();
            $niveau->prof['id_niveau'] = $niveau->id_niveau;
        }
        return $niveaux;
    }
}
