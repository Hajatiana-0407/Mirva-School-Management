<?php
defined('BASEPATH') or exit('No direct script access allowed');

class EmploiDuTempsController extends CI_Controller
{
    protected $pk = 'id_edt';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('EmploiDuTempsModel');
    }

    public function index()
    {
        $data = $this->EmploiDuTempsModel->findAll();
        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode($data));
    }

    public function create()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $assignation_id = $this->input->post('assignation_id');
            $heure_debut = $this->input->post('heure_debut');
            $heure_fin = $this->input->post('heure_fin');
            $jour_id = $this->input->post('jour_id');
            $salle = $this->input->post('salle');
            $id_classe = $this->input->post('id_classe');
            $datas = [];
            for ($i = (int) $heure_debut; $i < (int) $heure_fin; $i++) {
                $datas[] = [
                    'assignation_id' => $assignation_id,
                    'heure_debut' => HEUREINDEX[$i],
                    'jour_id' => $jour_id,
                    'salle' => $salle,
                    'heure_index' => $i,
                ];
            }
            if (count($datas) > 0) {
                $datas = $this->EmploiDuTempsModel->inserteEdt($datas, $id_classe);
                echo json_encode(['error' => false, 'data' => $datas]);
            }
        } else {
            echo json_encode([
                'error' => true,
                'message' => 'Aucun classe trouvé',
                'details' => 'La requette n\'est pas autorisé.'
            ]);
        }

    }

    // public function update()
    // {

    //     $id = $this->input->post($this->pk);
    //     $data = [
    //         'denomination' => $this->input->post('denomination'),
    //         'niveau_id_niveau' => (int)$this->input->post('niveau_id_niveau'),
    //     ];


    //     if ($this->EmploiDuTempsModel->isExist(
    //         ['denomination' => $data['denomination']],
    //         'and',
    //         [$this->pk => $id]
    //     )) {
    //         echo json_encode(['error' => true, 'message' => "La classe \''{$data['denomination']}'\' existe déjà."]);
    //     } else {
    //         $data =  $this->EmploiDuTempsModel->update($id, $data);
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

    //             $data = $this->EmploiDuTempsModel->delete($id);

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



    // // Selection des classes par id_matiere
    // public function getAllClasseByIdMatiere($id = 0)
    // {
    //     $datas = [];
    //     if ($id > 0) {
    //         $datas =  $this->EmploiDuTempsModel->getAllClasseByIdMatiere($id);
    //     }
    //     echo json_encode($datas);
    // }
}
