<?php

class FiltreCotroller extends CI_Controller
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
    }

    public function lecon()
    {
        $this->load->model('LeconModel');
        $page = $this->input->post('page', 1) ?? 1;
        $query = $this->input->post('query', 1) ?? '';

        // Filtre 
        $date_debut = $this->input->post('date_debut', 1) ?? '';
        $date_fin = $this->input->post('date_fin', 1) ?? '';
        $niveau = $this->input->post('niveau', 1) ?? null;
        $matiere = $this->input->post('matiere', 1) ?? null;

        $builder = $this->LeconModel->filtreQuery($niveau, $matiere, $query, $date_debut, $date_fin);
        $pagination = $this->LeconModel->paginateQuery($builder, $page);

        $pagination['filter'] = [
            'date_debut' => $date_debut,
            'date_fin' => $date_fin,
            'niveau' => $niveau,
            'matiere' => $matiere,
            'query' => $query
        ];

        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'pagination' => $pagination,
                'data' => $pagination['data'],
            ]));
    }
    public function exercice()
    {
        $this->load->model('ExerciceModel');
        $page = $this->input->post('page', 1) ?? 1;
        $query = $this->input->post('query', 1) ?? '';

        // Filtre 
        $date_debut = $this->input->post('date_debut', 1) ?? '';
        $date_fin = $this->input->post('date_fin', 1) ?? '';
        $niveau = $this->input->post('niveau', 1) ?? null;
        $matiere = $this->input->post('matiere', 1) ?? null;

        $builder = $this->ExerciceModel->filtreQuery($niveau, $matiere, $query, $date_debut, $date_fin);
        $pagination = $this->ExerciceModel->paginateQuery($builder, $page);

        $pagination['filter'] = [
            'date_debut' => $date_debut,
            'date_fin' => $date_fin,
            'niveau' => $niveau,
            'matiere' => $matiere,
            'query' => $query
        ];

        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'pagination' => $pagination,
                'data' => $pagination['data'],
            ]));
    }
    public function inscription()
    {
        $this->load->model('InscriptionModel');
        $page = $this->input->post('page', 1) ?? 1;
        $query = $this->input->post('query', 1) ?? '';

        // Filtre 
        $date_debut = $this->input->post('date_debut', 1) ?? '';
        $date_fin = $this->input->post('date_fin', 1) ?? '';
        $niveau = $this->input->post('niveau', 1) ?? null;
        $classe = $this->input->post('classe', 1) ?? null;
        $droit = $this->input->post('droit', 1) ?? null;

        $builder = $this->InscriptionModel->filtreQuery($niveau, $classe, $date_debut, $date_fin, $droit);
        $pagination = $this->InscriptionModel->paginateQuery($builder, $page, $query);

        $pagination['filter'] = [
            'date_debut' => $date_debut,
            'date_fin' => $date_fin,
            'niveau' => $niveau,
            'classe' => $classe,
            'droit' => $droit,
            'query' => $query
        ];

        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'pagination' => $pagination,
                'data' => $pagination['data'],
            ]));
    }
    public function etudiant()
    {
        $this->load->model('EtudiantModel');
        $page = $this->input->post('page', 1) ?? 1;
        $query = $this->input->post('query', 1) ?? '';

        // Filtre 
        $niveau = $this->input->post('niveau', 1) ?? null;
        $classe = $this->input->post('classe', 1) ?? null;
        $sexe = $this->input->post('sexe', 1) ?? null;
        if ($sexe == 2)
            $sexe = 'Homme';
        if ($sexe == 1)
            $sexe = 'Femme';
        if ($sexe == 0)
            $sexe = '';
        $builder = $this->EtudiantModel->filtreQuery($niveau, $classe, $sexe);
        $pagination = $this->EtudiantModel->paginateQuery($builder, $page, $query);

        $pagination['filter'] = [
            'niveau' => $niveau,
            'classe' => $classe,
            'sexe' => $sexe,
            'query' => $query
        ];

        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'pagination' => $pagination,
                'data' => $pagination['data'],
            ]));
    }
    public function emploi_du_temps()
    {
        $this->load->model('EmploiDuTempsModel');
        $page = $this->input->post('page', 1) ?? 1;
        $query = $this->input->post('query', 1) ?? '';

        // Filtre 
        $classe = $this->input->post('classe', 1) ?? null;
        $annee_scolaire = $this->input->post('annee_scolaire', 1) ?? null;
        if ($annee_scolaire == "0")
            $annee_scolaire = null;
        // Teste de l'utilisateur 
        $role_id = $this->session->userdata('role_id');
        switch ($role_id) {
            case 'admin':
                $builder = $this->EmploiDuTempsModel->filtreQuery($classe);
                $pagination = $this->EmploiDuTempsModel->paginateQuery($builder, $page);
                $pagination['data'] = $this->EmploiDuTempsModel->findAllDataClasse($pagination['data'], $annee_scolaire);
                break;
            default:
                # code...
                break;
        }



        $pagination['filter'] = [
            'query' => $query,
            'classe' => $classe,
        ];

        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'pagination' => $pagination,
                'data' => $pagination['data'],
            ]));
    }
    public function personnel()
    {
        $this->load->model('PersonnelModel');
        $page = $this->input->post('page', 1) ?? 1;
        $query = $this->input->post('query', 1) ?? '';

        // Filtre 
        $date_debut = $this->input->post('date_debut', 1) ?? '';
        $date_fin = $this->input->post('date_fin', 1) ?? '';
        $statut = $this->input->post('statut', 1) ?? null;
        $type = $this->input->post('type', 1) ?? null;

        $statutLabel = null;
        switch ($statut) {
            case 1:
                $statutLabel = 'Actif';
                break;
            case 2:
                $statutLabel = 'Démissionnaire';
                break;
            case 3:
                $statutLabel = "Suspendu";
                break;

            default:
                $statutLabel = null;
                break;
        }

        $builder = $this->PersonnelModel->filtreQuery($statutLabel, $type, $date_debut, $date_fin);
        $pagination = $this->PersonnelModel->paginateQuery($builder, $page, $query);

        $pagination['filter'] = [
            'date_debut' => $date_debut,
            'date_fin' => $date_fin,
            'type' => $type,
            'statut' => $statut,
            'query' => $query
        ];

        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'pagination' => $pagination,
                'data' => $pagination['data'],
            ]));
    }
    public function parent()
    {
        $this->load->model('ParentModel');
        $page = $this->input->post('page', 1) ?? 1;
        $query = $this->input->post('query', 1) ?? '';

        // Filtre 
        $type = $this->input->post('type', 1) ?? null;

        $type_label = null;
        switch ($type) {
            case 1:
                $type_label = 'mère';
                break;
            case 2:
                $type_label = 'père';
                break;
            case 3:
                $type_label = "tuteur";
                break;

            default:
                $type_label = null;
                break;
        }


        $builder = $this->ParentModel->filtreQuery($type_label);
        $pagination = $this->ParentModel->paginateQuery($builder, $page, $query);

        $pagination['filter'] = [
            'type' => $type,
            'query' => $query
        ];

        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'pagination' => $pagination,
                'data' => $pagination['data'],
            ]));
    }
}
