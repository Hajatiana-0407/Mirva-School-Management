<?php
class HeroModel extends CI_Model
{
    protected $table = 'site_hero_slide';
    protected $pk = 'id_slide';

    public function __construct()
    {
        parent::__construct();
    }

    public function index() {}
}
