<?php
class AppFixtures extends CI_Controller
{
    protected $faker = null;
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

        $this->faker = \Faker\Factory::create('fr_FR');
    }


    /**
     * Configurations general
     *
     * @return void
     */
    private function loadConfigurations($clean = false)
    {

        // Vider les tables (dans l’ordre inverse des dépendances)
        $this->model->emptyDb([
            'etablissement',
            'annee_scolaire',
            'matiere',
            'niveau',
            'matiere_niveau',
            'classe',
            'ecolage',
            'droit_inscription',
        ]);

        if ($clean) {
            // On efface seulement la base de données
            return;
        }


        // ? ===================== Etablissement ===================== //
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


        // ? ===================== Annee scolaire  ===================== //
        for ($i = 0; $i < 2; $i++) {
            $this->model->insertFixture('annee_scolaire', [
                'nom' => 'Année Scolaire ' . ($i + 1),
                'date_debut' => $this->faker->date(),
                'date_fin' => $this->faker->date(),
                'description' => $this->faker->sentence(6),
                'created_at' => date('Y-m-d')
            ]);
        }


        // ? ===================== Matières  ===================== //
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
        foreach ($matieresListe as  $mat) {
            $this->model->insertFixture('matiere', [
                'denomination' => $mat['denomination'],
                'abbreviation' => strtoupper($mat['abbreviation']),
                'description' => $mat['description'],
                'couleur' => $this->faker->hexColor,
            ]);
        }


        // ? ===================== Niveau ===================== // 
        $niveaux = [
            'Primaire' => [
                'CP',
                'CE1',
                'CE2',
                'CM1',
                'CM2'
            ],
            'Collège' => [
                '6ème',
                '5ème',
                '4ème',
                '3ème'
            ],
            'Lycée' => [
                'Seconde',
                'Première',
                'Terminale'
            ]
        ];
        foreach ($niveaux as $cycle => $classes) {
            foreach ($classes as $classe) {
                $this->model->insertFixture('niveau', [
                    'niveau' => $classe,
                    'cycle' => $cycle,
                    'description' => "Classe de $classe du cycle $cycle",
                    'created_at' => date('Y-m-d H:i:s')
                ]);
            }
        }

        // ? ===================== Matieres et Niveau ===================== //
        $niveaux = $this->model->getIds('niveau', 'id_niveau');
        $matieres = $this->model->getIds('matiere', 'id_matiere');
        foreach ($matieres as $matiere) {
            foreach ($this->faker->randomElements($niveaux, rand(1, 2)) as $niveau) {
                $this->model->insertFixture('matiere_niveau', [
                    'matiere_id_matiere' => $matiere,
                    'niveau_id_niveau' => $niveau,
                    'coefficient' => $this->faker->numberBetween(1, 5),
                ]);
            }
        }

        // ? ===================== Classes ===================== //
        $sections = ['A', 'B', 'C', 'D', 'E', 'F'];
        $this->load->database();
        $niveauxData = $this->db->select('id_niveau, niveau')
            ->from('niveau')
            ->get()
            ->result_array();

        foreach ($niveauxData as $niveau) {
            $niveauId = $niveau['id_niveau'];
            $nomNiveau = $niveau['niveau'];
            $nbClasses = rand(2, 3);

            for ($i = 0; $i < $nbClasses; $i++) {
                $section = $sections[$i] ?? $this->faker->randomElement($sections);

                $this->model->insertFixture('classe', [
                    'denomination'     => $nomNiveau . ' ' . $section, // ex: "5ème A"
                    'niveau_id_niveau' => $niveauId,
                    'created_at'       => date('Y-m-d H:i:s')
                ]);
            }
        }


        // ? ===================== Frais de scolarité  ===================== //
        foreach ($niveaux as $niveau) {
            $this->model->insertFixture('droit_inscription', [
                'montant' => $this->faker->numberBetween(50000, 100000),
                'niveau_id_niveau' => $niveau,
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }

        foreach ($niveaux as $niveau) {
            $this->model->insertFixture('ecolage', [
                'montant' => $this->faker->numberBetween(25000, 80000),
                'niveau_id_niveau' => $niveau,
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }
    }


    /**
     * Fixtures pour les eleves et parents 
     *
     * @return void
     */
    private function LoadEleveParent($clean = false)
    {
        // Vider les tables (dans l’ordre inverse des dépendances)
        $this->model->emptyDb([
            'eleve',
            'parents',
            'inscription',
        ]);

        if ($clean) {
            // On efface seulement la base de données
            return;
        }

        // ? ===================== Eleves  ===================== //
        $lastStudent = $this->EtudiantModel->findLatest();
        $lastStudentMatricule = '';
        if (isset($lastStudent) && isset($lastStudent->matricule_etudiant)) {
            $lastStudentMatricule = $lastStudent->matricule_etudiant;
        }

        for ($i = 0; $i < 10; $i++) {
            $matriculeStudent = generateMatricule(STUDENT_PRIFIX, $lastStudentMatricule);
            $this->model->insertFixture('eleve', [
                'matricule_etudiant' => $matriculeStudent,
                'nom' => $this->faker->lastName,
                'prenom' => $this->faker->firstName,
                'adresse' => $this->faker->address,
                'telephone' => $this->faker->phoneNumber,
                'date_naissance' => $this->faker->date(),
                'lieu_naissance' => $this->faker->address(),
                'sexe' => $this->faker->randomElement(['Homme', 'Femme']),
                'maladies' => $this->faker->word,
                'created_at' => date('Y-m-d H:i:s'),
                'nationalite' => 'Malagasy',
                'email' => $this->faker->email()
            ]);
            $lastStudentMatricule = $matriculeStudent;
        }

        //? ===================== Parents ===================== //
        $eleves = $this->model->getIds('eleve', 'id_eleve');
        foreach ($eleves as $eleve) {
            // Génère entre 1 et 3 parents/tuteurs par élève
            $nbParents = rand(1, 3);

            for ($i = 0; $i < $nbParents; $i++) {
                // Créer un parent dans la table parents
                $parentId = $this->model->insertFixture('parents', [
                    'prenom' => $this->faker->firstName,
                    'nom' => $this->faker->lastName,
                    'telephone' => $this->faker->phoneNumber,
                    'email' => $this->faker->safeEmail,
                    'adresse' => $this->faker->address,
                    'profession' => $this->faker->jobTitle,
                    'employeur' => $this->faker->company,
                    'telephone_travail' => $this->faker->phoneNumber,
                    'contact_urgence' => $this->faker->boolean(30)
                ]);

                // Lier ce parent à l'élève dans la table parents_eleves
                $this->model->insertFixture('parents_eleves', [
                    'eleve_id_eleve' => $eleve,
                    'parent_id_parent' => $parentId,
                    'type' => $this->faker->randomElement(['père', 'mère', 'tuteur'])
                ]);
            }
        }


        //? ===================== Inscription eleves ===================== //
        $classes = $this->model->getIds('classe', 'id_classe');
        $annees = $this->model->getIds('annee_scolaire', 'id_annee_scolaire');
        for ($i = 0; $i < 5; $i++) {
            $eleve = $this->faker->randomElement($eleves);
            $this->model->insertFixture('inscription', [
                'date_inscription' => $this->faker->date(),
                'classe_id_classe' => $this->faker->randomElement($classes),
                'annee_scolaire_id_annee_scolaire' => $this->faker->randomElement($annees),
                'eleve_id_eleve' => $eleve,
                'ancienne_ecole' => $this->faker->company(),
                'is_droit_payed' => $this->faker->randomElement(['oui', 'non']),
                'created_at' => date('Y-m-d H:i:s')
            ]);
        }
    }

    /**
     * Fixtures pour les personnels 
     *
     * @return void
     */
    private function loadPersonnel($clean = false)
    {

        // Vider les tables (dans l’ordre inverse des dépendances)
        $this->model->emptyDb([
            'type_personnel',
            'classe_proffesseur_matiere',
            'personnel',
        ]);

        if ($clean) {
            // On efface seulement la base de données
            return;
        }
        // ? ===================== Type du personnel ===================== //
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

        foreach ($type_personnels as $type) {
            $this->model->insertFixture('type_personnel', [
                'type' => $type,
                'description' => $this->faker->sentence(6),
            ]);
        }

        //? ===================== Personnel ===================== //
        $types = $this->model->getIds('type_personnel', 'id_type_personnel');
        $lasted = $this->personnelModel->findLatest();
        $lasteMatricule = '';
        if ($lasted && !empty($lasted->matricule_personnel)) {
            $lasteMatricule = $lasted->matricule_personnel;
        }

        // Générer 20 nouveaux employés
        for ($i = 0; $i < 20; $i++) {
            $matricule = generateMatricule(EMPLOYEE_PREFIX, $lasteMatricule);

            $this->model->insertFixture('personnel', [
                'matricule_personnel' => $matricule,
                'nom' => $this->faker->lastName,
                'prenom' => $this->faker->firstName,
                'addresse' => $this->faker->address,
                'telephone' => $this->faker->phoneNumber,
                'date_naissance' => $this->faker->date(),
                'lieu_naissance' => $this->faker->city(),
                'sexe' => $this->faker->randomElement(['Homme', 'Femme']),
                'engagement' => 'Permanent',
                'email' => $this->faker->email,
                'id_type_personnel' => $this->faker->randomElement($types),
                'salaire_base' => $this->faker->numberBetween(200000, 800000),
                "status" => $this->faker->randomElement(['Actif', 'Suspendu', "Démissionnaire"]),
                'numero_cin' => $this->faker->randomNumber(),
                'nationalite' => $this->faker->country(),
                'type_contrat' => $this->faker->randomElement(['CDD', 'CDI', 'Stagiaire']),
                'specialisation' => $this->faker->jobTitle(),
                'certification' => $this->faker->sentence(),
                'date_embauche' => $this->faker->date(),
                'created_at' => date('Y-m-d H:i:s'),

                // Urgence 
                'urgence_nom' => $this->faker->firstName() . ' ' . $this->faker->lastName(),
                'urgence_lien' => $this->faker->word(),
                'urgence_tel' => $this->faker->phoneNumber(),
                'urgence_email' => $this->faker->email()
            ]);

            $lasteMatricule = $matricule;
        }


        $professeurs =  $this->model->getAllIdTeacher();

        // ? ===================== Cours ===================== //
        $matieres = $this->model->getIds('matiere', 'id_matiere');
        $classes = $this->model->getIds('classe', 'id_classe');
        foreach ($classes as $classe) {
            foreach ($this->faker->randomElements($matieres, 2) as $matiere) {
                $professeur = $this->faker->randomElement($professeurs);

                // Vérifie si la combinaison existe déjà dans la BDD
                $exists = $this->db->where('classe_id_classe', $classe)
                    ->where('professeur_id_professeur', $professeur)
                    ->get('classe_proffesseur_matiere')
                    ->num_rows() > 0;

                if (!$exists) {
                    $this->model->insertFixture('classe_proffesseur_matiere', [
                        'classe_id_classe' => $classe,
                        'professeur_id_professeur' => $professeur,
                        'matiere_id_matiere' => $matiere,
                        'heure_semaine' => $this->faker->numberBetween(1, 10)
                    ]);
                }
            }
        }
    }

    /**
     * Fixtures pour les compte utilisateurs
     *
     * @return void
     */
    private function loadUser($clean = false)
    {
        // Vider les tables (dans l’ordre inverse des dépendances)
        $this->model->emptyDb([
            'users'
        ]);

        if ($clean) {
            // On efface seulement la base de données
            return;
        }

        $roles = ['admin', 'secretaire', 'prof', 'parent', 'etudiant'];
        for ($i = 0; $i < 5; $i++) {
            $this->model->insertFixture('users', [
                'role' => $this->faker->randomElement($roles),
                'identifiant' => $this->faker->email(),
                'password' => password_hash('123456', PASSWORD_DEFAULT),
                'status' => false,
                'created_at' => $this->faker->dateTime()->format('Y-m-d H:i:s'),
                'last_login' => $this->faker->dateTime()->format('Y-m-d H:i:s')
            ]);
        }
        $this->model->insertFixture('users', [
            'role' => 'admin',
            'identifiant' => 'admin@gmail.com',
            'password' => password_hash('admin123', PASSWORD_DEFAULT),
            'status' => false,
            'created_at' => $this->faker->dateTime()->format('Y-m-d H:i:s'),
            'last_login' => $this->faker->dateTime()->format('Y-m-d H:i:s')
        ]);
    }

    /**
     * Fixtures pour les leçon 
     *
     * @param boolean $clean
     * @return void
     */
    private function loadLecon($clean = false)
    {
        // Vider les tables (dans l’ordre inverse des dépendances)
        $this->model->emptyDb([
            'lecon',
        ]);

        if ($clean) {
            // On efface seulement la base de données
            return;
        }

        $teachersId = $this->model->getAllIdTeacher();
        $id = 1;
        foreach ($teachersId as $id) {
            $assignations = $this->model->getAssignationByTeacher($id);
            $lecons = [];
            foreach ($assignations as $assignation) {
                $titre = $this->faker->sentence(6);
                $this->load->helper(['url', 'text']);
                $slug = url_title(convert_accented_characters($titre . ' ' . $id), 'dash', TRUE);
                $lecon = [
                    'titre' => $titre,
                    'slug' => $slug,
                    'description' => $this->faker->paragraph(3),
                    'contenu' => $this->faker->paragraphs(5, true),
                    'fichier_support' => $this->faker->optional()->fileExtension(),
                    'ficher_principale' => $this->faker->url,
                    'created_at' => $this->faker->dateTimeBetween('-1 year', 'now')->format('Y-m-d H:i:s'),
                    'id_prof' => $assignation['id_prof'],
                    'id_matiere' => $assignation['id_matiere'],
                    'id_niveau' => $assignation['id_niveau']
                ];
                $lecons[] = $lecon;
                $id++;
            }
            // Insertion des loçons pour le prof dans la base de donnée
            $this->model->insertBatchFixtures($lecons, 'lecon');
        }
    }


    /**
     * Create a fake data  in the data base 
     *
     * @return void
     */
    public function loadFixtures()
    {
        $this->loadUser();
        $this->loadConfigurations();
        $this->loadPersonnel();
        $this->LoadEleveParent();
        $this->loadlecon();

        echo "✅ Fausse base de données générée avec succès !" . PHP_EOL;
    }


    /**
     * Effacer toutes le donée dans la base de données
     *
     * @return void
     */
    public function cleanUp()
    {
        $this->loadUser(true);
        $this->loadConfigurations(true);
        $this->loadPersonnel(true);
        $this->LoadEleveParent(true);
        $this->loadlecon(true);

        echo "✅ Suppression des données avec succès !" . PHP_EOL;
    }
}
