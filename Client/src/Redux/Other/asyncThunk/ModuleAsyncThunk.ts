import { createAsyncThunk } from "@reduxjs/toolkit";
import { ModuleType } from "../../../Utils/Types";
import api from "../../../Utils/api";


export const getAllModule = createAsyncThunk('Module/getAll', async (): Promise<ModuleType[]> => {
    let datas: ModuleType[] = [];
    await api.get('admin/module')
        .then(response => {
            datas = response.data
        })
        .catch(error => {
            console.error('( Modules ) Erreur lors de la récupération des données:', error);
        });
    return datas;
})