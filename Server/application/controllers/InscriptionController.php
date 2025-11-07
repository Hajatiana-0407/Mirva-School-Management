<?php
defined('BASEPATH') or exit('No direct script access allowed');

class InscriptionController extends CI_Controller
{
    protected $pk = 'id_inscription';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('InscriptionModel');
        $this->load->model('EtudiantModel');
        $this->load->model('UtilisateurModel');
    }

    public function index()
    {
        $data = $this->InscriptionModel->findAll();
        echo json_encode($data);
    }

    // ? Creation d'une nouvel inscription 
    public function create()
    {

        // ? Recuperation et verification de doublan matricule 
        $matricule = $this->input->post('matricule_etudiant');
        if ($this->EtudiantModel->isExist([
            'matricule_etudiant' => $matricule
        ])) {
            echo json_encode([
                'error' => true,
                'message' => "Le matricule '$matricule' existe déjà."
            ]);
            return;
        }


        // ? ================== INFORMATIONS DES PARENTS ==================
        $dataPost = $this->input->post(null, true);

        function getParentData($parentData, $defaultType)
        {
            if (empty($parentData['nom'])) {
                return null;
            }

            return [
                'id_parent' => isset($parentData['id_parent']) ? (int)$parentData['id_parent'] : 0,
                'nom' => htmlspecialchars($parentData['nom']),
                'prenom' => isset($parentData['prenom']) ? htmlspecialchars($parentData['prenom']) : '',
                'profession' => isset($parentData['profession']) ? htmlspecialchars($parentData['profession']) : '',
                'adresse' => isset($parentData['adresse']) ? htmlspecialchars($parentData['adresse']) : '',
                'telephone' => isset($parentData['telephone']) ? htmlspecialchars($parentData['telephone']) : '',
                'email' => isset($parentData['email']) ? htmlspecialchars($parentData['email']) : '',
                'contact_urgence' => isset($parentData['contact_urgence']) ? htmlspecialchars($parentData['contact_urgence']) : 0
            ];
        }

        $parents = [
            'pere' => isset($dataPost['pere']) ? getParentData($dataPost['pere'], 'père') : null,
            'mere' => isset($dataPost['mere']) ? getParentData($dataPost['mere'], 'mère') : null,
            'tuteur' => isset($dataPost['tuteur']) ? getParentData($dataPost['tuteur'], 'tuteur') : null
        ];

        $parent_eleve = [];
        foreach ($parents as $key => $parent) {
            if ($parent !== null) {
                $this->load->model('ParentModel');
                // ===================== Gesetion du Piece d'identité  ===================== //
                if (isset($_FILES[$key]) && $_FILES[$key]['error']['pc_cin'] == 0) {
                    $piTuteurUpload = upload_file($key . "[pc_cin]", PARENT_UPLOAD_DIR);
                    if ($piTuteurUpload['success']) {
                        $parent['pc_cin'] =  $piTuteurUpload['file_name'];
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
                // =====================  ===================== //

                // ===================== Create ===================== //
                unset($parent['id_parent']);
                $resInsert = $this->ParentModel->insert($parent);
                if ($resInsert) {
                    $parent_eleve[] = [
                        'parent_id_parent' => $resInsert['id_parent'],
                        'type' => $key === 'pere' ? 'père' : ($key === 'mere' ? 'mère' : 'tuteur')
                    ];
                }
            }
        }
        // ? =====================  ===================== //

        // ================== INFORMATIONS DE L'ELEVE ==================
        // ? Photo d'identité de l'étudiant
        $photo_indetite = '';
        if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
            $photoIndetityUpload = upload_file('photo', STUDENT_UPLOAD_DIR . 'photos');
            if ($photoIndetityUpload['success']) {
                $photo_indetite = $photoIndetityUpload['file_name'];
            } else {
                echo json_encode([
                    'error' => true,
                    'type' => 'fileSize',
                    'message' => "Erreur lors de l' upload photo d'identité de l'étudiant : ",
                    'details' => $photoIndetityUpload['error']
                ]);
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
                echo json_encode([
                    'error' => true,
                    'type' => 'fileSize',
                    'message' => "Erreur lors de l' upload acte de naissace de l'etudiant : ",
                    'details' => $pcActeNassanceUpload['error']
                ]);
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
                echo json_encode([
                    'error' => true,
                    'type' => 'fileSize',
                    'message' => "Erreur lors de l' upload pièce d'identité de l'etudiant : ",
                    'details' => $pcPieceIdentiteUpload['error']
                ]);
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
                echo json_encode([
                    'error' => true,
                    'type' => 'fileSize',
                    'message' => "Erreur lors de l' upload du bulletin de note de l'etudiant : ",
                    'details' => $pcBulletinUpload['error']
                ]);
                return;
            }
        }

        $etudiant = [
            'matricule_etudiant' => $matricule,
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
            'photo' => $photo_indetite,
            'pc_act_naissance' => $act_naissance,
            'pc_pi' => $pieceIndetite,
            'bulletin' => $bulletin,

        ];

        // ! Enregistrement de l'etudiant dans la base de données
        $eleve_id = null;
        $etudiantIsered =  $this->EtudiantModel->insert($etudiant);
        if ($etudiantIsered) {
            $eleve_id = $etudiantIsered['id_eleve'];
        }

        //! Enregistrement de la liaison parent eleve dans la base de donnée
        if (!empty($parent_eleve) && $eleve_id) {
            $this->load->model('ParentEleveModele');
            for ($i = 0; $i < count($parent_eleve); $i++) {
                $parent_eleve[$i]['eleve_id_eleve'] = $eleve_id;
            }
            $this->ParentEleveModele->insertBatch($parent_eleve);
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
            // ? Creation de compte automatique 
            $roleEtudiant =  $this->UtilisateurModel->getIdRoleStudent();
            $this->UtilisateurModel->insert([
                'id_role' => $roleEtudiant->id_role,
                'id_eleve' => $inscriptionData['id_eleve'],
                'identifiant' => $matricule,
                'password' => password_hash($matricule, PASSWORD_DEFAULT)
            ]);

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
