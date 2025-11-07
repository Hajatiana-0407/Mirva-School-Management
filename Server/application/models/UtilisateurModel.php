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


    /**
     * return le role pour les etudiant 
     *
     * @return void
     */
    public function getIdRoleStudent()
    {
        return $this->db->select('*')
            ->from('roles')
            ->where('nom', 'Étudiant')
            ->get()
            ->row();
    }

    /**
     * return le role pour les enseignats 
     *
     * @return void
     */
    public function getIdRoleTeacher()
    {
        return $this->db->select('*')
            ->from('roles')
            ->where('nom', 'Enseignant')
            ->get()
            ->row();
    }
}
