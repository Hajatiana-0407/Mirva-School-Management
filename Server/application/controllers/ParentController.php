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

    public function update()
    {
        $parentData = $this->input->post(null, true);
        $id = $this->input->post($this->pk);
        if ($id) {
            $data = [
                'nom' => htmlspecialchars($parentData['nom']),
                'prenom' => isset($parentData['prenom']) ? htmlspecialchars($parentData['prenom']) : '',
                'profession' => isset($parentData['profession']) ? htmlspecialchars($parentData['profession']) : '',
                'adresse' => isset($parentData['adresse']) ? htmlspecialchars($parentData['adresse']) : '',
                'telephone' => isset($parentData['telephone']) ? htmlspecialchars($parentData['telephone']) : '',
                'email' => isset($parentData['email']) ? htmlspecialchars($parentData['email']) : '',
                'contact_urgence' => isset($parentData['contact_urgence']) ? htmlspecialchars($parentData['contact_urgence']) : 0
            ];

            if (isset($_FILES['pc_cin']) && $_FILES['pc_cin']['error'] == 0) {
                $piPereUpload = upload_file('pc_cin', PARENT_UPLOAD_DIR);
                if ($piPereUpload['success']) {
                    $data['pc_cin'] = $piPereUpload['file_name'];
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

            $data_updated =  $this->ParentModel->update($id, $data);
            if ($data_updated) {
                echo json_encode([
                    'error' => false,
                    'data' => $data_updated
                ]);
                return;
            } else {
                echo json_encode([
                    'error' => true,
                    'message' => 'Échec de la lors de la modification',
                    'details' => 'Id a supprimé est introuvable'
                ]);
                return;
            }
        } else {
            echo json_encode([
                'error' => true,
                'message' => 'Échec de la lors de la modification',
                'details' => 'Id a supprimé est introuvable'
            ]);
            return;
        }
    }

    public function upsert()
    {


        $data = $this->input->post(null, true);
        $id_eleve = $data['id_eleve'];
        function getParentData($parentData, $defaultType)
        {
            if (empty($parentData['nom'])) {
                return null; // Ne rien retourner si le nom est vide
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

        // Récupération sécurisée
        $parents = [
            'pere' => isset($data['pere']) ? getParentData($data['pere'], 'père') : null,
            'mere' => isset($data['mere']) ? getParentData($data['mere'], 'mère') : null,
            'tuteur' => isset($data['tuteur']) ? getParentData($data['tuteur'], 'tuteur') : null
        ];


        $data_updated = [];
        $data_inserted = [];
        $parent_eleve = [];
        foreach ($parents as $key => $parent) {
            if ($parent !== null) {

                //! ===================== Gesetion du Piece d'identité  ===================== //
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
                //! =====================  ===================== //


                if ($parent['id_parent'] !== 0) {
                    //? ===================== Update ===================== //
                    $resUpdate = $this->ParentModel->update($parent['id_parent'], $parent);
                    if ($resUpdate) {
                        $data_updated[] = $resUpdate;
                    }
                } else {
                    //? ===================== Create ===================== //
                    unset($parent['id_parent']);
                    $resInsert = $this->ParentModel->insert($parent);
                    if ($resInsert) {
                        $parent_eleve[] = [
                            'parent_id_parent' => $resInsert['id_parent'],
                            'eleve_id_eleve' => $id_eleve,
                            'type' => $key
                        ];
                        $resInsert['type'] = $key === 'pere' ? 'père' : ($key === 'mere' ? 'mère' : 'tuteur');
                        $data_inserted[] = $resInsert;
                    }
                }
            }
        }

        //? ===================== Insertion de la relation parent eleve  ===================== //
        if (!empty($parent_eleve)) {
            $this->load->model('ParentEleveModele');
            $this->ParentEleveModele->insertBatch($parent_eleve);
        }


        echo json_encode([
            'error' => false,
            'data' => [
                'insert' => $data_inserted,
                'update' => $data_updated
            ]
        ]);
        return;
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
                    echo json_encode(['error' => true,  'message' => 'Échec de la suppression']);
                }
            } else {
                echo json_encode(['error' => true,  'message' => 'Échec de la suppression']);
            }
        } else {
            echo json_encode(['error' => true,  'message' => 'Échec de la suppression']);
        }
    }
}
