<?php
class FixturesModel extends CI_Model
{
    public function insertFixture($table, $data)
    {
        $result = $this->db->insert($table, $data);
        if (!$result) {
            log_message('error', 'Erreur insertion dans ' . $table . ' : ' . json_encode($this->db->error()));
        }
        return $this->db->insert_id();
    }

    public function getIds($table, $idField)
    {
        return array_map(function ($row) use ($idField) {
            return $row[$idField];
        }, $this->db->select($idField)->get($table)->result_array());
    }

    public function emptyDb($tables)
    {
        foreach ($tables as $table) {
            $this->db->empty_table($table);
        }
    }

    public function getAllTable($table = '')
    {
        if (!!!$table) return null;
        return $this->db->select('*')
            ->from($table)
            ->get()
            ->result_array();
    }



    // Enseignats
    public function getAllIdTeacher()
    {
        $listes =  $this->db->select('p.id_personnel')
            ->from('personnel p')
            ->join('type_personnel tp', 'tp.id_type_personnel = p.id_type_personnel', 'inner')
            ->where('tp.type', 'Enseignant')
            ->get()
            ->result_array();

        $teachersId = [];
        if (count($listes)) {
            foreach ($listes as  $liste) {
                $teachersId[] = $liste['id_personnel'];
            }
        }

        return $teachersId;
    }

    // assignations 
    public function getAssignationByTeacher($id_teacher = null)
    {
        if (!!!$id_teacher) return null;
        return $this->db->select('cpm.professeur_id_professeur as id_prof, cpm.matiere_id_matiere as id_matiere , c.niveau_id_niveau as id_niveau')
            ->from('classe_proffesseur_matiere cpm')
            ->join('classe c', 'c.id_classe = cpm.classe_id_classe', 'inner')
            ->where('professeur_id_professeur', $id_teacher)
            ->get()
            ->result_array();
    }



    public function insertBatchFixtures($data = [], $table = '')
    {
        if (empty($data) && !!!$table) {
            return [];
        }
        $result = $this->db->insert_batch($table, $data);

        if ($result === false) {
            return [];
        }

        $insertedData = [];
        $insertId = $this->db->insert_id();
        foreach ($data as $index => $row) {
            $row[$this->primaryKey] = $insertId + $index;
            $insertedData[] = $row;
        }

        return $insertedData;
    }
}
