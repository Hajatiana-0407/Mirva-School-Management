<?php
defined('BASEPATH') or exit('No direct script access allowed');

class InscriptionModel extends CI_Model
{
    protected $table = 'inscription';
    protected $primaryKey = 'id_inscription';
    protected $searchs = ['e.nom' , 'e.prenom' , 'e.matricule_etudiant' , 'e.telephone' , 'c.denomination' , 'n.niveau' , 'as.nom'] ; 

    public function __construct()
    {
        parent::__construct();
    }

    // ? ======= READ =======
    public function findAllQuery()
    {
        return $this->db->select('* ,e.nom as nom_eleve ,  as.nom as annee_scolaire_nom')
            ->from($this->table)
            ->join('classe c', 'c.id_classe = ' . $this->table . '.classe_id_classe', 'left')
            ->join('eleve e', 'e.id_eleve = ' . $this->table . '.eleve_id_eleve', 'left')
            ->join('niveau n', ' n.id_niveau = ' . $this->table . '.niveau_id_niveau', 'left')
            ->join('annee_scolaire as', ' as.id_annee_scolaire = ' . $this->table . '.annee_scolaire_id_annee_scolaire', 'left')
            ->where('as.isActif =', 1)
            ->order_by($this->primaryKey, 'DESC');
    }
    public function findOneById($id)
    {
        if (!!!$id)  return null;
        return $this->db->select('* , e.nom as nom_eleve ,  as.nom as annee_scolaire_nom')
            ->from($this->table)
            ->join('classe c', 'c.id_classe = ' . $this->table . '.classe_id_classe', 'left')
            ->join('eleve e', 'e.id_eleve = ' . $this->table . '.eleve_id_eleve', 'left')
            ->join('niveau n', ' n.id_niveau = ' . $this->table . '.niveau_id_niveau', 'left')
            ->join('annee_scolaire as', ' as.id_annee_scolaire = ' . $this->table . '.annee_scolaire_id_annee_scolaire', 'left')
            ->order_by($this->primaryKey, 'DESC')
            ->get()
            ->row_array();
    }
}
