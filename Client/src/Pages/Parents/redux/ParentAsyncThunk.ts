import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiReturnInitial, ApiReturnType, ParentType } from "../../../Utils/Types";
import api from "../../../Utils/api";
import { setHiddeModalValue } from "../../../Redux/AppSlice";


// READ
export const getAllParent = createAsyncThunk('parent/getAll', async (): Promise<ParentType[]> => {
    let datas: ParentType[] = [];
    await api.get('admin/parent')
        .then(response => {
            datas = response.data
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
    return datas;
})

// UPDATE
export const updateParent = createAsyncThunk('parent/modification', async ({ parent, id }: { parent: any, id: number }, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;

    parent.append('id_parent', id.toString());

    await api.post('admin/parent/update', parent, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
        data = response.data;
        if (!data.error) {
            dispatch(setHiddeModalValue(true));
        }
    }).catch(error => {
        console.error('Erreur lors de la Modification:', error.getMessage());
    });
    return data;
})

// CREATE
export const createParent = createAsyncThunk('parent/ajout', async (parent: ParentType, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    await api.post('admin/parent/create',
        parent
    ).then(response => {
        data = response.data;
        if (!data.error) {
            dispatch(setHiddeModalValue(true));
        }
    }).catch(error => {
        console.error('Erreur lors de la Creation :', error.getMessage());
    });
    return data;
})

// DELETE 
export const deleteParent = createAsyncThunk('parent/suppression', async (id_parent: number, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    if (id_parent) {
        await api.delete('admin/parent/delete', {
            data: { id_parent },
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            data = response.data;
            if (!data.error) {
                dispatch(setHiddeModalValue(true));
            }
        }).catch(error => {
            console.error('Erreur lors de la suppréssion :', error.getMessage());
        });
    }
    return data;
})

