<?php
defined('BASEPATH') or exit('No direct script access allowed');

class UtilisateurCotroller extends CI_Controller
{
    protected $pk = 'id_user';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('UtilisateurModel');
    }

    public function index()
    {
        $data = $this->UtilisateurModel->findAll();
        echo json_encode($data);
    }

}
