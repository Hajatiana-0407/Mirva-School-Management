<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ParentModel extends CI_Model
{
    protected $table = 'parent';
    protected $primaryKey = 'id_parent';

    public function __construct()
    {
        parent::__construct();
    }
}
