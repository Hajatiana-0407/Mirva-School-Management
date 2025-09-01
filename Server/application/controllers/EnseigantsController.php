<?php

defined('BASEPATH') or exit('No direct script access allowed');

class EnseigantsController extends CI_Controller
{
    protected $pk = 'id_personnel';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('EnseignantModel');
    }

    public function index()
    {
        $data = $this->EnseignantModel->findAll();
        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode($data));
    }
}
