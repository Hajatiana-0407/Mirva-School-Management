<?php
defined('BASEPATH') or exit('No direct script access allowed');

class AuthHook
{
    public function check_secure_routes()
    {
        $CI = &get_instance();

        // ✅ Charger le helper JWT
        $CI->load->helper('auth_helper');

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
}
