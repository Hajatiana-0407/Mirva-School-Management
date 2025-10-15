import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiReturnInitial, ApiReturnType } from "../../../Utils/Types";
import api from "../../../Utils/api";
import { setHiddeModalValue } from "../../../Redux/AppSlice";
import { SchoolYearType } from "../../../Utils/Types";
import { toast } from "react-toastify";

// READ
export const getAllSchoolYear = createAsyncThunk('schoolYear/getAll', async (): Promise<SchoolYearType[]> => {
  let datas: SchoolYearType[] = [];
  await api.get('admin/school-year')
    .then(response => {
      datas = response.data;
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  return datas;
});

// UPDATE
export const updateSchoolYear = createAsyncThunk('schoolYear/modification', async ({ schoolYear, id }: { schoolYear: any, id: number }, { dispatch }): Promise<ApiReturnType> => {
  let data: ApiReturnType = ApiReturnInitial;
  schoolYear.append('id_annee_scolaire', id.toString());

  await api.post('admin/school-year/update', schoolYear, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(response => {
    data = response.data;
    if (!data.error) {
      dispatch(setHiddeModalValue(true));
    }
  }).catch(error => {
    console.error('Erreur lors de la récupération des données:', error.getMessage());
  });
  return data;
});

// CREATE
export const createSchoolYear = createAsyncThunk('schoolYear/ajout', async (schoolYear: SchoolYearType, { dispatch }): Promise<ApiReturnType> => {
  let data: ApiReturnType = ApiReturnInitial;
  await api.post('admin/school-year/create', schoolYear)
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

// DELETE
export const deleteSchoolYear = createAsyncThunk('schoolYear/suppression', async (id_annee_scolaire: number, { dispatch }): Promise<ApiReturnType> => {
  let data: ApiReturnType = ApiReturnInitial;
  if (id_annee_scolaire) {
    await api.delete('admin/school-year/delete', {
      data: { id_annee_scolaire },
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
});


// SET ACTIVE SCHOOL YEAR 
export const changeActiveSchoolYear = createAsyncThunk('schoolYear/change-active', async (validateData: any ): Promise<ApiReturnType> => {
  let data = ApiReturnInitial ;   
  await api.post('admin/school-year/change-active',
    validateData
  ).then(response => {
    data = response.data;
    if (!data.error) {
      toast('Modification éffectuée')
    }
  }).catch(error => {
    console.error('Erreur lors de la récupération des données:', error.getMessage());
  });
  return data;
})
