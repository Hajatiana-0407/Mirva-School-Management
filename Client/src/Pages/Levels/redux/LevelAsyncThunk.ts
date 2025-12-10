import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiReturnInitial, ApiReturnType, LevelSubjectType } from "../../../Utils/Types";
import api from "../../../Utils/api";
import { setHiddeModalValue } from "../../../Redux/AppSlice";


// READ
export const getAllLevel = createAsyncThunk('niveau/getAll', async ({ page, query, no_pagination }: { page?: number; query?: any, no_pagination?: boolean }): Promise<ApiReturnType> => {
    let datas: ApiReturnType = ApiReturnInitial;
    await api.get('admin/niveau', {
        params: { page, query, no_pagination }
    }).then(response => {
        datas = response.data
    })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
    return datas;
})

// UPDATE
export const updateLevel = createAsyncThunk('niveau/modification', async ({ level, id }: { level: any, id: number }, { dispatch }): Promise<ApiReturnType> => {
    level.append('id_niveau', id.toString());
    let data: ApiReturnType = ApiReturnInitial;
    await api.post('admin/niveau/update', level).then(response => {
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
export const createLevel = createAsyncThunk('niveau/ajout', async (level: any, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    await api.post('admin/niveau/create', level).then(response => {
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


// LEVEL & SUBJECT 
export const getLelvelSubjectByIdNiveau = createAsyncThunk('niveau/matiere', async (id_niveau: number): Promise<LevelSubjectType[]> => {
    let datas: LevelSubjectType[] = [];
    if (id_niveau) {
        await api.get(`admin/niveau-matiere/${id_niveau}`).then(response => {
            datas = response.data;
        }).catch(error => {
            console.error('Erreur lors de la récupération des données:', error.getMessage());
        });
    }
    return datas;
})


export const registerSubjectLevelCoef = createAsyncThunk('niveau/matiere/coef', async (datas: any) => {
    await api.post(`admin/niveau-matiere/enrigistrer`, datas
    ).then(response => {
        datas = response.data;
    }).catch(error => {
        console.error('Erreur lors de la récupération des données:', error.getMessage());
    });
})


export const getLevelByTeacherId = createAsyncThunk('niveau/enseignant', async (id_prof: number): Promise<ApiReturnType> => {
    let datas: ApiReturnType = ApiReturnInitial;
    if (id_prof) {
        await api.get(`admin/niveau-enseignant/${id_prof}`).then(response => {
            datas = response.data;
        }).catch(error => {
            console.error('( Niveau par prof ) Erreur lors de la récupération des données:', error.getMessage());
        });
    }
    return datas;
})


