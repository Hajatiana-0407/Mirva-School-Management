<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ClasseController extends CI_Controller
{
    protected $pk = 'id_classe';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('ClasseModel');
    }

    public function index()
    {
        $page = $this->input->get('page', 1) ?? 1;
        $search = $this->input->get('query', 1) ?? '';
        $no_pagination = $this->input->get('no_pagination', 1) ?? false;
        $query = $this->ClasseModel->findAllQuery();
        $pagination = $this->ClasseModel->paginateQuery($query, $page, $search, $no_pagination);
        $pagination['data'] = $this->ClasseModel->findAllData($pagination['data']);

        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'pagination' => $pagination,
                'data' => $pagination['data']
            ]));
    }

    public function create()
    {
        $data = [
            'denomination' => $this->input->post('denomination'),
            'niveau_id_niveau' => (int) $this->input->post('niveau_id_niveau'),
        ];
        if (
            $this->ClasseModel->isExist([
                'denomination' => $data['denomination'],
            ])
        ) {
            echo json_encode(['error' => true, 'message' => "La classe \''{$data['denomination']}'\' existe déjà."]);
        } else {
            $data = $this->ClasseModel->insert($data);
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
            'niveau_id_niveau' => (int) $this->input->post('niveau_id_niveau'),
        ];


        if (
            $this->ClasseModel->isExist(
                ['denomination' => $data['denomination']],
                'and',
                [$this->pk => $id]
            )
        ) {
            echo json_encode(['error' => true, 'message' => "La classe \''{$data['denomination']}'\' existe déjà."]);
        } else {
            $data = $this->ClasseModel->update($id, $data);
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

                $data = $this->ClasseModel->delete($id);

                if ($data) {
                    echo json_encode(['error' => false, 'data' => $data]);
                } else {
                    echo json_encode(['error' => false, 'message' => 'Échec de la suppression']);
                }
            } else {
                echo json_encode(['error' => false, 'message' => 'Échec de la suppression']);
            }
        } else {
            echo json_encode(['error' => false, 'message' => 'Échec de la suppression']);
        }
    }



    // Selection des classes par id_matiere
    public function getAllClasseByIdMatiere($id = 0)
    {
        $datas = [];
        if ($id > 0) {
            $datas = $this->ClasseModel->getAllClasseByIdMatiere($id);
        }
        echo json_encode($datas);
    }
}
