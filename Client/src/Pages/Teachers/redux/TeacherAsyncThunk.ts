import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiReturnInitial, ApiReturnType, EmployeeType } from "../../../Utils/Types";
import api from "../../../Utils/api";
import { setHiddeModalValue } from "../../../Redux/AppSlice";
import { toast } from "react-toastify";


// READ
export const getAllTeachers = createAsyncThunk('enseigant/getAll', async (): Promise<EmployeeType[]> => {
    let datas: EmployeeType[] = [];
    await api.get('admin/teachers')
        .then(response => {
            datas = response.data
        })
        .catch(error => {
            console.error('( Teachers ) Erreur lors de la récupération des données:', error);
        });
    return datas;
})


// Get one by matricule 
export const getTeacherByMatricule = createAsyncThunk('teacher/getOne', async (matricule: string,): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    if (matricule) {
        await api.delete(`admin/teacher/${matricule}`, {
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            data = response.data;
        }).catch(error => {
            console.error('Erreur lors de la récupération:', error.getMessage());
        });
    }
    return data;
})

// CREATE
export const createTeacher = createAsyncThunk('enseignant/ajout', async (datas: any, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    await api.post('admin/teachers/create', datas).then(response => {
        data = response.data;
        if (!data.error) {
            dispatch(setHiddeModalValue(true));
            toast.success('Ajout de l’enseignant effectué !');
        }
    }).catch(error => {
        console.error('Erreur lors de la creation de l\'enseignant :', error.getMessage());
    });
    return data;
})
// UPDATE
export const updateTeacher = createAsyncThunk('enseignant/modification', async ({ datas, id }: { datas: any, id: number }, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;

    datas.append('id_personnel', id.toString());
    await api.post('admin/teachers/update', datas).then(response => {
        data = response.data;
        if (!data.error) {
            dispatch(setHiddeModalValue(true));
            toast.success('Modification effectuée !');
        }
    }).catch(error => {
        console.error('Erreur lors de la Modification :', error.getMessage());
    });
    return data;
})



//? ===================== ASSIGNATIONS CLASSES ET MATIERES  ===================== //
// Get one by matricule 
export const assignationTeacher = createAsyncThunk('teacher/assignations', async (assignations: any,): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    await api.post('admin/teachers/assignations', assignations, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
        data = response.data;
        console.log(data);

    }).catch(error => {
        console.error("Erreur lors de l'assignation de classe et matière :", error.getMessage());
    });
    return data;
})
