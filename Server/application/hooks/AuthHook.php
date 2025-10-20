<?php
defined('BASEPATH') or exit('No direct script access allowed');

class AuthHook
{
    public function __construct() {}
    public function check_secure_routes()
    {
        $CI = &get_instance();
        $CI->load->helper('auth_helper');

        // 🔹 Nouvelle fonctionnalité : injecter le payload si un token existe
        $this->inject_jwt_if_present();

        // ✅ Récupérer les routes sécurisées définies dans routes.php
        $secure_routes = isset($GLOBALS['secure']) ? $GLOBALS['secure'] : [];

        // Route actuelle demandée
        $current_route = $CI->uri->uri_string();

        // Vérifie si la route actuelle est protégée
        foreach ($secure_routes as $pattern => $target) {
            if ($this->match_pattern($pattern, $current_route)) {
                verify_jwt(); // stoppe la requête si token invalide
                return;
            }
        }
    }

    /**
     * Vérifie si la route courante correspond à un pattern de route sécurisée.
     * Gère les wildcards `*`.
     */
    private function match_pattern($pattern, $uri)
    {
        $pattern = trim($pattern, '/');
        $uri = trim($uri, '/');

        if ($pattern === $uri) {
            return true;
        }

        if (strpos($pattern, '*') !== false) {
            $regex = '#^' . str_replace('\*', '.*', preg_quote($pattern, '#')) . '$#';
            return (bool) preg_match($regex, $uri);
        }

        return false;
    }

    /**
     * Nouvelle fonction : injecte les données du JWT dans $_POST si un token existe
     */
    private function inject_jwt_if_present()
    {
        $CI = &get_instance();

        // 🔹 Charger le helper JWT si ce n’est pas déjà fait
        $CI->load->helper('jwt');

        // Récupère le header Authorization
        $authHeader = $CI->input->get_request_header('Authorization', TRUE);

        if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            return; // pas de token → ne fait rien
        }

        $token = $matches[1];
        $payload = validate_jwt($token); // maintenant la fonction sera disponible

        if (!$payload) {
            return; // token invalide → on n’injecte rien
        }

        // Injection dans $_POST et $_REQUEST
        if (is_object($payload)) {
            $payload = (array) $payload;
        }
        foreach ($payload as $key => $value) {
            if ($key === 'data') {
                $_POST['user'] = (array)$value->user ?? null;
                $_POST['info'] = (array)$value->info ?? null;

                // transformier le permission stdClass to array
                foreach ($value->permissions as $key => $permission) {
                    $_POST['permissions'][$key]  = (array)$permission;
                    $_REQUEST['permissions'][$key]  = (array)$permission;
                }
                $_REQUEST['user'] = (array)$value->user ?? null;
                $_REQUEST['info'] = (array)$value->info ?? null;
                break;
            }
        }
        // Stocke aussi proprement dans CI
        $CI->auth_user = $payload;
    }
}
