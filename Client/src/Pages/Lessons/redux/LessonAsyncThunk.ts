import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../Utils/api";
import { ApiReturnInitial, ApiReturnType, LessonType } from "../../../Utils/Types";
import { setHiddeModalValue } from "../../../Redux/AppSlice";

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
      dispatch(setHiddeModalValue(true));
    }
  }).catch(error => {
    console.error('Erreur lors de la modification:', error.getMessage());
  });
  return data;
});


// // DELETE
// export const deletelesson = createAsyncThunk('lesson/suppression', async (id_annee_scolaire: number, { dispatch }): Promise<ApiReturnType> => {
//   let data: ApiReturnType = ApiReturnInitial;
//   if (id_annee_scolaire) {
//     await api.delete('admin/school-year/delete', {
//       data: { id_annee_scolaire },
//       headers: { 'Content-Type': 'application/json' }
//     }).then(response => {
//       data = response.data;
//       if (!data.error) {
//         dispatch(setHiddeModalValue(true));
//       }
//     }).catch(error => {
//       console.error('Erreur lors de la récupération des données:', error.getMessage());
//     });
//   }
//   return data;
// });

