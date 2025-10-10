<?php
class MatiereClasseProfModel extends CI_Model
{
    protected $table = 'classe_proffesseur_matiere';
    protected $pk = 'classe_id_classe';

    public function __construct()
    {
        parent::__construct();
    }

    public function deleteAssignationByProf($id_prof = null)
    {
        $elements = $this->db->select('*')
            ->from('classe_proffesseur_matiere')
            ->where('professeur_id_professeur' , $id_prof )
            ->get()
            ->row_array() ; 
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
}
