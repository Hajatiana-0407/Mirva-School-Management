<?php

use function PHPUnit\Framework\fileExists;

class DownloadContrller extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('LeconModel');
    }

    public function download()
    {
        // 1️⃣ Vérifier la méthode GET
        if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
            throw new Exception('Méthode non autorisée pour le téléchargement');
        }

        // 2️⃣ Récupérer le paramètre filePath
        $filePathParam = $this->input->get('filePath');
        if (!$filePathParam) {
            throw new Exception("Paramètre 'filePath' manquant");
        }

        // 3️⃣ Sécuriser le nom du fichier
        $fileName = basename(trim($filePathParam, "\"'")); // retire les guillemets si présents
        $filePath = FCPATH . $filePathParam;

        // 4️⃣ Vérifier que le fichier existe
        if (!file_exists($filePath)) {
            throw new Exception("Le fichier '$fileName' n'existe pas");
        }

        // 5️⃣ Détecter le type MIME et envoyer les headers pour téléchargement
        $mime = mime_content_type($filePath);
        header('Content-Type: ' . $mime);
        header('Content-Disposition: attachment; filename="' . $fileName . '"');
        header('Content-Length: ' . filesize($filePath));

        // 6️⃣ Lire le fichier
        readfile($filePath);
        exit();
    }
}
