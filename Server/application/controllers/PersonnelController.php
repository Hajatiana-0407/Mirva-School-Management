<?php
defined('BASEPATH') or exit('No direct script access allowed');

class PersonnelController extends CI_Controller
{
    protected $pk = 'id_personnel';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('PersonnelModel');
    }

    public function index()
    {
        $data = $this->PersonnelModel->findAll();
        echo json_encode($data);
    }

    public function create()
    {

        // Récupération des données du formulaire
        $data = [
            'nom'               => $this->input->post('nom'),
            'prenom'            => $this->input->post('prenom'),
            'addresse'          => $this->input->post('addresse'),
            'telephone'         => $this->input->post('telephone'),
            'date_naissance'    => $this->input->post('date_naissance'),
            'sexe'              => $this->input->post('sexe'),
            'engagement'        => $this->input->post('engagement'),
            'email'             => $this->input->post('email'),
            'id_type_personnel'    => $this->input->post('type_personnel'),
        ];

        // Gestion de l'upload de la photo de profil
        if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
            $photo_result = upload_file('photo', PERSONNEL_PROFIL_UPLOAD_DIR);
            if ($photo_result['success']) {
                $data['photo'] = PERSONNEL_PROFIL_UPLOAD_DIR . $photo_result['file_name'];
            } else {
                echo json_encode(['error' => true, 'message' => "Erreur upload photo : " . $photo_result['error']]);
                return;
            }
        }

        // Gestion de l'upload de la pièce d'identité (pc_cin)
        if (isset($_FILES['pc_cin']) && $_FILES['pc_cin']['error'] == 0) {
            $cin_result = upload_file('pc_cin', PERSONNEL_PROFIL_UPLOAD_DIR);
            if ($cin_result['success']) {
                $data['pc_cin'] = PERSONNEL_PROFIL_UPLOAD_DIR . $cin_result['file_name'];
            } else {
                echo json_encode(['error' => true, 'message' => "Erreur upload pièce d'identité : " . $cin_result['error']]);
                return;
            }
        }

        // Création du personnel
        $result = $this->PersonnelModel->insert($data);

        if ($result) {
            echo json_encode(['error' => false, 'data' => $result]);
        } else {
            echo json_encode(['error' => true, 'message' => "Erreur lors de l'enregistrement"]);
        }
    }

    public function update()
    {
        $id = $this->input->post('id_personnel');
        if (!$id) {
            echo json_encode(['error' => true, 'message' => "ID manquant"]);
            return;
        }

        // Récupération des données du formulaire
        $data = [
            'nom'               => $this->input->post('nom'),
            'prenom'            => $this->input->post('prenom'),
            'addresse'          => $this->input->post('addresse'),
            'telephone'         => $this->input->post('telephone'),
            'date_naissance'    => $this->input->post('date_naissance'),
            'sexe'              => $this->input->post('sexe'),
            'engagement'        => $this->input->post('engagement'),
            'email'             => $this->input->post('email'),
            'id_type_personnel'              => $this->input->post('type_personnel'),
        ];

        // Gestion de l'upload de la photo de profil (optionnel)
        if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
            $photo_result = upload_file('photo', './uploads/personnel/');
            if ($photo_result['success']) {
                $data['photo'] = 'uploads/personnel/' . $photo_result['file_name'];
            } else {
                echo json_encode(['error' => true, 'message' => "Erreur upload photo : " . $photo_result['error']]);
                return;
            }
        }

        // Gestion de l'upload de la pièce d'identité (pc_cin) (optionnel)
        if (isset($_FILES['pc_cin']) && $_FILES['pc_cin']['error'] == 0) {
            $cin_result = upload_file('pc_cin', './uploads/personnel/');
            if ($cin_result['success']) {
                $data['pc_cin'] = 'uploads/personnel/' . $cin_result['file_name'];
            } else {
                echo json_encode(['error' => true, 'message' => "Erreur upload pièce d'identité : " . $cin_result['error']]);
                return;
            }
        }

        // Mise à jour du personnel
        $result = $this->PersonnelModel->update($id, $data);

        if ($result) {
            echo json_encode(['error' => false, 'data' => $result]);
        } else {
            echo json_encode(['error' => true, 'message' => "Erreur lors de la mise à jour"]);
        }
    }

    public function delete()
    {

        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

            $input = json_decode(file_get_contents('php://input'), true);

            if (!empty($input[$this->pk])) {
                $id = $input[$this->pk];

                $data = $this->PersonnelModel->delete($id);

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
