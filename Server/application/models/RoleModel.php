<?php
defined('BASEPATH') or exit('No direct script access allowed');

class RoleModel extends CI_Model
{
    protected $table = 'roles';
    protected $primaryKey = 'id_role';

    public function __construct()
    {
        parent::__construct();
    }

    // ? ======= READ =======
    public function findAll()
    {
        $roles =  $this->db->select('r.* , COUNT(u.id_user) as total_utilisateur')
            ->from($this->table . ' r')
            // ? utilisateur 
            ->join('users u', 'r.id_role = u.id_role', 'left')
            ->group_by('r.' . $this->primaryKey)
            ->order_by('r.id_role', 'DESC')
            ->get()
            ->result_array();

        $modules = [];
        if (count($roles) > 0) {
            $modules =  $this->db->select('*')
                ->from('modules')
                ->get()
                ->result_array();
        }
        foreach ($roles as &$role) {
            $permissions = [];
            foreach ($modules as $module) {
                $permission = $this->db->select('can_read as read , can_create as create , can_update as update , can_delete as delete')
                    ->from('role_permissions ')
                    ->where('id_role', $role['id_role'])
                    ->where('id_module', $module['id_module'])
                    ->get()
                    ->row();
                $permissions[$module['id_module']] = [];
                $permissions[$module['id_module']]['label'] = $module['label'];

                // ? Permissions
                if ($permission) {
                    $permissions[$module['id_module']]['create'] = $permission->create === '1';
                    $permissions[$module['id_module']]['delete'] = $permission->delete === '1';
                    $permissions[$module['id_module']]['update'] = $permission->update === '1';
                    $permissions[$module['id_module']]['read'] = $permission->read === '1';

                    // Autre 
                    $permissions[$module['id_module']]['isForAll'] = $module['is_for_all'] === '1';
                    $permissions[$module['id_module']]['isSections'] = $module['is_section'] === '1';
                }
            }
            $role['permissions'] = $permissions;
        }
        return $roles;
    }

    public function findOneById($id)
    {
        if (!!!$id)  return null;
        $role =  $this->db->select('r.* , COUNT(u.id_user) as total_utilisateur')
            ->from($this->table . ' r')
            // ? utilisateur 
            ->join('users u', 'r.id_role = u.id_role', 'left')
            ->where('r.id_role', $id)
            ->group_by('r.' . $this->primaryKey)
            ->get()
            ->row();

        $modules = [];
        if ($role) {
            $modules =  $this->db->select('*')
                ->from('modules')
                ->get()
                ->result_array();
        }
        $permissions = [];
        foreach ($modules as $module) {
            $permission = $this->db->select('can_read as read , can_create as create , can_update as update , can_delete as delete')
                ->from('role_permissions ')
                ->where('id_role', $role->id_role)
                ->where('id_module', $module['id_module'])
                ->get()
                ->row();
            $permissions[$module['id_module']] = [];
            $permissions[$module['id_module']]['label'] = $module['label'];

            // ? Permissions
            if ($permission) {
                $permissions[$module['id_module']]['create'] = $permission->create === '1';
                $permissions[$module['id_module']]['delete'] = $permission->delete === '1';
                $permissions[$module['id_module']]['update'] = $permission->update === '1';
                $permissions[$module['id_module']]['read'] = $permission->read === '1';

                // Autre 
                $permissions[$module['id_module']]['isForAll'] = $module['is_for_all'] === '1';
                $permissions[$module['id_module']]['isSections'] = $module['is_section'] === '1';
            }
        }
        $role->permissions = $permissions;
        return $role;
    }
}
