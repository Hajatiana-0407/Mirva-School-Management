<?php
defined('BASEPATH') or exit('No direct script access allowed');

/**
 * Pour configuration d'accee de l'api 
 */
$hook['pre_controller'] = array(
    'class'    => 'Cors',
    'function' => 'enable',
    'filename' => 'Cors.php',
    'filepath' => 'hooks',
    'params'   => array()
);

/**
 * Pour le  teste d'authentification 
 */
$hook['post_controller_constructor'][] = [
    'class'    => 'AuthHook',
    'function' => 'check_secure_routes',
    'filename' => 'AuthHook.php',
    'filepath' => 'hooks',
];

/*
| -------------------------------------------------------------------------
| Hooks
| -------------------------------------------------------------------------
| This file lets you define "hooks" to extend CI without hacking the core
| files.  Please see the user guide for info:
|
|	https://codeigniter.com/userguide3/general/hooks.html
|
*/
