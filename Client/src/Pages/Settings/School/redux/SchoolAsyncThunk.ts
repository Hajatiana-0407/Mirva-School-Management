import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiReturnInitial, ApiReturnType,SchoolInfoInitialValue, ShoolInfoType } from "../../../../Utils/Types";
import api from "../../../../Utils/api";
import { toast } from "react-toastify";


// READ
export const getSchoolInfo = createAsyncThunk('school/getInfo', async (): Promise<ShoolInfoType> => {
    let datas: ShoolInfoType = SchoolInfoInitialValue 
    await api.get('admin/school')
        .then(response => {
            datas = response.data
        })
        .catch(error => {
            console.error('( etablissement ) Erreur lors de la récupération des données:', error);
        });
    return datas;
})

// UPDATE
export const updateSchoolInfo = createAsyncThunk('school/modification', async ({ schoolInfo , id }: { schoolInfo : any , id: number }): Promise<ApiReturnType> => {
    schoolInfo.append('id_etablissement', id.toString());
    let data: ApiReturnType = ApiReturnInitial;
    
    await api.post('admin/school/update', schoolInfo ).then(response => {
        data = response.data;
        if (!data.error) {
            toast("Modification avec succès !");
        }
    }).catch(error => {
        console.error('( Etablissement modification ) Erreur lors de la récupération des données:', error.getMessage());
    });
    return data;
})
