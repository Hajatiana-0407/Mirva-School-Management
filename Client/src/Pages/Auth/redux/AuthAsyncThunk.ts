import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiReturnInitial, ApiReturnType } from '../../../Utils/Types';
import api from '../../../Utils/api';
import { toast } from 'react-toastify';


export const loginUser = createAsyncThunk('login', async (login: any): Promise<ApiReturnType> => {
    let returnData: ApiReturnType = ApiReturnInitial;
    await api.post('auth/login', login, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
        const res = response.data;
        if (res.error) {
            returnData = { error: true, message: res.message, data: null };
        } else {
            returnData = { error: false, data: res.data };
        }

    }).catch(error => {
        console.error('Erreur lors de la Modification:', error.getMessage());
    });
    return returnData
})


// Modification d'identifiant et mot de passe 
export const updateAccount = createAsyncThunk('update/account', async (account: any): Promise<ApiReturnType> => {
    let returnData: ApiReturnType = ApiReturnInitial;
    await api.post('auth/update/account', account, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
        returnData = response.data;
        if (!returnData.error) {
            toast.success('Modification effectué')
        }
    }).catch(error => {
        console.error('Erreur lors de la Modification:', error.getMessage());
    });
    return returnData
})