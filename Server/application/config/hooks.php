<?php
defined('BASEPATH') or exit('No direct script access allowed');

$hook['pre_controller'] = array(
    'class'    => 'Cors',
    'function' => 'enable',
    'filename' => 'Cors.php',
    'filepath' => 'hooks',
    'params'   => array()
);

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
