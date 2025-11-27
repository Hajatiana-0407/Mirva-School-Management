<?php
class MatiereClasseProfModel extends CI_Model
{
    protected $table = 'classe_proffesseur_matiere';
    protected $primaryKey = 'classe_id_classe';

    public function __construct()
    {
        parent::__construct();
    }

    public function deleteAssignationByProf($id_prof = null)
    {
        $elements = $this->db->select('*')
            ->from('classe_proffesseur_matiere')
            ->where('professeur_id_professeur', $id_prof)
            ->get()
            ->row_array();
        if (!empty($elements)) {
            $deleted = $this->db
                ->where('professeur_id_professeur', $id_prof)
                ->delete($this->table);

            if ($deleted) {
                return $elements;
            }
        }
        return false;
    }


    public function findAllByICdlasse($id_Classe)
    {
        if (!!!$id_Classe)
            return [];
        return $this->db->select('*')
            ->from($this->table)
            ->where('classe_id_classe', $id_Classe)
            ->get()
            ->result_array();
    }

    public function getAllByClasseId($id_Classe = null)
    {
        if (!$id_Classe)
            return [];
        return $this->db->select('a.id_assignation , c.* , c.denomination as classe , p.nom , p.prenom  , p.id_personnel , m.denomination as matiere , m.abbreviation , m.id_matiere')
            ->from($this->table . ' a')
            ->join('classe c', 'c.id_classe = a.classe_id_classe', 'inner')
            ->join('personnel p', 'p.id_personnel = a.professeur_id_professeur', 'inner')
            ->join('matiere m', 'm.id_matiere = a.matiere_id_matiere', 'inner')
            ->where('a.classe_id_classe', $id_Classe)
            ->group_by('a.id_assignation')
            ->get()->result_array();
    }
    public function getAllByTeacherId($id_personnel = null)
    {
        if (!$id_personnel)
            return [];
        return $this->db->select('a.id_assignation , c.* , c.denomination as classe , p.nom , p.prenom  , p.id_personnel , m.denomination as matiere , m.abbreviation , m.id_matiere')
            ->from($this->table . ' a')
            ->join('classe c', 'c.id_classe = a.classe_id_classe', 'inner')
            ->join('personnel p', 'p.id_personnel = a.professeur_id_professeur', 'inner')
            ->join('matiere m', 'm.id_matiere = a.matiere_id_matiere', 'inner')
            ->where('a.professeur_id_professeur ', $id_personnel)
            ->group_by('a.id_assignation')
            ->get()->result_array();
    }
}
