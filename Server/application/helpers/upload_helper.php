<?php
defined('BASEPATH') or exit('No direct script access allowed');

if (!function_exists('upload_file')) {
    /**
     * Upload un fichier
     * 
     * @param string $field_name Nom du champ input file (ex: 'photo')
     * @param string $upload_path Chemin de destination (ex: './uploads/personnel/')
     * @param array $allowed_types Types autorisés
     * @param int $max_size Taille max (KB)
     * @return array ['success' => bool, 'file_name' => string, 'error' => string]
     */
    function upload_file($field_name, $upload_path, $allowed_types = ['jpg', 'jpeg', 'png', 'gif'], $max_size = MAX_UPLOAD_FILE)
    {
        try {
            $filename = $_FILES[$field_name]['name'];
            $ext = pathinfo($filename, PATHINFO_EXTENSION);
            $unique_name = time() . '_' . uniqid('file_', true) . '.' . $ext;

            $photo = move_uploaded_file($_FILES[$field_name]['tmp_name'], $upload_path . '/' . $unique_name);

            return [
                'success'   => true,
                'file_name' => $upload_path . '/' . $unique_name,
                'error'     => null
            ];
        } catch (\Throwable $th) {
            //throw $th;
            return [
                'success' => false,
                'error'   => $th->getMessage()
            ];
        }
    }
}
