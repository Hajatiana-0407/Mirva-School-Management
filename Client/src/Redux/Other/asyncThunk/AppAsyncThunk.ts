import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiReturnInitial, ApiReturnType } from "../../../Utils/Types";
import api from "../../../Utils/api";


export const getAllLevelsNoPagination = createAsyncThunk('niveau/getAll-data', async (): Promise<ApiReturnType> => {
    let datas: ApiReturnType = ApiReturnInitial;
    await api.get('admin/niveau', {
        params: { no_pagination: true }
    }).then(response => {
        datas = response.data
    })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
    return datas;
})
export const getAllClassesNoPagination = createAsyncThunk('classe/getAll-data', async (): Promise<ApiReturnType> => {
    let datas: ApiReturnType = ApiReturnInitial;
    await api.get('admin/classe', {
        params: { no_pagination: true }
    }).then(response => {
        datas = response.data
    })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
    return datas;
})
export const getAllSubjectsNoPagination = createAsyncThunk('matiere/getAll-data', async (): Promise<ApiReturnType> => {
    let datas: ApiReturnType = ApiReturnInitial;
    await api.get('admin/matiere', {
        params: { no_pagination: true }
    }).then(response => {
        datas = response.data
    })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
    return datas;
})
export const getAllSchoolYearsNoPagination = createAsyncThunk('school-year/getAll-data', async (): Promise<ApiReturnType> => {
    let datas: ApiReturnType = ApiReturnInitial;
    await api.get('admin/school-year', {
        params: { no_pagination: true }
    }).then(response => {
        datas = response.data
    })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
    return datas;
})