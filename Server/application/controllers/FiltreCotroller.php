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
}
