<?php
defined('BASEPATH') or exit('No direct script access allowed');

class EleveModel extends CI_Model
{
    protected $table = 'eleve';
    protected $primaryKey = 'id_eleve';

    public function __construct()
    {
        parent::__construct();
    }
}
