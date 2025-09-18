import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegistrationType } from '../../../Utils/Types';
import api from '../../../Utils/api';
import { setHiddeModalValue } from '../../../Redux/AppSlice';
import { toast } from 'react-toastify';

const API_URL = '/api/registrations';

export const createRegistration = createAsyncThunk<RegistrationType, RegistrationType>(
  'registration/create',
  async (datas, { dispatch }) => {
    let data: any = [];
    await api.post('admin/registration-student', datas).then(response => {
      data = response.data;
      if (!data.error) {
        dispatch(setHiddeModalValue(true));
        toast.success('Enregistrement effectuées !');
      }
    }).catch(error => {
      console.error('Erreur lors de l\'inscription :', error.getMessage());
    });
    return data;
  }
);

export const getAllRegistrations = createAsyncThunk<RegistrationType[]>(
  'registration/getAll',
  async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return await response.json();
  }
);

export const updateRegistration = createAsyncThunk<RegistrationType, { datas: RegistrationType; id: number }>(
  'registration/update',
  async ({ datas, id }) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datas),
    });
    if (!response.ok) throw new Error('Erreur lors de la modification');
    return await response.json();
  }
);

export const deleteRegistration = createAsyncThunk<number, number>(
  'registration/delete',
  async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression');
    return id;
  }
);
