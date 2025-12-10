import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiReturnInitial, ApiReturnType } from "../../../Utils/Types";
import api from "../../../Utils/api";
import { setHiddeModalValue } from "../../../Redux/AppSlice";
import { toast } from "react-toastify";


// READ
export const getAllEmployees = createAsyncThunk('personnel/getAll', async ({ page, query, no_pagination }: { page?: number; query?: any, no_pagination?: boolean }): Promise<ApiReturnType> => {
    let datas: ApiReturnType = ApiReturnInitial;
    await api.get('admin/personnel', {
        params: { page, query, no_pagination }
    })
        .then(response => {
            datas = response.data
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
    return datas;
})

// UPDATE
export const updateEmployees = createAsyncThunk('personnel/modification', async ({ datas, id }: { datas: any, id: number }, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;

    datas.append('id_personnel', id.toString());
    await api.post('admin/personnel/update', datas).then(response => {
        data = response.data;
        if (!data.error) {
            dispatch(setHiddeModalValue(true));
            toast('Modification effectuée !');
        }
    }).catch(error => {
        console.error('Erreur lors de la récupération des données:', error.getMessage());
    });
    return data;
})

// CREATE
export const createEmployees = createAsyncThunk('personnel/ajout', async (datas: any, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    await api.post('admin/personnel/create', datas).then(response => {
        data = response.data;
        if (!data.error) {
            dispatch(setHiddeModalValue(true));
            toast('Employé ajoutée !');
        }
    }).catch(error => {
        console.error('Erreur lors de la récupération des données:', error.getMessage());
    });
    return data;
})

// DELETE 
export const deleteEmployees = createAsyncThunk('personnel/suppression', async (id_personnel: number, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    if (id_personnel) {
        await api.delete('admin/personnel/delete', {
            data: { id_personnel },
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            data = response.data;
            if (!data.error) {
                dispatch(setHiddeModalValue(true));
                toast('Suppression effectuée');
            }
        }).catch(error => {
            console.error('Erreur lors de la récupération des données:', error.getMessage());
        });
    }
    return data;
})



// Get one by matricule 
export const getEmployeByMatricule = createAsyncThunk('personnel/getOne', async (matricule: string,): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    if (matricule) {
        await api.delete(`admin/personnel/${matricule}`, {
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            data = response.data;
        }).catch(error => {
            console.error('Erreur lors de la récupération:', error.getMessage());
        });
    }
    return data;
})
