import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiReturnInitial, ApiReturnType, RoleType } from "../../../../Utils/Types";
import api from "../../../../Utils/api";
import { toast } from "react-toastify";
import { setHiddeModalValue } from "../../../../Redux/AppSlice";


// READ
export const getAllRole = createAsyncThunk('role/getAll', async (): Promise<RoleType[]> => {
    let datas: RoleType[] = [];
    await api.get('admin/role')
        .then(response => {
            datas = response.data
        })
        .catch(error => {
            console.error('( Role ) Erreur lors de la récupération des données:', error);
        });
    return datas;
})



// CREATE
export const createRole = createAsyncThunk('role/ajout', async (role: any, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    await api.post('admin/role/create', role)
        .then(response => {
            data = response.data;
            if (!data.error) {
                toast('Ajout effectué.')
                dispatch(setHiddeModalValue(true));
            }
        })
        .catch(error => {
            console.error('( Role) Erreur lors de la création:', error.getMessage());
        });
    return data;
});


// UPDATE
export const updateRole = createAsyncThunk('role/modification', async ({ role, id }: { role: any, id: number }, { dispatch }): Promise<ApiReturnType> => {
    role.append('id_role', id.toString());
    let data: ApiReturnType = ApiReturnInitial;

    await api.post('admin/role/update', role).then(response => {
        data = response.data;
        if (!data.error) {
            toast("Modification avec succès !");
            dispatch(setHiddeModalValue(true));
        }
    }).catch(error => {
        console.error('( Role ) Erreur lors de la Modification :', error.getMessage());
    });
    return data;
})


// DELETE
export const deleteRole = createAsyncThunk('role/suppression', async (id_role: number): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    if (id_role) {
        await api.delete('admin/role/delete', {
            data: { id_role },
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            data = response.data;
            if (!data.error) {
                toast("Suppression effectuée.");
            }
        }).catch(error => {
            console.error('Erreur lors de la récupération des données:', error.getMessage());
        });
    }
    return data;
});