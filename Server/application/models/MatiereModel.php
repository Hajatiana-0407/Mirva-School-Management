<?php
defined('BASEPATH') or exit('No direct script access allowed');

class MatiereModel extends CI_Model
{
    protected $table = 'matiere';
    protected $primaryKey = 'id_matiere';
    protected $searchs = ['matiere.denomination', 'matiere.abbreviation', 'matiere.description'];

    public function __construct()
    {
        parent::__construct();
    }
}
