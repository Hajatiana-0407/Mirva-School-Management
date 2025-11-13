<?php
defined('BASEPATH') or exit('No direct script access allowed');

class SitePresentationController extends CI_Controller
{
    protected $pk = 'id_presentation';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('SitePresentationModel');
    }

    public function index()
    {
        $data = $this->SitePresentationModel->findLatest();
        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'error' => false,
                'data' => $data
            ]));
    }

    public function create() {}
    public function update()
    {
        $id = $this->input->post($this->pk);
        $data = [
            'titre' => $this->input->post('titre'),
            'description' => $this->input->post('description'),
            'nombre_eleves' => $this->input->post('nombre_eleves'),
            'nombre_professeurs' => $this->input->post('nombre_professeurs'),
            'annees_experience' => $this->input->post('annees_experience'),
            'taux_reussite' => $this->input->post('taux_reussite'),
        ];

        // ? Image
        if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
            $imageIndetityUpload = upload_file('image', HERO_UPLOAD_DIR);
            if ($imageIndetityUpload['success']) {
                $data['image'] = $imageIndetityUpload['file_name'];
            } else {
                echo json_encode(['error' => true, 'message' => "Erreur lors de l'upload de l'image de présentation : " . $imageIndetityUpload['error']]);
                return;
            }
        }

        $data =  $this->SitePresentationModel->update($id, $data);
        if ($data) {
            echo json_encode(['error' => false, 'data' => $data]);
        } else {
            echo json_encode(['error' => true, 'message' => 'Une erreur c\'est produite.']);
        }
    }

    public function delete()
    {

        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

            $input = json_decode(file_get_contents('php://input'), true);

            if (!empty($input['id_niveau'])) {
                $id = $input['id_niveau'];

                $data = $this->SitePresentationModel->delete($id);

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
