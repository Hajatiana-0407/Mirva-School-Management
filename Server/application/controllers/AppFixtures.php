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
        $this->load->model('PersonnelModel', 'personnelModel');
        $this->load->model('EtudiantModel');
        $this->load->helper('matricule');
    }

    public function loadFixtures()
    {
        $faker = \Faker\Factory::create('fr_FR');
        // Vider les tables (dans l’ordre inverse des dépendances)
        $this->model->emptyDb([
            // 'etablissement',
            'paiement',
            'note',
            'inscription',
            'classe_professeur_matier',
            'eleve',
            'personnel',
            // 'type_personnel',
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

        // Insertion des données sur l'etablissement
        $this->model->insertFixture('etablissement', [
            'nom' => 'Mada School',
            'code' => 'MIRV2024',
            'adresse' => '123 Rue de l\'Éducation, Ville, Pays',
            'telephone' => '+1234567890',
            'email' => 'mada.shool@gmail.com',
            'slogan' => 'Apprendre, Grandir, Réussir',
            'logo' => '',
            'created_at' => date('Y-m-d H:i:s'),
            'site_web' => 'www.madaschool.com',
            'description' => 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.',
            "prefix" => '',
            'facebook' => 'https://www.facebook.com/madaschool',
            'twitter' => 'https://www.twitter.com/madaschool',
            'instagram' => 'https://www.instagram.com/madaschool',
            'linkedin' => 'https://www.linkedin.com/company/madaschool',
            'youtube' => 'https://www.youtube.com/madaschool'
        ]);



        // 1. annee_scolaire
        for ($i = 0; $i < 2; $i++) {
            $this->model->insertFixture('annee_scolaire', [
                'nom' => 'Année Scolaire ' . ($i + 1),
                'date_debut' => $faker->date(),
                'date_fin' => $faker->date(),
                'description' => $faker->sentence(6),
                'created_at' => date('Y-m-d')
            ]);
        }

        // 2. niveau
        $cycles = ['Primaire', 'Collège', 'Lycée'];
        for ($i = 0; $i < 7; $i++) {
            $this->model->insertFixture('niveau', [
                'niveau' => $faker->word . ' ' . $faker->numberBetween(1, 6),
                'cycle' => $faker->randomElement($cycles),
                'description' => $faker->sentence(4),
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }

        // 3. matiere
        $matieresListe = [
            [
                'denomination' => 'Mathématiques',
                'abbreviation' => 'MATH',
                'description' => 'Étude des nombres, des formes, des structures et des relations.'
            ],
            [
                'denomination' => 'Physique',
                'abbreviation' => 'PHYS',
                'description' => 'Étude des phénomènes naturels, des lois de la matière et de l’énergie.'
            ],
            [
                'denomination' => 'Chimie',
                'abbreviation' => 'CHIM',
                'description' => 'Science qui étudie la composition, les propriétés et les transformations de la matière.'
            ],
            [
                'denomination' => 'Biologie',
                'abbreviation' => 'BIO',
                'description' => 'Science du vivant, étude des êtres vivants et de leur fonctionnement.'
            ],
            [
                'denomination' => 'Informatique',
                'abbreviation' => 'INFO',
                'description' => 'Science du traitement automatique de l’information par des machines.'
            ],
            [
                'denomination' => 'Histoire',
                'abbreviation' => 'HIST',
                'description' => 'Étude des événements du passé et de leur impact sur le présent.'
            ],
            [
                'denomination' => 'Géographie',
                'abbreviation' => 'GEO',
                'description' => 'Étude des territoires, des populations et de leur interaction avec l’environnement.'
            ],
            [
                'denomination' => 'Philosophie',
                'abbreviation' => 'PHILO',
                'description' => 'Réflexion critique sur les concepts fondamentaux comme la vérité, la justice, la liberté.'
            ],
            [
                'denomination' => 'Français',
                'abbreviation' => 'FR',
                'description' => 'Étude de la langue française, sa grammaire, son orthographe et sa littérature.'
            ],
            [
                'denomination' => 'Anglais',
                'abbreviation' => 'ANG',
                'description' => 'Apprentissage de la langue anglaise, écrite et orale.'
            ]
        ];


        $type_personnels = [
            'Enseignant',
            'Secrétaire',
            'Gardin',
            'Surveillant',
            'Agent d’entretien',
            'Bibliothécaire',
            'Comptable',
            'Chauffeur'
        ];

        foreach ($matieresListe as  $mat) {
            $this->model->insertFixture('matiere', [
                'denomination' => $mat['denomination'],
                'abbreviation' => strtoupper($mat['abbreviation']),
                'description' => $mat['description'],
                'couleur' => $faker->hexColor,
            ]);
        }

        // 4. matiere_niveau
        $niveaux = $this->model->getIds('niveau', 'id_niveau');
        $matieres = $this->model->getIds('matiere', 'id_matiere');
        foreach ($matieres as $matiere) {
            foreach ($faker->randomElements($niveaux, rand(1, 2)) as $niveau) {
                $this->model->insertFixture('matiere_niveau', [
                    'matiere_id_matiere' => $matiere,
                    'niveau_id_niveau' => $niveau,
                    'coefficient' => $faker->numberBetween(1, 5),
                ]);
            }
        }

        // 5. classe
        for ($i = 0; $i < 4; $i++) {
            $this->model->insertFixture('classe', [
                'denomination' => 'Classe ' . $faker->word,
                'niveau_id_niveau' => $faker->randomElement($niveaux),
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }

        $classes = $this->model->getIds('classe', 'id_classe');

        // 6. droit_inscription
        foreach ($niveaux as $niveau) {
            $this->model->insertFixture('droit_inscription', [
                'montant' => $faker->numberBetween(50000, 100000),
                'niveau_id_niveau' => $niveau,
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }

        // 7. ecolage
        foreach ($niveaux as $niveau) {
            $this->model->insertFixture('ecolage', [
                'montant' => $faker->numberBetween(25000, 80000),
                'niveau_id_niveau' => $niveau,
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }

        // 8. parent
        for ($i = 0; $i < 5; $i++) {
            $this->model->insertFixture('parent', [
                'nom_pere' => $faker->lastName,
                'nom_mere' => $faker->lastName,
                'profession_pere' => $faker->jobTitle,
                'profession_mere' => $faker->jobTitle,
                'telephone_pere' => $faker->phoneNumber,
                'telephone_mere' => $faker->phoneNumber,
                'adresse' => $faker->address,
                'pc_cin_pere' => $faker->numerify('#########'),
                'pc_cin_mere' => $faker->numerify('#########'),
                'type' => $faker->randomElement(['parent', 'tuteur']),
                'tuteur_email' => $faker->email
            ]);
        }

        $parents = $this->model->getIds('parent', 'id_parent');

        // 9. eleve
        // ? Creation de matricule pour l'etudiant
        $lastStudent = $this->EtudiantModel->findLasted();
        $lastStudentMatricule = '';
        if (isset($lastStudent) && isset($lastStudent->matricule_etudiant)) {
            $lastStudentMatricule = $lastStudent->matricule_etudiant;
        }

        for ($i = 0; $i < 5; $i++) {
            $matriculeStudent = generateMatricule(STUDENT_PRIFIX, $lastStudentMatricule);
            $this->model->insertFixture('eleve', [
                'matricule_etudiant' => $matriculeStudent,
                'nom' => $faker->lastName,
                'prenom' => $faker->firstName,
                'adresse' => $faker->address,
                'telephone' => $faker->phoneNumber,
                'parent_id_parent' => $faker->randomElement($parents),
                'date_naissance' => $faker->date(),
                'lieu_naissance' => $faker->address(),
                'sexe' => $faker->randomElement(['Homme', 'Femme']),
                'maladies' => $faker->word,
                'created_at' => date('Y-m-d H:i:s'),
                'nationalite' => 'Malagasy',
                'email' => $faker->email()
            ]);
            $lastStudentMatricule = $matriculeStudent;
        }

        $eleves = $this->model->getIds('eleve', 'id_eleve');

        // Types de personnel
        // foreach ($type_personnels as $type) {
        //     $this->model->insertFixture('type_personnel', [
        //         'type' => $type,
        //         'description' => $faker->sentence(6),
        //     ]);
        // }

        $types = $this->model->getIds('type_personnel', 'id_type_personnel');

        // 10. Personnel
        $userIds = 1;
        // Récupérer le dernier matricule enregistré
        $lasted = $this->personnelModel->findLasted();
        $lasteMatricule = '';
        if ($lasted && !empty($lasted->matricule_personnel)) {
            $lasteMatricule = $lasted->matricule_personnel;
        }

        // Générer 20 nouveaux employés
        for ($i = 0; $i < 20; $i++) {
            $matricule = generateMatricule(EMPLOYEE_PREFIX, $lasteMatricule);

            $this->model->insertFixture('personnel', [
                'matricule_personnel' => $matricule,
                'nom' => $faker->lastName,
                'prenom' => $faker->firstName,
                'addresse' => $faker->address,
                'telephone' => $faker->phoneNumber,
                'date_naissance' => $faker->date(),
                'lieu_naissance' => $faker->city(),
                'sexe' => $faker->randomElement(['Homme', 'Femme']),
                'engagement' => 'Permanent',
                'email' => $faker->email,
                'password' => password_hash('123456', PASSWORD_DEFAULT),
                'id_type_personnel' => $faker->randomElement($types),
                'salaire_base' => $faker->numberBetween(200000, 800000),
                "status" => $faker->randomElement(['Actif', 'Suspendu', "Démissionnaire"]),
                'numero_cin' => $faker->randomNumber(),
                'nationalite' => $faker->country(),
                'type_contrat' => $faker->randomElement(['CDD', 'CDI', 'Stagiaire']),
                'specialisation' => $faker->jobTitle(),
                'certification' => $faker->sentence(),
                'date_embauche' => $faker->date() ,
                'created_at' => date('Y-m-d H:i:s'),

                // Urgence 
                'urgence_nom' => $faker->firstName() . ' ' . $faker->lastName(),
                'urgence_lien' => $faker->word(),
                'urgence_tel' => $faker->phoneNumber(),
                'urgence_email' => $faker->email()
            ]);

            $lasteMatricule = $matricule;
        }


        $professeurs = $this->model->getIds('personnel', 'id_personnel');

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
                    $this->model->insertFixture('classe_professeur_matier', [
                        'classe_id_classe' => $classe,
                        'professeur_id_professeur' => $professeur,
                        'matiere_id_matiere' => $matiere,
                        'heure_semaine' => $faker->numberBetween(1, 10)
                    ]);
                }
            }
        }



        // 12. inscription
        $annees = $this->model->getIds('annee_scolaire', 'id_annee_scolaire');
        for ($i = 0; $i < 5; $i++) {
            $eleve = $faker->randomElement($eleves);
            $parent = $faker->randomElement($parents);
            $this->model->insertFixture('inscription', [
                'date_inscription' => $faker->date(),
                'classe_id_classe' => $faker->randomElement($classes),
                'annee_scolaire_id_annee_scolaire' => $faker->randomElement($annees),
                'eleve_id_eleve' => $eleve,
                'ancienne_ecole' => $faker->company(),
                'is_droit_payed' => $faker->randomElement(['oui', 'non']),
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }

        $inscriptions = $this->model->getIds('inscription', 'id_inscription');

        // 13. note
        for ($i = 0; $i < 10; $i++) {
            $this->model->insertFixture('note', [
                'valeur' => $faker->numberBetween(0, 20),
                'eleve_id_eleve' => $faker->randomElement($eleves),
                'annee_scolaire_id_annee_scolaire' => $faker->randomElement($annees),
                'matiere_id_matiere' => $faker->randomElement($matieres),
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }

        // 14. depense
        for ($i = 0; $i < 5; $i++) {
            $this->model->insertFixture('depense', [
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
            $this->model->insertFixture('paiement', [
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
