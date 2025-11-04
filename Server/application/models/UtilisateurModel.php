<?php
defined('BASEPATH') or exit('No direct script access allowed');

class UtilisateurModel extends CI_Model
{
    protected $table = 'users';
    protected $primaryKey = 'id_user';

    public function __construct()
    {
        parent::__construct();
    }


    public function getIdRoleStudent()
    {
        return $this->db->select('*')
            ->from('roles')
            ->where('nom', 'Étudiant')
            ->get()
            ->row();
    }
}
