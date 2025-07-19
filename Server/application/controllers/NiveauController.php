<?php
defined('BASEPATH') or exit('No direct script access allowed');

class NiveauController extends CI_Controller
{
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

    public function create()
    {
        $data = [
            'niveau' => $this->input->post('niveau'),
            'cycle' => $this->input->post('cycle'),
            'description' => $this->input->post('description'),
        ];

        if ($this->NiveauModel->isNiveauExist($data['niveau'])) {
            echo json_encode(['error' => true, 'message' => 'Le niveau existe déjà.']);
        } else {
            $data =  $this->NiveauModel->insert( $data );
            if ($data) {
                echo json_encode(['error' => false, 'data' => $data]);
            } else {
                echo json_encode(['error' => true, 'message' => 'Une erreur c\'est produite.']);
            }
        }
    }

    public function update()
    {

        $id_niveau = $this->input->post('id_niveau');
        $data = [
            'niveau' => $this->input->post('niveau'),
            'cycle' => $this->input->post('cycle'),
            'description' => $this->input->post('description'),
        ];

        if ($this->NiveauModel->isNiveauExist($data['niveau'])) {
            echo json_encode(['error' => true, 'message' => 'Le niveau existe déjà.']);
        } else {
            $data =  $this->NiveauModel->update($id_niveau, $data);
            if ($data) {
                echo json_encode(['error' => false, 'data' => $data]);
            } else {
                echo json_encode(['error' => true, 'message' => 'Une erreur c\'est produite.']);
            }
        }
    }

    public function delete($id)
    {
        $this->NiveauModel->delete($id);
        echo json_encode(['status' => 'deleted']);
    }
}
