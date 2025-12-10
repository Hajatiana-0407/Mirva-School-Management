<?php

defined('BASEPATH') or exit('No direct script access allowed');

class EnseigantsController extends CI_Controller
{
    protected $pk = 'id_personnel';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('EnseignantModel');
    }

    public function index()
    {
        $page = $this->input->get('page', 1) ?? 1;
        $query = $this->input->get('query', 1) ?? '';
        $no_pagination = $this->input->get('no_pagination', 1) ?? false;
        $builder = $this->EnseignantModel->findAllQuery();
        $pagination = $this->EnseignantModel->paginateQuery($builder, $page, $query, $no_pagination);
        $pagination['data'] = $this->EnseignantModel->findAllData($pagination['data']);

        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'pagination' => $pagination,
                'data' => $pagination['data']
            ]));
    }


    public function findOneByMatricule($matricule)
    {
        if ($matricule !== '') {
            $matricule = trim(strip_tags($matricule));
        }

        if ($matricule === '') {
            echo json_encode([
                'error' => true,
                'message' => "Aucun matricule trouvé.",
                'details' => 'Le matricule n\'est pas defini'
            ]);
            return;
        }

        $employe = $this->EnseignantModel->findOneDetailsByMatriculeOrId($matricule);
        if (!$employe) {
            echo json_encode([
                'error' => true,
                'message' => "Aucun matricule trouvé.",
                'details' => 'Le matricule n\'est pas defini'
            ]);
            return;
        } else {
            echo json_encode([
                'error' => false,
                'data' => $employe
            ]);
            return;
        }
    }

    public function create()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->load->helper('matricule');
            //? Creation d'un matricule unique si non fourni
            $this->load->model('PersonnelModel');
            $lasted = $this->PersonnelModel->findLatest();
            $matricule = '';
            if ($lasted) {
                $matricule = generateMatricule(EMPLOYEE_PREFIX, $lasted["matricule_personnel"]);
            } else {
                $matricule = generateMatricule(EMPLOYEE_PREFIX);
            }

            // ? Recuperation des données
            $data = [];
            $data['matricule_personnel'] = $matricule;
            $data['id_type_personnel'] = $this->input->post('type_personnel');
            foreach ($_POST as $key => $value) {
                if (
                    $key !== 'type_personnel'
                    && $key !== 'assignations'
                ) {
                    $data[$key] = $this->input->post($key);
                }
            }


            // Gestion de l'upload de la photo de profil
            if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
                $photo_result = upload_file('photo', PERSONNEL_UPLOAD_DIR . 'photos');
                if ($photo_result['success']) {
                    $data['photo'] = $photo_result['file_name'];
                } else {
                    echo json_encode(['error' => true, 'message' => "Erreur upload photo : " . $photo_result['error']]);
                    return;
                }
            }

            // Gestion de l'upload de la pièce d'identité (pc_cin)
            if (isset($_FILES['pc_cin']) && $_FILES['pc_cin']['error'] == 0) {
                $cin_result = upload_file('pc_cin', PERSONNEL_UPLOAD_DIR . 'pi');
                if ($cin_result['success']) {
                    $data['pc_cin'] = $cin_result['file_name'];
                } else {
                    echo json_encode(['error' => true, 'message' => "Erreur upload pièce d'identité : " . $cin_result['error']]);
                    return;
                }
            }

            // Création du personnel
            $result = $this->EnseignantModel->insert($data);

            if ($result) {
                // ? Teste si le type est proffesseur ( enseignant ) 
                $assignations = $this->input->post('assignations');
                if ($assignations) {

                    // ? Creation de compte utilisateur pour le prof
                    $this->load->model('UtilisateurModel');
                    $roleEnseignant = $this->UtilisateurModel->getIdRoleTeacher();
                    $this->UtilisateurModel->insert([
                        'id_role' => $roleEnseignant->id_role,
                        'id_personnel' => $result['id_personnel'],
                        'identifiant' => $matricule,
                        'password' => password_hash($matricule, PASSWORD_DEFAULT)
                    ]);

                    $this->load->model('MatiereClasseProfModel');
                    $assignation_data = [];
                    $isAll = false;
                    foreach ($assignations as $assignation) {
                        if (!$isAll) {
                            // Condition pour l'arret du boocle si le matiere et tous 
                            if ($assignation['id_matiere'] === 'tous')
                                $isAll = true;

                            $assignation_data[] = [
                                'professeur_id_professeur' => $result['id_personnel'],
                                'classe_id_classe' => $assignation['id_classe'],
                                'matiere_id_matiere' => $assignation['id_matiere'] === 'tous' ? 0 : $assignation['id_matiere'],
                                'heure_semaine' => $assignation['heures'],
                                'is_all_matiere' => $assignation['id_matiere'] === 'tous'
                            ];
                        }
                    }
                    $this->MatiereClasseProfModel->insertBatch($assignation_data);
                }

                echo json_encode(['error' => false, 'data' => $this->EnseignantModel->findOneById($result['id_personnel'], )]);
            } else {
                echo json_encode(['error' => true, 'message' => "Erreur lors de l'enregistrement"]);
            }
        } else {
            echo json_encode([
                'error' => true,
                'message' => "Erreur lors de l'enregistrement",
                'details' => 'La méthode est non autorisé'
            ]);
        }
    }

    public function assignations()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            echo json_encode([
                'error' => true,
                'message' => "Methode non autorisée.",
                'details' => 'La methode doit etre de type POST'
            ]);
            return;
        }

        $assignationData = $this->input->post(null, true);
        $id_personnel = $assignationData['id_personnel'];
        $data = [];
        if ($id_personnel !== '') {
            $assignations = $assignationData['assignations'] ?? [];
            $this->load->model('MatiereClasseProfModel');

            $assignation_data = [];
            $isAll = false;
            foreach ($assignations as $assignation) {
                if (!$isAll) {

                    // Condition pour l'arret du boocle si le matiere et tous 
                    if ($assignation['id_matiere'] === 'tous')
                        $isAll = true;

                    $assignation_data[] = [
                        'professeur_id_professeur' => $id_personnel,
                        'classe_id_classe' => $assignation['id_classe'],
                        'matiere_id_matiere' => $assignation['id_matiere'] === 'tous' ? 0 : $assignation['id_matiere'],
                        'heure_semaine' => $assignation['heures'],
                        'is_all_matiere' => $assignation['id_matiere'] === 'tous'
                    ];
                }
            }
            // ! On supprime touts avant d'inserer 
            $this->MatiereClasseProfModel->deleteAssignationByProf($id_personnel);


            // ? Insertions
            $this->MatiereClasseProfModel->insertBatch($assignation_data);

            // ? Recuperer la modification 
            $details = $this->EnseignantModel->findOneDetailsByMatriculeOrId(null, $id_personnel);

            $data = [
                'error' => false,
                'data' => $details,
            ];
        } else {
            $data = [
                'error' => true,
                'message' => 'Aucun identifiant trouvé',
                'details' => 'L\'identifiant du personnel n\'est pas defini'
            ];
        }
        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode($data));
    }

    public function update()
    {
        $id = $this->input->post('id_personnel');
        if (!$id) {
            echo json_encode(['error' => true, 'message' => "Erreur lors de la modification"]);
            return;
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // ? Recuperation des données
            $data = [];
            $data['id_type_personnel'] = $this->input->post('type_personnel');
            foreach ($_POST as $key => $value) {
                if ($key !== 'type_personnel' && $key !== 'user') {
                    $data[$key] = $this->input->post($key);
                }
            }

            // Gestion de l'upload de la photo de profil
            if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
                $photo_result = upload_file('photo', PERSONNEL_UPLOAD_DIR . 'photos');
                if ($photo_result['success']) {
                    $data['photo'] = $photo_result['file_name'];
                } else {
                    echo json_encode(['error' => true, 'message' => "Erreur upload photo : " . $photo_result['error']]);
                    return;
                }
            }

            // Gestion de l'upload de la pièce d'identité (pc_cin)
            if (isset($_FILES['pc_cin']) && $_FILES['pc_cin']['error'] == 0) {
                $cin_result = upload_file('pc_cin', PERSONNEL_UPLOAD_DIR . 'pi');
                if ($cin_result['success']) {
                    $data['pc_cin'] = $cin_result['file_name'];
                } else {
                    echo json_encode(['error' => true, 'message' => "Erreur upload pièce d'identité : " . $cin_result['error']]);
                    return;
                }
            }

            // Création du personnel
            $result = $this->EnseignantModel->update($id, $data);

            if ($result) {
                echo json_encode(['error' => false, 'data' => $result]);
            } else {
                echo json_encode([
                    'error' => true,
                    'message' => "Erreur lors de la mise à jour",
                    'deetails' => 'Le personnel non trouvé'
                ]);
            }
        } else {
            echo json_encode([
                'error' => true,
                'message' => "Erreur lors de l'enregistrement",
                'details' => 'La méthode est non autorisé'
            ]);
        }
    }
}
