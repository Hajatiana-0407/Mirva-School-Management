<?php
class EnseignantModel extends CI_Model
{
    protected $table = 'personnel';
    protected $primaryKey = 'id_personnel';

    public function __construct()
    {
        parent::__construct();
    }

    public function findAllQuery()
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
            $classes = $this->db->select('c.* , n.*')
                ->from('classe c')
                ->join('niveau n', 'c.niveau_id_niveau = n.id_niveau', 'left')
                ->join('classe_proffesseur_matiere cpm', 'c.id_classe = cpm.classe_id_classe', 'inner')
                ->group_by('c.id_classe')
                ->where('cpm.professeur_id_professeur', $enseignant[$this->primaryKey])
                ->get()
                ->result_array();


            // matiere pour chaque classe correspondante
            foreach ($classes as &$classe) {
                // verification si le matiere est tous 
                $isAll = $this->db->select('is_all_matiere')
                    ->from('classe_proffesseur_matiere')
                    ->where('classe_id_classe', $classe['id_classe'])
                    ->where('professeur_id_professeur', $enseignant[$this->primaryKey])
                    ->where('is_all_matiere', 1)
                    ->get()
                    ->row();


                $matieres =  [];
                // Si tous les matieres dans la classe 
                if ($isAll) {
                    $matieres = $this->db->select('m.*')
                        ->from('matiere_niveau mn')
                        ->join('matiere m', 'm.id_matiere = mn.matiere_id_matiere', 'left')
                        ->where('mn.niveau_id_niveau', $classe['id_niveau'])
                        ->get()
                        ->result_array();
                } else {
                    $matieres = $this->db->select('m.*')
                        ->from('classe_proffesseur_matiere cpm')
                        ->join('matiere m', 'cpm.matiere_id_matiere = m.id_matiere AND cpm.classe_id_classe = ' . $classe['id_classe'], 'inner')
                        ->where('cpm.professeur_id_professeur', $enseignant[$this->primaryKey])
                        ->get()
                        ->result_array();
                }

                $classe['matieres'] = $matieres;
            }
            $enseignant['classes'] = $classes;
        }
        unset($enseignant);
        return $enseignants;
    }


    public function findOneById($id)
    {
        $query = $this->db->select('*')
            ->from($this->table)
            ->join('type_personnel', "{$this->table}.id_type_personnel = type_personnel.id_type_personnel", 'left')
            ->where($this->primaryKey, $id)
            ->like('type_personnel.type', 'Enseignant')
            ->get();
        $enseignant =  $query->row_array();
        // Classe pour chaque enseignant
        $classes = $this->db->select('c.* , n.*')
            ->from('classe c')
            ->join('niveau n', 'c.niveau_id_niveau = n.id_niveau', 'left')
            ->join('classe_proffesseur_matiere cpm', 'c.id_classe = cpm.classe_id_classe', 'inner')
            ->group_by('c.id_classe')
            ->where('cpm.professeur_id_professeur', $enseignant[$this->primaryKey])
            ->get()
            ->result_array();


        // matiere pour chaque classe correspondante
        foreach ($classes as &$classe) {
            // verification si le matiere est tous 
            $isAll = $this->db->select('is_all_matiere')
                ->from('classe_proffesseur_matiere')
                ->where('classe_id_classe', $classe['id_classe'])
                ->where('professeur_id_professeur', $enseignant[$this->primaryKey])
                ->where('is_all_matiere', 1)
                ->get()
                ->row();


            $matieres =  [];
            // Si tous les matieres dans la classe 
            if ($isAll) {
                $matieres = $this->db->select('m.*')
                    ->from('matiere_niveau mn')
                    ->join('matiere m', 'm.id_matiere = mn.matiere_id_matiere', 'left')
                    ->where('mn.niveau_id_niveau', $classe['id_niveau'])
                    ->get()
                    ->result_array();
            } else {
                $matieres = $this->db->select('m.*')
                    ->from('classe_proffesseur_matiere cpm')
                    ->join('matiere m', 'cpm.matiere_id_matiere = m.id_matiere AND cpm.classe_id_classe = ' . $classe['id_classe'], 'inner')
                    ->where('cpm.professeur_id_professeur', $enseignant[$this->primaryKey])
                    ->get()
                    ->result_array();
            }

            $classe['matieres'] = $matieres;
        }
        $enseignant['classes'] = $classes;

        return $enseignant;
    }


    public function findOneDetailsByMatriculeOrId($matricule = null, $id = null)
    {
        $this->db->select('*')
            ->from($this->table)
            ->join('type_personnel', "{$this->table}.id_type_personnel = type_personnel.id_type_personnel", 'left')
            ->where('type_personnel.type', 'Enseignant');

            if ( $matricule ){
                $this->db->where("{$this->table}.matricule_personnel", $matricule) ; 
            }else {
                $this->db->where("{$this->table}.id_personnel", $id) ; 
            }

        $enseignant = $this->db->get()->row_array();

        if (!$enseignant) return null;


        // ===================== Assignations ===================== //

        $assignations = [];
        // verification si le matiere est tous 
        $isAll = $this->db->select('is_all_matiere')
            ->from('classe_proffesseur_matiere')
            ->where('professeur_id_professeur', $enseignant[$this->primaryKey])
            ->where('is_all_matiere', 1)
            ->get()
            ->row();

        if ($isAll) {
            $temps = $this->db->select("c.denomination as classe, c.id_classe , cpm.heure_semaine as heures")
                ->from('classe_proffesseur_matiere cpm')
                ->join('classe c', 'cpm.classe_id_classe = c.id_classe', 'left')
                ->join('matiere m', 'cpm.matiere_id_matiere = m.id_matiere', 'left')
                ->where('cpm.professeur_id_professeur', $enseignant[$this->primaryKey])
                ->where('cpm.is_all_matiere', 1)
                ->get()
                ->row_array();
            if ($temps) {
                $temps['matiere'] = 'Tous';
                $temps['id_matiere'] = 'tous';

                $assignations[] = $temps;
            }
        } else {
            $assignations = $this->db->select("c.denomination as classe, c.id_classe ,m.denomination as matiere, m.id_matiere  , cpm.heure_semaine as heures")
                ->from('classe_proffesseur_matiere cpm')
                ->join('classe c', 'cpm.classe_id_classe = c.id_classe', 'left')
                ->join('matiere m', 'cpm.matiere_id_matiere = m.id_matiere', 'left')
                ->where('cpm.professeur_id_professeur', $enseignant[$this->primaryKey])
                ->get()
                ->result_array();
        }


        $enseignant['assignations']  = $assignations;


        return $enseignant;
    }
}
