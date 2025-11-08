import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../Utils/api";
import { ApiReturnInitial, ApiReturnType, ExerciceType } from "../../../Utils/Types";
import { setHiddeModalValue } from "../../../Redux/AppSlice";
import { toast } from "react-toastify";

// READ
export const getAllExercices = createAsyncThunk('exercice/getAll', async (): Promise<ExerciceType[]> => {
  let datas: ExerciceType[] = [];
  await api.get('admin/exercice')
    .then(response => {
      datas = response.data;
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des leçons :', error);
    });
  return datas;
});


// CREATE
export const createExercice = createAsyncThunk('leçon/ajout', async (exercice: any, { dispatch }): Promise<ApiReturnType> => {
  let data: ApiReturnType = ApiReturnInitial;
  await api.post('admin/exercice/create', exercice)
    .then(response => {
      data = response.data;
      if (!data.error) {
        toast('Ajout effectué.')
        dispatch(setHiddeModalValue(true));
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données:', error.getMessage());
    });
  return data;
});


// UPDATE
export const updateexercice = createAsyncThunk('exercice/modification', async ({ exercice, id }: { exercice: any, id: number }, { dispatch }): Promise<ApiReturnType> => {
  let data: ApiReturnType = ApiReturnInitial;
  exercice.append('id_exercice', id.toString());

  await api.post('admin/exercice/update', exercice, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(response => {
    data = response.data;
    if (!data.error) {
      toast('Modification effectuée.')
      dispatch(setHiddeModalValue(true));
    }
  }).catch(error => {
    console.error('Erreur lors de la modification:', error.getMessage());
  });
  return data;
});


// DELETE
export const deleteExercice = createAsyncThunk('exercice/suppression', async (id_exercice: number): Promise<ApiReturnType> => {
  let data: ApiReturnType = ApiReturnInitial;
  if (id_exercice) {
    await api.delete('admin/exercice/delete', {
      data: { id_exercice },
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      data = response.data;
      if (!data.error) {
        toast("Suppression effectuée.");
      }
    }).catch(error => {
      console.error('Erreur lors de la récupération des données:', error.getMessage());
    });
  }
  return data;
});


// PUBLISH 
export const publish = createAsyncThunk('exercice/publish', async (id_exercice: number): Promise<ApiReturnType> => {
  let data: ApiReturnType = ApiReturnInitial;
  if (id_exercice) {
    await api.post('admin/exercice/publish', {
      id_exercice,
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      data = response.data;
      if (!data.error) {
        toast("Leçon publié.");
      }
    }).catch(error => {
      console.error('Erreur lors de la publication du leçon :', error.getMessage());
    });
  }
  return data;
})


// Get By Slug 
// export const getExerciceBySlug = createAsyncThunk('exercice/getOneBySlug', async (slug: string): Promise<ApiReturnType> => {
//   let data: ApiReturnType = ApiReturnInitial;
//   await api.get(`admin/exercice/${slug}`)
//     .then(response => {
//       data.data = response.data
//     })
//     .catch(error => {
//       console.error('Erreur lors de la récupération des données:', error);
//     });
//   return data;
// })

