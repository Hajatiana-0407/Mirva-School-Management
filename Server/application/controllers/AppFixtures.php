<?php
class AppFixtures extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        require_once FCPATH . 'vendor/autoload.php';

        if (!$this->input->is_cli_request()) {
            exit('No direct script access allowed');
        }

        $this->load->model('FixturesModel', 'model');
    }

    public function loadFixtures()
    {
        $faker = \Faker\Factory::create('fr_FR');

        // Vider les tables (dans l’ordre inverse des dépendances)
        $this->model->emptyDb([
            'paiement',
            'note',
            'inscription',
            'classe_professeur_matier',
            'eleve',
            'professeur',
            'ecolage',
            'droit_inscription',
            'classe',
            'matiere_niveau',
            'matiere',
            'niveau',
            'annee_scolaire',
            'parent',
            'depense'
        ]);


        // 1. annee_scolaire
        for ($i = 0; $i < 2; $i++) {
            $this->model->insert('annee_scolaire', [
                'date_debut' => $faker->date(),
                'date_fin' => $faker->date(),
                'created_at' => date('Y-m-d')
            ]);
        }

        // 2. niveau
        $cycles = ['Primaire', 'Collège', 'Lycée'];
        for ($i = 0; $i < 7; $i++) {
            $this->model->insert('niveau', [
                'niveau' => $faker->word . ' ' . $faker->numberBetween(1, 6),
                'cycle' => $faker->randomElement($cycles),
                'description' => $faker->sentence(4),
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }

        // 3. matiere
        for ($i = 0; $i < 5; $i++) {
            $this->model->insert('matiere', [
                'denomination' => $faker->word,
                'abbreviation' => strtoupper($faker->lexify('???')),
                'description' => $faker->sentence(3),
                'couleur' => $faker->hexColor,
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }

        // 4. matiere_niveau
        $niveaux = $this->model->getIds('niveau', 'id_niveau');
        $matieres = $this->model->getIds('matiere', 'id_matiere');
        foreach ($matieres as $matiere) {
            foreach ($faker->randomElements($niveaux, rand(1, 2)) as $niveau) {
                $this->model->insert('matiere_niveau', [
                    'matiere_id_matiere' => $matiere,
                    'classe_groupe_id_classe_groupe' => $niveau,
                    'coefficient' => $faker->numberBetween(1, 5),
                    'heure_semaine' => $faker->numberBetween(1, 10)
                ]);
            }
        }

        // 5. classe
        for ($i = 0; $i < 4; $i++) {
            $this->model->insert('classe', [
                'denomination' => 'Classe ' . $faker->word,
                'classe_groupe_id_classe_groupe' => $faker->randomElement($niveaux),
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }

        $classes = $this->model->getIds('classe', 'id_classe');

        // 6. droit_inscription
        foreach ($niveaux as $niveau) {
            $this->model->insert('droit_inscription', [
                'montant' => $faker->numberBetween(50000, 100000),
                'classe_groupe_id_classe_groupe' => $niveau,
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }

        // 7. ecolage
        foreach ($niveaux as $niveau) {
            $this->model->insert('ecolage', [
                'montant' => $faker->numberBetween(25000, 80000),
                'classe_groupe_id_classe_groupe' => $niveau,
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }

        // 8. parent
        for ($i = 0; $i < 5; $i++) {
            $this->model->insert('parent', [
                'nom_pere' => $faker->lastName,
                'nom_mere' => $faker->lastName,
                'profession_pere' => $faker->jobTitle,
                'profession_mere' => $faker->jobTitle,
                'telephone_pere' => $faker->phoneNumber,
                'telephone_mere' => $faker->phoneNumber,
                'adresse' => $faker->address,
                'pc_cin_pere' => $faker->numerify('#########'),
                'pc_cin_mere' => $faker->numerify('#########'),
                'type' => $faker->randomElement(['Père', 'Mère'])
            ]);
        }

        $parents = $this->model->getIds('parent', 'id_parent');

        // 9. eleve
        for ($i = 0; $i < 10; $i++) {
            $this->model->insert('eleve', [
                'nom' => $faker->lastName,
                'prenom' => $faker->firstName,
                'adresse' => $faker->address,
                'telephone' => $faker->phoneNumber,
                'parent_id_parent' => $faker->randomElement($parents),
                'date_naissance' => $faker->date(),
                'sexe' => $faker->randomElement(['Homme', 'Femme']),
                'maladie' => $faker->word,
                'photo' => 'default.jpg',
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }

        $eleves = $this->model->getIds('eleve', 'id_eleve');

        // 10. professeur
        $userIds = 1;
        for ($i = 0; $i < 5; $i++) {
            $this->model->insert('professeur', [
                'nom' => $faker->lastName,
                'prenom' => $faker->firstName,
                'adresse' => $faker->address,
                'telephone' => $faker->phoneNumber,
                'date_naissance' => $faker->date(),
                'sexe' => $faker->randomElement(['Homme', 'Femme']),
                'engagement' => 'Permanent',
                'email' => $faker->email,
                'password' => password_hash('123456', PASSWORD_DEFAULT),
                'pc_cin' => $faker->numerify('#########'),
                'photo' => 'default.jpg',
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }

        $professeurs = $this->model->getIds('professeur', 'id_professeur');

        // 11. classe_professeur_matier

        foreach ($classes as $classe) {
            foreach ($faker->randomElements($matieres, 2) as $matiere) {
                $professeur = $faker->randomElement($professeurs);

                // Vérifie si la combinaison existe déjà dans la BDD
                $exists = $this->db->where('classe_id_classe', $classe)
                    ->where('professeur_id_professeur', $professeur)
                    ->get('classe_professeur_matier')
                    ->num_rows() > 0;

                if (!$exists) {
                    $this->model->insert('classe_professeur_matier', [
                        'classe_id_classe' => $classe,
                        'professeur_id_professeur' => $professeur,
                        'matiere_id_matiere' => $matiere
                    ]);
                }
            }
        }



        // 12. inscription
        $annees = $this->model->getIds('annee_scolaire', 'id_annee_scolaire');
        for ($i = 0; $i < 5; $i++) {
            $eleve = $faker->randomElement($eleves);
            $parent = $faker->randomElement($parents);
            $this->model->insert('inscription', [
                'is_passed' => $faker->randomElement(['oui', 'non']),
                'date_inscription' => $faker->date(),
                'classe_id_classe' => $faker->randomElement($classes),
                'annee_scolaire_id_annee_scolaire' => $faker->randomElement($annees),
                'eleve_id_eleve' => $eleve,
                'image' => 'default.jpg',
                'is_droit_payed' => $faker->randomElement(['oui', 'non']),
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }

        $inscriptions = $this->model->getIds('inscription', 'id_inscription');

        // 13. note
        for ($i = 0; $i < 10; $i++) {
            $this->model->insert('note', [
                'valeur' => $faker->numberBetween(0, 20),
                'eleve_id_eleve' => $faker->randomElement($eleves),
                'annee_scolaire_id_annee_scolaire' => $faker->randomElement($annees),
                'matiere_id_matiere' => $faker->randomElement($matieres),
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }

        // 14. depense
        for ($i = 0; $i < 5; $i++) {
            $this->model->insert('depense', [
                'raison' => $faker->sentence(3),
                'montant' => $faker->randomFloat(2, 500, 5000),
                'date' => $faker->date(),
                'user_id_user' => $userIds,
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }

        // 15. paiement
        $droitIds = $this->model->getIds('droit_inscription', 'id_droit_inscription');
        $ecolageIds = $this->model->getIds('ecolage', 'id_ecolage');
        foreach ($inscriptions as $inscription) {
            $this->model->insert('paiement', [
                'date_paiement' => $faker->date(),
                'droit_inscription_id' => $faker->randomElement($droitIds),
                'ecolage_id_ecolage' => $faker->randomElement($ecolageIds),
                'mois' => $faker->monthName,
                'inscription_id_inscription' => $inscription,
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }

        echo "✅ Fausse base de données générée avec succès !" . PHP_EOL;
    }
}
