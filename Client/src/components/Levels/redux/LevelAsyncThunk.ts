import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiReturnInitial, ApiReturnType,  levelType } from "../../../Utils/Types";
import api from "../../../Utils/api";

// READ
export const getAllLevel = createAsyncThunk('niveau/getAll', async (): Promise<levelType[]> => {
    let datas: levelType[] = [];
    await api.get('admin/niveau')
        .then(response => {
            datas = response.data
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
    return datas;
})

// UPDATE
export const updateLevel = createAsyncThunk('niveau/modification', async ({ level, id }: { level: levelType, id: number }): Promise<ApiReturnType> => {

    let data: ApiReturnType = ApiReturnInitial ;
    await api.post('admin/niveau/update', {
        ...level,
        id_niveau: id
    }).then(response => {
        data = response.data 
    }).catch(error => {
        console.error('Erreur lors de la récupération des données:', error.getMessage());
    });
    return data ;
})

