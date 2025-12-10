import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiReturnInitial, ApiReturnType } from "../../../Utils/Types";
import api from "../../../Utils/api";
import { setHiddeModalValue } from "../../../Redux/AppSlice";
import { toast } from "react-toastify";


// READ
export const getAllParent = createAsyncThunk('parent/getAll', async ({ page, query, no_pagination }: { page?: number; query?: any, no_pagination?: boolean }): Promise<ApiReturnType> => {
    let datas: ApiReturnType = ApiReturnInitial;
    await api.get('admin/parent', {
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
export const filterParent= createAsyncThunk(
    'parent/filter',
    async ({ page = 1, filter }: { page?: number; filter?: FormData }): Promise<ApiReturnType> => {
        let datas: ApiReturnType = ApiReturnInitial;
        filter?.append('page', String(page));

        try {
            const response = await api.post('filtre/parent', filter);
            datas = response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
        return datas;
    }
);

// UPSERT
export const upsertParent = createAsyncThunk('parent/upsert', async (parentData: any, { dispatch }): Promise<ApiReturnType> => {

    let data: ApiReturnType = ApiReturnInitial;
    await api.post('admin/parent/upsert', parentData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
        data = response.data;
        if (!data.error) {
            toast('Opération effectuée !');
            dispatch(setHiddeModalValue(true));
        }
    }).catch(error => {
        console.error('Erreur lors de la Modification:', error.getMessage());
    });
    return data;
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
            toast('Modification effectuée !');
            dispatch(setHiddeModalValue(true));
        }
    }).catch(error => {
        console.error('Erreur lors de la Modification:', error.getMessage());
    });
    return data;
})

// // CREATE
// export const createParent = createAsyncThunk('parent/ajout', async (parent: ParentType, { dispatch }): Promise<ApiReturnType> => {
//     let data: ApiReturnType = ApiReturnInitial;
//     await api.post('admin/parent/create',
//         parent
//     ).then(response => {
//         data = response.data;
//         if (!data.error) {
//             dispatch(setHiddeModalValue(true));
//         }
//     }).catch(error => {
//         console.error('Erreur lors de la Creation :', error.getMessage());
//     });
//     return data;
// })

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
                toast('Suppression effectuée !');
                dispatch(setHiddeModalValue(true));
            }
        }).catch(error => {
            console.error('Erreur lors de la suppréssion :', error.getMessage());
        });
    }
    return data;
})

