import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiReturnInitial, RegistrationType } from '../../../Utils/Types';
import api from '../../../Utils/api';
import { setHiddeModalValue } from '../../../Redux/AppSlice';
import { toast } from 'react-toastify';
import { ApiReturnType } from '../../../Utils/Types';



export const getAllRegistrations = createAsyncThunk('registration/getAll', async ({ page, query, no_pagination }: { page?: number; query?: any, no_pagination?: boolean }): Promise<ApiReturnType> => {
  let datas: ApiReturnType = ApiReturnInitial;
  await api.get('admin/registration', {
    params: { page, query, no_pagination }
  }).then(response => {
    datas = response.data
  })
    .catch(error => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  return datas;
})

export const filterRegistration = createAsyncThunk(
  'lesson/filter',
  async ({ page = 1, filter }: { page?: number; filter?: FormData }): Promise<ApiReturnType> => {
    let datas: ApiReturnType = ApiReturnInitial;
    filter?.append('page', String(page));
    console.log(filter);

    try {
      const response = await api.post('filtre/inscription', filter);
      datas = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
    return datas;
  }
);

export const createRegistration = createAsyncThunk<ApiReturnType, RegistrationType>(
  'registration/create',
  async (datas, { dispatch }) => {
    let data: ApiReturnType = ApiReturnInitial;
    await api.post('admin/registration-student', datas).then(response => {
      data = response.data;
      if (!data.error) {
        dispatch(setHiddeModalValue(true));
        toast('Enregistrement effectuées !');
      }
    }).catch(error => {
      console.error('Erreur lors de l\'inscription :', error.getMessage());
      return {
        error: true,
        message: "Erreur lors de l\'inscription",
      }
    });
    return data;
  }
);

export const deleteRegistration = createAsyncThunk<ApiReturnType, number>(
  'registration/delete',
  async (id, { dispatch }) => {
    let data: ApiReturnType = ApiReturnInitial;
    if (id) {
      await api.delete('admin/registration/delete', {
        data: { id_inscription: id },
        headers: { 'Content-Type': 'application/json' }
      }).then(response => {
        data = response.data;
        if (!data.error) {
          dispatch(setHiddeModalValue(true));
          toast('Suppression effectuée');
        }
      }).catch(error => {
        console.error('Erreur lors de la suppréssion de l\'inscription :', error.getMessage());
      });
    }
    return data;
  }
);
