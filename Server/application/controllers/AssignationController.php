<?php
defined('BASEPATH') or exit('No direct script access allowed');

class AssignationController extends CI_Controller
{
    protected $pk = 'id_assignation';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('MatiereClasseProfModel', 'assignation');
    }

    public function index(): void
    {
    }

    public function getAllByClasseId(int $id  )
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            if ( $id ) {
                $datas = $this->assignation->getAllByClasseId($id);
                if ($datas) {
                    echo json_encode(['error' => false, 'data' => $datas]);
                } else {
                    echo json_encode(['error' => true, 'message' => 'Aucun classe trouvé.']);
                }
            } else {
                echo json_encode(['error' => true, 'message' => 'Aucun classe trouvé.']);
            }
        } else {
            echo json_encode([
                'error' => true,
                'message' => 'Aucun classe trouvé',
                'details' => 'La requette n\'est pas autorisé.'
            ]);
        }
    }
}
