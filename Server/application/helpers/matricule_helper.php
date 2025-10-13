<?php
defined('BASEPATH') or exit('No direct script access allowed');

if (!function_exists('generateMatricule')) {

    /**
     * Generation de matricule automatiquement
     *
     * @param string prefix specifique pour le type ex! EMP pour employé 
     * @param string Le dernier matricule dans la base de donnée / vide 
     * @return string Nouveau matricule  
     */
    function generateMatricule($prefix = '', $lastMatricule = '')
    {
        $CI = &get_instance();
        $CI->load->database();

        $generalPrefix = '';
        $data = $CI->db->select('prefix')
            ->from('etablissement')
            ->order_by('id_etablissement', 'DESC')
            ->get()
            ->row();
        if (isset($data) && isset($data->prefix)) {
            $generalPrefix = $data->prefix;
        }
        if ($lastMatricule === '') {
            return  $generalPrefix . $prefix . '00001';
        }
        $last_id = intval(preg_replace('/[^0-9]/', '', $lastMatricule));
        $new_id = $last_id + 1;
        $matricule = $generalPrefix . $prefix .  str_pad($new_id, 5, '0', STR_PAD_LEFT);
        return $matricule;
    }
}
