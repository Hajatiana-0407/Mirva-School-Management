<?php
defined('BASEPATH') or exit('No direct script access allowed');

class AuthModel extends CI_Model
{
    protected $table = 'users';
    protected $primaryKey = 'id_user';

    public function __construct()
    {
        parent::__construct();
    }

    // ? ===================== LOGIN USER ===================== //
    public function login($identifiant = '')
    {
        if (!!!$identifiant) return null;
        // ? Selection du compte 
        $user  = $this->db->select('u.* , r.nom as role')
            ->from($this->table . ' u')
            ->join('roles r', 'r.id_role = u.id_role', 'inner')
            ->where('u.identifiant', $identifiant)
            ->get()
            ->row();
        $info  = null;

        // ? Selection de information sur l'utilisateur ( parent , eleve ou personnel)
        $response =  $response = [
            'user' => $user,
            'info' => null,
            'permissions' => null,
        ];;
        if ($user) {
            // Personnel 
            if (!!$user->id_personnel) {
                $info =  $this->db->select('p.id_personnel,  p.nom , p.prenom , p.photo , p.matricule_personnel as matricule')
                    ->from('personnel p')
                    ->where('id_personnel',  $user->id_personnel)
                    ->get()
                    ->row();
            }
            // Etudiant 
            if (!!$user->id_eleve) {
                $info =  $this->db->select('e.id_eleve , e.nom , e.prenom , e.photo , e.matricule_etudiant as matricule')
                    ->from('eleve e')
                    ->where('id_eleve',  $user->id_eleve)
                    ->get()
                    ->row();
            }
            // Parent
            if (!!$user->id_parent !== null) {
                $info =  $this->db->select('p.id_parent ,  p.nom , p.prenom')
                    ->from('parents p')
                    ->where('id_parent',  $user->id_parent)
                    ->get()
                    ->row();
            }

            if ($user->id_eleve === null)
                unset($user->id_eleve);
            if ($user->id_parent === null)
                unset($user->id_parent);
            if ($user->id_personnel === null)
                unset($user->id_personnel);

            // Cherche les role et les permission d'acces pour l'utilisateur 
            $permissions = [];
            $modules = $this->db->select('*')
                ->from('modules')
                ->get()
                ->result_array();
            foreach ($modules as  $module) {
                $role_permission  = $this->db->select('can_read as read , can_create as create , can_update as update , can_delete as delete')
                    ->from('role_permissions ')
                    ->where('id_role', $user->id_role)
                    ->where('id_module', $module['id_module'])
                    ->get()
                    ->row();

                $permissions[$module['nom']]['create'] = $role_permission->create === '1';
                $permissions[$module['nom']]['read'] = $role_permission->read  === '1';
                $permissions[$module['nom']]['update'] = $role_permission->update  === '1';
                $permissions[$module['nom']]['delete'] = $role_permission->delete  === '1';
            }

            $response['info'] =  $info;
            $response['permissions'] = $permissions;
        }
        return $response;
    }

    public function findOneById($identifiant)
    {
        if (!!!$identifiant) return null;
        if (!!!$identifiant) return null;
        // ? Selection du compte 
        $user  = $this->db->select('u.* , r.nom as role')
            ->from($this->table . ' u')
            ->join('roles r', 'r.id_role = u.id_role', 'inner')
            ->where('u.id_user', $identifiant)
            ->get()
            ->row();
        $info  = null;

        // ? Selection de information sur l'utilisateur ( parent , eleve ou personnel)
        $response =  $response = [
            'user' => $user,
            'info' => null,
            'permissions' => null,
        ];;
        if ($user) {
            // Personnel 
            if (!!$user->id_personnel) {
                $info =  $this->db->select('p.id_personnel,  p.nom , p.prenom , p.photo , p.matricule_personnel as matricule')
                    ->from('personnel p')
                    ->where('id_personnel',  $user->id_personnel)
                    ->get()
                    ->row();
            }
            // Etudiant 
            if (!!$user->id_eleve) {
                $info =  $this->db->select('e.id_eleve , e.nom , e.prenom , e.photo , e.matricule_etudiant as matricule')
                    ->from('eleve e')
                    ->where('id_eleve',  $user->id_eleve)
                    ->get()
                    ->row();
            }
            // Parent
            if (!!$user->id_parent !== null) {
                $info =  $this->db->select('p.id_parent ,  p.nom , p.prenom')
                    ->from('parents p')
                    ->where('id_parent',  $user->id_parent)
                    ->get()
                    ->row();
            }

            if ($user->id_eleve === null)
                unset($user->id_eleve);
            if ($user->id_parent === null)
                unset($user->id_parent);
            if ($user->id_personnel === null)
                unset($user->id_personnel);

            // Cherche les role et les permission d'acces pour l'utilisateur 
            $permissions = [];
            $modules = $this->db->select('*')
                ->from('modules')
                ->get()
                ->result_array();
            foreach ($modules as  $module) {
                $role_permission  = $this->db->select('can_read as read , can_create as create , can_update as update , can_delete as delete')
                    ->from('role_permissions ')
                    ->where('id_role', $user->id_role)
                    ->where('id_module', $module['id_module'])
                    ->get()
                    ->row();

                $permissions[$module['nom']]['create'] = $role_permission->create === '1';
                $permissions[$module['nom']]['read'] = $role_permission->read  === '1';
                $permissions[$module['nom']]['update'] = $role_permission->update  === '1';
                $permissions[$module['nom']]['delete'] = $role_permission->delete  === '1';
            }
            $response['info'] =  $info;
            $response['permissions'] = $permissions;
        }
        return $response;
    }
}
