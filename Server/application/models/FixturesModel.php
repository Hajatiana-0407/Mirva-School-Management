<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FixturesModel extends CI_Model {
    public function __construct()
    {
        parent::__construct() ; 
    }


    public function insert($data) {
        $result = $this->db->insert('niveaux', $data);

        if (!$result) {
            $error = $this->db->error();
            log_message('error', 'Erreur insertion dans ' . $this->table . ' : ' . $error['message']);
            return ['success' => false, 'error' => $error];
        }

        return ['success' => true, 'insert_id' => $this->db->insert_id()];
    }
}
