import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../Utils/api";
import { ApiReturnInitial, ApiReturnType, LessonType } from "../../../Utils/Types";
import { setHiddeModalValue } from "../../../Redux/AppSlice";
import { toast } from "react-toastify";

// READ
export const getAllLessons = createAsyncThunk('lesson/getAll', async (): Promise<LessonType[]> => {
  let datas: LessonType[] = [];
  await api.get('admin/lesson')
    .then(response => {
      datas = response.data;
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des leçons :', error);
    });
  return datas;
});


// CREATE
export const createLesson = createAsyncThunk('leçon/ajout', async (lesson: any, { dispatch }): Promise<ApiReturnType> => {
  let data: ApiReturnType = ApiReturnInitial;
  await api.post('admin/lesson/create', lesson)
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
export const updatelesson = createAsyncThunk('lesson/modification', async ({ lesson, id }: { lesson: any, id: number }, { dispatch }): Promise<ApiReturnType> => {
  let data: ApiReturnType = ApiReturnInitial;
  lesson.append('id_lecon', id.toString());

  await api.post('admin/lesson/update', lesson, {
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
export const deleteLesson = createAsyncThunk('lesson/suppression', async (id_lecon: number): Promise<ApiReturnType> => {
  let data: ApiReturnType = ApiReturnInitial;
  if (id_lecon) {
    await api.delete('admin/lesson/delete', {
      data: { id_lecon },
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
export const publish = createAsyncThunk('lesson/publish', async (id_lecon: number): Promise<ApiReturnType> => {
  let data: ApiReturnType = ApiReturnInitial;
  if (id_lecon) {
    await api.post('admin/lesson/publish', {
      id_lecon,
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
// export const getLessonBySlug = createAsyncThunk('lesson/getOneBySlug', async (slug: string): Promise<ApiReturnType> => {
//   let data: ApiReturnType = ApiReturnInitial;
//   await api.get(`admin/lesson/${slug}`)
//     .then(response => {
//       data.data = response.data
//     })
//     .catch(error => {
//       console.error('Erreur lors de la récupération des données:', error);
//     });
//   return data;
// })

