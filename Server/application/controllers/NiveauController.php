<?php
defined('BASEPATH') or exit('No direct script access allowed');

class NiveauController extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('NiveauModel');
        $this->load->model('ClasseModel');
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
            $data =  $this->NiveauModel->insert($data);
            if ($data) {
                $nbr_classe = 0;
                if ($this->input->post('classe')) {
                    $nbr_classe = (int)$this->input->post('classe');
                    if ($nbr_classe > 0 && $nbr_classe <= 15) {
                        $classes = []; 
                        for ($i =( $nbr_classe - 1) ; $i >= 0  ; $i--) {
                            $alphabet = range('A', 'Z');
                            $classes[]  = [
                                'denomination' => ucfirst($data->niveau) . " " . $alphabet[$i],
                                'niveau_id_niveau' => $data->id_niveau , 
                            ];
                        }

                        $this->ClasseModel->insertBatch( $classes); 
                    }
                }
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

        if ($this->NiveauModel->isNiveauExist($data['niveau'], $id_niveau)) {
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

    public function delete()
    {

        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

            $input = json_decode(file_get_contents('php://input'), true);

            if (!empty($input['id_niveau'])) {
                $id = $input['id_niveau'];

                $data = $this->NiveauModel->delete($id);

                if ($data) {
                    echo json_encode(['error' => false, 'data' => $data]);
                } else {
                    echo json_encode(['error' => false,  'message' => 'Échec de la suppression']);
                }
            } else {
                echo json_encode(['error' => false,  'message' => 'Échec de la suppression']);
            }
        } else {
            echo json_encode(['error' => false,  'message' => 'Échec de la suppression']);
        }
    }
}
