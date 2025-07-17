<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class NiveauController extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->model('NiveauModel');
    }

    public function index()
    {
        $data = $this->NiveauModel->findAll();
        echo json_encode($data);
    }

    public function store()
    {
        $input = $this->input->post();
        $this->NiveauModel->insert($input);
        echo json_encode(['status' => 'success']);
    }

    public function update($id)
    {
        $data = $this->input->post();
        $this->NiveauModel->update($id, $data);
        echo json_encode(['status' => 'updated']);
    }

    public function delete($id)
    {
        $this->NiveauModel->delete($id);
        echo json_encode(['status' => 'deleted']);
    }
}