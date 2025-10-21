<?php
defined('BASEPATH') or exit('No direct script access allowed');

class AnneeScolaireController extends CI_Controller
{
    protected $pk = 'id_annee_scolaire';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('AnneeScolaireModel');
    }

    // READ 
    public function index()
    {
        $datas = $this->AnneeScolaireModel->findAll();
        echo json_encode($datas);
    }


    // CREATE
    public function create()
    {
        $data = [
            'nom' => $this->input->post('nom'),
            'date_debut' => $this->input->post('date_debut'),
            'date_fin' => $this->input->post('date_fin'),
            'description' => $this->input->post('description'),
            'isActif' => 1,
        ];


        if ($this->AnneeScolaireModel->isExist(['nom' => $data['nom']])) {
            echo json_encode(['error' => true, 'message' => 'L\'année scolaire existe déjà.']);
        } else {
            $data =  $this->AnneeScolaireModel->insert($data);
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
            'nom' => $this->input->post('nom'),
            'date_debut' => $this->input->post('date_debut'),
            'date_fin' => $this->input->post('date_fin'),
            'description' => $this->input->post('description'),
        ];


        if ($this->AnneeScolaireModel->isExist(
            ['nom' => $data['nom']]
            ,'and' ,
            [$this->pk => $id ]
        )) {
            echo json_encode(['error' => true, 'message' => 'L\'année scolaire existe déjà.']);
        } else {
            $data =  $this->AnneeScolaireModel->update($id, $data);
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

                $data = $this->AnneeScolaireModel->delete($id);

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


    // Changer l'année scolaire active 
    public function changeActiveSchoolYear()
    {
        $id = $this->input->post($this->pk);

        if ($id) {
            $isChnaged = $this->AnneeScolaireModel->changeActiveSchoolYear($id);
            if ($isChnaged) {
                echo json_encode(['error' => false, 'data' => $id]);
            } else {
                echo json_encode(['error' => true, 'data' => null, 'message' => 'Échec de la modification']);
            }
        } else {
            echo json_encode(['error' => true, 'data' => null, 'message' => 'Échec dffsdfsde la modification']);
        }
    }
}
