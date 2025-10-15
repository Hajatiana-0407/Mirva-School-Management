<?php
defined('BASEPATH') or exit('No direct script access allowed');

class LeconModel extends CI_Model
{
    protected $table = 'lecon';
    protected $primaryKey = 'id_lecon';

    public function __construct()
    {
        parent::__construct();
    }


    public function findAll()
    {
        return $this->db->select('
                l.id_lecon,
                l.titre  , 
                l.published  , 
                l.description as lecon_description , 
                l.ficher_principale, l.fichier_support , 
                l.id_matiere ,
                l.id_prof , 
                l.id_niveau, 
                l.created_at,
                m.denomination ,
                m.abbreviation ,
                m.couleur , 
                n.niveau , 
                n.cycle , 
                p.nom ,
                p.prenom ,
                p.photo
                                ')
            ->from('lecon l')
            ->join('matiere m', 'm.id_matiere = l.id_matiere', 'inner')
            ->join('niveau n', 'n.id_niveau = l.id_niveau', 'inner')
            ->join('personnel p', 'p.id_personnel = l.id_prof', 'left')
            ->group_by('l.id_lecon')
            ->order_by('l.created_at', 'DESC')
            ->get()
            ->result_array();
    }


    public function findOneById($id)
    {
        if (!!!$id)  return null;
        return $this->db->select('
                l.id_lecon,
                l.titre  , 
                l.published , 
                l.description as lecon_description , 
                l.ficher_principale, l.fichier_support , 
                l.id_matiere ,
                l.id_prof , 
                l.id_niveau, 
                l.created_at,
                m.denomination ,
                m.abbreviation ,
                m.couleur , 
                n.niveau , 
                n.cycle , 
                p.nom ,
                p.prenom ,
                p.photo
                                ')
            ->from('lecon l')
            ->join('matiere m', 'm.id_matiere = l.id_matiere', 'inner')
            ->join('niveau n', 'n.id_niveau = l.id_niveau', 'inner')
            ->join('personnel p', 'p.id_personnel = l.id_prof', 'left')
            ->where($this->primaryKey, $id)
            ->group_by('l.id_lecon')
            ->get()
            ->row_array();
    }
}
