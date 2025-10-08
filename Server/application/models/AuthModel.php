<?php
defined('BASEPATH') or exit('No direct script access allowed');

class AuthModel extends CI_Model
{
    protected $table = '';
    protected $primaryKey = '';

    public function __construct()
    {
        parent::__construct();
    }


    // ? ===================== LOGIN USER ===================== //
    public function get_by_email($email)
    {
        $user = [];
        $admin  = $this->db->select('*')
            ->from('users')
            ->where('email', $email)
            ->get()
            ->row();
        if ($admin) {
            // ===================== Administrateur ===================== //
            $user = [
                'id' => $admin->id_user,
                'email' => $admin->email,
                'password' => $admin->password,
                'role' => 'admin',
                'is_active' => true,
                'nom' => 'Administrateur',
            ];
        } else {
            // ===================== Enseignats ===================== //
            $enseignant = $this->db->select('*')
                ->from('personnel')
                ->join('type_personnel', 'type_personnel.id_type_personnel = personnel.id_type_personnel', 'inner')
                ->where('email', $email)
                ->where('type', 'Enseignant')
                ->get()
                ->row();
            if ($enseignant) {
                $user = [
                    'id' => $enseignant->id_personnel,
                    'email' => $enseignant->email,
                    'password' => $enseignant->password,
                    'role' => 'enseignant',
                    'is_active' => $enseignant->is_active,
                    'nom' => $enseignant->nom . ' ' . $enseignant->prenom,
                ];
            } else {
                // ===================== Etudiant ===================== //
                $eleve = $this->db->select('*')
                    ->from('eleve')
                    ->where('email', $email)
                    ->get()
                    ->row();
                if ($eleve) {
                    $user = [
                        'id' => $eleve->id_eleve,
                        'email' => $eleve->email,
                        'password' => $eleve->password,
                        'role' => 'eleve',
                        'is_active' => $eleve->is_active,
                        'nom' => $eleve->nom . ' ' . $eleve->prenom,
                    ];
                }
            }
        }

        return $user;
    }
}
