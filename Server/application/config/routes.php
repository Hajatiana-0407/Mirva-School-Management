<?php
defined('BASEPATH') or exit('No direct script access allowed');


/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/userguide3/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;





// ===================== Fixtures  ===================== //
$route['fixtures'] = 'AppFixtures/loadFixtures';
// ===================== **************** ===================== //
// ===================== Download  ===================== //
$route['api/admin/download'] = 'DownloadContrller/download';
// ===================== **************** ===================== //


//! *********************  ROUTE POUR LE SITE WEB **********************************************************************

// ******************* ROUTE HERO ********************** //
$route['api/site/hero'] = 'HeroController';
$route['api/site/hero/update'] = 'HeroController/update';
$route['api/site/hero/create'] = 'HeroController/create';
$route['api/site/hero/delete'] = 'HeroController/delete';
$route['api/site/hero/publish'] = 'HeroController/publish';

// ******************* ROUTE PRESENTATION ********************** //
$route['api/site/presentation'] = 'SitePresentationController';
$route['api/site/presentation/update'] = 'SitePresentationController/update';
$route['api/site/presentation/create'] = 'SitePresentationController/create';
$route['api/site/presentation/delete'] = 'SitePresentationController/delete';


// ******************* ROUTE VALEUR ********************** //
$route['api/site/valeur'] = 'SiteValeurController';
$route['api/site/valeur/update'] = 'SiteValeurController/update';
$route['api/site/valeur/create'] = 'SiteValeurController/create';
$route['api/site/valeur/delete'] = 'SiteValeurController/delete';
$route['api/site/valeur/publish'] = 'SiteValeurController/publish';

// ******************* ROUTE HISTOIRE ********************** //
$route['api/site/histoire'] = 'SiteHistoireController';
$route['api/site/histoire/update'] = 'SiteHistoireController/update';
$route['api/site/histoire/create'] = 'SiteHistoireController/create';
$route['api/site/histoire/delete'] = 'SiteHistoireController/delete';
$route['api/site/histoire/publish'] = 'SiteHistoireController/publish';

// ******************* ROUTE MISSION ********************** //
$route['api/site/mission'] = 'SiteMissionController';
$route['api/site/mission/update'] = 'SiteMissionController/update';
$route['api/site/mission/create'] = 'SiteMissionController/create';
$route['api/site/mission/delete'] = 'SiteMissionController/delete';
$route['api/site/mission/publish'] = 'SiteMissionController/publish';


// ******************* ROUTE PILIER ********************** //
$route['api/site/Pilier'] = 'SitePilierEducatifController';
$route['api/site/Pilier/update'] = 'SitePilierEducatifController/update';
$route['api/site/Pilier/create'] = 'SitePilierEducatifController/create';
$route['api/site/Pilier/delete'] = 'SitePilierEducatifController/delete';
$route['api/site/Pilier/publish'] = 'SitePilierEducatifController/publish';


// ******************* ROUTE INSTALLATION ********************** //
$route['api/site/Installation'] = 'SiteInstallationController';
$route['api/site/Installation/update'] = 'SiteInstallationController/update';
$route['api/site/Installation/create'] = 'SiteInstallationController/create';
$route['api/site/Installation/delete'] = 'SiteInstallationController/delete';
$route['api/site/Installation/publish'] = 'SiteInstallationController/publish';


//! *********************  ROUTE POUR LE SITE WEB **********************************************************************


// Filtre 
$route['api/filtre/lecon'] = 'FiltreCotroller/lecon';
$route['api/filtre/exercice'] = 'FiltreCotroller/exercice';
$route['api/filtre/inscription'] = 'FiltreCotroller/inscription';


// ===================== Authentification  ===================== //
$route['api/auth/login'] = 'AuthController/login';
$route['api/auth/logout'] = 'AuthController/logout';
$route['api/auth/update/account'] = 'AuthController/update';
// ===================== **************** ===================== //

// ******************* ROUTE ETABLISSEMENT ********************** //
$route['api/admin/school'] = 'EtablissementController/getEtablissementInfo';
$route['api/admin/school/update'] = 'EtablissementController/updateEtablissementInfo';

// ******************* ROUTE CLASSE ********************** //
$route['api/admin/classe'] = 'ClasseController';
$route['api/admin/classe/update'] = 'ClasseController/update';
$route['api/admin/classe/create'] = 'ClasseController/create';
$route['api/admin/classe/delete'] = 'ClasseController/delete';
$route['api/admin/matiere-classe/(:num)'] = 'ClasseController/getAllClasseByIdMatiere/$1';

// ******************* ROUTE NIVEAU ********************** //
$route['api/admin/niveau'] = 'NiveauController';
$route['api/admin/niveau/update'] = 'NiveauController/update';
$route['api/admin/niveau/create'] = 'NiveauController/create';
$route['api/admin/niveau/delete'] = 'NiveauController/delete';
$route['api/admin/niveau-matiere/(:num)'] = 'NiveauController/niveauMatiere/$1';
$route['api/admin/niveau-enseignant/(:num)'] = 'NiveauController/nveauEnseignant/$1';
$route['api/admin/niveau-matiere/enrigistrer'] = 'NiveauController/registerCoef';

// ******************* ROUTE MATIERE ********************** //
$route['api/admin/matiere'] = 'MatiereController';
$route['api/admin/matiere/update'] = 'MatiereController/update';
$route['api/admin/matiere/create'] = 'MatiereController/create';
$route['api/admin/matiere/delete'] = 'MatiereController/delete';

// ******************* ROUTE PERSONNEL ********************** //
$route['api/admin/personnel'] = 'PersonnelController';
$route['api/admin/personnel/update'] = 'PersonnelController/update';
$route['api/admin/personnel/create'] = 'PersonnelController/create';
$route['api/admin/personnel/delete'] = 'PersonnelController/delete';
$route['api/admin/personnel/(:any)'] = 'PersonnelController/findOneByMatricule/$1';

// ******************* ROUTE ENSEIGNANT ********************** //
$route['api/admin/teachers'] = 'EnseigantsController';
$route['api/admin/teachers/update'] = 'EnseigantsController/update';
$route['api/admin/teachers/create'] = 'EnseigantsController/create';
$route['api/admin/teachers/assignations'] = 'EnseigantsController/assignations';
$route['api/admin/teacher/(:any)'] = 'EnseigantsController/findOneByMatricule/$1';


// ******************* ROUTE TYPE PERSONNEL ********************** //
$route['api/admin/type-personnel'] = 'TypePersonnelController';

// ******************* ROUTE ANNEE SCOLAIRE  ********************** //
$route['api/admin/school-year'] = 'AnneeScolaireController';
$route['api/admin/school-year/update'] = 'AnneeScolaireController/update';
$route['api/admin/school-year/create'] = 'AnneeScolaireController/create';
$route['api/admin/school-year/delete'] = 'AnneeScolaireController/delete';
$route['api/admin/school-year/change-active'] = 'AnneeScolaireController/changeActiveSchoolYear';


// ******************* ROUTE INSCRIPTION  ********************** //
$route['api/admin/registration'] = 'InscriptionController';
$route['api/admin/registration-student'] = 'InscriptionController/create';
$route['api/admin/registration/delete'] = 'InscriptionController/delete';

// ******************* ROUTE ETUDIANT ********************** //
$route['api/admin/etudiant'] = 'EtudiantController';
$route['api/admin/etudiant/update'] = 'EtudiantController/update';
$route['api/admin/etudiant/create'] = 'EtudiantController/create';
$route['api/admin/etudiant/delete'] = 'EtudiantController/delete';
$route['api/admin/etudiant/statistique'] = 'EtudiantController/getStatistique';
$route['api/admin/etudiant/(:any)'] = 'EtudiantController/findOne/$1';
$route['api/admin/etudiant-matricule'] = 'EtudiantController/getNewMatricule';

// ******************* ROUTE PARENT ********************** //
$route['api/admin/parent'] = 'ParentController';
$route['api/admin/parent/update'] = 'ParentController/update';
$route['api/admin/parent/upsert'] = 'ParentController/upsert';
$route['api/admin/parent/delete'] = 'ParentController/delete';

// ******************* ROUTE LECONS ********************** //
$route['api/admin/lesson'] = 'LeconController';
$route['api/admin/lesson/update'] = 'LeconController/update';
$route['api/admin/lesson/create'] = 'LeconController/create';
$route['api/admin/lesson/delete'] = 'LeconController/delete';
$route['api/admin/lesson/publish'] = 'LeconController/publish';

// ******************* ROUTE LECONS ********************** //
$route['api/admin/exercice'] = 'ExerciceController';
$route['api/admin/exercice/update'] = 'ExerciceController/update';
$route['api/admin/exercice/create'] = 'ExerciceController/create';
$route['api/admin/exercice/delete'] = 'ExerciceController/delete';
$route['api/admin/exercice/publish'] = 'ExerciceController/publish';

// ******************* ROUTE ROLES ********************** //
$route['api/admin/role'] = 'RoleController';
$route['api/admin/role/update'] = 'RoleController/update';
$route['api/admin/role/create'] = 'RoleController/create';
$route['api/admin/role/delete'] = 'RoleController/delete';

// ******************* ROUTE ROLES ********************** //
$route['api/admin/module'] = 'ModuleController';


// ******************* ROUTE EMPLOI DU TEMPS ********************** //
$route['api/admin/emploi-du-temps'] = 'EmploiDuTempsController';
$route['api/admin/emploi-du-temps/update'] = 'EmploiDuTempsController/update';
$route['api/admin/emploi-du-temps/create'] = 'EmploiDuTempsController/create';
$route['api/admin/emploi-du-temps/delete'] = 'EmploiDuTempsController/delete';
$route['api/admin/emploi-du-temps/publish'] = 'EmploiDuTempsController/publish';

// ******************* ROUTE ASSIGNATIONS  ********************** //
$route['api/admin/assignation-by-classe/(:any)'] = 'AssignationController/getAllByClasseId/$1';
$route['api/admin/assignation-by-teacher/(:any)'] = 'AssignationController/getAllByTeacherId/$1';





// ===================== Sécurisation des routes ===================== //
// ===================== Routes sécurisées ===================== //
$GLOBALS['secure'] = [
    // Établissement
    // 'api/admin/school' => true,
    'api/admin/school/update' => true,

    // Classe
    // 'api/admin/classe' => true,
    'api/admin/classe/update' => true,
    'api/admin/classe/create' => true,
    'api/admin/classe/delete' => true,
    'api/admin/matiere-classe/*' => true,

    // Niveau
    // 'api/admin/niveau' => true,
    'api/admin/niveau/update' => true,
    'api/admin/niveau/create' => true,
    'api/admin/niveau/delete' => true,
    'api/admin/niveau-matiere/*' => true,
    'api/admin/niveau-matiere/enrigistrer' => true,

    // Matière
    // 'api/admin/matiere' => true,
    'api/admin/matiere/update' => true,
    'api/admin/matiere/create' => true,
    'api/admin/matiere/delete' => true,

    // Personnel
    'api/admin/personnel' => true,
    'api/admin/personnel/update' => true,
    'api/admin/personnel/create' => true,
    'api/admin/personnel/delete' => true,
    'api/admin/personnel/*' => true, // findOneByMatricule

    // Enseignants
    // 'api/admin/teachers' => true,

    // Type personnel
    'api/admin/type-personnel' => true,

    // Année scolaire
    // 'api/admin/school-year' => true,
    'api/admin/school-year/update' => true,
    'api/admin/school-year/create' => true,
    'api/admin/school-year/delete' => true,
    'api/admin/school-year/change-active' => true,

    // Inscription
    // 'api/admin/registration' => true,
    'api/admin/registration-student' => true,
    'api/admin/registration/delete' => true,

    // Étudiant
    'api/admin/etudiant' => true,
    // 'api/admin/etudiant/update' => true,
    // 'api/admin/etudiant/create' => true,
    // 'api/admin/etudiant/delete' => true,
    // 'api/admin/etudiant/statistique' => true,
    // 'api/admin/etudiant/*' => true,

    // Parent
    'api/admin/parent' => true,
    'api/admin/parent/update' => true,
    'api/admin/parent/upsert' => true,
    'api/admin/parent/delete' => true,
];
