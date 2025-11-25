<?php
defined('BASEPATH') or exit('No direct script access allowed');

class SitePilierEducatifController extends CI_Controller
{
    protected $pk = 'id_pilier  ';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('SitePilierEducatifModel');
    }

    public function index()
    {
        $data = $this->SitePilierEducatifModel->findAll();
        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'error' => false,
                'data' => $data
            ]));
    }
}
