<?php
defined('BASEPATH') or exit('No direct script access allowed');

class AuthController extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('AuthModel');
    }

    public function login()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $identifiant = $this->input->post('identifiant', true);
            $password = $this->input->post('password', true);

            if ($identifiant === null || $password === null) {
                echo json_encode(['error' => true, 'message'  => 'L\identifiant et le mot de passe sont requis']);
                http_response_code(400);
                return;
            }

            $response = $this->AuthModel->login($identifiant);
            $user  = $response['user'];
            if ($user && password_verify($password, $user->password)) {
                $this->load->helper('jwt');
                unset($user->password);
                $token = generate_jwt($response);

                // Modification de last_login 
                $this->AuthModel->update($user->id_user, ['last_login' => (new DateTime())->format('Y-m-d H:i:s'), 'status' => true]);

                echo json_encode(['error' => false, 'data' => $token]);
                return;
            } else if ($user) {
                echo json_encode(['error' => true, 'message' => 'Mot de passe incorrect']);
                return;
            } else {
                echo json_encode(['error' => true, 'message' => 'Identifiant incorrect']);
            }
        } else {
            echo json_encode(['error' => true, 'message' => 'Méthode non autorisée']);
            http_response_code(405);
        }
    }

    public function logout()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $identifiant = $this->input->post('id_user', true);

            if (!$identifiant) {
                echo json_encode(['error' => true, 'message'  => 'L\identifiant est null']);
                http_response_code(400);
                return;
            }
            $response = $this->AuthModel->update($identifiant,  ['last_login' => (new DateTime())->format('Y-m-d H:i:s'), 'status' => true]);
            if ($response) {
                echo json_encode(['error' => false, 'data' => true]);
            } else {
                echo json_encode(['error' => true, 'message' => 'Identifiant incorrect']);
            }
        } else {
            echo json_encode(['error' => true, 'message' => 'Méthode non autorisée']);
            http_response_code(405);
        }
    }

    public function update()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $post =  (array)$this->input->post(null, true);
            $id_user =  $post['id_user'] ?? null;
            $password =  $post['password'] ?? null;
            if ($id_user) {
                $identifiant = trim(strip_tags($post['identifiant']));
                $user = $this->AuthModel->findOneById($id_user);
                $user = $user['user'];

                // ===================== Verification de l'ancien mot de passe ===================== //
                if ($user && password_verify($password, $user->password)) {
                    $data = [
                        'identifiant' => $identifiant,
                    ];
                    if (!!$post['newPassword']) {
                        $data['password'] = password_hash($post['newPassword'], PASSWORD_DEFAULT);
                    }

                    $updated =  $this->AuthModel->update($id_user, $data);
                    if ($updated) {
                        unset($updated['password']);

                        // ===================== Generer un nouveau token ===================== //
                        $this->load->helper('jwt');
                        $token = generate_jwt($updated);

                        $response = [
                            'error' => false,
                            'data' => [
                                'user' => $updated,
                                'token' => $token
                            ]
                        ];
                        $this->output
                            ->set_content_type('application/json')
                            ->set_output(json_encode($response));
                        return;
                    } else {
                        echo json_encode([
                            'error' => true,
                            'message' => 'Erreur lors de la modification',
                            'details' => "l'id de l'utilisateur est vide / null "
                        ]);
                    }
                    return;
                } else if ($user) {
                    echo json_encode(['error' => true, 'message' => 'Mot de passe incorrect']);
                    return;
                } else {
                    echo json_encode(['error' => true, 'message' => 'Identifiant incorrect']);
                }
            } else {
                echo json_encode([
                    'error' => true,
                    'message' => 'L\'utilisateur est intouvable',
                    'details' => "l'id de l'utilisateur est vide / null "
                ]);
            }
        } else {
            echo json_encode(['error' => true, 'message' => 'Méthode non autorisée']);
            http_response_code(405);
        }
    }
}
