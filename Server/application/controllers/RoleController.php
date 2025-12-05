<?php
defined('BASEPATH') or exit('No direct script access allowed');

class RoleController extends CI_Controller
{
    protected $pk = 'id_role';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('RoleModel');
    }

    public function index()
    {
        $data = $this->RoleModel->findAllQuery();
        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode($data));
    }


    public function create()
    {
        $sessions = $this->session->useData();
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($sessions['role_id'])) {
            $post = $this->input->post(null, true);

            $role = [
                'nom' => $post['nom'] ?? '',
                'couleur' => $post['couleur'] ?? '',
                'description' => $post['description'] ?? '',
            ];

            if (!$this->RoleModel->isExist(['nom' => $post['nom']])) {
                $insert = $this->RoleModel->insert($role);
                if ($insert) {
                    // Creation des permissions 
                    $permissions = [];
                    foreach ($post['rolePermissions'] as $id_module => $permission) {
                        $permissions[] = [
                            'id_role' => $insert->id_role,
                            'id_module' => $id_module,
                            'can_read' => $permission['read'],
                            'can_create' => $permission['create'] ?? false,
                            'can_update' => $permission['update'] ?? false,
                            'can_delete' => $permission['delete'] ?? false,
                        ];
                    }
                    $this->load->model('RolePermissionModel', 'rp');
                    $this->rp->insertBatch($permissions);

                    echo json_encode([
                        'error' => false,
                        'data' => $this->RoleModel->findOneById($insert->id_role)
                    ]);
                } else {
                    echo json_encode([
                        'error' => true,
                        'message' => "Le nom du rôle '{$post['nom']}' existe déjà. Veuillez en choisir un autre.",
                        'details' => 'Impossible de faire la création du role'
                    ]);
                }
            } else {
                echo json_encode([
                    'error' => true,
                    'message' => "Le nom du rôle '{$post['nom']}' existe déjà. Veuillez en choisir un autre.",
                    'details' => 'Impossible de faire la création du role'
                ]);
            }

            return;
        } else {
            echo json_encode([
                'error' => true,
                'message' => "Erreur lors de la création",
                'details' => 'La méthode est non autorisé'
            ]);
            return;
        }
    }


    public function update()
    {
        $sessions  = $this->session->userData() ; 
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($sessions['role_id'])) {
            $post = $this->input->post(null, true);
            $id_role = $post[$this->pk] ?? null;
            if (!$id_role) {
                echo json_encode([
                    'error' => true,
                    'message' => 'Aucune rôle trouvé.',
                    "detail" => "l'identification est null"
                ]);
                return;
            }

            $role = [
                'nom' => $post['nom'] ?? '',
                'couleur' => $post['couleur'] ?? '',
                'description' => $post['description'] ?? '',
            ];

            if (!$this->RoleModel->isExist(
                ['nom' => $post['nom']],
                'and',
                [$this->pk => $id_role]
            )) {
                $update = $this->RoleModel->update($id_role, $role);
                if ($update) {
                    // Supprimer toutes le rolePermission lier a cette role 
                    $this->load->model('RolePermissionModel', 'rp');
                    $deleted = $this->rp->deleteByRoleId($id_role);

                    if ($deleted) {
                        // Creation des permissions 
                        $permissions = [];
                        foreach ($post['rolePermissions'] as $id_module => $permission) {
                            $permissions[] = [
                                'id_role' => $id_role,
                                'id_module' => $id_module,
                                'can_read' => $permission['read'],
                                'can_create' => $permission['create'] ?? false,
                                'can_update' => $permission['update'] ?? false,
                                'can_delete' => $permission['delete'] ?? false,
                            ];
                        }
                        $this->rp->insertBatch($permissions);

                        echo json_encode([
                            'error' => false,
                            'data' => $this->RoleModel->findOneById($id_role)
                        ]);
                    } else {
                        echo json_encode([
                            'error' => true,
                            'message' => "Erreur lors de la modification",
                            'details' => 'Impossible de faire la mofication du role'
                        ]);
                    }
                } else {
                    echo json_encode([
                        'error' => true,
                        'message' => "Erreur lors de la modification",
                        'details' => 'Impossible de faire la mofication du role'
                    ]);
                }
            } else {
                echo json_encode([
                    'error' => true,
                    'message' => "Le nom du rôle '{$post['nom']}' existe déjà. Veuillez en choisir un autre.",
                    'details' => 'Impossible de faire la modification du role'
                ]);
            }
            return;
        } else {
            echo json_encode([
                'error' => true,
                'message' => "Erreur lors de la modification",
                'details' => 'La méthode est non autorisé'
            ]);
            return;
        }
    }

    public function delete()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $input = json_decode(file_get_contents('php://input'), true);

            if (!empty($input[$this->pk])) {
                $id = $input[$this->pk];

                $data = $this->RoleModel->delete($id);

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
