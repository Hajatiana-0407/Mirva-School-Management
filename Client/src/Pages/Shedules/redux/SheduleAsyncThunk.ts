import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiReturnInitial, ApiReturnType } from "../../../Utils/Types";
import api from "../../../Utils/api";
import { setHiddeModalValue } from "../../../Redux/AppSlice";
import { toast } from "react-toastify";


// READ
export const getAllShedule = createAsyncThunk('shedule/getAll', async ({ page, query, no_pagination }: { page?: number; query?: any, no_pagination?: boolean }): Promise<ApiReturnType> => {
    let datas: ApiReturnType = ApiReturnInitial;
    await api.get('admin/emploi-du-temps', {
        params: { page, query, no_pagination }
    }).then(response => {
        datas = response.data
    })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
    return datas;
})

export const filterShedule = createAsyncThunk(
    'emploi_du_temps/filter',
    async ({ page = 1, filter }: { page?: number; filter?: FormData }): Promise<ApiReturnType> => {
        let datas: ApiReturnType = ApiReturnInitial;
        filter?.append('page', String(page));
        console.log(filter);

        try {
            const response = await api.post('filtre/emploi_du_temps', filter);
            datas = response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
        return datas;
    }
);

// UPDATE
export const updateShedule = createAsyncThunk('shedule/modification', async ({ Shedule, id }: { Shedule: any, id: number }, { dispatch }): Promise<ApiReturnType> => {

    let data: ApiReturnType = ApiReturnInitial;
    Shedule.append('id_adt', id.toString());
    await api.post('admin/emploi-du-temps/update', Shedule).then(response => {
        data = response.data;
        if (!data.error) {
            dispatch(setHiddeModalValue(true));
            toast('Modification effectuée !');
        }
    }).catch(error => {
        console.error('( Shedule ) Erreur lors de la récupération des données:', error.getMessage());
    });
    return data;
})

// CREATE
export const createShedule = createAsyncThunk('shedule/ajout', async (Shedule: any, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    await api.post('admin/emploi-du-temps/create', Shedule).then(response => {
        data = response.data;
        if (!data.error) {
            toast('Ajout du cours effectué');
            dispatch(setHiddeModalValue(true));
        }
    }).catch(error => {
        console.error('Erreur lors de la récupération des données:', error.getMessage());
    });
    return data;
})

// DELETE 
export const deleteShedule = createAsyncThunk('shedule/suppression', async ({ id_edt, id_classe, id_personnel }: { id_edt: number; id_classe?: number, id_personnel?: number }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    if (id_edt) {
        await api.delete('admin/emploi-du-temps/delete', {
            data: { id_edt, id_classe, id_personnel },
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            data = response.data;
            if (!data.error) {
                toast('Suppression effectuée.');
            }
        }).catch(error => {
            console.error('Erreur lors de la récupération des données:', error.getMessage());
        });
    }
    return data;
})



// Get All assignation by classe 
export const getAssignationByClasseId = createAsyncThunk('shedule/get-assignation-by-classe', async (id_classe: number): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    await api.get('admin/assignation-by-classe/' + id_classe).then(response => {
        data = response.data;
    }).catch(error => {
        console.error('( Shedule ) Erreur lors de la récupération des données:', error.getMessage());
    });
    return data;
})
// Get All assignation by classe 
export const getAssignationByTeacherId = createAsyncThunk('shedule/get-assignation-by-classe', async (id_teacher: number): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    await api.get('admin/assignation-by-teacher/' + id_teacher).then(response => {
        data = response.data;
    }).catch(error => {
        console.error('( Shedule ) Erreur lors de la récupération des données:', error.getMessage());
    });
    return data;
})
