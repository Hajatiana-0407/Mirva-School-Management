<?php
defined('BASEPATH') or exit('No direct script access allowed');

class InscriptionController extends CI_Controller
{
    protected $pk = 'id_inscription';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('InscriptionModel');
        $this->load->model('EleveModel');
    }

    public function index()
    {
        $data = $this->InscriptionModel->findAll();
        echo json_encode($data);
    }

    // ? Creation d'une nouvel inscription 
    public function create()
    {
        $this->load->helper('matricule');
        //? Creation d'un matricule unique 
        $lasted = $this->EleveModel->findLasted();
        $matricule = '';
        if ($lasted) {
            $matricule = generateMatricule(STUDENT_PRIFIX, $lasted["matricule_etudiant"]);
        } else {
            $matricule = generateMatricule(STUDENT_PRIFIX);
        }


        // ================== INFORMATIONS DES PARENTS ==================
        $tuteur_type = $this->input->post('tuteur_type');

        // ? Piece d'identité des parents / tuteur
        $pere_pi = '';
        if (isset($_FILES['pc_cin_pere']) && $_FILES['pc_cin_pere']['error'] == 0) {
            $piPereUpload = upload_file('pc_cin_pere', './public/uploads/parents');
            if ($piPereUpload['success']) {
                $pere_pi = '/public/uploads/parents/' . $piPereUpload['file_name'];
            } else {
                echo json_encode(['error' => true, 'message' => "Erreur upload pièce d'identité du parent: " . $piPereUpload['error']]);
                return;
            }
        }
        $mere_pi = '';
        if (isset($_FILES['pc_cin_mere']) && $_FILES['pc_cin_mere']['error'] == 0) {
            $piMereUpload = upload_file('pc_cin_mere', './public/uploads/parents');
            if ($piMereUpload['success']) {
                $mere_pi = '/public/uploads/parents/' . $piMereUpload['file_name'];
            } else {
                echo json_encode(['error' => true, 'message' => "Erreur upload pièce d'identité du parent: " . $piMereUpload['error']]);
                return;
            }
        }
        $tuteur_pi = '';
        if (isset($_FILES['pc_cin_tuteur']) && $_FILES['pc_cin_tuteur']['error'] == 0) {
            $piTuteurUpload = upload_file('pc_cin_tuteur', './public/uploads/parents');
            if ($piTuteurUpload['success']) {
                $tuteur_pi = '/public/uploads/parents/' . $piTuteurUpload['file_name'];
            } else {
                echo json_encode(['error' => true, 'message' => "Erreur upload pièce d'identité du parent: " . $piTuteurUpload['error']]);
                return;
            }
        }

        $parents = [];
        if ($tuteur_type === 'parent') {
            // ? Parents
            $parents = [
                'nom_pere' => $this->input->post('pere_nom'),
                'profession_pere' => $this->input->post('pere_profession'),
                'telephone_pere' => $this->input->post('pere_tel'),
                'nom_mere' => $this->input->post('mere_nom'),
                'profession_mere' => $this->input->post('mere_profession'),
                'telephone_mere' => $this->input->post('mere_tel'),
                'adresse' => $this->input->post('adresse_parents'),
                'type' => $tuteur_type,
                'tuteur_email' => $this->input->post('tuteur_email'), // si tuteur et parents email identique

                'pc_cin_pere' => $pere_pi,
                'pc_cin_mere' => $mere_pi,
            ];
        } else {
            // ? Tuteur légal
            $parents = [
                'tuteur_nom' => $this->input->post('tuteur_nom'),
                'tuteur_lien' => $this->input->post('tuteur_lien'),
                'tuteur_tel' => $this->input->post('tuteur_tel'),
                'tuteur_email' => $this->input->post('tuteur_email'),
                'type' => $tuteur_type,
                'pc_cin_tuteur' => $tuteur_pi,
            ];
        }

        // ! Enregistrer les informations des parents dans la base de données
        $parent_id = null;
        if ($tuteur_type !== '' && ($this->input->post('pere_nom') !== "" || $this->input->post('nom_mere') !== '' || $this->input->post('tuteur_nom') !== '')) {
            $this->load->model('ParentModel');
            $parentInfo = $this->ParentModel->insert($parents);
            if ($parentInfo) {
                $parent_id = $parentInfo['id_parent'];
            }
        }

        // ================== INFORMATIONS DE L'ELEVE ==================
        // ? Photo d'identité de l'étudiant
        $photo_indetite = '';
        if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
            $photoIndetityUpload = upload_file('photo', STUDENT_UPLOAD_DIR . 'photos');
            if ($photoIndetityUpload['success']) {
                $photo_indetite = STUDENT_UPLOAD_DIR . 'photos/' . $photoIndetityUpload['file_name'];
            } else {
                echo json_encode(['error' => true, 'message' => "Erreur upload photo d'identité de l'étudiant : " . $photoIndetityUpload['error']]);
                return;
            }
        }

        // ? Photocopie de l'acte de naissance 
        $act_naissance = '';
        if (isset($_FILES['acte_naissance']) && $_FILES['acte_naissance']['error'] == 0) {
            $pcActeNassanceUpload = upload_file('acte_naissance', './public/uploads/etudiant/pi');
            if ($pcActeNassanceUpload['success']) {
                $act_naissance = '/public/uploads/etudiant/pi/' . $pcActeNassanceUpload['file_name'];
            } else {
                echo json_encode(['error' => true, 'message' => "Erreur upload acte de naissace de l'etudiant : " . $pcActeNassanceUpload['error']]);
                return;
            }
        }

        // ? Photocopie de la Piece d'identité de l'etudiant
        $pieceIndetite = '';
        if (isset($_FILES['piece_identite']) && $_FILES['piece_identite']['error'] == 0) {
            $pcPieceIdentiteUpload = upload_file('piece_identite', './public/uploads/etudiant/pi');
            if ($pcPieceIdentiteUpload['success']) {
                $pieceIndetite = '/public/uploads/etudiant/pi/' . $pcPieceIdentiteUpload['file_name'];
            } else {
                echo json_encode(['error' => true, 'message' => "Erreur upload pièce d'identité de l'etudiant : " . $pcPieceIdentiteUpload['error']]);
                return;
            }
        }

        // ? Photocopie du dernier bultin si l'etudiant est nouveau
        $bulletin = '';
        if (isset($_FILES['bulletin']) && $_FILES['bulletin']['error'] == 0) {
            $pcBulletinUpload = upload_file('bulletin', './public/uploads/etudiant/bulletins');
            if ($pcBulletinUpload['success']) {
                $bulletin = '/public/uploads/etudiant/bulletins/' . $pcBulletinUpload['file_name'];
            } else {
                echo json_encode(['error' => true, 'message' => "Erreur upload du bulletin de note de l'etudiant : " . $pcBulletinUpload['error']]);
                return;
            }
        }

        $etudiant = [
            'matricule_etudiant' => $matricule,
            'nom' => $this->input->post('nom'),
            'prenom' => $this->input->post('prenom'),
            'adresse' => $this->input->post('adresse'),
            'telephone' => $this->input->post('telephone'),
            'parent_id_parent' => $parent_id, // ? Indetification des parents ou du tuteur 
            'date_naissance' => $this->input->post('date_naissance'),
            'lieu_naissance' => $this->input->post('lieu_naissance'),
            'sexe' => $this->input->post('sexe'),
            'maladies' => $this->input->post('maladies'),
            'email' => $this->input->post('email'),
            'nationalite' => $this->input->post('nationalite'),
            'photo' => $photo_indetite,
            'pc_act_naissance' => $act_naissance,
            'pc_pi' => $pieceIndetite,
            'bulletin' => $bulletin,

            // Informations supplémentaires
            'urgence_nom' => $this->input->post('urgence_nom'),
            'urgence_lien' => $this->input->post('urgence_lien'),
            'urgence_tel' => $this->input->post('urgence_tel'),
        ];

        // ! Enregistrement de l'etudiant dans la base de données
        $eleve_id = null;
        $etudiantIsered =  $this->EleveModel->insert($etudiant);
        if ($etudiantIsered) {
            $eleve_id = $etudiantIsered['id_eleve'];
        }



        $inscription = [
            'date_inscription' => $this->input->post('date_inscription'),
            'niveau_id_niveau' => $this->input->post('niveau'),
            'classe_id_classe' => $this->input->post('classe'),
            'annee_scolaire_id_annee_scolaire' => $this->input->post('annee_scolaire'),
            'eleve_id_eleve' => $eleve_id,
            'ancienne_ecole' => $this->input->post('ancienne_ecole'),
            'date_inscription' => $this->input->post('date_inscription'),
            'is_droit_payed' => $this->input->post('isDroitPaye'),
        ];

        // ! Enregistrement de l'inscription dans la base de données 
        $this->load->model('InscriptionModel');
        $inscriptionData = $this->InscriptionModel->insert($inscription);
        if ($inscriptionData) {
            echo json_encode(['error' => false, 'data' => $inscriptionData]);
        } else {
            echo json_encode(['error' => true, 'message' => "Erreur lors de l'enregistrement de l'inscription"]);
        };
        return;
    }
    
    // ! Suppression d'une inscription
    public function delete()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $input = json_decode(file_get_contents('php://input'), true);
            if (!empty($input[$this->pk])) {
                $id = $input[$this->pk];

                $data = $this->InscriptionModel->delete($id);

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
