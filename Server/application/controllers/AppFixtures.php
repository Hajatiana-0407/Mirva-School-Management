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
        $this->load->model('MatiereClasseProfModel', 'assignation');
        $this->load->helper('matricule');

        $this->faker = \Faker\Factory::create('fr_FR');
    }


    /**
     * Configurations general
     *
     * @return void
     */
    public function loadConfigurations($clean = false)
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
            'description' => 'Lycée MIRVA Alarobia Amboniloha Présco Primaires Secondaires',
            "prefix" => '',
            'facebook' => 'https://www.facebook.com/profile.php?id=61575911525721',
            'twitter' => '',
            'instagram' => '',
            'linkedin' => '',
            'youtube' => ''
        ]);


        // ? ===================== Annee scolaire  ===================== //
        $annee_scolaires = [];
        for ($i = 0; $i < 2; $i++) {
            $annee_scolaires[] = [
                'nom' => 'Année Scolaire ' . ($i + 1),
                'date_debut' => $this->faker->date(),
                'date_fin' => $this->faker->date(),
                'description' => $this->faker->sentence(6),
                'created_at' => date('Y-m-d')
            ];
        }
        $this->model->insertBatchFixtures($annee_scolaires, 'annee_scolaire');

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
        foreach ($matieresListe as &$mat) {
            $mat['couleur'] = $this->faker->hexColor;
        }
        $this->model->insertBatchFixtures($matieresListe, 'matiere');


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
        $niveauFixtures = [];
        foreach ($niveaux as $cycle => $classes) {
            foreach ($classes as $classe) {
                $niveauFixtures[] = [
                    'niveau' => $classe,
                    'cycle' => $cycle,
                    'description' => "Classe de $classe du cycle $cycle",
                    'created_at' => date('Y-m-d H:i:s')
                ];
            }
        }
        $this->model->insertBatchFixtures($niveauFixtures, 'niveau');

        // ? ===================== Matieres et Niveau ===================== //
        $niveaux = $this->model->getIds('niveau', 'id_niveau');
        $matieres = $this->model->getIds('matiere', 'id_matiere');

        // Matiere et niveau 
        $matiere_niveaux = [];
        foreach ($matieres as $matiere) {
            // Assigner la matière à TOUS les niveaux
            foreach ($niveaux as $niveau) {
                $matiere_niveaux[] = [
                    'matiere_id_matiere' => $matiere,
                    'niveau_id_niveau' => $niveau,
                    'coefficient' => $this->faker->numberBetween(1, 5),
                ];
            }
        }
        $this->model->insertBatchFixtures($matiere_niveaux, 'matiere_niveau');

        // ? ===================== Classes ===================== //
        $sections = ['A', 'B', 'C', 'D', 'E', 'F'];
        $this->load->database();
        $niveauxData = $this->db->select('id_niveau, niveau')
            ->from('niveau')
            ->get()
            ->result_array();

        $classes = [];
        foreach ($niveauxData as $niveau) {
            $niveauId = $niveau['id_niveau'];
            $nomNiveau = $niveau['niveau'];
            $nbClasses = rand(2, 3);

            for ($i = 0; $i < $nbClasses; $i++) {
                $section = $sections[$i] ?? $this->faker->randomElement($sections);
                $classes[] = [
                    'denomination' => $nomNiveau . ' ' . $section,
                    'niveau_id_niveau' => $niveauId,
                    'created_at' => date('Y-m-d H:i:s')
                ];
            }
        }
        $this->model->insertBatchFixtures($classes, 'classe');


        // ? ===================== Frais de scolarité  ===================== //
        $frais = [];
        foreach ($niveaux as $niveau) {
            $frais[] = [
                'montant' => $this->faker->numberBetween(50000, 100000),
                'niveau_id_niveau' => $niveau,
                'created_at' => date('Y-m-d H:i:s')
            ];
        }
        $this->model->insertBatchFixtures($frais, 'droit_inscription');

        $ecolages = [];
        foreach ($niveaux as $niveau) {
            $ecolages[] = [
                'montant' => $this->faker->numberBetween(25000, 80000),
                'niveau_id_niveau' => $niveau,
                'created_at' => date('Y-m-d H:i:s')
            ];
        }
        $this->model->insertBatchFixtures($ecolages, 'ecolage');

    }


    /**
     * Fixtures pour les eleves et parents 
     *
     * @return void
     */
    public function LoadEleveParent($clean = false)
    {
        // Vider les tables
        $this->model->emptyDb([
            'eleve',
            'parents',
            'parents_eleves',
            'inscription',
        ]);

        if ($clean) {
            return;
        }

        // ? ===================== Eleves  ===================== //
        $lastStudent = $this->EtudiantModel->findLatest();
        $lastStudentMatricule = $lastStudent->matricule_etudiant ?? '';

        $elevesToInsert = [];
        for ($i = 0; $i < 10; $i++) {
            $matriculeStudent = generateMatricule(STUDENT_PRIFIX, $lastStudentMatricule);

            $elevesToInsert[] = [
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
                'email' => $this->faker->email(),
            ];

            $lastStudentMatricule = $matriculeStudent;
        }

        // Insert tous les élèves d'un coup
        $this->model->insertBatchFixtures($elevesToInsert, 'eleve');


        // Récupérer les IDs réellement créés
        $eleves = $this->model->getIds('eleve', 'id_eleve');


        // ? ===================== Parents ===================== //

        $parentsToInsert = [];
        $parentsElevesToInsert = [];

        foreach ($eleves as $eleve) {
            $nbParents = rand(1, 3);

            for ($i = 0; $i < $nbParents; $i++) {

                // Préparer un parent
                $parentsToInsert[] = [
                    'prenom' => $this->faker->firstName,
                    'nom' => $this->faker->lastName,
                    'telephone' => $this->faker->phoneNumber,
                    'email' => $this->faker->safeEmail,
                    'adresse' => $this->faker->address,
                    'profession' => $this->faker->jobTitle,
                    'employeur' => $this->faker->company,
                    'telephone_travail' => $this->faker->phoneNumber,
                    'contact_urgence' => $this->faker->boolean(30)
                ];

                // Le lien sera rempli après avoir les IDs réels
            }
        }

        // Insert batch parents
        $this->model->insertBatchFixtures($parentsToInsert, 'parents');

        // Récupérer les IDs parents créés
        $parents = $this->model->getIds('parents', 'id_parent');


        // Maintenant on crée les liens élèves ↔ parents
        $index = 0;
        foreach ($eleves as $eleve) {
            $nbParents = rand(1, 3);

            for ($i = 0; $i < $nbParents; $i++) {
                $parentsElevesToInsert[] = [
                    'eleve_id_eleve' => $eleve,
                    'parent_id_parent' => $parents[$index],
                    'type' => $this->faker->randomElement(['père', 'mère', 'tuteur'])
                ];
                $index++;
            }
        }

        // Insert batch parents_eleves
        $this->model->insertBatchFixtures($parentsElevesToInsert, 'parents_eleves');


        // ? ===================== Inscription ===================== //

        $classes = $this->model->getIds('classe', 'id_classe');
        $annees = $this->model->getIds('annee_scolaire', 'id_annee_scolaire');

        $inscriptionsToInsert = [];

        for ($i = 0; $i < 5; $i++) {
            $inscriptionsToInsert[] = [
                'date_inscription' => $this->faker->date(),
                'classe_id_classe' => $this->faker->randomElement($classes),
                'annee_scolaire_id_annee_scolaire' => $this->faker->randomElement($annees),
                'eleve_id_eleve' => $this->faker->randomElement($eleves),
                'ancienne_ecole' => $this->faker->company(),
                'is_droit_payed' => $this->faker->randomElement(['oui', 'non']),
                'created_at' => date('Y-m-d H:i:s'),
            ];
        }

        $this->model->insertBatchFixtures($inscriptionsToInsert, 'inscription');
    }


    /**
     * Fixtures pour les personnels 
     *
     * @return void
     */
    public function loadPersonnel($clean = false)
    {
        // Vider les tables (dans l’ordre inverse des dépendances)
        $this->model->emptyDb([
            'type_personnel',
            'classe_proffesseur_matiere',
            'personnel',
        ]);

        if ($clean)
            return;

        // ===================== Type du personnel ===================== //
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

        // Préparation batch type_personnel
        $batchTypes = [];
        foreach ($type_personnels as $type) {
            $batchTypes[] = [
                'type' => $type,
                'description' => $this->faker->sentence(6),
            ];
        }

        // ✨ Insert en batch
        $this->model->insertBatchFixtures($batchTypes, 'type_personnel');


        // ===================== Personnel ===================== //
        $types = $this->model->getIds('type_personnel', 'id_type_personnel');

        $lasted = $this->personnelModel->findLatest();
        $lastMatricule = $lasted && $lasted->matricule_personnel
            ? $lasted->matricule_personnel
            : '';

        $employes = [];

        // ---- 20 employés aléatoires ----
        for ($i = 0; $i < 20; $i++) {
            $matricule = generateMatricule(EMPLOYEE_PREFIX, $lastMatricule);

            $employes[] = [
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
                'status' => $this->faker->randomElement(['Actif', 'Suspendu', 'Démissionnaire']),
                'numero_cin' => $this->faker->randomNumber(),
                'nationalite' => $this->faker->country(),
                'type_contrat' => $this->faker->randomElement(['CDD', 'CDI', 'Stagiaire']),
                'specialisation' => $this->faker->jobTitle(),
                'certification' => $this->faker->sentence(),
                'date_embauche' => $this->faker->date(),
                'created_at' => date('Y-m-d H:i:s'),

                'urgence_nom' => $this->faker->name(),
                'urgence_lien' => $this->faker->word(),
                'urgence_tel' => $this->faker->phoneNumber(),
                'urgence_email' => $this->faker->email()
            ];

            $lastMatricule = $matricule;
        }

        // ---- 10 enseignants ----
        for ($i = 0; $i < 10; $i++) {

            $matricule = generateMatricule(EMPLOYEE_PREFIX, $lastMatricule);

            $employes[] = [
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
                'id_type_personnel' => $types[0], // Enseignant
                'salaire_base' => $this->faker->numberBetween(200000, 800000),
                'status' => $this->faker->randomElement(['Actif', 'Suspendu', 'Démissionnaire']),
                'numero_cin' => $this->faker->randomNumber(),
                'nationalite' => $this->faker->country(),
                'type_contrat' => $this->faker->randomElement(['CDD', 'CDI', 'Stagiaire']),
                'specialisation' => $this->faker->jobTitle(),
                'certification' => $this->faker->sentence(),
                'date_embauche' => $this->faker->date(),
                'created_at' => date('Y-m-d H:i:s'),

                'urgence_nom' => $this->faker->name(),
                'urgence_lien' => $this->faker->word(),
                'urgence_tel' => $this->faker->phoneNumber(),
                'urgence_email' => $this->faker->email()
            ];

            $lastMatricule = $matricule;
        }

        // ✨ INSERT BATCH
        $this->model->insertBatchFixtures($employes, 'personnel');


        // ===================== Cours ===================== //
        $professeurs = $this->model->getAllIdTeacher();
        $matieres = $this->model->getIds('matiere', 'id_matiere');
        $classes = $this->model->getIds('classe', 'id_classe');

        $batchCours = [];

        foreach ($classes as $classe) {

            $selectedMatieres = $this->faker->randomElements($matieres, 10);

            foreach ($selectedMatieres as $matiere) {

                $prof = $this->faker->randomElement($professeurs);

                // éviter les doublons
                $exists = $this->db->where('classe_id_classe', $classe)
                    ->where('professeur_id_professeur', $prof)
                    ->where('matiere_id_matiere', $matiere)
                    ->get('classe_proffesseur_matiere')
                    ->num_rows() > 0;

                if (!$exists) {
                    $batchCours[] = [
                        'classe_id_classe' => $classe,
                        'professeur_id_professeur' => $prof,
                        'matiere_id_matiere' => $matiere,
                        'heure_semaine' => $this->faker->numberBetween(1, 10)
                    ];
                }
            }
        }

        // ✨ Insert batch cours
        if (!empty($batchCours)) {
            $this->model->insertBatchFixtures($batchCours, 'classe_proffesseur_matiere');
        }
    }



    /**
     * Fixtures pour les roles permission
     *
     * @param boolean $clean
     * @return void
     */
    public function loadRoles($clean = false)
    {
        // On vide les tables dans le bon ordre
        $this->model->emptyDb([
            'modules',
            'roles',
            'role_permissions'
        ]);

        if ($clean) {
            return; // juste nettoyage
        }

        // ===================== ROLES ===================== //
        $roles = [
            [
                'nom' => 'Administrateur',
                'identification' => 'admin',
                'description' => 'Administrateur du système',
                'is_restrict' => true,
                'couleur' => $this->faker->hexColor,
            ],
            [
                'nom' => 'Enseignant',
                'identification' => 'teacher',
                'description' => 'Professeur pouvant gérer ses classes, notes et présences',
                'is_restrict' => true,
                'couleur' => $this->faker->hexColor,
            ],
            [
                'nom' => 'Étudiant',
                'identification' => 'student',
                'description' => 'Élève pouvant consulter ses notes, devoirs et emplois du temps',
                'is_restrict' => true,
                'couleur' => $this->faker->hexColor,
            ],
            [
                'nom' => 'Parent',
                'identification' => 'parent',
                'description' => 'Parent d’élève pouvant consulter les résultats et paiements',
                'is_restrict' => true,
                'couleur' => $this->faker->hexColor,
            ],
        ];

        $this->model->insertBatchFixtures($roles, "roles");


        // ===================== MODULES ===================== //
        $modules = [
            ['nom' => 'dashboard', 'label' => 'Tableau de bord', 'description' => 'Tableau de bord général de la plateforme', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'registration', 'label' => 'Inscriptions', 'description' => 'Gestion des inscriptions des nouveaux élèves', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'students', 'label' => 'Élèves', 'description' => 'Gestion des informations et dossiers des élèves', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'schedule', 'label' => 'Emploi du temps', 'description' => 'Organisation et consultation des emplois du temps', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'attendance', 'label' => 'Présences', 'description' => 'Suivi des présences et absences des élèves', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'exams', 'label' => 'Examens', 'description' => 'Gestion des examens, notes et bulletins', 'is_for_all' => false, 'is_section' => false],

            // Leçons / Exercices
            ['nom' => 'course', 'label' => 'Cours', 'description' => 'Module principal pour la gestion des leçons et exercices', 'is_for_all' => false, 'is_section' => true],
            ['nom' => 'lessons', 'label' => 'Leçons', 'description' => 'Création et consultation des leçons', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'exercices', 'label' => 'Exercices', 'description' => 'Création et gestion des exercices pour les élèves', 'is_for_all' => false, 'is_section' => false],

            // Administration
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

            // Paramètre
            ['nom' => 'general-settings', 'label' => 'Paramètres généraux', 'description' => 'Configuration générale du système', 'is_for_all' => false, 'is_section' => true],
            ['nom' => 'school-settings', 'label' => 'Paramètres de l’établissement', 'description' => 'Informations et configuration de l’établissement', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'roles-settings', 'label' => 'Rôles et utilisateurs', 'description' => 'Gestion des rôles et permissions', 'is_for_all' => false, 'is_section' => false],
            ['nom' => 'website-settings', 'label' => 'Paramètres du site', 'description' => 'Configuration du site (nom, logo, contacts)', 'is_for_all' => false, 'is_section' => true],
            ['nom' => 'homepage-settings', 'label' => 'Page d’accueil', 'description' => 'Personnalisation de la page d’accueil', 'is_for_all' => false, 'is_section' => false],
        ];

        $this->model->insertBatchFixtures($modules, 'modules');


        // ===================== ROLES PERMISSIONS ===================== //
        $modules_id = $this->model->getIds('modules', 'id_module');
        $roles = $this->model->getAllTable('roles');

        $roles_permissions = [];

        foreach ($roles as $role) {
            foreach ($modules_id as $module) {

                // valeurs random
                $permission = [
                    'id_role' => $role['id_role'],
                    'id_module' => $module,
                    'can_read' => (bool) random_int(0, 1),
                    'can_create' => (bool) random_int(0, 1),
                    'can_update' => (bool) random_int(0, 1),
                    'can_delete' => (bool) random_int(0, 1),
                ];

                // Administrateur = full access
                if ($role['nom'] === 'Administrateur') {
                    $permission['can_read'] = true;
                    $permission['can_create'] = true;
                    $permission['can_update'] = true;
                    $permission['can_delete'] = true;
                }

                $roles_permissions[] = $permission;
            }
        }

        // insertion en une seule fois
        $this->model->insertBatchFixtures($roles_permissions, 'role_permissions');
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
        $personnels_id = $this->model->getAllIdTeacher();
        $eleves_id = $this->model->getIds('eleve', 'id_eleve');
        $parent_id = $this->model->getIds('parents', 'id_parent');


        $user_relations = [$personnels_id, $eleves_id, $parent_id];

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
    public function loadLeconExercice($clean = false)
{
    // Vider les tables (dans l’ordre inverse des dépendances)
    $this->model->emptyDb([
        'lecon',
        'exercice',
    ]);

    if ($clean) {
        return; // Supprime uniquement les données
    }

    $teachersId = $this->model->getAllIdTeacher();

    // Helpers
    $this->load->helper(['url', 'text']);

    // Tableau global pour toutes les leçons
    $allLecons = [];
    // Tableau global pour tous les exercices
    $allExercices = [];

    foreach ($teachersId as $teacherId) {

        $assignations = $this->model->getAssignationByTeacher($teacherId);

        foreach ($assignations as $assignation) {

            // ----- Génération des leçons -----
            $titreLecon = $this->faker->sentence(6);
            $slugLecon = url_title(convert_accented_characters($titreLecon . ' ' . $teacherId), 'dash', TRUE);

            $allLecons[] = [
                'titre' => $titreLecon,
                'slug' => $slugLecon,
                'description' => $this->faker->paragraph(3),
                'contenu' => $this->faker->paragraphs(5, true),
                'fichier_support' => $this->faker->optional()->fileExtension(),
                'ficher_principale' => $this->faker->url,
                'created_at' => $this->faker->dateTimeBetween('-1 year', 'now')->format('Y-m-d H:i:s'),

                'id_prof' => $assignation['id_prof'],
                'id_matiere' => $assignation['id_matiere'],
                'id_niveau' => $assignation['id_niveau']
            ];

            // ----- Génération des exercices -----
            $titreEx = $this->faker->sentence(6);
            $slugEx = url_title(convert_accented_characters($titreEx . ' ' . $teacherId), 'dash', TRUE);

            $allExercices[] = [
                'titre' => $titreEx,
                'slug' => $slugEx,
                'description' => $this->faker->paragraph(3),
                'contenu' => $this->faker->paragraphs(5, true),
                'fichier_support' => $this->faker->optional()->fileExtension(),
                'ficher_principale' => $this->faker->url,
                'created_at' => $this->faker->dateTimeBetween('-1 year', 'now')->format('Y-m-d H:i:s'),

                'id_prof' => $assignation['id_prof'],
                'id_matiere' => $assignation['id_matiere'],
                'id_niveau' => $assignation['id_niveau']
            ];
        }
    }

    // Insertions en batch
    if (!empty($allLecons)) {
        $this->model->insertBatchFixtures($allLecons, 'lecon');
    }

    if (!empty($allExercices)) {
        $this->model->insertBatchFixtures($allExercices, 'exercice');
    }
}


    public function loadEmploiDuTemps($clean = false)
    {
        // 1. Vider la table
        $this->model->emptyDb(['emploi_du_temps']);

        if ($clean) {
            return;
        }

        // Année scolaire active
        $anneeScolaireId = $this->model->findLatest('annee_scolaire');
        $classes = $this->model->getIds('classe', 'id_classe');

        if (empty($anneeScolaireId) || empty($classes)) {
            return;
        }

        // Jours disponibles (Lun → Ven)
        $jours = [1, 2, 3, 4, 5];

        $emploiDuTemps = [];

        // Tableaux pour éviter les conflits
        $planningClasse = [];
        $planningProfesseur = [];
        $planningSalle = [];

        foreach ($jours as $jour) {
            foreach (HEUREINDEX as $indexHoraire => $horaire) {

                foreach ($classes as $classe) {
                    // Récupérer les assignations de la classe
                    $assignations = $this->assignation->findAllByICdlasse($classe);

                    if (empty($assignations)) {
                        continue;
                    }

                    // 🟦 Mélanger les assignations une fois par jour et classe
                    if (!isset($assignationsShuffled[$classe][$jour])) {
                        $assignationsShuffled[$classe][$jour] = $assignations;
                        shuffle($assignationsShuffled[$classe][$jour]);
                    }

                    $list = $assignationsShuffled[$classe][$jour];
                    $assignationCount = count($list);

                    // Sélection de la matière (rotation)
                    $assignation = $list[$indexHoraire % $assignationCount];
                    $professeurId = $assignation['professeur_id_professeur'];

                    // Générer une salle aléatoire
                    $salle = "Salle " . rand(1, 25);

                    // Vérifier conflits
                    if (
                        isset($planningClasse[$classe][$jour][$horaire]) ||
                        isset($planningProfesseur[$professeurId][$jour][$horaire]) ||
                        isset($planningSalle[$salle][$jour][$horaire])
                    ) {
                        continue;
                    }

                    // Ajouter créneau
                    $emploiDuTemps[] = [
                        'assignation_id' => $assignation['id_assignation'],
                        'jour_id' => $jour,
                        'heure_debut' => $horaire,
                        'salle' => $salle,
                        'annee_scolaire_id' => $anneeScolaireId['id_annee_scolaire'],
                        'heure_index' => $indexHoraire
                    ];

                    // Marquer occupé
                    $planningClasse[$classe][$jour][$horaire] = true;
                    $planningProfesseur[$professeurId][$jour][$horaire] = true;
                    $planningSalle[$salle][$jour][$horaire] = true;
                }
            }
        }

        // Insertion
        if (!empty($emploiDuTemps)) {
            $this->model->insertBatchFixtures($emploiDuTemps, 'emploi_du_temps');
            echo count($emploiDuTemps) . ' créneaux générés pour ' . count($classes) . ' classes' . PHP_EOL;
        }
    }


    public function registration($clean = false)
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
            ["numero" => 1, "sexe" => "Femme", "nom" => "ANDRIANJATOVO", "prenom" => "Harijaona Ainamamy Tanteraka", "matricule" => "91.854", "naissance" => "2010-12-31", "note" => ""],
            ["numero" => 2, "sexe" => "Femme", "nom" => "ANDRIAMIFIDISOA", "prenom" => "Karila Megane", "matricule" => "92.441", "naissance" => "2011-01-12", "note" => ""],
            ["numero" => 3, "sexe" => "Femme", "nom" => "RANDRIAMANJATO", "prenom" => "To'Ahy Vanielle", "matricule" => "91.951", "naissance" => "2012-01-18", "note" => "4è"],
            ["numero" => 4, "sexe" => "Femme", "nom" => "IALINIRINA", "prenom" => "Fehiazy Marcia", "matricule" => "91.952", "naissance" => "2011-11-24", "note" => ""],
            ["numero" => 5, "sexe" => "Homme", "nom" => "RAKOTONDRAHOVA", "prenom" => "Dilan Maté Maherinihasina", "matricule" => "93.387", "naissance" => "2012-04-17", "note" => "Nouv"],
            ["numero" => 6, "sexe" => "Femme", "nom" => "RAMBOAVOLANIRINA HARIVELO", "prenom" => "Ny Avo", "matricule" => "91.839", "naissance" => "2010-08-10", "note" => ""],
            ["numero" => 7, "sexe" => "Femme", "nom" => "RAHARINJATOVO", "prenom" => "Mitia", "matricule" => "91.905", "naissance" => "2010-04-16", "note" => "4è"],
            ["numero" => 8, "sexe" => "", "nom" => "NOMENJANAHARY", "prenom" => "Rojo Nantenaina", "matricule" => "93.384", "naissance" => "2010-11-26", "note" => "Nouv"],
            ["numero" => 9, "sexe" => "Homme", "nom" => "ANDRIANANTENAINA", "prenom" => "Dimbinavalona", "matricule" => "93.388", "naissance" => "2009-10-23", "note" => "Nouv"],
            ["numero" => 10, "sexe" => "Femme", "nom" => "RAJAONARIVONY", "prenom" => "Alicia", "matricule" => "93.385", "naissance" => "2012-07-12", "note" => ""],
            ["numero" => 11, "sexe" => "", "nom" => "RAJAONARISON", "prenom" => "Herimaminjanahary Idealisoa", "matricule" => "93.389", "naissance" => "2011-07-04", "note" => "Nouv"],
            ["numero" => 12, "sexe" => "Homme", "nom" => "ANDRIANANTENAINA", "prenom" => "Mandresy Johan", "matricule" => "91.997", "naissance" => "2011-07-18", "note" => ""],
            ["numero" => 13, "sexe" => "Femme", "nom" => "RAMILIARISON", "prenom" => "Nirimamijely Christella Myrrhia", "matricule" => "93.150", "naissance" => "2011-09-04", "note" => "4è"],
            ["numero" => 14, "sexe" => "Homme", "nom" => "TIAMANANDAZA", "prenom" => "Ismaël Fabrice", "matricule" => "91.743", "naissance" => "2009-08-26", "note" => ""],
            ["numero" => 15, "sexe" => "Homme", "nom" => "HAJARIVONJILALINA", "prenom" => "Nirina Nicolas", "matricule" => "92.637", "naissance" => "2009-05-23", "note" => ""],
            ["numero" => 16, "sexe" => "Homme", "nom" => "RASAMOELINA", "prenom" => "Arena", "matricule" => "92.104", "naissance" => "2010-11-18", "note" => ""],
            ["numero" => 17, "sexe" => "Femme", "nom" => "NOMENJANANAHARY", "prenom" => "Fitia", "matricule" => "93.390", "naissance" => "2010-04-21", "note" => "Nouv"],
            ["numero" => 18, "sexe" => "Homme", "nom" => "RAKOTONIMANGA", "prenom" => "Mahenina", "matricule" => "92.503", "naissance" => "2011-12-02", "note" => ""],
            ["numero" => 19, "sexe" => "Femme", "nom" => "VEROARISOA", "prenom" => "Daniela Guadagno", "matricule" => "91.986", "naissance" => "2011-02-26", "note" => ""],
            ["numero" => 20, "sexe" => "Homme", "nom" => "RAJONIKARA", "prenom" => "Irohaj", "matricule" => "92.922", "naissance" => "2010-09-24", "note" => ""],
            ["numero" => 21, "sexe" => "Homme", "nom" => "ANDRIAMASINORO", "prenom" => "Joie Djibril", "matricule" => "93.391", "naissance" => "2011-09-13", "note" => "Nouv"],
            ["numero" => 22, "sexe" => "Homme", "nom" => "RAMAROSON", "prenom" => "Heriniaina Onja Charles", "matricule" => "92.806", "naissance" => "2010-09-24", "note" => ""],
            ["numero" => 23, "sexe" => "Femme", "nom" => "ANDRIANOKOLOINA", "prenom" => "Miangalisoa Fandresena Fitia", "matricule" => "92.003", "naissance" => "2011-09-29", "note" => ""],
            ["numero" => 24, "sexe" => "Femme", "nom" => "RASOLOARIJAO", "prenom" => "Ny Antsa Ravo", "matricule" => "93.234", "naissance" => "2010-12-11", "note" => ""],
            ["numero" => 25, "sexe" => "Femme", "nom" => "RAMANANKIERANA", "prenom" => "Liantsoa", "matricule" => "92.736", "naissance" => "2011-04-04", "note" => ""],
            ["numero" => 26, "sexe" => "Femme", "nom" => "RAZAFIMANDIMBY", "prenom" => "Hasina Andrianina Fitia", "matricule" => "92.004", "naissance" => "2011-05-02", "note" => ""],
            ["numero" => 27, "sexe" => "Femme", "nom" => "RAKOTOMALALA", "prenom" => "Irintsoa Famenomamy", "matricule" => "92.182", "naissance" => "2011-01-01", "note" => ""],
            ["numero" => 28, "sexe" => "Femme", "nom" => "JEAN ARIVAHY", "prenom" => "Harena Savanah", "matricule" => "91.891", "naissance" => "2011-05-04", "note" => ""],
            ["numero" => 29, "sexe" => "Homme", "nom" => "RAKOTONOMENJANAHARY", "prenom" => "Toky Ny Avo", "matricule" => "92.645", "naissance" => "2010-06-29", "note" => ""],
            ["numero" => 30, "sexe" => "Femme", "nom" => "ANDRIAHERINTSOA", "prenom" => "Kanto Narindra", "matricule" => "93.396", "naissance" => "2012-03-28", "note" => "Nouv"],
            ["numero" => 31, "sexe" => "Homme", "nom" => "ANJARATIANA", "prenom" => "Nomenjanahary Nasoavina Anthonio", "matricule" => "93.377", "naissance" => "2012-03-22", "note" => "Nouv"],
            ["numero" => 32, "sexe" => "Femme", "nom" => "RABENARISON", "prenom" => "Princia", "matricule" => "92.356", "naissance" => "2010-02-25", "note" => ""],
            ["numero" => 33, "sexe" => "Homme", "nom" => "ANDRIAMPARANY", "prenom" => "Nathan", "matricule" => "91.956", "naissance" => "2010-08-10", "note" => ""],
            ["numero" => 34, "sexe" => "Femme", "nom" => "RANDRIANASOLO", "prenom" => "Haingovola Zayonne", "matricule" => "92.945", "naissance" => "2011-06-03", "note" => ""],
            ["numero" => 35, "sexe" => "Homme", "nom" => "RANAIVOARISON", "prenom" => "Heriniaina Christian", "matricule" => "91.858", "naissance" => "2010-05-06", "note" => ""],
            ["numero" => 36, "sexe" => "Femme", "nom" => "RAZAFINDRABE", "prenom" => "Mikanto Rarintsoa", "matricule" => "92.728", "naissance" => "2010-11-04", "note" => ""],
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
                    'identifiant' => $eleve['matricule_etudiant'],
                    'password' => password_hash('password-' . $eleve['matricule_etudiant'], PASSWORD_DEFAULT),
                    'id_eleve' => $eleve['id_eleve']
                ];
            }
        }

        // 3eme 
        $eleves_3em = [
            ["numero" => 1, "sexe" => "Femme", "nom" => "MANDIMBISON", "prenom" => "Ny Lova Estelle", "matricule" => "92.042", "naissance" => "2011-12-12"],
            ["numero" => 2, "sexe" => "Homme", "nom" => "RANDRIANALIMANANA", "prenom" => "Fanilo", "matricule" => "91.950", "naissance" => "2011-06-29"],
            ["numero" => 3, "sexe" => "Homme", "nom" => "ANJARANANTENAINA", "prenom" => "ZAVA Stanley Iadanantsoa", "matricule" => "92.360", "naissance" => "2010-08-13"],
            ["numero" => 4, "sexe" => "Homme", "nom" => "RANDRIAMAHERY", "prenom" => "Iloniaina Johary Kael", "matricule" => "92.650", "naissance" => "2010-11-03"],
            ["numero" => 5, "sexe" => "Femme", "nom" => "RAKOTOSON", "prenom" => "Hosea", "matricule" => "92.121", "naissance" => "2012-04-13"],
            ["numero" => 6, "sexe" => "Homme", "nom" => "RAJAONARIVO", "prenom" => "Toaviniaina", "matricule" => "92.915", "naissance" => "2012-04-28"],
            ["numero" => 7, "sexe" => "Femme", "nom" => "ANDRIANIAINA", "prenom" => "Safidy Irinah", "matricule" => "92.205", "naissance" => "2012-11-27"],
            ["numero" => 8, "sexe" => "Homme", "nom" => "RASOLOFOHARISON", "prenom" => "Matthieu Antenaina", "matricule" => "93.229", "naissance" => "2011-05-27"],
            ["numero" => 9, "sexe" => "Homme", "nom" => "RANDRIAMANANA", "prenom" => "Aiko Notahiana", "matricule" => "92.233", "naissance" => "2012-02-01"],
            ["numero" => 10, "sexe" => "Femme", "nom" => "VONJY VELONOMENA", "prenom" => "Aina", "matricule" => "92.108", "naissance" => "2012-08-11"],
            ["numero" => 11, "sexe" => "Femme", "nom" => "RAHARINJATOVO", "prenom" => "Mirindra", "matricule" => "92.092", "naissance" => "2011-09-24"],
            ["numero" => 12, "sexe" => "Femme", "nom" => "RAMAROJAONA", "prenom" => "Stheicy Raphaëlla", "matricule" => "93.232", "naissance" => "2012-11-24"],
            ["numero" => 13, "sexe" => "Homme", "nom" => "RAMAROSON", "prenom" => "Aina Fanantenana", "matricule" => "91.807", "naissance" => "2010-07-04"],
            ["numero" => 14, "sexe" => "Femme", "nom" => "RAKOTOARIMANANA", "prenom" => "Henintsoa Miah Adriana", "matricule" => "91.954", "naissance" => "2012-08-05"],
            ["numero" => 15, "sexe" => "Femme", "nom" => "RALAMBONIRINA", "prenom" => "Aina Mitia", "matricule" => "92.062", "naissance" => "2012-05-07"],
            ["numero" => 16, "sexe" => "Homme", "nom" => "ANDRIANOMENJANAHARY", "prenom" => "Todisoa Ely", "matricule" => "91.942", "naissance" => "2011-05-18"],
            ["numero" => 17, "sexe" => "Femme", "nom" => "ANDRIAMPARA", "prenom" => "Miantsa Fitia", "matricule" => "92.134", "naissance" => "2013-05-05"],
            ["numero" => 18, "sexe" => "Femme", "nom" => "MIANDRIHARISON", "prenom" => "Maelle", "matricule" => "92.109", "naissance" => "2013-01-04"],
            ["numero" => 19, "sexe" => "Femme", "nom" => "RASOANAIVO", "prenom" => "Grace Iriana Ariel", "matricule" => "92.259", "naissance" => "2011-06-27"],
            ["numero" => 20, "sexe" => "Homme", "nom" => "RAKOTONIAINA", "prenom" => "Nambinintsoa Myranto", "matricule" => "92.613", "naissance" => "2011-08-04"],
            ["numero" => 21, "sexe" => "Femme", "nom" => "RAKOTONDRAHASINA", "prenom" => "Gianah Muriella", "matricule" => "92.739", "naissance" => "2011-08-03"],
            ["numero" => 22, "sexe" => "Femme", "nom" => "SITRAKA", "prenom" => "Ny Aina Koloina", "matricule" => "92.716", "naissance" => "2011-09-25"],
            ["numero" => 23, "sexe" => "Femme", "nom" => "RAVAOARIMALALA", "prenom" => "Fanomezantsoa Sarobidy Aurelia", "matricule" => "92.943", "naissance" => "2012-07-28"],
            ["numero" => 24, "sexe" => "Homme", "nom" => "RAMANANDRAITSIORY", "prenom" => "Israël", "matricule" => "92.593", "naissance" => "2011-09-03"],
            ["numero" => 25, "sexe" => "Homme", "nom" => "RAKOTOARISOA", "prenom" => "Ny Mahery Fortuna", "matricule" => "92.018", "naissance" => "2011-08-05"],
            ["numero" => 26, "sexe" => "Femme", "nom" => "ANDRIANOARINIAINA", "prenom" => "Mikalo Malala", "matricule" => "92.122", "naissance" => "2012-06-26"],
            ["numero" => 27, "sexe" => "Homme", "nom" => "RAPHEHISON", "prenom" => "Aaron Seghan", "matricule" => "92.788", "naissance" => "2008-07-31"],
            ["numero" => 28, "sexe" => "Homme", "nom" => "ANDRIAMAMPANDRY", "prenom" => "Abrahama Fahendrena", "matricule" => "92.929", "naissance" => "2012-04-24"],
            ["numero" => 29, "sexe" => "Femme", "nom" => "RAKOTONIRINA", "prenom" => "Aina Fitia", "matricule" => "92.114", "naissance" => "2011-06-24"],
            ["numero" => 30, "sexe" => "Femme", "nom" => "SHA", "prenom" => "Misaina Tisha Yasmine", "matricule" => "91.980", "naissance" => "2011-10-06"],
            ["numero" => 31, "sexe" => "Homme", "nom" => "RAKOTOARISOA", "prenom" => "Tsanta Fitahiana", "matricule" => "91.988", "naissance" => "2011-09-15"],
            ["numero" => 32, "sexe" => "Femme", "nom" => "RAKOTOARIMANANA", "prenom" => "Tinah Niaina Kévane Emanuella", "matricule" => "93.193", "naissance" => "2010-04-23"],
            ["numero" => 33, "sexe" => "Homme", "nom" => "RABEARILAFY", "prenom" => "Taratra Finoana", "matricule" => "92.887", "naissance" => "2012-04-08"],
            ["numero" => 34, "sexe" => "Homme", "nom" => "LALANDE", "prenom" => "Tantely", "matricule" => "92.083", "naissance" => "2011-12-09"],
            ["numero" => 35, "sexe" => "Femme", "nom" => "MIALITIANA", "prenom" => "Nilainasoa", "matricule" => "93.097", "naissance" => "2011-01-02"],
            ["numero" => 36, "sexe" => "Homme", "nom" => "RANAIVOJAONA", "prenom" => "Solofoniaina Aaron", "matricule" => "92.039", "naissance" => "2012-02-07"],
            ["numero" => 37, "sexe" => "Femme", "nom" => "ANJARAVONIMANITRA", "prenom" => "Navalona Li Aimée", "matricule" => "92.080", "naissance" => "2012-04-11"],
            ["numero" => 38, "sexe" => "Femme", "nom" => "HANITRINIAINA", "prenom" => "Antsa Fitia", "matricule" => "93.107", "naissance" => "2012-03-17"],
            ["numero" => 39, "sexe" => "Homme", "nom" => "ANDRIAMIHAJATIANA", "prenom" => "Tsiaro Laurick", "matricule" => "91.926", "naissance" => "2010-03-28"],
            ["numero" => 40, "sexe" => "Homme", "nom" => "RABARISON", "prenom" => "Ny Andolalaina Fitia Noah", "matricule" => "91.968", "naissance" => "2011-09-27"],
            ["numero" => 41, "sexe" => "Femme", "nom" => "RAMIANDRISOA", "prenom" => "Kanto Ny Rima Milanto", "matricule" => "92.942", "naissance" => "2012-06-06"],
            ["numero" => 42, "sexe" => "Femme", "nom" => "RAKOTOARISON", "prenom" => "Gabriella Harimalaza", "matricule" => "92.944", "naissance" => "2010-05-17"],
            ["numero" => 43, "sexe" => "Homme", "nom" => "RANDRIAMALALA", "prenom" => "Steeve Andrew", "matricule" => "92.186", "naissance" => "2011-09-28"]
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
                    'identifiant' => $eleve['matricule_etudiant'],
                    'password' => password_hash('password-' . $eleve['matricule_etudiant'], PASSWORD_DEFAULT),
                    'id_eleve' => $eleve['id_eleve']
                ];
            }
        }

        // 1er 
        $eleve_permieres = [
            ["numero" => 1, "sexe" => "Femme", "nom" => "RAMILIARISON", "prenom" => "Lucianah", "matricule" => "93.395", "naissance" => "2010-01-24"],
            ["numero" => 2, "sexe" => "Homme", "nom" => "GARINA", "prenom" => "Hassim Alvin", "matricule" => "92.336", "naissance" => "2010-11-09"],
            ["numero" => 3, "sexe" => "Homme", "nom" => "RATSIMANARISOA", "prenom" => "One I Anjara", "matricule" => "93.221", "naissance" => "2011-05-17"],
            ["numero" => 4, "sexe" => "Homme", "nom" => "ANDRIAMASIMANDRESY", "prenom" => "Romain Claudion", "matricule" => "93.185", "naissance" => "2009-12-10"],
            ["numero" => 5, "sexe" => "Homme", "nom" => "NDRIAMBELONANDRO", "prenom" => "Noah Yvan", "matricule" => "92.638", "naissance" => "2009-12-02"],
            ["numero" => 6, "sexe" => "Homme", "nom" => "ANDRIAMITSARA", "prenom" => "Ilo Fandresena", "matricule" => "93.382", "naissance" => "2010-11-08"],
            ["numero" => 7, "sexe" => "Homme", "nom" => "MAHARINJATOVO", "prenom" => "Miharilafy", "matricule" => "93.192", "naissance" => "2009-01-15"],
            ["numero" => 8, "sexe" => "Femme", "nom" => "RANDRIANARISON", "prenom" => "Tiffany", "matricule" => "93.237", "naissance" => "2010-06-01"],
            ["numero" => 9, "sexe" => "Femme", "nom" => "RASOLONDRAIBE", "prenom" => "Henintsoa Navalona", "matricule" => "91.732", "naissance" => "2009-09-09"],
            ["numero" => 10, "sexe" => "Homme", "nom" => "RANDRIANANTENAINA", "prenom" => "Jhonathan Guadagno", "matricule" => "91.735", "naissance" => "2010-06-20"],
            ["numero" => 11, "sexe" => "Homme", "nom" => "RAJAOMORASATA", "prenom" => "Jeri Mifaly Fahasoavana", "matricule" => "93.386", "naissance" => "2009-04-27"],
            ["numero" => 12, "sexe" => "Femme", "nom" => "RABESAHALA", "prenom" => "Tefiharilanja Iharantsoa", "matricule" => "92.759", "naissance" => "2008-11-21"],
            ["numero" => 13, "sexe" => "Homme", "nom" => "MIALITIANA", "prenom" => "Lahatriniaina", "matricule" => "93.098", "naissance" => "2009-03-16"],
            ["numero" => 14, "sexe" => "Femme", "nom" => "RASAMISON", "prenom" => "Fanasin'Ny Avo Carmella", "matricule" => "93.184", "naissance" => "2010-11-02"],
            ["numero" => 15, "sexe" => "Homme", "nom" => "FOREIX", "prenom" => "DAN Nicolas", "matricule" => "92.644", "naissance" => "2009-02-13"],
            ["numero" => 16, "sexe" => "Homme", "nom" => "RAVELOMANANTSOA", "prenom" => "Fandresena Noah", "matricule" => "92.647", "naissance" => "2009-12-04"],
            ["numero" => 17, "sexe" => "Homme", "nom" => "IALISON", "prenom" => "Sitrakiniavo", "matricule" => "93.069", "naissance" => "2007-12-04"],
            ["numero" => 18, "sexe" => "Homme", "nom" => "RAMAROTAFIKA", "prenom" => "Lovasoa", "matricule" => "93.114", "naissance" => "2006-11-18"],
            ["numero" => 19, "sexe" => "Homme", "nom" => "RANDRIAMAMPIONONA", "prenom" => "Heriniaina Feno", "matricule" => "93.224", "naissance" => "2008-03-02"],
            ["numero" => 20, "sexe" => "Femme", "nom" => "RALAIMANARIVO", "prenom" => "Aina Sarobidy", "matricule" => "92.818", "naissance" => "2010-12-04"],
            ["numero" => 21, "sexe" => "Femme", "nom" => "RAFANOMEZANJANAHARY", "prenom" => "Saotrafitia Miahy", "matricule" => "92.358", "naissance" => "2010-06-13"],
            ["numero" => 22, "sexe" => "Femme", "nom" => "ANDRIAHERINTSOA", "prenom" => "Rojovola Santatra", "matricule" => "93.209", "naissance" => "2010-06-08"],
            ["numero" => 23, "sexe" => "Homme", "nom" => "RANDRIANARISOA", "prenom" => "Mandranto Fanaja", "matricule" => "91.831", "naissance" => "2010-09-18"],
            ["numero" => 24, "sexe" => "Homme", "nom" => "MAMINIAINA", "prenom" => "Ambinintsoa Finaritra", "matricule" => "93.225", "naissance" => "2009-06-12"],
            ["numero" => 25, "sexe" => "Femme", "nom" => "RAKOTOMALALA", "prenom" => "Miando Nifitia Sarobidy", "matricule" => "93.108", "naissance" => "2011-02-11"],
            ["numero" => 26, "sexe" => "Femme", "nom" => "FANOMEZANTSOA", "prenom" => "Françia", "matricule" => "91.749", "naissance" => "2009-10-05"],
            ["numero" => 27, "sexe" => "Femme", "nom" => "RAFANOMEZANJANAHARY", "prenom" => "Fitahiana Windina", "matricule" => "91.941", "naissance" => "2009-11-01"],
            ["numero" => 28, "sexe" => "Homme", "nom" => "MAHEFASOA", "prenom" => "Miarolaza", "matricule" => "91.749", "naissance" => "2009-10-05"],
            ["numero" => 29, "sexe" => "Homme", "nom" => "ANDRIAMBAONTSOA", "prenom" => "Rindra Tantely", "matricule" => "93.223", "naissance" => "2008-10-23"],
            ["numero" => 30, "sexe" => "Femme", "nom" => "ANDRIAMBAONTSOA", "prenom" => "Kanto Valisoa", "matricule" => "91.873", "naissance" => "2010-11-08"],
            ["numero" => 31, "sexe" => "Homme", "nom" => "ANDRIANASOLO", "prenom" => "Tiavina Ajaina", "matricule" => "92.431", "naissance" => "2008-10-04"],
            ["numero" => 32, "sexe" => "Homme", "nom" => "HERIMAHATRATRA", "prenom" => "Mandrindra", "matricule" => "93.238", "naissance" => "2009-05-27"]
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
                    'identifiant' => $eleve['matricule_etudiant'],
                    'password' => password_hash('password-' . $eleve['matricule_etudiant'], PASSWORD_DEFAULT),
                    'id_eleve' => $eleve['id_eleve']
                ];
            }
        }



        // terminale A 
        $eleve_terminaleA = $eleves = [
            ["numero" => 1, "sexe" => "Femme", "nom" => "GODIN RAZANAJATOVO", "prenom" => "Francia", "matricule" => "93.072", "naissance" => "2007-08-16"],
            ["numero" => 2, "sexe" => "Homme", "nom" => "RASOAMANANA", "prenom" => "Maminirina Anthonio", "matricule" => "92.196", "naissance" => "2008-06-19"],
            ["numero" => 3, "sexe" => "Homme", "nom" => "RATIANARIJAONA", "prenom" => "Maël Iavosoa", "matricule" => "91.658", "naissance" => "2009-09-25"],
            ["numero" => 4, "sexe" => "Femme", "nom" => "RAZAFINDRAVONY", "prenom" => "Mirantsoa Aina Ravaka", "matricule" => "92.627", "naissance" => "2009-11-07"],
            ["numero" => 5, "sexe" => "Homme", "nom" => "ANDRIATSILAIZINA", "prenom" => "Akohaja Arona", "matricule" => "93.115", "naissance" => "2010-12-12"],
            ["numero" => 6, "sexe" => "Femme", "nom" => "JOHNSON", "prenom" => "Rebecca Koloinaniaina", "matricule" => "93.112", "naissance" => "2007-09-22"],
            ["numero" => 7, "sexe" => "Femme", "nom" => "ANDRIAMIHARIMANANA", "prenom" => "Rojonirina Nitah", "matricule" => "93.113", "naissance" => "2010-03-22"],
            ["numero" => 8, "sexe" => "Homme", "nom" => "RAMILIARISON", "prenom" => "Steeve Ny Aina", "matricule" => "91.647", "naissance" => "2003-12-20"],
            ["numero" => 9, "sexe" => "Femme", "nom" => "RAZAFINDRALAMBO", "prenom" => "Hery Ny Avo Liantsoa", "matricule" => "91.686", "naissance" => "2008-12-27"],
            ["numero" => 10, "sexe" => "Homme", "nom" => "HARISON", "prenom" => "Andriamampionona Tiavina Nolhan", "matricule" => "91.679", "naissance" => "2009-03-09"],
            ["numero" => 11, "sexe" => "Femme", "nom" => "RANDRIANARISOA", "prenom" => "Harilanto Nancia", "matricule" => "92.192", "naissance" => "2008-11-04"],
            ["numero" => 12, "sexe" => "Femme", "nom" => "RANDRIANIRINA", "prenom" => "Benjamina Rollande", "matricule" => "91.744", "naissance" => "2008-08-24"],
            ["numero" => 13, "sexe" => "Homme", "nom" => "HERINANDRIANINA", "prenom" => "Fenotiana Nilsen", "matricule" => "91.711", "naissance" => "2007-09-13"],
            ["numero" => 14, "sexe" => "Femme", "nom" => "ANDRIAMAMPIONONA", "prenom" => "Finaritra Iarilaza", "matricule" => "91.674", "naissance" => "2009-08-05"],
            ["numero" => 15, "sexe" => "Homme", "nom" => "RAJOELISON", "prenom" => "Ambinintsoa", "matricule" => "92.925", "naissance" => "2007-12-07"],
            ["numero" => 16, "sexe" => "Femme", "nom" => "RAKOTONARIVO", "prenom" => "Taniah", "matricule" => "91.695", "naissance" => "2008-03-02"],
            ["numero" => 17, "sexe" => "Femme", "nom" => "RAZAFINDRABE", "prenom" => "Hary Laina Tsara", "matricule" => "91.307", "naissance" => "2008-10-09"]
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
                    'identifiant' => $eleve['matricule_etudiant'],
                    'password' => password_hash('password-' . $eleve['matricule_etudiant'], PASSWORD_DEFAULT),
                    'id_eleve' => $eleve['id_eleve']
                ];
            }
        }

        $this->model->insertBatchFixtures($inscriptions, 'inscription');
        $this->model->insertBatchFixtures($users, 'users');
        echo "Insertion des eleve fini avec succée !" . PHP_EOL;
    }


    /**
     * Undocumented function
     *
     * @param boolean $justClean
     * @return void
     */
    public function loadSiteFixtures($clean = false)
    {
        // Vider les tables dans le bon ordre
        $this->model->emptyDb([
            'site_galerie',
            'site_evenement',
            'site_actualite',
            'site_activite_prescolaire',
            'site_programme_pedagogique',
            'site_installation',
            'site_pilier_educatif',
            'site_valeur',
            'site_notre_histoire',
            'site_slogan',
            'site_presentation',
            'site_hero_slide',
            'site_message_contact'
        ]);

        if ($clean == true)
            return;

        // ===================== HERO SLIDES ===================== //
        $heroSlides = [
            [
                'titre' => 'Bienvenue au Lycée MIRVA',
                'soustitre' => 'Une éducation d’excellence pour un avenir brillant.',
                'image' => $this->faker->imageUrl(1920, 1080, 'students,school,campus'),
                'cta' => 'Découvrir notre établissement',
                'cta_link' => '/a-propos',
                'actif' => true
            ],
            [
                'titre' => 'Apprendre, Grandir, Réussir',
                'soustitre' => 'Encadrés par des professeurs passionnés et expérimentés.',
                'image' => $this->faker->imageUrl(1920, 1080, 'education,teacher,classroom'),
                'cta' => 'Voir nos programmes',
                'cta_link' => '/programme',
                'actif' => true
            ],
            [
                'titre' => 'Un environnement d’apprentissage moderne',
                'soustitre' => 'Des infrastructures adaptées au développement de chaque élève.',
                'image' => $this->faker->imageUrl(1920, 1080, 'school,library,students'),
                'cta' => 'Visiter le campus',
                'cta_link' => '/infrastructure',
                'actif' => true
            ]
        ];
        foreach ($heroSlides as $slide) {
            $this->model->insertFixture('site_hero_slide', $slide);
        }

        // ===================== PRÉSENTATION ===================== //
        $this->model->insertFixture('site_presentation', [
            'titre' => 'Présentation du Lycée MIRVA',
            'description' => "Le Lycée MIRVA est un établissement d’enseignement privé reconnu pour la qualité de son encadrement, son approche pédagogique innovante et son engagement envers la réussite de chaque élève. Nous formons des jeunes confiants, responsables et ouverts sur le monde.",
            'image' => $this->faker->imageUrl(800, 600, 'school,campus,education'),
            'nombre_eleves' => 1350,
            'nombre_professeurs' => 72,
            'annees_experience' => 27,
            'taux_reussite' => 97.8,
            'actif' => true
        ]);

        // ===================== SLOGANS ===================== //
        $slogans = [
            ['titre' => 'Apprendre', 'description' => 'Acquérir les savoirs et compétences essentielles pour réussir.', 'icone' => 'book-open'],
            ['titre' => 'S’épanouir', 'description' => 'Encourager la créativité, l’autonomie et la confiance en soi.', 'icone' => 'sparkles'],
            ['titre' => 'Réussir', 'description' => 'Atteindre l’excellence académique et humaine.', 'icone' => 'award']
        ];
        foreach ($slogans as $s) {
            $this->model->insertFixture('site_slogan', $s);
        }

        // ===================== NOTRE HISTOIRE ===================== //
        $this->model->insertFixture('site_notre_histoire', [
            'titre' => 'Notre Histoire',
            'description' => "Créé en 1998, le Lycée MIRVA s’est rapidement imposé comme un acteur majeur de l’enseignement à Madagascar. Avec une pédagogie centrée sur l’élève et une vision moderne de l’éducation, nous accompagnons les générations vers la réussite.",
            'reconnaissance_par' => 'Ministère de l’Éducation Nationale',
            'image' => $this->faker->imageUrl(900, 600, 'school,students,education'),
            'actif' => true
        ]);

        // ===================== VALEURS ===================== //
        $valeurs = [
            ['titre' => 'Notre Vision', 'description' => 'Devenir une école modèle pour la formation d’élèves autonomes, responsables et épanouis.', 'icone' => 'eye'],
            ['titre' => 'Notre Mission', 'description' => 'Transmettre un savoir de qualité dans un cadre respectueux et stimulant.', 'icone' => 'target'],
            ['titre' => 'Nos Valeurs', 'description' => 'Excellence, Respect, Intégrité, Ouverture et Collaboration.', 'icone' => 'heart-handshake']
        ];
        foreach ($valeurs as $v) {
            $this->model->insertFixture('site_valeur', $v);
        }

        // ===================== PILIERS ÉDUCATIFS ===================== //
        $piliers = [
            ['titre' => 'Innovation pédagogique', 'description' => 'Intégration des outils numériques et pédagogies actives pour rendre l’apprentissage motivant.', 'icone' => 'lightbulb'],
            ['titre' => 'Accompagnement individualisé', 'description' => 'Chaque élève bénéficie d’un suivi personnalisé pour développer tout son potentiel.', 'icone' => 'user-check'],
            ['titre' => 'Ouverture internationale', 'description' => 'Apprentissage des langues étrangères et échanges culturels.', 'icone' => 'globe-2']
        ];
        foreach ($piliers as $p) {
            $this->model->insertFixture('site_pilier_educatif', $p);
        }

        // ===================== INSTALLATIONS ===================== //
        $installations = [
            ['titre' => 'Salles de classe connectées', 'description' => 'Des salles modernes équipées de tableaux interactifs et d’un accès Internet haut débit.', 'image' => $this->faker->imageUrl(800, 600, 'classroom,technology')],
            ['titre' => 'Bibliothèque numérique', 'description' => 'Un espace de lecture et de recherche enrichi par des ressources en ligne.', 'image' => $this->faker->imageUrl(800, 600, 'library,books')],
            ['titre' => 'Terrain multisport', 'description' => 'Basket, foot, volley et plus pour un esprit sain dans un corps sain.', 'image' => $this->faker->imageUrl(800, 600, 'sport,students')]
        ];
        foreach ($installations as $inst) {
            $this->model->insertFixture('site_installation', $inst);
        }

        // ===================== PROGRAMME PÉDAGOGIQUE ===================== //
        $points = [
            'Méthodes d’enseignement interactives et orientées sur la pratique.',
            'Suivi continu et accompagnement individualisé des élèves.',
            'Développement de l’esprit critique et de la créativité.',
            'Préparation rigoureuse aux examens officiels et concours nationaux.'
        ];
        $ordre = 1;
        foreach ($points as $p) {
            $this->model->insertFixture('site_programme_pedagogique', [
                'titre' => 'Notre Approche Pédagogique',
                'contenu' => $p,
                'ordre' => $ordre++,
                'actif' => true
            ]);
        }

        // ===================== ACTIVITÉS PRÉSCOLAIRES ===================== //
        $activites = [
            ['label' => 'Jeux éducatifs et ludiques', 'icone' => 'puzzle'],
            ['label' => 'Chants et danses traditionnelles', 'icone' => 'music-2'],
            ['label' => 'Ateliers d’arts plastiques', 'icone' => 'palette'],
            ['label' => 'Lecture d’histoires et contes', 'icone' => 'book-open-text']
        ];
        foreach ($activites as $a) {
            $this->model->insertFixture('site_activite_prescolaire', $a);
        }

        // ===================== ACTUALITÉS ===================== //
        for ($i = 0; $i < 5; $i++) {
            $this->model->insertFixture('site_actualite', [
                'titre' => $this->faker->randomElement([
                    'Journée portes ouvertes du Lycée MIRVA',
                    'Remise des diplômes 2025',
                    'Nouvelle bibliothèque numérique inaugurée',
                    'Participation à la semaine de la science',
                    'Atelier d’orientation universitaire'
                ]),
                'contenu' => $this->faker->paragraph(4),
                'date_publication' => $this->faker->date(),
                'image' => $this->faker->imageUrl(800, 600, 'students,event,education'),
                'publie' => true
            ]);
        }

        // ===================== ÉVÉNEMENTS ===================== //
        $evenementData = [
            ['titre' => 'Fête de fin d’année scolaire', 'description' => 'Un moment convivial pour célébrer la réussite de nos élèves.', 'lieu' => 'Salle polyvalente MIRVA'],
            ['titre' => 'Compétition interscolaire', 'description' => 'Nos élèves participent à des défis sportifs et intellectuels.', 'lieu' => 'Gymnase municipal d’Antananarivo'],
            ['titre' => 'Forum des métiers', 'description' => 'Rencontre entre élèves et professionnels pour inspirer les futurs parcours.', 'lieu' => 'Campus MIRVA'],
            ['titre' => 'Journée de reboisement', 'description' => 'Les élèves s’engagent pour l’environnement.', 'lieu' => 'Bois de Tanjombato']
        ];
        foreach ($evenementData as $ev) {
            $this->model->insertFixture('site_evenement', array_merge($ev, [
                'date_evenement' => $this->faker->date(),
                'image' => $this->faker->imageUrl(800, 600, 'event,students'),
                'publie' => true
            ]));
        }

        $evenements = $this->model->getIds('site_evenement', 'id_evenement');

        // ===================== GALERIE ===================== //
        foreach ($evenements as $id) {
            for ($j = 1; $j <= 3; $j++) {
                $this->model->insertFixture('site_galerie', [
                    'titre' => "Photo $j de l’événement",
                    'url' => $this->faker->imageUrl(800, 600, 'school,event,students'),
                    'categorie' => 'Événement',
                    'id_evenement' => $id,
                    'publie' => true
                ]);
            }
        }

        // ===================== MESSAGES CONTACT ===================== //
        for ($i = 0; $i < 3; $i++) {
            $this->model->insertFixture('site_message_contact', [
                'nom' => $this->faker->name(),
                'email' => $this->faker->safeEmail(),
                'message' => $this->faker->randomElement([
                    'Je souhaite inscrire mon enfant en classe de 5e.',
                    'Pouvez-vous m’envoyer la liste des fournitures scolaires ?',
                    'Quand auront lieu les inscriptions pour la rentrée prochaine ?'
                ]),
                'date_message' => $this->faker->date(),
                'lu' => $this->faker->boolean()
            ]);
        }

        echo "✅ Données réalistes générées avec succès pour le site web du Lycée MIRVA !" . PHP_EOL;
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
        $this->loadLeconExercice();
        $this->loadUser();
        $this->loadEmploiDuTemps();

        echo "✅ Fausse base de données générée avec succès !" . PHP_EOL;
    }


    /**
     * Effacer toutes le donée dans la base de données
     *
     * @return void
     */
    public function cleanUp()
    {
        $this->loadEmploiDuTemps(true);
        $this->loadUser(true);
        $this->loadConfigurations(true);
        $this->loadPersonnel(true);
        $this->LoadEleveParent(true);
        $this->loadRoles(true);
        $this->loadSiteFixtures(true);

        echo "✅ Suppression des données avec succès !" . PHP_EOL;
    }
}
