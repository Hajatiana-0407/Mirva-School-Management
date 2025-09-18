<?php
defined('BASEPATH') or exit('No direct script access allowed');

class InscriptionModel extends CI_Model
{
    protected $table = 'inscription';
    protected $primaryKey = 'id_inscription';

    public function __construct()
    {
        parent::__construct();
    }
}
