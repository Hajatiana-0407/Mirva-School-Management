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
        $data = $this->EmploiDuTempsModel->findAllQuery();
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
            $id_personnel = $this->input->post('id_personnel');
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
                $datas = $this->EmploiDuTempsModel->inserteEdt($datas, $id_classe, $id_personnel);
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

    public function update()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $assignation_id = $this->input->post('assignation_id');
            $heure_debut = $this->input->post('heure_debut');
            $heure_fin = $this->input->post('heure_fin');
            $jour_id = $this->input->post('jour_id');
            $salle = $this->input->post('salle');
            $id_classe = $this->input->post('id_classe');
            $id_personnel = $this->input->post('id_personnel');
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
                $datas = $this->EmploiDuTempsModel->inserteEdt($datas, $id_classe, $id_personnel);
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

    public function delete()
    {

        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

            $input = json_decode(file_get_contents('php://input'), true);
            if (!empty($input[$this->pk])) {
                $id = $input[$this->pk];
                $id_classe = isset(  $input['id_classe'] ) ? $input['id_classe'] : null  ;
                $id_personnel = isset(  $input['id_personnel'] ) ? $input['id_personnel'] : null ;

                $data = $this->EmploiDuTempsModel->delete($id);

                if ($data) {
                    $responses = null;
                    if ($id_personnel) {
                        $responses = $this->EmploiDuTempsModel->findOneById(null, $id_personnel);
                    } else {
                        $responses = $this->EmploiDuTempsModel->findOneById($id_classe);
                    }
                    echo json_encode(['error' => false, 'data' => $responses]);
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

}
