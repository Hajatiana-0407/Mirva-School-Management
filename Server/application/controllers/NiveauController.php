<?php
defined('BASEPATH') or exit('No direct script access allowed');

class NiveauController extends CI_Controller
{
    protected $pk = 'id_niveau';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('NiveauModel');
        $this->load->model('ClasseModel');
        $this->load->model('MatiereNiveauModel');
    }

    public function index()
    {
        $data = $this->NiveauModel->findAllLevelData();
        echo json_encode($data);
    }

    public function create()
    {
        $data = [
            'niveau' => $this->input->post('niveau'),
            'cycle' => $this->input->post('cycle'),
            'description' => $this->input->post('description'),
        ];

        if ($this->NiveauModel->isExist(['niveau' => $data['niveau']])) {
            echo json_encode(['error' => true, 'message' => 'Le niveau existe déjà.']);
        } else {
            $data =  $this->NiveauModel->insert($data);
            if ($data) {
                $nbr_classe = 0;
                if ($this->input->post('classe')) {
                    $nbr_classe = (int)$this->input->post('classe');
                    if ($nbr_classe > 0 && $nbr_classe <= 15) {
                        $classes = [];
                        for ($i = ($nbr_classe - 1); $i >= 0; $i--) {
                            $alphabet = range('A', 'Z');
                            $classes[]  = [
                                'denomination' => ucfirst($data->niveau) . " " . $alphabet[$i],
                                'niveau_id_niveau' => $data->id_niveau,
                            ];
                        }

                        $isClasseAdd =  $this->ClasseModel->insertBatch($classes);
                        if ($isClasseAdd) {
                            $data->total_classe = $nbr_classe;
                        }
                    }
                }
                echo json_encode(['error' => false, 'data' => $data]);
            } else {
                echo json_encode(['error' => true, 'message' => 'Une erreur c\'est produite.']);
            }
        }
    }


    public function niveauMatiere($id = 0)
    {
        $datas = [];
        if ($id > 0) {
            $datas =  $this->MatiereNiveauModel->getLelvelSubjectByIdNiveau($id);
        }
        echo json_encode($datas);
    }

    public function update()
    {

        $id_niveau = $this->input->post('id_niveau');
        $data = [
            'niveau' => $this->input->post('niveau'),
            'cycle' => $this->input->post('cycle'),
            'description' => $this->input->post('description'),
        ];

        if ($this->NiveauModel->isExist(
            ["niveau" => $data['niveau']],
            'and',
            [$this->pk => $id_niveau]
        )) {
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

    public function registerCoef()
    {
        $toDeleteIdMatiere  = [];
        if (isset($_POST['deletes']) && $_POST['deletes'] !== '') {
            $deletesString = trim(strip_tags($_POST['deletes']));
            $toDeleteIdMatiere = explode(',', $deletesString);
        }

        $id_niveau = '';
        if (isset($_POST['id_niveau']) && $_POST['id_niveau'] !== '') {
            $id_niveau = trim(strip_tags($_POST['id_niveau']));
        }

        //* Suppression 
        if (count($toDeleteIdMatiere) && $id_niveau !== '') {
            for ($i = 0; $i < count($toDeleteIdMatiere); $i++) {
                $this->MatiereNiveauModel->deleteByLevelAndSubject($id_niveau, $toDeleteIdMatiere[$i]);
            }
        }

        // Modification 
        $toUpdateIdMatiere = [];
        if (isset($_POST['update']) && count($_POST['update']) > 0) {
            $toUpdateIdMatiere = $_POST['update'];
        }
        foreach ($toUpdateIdMatiere as $key => $value) {
            $data = ["coefficient" => $value];
            $this->MatiereNiveauModel->updateMaterielNiveau($id_niveau, $key, $data);
        }

        // Modification 
        $toAddIdMatiere = [];
        if (isset($_POST['add']) && count($_POST['add']) > 0) {
            $toAddIdMatiere = $_POST['add'];
        }
        foreach ($toAddIdMatiere as $key => $value) {
            $data = ["coefficient" => $value, "matiere_id_matiere" => $key, "niveau_id_niveau" => $id_niveau];
            $this->MatiereNiveauModel->insert($data);
        }
    }
}
