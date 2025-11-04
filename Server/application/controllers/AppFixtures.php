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

        $personnels_id = $this->model->getIds('personnel', 'id_personnel');
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


    private function registration($clean = false)
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
        // Seconde
        $eleve_seconde1 = [
            ["numero" => 1, "sexe" => "Femme", "nom" => "ANDRIANJATOVO", "prenom" => "Harijaona Ainamamy Tanteraka", "matricule" => "91854", "naissance" => "2010-12-31", "note" => ""],
            ["numero" => 2, "sexe" => "Femme", "nom" => "ANDRIAMIFIDISOA", "prenom" => "Karila Megane", "matricule" => "92441", "naissance" => "2011-01-12", "note" => ""],
            ["numero" => 3, "sexe" => "Femme", "nom" => "RANDRIAMANJATO", "prenom" => "To'Ahy Vanielle", "matricule" => "91951", "naissance" => "2012-01-18", "note" => "4è"],
            ["numero" => 4, "sexe" => "Femme", "nom" => "IALINIRINA", "prenom" => "Fehiazy Marcia", "matricule" => "91952", "naissance" => "2011-11-24", "note" => ""],
            ["numero" => 5, "sexe" => "Homme", "nom" => "RAKOTONDRAHOVA", "prenom" => "Dilan Maté Maherinihasina", "matricule" => "93387", "naissance" => "2012-04-17", "note" => "Nouv"],
            ["numero" => 6, "sexe" => "Femme", "nom" => "RAMBOAVOLANIRINA HARIVELO", "prenom" => "Ny Avo", "matricule" => "91839", "naissance" => "2010-08-10", "note" => ""],
            ["numero" => 7, "sexe" => "Femme", "nom" => "RAHARINJATOVO", "prenom" => "Mitia", "matricule" => "91905", "naissance" => "2010-04-16", "note" => "4è"],
            ["numero" => 8, "sexe" => "", "nom" => "NOMENJANAHARY", "prenom" => "Rojo Nantenaina", "matricule" => "93384", "naissance" => "2010-11-26", "note" => "Nouv"],
            ["numero" => 9, "sexe" => "Homme", "nom" => "ANDRIANANTENAINA", "prenom" => "Dimbinavalona", "matricule" => "93388", "naissance" => "2009-10-23", "note" => "Nouv"],
            ["numero" => 10, "sexe" => "Femme", "nom" => "RAJAONARIVONY", "prenom" => "Alicia", "matricule" => "93385", "naissance" => "2012-07-12", "note" => ""],
            ["numero" => 11, "sexe" => "", "nom" => "RAJAONARISON", "prenom" => "Herimaminjanahary Idealisoa", "matricule" => "93389", "naissance" => "2011-07-04", "note" => "Nouv"],
            ["numero" => 12, "sexe" => "Homme", "nom" => "ANDRIANANTENAINA", "prenom" => "Mandresy Johan", "matricule" => "91997", "naissance" => "2011-07-18", "note" => ""],
            ["numero" => 13, "sexe" => "Femme", "nom" => "RAMILIARISON", "prenom" => "Nirimamijely Christella Myrrhia", "matricule" => "93150", "naissance" => "2011-09-04", "note" => "4è"],
            ["numero" => 14, "sexe" => "Homme", "nom" => "TIAMANANDAZA", "prenom" => "Ismaël Fabrice", "matricule" => "91743", "naissance" => "2009-08-26", "note" => ""],
            ["numero" => 15, "sexe" => "Homme", "nom" => "HAJARIVONJILALINA", "prenom" => "Nirina Nicolas", "matricule" => "92637", "naissance" => "2009-05-23", "note" => ""],
            ["numero" => 16, "sexe" => "Homme", "nom" => "RASAMOELINA", "prenom" => "Arena", "matricule" => "92104", "naissance" => "2010-11-18", "note" => ""],
            ["numero" => 17, "sexe" => "Femme", "nom" => "NOMENJANANAHARY", "prenom" => "Fitia", "matricule" => "93390", "naissance" => "2010-04-21", "note" => "Nouv"],
            ["numero" => 18, "sexe" => "Homme", "nom" => "RAKOTONIMANGA", "prenom" => "Mahenina", "matricule" => "92503", "naissance" => "2011-12-02", "note" => ""],
            ["numero" => 19, "sexe" => "Femme", "nom" => "VEROARISOA", "prenom" => "Daniela Guadagno", "matricule" => "91986", "naissance" => "2011-02-26", "note" => ""],
            ["numero" => 20, "sexe" => "Homme", "nom" => "RAJONIKARA", "prenom" => "Irohaj", "matricule" => "92922", "naissance" => "2010-09-24", "note" => ""],
            ["numero" => 21, "sexe" => "Homme", "nom" => "ANDRIAMASINORO", "prenom" => "Joie Djibril", "matricule" => "93391", "naissance" => "2011-09-13", "note" => "Nouv"],
            ["numero" => 22, "sexe" => "Homme", "nom" => "RAMAROSON", "prenom" => "Heriniaina Onja Charles", "matricule" => "92806", "naissance" => "2010-09-24", "note" => ""],
            ["numero" => 23, "sexe" => "Femme", "nom" => "ANDRIANOKOLOINA", "prenom" => "Miangalisoa Fandresena Fitia", "matricule" => "92003", "naissance" => "2011-09-29", "note" => ""],
            ["numero" => 24, "sexe" => "Femme", "nom" => "RASOLOARIJAO", "prenom" => "Ny Antsa Ravo", "matricule" => "93234", "naissance" => "2010-12-11", "note" => ""],
            ["numero" => 25, "sexe" => "Femme", "nom" => "RAMANANKIERANA", "prenom" => "Liantsoa", "matricule" => "92736", "naissance" => "2011-04-04", "note" => ""],
            ["numero" => 26, "sexe" => "Femme", "nom" => "RAZAFIMANDIMBY", "prenom" => "Hasina Andrianina Fitia", "matricule" => "92004", "naissance" => "2011-05-02", "note" => ""],
            ["numero" => 27, "sexe" => "Femme", "nom" => "RAKOTOMALALA", "prenom" => "Irintsoa Famenomamy", "matricule" => "92182", "naissance" => "2011-01-01", "note" => ""],
            ["numero" => 28, "sexe" => "Femme", "nom" => "JEAN ARIVAHY", "prenom" => "Harena Savanah", "matricule" => "91891", "naissance" => "2011-05-04", "note" => ""],
            ["numero" => 29, "sexe" => "Homme", "nom" => "RAKOTONOMENJANAHARY", "prenom" => "Toky Ny Avo", "matricule" => "92645", "naissance" => "2010-06-29", "note" => ""],
            ["numero" => 30, "sexe" => "Femme", "nom" => "ANDRIAHERINTSOA", "prenom" => "Kanto Narindra", "matricule" => "93396", "naissance" => "2012-03-28", "note" => "Nouv"],
            ["numero" => 31, "sexe" => "Homme", "nom" => "ANJARATIANA", "prenom" => "Nomenjanahary Nasoavina Anthonio", "matricule" => "93377", "naissance" => "2012-03-22", "note" => "Nouv"],
            ["numero" => 32, "sexe" => "Femme", "nom" => "RABENARISON", "prenom" => "Princia", "matricule" => "92356", "naissance" => "2010-02-25", "note" => ""],
            ["numero" => 33, "sexe" => "Homme", "nom" => "ANDRIAMPARANY", "prenom" => "Nathan", "matricule" => "91956", "naissance" => "2010-08-10", "note" => ""],
            ["numero" => 34, "sexe" => "Femme", "nom" => "RANDRIANASOLO", "prenom" => "Haingovola Zayonne", "matricule" => "92945", "naissance" => "2011-06-03", "note" => ""],
            ["numero" => 35, "sexe" => "Homme", "nom" => "RANAIVOARISON", "prenom" => "Heriniaina Christian", "matricule" => "91858", "naissance" => "2010-05-06", "note" => ""],
            ["numero" => 36, "sexe" => "Femme", "nom" => "RAZAFINDRABE", "prenom" => "Mikanto Rarintsoa", "matricule" => "92728", "naissance" => "2010-11-04", "note" => ""],
        ];
        $secondeInfo = [
            'classe' => 3151,
            'niveau' => 1727
        ];

        foreach ($eleve_seconde1 as $key => &$seconde) {
            $eleve = $this->EtudiantModel->insert([
                'nom' => $seconde['nom'],
                'prenom' => $seconde['prenom'],
                'date_naissance' => $seconde['naissance'],
                'matricule_etudiant' => $seconde['matricule'],
                'sexe' => $seconde['sexe']
            ]);

            if ($eleve) {
                $inscriptions[] = [
                    'numero' => $seconde['numero'],
                    'annee_scolaire_id_annee_scolaire' => 390,
                    'niveau_id_niveau' => $secondeInfo['niveau'],
                    'classe_id_classe' => $secondeInfo['classe'],
                    "eleve_id_eleve" => $eleve['id_eleve'],
                    'is_droit_payed' => true,
                    'date_inscription' => '2025-08-10'
                ];
                $users[] = [
                    'id_role' => $role_etudiant->id_role,
                    'identifiant' => $eleve->matricule_etudiant,
                    'password' => password_hash($eleve->matricule_etudiant, PASSWORD_DEFAULT)
                ];
            }
        }

        // 3eme 
        $eleves_3em  = [
            ["numero" => 1, "sexe" => "Femme", "nom" => "MANDIMBISON", "prenom" => "Ny Lova Estelle", "matricule" => "92042", "naissance" => "2011-12-12"],
            ["numero" => 2, "sexe" => "Homme", "nom" => "RANDRIANALIMANANA", "prenom" => "Fanilo", "matricule" => "91950", "naissance" => "2011-06-29"],
            ["numero" => 3, "sexe" => "Homme", "nom" => "ANJARANANTENAINA", "prenom" => "ZAVA Stanley Iadanantsoa", "matricule" => "92360", "naissance" => "2010-08-13"],
            ["numero" => 4, "sexe" => "Homme", "nom" => "RANDRIAMAHERY", "prenom" => "Iloniaina Johary Kael", "matricule" => "92650", "naissance" => "2010-11-03"],
            ["numero" => 5, "sexe" => "Femme", "nom" => "RAKOTOSON", "prenom" => "Hosea", "matricule" => "92121", "naissance" => "2012-04-13"],
            ["numero" => 6, "sexe" => "Homme", "nom" => "RAJAONARIVO", "prenom" => "Toaviniaina", "matricule" => "92915", "naissance" => "2012-04-28"],
            ["numero" => 7, "sexe" => "Femme", "nom" => "ANDRIANIAINA", "prenom" => "Safidy Irinah", "matricule" => "92205", "naissance" => "2012-11-27"],
            ["numero" => 8, "sexe" => "Homme", "nom" => "RASOLOFOHARISON", "prenom" => "Matthieu Antenaina", "matricule" => "93229", "naissance" => "2011-05-27"],
            ["numero" => 9, "sexe" => "Homme", "nom" => "RANDRIAMANANA", "prenom" => "Aiko Notahiana", "matricule" => "92233", "naissance" => "2012-02-01"],
            ["numero" => 10, "sexe" => "Femme", "nom" => "VONJY VELONOMENA", "prenom" => "Aina", "matricule" => "92108", "naissance" => "2012-08-11"],
            ["numero" => 11, "sexe" => "Femme", "nom" => "RAHARINJATOVO", "prenom" => "Mirindra", "matricule" => "92092", "naissance" => "2011-09-24"],
            ["numero" => 12, "sexe" => "Femme", "nom" => "RAMAROJAONA", "prenom" => "Stheicy Raphaëlla", "matricule" => "93232", "naissance" => "2012-11-24"],
            ["numero" => 13, "sexe" => "Homme", "nom" => "RAMAROSON", "prenom" => "Aina Fanantenana", "matricule" => "91807", "naissance" => "2010-07-04"],
            ["numero" => 14, "sexe" => "Femme", "nom" => "RAKOTOARIMANANA", "prenom" => "Henintsoa Miah Adriana", "matricule" => "91954", "naissance" => "2012-08-05"],
            ["numero" => 15, "sexe" => "Femme", "nom" => "RALAMBONIRINA", "prenom" => "Aina Mitia", "matricule" => "92062", "naissance" => "2012-05-07"],
            ["numero" => 16, "sexe" => "Homme", "nom" => "ANDRIANOMENJANAHARY", "prenom" => "Todisoa Ely", "matricule" => "91942", "naissance" => "2011-05-18"],
            ["numero" => 17, "sexe" => "Femme", "nom" => "ANDRIAMPARA", "prenom" => "Miantsa Fitia", "matricule" => "92134", "naissance" => "2013-05-05"],
            ["numero" => 18, "sexe" => "Femme", "nom" => "MIANDRIHARISON", "prenom" => "Maelle", "matricule" => "92109", "naissance" => "2013-01-04"],
            ["numero" => 19, "sexe" => "Femme", "nom" => "RASOANAIVO", "prenom" => "Grace Iriana Ariel", "matricule" => "92259", "naissance" => "2011-06-27"],
            ["numero" => 20, "sexe" => "Homme", "nom" => "RAKOTONIAINA", "prenom" => "Nambinintsoa Myranto", "matricule" => "92613", "naissance" => "2011-08-04"],
            ["numero" => 21, "sexe" => "Femme", "nom" => "RAKOTONDRAHASINA", "prenom" => "Gianah Muriella", "matricule" => "92739", "naissance" => "2011-08-03"],
            ["numero" => 22, "sexe" => "Femme", "nom" => "SITRAKA", "prenom" => "Ny Aina Koloina", "matricule" => "92716", "naissance" => "2011-09-25"],
            ["numero" => 23, "sexe" => "Femme", "nom" => "RAVAOARIMALALA", "prenom" => "Fanomezantsoa Sarobidy Aurelia", "matricule" => "92943", "naissance" => "2012-07-28"],
            ["numero" => 24, "sexe" => "Homme", "nom" => "RAMANANDRAITSIORY", "prenom" => "Israël", "matricule" => "92593", "naissance" => "2011-09-03"],
            ["numero" => 25, "sexe" => "Homme", "nom" => "RAKOTOARISOA", "prenom" => "Ny Mahery Fortuna", "matricule" => "92018", "naissance" => "2011-08-05"],
            ["numero" => 26, "sexe" => "Femme", "nom" => "ANDRIANOARINIAINA", "prenom" => "Mikalo Malala", "matricule" => "92122", "naissance" => "2012-06-26"],
            ["numero" => 27, "sexe" => "Homme", "nom" => "RAPHEHISON", "prenom" => "Aaron Seghan", "matricule" => "92788", "naissance" => "2008-07-31"],
            ["numero" => 28, "sexe" => "Homme", "nom" => "ANDRIAMAMPANDRY", "prenom" => "Abrahama Fahendrena", "matricule" => "92929", "naissance" => "2012-04-24"],
            ["numero" => 29, "sexe" => "Femme", "nom" => "RAKOTONIRINA", "prenom" => "Aina Fitia", "matricule" => "92114", "naissance" => "2011-06-24"],
            ["numero" => 30, "sexe" => "Femme", "nom" => "SHA", "prenom" => "Misaina Tisha Yasmine", "matricule" => "91980", "naissance" => "2011-10-06"],
            ["numero" => 31, "sexe" => "Homme", "nom" => "RAKOTOARISOA", "prenom" => "Tsanta Fitahiana", "matricule" => "91988", "naissance" => "2011-09-15"],
            ["numero" => 32, "sexe" => "Femme", "nom" => "RAKOTOARIMANANA", "prenom" => "Tinah Niaina Kévane Emanuella", "matricule" => "93193", "naissance" => "2010-04-23"],
            ["numero" => 33, "sexe" => "Homme", "nom" => "RABEARILAFY", "prenom" => "Taratra Finoana", "matricule" => "92887", "naissance" => "2012-04-08"],
            ["numero" => 34, "sexe" => "Homme", "nom" => "LALANDE", "prenom" => "Tantely", "matricule" => "92083", "naissance" => "2011-12-09"],
            ["numero" => 35, "sexe" => "Femme", "nom" => "MIALITIANA", "prenom" => "Nilainasoa", "matricule" => "93097", "naissance" => "2011-01-02"],
            ["numero" => 36, "sexe" => "Homme", "nom" => "RANAIVOJAONA", "prenom" => "Solofoniaina Aaron", "matricule" => "92039", "naissance" => "2012-02-07"],
            ["numero" => 37, "sexe" => "Femme", "nom" => "ANJARAVONIMANITRA", "prenom" => "Navalona Li Aimée", "matricule" => "92080", "naissance" => "2012-04-11"],
            ["numero" => 38, "sexe" => "Femme", "nom" => "HANITRINIAINA", "prenom" => "Antsa Fitia", "matricule" => "93107", "naissance" => "2012-03-17"],
            ["numero" => 39, "sexe" => "Homme", "nom" => "ANDRIAMIHAJATIANA", "prenom" => "Tsiaro Laurick", "matricule" => "91926", "naissance" => "2010-03-28"],
            ["numero" => 40, "sexe" => "Homme", "nom" => "RABARISON", "prenom" => "Ny Andolalaina Fitia Noah", "matricule" => "91968", "naissance" => "2011-09-27"],
            ["numero" => 41, "sexe" => "Femme", "nom" => "RAMIANDRISOA", "prenom" => "Kanto Ny Rima Milanto", "matricule" => "92942", "naissance" => "2012-06-06"],
            ["numero" => 42, "sexe" => "Femme", "nom" => "RAKOTOARISON", "prenom" => "Gabriella Harimalaza", "matricule" => "92944", "naissance" => "2010-05-17"],
            ["numero" => 43, "sexe" => "Homme", "nom" => "RANDRIAMALALA", "prenom" => "Steeve Andrew", "matricule" => "92186", "naissance" => "2011-09-28"]
        ];
        $classe3em_info = [
            'classe' => 3148,
            'niveau' => 1726
        ];
        foreach ($eleves_3em as $key => &$etudiant) {
            $eleve = $this->EtudiantModel->insert([
                'nom' => $etudiant['nom'],
                'prenom' => $etudiant['prenom'],
                'date_naissance' => $etudiant['naissance'],
                'matricule_etudiant' => $etudiant['matricule'],
                'sexe' => $etudiant['sexe']
            ]);

            if ($eleve) {
                $inscriptions[] = [
                    'numero' => $etudiant['numero'],
                    'annee_scolaire_id_annee_scolaire' => 390,
                    'niveau_id_niveau' => $classe3em_info['niveau'],
                    'classe_id_classe' => $classe3em_info['classe'],
                    "eleve_id_eleve" => $eleve['id_eleve'],
                    'is_droit_payed' => true,
                    'date_inscription' => '2025-08-10'
                ];
                $users[] = [
                    'id_role' => $role_etudiant->id_role,
                    'identifiant' => $eleve->matricule_etudiant,
                    'password' => password_hash($eleve->matricule_etudiant, PASSWORD_DEFAULT)
                ];
            }
        }

        // 1er 
        $eleve_permieres = [
            ["numero" => 1, "sexe" => "Femme", "nom" => "RAMILIARISON", "prenom" => "Lucianah", "matricule" => "93395", "naissance" => "2010-01-24"],
            ["numero" => 2, "sexe" => "Homme", "nom" => "GARINA", "prenom" => "Hassim Alvin", "matricule" => "92336", "naissance" => "2010-11-09"],
            ["numero" => 3, "sexe" => "Homme", "nom" => "RATSIMANARISOA", "prenom" => "One I Anjara", "matricule" => "93221", "naissance" => "2011-05-17"],
            ["numero" => 4, "sexe" => "Homme", "nom" => "ANDRIAMASIMANDRESY", "prenom" => "Romain Claudion", "matricule" => "93185", "naissance" => "2009-12-10"],
            ["numero" => 5, "sexe" => "Homme", "nom" => "NDRIAMBELONANDRO", "prenom" => "Noah Yvan", "matricule" => "92638", "naissance" => "2009-12-02"],
            ["numero" => 6, "sexe" => "Homme", "nom" => "ANDRIAMITSARA", "prenom" => "Ilo Fandresena", "matricule" => "93382", "naissance" => "2010-11-08"],
            ["numero" => 7, "sexe" => "Homme", "nom" => "MAHARINJATOVO", "prenom" => "Miharilafy", "matricule" => "93192", "naissance" => "2009-01-15"],
            ["numero" => 8, "sexe" => "Femme", "nom" => "RANDRIANARISON", "prenom" => "Tiffany", "matricule" => "93237", "naissance" => "2010-06-01"],
            ["numero" => 9, "sexe" => "Femme", "nom" => "RASOLONDRAIBE", "prenom" => "Henintsoa Navalona", "matricule" => "91732", "naissance" => "2009-09-09"],
            ["numero" => 10, "sexe" => "Homme", "nom" => "RANDRIANANTENAINA", "prenom" => "Jhonathan Guadagno", "matricule" => "91735", "naissance" => "2010-06-20"],
            ["numero" => 11, "sexe" => "Homme", "nom" => "RAJAOMORASATA", "prenom" => "Jeri Mifaly Fahasoavana", "matricule" => "93386", "naissance" => "2009-04-27"],
            ["numero" => 12, "sexe" => "Femme", "nom" => "RABESAHALA", "prenom" => "Tefiharilanja Iharantsoa", "matricule" => "92759", "naissance" => "2008-11-21"],
            ["numero" => 13, "sexe" => "Homme", "nom" => "MIALITIANA", "prenom" => "Lahatriniaina", "matricule" => "93098", "naissance" => "2009-03-16"],
            ["numero" => 14, "sexe" => "Femme", "nom" => "RASAMISON", "prenom" => "Fanasin'Ny Avo Carmella", "matricule" => "93184", "naissance" => "2010-11-02"],
            ["numero" => 15, "sexe" => "Homme", "nom" => "FOREIX", "prenom" => "DAN Nicolas", "matricule" => "92644", "naissance" => "2009-02-13"],
            ["numero" => 16, "sexe" => "Homme", "nom" => "RAVELOMANANTSOA", "prenom" => "Fandresena Noah", "matricule" => "92647", "naissance" => "2009-12-04"],
            ["numero" => 17, "sexe" => "Homme", "nom" => "IALISON", "prenom" => "Sitrakiniavo", "matricule" => "93069", "naissance" => "2007-12-04"],
            ["numero" => 18, "sexe" => "Homme", "nom" => "RAMAROTAFIKA", "prenom" => "Lovasoa", "matricule" => "93114", "naissance" => "2006-11-18"],
            ["numero" => 19, "sexe" => "Homme", "nom" => "RANDRIAMAMPIONONA", "prenom" => "Heriniaina Feno", "matricule" => "93224", "naissance" => "2008-03-02"],
            ["numero" => 20, "sexe" => "Femme", "nom" => "RALAIMANARIVO", "prenom" => "Aina Sarobidy", "matricule" => "92818", "naissance" => "2010-12-04"],
            ["numero" => 21, "sexe" => "Femme", "nom" => "RAFANOMEZANJANAHARY", "prenom" => "Saotrafitia Miahy", "matricule" => "92358", "naissance" => "2010-06-13"],
            ["numero" => 22, "sexe" => "Femme", "nom" => "ANDRIAHERINTSOA", "prenom" => "Rojovola Santatra", "matricule" => "93209", "naissance" => "2010-06-08"],
            ["numero" => 23, "sexe" => "Homme", "nom" => "RANDRIANARISOA", "prenom" => "Mandranto Fanaja", "matricule" => "91831", "naissance" => "2010-09-18"],
            ["numero" => 24, "sexe" => "Homme", "nom" => "MAMINIAINA", "prenom" => "Ambinintsoa Finaritra", "matricule" => "93225", "naissance" => "2009-06-12"],
            ["numero" => 25, "sexe" => "Femme", "nom" => "RAKOTOMALALA", "prenom" => "Miando Nifitia Sarobidy", "matricule" => "93108", "naissance" => "2011-02-11"],
            ["numero" => 26, "sexe" => "Femme", "nom" => "FANOMEZANTSOA", "prenom" => "Françia", "matricule" => "91749", "naissance" => "2009-10-05"],
            ["numero" => 27, "sexe" => "Femme", "nom" => "RAFANOMEZANJANAHARY", "prenom" => "Fitahiana Windina", "matricule" => "91941", "naissance" => "2009-11-01"],
            ["numero" => 28, "sexe" => "Homme", "nom" => "MAHEFASOA", "prenom" => "Miarolaza", "matricule" => "91749", "naissance" => "2009-10-05"],
            ["numero" => 29, "sexe" => "Homme", "nom" => "ANDRIAMBAONTSOA", "prenom" => "Rindra Tantely", "matricule" => "93223", "naissance" => "2008-10-23"],
            ["numero" => 30, "sexe" => "Femme", "nom" => "ANDRIAMBAONTSOA", "prenom" => "Kanto Valisoa", "matricule" => "91873", "naissance" => "2010-11-08"],
            ["numero" => 31, "sexe" => "Homme", "nom" => "ANDRIANASOLO", "prenom" => "Tiavina Ajaina", "matricule" => "92431", "naissance" => "2008-10-04"],
            ["numero" => 32, "sexe" => "Homme", "nom" => "HERIMAHATRATRA", "prenom" => "Mandrindra", "matricule" => "93238", "naissance" => "2009-05-27"]
        ];
        $premiere_info = [
            'classe' => 3153,
            'niveau' => 1728
        ];
        foreach ($eleve_permieres as $key => &$etudiant) {
            $eleve = $this->EtudiantModel->insert([
                'nom' => $etudiant['nom'],
                'prenom' => $etudiant['prenom'],
                'date_naissance' => $etudiant['naissance'],
                'matricule_etudiant' => $etudiant['matricule'],
                'sexe' => $etudiant['sexe']
            ]);

            if ($eleve) {
                $inscriptions[] = [
                    'numero' => $etudiant['numero'],
                    'annee_scolaire_id_annee_scolaire' => 390,
                    'niveau_id_niveau' => $premiere_info['niveau'],
                    'classe_id_classe' => $premiere_info['classe'],
                    "eleve_id_eleve" => $eleve['id_eleve'],
                    'is_droit_payed' => true,
                    'date_inscription' => '2025-08-10'
                ];
                $users[] = [
                    'id_role' => $role_etudiant->id_role,
                    'identifiant' => $eleve->matricule_etudiant,
                    'password' => password_hash($eleve->matricule_etudiant, PASSWORD_DEFAULT)
                ];
            }
        }



        // terminale A 
        $eleve_terminaleA = $eleves = [
            ["numero" => 1, "sexe" => "Femme", "nom" => "GODIN RAZANAJATOVO", "prenom" => "Francia", "matricule" => "93072", "naissance" => "2007-08-16"],
            ["numero" => 2, "sexe" => "Homme", "nom" => "RASOAMANANA", "prenom" => "Maminirina Anthonio", "matricule" => "92196", "naissance" => "2008-06-19"],
            ["numero" => 3, "sexe" => "Homme", "nom" => "RATIANARIJAONA", "prenom" => "Maël Iavosoa", "matricule" => "91658", "naissance" => "2009-09-25"],
            ["numero" => 4, "sexe" => "Femme", "nom" => "RAZAFINDRAVONY", "prenom" => "Mirantsoa Aina Ravaka", "matricule" => "92627", "naissance" => "2009-11-07"],
            ["numero" => 5, "sexe" => "Homme", "nom" => "ANDRIATSILAIZINA", "prenom" => "Akohaja Arona", "matricule" => "93115", "naissance" => "2010-12-12"],
            ["numero" => 6, "sexe" => "Femme", "nom" => "JOHNSON", "prenom" => "Rebecca Koloinaniaina", "matricule" => "93112", "naissance" => "2007-09-22"],
            ["numero" => 7, "sexe" => "Femme", "nom" => "ANDRIAMIHARIMANANA", "prenom" => "Rojonirina Nitah", "matricule" => "93113", "naissance" => "2010-03-22"],
            ["numero" => 8, "sexe" => "Homme", "nom" => "RAMILIARISON", "prenom" => "Steeve Ny Aina", "matricule" => "91647", "naissance" => "2003-12-20"],
            ["numero" => 9, "sexe" => "Femme", "nom" => "RAZAFINDRALAMBO", "prenom" => "Hery Ny Avo Liantsoa", "matricule" => "91686", "naissance" => "2008-12-27"],
            ["numero" => 10, "sexe" => "Homme", "nom" => "HARISON", "prenom" => "Andriamampionona Tiavina Nolhan", "matricule" => "91679", "naissance" => "2009-03-09"],
            ["numero" => 11, "sexe" => "Femme", "nom" => "RANDRIANARISOA", "prenom" => "Harilanto Nancia", "matricule" => "92192", "naissance" => "2008-11-04"],
            ["numero" => 12, "sexe" => "Femme", "nom" => "RANDRIANIRINA", "prenom" => "Benjamina Rollande", "matricule" => "91744", "naissance" => "2008-08-24"],
            ["numero" => 13, "sexe" => "Homme", "nom" => "HERINANDRIANINA", "prenom" => "Fenotiana Nilsen", "matricule" => "91711", "naissance" => "2007-09-13"],
            ["numero" => 14, "sexe" => "Femme", "nom" => "ANDRIAMAMPIONONA", "prenom" => "Finaritra Iarilaza", "matricule" => "91674", "naissance" => "2009-08-05"],
            ["numero" => 15, "sexe" => "Homme", "nom" => "RAJOELISON", "prenom" => "Ambinintsoa", "matricule" => "92925", "naissance" => "2007-12-07"],
            ["numero" => 16, "sexe" => "Femme", "nom" => "RAKOTONARIVO", "prenom" => "Taniah", "matricule" => "91695", "naissance" => "2008-03-02"],
            ["numero" => 17, "sexe" => "Femme", "nom" => "RAZAFINDRABE", "prenom" => "Hary Laina Tsara", "matricule" => "91307", "naissance" => "2008-10-09"]
        ];

        $terminaleA_info = [
            'classe' => 3155,
            'niveau' => 1729
        ];
        foreach ($eleve_terminaleA as $key => &$etudiant) {
            $eleve = $this->EtudiantModel->insert([
                'nom' => $etudiant['nom'],
                'prenom' => $etudiant['prenom'],
                'date_naissance' => $etudiant['naissance'],
                'matricule_etudiant' => $etudiant['matricule'],
                'sexe' => $etudiant['sexe']
            ]);

            if ($eleve) {
                $inscriptions[] = [
                    'numero' => $etudiant['numero'],
                    'annee_scolaire_id_annee_scolaire' => 390,
                    'niveau_id_niveau' => $terminaleA_info['niveau'],
                    'classe_id_classe' => $terminaleA_info['classe'],
                    "eleve_id_eleve" => $eleve['id_eleve'],
                    'is_droit_payed' => true,
                    'date_inscription' => '2025-08-10'
                ];
                $users[] = [
                    'id_role' => $role_etudiant->id_role,
                    'identifiant' => $eleve->matricule_etudiant,
                    'password' => password_hash($eleve->matricule_etudiant, PASSWORD_DEFAULT)
                ];
            }
        }

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
