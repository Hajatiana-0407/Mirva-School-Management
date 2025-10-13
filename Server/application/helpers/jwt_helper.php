<?php
defined('BASEPATH') or exit('No direct script access allowed');

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function generate_jwt($payload)
{
    $secret_key = 'your_secret_key'; // Change this to your secret key
    $issued_at = time();
    $expiration_time = $issued_at + (60 * 60); // Token valid for 1 hour

    $token_data = [
        'iat'  => $issued_at,
        'exp'  => $expiration_time,
        'data' => $payload
    ];

    return JWT::encode($token_data, $secret_key, 'HS256');
}

function validate_jwt($token)
{
    $secret_key = 'your_secret_key'; // Same as in generate_jwt()
    try {
        $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
        return (array) $decoded;
    } catch (Exception $e) {
        return false; // Token is invalid
    }
}
