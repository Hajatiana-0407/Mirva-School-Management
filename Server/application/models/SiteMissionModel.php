<?php
class SiteMissionModel extends CI_Model
{
    protected $table = 'site_slogan';
    protected $primaryKey = 'id_slogan';

    public function __construct()
    {
        parent::__construct();
    }

    public function index() {}
}
    