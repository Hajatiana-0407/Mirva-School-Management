<?php
defined('BASEPATH') or exit('No direct script access allowed');

class SiteValeurController extends CI_Controller
{
    protected $pk = 'id_valeur ';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('SiteValeurModel');
    }

    public function index()
    {
        $data = $this->SiteValeurModel->findAll();
        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'error' => false  , 
                'data' => $data 
            ]));
    }

    public function create()
    {}
    public function update()
    {

        // $id_niveau = $this->input->post('id_niveau');
        // $data = [
        //     'niveau' => $this->input->post('niveau'),
        //     'cycle' => $this->input->post('cycle'),
        //     'description' => $this->input->post('description'),
        // ];

        // if ($this->HeroModel->isExist(
        //     ["niveau" => $data['niveau']],
        //     'and',
        //     [$this->pk => $id_niveau]
        // )) {
        //     echo json_encode(['error' => true, 'message' => 'Le niveau existe déjà.']);
        // } else {
        //     $data =  $this->HeroModel->update($id_niveau, $data);
        //     if ($data) {
        //         echo json_encode(['error' => false, 'data' => $data]);
        //     } else {
        //         echo json_encode(['error' => true, 'message' => 'Une erreur c\'est produite.']);
        //     }
        // }
    }

    public function delete()
    {

        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

            $input = json_decode(file_get_contents('php://input'), true);

            if (!empty($input['id_niveau'])) {
                $id = $input['id_niveau'];

                $data = $this->SiteValeurModel->delete($id);

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
