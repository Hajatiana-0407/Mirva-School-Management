import { createAsyncThunk } from "@reduxjs/toolkit";
import { TypePersonnelType } from "../../../Utils/Types";
import api from "../../../Utils/api";


export const getAllTypePersonnel = createAsyncThunk('type-personnel/liste', async (): Promise<TypePersonnelType[]> => {
    let datas: TypePersonnelType[] = [];
    await api.get('admin/type-personnel')
        .then(response => {
            datas = response.data
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        }   );
    return datas;
})