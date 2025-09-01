<?php

class EtablissementController extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('EtablissementModel');
    }

    // Get Etablissement Info
    public function getEtablissementInfo()
    {
        $etablissement = $this->EtablissementModel->findEtablissementData();
        echo json_encode($etablissement);
    }

    // Updatte
    public function updateEtablissementInfo()
    {
        $id_etablissement = $this->input->post('id_etablissement');
        $nom = $this->input->post('nom');
        $code = $this->input->post('code');
        $adresse = $this->input->post('adresse');
        $telephone = $this->input->post('telephone');
        $email = $this->input->post('email');
        $site_web = $this->input->post('site_web');
        $description = $this->input->post('description');

        // Information sur les réseaux sociaux
        $facebook = $this->input->post('facebook');
        $twitter = $this->input->post('twitter');
        $linkedin = $this->input->post('linkedin');
        $instagram = $this->input->post('instagram');
        $youtube = $this->input->post('youtube');




        // Préparation des données à mettre à jour
        $data = [
            'nom' => $nom,
            'code' => $code,
            'adresse' => $adresse,
            'telephone' => $telephone,
            'email' => $email,
            'site_web' => $site_web,
            'description' => $description,
            'facebook' => $facebook,
            'twitter' => $twitter,
            'linkedin' => $linkedin,
            'instagram' => $instagram,
            'youtube' => $youtube,
        ];

        // Gestion du logo
        if (isset($_FILES['logo']) && $_FILES['logo']['error'] == 0) {
            $photo_result = upload_file('logo', ETABLISSEMENT_UPLOAD_DIRECTORY);
            if ($photo_result['success']) {
                $data['logo'] = ETABLISSEMENT_UPLOAD_DIRECTORY . $photo_result['file_name'];
            } else {
                echo json_encode(['error' => true, 'message' => "Erreur upload photo : " . $photo_result['error']]);
                return;
            }
        }

        // Mise à jour des informations de l'établissement
        $result = $this->EtablissementModel->update($id_etablissement, $data);
        
        if ($result) {
            echo json_encode(['error' => false, 'data' => $result]);
        } else {
            echo json_encode(['error' => true, 'message' => "Erreur lors de la mise à jour"]);
        }
    }
}
