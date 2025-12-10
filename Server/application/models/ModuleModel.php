<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ModuleModel extends CI_Model
{
    protected $table = 'modules';
    protected $primaryKey = 'id_module';

    public function __construct()
    {
        parent::__construct();
    }


    public function findAllQuery()
    {
        $modules =  $this->db->select('*')
            ->from($this->table)
            ->get()
            ->result_array();
        foreach ($modules as &$module) {
            $module['is_for_all'] = $module['is_for_all'] == '1';
            $module['is_section'] = $module['is_section'] == '1';
        }
        return $modules;
    }
}
