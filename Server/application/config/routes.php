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

// ******************* ROUTE ENSEIGNANT ********************** //
$route['api/admin/teachers'] = 'EnseigantsController';

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
