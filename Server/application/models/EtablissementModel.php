<?php

defined('BASEPATH') or exit('No direct script access allowed');
class EtablissementModel extends CI_Model
{
    protected $table = 'etablissement';
    protected $primaryKey = 'id_etablissement';

    public function __construct()
    {
        parent::__construct();
    }

    // ======= READ =======
    public function findEtablissementData()
    {
        return $this->db->select('*')
            ->from($this->table)
            ->order_by($this->primaryKey, 'DESC')
            ->get()
            ->row();
    }

}
