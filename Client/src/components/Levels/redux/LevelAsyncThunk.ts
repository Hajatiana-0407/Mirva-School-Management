import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiReturnInitial, ApiReturnType, levelType } from "../../../Utils/Types";
import api from "../../../Utils/api";
import { setHiddeModalValue } from "../../../Redux/AppSlice";


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
export const updateLevel = createAsyncThunk('niveau/modification', async ({ level, id }: { level: levelType, id: number }, { dispatch }): Promise<ApiReturnType> => {

    let data: ApiReturnType = ApiReturnInitial;
    await api.post('admin/niveau/update', {
        ...level,
        id_niveau: id
    }).then(response => {
        data = response.data;
        if (!data.error) {
            dispatch(setHiddeModalValue(true));
        }
    }).catch(error => {
        console.error('Erreur lors de la récupération des données:', error.getMessage());
    });
    return data;
})

// CREATE
export const createLevel = createAsyncThunk('niveau/ajout', async (level: levelType, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    await api.post('admin/niveau/create', {
        ...level,
    }).then(response => {
        data = response.data;
        if (!data.error) {
            dispatch(setHiddeModalValue(true));
        }
    }).catch(error => {
        console.error('Erreur lors de la récupération des données:', error.getMessage());
    });
    return data;
})

// DELETE 
export const deleteLevel = createAsyncThunk('niveau/suppression', async (id_niveau: number, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    if (id_niveau) {
        await api.delete('admin/niveau/delete', {
            data: { id_niveau },
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            data = response.data;
            if (!data.error) {
                dispatch(setHiddeModalValue(true));
            }
        }).catch(error => {
            console.error('Erreur lors de la récupération des données:', error.getMessage());
        });
    }
    return data;
})

