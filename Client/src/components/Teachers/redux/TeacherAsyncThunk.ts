import { createAsyncThunk } from "@reduxjs/toolkit";
import { EmployeeType } from "../../../Utils/Types";
import api from "../../../Utils/api";


// READ
export const getAllTeachers = createAsyncThunk('enseigant/getAll', async (): Promise<EmployeeType[]> => {
    let datas: EmployeeType[] = [];
    await api.get('admin/teachers')
        .then(response => {
            datas = response.data
        })
        .catch(error => {
            console.error('( Teachers ) Erreur lors de la récupération des données:', error);
        });
    return datas;
})
