<?php 
class MatiereClasseProfModel extends CI_Model {
    protected $table = 'classe_professeur_matier';
    protected $pk = 'classe_id_classe';

    public function __construct() {
        parent::__construct();
    }
}