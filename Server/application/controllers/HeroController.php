<?php
defined('BASEPATH') or exit('No direct script access allowed');

class HeroController extends CI_Controller
{
    protected $pk = 'id_slide';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('HeroModel');
    }

    public function index()
    {
        $data = $this->HeroModel->findAll();
        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'error' => false,
                'data' => $data
            ]));
    }

    public function create()
    {
        $data = [
            'titre' => $this->input->post('titre'),
            'soustitre' => $this->input->post('soustitre'),
            'cta' => $this->input->post('cta'),
            'cta_link' => $this->input->post('cta_link'),
            'actif' => $this->input->post('actif'),
        ];

        // ? Image
        if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
            $imageIndetityUpload = upload_file('image', HERO_UPLOAD_DIR);
            if ($imageIndetityUpload['success']) {
                $data['image'] = $imageIndetityUpload['file_name'];
            } else {
                echo json_encode(['error' => true, 'message' => "Erreur upload photo d'identité de l'étudiant : " . $imageIndetityUpload['error']]);
                return;
            }
        }

        if ($this->HeroModel->isExist(
            ["titre" => $data['titre']],
        )) {
            echo json_encode(['error' => true, 'message' => 'Le titre existe déjà.']);
        } else {
            $data =  $this->HeroModel->insert($data);
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
            'titre' => $this->input->post('titre'),
            'soustitre' => $this->input->post('soustitre'),
            'cta' => $this->input->post('cta'),
            'cta_link' => $this->input->post('cta_link'),
            'actif' => $this->input->post('actif'),
        ];


        // ? Image
        if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
            $imageIndetityUpload = upload_file('image', HERO_UPLOAD_DIR);
            if ($imageIndetityUpload['success']) {
                $data['image'] = $imageIndetityUpload['file_name'];
            } else {
                echo json_encode(['error' => true, 'message' => "Erreur upload photo d'identité de l'étudiant : " . $imageIndetityUpload['error']]);
                return;
            }
        }

        if ($this->HeroModel->isExist(
            ["titre" => $data['titre']],
            'and',
            ['id_slide' => $id]
        )) {
            echo json_encode(['error' => true, 'message' => 'Le titre existe déjà.']);
        } else {
            $data =  $this->HeroModel->update($id, $data);
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

                $data = $this->HeroModel->delete($id);

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

    public function publish()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = $this->input->post($this->pk);
            if ($id == null) {
                echo json_encode([
                    'error' => true,
                    'message' => 'Impossible de changer l\'état du slider.',
                    'details' => 'L\'identifiant est null.'
                ]);
                return;
            }
            $data = [
                'actif' => $this->input->post('actif'),
            ];
            $data =  $this->HeroModel->update($id, $data);
            if ($data) {
                echo json_encode(['error' => false, 'data' => $data]);
            } else {
                echo json_encode(['error' => true, 'message' => 'Une erreur c\'est produite.']);
            }
        } else {
            echo json_encode([
                'error' => true,
                'message' => 'Impossible de changer l\'état du slider.',
                'details' => 'Methode non autorisé.'
            ]);
            return;
        }
    }
}
