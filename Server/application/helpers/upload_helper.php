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
    function upload_file($field_name, $upload_path, $allowed_types = ['jpg', 'jpeg', 'png', 'gif'], $max_size = 4096)
    {
        $CI = &get_instance();

        // Config upload
        $config['upload_path']   = FCPATH .  $upload_path;
        $config['allowed_types'] = implode('|', $allowed_types);
        $config['max_size']      = $max_size;
        $ext = pathinfo($_FILES[$field_name]['name'], PATHINFO_EXTENSION);
        $config['file_name']     = uniqid() . '_' . time() . '.' . $ext;

        $CI->load->library('upload', $config);

        if (!$CI->upload->do_upload($field_name)) {
            return [
                'success' => false,
                'error'   => $CI->upload->display_errors()
            ];
        } else {
            $uploadData = $CI->upload->data();
            return [
                'success'   => true,
                'file_name' => $uploadData['file_name'],
                'ext' => $uploadData['file_ext'],
                'error'     => null
            ];
        }
    }
}
