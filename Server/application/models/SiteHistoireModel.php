<?php
class SiteHistoireModel extends CI_Model
{
    protected $table = 'site_notre_histoire';
    protected $primaryKey = 'id_histoire';

    public function __construct()
    {
        parent::__construct();
    }

    public function index() {}
}
    