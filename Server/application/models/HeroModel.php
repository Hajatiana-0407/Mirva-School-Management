<?php
defined('BASEPATH') or exit('No direct script access allowed');
class HeroModel extends CI_Model
{
    protected $table = 'site_hero_slide';
    protected $primaryKey = 'id_slide';

    public function __construct()
    {
        parent::__construct();
    }

    public function index() {}
}
