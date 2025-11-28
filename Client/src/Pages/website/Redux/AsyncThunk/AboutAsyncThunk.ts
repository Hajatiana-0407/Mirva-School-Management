import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiReturnInitial, ApiReturnType } from "../../../../Utils/Types";
import api from "../../../../Utils/api";
import { setHiddeModalValue } from "../../../../Redux/AppSlice";
import { toast } from "react-toastify";

// -----------------------------------HISTORY SECTION--------------------------------------------- 

export const getAllHistory = createAsyncThunk('histoire/getAll', async (): Promise<ApiReturnType> => {
    let datas: ApiReturnType = ApiReturnInitial;
    await api.get('site/histoire')
        .then(response => {
            datas = response.data
        })
        .catch(error => {
            console.error('( Histoire ) Erreur lors de la récupération des données:', error);
        });
        return datas;
    })

export const updateHistory = createAsyncThunk('histoire/modification', async ({ dataToUpdate, id }: { dataToUpdate: any, id: number }, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;

    dataToUpdate.append('id_histoire', id.toString());
    
    await api.post('site/histoire/update', dataToUpdate, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
        data = response.data;
        if (!data.error) {
            toast('Modification éffectué')
            dispatch(setHiddeModalValue(true));
        }
    }).catch(error => {
        console.error('( Histoire ) Erreur lors de la modification :', error.getMessage());
    });
    return data;
})
// ?-----------------------------------HISTORY SECTION--------------------------------------------- 
// -----------------------------------MISSION SECTION--------------------------------------------- 
export const getAllMission = createAsyncThunk('mission/getAll', async (): Promise<ApiReturnType> => {
    let datas: ApiReturnType = ApiReturnInitial;
    await api.get('site/mission')
        .then(response => {
            datas = response.data
        })
        .catch(error => {
            console.error('( mission ) Erreur lors de la récupération des données:', error);
        });
        return datas;
    })

export const updateMission = createAsyncThunk('mission/modification', async ({ dataToUpdate, id }: { dataToUpdate: any, id: number }, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;

    dataToUpdate.append('id_histoire', id.toString());
    
    await api.post('site/histoire/update', dataToUpdate, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
        data = response.data;
        if (!data.error) {
            toast('Modification éffectué')
            dispatch(setHiddeModalValue(true));
        }
    }).catch(error => {
        console.error('( Histoire ) Erreur lors de la modification :', error.getMessage());
    });
    return data;
})
// -----------------------------------PILIER SECTION--------------------------------------------- 
export const getAllPilier = createAsyncThunk('Pilier/getAll', async (): Promise<ApiReturnType> => {
    let datas: ApiReturnType = ApiReturnInitial;
    await api.get('site/Pilier')
        .then(response => {
            datas = response.data
        })
        .catch(error => {
            console.error('( Pilier ) Erreur lors de la récupération des données:', error);
        });
        return datas;
    })

export const updatePilier = createAsyncThunk('Pilier/modification', async ({ dataToUpdate, id }: { dataToUpdate: any, id: number }, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;

    dataToUpdate.append('id_pilier ', id.toString());
    
    await api.post('site/Pilier/update', dataToUpdate, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
        data = response.data;
        if (!data.error) {
            toast('Modification éffectué')
            dispatch(setHiddeModalValue(true));
        }
    }).catch(error => {
        console.error('( Pilier ) Erreur lors de la modification :', error.getMessage());
    });
    return data;
})


// -----------------------------------INSTALLATION SECTION--------------------------------------------- 
export const getAllInstallation = createAsyncThunk('Installation/getAll', async (): Promise<ApiReturnType> => {
    let datas: ApiReturnType = ApiReturnInitial;
    await api.get('site/Installation')
        .then(response => {
            datas = response.data
        })
        .catch(error => {
            console.error('( Installation ) Erreur lors de la récupération des données:', error);
        });
        return datas;
    })

export const updateInstallation = createAsyncThunk('Installation/modification', async ({ dataToUpdate, id }: { dataToUpdate: any, id: number }, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;

    dataToUpdate.append('id_installation  ', id.toString());
    
    await api.post('site/Installation/update', dataToUpdate, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
        data = response.data;
        if (!data.error) {
            toast('Modification éffectué')
            dispatch(setHiddeModalValue(true));
        }
    }).catch(error => {
        console.error('( Installation ) Erreur lors de la modification :', error.getMessage());
    });
    return data;
})