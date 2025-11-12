<?php
class SiteValeurModel extends CI_Model
{
    protected $table = 'site_valeur';
    protected $primaryKey = 'id_valeur';

    public function __construct()
    {
        parent::__construct();
    }

    public function index() {}
}
    