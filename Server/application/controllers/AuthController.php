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
            $email = $this->input->post('email', true);
            $password = $this->input->post('password', true);

            if ($email === null || $password === null) {
                echo json_encode(['error' => true, 'message'  => 'Email et mot de passe sont requis']);
                http_response_code(400);
                return;
            }

            $user = $this->AuthModel->get_by_email($email);

            if ($user && password_verify($password, $user['password'])) {
                $this->load->helper('jwt');
                unset($user['password']); // Remove password before generating token 
                $token = generate_jwt($user);

                echo json_encode(['error' => false, 'data' => $token]);
                return;
            } else if ($user) {
                echo json_encode(['error' => true, 'message' => 'Mot de passe incorrect']);
                return;
            } else {
                echo json_encode(['error' => true, 'message' => 'Email incorrect']);
            }
        } else {
            echo json_encode(['error' => true, 'message' => 'Méthode non autorisée']);
            http_response_code(405);
        }
    }
}
