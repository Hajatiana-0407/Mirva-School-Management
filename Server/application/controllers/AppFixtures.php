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
            'nom' => 'MIRVA',
            'code' => 'MIRV2025',
            'adresse' => 'Alarobia Amboniloha',
            'telephone' => '034 12 576 92',
            'email' => 'mirvaalarobia@gmail.com',
            'slogan' => 'Apprendre, Grandir, Réussir',
            'logo' => '',
            'created_at' => date('Y-m-d H:i:s'),
            'site_web' => 'www.lyceemirva35.com',
            'description' => 'Lycée MIRVA Alarobia Amboniloha
        Présco Primaires Secondaires',
            "prefix" => '',
            'facebook' => 'https://www.facebook.com/profile.php?id=61575911525721',
            'twitter' => '',
            'instagram' => '',
            'linkedin' => '',
            'youtube' => ''
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
     * Fixtures pour les roles permission
     *
     * @param boolean $clean
     * @return void
     */
    private function loadRoles($clean = false)
    {
        $this->model->emptyDb([
            'modules',
            'roles',
            'role_permissions'
        ]);

        if ($clean) {
            // On efface seulement la base de données
            return;
        }
        //?  ===================== ROLES ===================== //
        $roles = [
            [
                'nom' => 'Administrateur',
                'description' => 'Administrateur du système',
                'is_restrict' => true,
                'couleur' => $this->faker->hexColor,
            ],
            [
                'nom' => 'Enseignant',
                'description' => 'Professeur pouvant gérer ses classes, notes et présences',
                'is_restrict' => true,
                'couleur' => $this->faker->hexColor,
            ],
            [
                'nom' => 'Étudiant',
                'description' => 'Élève pouvant consulter ses notes, devoirs et emplois du temps',
                'is_restrict' => true,
                'couleur' => $this->faker->hexColor,
            ],
            [
                'nom' => 'Parent',
                'description' => 'Parent d’élève pouvant consulter les résultats et paiements',
                'is_restrict' => false,
                'couleur' => $this->faker->hexColor,
            ],
        ];
        $this->model->insertBatchFixtures($roles, "roles");


        //?  ===================== MODULE ===================== //
        $modules = [
            ['nom' => 'dashboard', 'label' => 'Tableau de bord', 'description' => 'Tableau de bord général de la plateforme', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'registration', 'label' => 'Inscriptions', 'description' => 'Gestion des inscriptions des nouveaux élèves', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'students', 'label' => 'Élèves', 'description' => 'Gestion des informations et dossiers des élèves', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'schedule', 'label' => 'Emploi du temps', 'description' => 'Organisation et consultation des emplois du temps', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'attendance', 'label' => 'Présences', 'description' => 'Suivi des présences et absences des élèves', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'exams', 'label' => 'Examens', 'description' => 'Gestion des examens, notes et bulletins', 'is_for_all' => false, 'is_section' => false],

            // Section Leçons et Exercices
            ['nom' => 'course', 'label' => 'Cours', 'description' => 'Module principal pour la gestion des leçons et exercices', 'is_for_all' => false, 'is_section' => true],
            ['nom' => 'lessons', 'label' => 'Leçons', 'description' => 'Création et consultation des leçons', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'exercices', 'label' => 'Exercices', 'description' => 'Création et gestion des exercices pour les élèves', 'is_for_all' => false, 'is_section' => false],

            // Section Administration
            ['nom' => 'management', 'label' => 'Administration', 'description' => 'Espace d’administration et gestion du personnel', 'is_for_all' => false, 'is_section' => true],
            ['nom' => 'employees', 'label' => 'Employés', 'description' => 'Gestion des employés de l’établissement', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'teachers', 'label' => 'Enseignants', 'description' => 'Gestion des enseignants et de leurs matières', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'parents', 'label' => 'Parents', 'description' => 'Gestion des comptes et informations des parents', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'payments', 'label' => 'Paiements', 'description' => 'Suivi et gestion des paiements et frais de scolarité', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'messages', 'label' => 'Messages', 'description' => 'Messagerie interne entre professeurs, élèves et parents', 'is_for_all' => false, 'is_section' => false],

            // Section Paramétrage
            ['nom' => 'settingsSection', 'label' => 'Configuration', 'description' => 'Section regroupant les paramètres et configurations globales', 'is_for_all' => false, 'is_section' => true],
            ['nom' => 'school-year', 'label' => 'Années scolaires', 'description' => 'Gestion des années scolaires', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'levels', 'label' => 'Niveaux', 'description' => 'Gestion des niveaux d’enseignement', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'classes', 'label' => 'Classes', 'description' => 'Gestion des classes et des groupes d’élèves', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'subjects', 'label' => 'Matières', 'description' => 'Gestion des matières enseignées', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'settings', 'label' => 'Paramètres', 'description' => 'Paramètres et configuration du système', 'is_for_all' => true, 'is_section' => false],

            // Paramettre 
            ['nom' => 'general-settings', 'label' => 'Paramètres généraux', 'description' => 'Configuration générale du système et des préférences globales', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'school-settings', 'label' => 'Paramètres de l’établissement', 'description' => 'Informations et configuration propres à l’établissement scolaire', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'roles-settings', 'label' => 'Paramètres des rôles et utilisateurs', 'description' => 'Gestion des rôles, permissions et utilisateurs du système', 'is_for_all' => false, 'is_section' => false],
        ];
        $this->model->insertBatchFixtures($modules, 'modules');

        $modules_id = $this->model->getIds('modules', 'id_module');
        $roles = $this->model->getAllTable('roles');
        $roles_permmissions = [];
        foreach ($roles as $role) {
            foreach ($modules_id as  $module) {
                $temps = [
                    'id_role' => $role['id_role'],
                    'id_module' => $module,
                    'can_read' => (bool) random_int(0, 1),
                    'can_create' => (bool) random_int(0, 1),
                    'can_update' => (bool) random_int(0, 1),
                    'can_delete' => (bool) random_int(0, 1),
                ];

                if ($role['nom'] === 'Administrateur') {
                    $temps['can_create'] = true;
                    $temps['can_update'] = true;
                    $temps['can_delete'] = true;
                    $temps['can_read'] = true;
                }

                $roles_permmissions[] = $temps;
                $temps = [];
            }
        }
        $this->model->insertBatchFixtures($roles_permmissions, 'role_permissions');
    }

    /**
     * Fixtures pour les compte utilisateurs
     *
     * @return void
     */
    public function loadUser($clean = false)
    {
        // Vider les tables (dans l’ordre inverse des dépendances)
        $this->model->emptyDb([
            'users'
        ]);

        if ($clean) {
            // On efface seulement la base de données
            return;
        }

        // $personnels_id = $this->model->getIds('personnel', 'id_personnel');
        $personnels_id =  $this->model->getAllIdTeacher();
        $eleves_id = $this->model->getIds('eleve', 'id_eleve');
        $parent_id = $this->model->getIds('parents', 'id_parent');


        $user_relations  = [$personnels_id, $eleves_id, $parent_id];

        $roles_id = $this->model->getIds('roles', 'id_role');

        for ($i = 0; $i < 10; $i++) {
            $user = [
                'id_role' => $this->faker->randomElement($roles_id),
                'identifiant' => $this->faker->email(),
                'password' => password_hash('123456', PASSWORD_DEFAULT),
                'status' => 0,
                'created_at' => $this->faker->dateTime()->format('Y-m-d H:i:s'),
                'last_login' => $this->faker->dateTime()->format('Y-m-d H:i:s')
            ];

            $typeIdx = rand(0, 2);
            $tentation = 0;
            while ((!isset($user_relations[$typeIdx]) || count($user_relations[$typeIdx]) === 0) && $tentation < 6) {
                $typeIdx = rand(0, 2);
                # code...
                $tentation++;
            }
            switch ($typeIdx) {
                case 0:
                    $user['id_personnel'] = $this->faker->randomElement($user_relations[$typeIdx]);
                    break;
                case 1:
                    $user['id_eleve'] = $this->faker->randomElement($user_relations[$typeIdx]);
                    break;
                case 2:
                    $user['id_parent'] = $this->faker->randomElement($user_relations[$typeIdx]);
                    break;
                default:
                    # code...
                    break;
            }
            $this->model->insertFixture('users', $user);
        }
        $this->model->insertFixture('users', [
            'id_role' => $roles_id[0] ?? null,
            'identifiant' => 'admin@gmail.com',
            'password' => password_hash('admin123', PASSWORD_DEFAULT),
            'status' => false,
            'created_at' => $this->faker->dateTime()->format('Y-m-d H:i:s'),
            'last_login' => $this->faker->dateTime()->format('Y-m-d H:i:s')
        ]);

        echo "✅ Utilisateur générée avec succès !" . PHP_EOL;
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


    private function registration()
    {
        // Vider les tables (dans l’ordre inverse des dépendances)
        $this->model->emptyDb([
            'inscription',
            'eleve'
        ]);

        $this->load->model('UtilisateurModel');
        $role_etudiant = $this->UtilisateurModel->getIdRoleStudent();

        $inscriptions = [];
        $users = [];

        // Fonction pour formater le matricule avec tiret
        $formatMatricule = function ($matricule) {
            if (strlen($matricule) > 2) {
                return substr($matricule, 0, 2) . '-' . substr($matricule, 2);
            }
            return $matricule;
        };

        // ==================== SECONDE ====================
        $eleve_seconde1 = [
            ["numero" => 1, "sexe" => "Femme", "nom" => "ANDRIANJATOVO", "prenom" => "Harijaona Ainamamy Tanteraka", "matricule" => "91-854", "naissance" => "2010-12-31", "note" => ""],
            ["numero" => 2, "sexe" => "Femme", "nom" => "ANDRIAMIFIDISOA", "prenom" => "Karila Megane", "matricule" => "92-441", "naissance" => "2011-01-12", "note" => ""],
            ["numero" => 3, "sexe" => "Femme", "nom" => "RANDRIAMANJATO", "prenom" => "To'Ahy Vanielle", "matricule" => "91-951", "naissance" => "2012-01-18", "note" => "4è"],
            ["numero" => 4, "sexe" => "Femme", "nom" => "IALINIRINA", "prenom" => "Fehiazy Marcia", "matricule" => "91-952", "naissance" => "2011-11-24", "note" => ""],
            ["numero" => 5, "sexe" => "Homme", "nom" => "RAKOTONDRAHOVA", "prenom" => "Dilan Maté Maherinihasina", "matricule" => "93-387", "naissance" => "2012-04-17", "note" => "Nouv"],
            ["numero" => 6, "sexe" => "Femme", "nom" => "RAMBOAVOLANIRINA HARIVELO", "prenom" => "Ny Avo", "matricule" => "91-839", "naissance" => "2010-08-10", "note" => ""],
            ["numero" => 7, "sexe" => "Femme", "nom" => "RAHARINJATOVO", "prenom" => "Mitia", "matricule" => "91-905", "naissance" => "2010-04-16", "note" => "4è"],
            ["numero" => 8, "sexe" => "", "nom" => "NOMENJANAHARY", "prenom" => "Rojo Nantenaina", "matricule" => "93-384", "naissance" => "2010-11-26", "note" => "Nouv"],
            ["numero" => 9, "sexe" => "Homme", "nom" => "ANDRIANANTENAINA", "prenom" => "Dimbinavalona", "matricule" => "93-388", "naissance" => "2009-10-23", "note" => "Nouv"],
            ["numero" => 10, "sexe" => "Femme", "nom" => "RAJAONARIVONY", "prenom" => "Alicia", "matricule" => "93-385", "naissance" => "2012-07-12", "note" => ""],
            ["numero" => 11, "sexe" => "", "nom" => "RAJAONARISON", "prenom" => "Herimaminjanahary Idealisoa", "matricule" => "93-389", "naissance" => "2011-07-04", "note" => "Nouv"],
            ["numero" => 12, "sexe" => "Homme", "nom" => "ANDRIANANTENAINA", "prenom" => "Mandresy Johan", "matricule" => "91-997", "naissance" => "2011-07-18", "note" => ""],
            ["numero" => 13, "sexe" => "Femme", "nom" => "RAMILIARISON", "prenom" => "Nirimamijely Christella Myrrhia", "matricule" => "93-150", "naissance" => "2011-09-04", "note" => "4è"],
            ["numero" => 14, "sexe" => "Homme", "nom" => "TIAMANANDAZA", "prenom" => "Ismaël Fabrice", "matricule" => "91-743", "naissance" => "2009-08-26", "note" => ""],
            ["numero" => 15, "sexe" => "Homme", "nom" => "HAJARIVONJILALINA", "prenom" => "Nirina Nicolas", "matricule" => "92-637", "naissance" => "2009-05-23", "note" => ""],
            ["numero" => 16, "sexe" => "Homme", "nom" => "RASAMOELINA", "prenom" => "Arena", "matricule" => "92-104", "naissance" => "2010-11-18", "note" => ""],
            ["numero" => 17, "sexe" => "Femme", "nom" => "NOMENJANANAHARY", "prenom" => "Fitia", "matricule" => "93-390", "naissance" => "2010-04-21", "note" => "Nouv"],
            ["numero" => 18, "sexe" => "Homme", "nom" => "RAKOTONIMANGA", "prenom" => "Mahenina", "matricule" => "92-503", "naissance" => "2011-12-02", "note" => ""],
            ["numero" => 19, "sexe" => "Femme", "nom" => "VEROARISOA", "prenom" => "Daniela Guadagno", "matricule" => "91-986", "naissance" => "2011-02-26", "note" => ""],
            ["numero" => 20, "sexe" => "Homme", "nom" => "RAJONIKARA", "prenom" => "Irohaj", "matricule" => "92-922", "naissance" => "2010-09-24", "note" => ""],
            ["numero" => 21, "sexe" => "Homme", "nom" => "ANDRIAMASINORO", "prenom" => "Joie Djibril", "matricule" => "93-391", "naissance" => "2011-09-13", "note" => "Nouv"],
            ["numero" => 22, "sexe" => "Homme", "nom" => "RAMAROSON", "prenom" => "Heriniaina Onja Charles", "matricule" => "92-806", "naissance" => "2010-09-24", "note" => ""],
            ["numero" => 23, "sexe" => "Femme", "nom" => "ANDRIANOKOLOINA", "prenom" => "Miangalisoa Fandresena Fitia", "matricule" => "92-003", "naissance" => "2011-09-29", "note" => ""],
            ["numero" => 24, "sexe" => "Femme", "nom" => "RASOLOARIJAO", "prenom" => "Ny Antsa Ravo", "matricule" => "93-234", "naissance" => "2010-12-11", "note" => ""],
            ["numero" => 25, "sexe" => "Femme", "nom" => "RAMANANKIERANA", "prenom" => "Liantsoa", "matricule" => "92-736", "naissance" => "2011-04-04", "note" => ""],
            ["numero" => 26, "sexe" => "Femme", "nom" => "RAZAFIMANDIMBY", "prenom" => "Hasina Andrianina Fitia", "matricule" => "92-004", "naissance" => "2011-05-02", "note" => ""],
            ["numero" => 27, "sexe" => "Femme", "nom" => "RAKOTOMALALA", "prenom" => "Irintsoa Famenomamy", "matricule" => "92-182", "naissance" => "2011-01-01", "note" => ""],
            ["numero" => 28, "sexe" => "Femme", "nom" => "JEAN ARIVAHY", "prenom" => "Harena Savanah", "matricule" => "91-891", "naissance" => "2011-05-04", "note" => ""],
            ["numero" => 29, "sexe" => "Homme", "nom" => "RAKOTONOMENJANAHARY", "prenom" => "Toky Ny Avo", "matricule" => "92-645", "naissance" => "2010-06-29", "note" => ""],
            ["numero" => 30, "sexe" => "Femme", "nom" => "ANDRIAHERINTSOA", "prenom" => "Kanto Narindra", "matricule" => "93-396", "naissance" => "2012-03-28", "note" => "Nouv"],
            ["numero" => 31, "sexe" => "Homme", "nom" => "ANJARATIANA", "prenom" => "Nomenjanahary Nasoavina Anthonio", "matricule" => "93-377", "naissance" => "2012-03-22", "note" => "Nouv"],
            ["numero" => 32, "sexe" => "Femme", "nom" => "RABENARISON", "prenom" => "Princia", "matricule" => "92-356", "naissance" => "2010-02-25", "note" => ""],
            ["numero" => 33, "sexe" => "Homme", "nom" => "ANDRIAMPARANY", "prenom" => "Nathan", "matricule" => "91-956", "naissance" => "2010-08-10", "note" => ""],
            ["numero" => 34, "sexe" => "Femme", "nom" => "RANDRIANASOLO", "prenom" => "Haingovola Zayonne", "matricule" => "92-945", "naissance" => "2011-06-03", "note" => ""],
            ["numero" => 35, "sexe" => "Homme", "nom" => "RANAIVOARISON", "prenom" => "Heriniaina Christian", "matricule" => "91-858", "naissance" => "2010-05-06", "note" => ""],
            ["numero" => 36, "sexe" => "Femme", "nom" => "RAZAFINDRABE", "prenom" => "Mikanto Rarintsoa", "matricule" => "92-728", "naissance" => "2010-11-04", "note" => ""],
        ];
        $secondeInfo =  [
            'classe' => 3183,
            'niveau' => 1738
        ];

        foreach ($eleve_seconde1 as $key => &$seconde) {
            // Formater le matricule avec tiret
            $matriculeFormate = $formatMatricule($seconde['matricule']);

            $eleve = $this->EtudiantModel->insert([
                'nom' => $seconde['nom'],
                'prenom' => $seconde['prenom'],
                'date_naissance' => $seconde['naissance'],
                'matricule_etudiant' => $matriculeFormate,
                'sexe' => $seconde['sexe']
            ]);

            if ($eleve) {
                $inscriptions[] = [
                    'numero' => $seconde['numero'],
                    'annee_scolaire_id_annee_scolaire' => 392,
                    'niveau_id_niveau' => $secondeInfo['niveau'],
                    'classe_id_classe' => $secondeInfo['classe'],
                    "eleve_id_eleve" => $eleve['id_eleve'],
                    'is_droit_payed' => true,
                    'date_inscription' => '2025-08-10'
                ];
                $users[] = [
                    'id_role' => $role_etudiant->id_role,
                    'identifiant' => $matriculeFormate,
                    'password' => password_hash('password-' . $matriculeFormate, PASSWORD_DEFAULT),
                    'id_eleve' => $eleve['id_eleve']
                ];
            }
        }

        // ==================== 3EME ====================
        $eleves_3em  = [
            ["numero" => 1, "sexe" => "Femme", "nom" => "MANDIMBISON", "prenom" => "Ny Lova Estelle", "matricule" => "92-042", "naissance" => "2011-12-12"],
            ["numero" => 2, "sexe" => "Homme", "nom" => "RANDRIANALIMANANA", "prenom" => "Fanilo", "matricule" => "91-950", "naissance" => "2011-06-29"],
            // ... (appliquer le même formatage pour tous les autres élèves)
        ];
        $classe3em_info = [
            'classe' => 3183,
            'niveau' => 1738
        ];

        foreach ($eleves_3em as $key => &$etudiant) {
            // Formater le matricule avec tiret
            $matriculeFormate = $formatMatricule($etudiant['matricule']);

            $eleve = $this->EtudiantModel->insert([
                'nom' => $etudiant['nom'],
                'prenom' => $etudiant['prenom'],
                'date_naissance' => $etudiant['naissance'],
                'matricule_etudiant' => $matriculeFormate,
                'sexe' => $etudiant['sexe']
            ]);

            if ($eleve) {
                $inscriptions[] = [
                    'numero' => $etudiant['numero'],
                    'annee_scolaire_id_annee_scolaire' => 392,
                    'niveau_id_niveau' => $classe3em_info['niveau'],
                    'classe_id_classe' => $classe3em_info['classe'],
                    "eleve_id_eleve" => $eleve['id_eleve'],
                    'is_droit_payed' => true,
                    'date_inscription' => '2025-08-10'
                ];
                $users[] = [
                    'id_role' => $role_etudiant->id_role,
                    'identifiant' => $matriculeFormate,
                    'password' => password_hash('password-' . $matriculeFormate, PASSWORD_DEFAULT),
                    'id_eleve' => $eleve['id_eleve']
                ];
            }
        }

        // Continuer de la même manière pour les autres classes...
        // (appliquer le même formatage pour Première et Terminale)

        $this->model->insertBatchFixtures($inscriptions, 'inscription');
        $this->model->insertBatchFixtures($users, 'users');
        echo "Insertion des eleve fini avec succée !" . PHP_EOL;
    }


    /**
     * Create a fake data  in the data base 
     *
     * @return void
     */
    public function loadFixtures()
    {
        $this->loadRoles();
        $this->loadConfigurations();
        $this->loadPersonnel();
        $this->LoadEleveParent();
        $this->loadlecon();
        $this->loadUser();

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
        $this->loadRoles(true);

        echo "✅ Suppression des données avec succès !" . PHP_EOL;
    }
}
