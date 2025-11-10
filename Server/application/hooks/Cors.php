<?php
class Cors
{
    public function enable()
    {
        $allowed_origins = [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
        ];

        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

        if (in_array($origin, $allowed_origins)) {
            header("Access-Control-Allow-Origin: $origin");
            header("Access-Control-Allow-Credentials: true");
        }

        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-API-KEY");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

        // Ce header aide certains navigateurs à accepter les cookies cross-origin
        header("Access-Control-Expose-Headers: Set-Cookie");

        if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;
        }
    }
}
