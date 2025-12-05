<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ModuleController extends CI_Controller
{
    protected $pk = 'id_module';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('ModuleModel');
    }

    public function index()
    {
        $data = $this->ModuleModel->findAllQuery();
        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode($data));
    }
}
