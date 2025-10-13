import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiReturnInitial, ApiReturnType, StudentType } from "../../../Utils/Types";
import api from "../../../Utils/api";
import { setHiddeModalValue } from "../../../Redux/AppSlice";
import { toast } from "react-toastify";


// STATISTIQUE
export const getStatistique = createAsyncThunk('etudiant/getStatistique', async (): Promise<any> => {
    let datas: any;
    await api.get('admin/etudiant/statistique')
        .then(response => {
            datas = response.data
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
    return datas;
})

// READ
export const getAllStudent = createAsyncThunk('etudiant/getAll', async (): Promise<StudentType[]> => {
    let datas: StudentType[] = [];
    await api.get('admin/etudiant')
        .then(response => {
            datas = response.data
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
    return datas;
})

export const getStudentByMatricule = createAsyncThunk('etudiant/getOne', async (matricule: string): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial ;
    await api.get(`admin/etudiant/${matricule}`)
        .then(response => {
            data.data = response.data
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
    return data;
})

// UPDATE
export const updateStudent = createAsyncThunk('etudiant/modification', async ({ student, id }: { student: any, id: number }, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    student.append('id_eleve', id.toString());
    await api.post('admin/etudiant/update', student, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
        data = response.data;
        if (!data.error) {
            dispatch(setHiddeModalValue(true));
            toast.success('Modification effectuée');
        }
    }).catch(error => {
        console.error('Erreur lors de la Modification:', error.getMessage());
    });
    return data;
})

// CREATE
export const createStudent = createAsyncThunk('etudiant/ajout', async (student: StudentType, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    await api.post('admin/etudiant/create',
        student
    ).then(response => {
        data = response.data;
        if (!data.error) {
            dispatch(setHiddeModalValue(true));
            toast.success('effectuée');
        }
    }).catch(error => {
        console.error('Erreur lors de l\'ajout :', error.getMessage());
    });
    return data;
})

// DELETE 
export const deleteStudent = createAsyncThunk('etudiant/suppression', async (id_eleve: number, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    if (id_eleve) {
        await api.delete('admin/etudiant/delete', {
            data: { id_eleve },
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            data = response.data;
            if (!data.error) {
                toast.success('Suppression effectuée');
                dispatch(setHiddeModalValue(true));
            }
        }).catch(error => {
            console.error('Erreur lors de la suppréssion :', error.getMessage());
        });
    }
    return data;
})


