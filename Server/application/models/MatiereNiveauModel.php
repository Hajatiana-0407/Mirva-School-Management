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
    public function getLelvelSubjectByIdNiveau($id_niveau)
    {
        $session = $this->session->userData();

        // ? Si l'utilisateur n'est pas connecter ou etudiant 
        if (!isset($session['role_id']) || $session['role_id'] === 'student') return [];
        $this->db->select('mn.* , m.* , n.*')
            ->from($this->table . ' mn')
            ->join('matiere m', 'm.id_matiere = mn.matiere_id_matiere', 'left')
            ->join('niveau n', 'n.id_niveau = mn.niveau_id_niveau', 'left')
            ->where('n.id_niveau', $id_niveau);

        // Si l'utilisateur connecter est le porffesseur 
        if ($session['role_id'] === 'teacher') {
            $this->db->join('classe c', 'c.niveau_id_niveau = n.id_niveau', 'inner')
                ->join('classe_proffesseur_matiere cpm', 'cpm.matiere_id_matiere = m.id_matiere', 'inner')
                ->where('cpm.professeur_id_professeur', isset($session['user_identity']['id_personnel']) ? $session['user_identity']['id_personnel'] : null)
            ;
        }
        return $this->db
            ->where('n.id_niveau', $id_niveau)
            ->group_by('m.id_matiere')
            ->get()->result_array();
    }

    // ======= DELETE =======
    public function deleteByLevelAndSubject($level, $subject)
    {
        $this->db->where('niveau_id_niveau', $level)
            ->where('matiere_id_matiere', $subject)
            ->delete($this->table);
    }

    // ======= UPDATE =======
    public function updateMaterielNiveau($idLevel, $idSubject, $data)
    {
        $this->db->where('niveau_id_niveau ', $idLevel);
        $this->db->where('matiere_id_matiere  ', $idSubject);
        return $this->db->update($this->table, $data);
    }
}
