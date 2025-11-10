<?php

class ExerciceController extends CI_Controller
{
    protected $pk = 'id_exercice';
    public function __construct()
    {
        parent::__construct();
        $this->load->model('ExerciceModel');
        $this->load->helper(['url', 'text']);
    }

    public function index()
    {
        $exercices = $this->ExerciceModel->findAll();
        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode($exercices));
    }

    public function create()
    {
        $sessions = $this->session->userData();
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($sessions['role_id'])) {
            $post = $this->input->post(null, true);
            switch ($sessions['role_id']) {
                case 'admin':
                case 'teacher':
                    $latest = $this->ExerciceModel->findLatest();
                    $slug = $latest ? url_title(convert_accented_characters($post['titre'] . ' ' . $latest['id_exercice']), 'dash', TRUE) : url_title(convert_accented_characters($post['titre'] . ' ' . 1), 'dash', TRUE);
                    $data = [
                        'id_prof' => $post['id_prof'] !== ''  ? $post['id_prof'] : null,
                        'id_niveau' => $post['id_niveau'] !== ''  ? $post['id_niveau'] : null,
                        'id_matiere' => $post['id_matiere'] !== ''  ? $post['id_matiere'] : null,
                        'titre' => $post['titre'],
                        'description' => $post['description'] ?? '',
                        'contenu' => $post['contenu'] ?? '',
                        'published' => $post['published'] ?? false,
                        'slug' => $slug
                    ];

                    // ? =====================  ===================== //
                    if (isset($_FILES['ficher_principale']) && $_FILES['ficher_principale']['error'] == 0) {
                        $ficher_principale_result = upload_file('ficher_principale', LECON_UPLOAD_DIRECTORY, '*');
                        if ($ficher_principale_result['success']) {
                            $data['ficher_principale'] =  $ficher_principale_result['file_name'];
                        } else {
                            echo json_encode(['error' => true, 'message' => "Erreur upload ficher_principale : " . $ficher_principale_result['error']]);
                            return;
                        }
                    }
                    if (isset($_FILES['fichier_support']) && $_FILES['fichier_support']['error'] == 0) {
                        $fichier_support_result = upload_file('fichier_support', LECON_UPLOAD_DIRECTORY, "*");
                        if ($fichier_support_result['success']) {
                            $data['fichier_support'] =  $fichier_support_result['file_name'];
                        } else {
                            echo json_encode(['error' => true, 'message' => "Erreur upload fichier_support : " . $fichier_support_result['error']]);
                            return;
                        }
                    }
                    $inserted = $this->ExerciceModel->insert($data);
                    if ($inserted) {
                        $this->output
                            ->set_content_type('application/json')
                            ->set_output(json_encode([
                                'error' => false,
                                'data' => $inserted
                            ]));
                    } else {
                        echo json_encode([
                            'error' => true,
                            'message' => "Impossible de faire l'enregistrement dans la base de donnée.",
                            'details' => "Erreur lors de l'insertions"
                        ]);
                    }
                    break;
                default:
                    echo json_encode([
                        'error' => true,
                        'message' => "Vous n'êtes pas autorisé à faire cette action.",
                        'details' => "Cette utilisateur n'est pas autorisé a faire cette enregistrement."
                    ]);
                    break;
            }
            return;
        } else {
            echo json_encode([
                'error' => true,
                'message' => "Erreur lors de l'enregistrement",
                'details' => 'La méthode est non autorisé'
            ]);
            return;
        }
    }


    public function update()
    {
        $sessions = $this->session->userData();
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($sessions['role_id'])) {
            $post = $this->input->post(null, true);

            $id_exercice = $post['id_exercice'] ?? null;
            if (!$id_exercice) {
                echo json_encode([
                    'error' => true,
                    'message' => 'Aucune leçon trouvé.',
                    "detail" => "l'identification est null"
                ]);
                return;
            }
            switch ($sessions['role_id']) {
                case 'admin':
                case 'teacher':
                    $data = [
                        'id_prof' => $post['id_prof'] !== ''  ? $post['id_prof'] : null,
                        'id_niveau' => $post['id_niveau'] !== ''  ? $post['id_niveau'] : null,
                        'id_matiere' => $post['id_matiere'] !== ''  ? $post['id_matiere'] : null,
                        'titre' => $post['titre'],
                        'description' => $post['description'] ?? '',
                        'contenu' => $post['contenu'] ?? '',
                        'published' => $post['published'] ?? false,
                        'slug' => url_title(convert_accented_characters($post['titre'] . ' ' . $id_exercice), 'dash', TRUE)
                    ];

                    // ? =====================  ===================== //
                    if (isset($_FILES['ficher_principale']) && $_FILES['ficher_principale']['error'] == 0) {
                        $ficher_principale_result = upload_file('ficher_principale', LECON_UPLOAD_DIRECTORY, '*');
                        if ($ficher_principale_result['success']) {
                            $data['ficher_principale'] =  $ficher_principale_result['file_name'];
                        } else {
                            echo json_encode(['error' => true, 'message' => "Erreur upload ficher_principale : " . $ficher_principale_result['error']]);
                            return;
                        }
                    }
                    if (isset($_FILES['fichier_support']) && $_FILES['fichier_support']['error'] == 0) {
                        $fichier_support_result = upload_file('fichier_support', LECON_UPLOAD_DIRECTORY, "*");
                        if ($fichier_support_result['success']) {
                            $data['fichier_support'] =  $fichier_support_result['file_name'];
                        } else {
                            echo json_encode(['error' => true, 'message' => "Erreur upload fichier_support : " . $fichier_support_result['error']]);
                            return;
                        }
                    }
                    $inserted = $this->ExerciceModel->update($id_exercice,  $data);
                    if ($inserted) {
                        $this->output
                            ->set_content_type('application/json')
                            ->set_output(json_encode([
                                'error' => false,
                                'data' => $inserted
                            ]));
                    } else {
                        echo json_encode([
                            'error' => true,
                            'message' => "Impossible de faire la modification dans la base de donnée.",
                            'details' => "Erreur lors de l'insertions"
                        ]);
                    }
                    break;
                default:
                    echo json_encode([
                        'error' => true,
                        'message' => "Vous n'êtes pas autorisé à faire cette action.",
                        'details' => "Cette utilisateur n'est pas autorisé a faire cette modification."
                    ]);
                    break;
            }

            return;
        } else {
            echo json_encode([
                'error' => true,
                'message' => "Erreur lors de la modification",
                'details' => 'La méthode est non autorisé'
            ]);
            return;
        }
    }

    public function delete()
    {
        $sessions = $this->session->userData();
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($sessions['role_id'])) {

            $input = json_decode(file_get_contents('php://input'), true);

            if (!empty($input[$this->pk])) {
                $id = $input[$this->pk];

                $data = $this->ExerciceModel->delete($id);

                if ($data) {
                    echo json_encode(['error' => false, 'data' => $data]);
                } else {
                    echo json_encode(['error' => false,  'message' => 'Échec de la suppression']);
                }
            } else {
                echo json_encode(['error' => false,  'message' => 'Échec de la suppression']);
            }
        } else {
            echo json_encode(['error' => false,  'message' => 'Échec de la suppression']);
        }
    }


    public function publish()
    {
        $sessions = $this->session->userData();
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($sessions['role_id'])) {
            $id_exercice = $this->input->post($this->pk) ?? null;
            if ($id_exercice) {
                $updated = $this->ExerciceModel->update($id_exercice, ['published' => true]);
                if ($updated) {
                    echo json_encode([
                        'error' => false,
                        'data' => $id_exercice
                    ]);
                } else {
                    echo json_encode([
                        'error' => true,
                        'message' => 'Impossible de trouvé la leçon à publié.',
                        'details' => "Identification null",
                    ]);
                }
            } else {
                echo json_encode([
                    'error' => true,
                    'message' => 'Impossible de trouvé la leçon a publié.',
                    'details' => "Identification null",
                ]);
            }
            return;
        } else {
            echo json_encode([
                'error' => true,
                'message' => "Erreur lors de l'enregistrement",
                'details' => 'La méthode est non autorisé'
            ]);
            return;
        }
    }
}
