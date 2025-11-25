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
    public function findAll()
    {
        $classes =  $this->db->select('*')
            ->from($this->table)
            ->join('niveau', 'niveau.id_niveau = ' . $this->table . '.niveau_id_niveau', 'left')
            ->order_by($this->primaryKey, 'DESC')
            ->get()
            ->result();

        foreach ($classes as  &$classe) {
            $classe->matiere['listes'] = $this->db->select('m.*')
                ->from('classe c')
                ->join('niveau n', 'n.id_niveau = c.niveau_id_niveau', 'inner')
                ->join('matiere_niveau mn', 'mn.niveau_id_niveau = n.id_niveau', 'inner')
                ->join('matiere m', 'mn.matiere_id_matiere = m.id_matiere', 'inner')
                ->where('c.id_classe', $classe->id_classe)
                ->get()->result();
            $classe->matiere['id_classe'] = $classe->id_classe;
        }

        // Liste des enseignant pour chaque classe
        foreach ($classes as  &$classe) {
            $classe->prof['listes'] = $this->db->select('p.*')
                ->from('classe c')
                ->join('classe_proffesseur_matiere cpm', 'cpm.classe_id_classe = c.id_classe', 'inner')
                ->join('personnel p', 'p.id_personnel = cpm.professeur_id_professeur', 'inner')
                ->join('type_personnel tp', 'tp.id_type_personnel = p.id_type_personnel', 'inner')
                ->where('c.id_classe', $classe->id_classe)
                ->where('tp.type', 'Enseignant')
                ->group_by('p.id_personnel')
                ->get()->result();
            $classe->prof['id_classe'] = $classe->id_classe;
        }

        // Liste de eleve inscrit dans la classe
        foreach ($classes as  &$classe) {
            $classe->eleve['listes'] = $this->db->select('e.*')
                ->from('eleve e')
                ->join('inscription i', 'i.eleve_id_eleve = e.id_eleve', 'inner')
                ->join('classe c', 'c.id_classe = i.classe_id_classe', 'inner')
                ->join('annee_scolaire an', 'an.id_annee_scolaire = i.annee_scolaire_id_annee_scolaire', 'inner')
                ->where('an.isActif', '1')
                ->where('c.id_classe', $classe->id_classe)
                ->get()->result();
            $classe->eleve['id_classe'] = $classe->id_classe;
        }
        return $classes;
    }


    public  function findOneById($id)
    {
        if (!!!$id) return [];
        $classe =  $this->db->select('*')
            ->from($this->table)
            ->join('niveau', 'niveau.id_niveau = ' . $this->table . '.niveau_id_niveau', 'left')
            ->order_by($this->primaryKey, 'DESC')
            ->where('id_classe', $id)
            ->get()
            ->row();

        $classe->matiere['listes'] = $this->db->select('m.*')
            ->from('classe c')
            ->join('niveau n', 'n.id_niveau = c.niveau_id_niveau', 'inner')
            ->join('matiere_niveau mn', 'mn.niveau_id_niveau = n.id_niveau', 'inner')
            ->join('matiere m', 'mn.matiere_id_matiere = m.id_matiere', 'inner')
            ->where('c.id_classe', $classe->id_classe)
            ->get()->result();
        $classe->matiere['id_classe'] = $classe->id_classe;


        $classe->prof['listes'] = $this->db->select('p.*')
            ->from('classe c')
            ->join('classe_proffesseur_matiere cpm', 'cpm.classe_id_classe = c.id_classe', 'inner')
            ->join('personnel p', 'p.id_personnel = cpm.professeur_id_professeur', 'inner')
            ->join('type_personnel tp', 'tp.id_type_personnel = p.id_type_personnel', 'inner')
            ->where('c.id_classe', $classe->id_classe)
            ->where('tp.type', 'Enseignant')
            ->group_by('p.id_personnel')
            ->get()->result();
        $classe->prof['id_classe'] = $classe->id_classe;

        $classe->eleve['listes'] = $this->db->select('e.*')
            ->from('eleve e')
            ->join('inscription i', 'i.eleve_id_eleve = e.id_eleve', 'inner')
            ->join('classe c', 'c.id_classe = i.classe_id_classe', 'inner')
            ->join('annee_scolaire an', 'an.id_annee_scolaire = i.annee_scolaire_id_annee_scolaire', 'inner')
            ->where('an.isActif', '1')
            ->where('c.id_classe', $classe->id_classe)
            ->get()->result();
        $classe->eleve['id_classe'] = $classe->id_classe;

        return $classe;
    }



    // ======= GET CLASSE BY ID_MATIERE =======
    public function getAllClasseByIdMatiere($id_matiere)
    {
        $classes =  $this->db->select('classe.*')
            ->from('classe')
            ->join('niveau', 'niveau.id_niveau = classe.niveau_id_niveau', 'left')
            ->join('matiere_niveau', 'matiere_niveau.niveau_id_niveau = niveau.id_niveau', 'left')
            ->where('matiere_niveau.matiere_id_matiere', $id_matiere)
            ->get()
            ->result();

        foreach ($classes as  &$classe) {
            $classe->matiere['listes'] = $this->db->select('m.*')
                ->from('classe c')
                ->join('niveau n', 'n.id_niveau = c.niveau_id_niveau', 'inner')
                ->join('matiere_niveau mn', 'mn.niveau_id_niveau = n.id_niveau', 'inner')
                ->join('matiere m', 'mn.matiere_id_matiere = m.id_matiere', 'inner')
                ->where('c.id_classe', $classe->id_classe)
                ->get()->result();
            $classe->matiere['id_classe'] = $classe->id_classe;
        }

        // Liste des enseignant pour chaque classe
        foreach ($classes as  &$classe) {
            $classe->prof['listes'] = $this->db->select('p.*')
                ->from('classe c')
                ->join('classe_proffesseur_matiere cpm', 'cpm.classe_id_classe = c.id_classe', 'inner')
                ->join('personnel p', 'p.id_personnel = cpm.professeur_id_professeur', 'inner')
                ->join('type_personnel tp', 'tp.id_type_personnel = p.id_type_personnel', 'inner')
                ->where('c.id_classe', $classe->id_classe)
                ->where('tp.type', 'Enseignant')
                ->group_by('p.id_personnel')
                ->get()->result();
            $classe->prof['id_classe'] = $classe->id_classe;
        }

        // Liste de eleve inscrit dans la classe
        foreach ($classes as  &$classe) {
            $classe->eleve['listes'] = $this->db->select('e.*')
                ->from('eleve e')
                ->join('inscription i', 'i.eleve_id_eleve = e.id_eleve', 'inner')
                ->join('classe c', 'c.id_classe = i.classe_id_classe', 'inner')
                ->join('annee_scolaire an', 'an.id_annee_scolaire = i.annee_scolaire_id_annee_scolaire', 'inner')
                ->where('an.isActif', '1')
                ->where('c.id_classe', $classe->id_classe)
                ->get()->result();
            $classe->eleve['id_classe'] = $classe->id_classe;
        }
        return $classes;
    }
}
