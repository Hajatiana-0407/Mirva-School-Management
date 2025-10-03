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
            $file = null;

            if (strpos($field_name, '[') !== false) {
                preg_match('/([^\[]+)\[([^\]]+)\]/', $field_name, $matches);

                if (count($matches) === 3) {
                    $parent = $matches[1]; 
                    $child  = $matches[2]; 

                    $file = [
                        'name'     => $_FILES[$parent]['name'][$child]     ?? null,
                        'type'     => $_FILES[$parent]['type'][$child]     ?? null,
                        'tmp_name' => $_FILES[$parent]['tmp_name'][$child] ?? null,
                        'error'    => $_FILES[$parent]['error'][$child]    ?? null,
                        'size'     => $_FILES[$parent]['size'][$child]     ?? null,
                    ];
                }
            } else {
                // Cas normal
                $file = $_FILES[$field_name] ?? null;
            }

            if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
                return [
                    'success' => false,
                    'error'   => 'Aucun fichier valide trouvé pour ' . $field_name
                ];
            }

            // Vérifier extension
            $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
            if (!in_array($ext, $allowed_types)) {
                return [
                    'success' => false,
                    'error'   => "Type de fichier non autorisé: .$ext"
                ];
            }

            // Vérifier taille
            if ($file['size'] > $max_size) {
                return [
                    'success' => false,
                    'error'   => "Fichier trop volumineux. Taille max: {$max_size} .Votre fichier est de : " . $file['size']
                ];
            }

            // Générer un nom unique
            $unique_name = time() . '_' . uniqid('file_', true) . '.' . $ext;

            // Déplacer le fichier
            $moved = move_uploaded_file($file['tmp_name'], $upload_path . '/' . $unique_name);

            if (!$moved) {
                return [
                    'success' => false,
                    'error'   => "Erreur lors du déplacement du fichier"
                ];
            }

            return [
                'success'   => true,
                'file_name' => $upload_path .'/'. $unique_name,
                'error'     => null
            ];
        } catch (\Throwable $th) {
            return [
                'success' => false,
                'error'   => $th->getMessage()
            ];
        }
    }
}
