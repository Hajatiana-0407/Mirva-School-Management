<?php
defined('BASEPATH') or exit('No direct script access allowed');

class MatiereController extends CI_Controller
{
    protected $pk = 'id_matiere';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('MatiereModel');
    }

    public function index()
    {
        $data = $this->MatiereModel->findAllQuery();
        echo json_encode($data);
    }

    public function create()
    {
        $data = [
            'denomination' => $this->input->post('denomination'),
            'abbreviation' => $this->input->post('abbreviation'),
            'description' => $this->input->post('description'),
            'couleur' => $this->input->post('couleur'),
        ];


        if ($this->MatiereModel->isExist(
            ['denomination' => $data['denomination'], 'abbreviation' => $data['abbreviation']],
            'or',
        )) {
            echo json_encode(['error' => true, 'message' => "La dénomination ou l’abréviation est déjà utilisée."]);
        } else {
            $data =  $this->MatiereModel->insert($data);
            if ($data) {
                echo json_encode(['error' => false, 'data' => $data]);
            } else {
                echo json_encode(['error' => true, 'message' => 'Une erreur c\'est produite.']);
            }
        }
    }

    public function update()
    {

        $id = $this->input->post($this->pk);
        $data = [
            'denomination' => $this->input->post('denomination'),
            'abbreviation' => $this->input->post('abbreviation'),
            'description' => $this->input->post('description'),
            'couleur' => $this->input->post('couleur'),
        ];


        if ($this->MatiereModel->isExist(
            ['denomination' => $data['denomination'], 'abbreviation' => $data['abbreviation']],
            'or',
            [$this->pk => $id]
        )) {
            echo json_encode(['error' => true, 'message' => "La dénomination ou l’abréviation est déjà utilisée."]);
        } else {
            $data =  $this->MatiereModel->update($id, $data);
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

            if (!empty($input[$this->pk])) {
                $id = $input[$this->pk];

                $data = $this->MatiereModel->delete($id);

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
