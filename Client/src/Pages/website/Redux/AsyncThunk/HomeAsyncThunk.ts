import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiReturnInitial, ApiReturnType } from "../../../../Utils/Types";
import api from "../../../../Utils/api";
import { setHiddeModalValue } from "../../../../Redux/AppSlice";
import { toast } from "react-toastify";


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


export const createSlide = createAsyncThunk('slide/ajout', async (subject: any, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    await api.post('site/hero/create', 
        subject
    ).then(response => {
        data = response.data;
        if (!data.error) {
            toast('Slide ajoutée !');
            dispatch(setHiddeModalValue(true));
        }
    }).catch(error => {
        console.error('( Hero ) Erreur lors de la récupération des données:', error.getMessage());
    });
    return data;
})


export const updateSlide = createAsyncThunk('slide/modification', async ({ dataToUpdate, id }: { dataToUpdate: any, id: number }, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;

    dataToUpdate.append('id_slide', id.toString());

    await api.post('site/hero/update', dataToUpdate, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
        data = response.data;
        if (!data.error) {
            toast('Modification éffectué')
            dispatch(setHiddeModalValue(true));
        }
    }).catch(error => {
        console.error('Erreur lors de la récupération des données:', error.getMessage());
    });
    return data;
})


export const deleteSlide = createAsyncThunk('slide/suppression', async (id_slide: number, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    if (id_slide) {
        await api.delete('site/hero/delete', {
            data: { id_slide },
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            data = response.data;
            if (!data.error) {
                 toast('Suppression effectuée');
                dispatch(setHiddeModalValue(true));
            }
        }).catch(error => {
            console.error('( Hero ) Erreur lors de la récupération des données:', error.getMessage());
        });
    }
    return data;
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

// Value
export const getAllValue = createAsyncThunk('valeur/getAll', async (): Promise<ApiReturnType> => {
    let datas: ApiReturnType = ApiReturnInitial;
    await api.get('site/valeur')
        .then(response => {
            datas = response.data
        })
        .catch(error => {
            console.error('( valeur ) Erreur lors de la récupération des données:', error);
        });
    return datas;
})