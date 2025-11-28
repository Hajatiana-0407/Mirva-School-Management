<?php
class SiteInstallationModel extends CI_Model
{
    protected $table = 'site_installation';
    protected $primaryKey = 'id_installation ';

    public function __construct()
    {
        parent::__construct();
    }

    public function index() {}
}
    