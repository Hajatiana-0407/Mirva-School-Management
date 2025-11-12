<?php
class SitePresentationModel extends CI_Model
{
    protected $table = 'site_presentation';
    protected $pk = 'id_presentation';

    public function __construct()
    {
        parent::__construct();
    }

    public function index() {}
}
