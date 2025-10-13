<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ParentEleveModele extends CI_Model
{
    protected $table = 'parents_eleves';
    protected $primaryKey = 'parent_id_parent';

    public function __construct()
    {
        parent::__construct();
    }

}
