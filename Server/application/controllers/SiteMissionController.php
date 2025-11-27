<?php
defined('BASEPATH') or exit('No direct script access allowed');

class SiteMissionController extends CI_Controller
{
    protected $pk = 'id_slogan ';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('SiteMissionModel');
    }

    public function index()
    {
        $data = $this->SiteMissionModel->findAll();
        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'error' => false,
                'data' => $data
            ]));
    }
    // public function create()
    // {
    //     $data = [
    //         'titre' => $this->input->post('titre'),
    //         'description' => $this->input->post('description'),
    //         'icone' => $this->input->post('icone'),
    //         'actif' => $this->input->post('actif'),
    //     ];


    //     if ($this->SiteValeurModel->isExist(
    //         ["titre" => $data['titre']],
    //     )) {
    //         echo json_encode(['error' => true, 'message' => 'Le titre existe déjà.']);
    //     } else {
    //         $data =  $this->SiteValeurModel->insert($data);
    //         if ($data) {
    //             echo json_encode(['error' => false, 'data' => $data]);
    //         } else {
    //             echo json_encode(['error' => true, 'message' => 'Une erreur c\'est produite.']);
    //         }
    //     }
    // }
    // public function update()
    // {
    //     $id = $this->input->post($this->pk);
    //     $data = [
    //         'titre' => $this->input->post('titre'),
    //         'description' => $this->input->post('description'),
    //         'icone' => $this->input->post('icone'),
    //         'actif' => $this->input->post('actif'),
    //     ];
    //     if ($this->SiteValeurModel->isExist(
    //         ["titre" => $data['titre']],
    //         'and',
    //         ['id_valeur'=> $id]
    //     )) {
    //         echo json_encode(['error' => true, 'message' => 'Le titre existe déjà.']);
    //     } else {
    //         $data =  $this->SiteValeurModel->update($id, $data);
    //         if ($data) {
    //             echo json_encode(['error' => false, 'data' => $data]);
    //         } else {
    //             echo json_encode(['error' => true, 'message' => 'Une erreur c\'est produite.']);
    //         }
    //     }
    // }

    // public function delete()
    // {

    //     if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

    //         $input = json_decode(file_get_contents('php://input'), true);

    //         if (!empty($input[$this->pk])) {
    //             $id = $input[$this->pk];

    //             $data = $this->SiteValeurModel->delete($id);

    //             if ($data) {
    //                 echo json_encode(['error' => false, 'data' => $data]);
    //             } else {
    //                 echo json_encode(['error' => false,  'message' => 'Échec de la suppression']);
    //             }
    //         } else {
    //             echo json_encode(['error' => false,  'message' => 'Échec de la suppression']);
    //         }
    //     } else {
    //         echo json_encode(['error' => false,  'message' => 'Échec de la suppression']);
    //     }
    // }

    // public function publish()
    // {
    //     if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //         $id = $this->input->post($this->pk);
    //         if ($id == null) {
    //             echo json_encode([
    //                 'error' => true,
    //                 'message' => 'Impossible de changer l\'état du valeur.',
    //                 'details' => 'L\'identifiant est null.'
    //             ]);
    //             return;
    //         }
    //         $data = [
    //             'actif' => $this->input->post('actif'),
    //         ];
    //         $data =  $this->SiteValeurModel->update($id, $data);
    //         if ($data) {
    //             echo json_encode(['error' => false, 'data' => $data]);
    //         } else {
    //             echo json_encode(['error' => true, 'message' => 'Une erreur c\'est produite.']);
    //         }
    //     } else {
    //         echo json_encode([
    //             'error' => true,
    //             'message' => 'Impossible de changer l\'état du valeur.',
    //             'details' => 'Methode non autorisé.'
    //         ]);
    //         return;
    //     }
    // }
}
