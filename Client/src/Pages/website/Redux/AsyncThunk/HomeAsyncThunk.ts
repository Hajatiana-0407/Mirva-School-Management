import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiReturnInitial, ApiReturnType } from "../../../../Utils/Types";
import api from "../../../../Utils/api";


// Hero 
export const getAllHero = createAsyncThunk('hero/getAll', async (): Promise<ApiReturnType> => {
    let datas: ApiReturnType = ApiReturnInitial;
    await api.get('site/hero')
        .then(response => {
            datas = response.data
        })
        .catch(error => {
            console.error('( Hero ) Erreur lors de la récupération des données:', error);
        });
    return datas;
})

// Welcome 
export const getAllPresentation = createAsyncThunk('presentation/getAll', async (): Promise<ApiReturnType> => {
    let datas: ApiReturnType = ApiReturnInitial;
    await api.get('site/presentation')
        .then(response => {
            datas = response.data
        })
        .catch(error => {
            console.error('( Presentation ) Erreur lors de la récupération des données:', error);
        });
    return datas;
})