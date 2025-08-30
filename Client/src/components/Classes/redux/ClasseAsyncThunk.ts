import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiReturnInitial, ApiReturnType, ClasseType, LevelSubjectType } from "../../../Utils/Types";
import api from "../../../Utils/api";
import { setHiddeModalValue } from "../../../Redux/AppSlice";


// READ
export const getAllClasse = createAsyncThunk('classe/getAll', async (): Promise<ClasseType[]> => {
    let datas: ClasseType[] = [];
    await api.get('admin/classe')
        .then(response => {
            datas = response.data
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
    return datas;
})

// UPDATE
export const updateClasse = createAsyncThunk('classe/modification', async ({ Classe, id }: { Classe: any, id: number }, { dispatch }): Promise<ApiReturnType> => {

    let data: ApiReturnType = ApiReturnInitial;
    Classe.append('id_classe', id.toString());
    await api.post('admin/classe/update', Classe).then(response => {
        data = response.data;
        if (!data.error) {
            dispatch(setHiddeModalValue(true));
        }
    }).catch(error => {
        console.error('Erreur lors de la récupération des données:', error.getMessage());
    });
    return data;
})

// CREATE
export const createClasse = createAsyncThunk('classe/ajout', async (Classe: ClasseType, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    await api.post('admin/classe/create', Classe).then(response => {
        data = response.data;
        if (!data.error) {
            dispatch(setHiddeModalValue(true));
        }
    }).catch(error => {
        console.error('Erreur lors de la récupération des données:', error.getMessage());
    });
    return data;
})

// DELETE 
export const deleteClasse = createAsyncThunk('classe/suppression', async (id_classe: number, { dispatch }): Promise<ApiReturnType> => {
    let data: ApiReturnType = ApiReturnInitial;
    if (id_classe) {
        await api.delete('admin/classe/delete', {
            data: { id_classe },
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            data = response.data;
            if (!data.error) {
                dispatch(setHiddeModalValue(true));
            }
        }).catch(error => {
            console.error('Erreur lors de la récupération des données:', error.getMessage());
        });
    }
    return data;
})


// Get niveaux matieres by id_matiere
export const getSubjectLevelByIdSubject = createAsyncThunk('niveau/matiere/subject', async (id_matiere: number): Promise<ClasseType[]> => {
    let datas: ClasseType[] = [];
    if (id_matiere) {
        await api.get(`admin/matiere-classe/${id_matiere}`).then(response => {
            datas = response.data;
        }).catch(error => {
            console.error('Erreur lors de la récupération des données:', error.getMessage());
        });
    }
    return datas;
});

