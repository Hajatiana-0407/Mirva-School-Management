<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ClasseController extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->model('ClasseModel');
    }

    public function index()
    {
        $data = $this->ClasseModel->findAll();
        echo json_encode($data);
    }

    public function store()
    {
        $input = $this->input->post();
        $this->ClasseModel->insert($input);
        echo json_encode(['status' => 'success']);
    }

    public function update($id)
    {
        $data = $this->input->post();
        $this->ClasseModel->update($id, $data);
        echo json_encode(['status' => 'updated']);
    }

    public function delete($id)
    {
        $this->ClasseModel->delete($id);
        echo json_encode(['status' => 'deleted']);
    }
}