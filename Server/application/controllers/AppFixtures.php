<?php
class AppFixtures extends CI_Controller
{
    public function __construct()
    {
        parent::__construct() ;
        require_once FCPATH . 'vendor/autoload.php';
        // Ne peut être exécuté que depuis le terminal
        if (!$this->input->is_cli_request()) {
            exit('No direct script access allowed');
        }

        $this->load->model('FixturesModel' , 'model');
    }
    public function loadFixtures( $count = 10 )
    {
        $faker = \Faker\Factory::create('fr_FR');

        $cycles = [ 'Primaire', 'Collège', 'Lycée'];

        $this->model->emptyDb(['niveaux']) ; 

        for ($i = 0; $i < $count; $i++) {
            $data = [
                'niveau' => $faker->word . ' ' . $faker->numberBetween(1, 6),
                'cycle' => $faker->randomElement($cycles),
                'description' => $faker->sentence(10),
            ];

            $this->model->insert($data);
        }

        echo "$count faux niveaux insérés avec succès." . PHP_EOL;
    }
}
