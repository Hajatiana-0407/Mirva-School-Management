<?php
defined('BASEPATH') or exit('No direct script access allowed');

class PersonnelModel extends CI_Model
{
    protected $table = 'personnel';
    protected $primaryKey = 'id_personnel';

    public function __construct()
    {
        parent::__construct();
    }
}
