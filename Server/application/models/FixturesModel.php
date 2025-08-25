<?php
class FixturesModel extends CI_Model
{
    public function insertFixture($table, $data)
    {
        $result = $this->db->insert($table, $data);
        if (!$result) {
            log_message('error', 'Erreur insertion dans ' . $table . ' : ' . json_encode($this->db->error()));
        }
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
}
