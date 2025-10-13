<?php
defined('BASEPATH') or exit('No direct script access allowed');

class AuthModel extends CI_Model
{
    protected $table = '';
    protected $primaryKey = '';

    public function __construct()
    {
        parent::__construct();
    }
    
    // ? ===================== LOGIN USER ===================== //
    public function get_by_identifiant($identifiant = '')
    {
        if ( !!!$identifiant) return null ;  
        $user  = $this->db->select('*')
            ->from('users')
            ->where('identifiant', $identifiant)
            ->get()
            ->row();
        return $user;
    }
}
