import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiReturnInitial, ApiReturnType, SubjectType } from "../../../Utils/Types";
import api from "../../../Utils/api";
import { setHiddeModalValue } from "../../../Redux/AppSlice";


// READ
export const getAllSubject = createAsyncThunk('matiere/getAll', async (): Promise<SubjectType[]> => {
    let datas: SubjectType[] = [];
    await api.get('admin/matiere')
        .then(response => {
            datas = response.data
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
    return datas;
})

// UPDATE
export const updateSubject = createAsyncThunk('matiere/modification', async ({ subject, id }: { subject: any , id: number }, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;

    subject.append('id_matiere', id.toString());
    
    await api.post('admin/matiere/update', subject, {
        headers: { 'Content-Type': 'multipart/form-data' }
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
export const createSubject = createAsyncThunk('matiere/ajout', async (subject: SubjectType, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    await api.post('admin/matiere/create', 
        subject
    ).then(response => {
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
export const deleteSubject = createAsyncThunk('matiere/suppression', async (id_matiere: number, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    if (id_matiere) {
        await api.delete('admin/matiere/delete', {
            data: { id_matiere },
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

