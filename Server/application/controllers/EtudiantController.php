<?php
defined('BASEPATH') or exit('No direct script access allowed');

class EtudiantController extends CI_Controller
{
    protected $pk = 'id_eleve';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('EtudiantModel');
    }

    public function index()
    {
        $data = $this->EtudiantModel->findAll();
        echo json_encode($data);
    }

    public function findOne($matricule = '')
    {
        $data = $this->EtudiantModel->findDetailsByMat($matricule);
        echo json_encode($data);
    }

    public function create() {}

    public function update()
    {

        $id = $this->input->post($this->pk);
        // ================== INFORMATIONS DE L'ELEVE ==================
        // ? Photo d'identité de l'étudiant
        $photo_indetite = '';
        if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
            $photoIndetityUpload = upload_file('photo', STUDENT_UPLOAD_DIR . 'photos');
            if ($photoIndetityUpload['success']) {
                $photo_indetite = $photoIndetityUpload['file_name'];
            } else {
                echo json_encode(['error' => true, 'message' => "Erreur upload photo d'identité de l'étudiant : " . $photoIndetityUpload['error']]);
                return;
            }
        }

        // ? Photocopie de l'acte de naissance 
        $act_naissance = '';
        if (isset($_FILES['acte_naissance']) && $_FILES['acte_naissance']['error'] == 0) {
            $pcActeNassanceUpload = upload_file('acte_naissance', STUDENT_UPLOAD_DIR . 'pi');
            if ($pcActeNassanceUpload['success']) {
                $act_naissance = $pcActeNassanceUpload['file_name'];
            } else {
                echo json_encode(['error' => true, 'message' => "Erreur upload acte de naissace de l'etudiant : " . $pcActeNassanceUpload['error']]);
                return;
            }
        }

        // ? Photocopie de la Piece d'identité de l'etudiant
        $pieceIndetite = '';
        if (isset($_FILES['piece_identite']) && $_FILES['piece_identite']['error'] == 0) {
            $pcPieceIdentiteUpload = upload_file('piece_identite', STUDENT_UPLOAD_DIR . 'pi');
            if ($pcPieceIdentiteUpload['success']) {
                $pieceIndetite =  $pcPieceIdentiteUpload['file_name'];
            } else {
                echo json_encode(['error' => true, 'message' => "Erreur upload pièce d'identité de l'etudiant : " . $pcPieceIdentiteUpload['error']]);
                return;
            }
        }

        // ? Photocopie du dernier bultin si l'etudiant est nouveau
        $bulletin = '';
        if (isset($_FILES['bulletin']) && $_FILES['bulletin']['error'] == 0) {
            $pcBulletinUpload = upload_file('bulletin', STUDENT_UPLOAD_DIR . 'bulletins');
            if ($pcBulletinUpload['success']) {
                $bulletin = $pcBulletinUpload['file_name'];
            } else {
                echo json_encode(['error' => true, 'message' => "Erreur upload du bulletin de note de l'etudiant : " . $pcBulletinUpload['error']]);
                return;
            }
        }

        $etudiant = [
            'nom' => $this->input->post('nom'),
            'prenom' => $this->input->post('prenom'),
            'adresse' => $this->input->post('adresse'),
            'telephone' => $this->input->post('telephone'),
            'date_naissance' => $this->input->post('date_naissance'),
            'lieu_naissance' => $this->input->post('lieu_naissance'),
            'sexe' => $this->input->post('sexe'),
            'maladies' => $this->input->post('maladies'),
            'email' => $this->input->post('email'),
            'nationalite' => $this->input->post('nationalite'),

            // Informations supplémentaires
            'urgence_nom' => $this->input->post('urgence_nom'),
            'urgence_lien' => $this->input->post('urgence_lien'),
            'urgence_tel' => $this->input->post('urgence_tel'),
        ];

        // ? Piece joint
        if ($photo_indetite !== '') {
            $etudiant['photo'] = $photo_indetite;
        }
        if ($act_naissance !== '') {
            $etudiant['pc_act_naissance'] = $act_naissance;
        }
        if ($pieceIndetite !== '') {
            $etudiant['pc_pi'] = $pieceIndetite;
        }
        if ($bulletin !== '') {
            $etudiant['bulletin'] = $bulletin;
        }

        // ! Enregistrement de l'etudiant dans la base de données
        $etudiantUpdated =  $this->EtudiantModel->update($id,  $etudiant);

        if ($etudiantUpdated) {
            echo json_encode(['error' => false, 'data' => $etudiantUpdated]);
        } else {
            echo json_encode([
                'error' => true,
                'message' => 'Une erreur c\'est produite.',
                'details' => 'thie student was not found'
            ]);
        }
    }

    public function delete()
    {

        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

            $input = json_decode(file_get_contents('php://input'), true);

            if (!empty($input[$this->pk])) {
                $id = $input[$this->pk];

                $data = $this->EtudiantModel->delete($id);

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


    public function getStatistique()
    {
        $boys = $this->EtudiantModel->getCount(['sexe' => 'Homme']);
        $girls = $this->EtudiantModel->getCount(['sexe' => 'Femme']);
        $all = $this->EtudiantModel->getCount();

        $statistique = [
            'boy' => [
                'nbr' => $boys,
                'percent' => $boys * 100 / $all,
            ],
            'girl' => [
                'nbr' => $girls,
                'percent' => $girls * 100 / $all,
            ],
            'all' => [
                'nbr' => $all,
                'percent' => 100,
            ]
        ];

        echo json_encode($statistique);
    }
}
