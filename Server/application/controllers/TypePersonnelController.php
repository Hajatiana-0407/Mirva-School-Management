<?php
defined('BASEPATH') or exit('No direct script access allowed');

class TypePersonnelController extends CI_Controller
{
    protected $pk = 'id_type_personnel';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('TypePersonnelModel');
    }

    public function index()
    {
        $builder = $this->TypePersonnelModel->findAllQuery();
        echo json_encode($builder->get()->result_array());
    }

}
