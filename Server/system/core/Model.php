<?php
/**
 * CodeIgniter
 *
 * An open source application development framework for PHP
 *
 * This content is released under the MIT License (MIT)
 *
 * Copyright (c) 2019 - 2022, CodeIgniter Foundation
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @package	CodeIgniter
 * @author	EllisLab Dev Team
 * @copyright	Copyright (c) 2008 - 2014, EllisLab, Inc. (https://ellislab.com/)
 * @copyright	Copyright (c) 2014 - 2019, British Columbia Institute of Technology (https://bcit.ca/)
 * @copyright	Copyright (c) 2019 - 2022, CodeIgniter Foundation (https://codeigniter.com/)
 * @license	https://opensource.org/licenses/MIT	MIT License
 * @link	https://codeigniter.com
 * @since	Version 1.0.0
 * @filesource
 */
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Model Class
 *
 * @package		CodeIgniter
 * @subpackage	Libraries
 * @category	Libraries
 * @author		EllisLab Dev Team
 * @link		https://codeigniter.com/userguide3/libraries/config.html
 */
class CI_Model {

	/**
	 * Class constructor
	 *
	 * @link	https://github.com/bcit-ci/CodeIgniter/issues/5332
	 * @return	void
	 */


	protected $table ;
    protected $primaryKey ;

	public function __construct() {}

	/**
	 * __get magic
	 *
	 * Allows models to access CI's loaded classes using the same
	 * syntax as controllers.
	 *
	 * @param	string	$key
	 */
	public function __get($key)
	{
		// Debugging note:
		//	If you're here because you're getting an error message
		//	saying 'Undefined Property: system/core/Model.php', it's
		//	most likely a typo in your model code.
		return get_instance()->$key;
	}

	/**
	 * Verification de doublan
	 *
	 * @param array $champs [ column => value  ]
	 * @param [type] $id ( id a exclure )
	 * @return boolean
	 */
    public function isExist($champs = [], $id = null)
    {
        $query = $this->db;
        $i = 0;
        $query->where($this->primaryKey . ' <>', $id);
        foreach ($champs as $key => $value) {
            if ($i == 0) {
                $query->where($key, $value);
            } else {
                $query->or_where($key, $value);
            }
            $i++;
        }
        $data = $query->get($this->table)->result();
        if (count($data)) {
            return true;
        }
        return false;
    }



	// * fonctions CRUD * //
	// ======= READ =======
    public function findAll()
    {
        return $this->db->select('*')
            ->from($this->table)
            ->order_by($this->primaryKey, 'DESC')
            ->get()
            ->result_array();
    }

    public function findOneById($id)
    {
        if ( !!!$id )  return null ;
        return $this->db->select('*')
            ->from($this->table)
            ->where($this->primaryKey, $id)
            ->get()
            ->row_array();
    }

    // ======= CREATE =======
    public function insert($data)
    {
        $inserted = $this->db->insert($this->table, $data);

         if ($inserted) {
            $inserted_id = $this->db->insert_id();

            return $this->findOneById($inserted_id);
        }

        return false;
    }

    // ======= UPDATE =======
    public function update($id, $data)
    {
        $updated =  $this->db->where($this->primaryKey, $id)
            ->update($this->table, $data);
        if ($updated) {
            return  $this->findOneById($id);
        }
        return $updated;
    }

    // ======= DELETE =======
    public function delete($id)
    {
        $element = $this->db
            ->get_where($this->table, [$this->primaryKey => $id])
            ->row();
        if ($element) {
            $deleted = $this->db
                ->where($this->primaryKey, $id)
                ->delete($this->table);

            if ($deleted) {
                return $id;
            }
        }
        return false;
    }

   

    // ======= INSERT BATCH =======
    public function insertBatch($data = [])
    {
        return $this->db->insert_batch($this->table, $data);
    }

}
