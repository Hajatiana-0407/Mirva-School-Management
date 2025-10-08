<?php
defined('BASEPATH') OR exit('No direct script access allowed');

function verify_jwt()
{
    $CI =& get_instance();
    $CI->load->helper('jwt');

    $authHeader = $CI->input->get_request_header('Authorization', TRUE);

    if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        http_response_code(401);
        echo json_encode(['error' => 'Token manquant ou invalide']);
        exit;
    }

    $token = $matches[1];
    $payload = validate_jwt($token);

    if (!$payload) {
        http_response_code(401);
        echo json_encode(['error' => 'Token expiré ou invalide']);
        exit;
    }

    // Stocke les infos utilisateur dans CI pour le reste de la requête
    $CI->auth_user = $payload;
}
