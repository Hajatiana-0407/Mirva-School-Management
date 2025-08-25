<?php
defined('BASEPATH') or exit('No direct script access allowed');

class TypePersonnelModel extends CI_Model
{
    protected $table = 'type_personnel';
    protected $primaryKey = 'id_type_personnel';

    public function __construct()
    {
        parent::__construct();
    }
}
