<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ParentController extends CI_Controller
{
    protected $pk = 'id_parent';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('ParentModel');
    }

    public function index()
    {
        $data = $this->ParentModel->findAll();
        echo json_encode($data);
    }

    public function create()
    {

        // ================== INFORMATIONS DES PARENTS ==================
        $id_eleve =  $this->input->post('id_eleve');
        if (!$id_eleve) {
            echo json_encode([
                'error' => true,
                'details' => 'Impossible de trouver l\'indentifiant de l\'eleve a attribué de parent',
                'message' => 'Une erreur c\'est produite.'
            ]);
        }
        $tuteur_type = $this->input->post('tuteur_type');
        // ? Piece d'identité des parents / tuteur
        $pere_pi = '';
        if (isset($_FILES['pc_cin_pere']) && $_FILES['pc_cin_pere']['error'] == 0) {
            $piPereUpload = upload_file('pc_cin_pere', PARENT_UPLOAD_DIR);
            if ($piPereUpload['success']) {
                $pere_pi = $piPereUpload['file_name'];
            } else {
                echo json_encode([
                    'error' => true,
                    'type' => 'fileSize',
                    'message' => "Erreur lors de l' upload pièce d'identité du parent: ",
                    'details' => $piPereUpload['error']
                ]);
                return;
            }
        }
        $mere_pi = '';
        if (isset($_FILES['pc_cin_mere']) && $_FILES['pc_cin_mere']['error'] == 0) {
            $piMereUpload = upload_file('pc_cin_mere', PARENT_UPLOAD_DIR);
            if ($piMereUpload['success']) {
                $mere_pi = $piMereUpload['file_name'];
            } else {
                echo json_encode([
                    'error' => true,
                    'type' => 'fileSize',
                    'message' => "Erreur lors de l' upload pièce d'identité du parent: ",
                    'details' => $piMereUpload['error']
                ]);
                return;
            }
        }
        $tuteur_pi = '';
        if (isset($_FILES['pc_cin_tuteur']) && $_FILES['pc_cin_tuteur']['error'] == 0) {
            $piTuteurUpload = upload_file('pc_cin_tuteur', PARENT_UPLOAD_DIR);
            if ($piTuteurUpload['success']) {
                $tuteur_pi =  $piTuteurUpload['file_name'];
            } else {
                echo json_encode([
                    'error' => true,
                    'type' => 'fileSize',
                    'message' => "Erreur lors de l' upload pièce d'identité du parent: ",
                    'details' => $piTuteurUpload['error']
                ]);
                return;
            }
        }

        $parents = [];
        if ($tuteur_type === 'parent') {
            // ? Parents
            $parents = [
                'nom_pere' => $this->input->post('nom_pere'),
                'profession_pere' => $this->input->post('profession_pere'),
                'telephone_pere' => $this->input->post('telephone_pere'),
                'nom_mere' => $this->input->post('nom_mere'),
                'profession_mere' => $this->input->post('profession_mere'),
                'telephone_mere' => $this->input->post('telephone_mere'),
                'adresse' => $this->input->post('adresse'),
                'type' => $tuteur_type,
                'tuteur_email' => $this->input->post('tuteur_email'), // si tuteur et parents email identique
            ];
        } else {
            // ? Tuteur légal
            $parents = [
                'tuteur_nom' => $this->input->post('tuteur_nom'),
                'tuteur_lien' => $this->input->post('tuteur_lien'),
                'tuteur_tel' => $this->input->post('tuteur_tel'),
                'tuteur_email' => $this->input->post('tuteur_email'),
                'type' => $tuteur_type,
            ];
        }
        // ? Pieces jointes
        if ($pere_pi) {
            $parents['pc_cin_pere'] = $pere_pi;
        }
        if ($mere_pi) {
            $parents['pc_cin_mere'] = $mere_pi;
        }
        if ($tuteur_pi) {
            $parents['pc_cin_tuteur'] = $tuteur_pi;
        }
        $data =  $this->ParentModel->insert($parents);
        if ($data) {
            $this->load->model('EtudiantModel');
            // Attibuer les parent a l'tudiant 
            $this->EtudiantModel->update($id_eleve, [
                'parent_id_parent' => $data['id_parent']
            ]);
            echo json_encode([
                'error' => false,
                'data' => $this->ParentModel->findOneById($data['id_parent'])
            ]);
        } else {
            echo json_encode(['error' => true, 'message' => 'Une erreur c\'est produite.']);
        }
        return;
    }

    public function update()
    {
        // ================== INFORMATIONS DES PARENTS ==================

        $id = $this->input->post($this->pk);

        $deleteParent = $this->input->post('to_delete_parent');
        $deleteTuteur = $this->input->post('to_delete_tuteur');

        if (!isset($id)) {
            echo json_encode([
                'error' => true,
                'details' => 'Impossible de trouver l\'indentifiant du parent',
                'message' => 'Une erreur c\'est produite.'
            ]);
            return;
        }

        $tuteur_type = $this->input->post('tuteur_type');

        // ? Piece d'identité des parents / tuteur
        $pere_pi = '';
        if (isset($_FILES['pc_cin_pere']) && $_FILES['pc_cin_pere']['error'] == 0) {
            $piPereUpload = upload_file('pc_cin_pere', PARENT_UPLOAD_DIR);
            if ($piPereUpload['success']) {
                $pere_pi = $piPereUpload['file_name'];
            } else {
                echo json_encode([
                    'error' => true,
                    'type' => 'fileSize',
                    'message' => "Erreur lors de l' upload pièce d'identité du parent: ",
                    'details' => $piPereUpload['error']
                ]);
                return;
            }
        }
        $mere_pi = '';
        if (isset($_FILES['pc_cin_mere']) && $_FILES['pc_cin_mere']['error'] == 0) {
            $piMereUpload = upload_file('pc_cin_mere', PARENT_UPLOAD_DIR);
            if ($piMereUpload['success']) {
                $mere_pi = $piMereUpload['file_name'];
            } else {
                echo json_encode([
                    'error' => true,
                    'type' => 'fileSize',
                    'message' => "Erreur lors de l' upload pièce d'identité du parent: ",
                    'details' => $piMereUpload['error']
                ]);
                return;
            }
        }
        $tuteur_pi = '';
        if (isset($_FILES['pc_cin_tuteur']) && $_FILES['pc_cin_tuteur']['error'] == 0) {
            $piTuteurUpload = upload_file('pc_cin_tuteur', PARENT_UPLOAD_DIR);
            if ($piTuteurUpload['success']) {
                $tuteur_pi =  $piTuteurUpload['file_name'];
            } else {
                echo json_encode([
                    'error' => true,
                    'type' => 'fileSize',
                    'message' => "Erreur lors de l' upload pièce d'identité du parent: ",
                    'details' => $piTuteurUpload['error']
                ]);
                return;
            }
        }

        $parents = [];
        $setToNull = [];
        if ($tuteur_type === 'parent') {
            // ? Parents
            $parents = [
                'nom_pere' => $this->input->post('nom_pere'),
                'profession_pere' => $this->input->post('profession_pere'),
                'telephone_pere' => $this->input->post('telephone_pere'),
                'nom_mere' => $this->input->post('nom_mere'),
                'profession_mere' => $this->input->post('profession_mere'),
                'telephone_mere' => $this->input->post('telephone_mere'),
                'adresse' => $this->input->post('adresse'),
                'type' => $tuteur_type,
                'tuteur_email' => $this->input->post('tuteur_email'), // si tuteur et parents email identique
            ];
        } else {
            // ? Tuteur légal
            $parents = [
                'tuteur_nom' => $this->input->post('tuteur_nom'),
                'tuteur_lien' => $this->input->post('tuteur_lien'),
                'tuteur_tel' => $this->input->post('tuteur_tel'),
                'adresse' => $this->input->post('adresse'),
                'tuteur_email' => $this->input->post('tuteur_email'),
                'type' => $tuteur_type,
            ];
        }

        // ! Information sur le tuteur a effacer
        if ($deleteTuteur === 'true') {
            $setToNull = [
                'tuteur_nom',
                'tuteur_lien',
                'tuteur_tel',
                'pc_cin_tuteur',
            ];
        }

        // ! Information sur les parent a effacer
        if ($deleteParent === 'true') {
            $setToNull = [
                'nom_pere',
                'profession_pere',
                'telephone_pere',
                'nom_mere',
                'profession_mere',
                'telephone_mere',
            ];
        }



        // ? Pieces jointes
        if ($pere_pi || $deleteParent) {
            $parents['pc_cin_pere'] = $pere_pi;
        }
        if ($mere_pi || $deleteParent) {
            $parents['pc_cin_mere'] = $mere_pi;
        }
        if ($tuteur_pi || $deleteTuteur) {
            $parents['pc_cin_tuteur'] = $tuteur_pi;
        }


        // ! Si les information sur les parent et le tutuer sont garder ( type = parent/tuteur )
        if ($tuteur_type === 'parent' && $deleteTuteur !== 'true') {
            $parents['type'] = 'parent/tuteur';
        }
        if ($tuteur_type === 'tuteur' && $deleteParent !== 'true') {
            $parents['type'] = 'parent/tuteur';
        }

        foreach ($setToNull as  $key) {
            $parents[$key] = '';
        }

        $data =  $this->ParentModel->update($id, $parents);
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

            if (!empty($input[$this->pk])) {
                $id = $input[$this->pk];

                $data = $this->ParentModel->delete($id);

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
