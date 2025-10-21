<?php
defined('BASEPATH') or exit('No direct script access allowed');

class RolePermissionModel extends CI_Model
{
    protected $table = 'role_permissions';
    protected $primaryKey = 'id_role_permission';

    public function __construct()
    {
        parent::__construct();
    }

    public function deleteByRoleId($id_role = null)
    {
        if (!$id_role) return null;
        $this->db
            ->where('id_role', $id_role)
            ->delete($this->table);
        return true;
    }
}
