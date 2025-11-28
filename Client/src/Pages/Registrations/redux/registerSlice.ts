import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from '../../../Redux/store';
import { ActionIntialValue, ActionType, ApiReturnType, RegistrationType } from '../../../Utils/Types';
import { createRegistration, deleteRegistration, getAllRegistrations } from './registerAsyncThunk';
import { toast } from 'react-toastify';
import { logoutUser } from '../../Auth/redux/AuthAsyncThunk';



type initialStateType = {
  action: ActionType,
  datas: RegistrationType[],
  page: number,
  error: string
}
const initialState: initialStateType = {
  action: ActionIntialValue,
  datas: [],
  page: 1,
  error: '',
}

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, () => {
            return initialState;
        });

    // ? ************************************* Read ************************************* //
    builder
      .addCase(getAllRegistrations.pending, (state) => {
        state.action.isLoading = true;
      })
      .addCase(getAllRegistrations.fulfilled, (state, action: {
        payload: RegistrationType[]
      }) => {
        state.action.isLoading = false;
        state.datas = action.payload;
      })
      .addCase(getAllRegistrations.rejected, (state) => {
        state.action.isLoading = false;
        state.error = 'Erreur de connexion au server'
        toast.error("Erreur de connexion au server");
      });

    //  ************************************* Create ************************************* //
    builder
      .addCase(createRegistration.pending, (state) => {
        state.action.isLoading = true;
      })
      .addCase(createRegistration.fulfilled, (state, action: {
        payload: ApiReturnType
      }) => {
        state.action.isLoading = false;
        const { error, data, message } = action.payload;
        if (error) {
          state.error = message as string;
        } else {
          state.error = '';
          state.datas.unshift(data);
        }
      })
      .addCase(createRegistration.rejected, (state) => {
        state.action.isLoading = false;
        state.error = 'Erreur de connexion au server';
        toast.error("Erreur de connexion au server");
      })

    // ! ************************************* Delete ************************************* //

    builder
      .addCase(deleteRegistration.pending, (state) => {
        state.action.isDeleting = true;
      })
      .addCase(deleteRegistration.fulfilled, (state, action: { payload: ApiReturnType }) => {
        state.action.isDeleting = false;
        const { error, data: id_deleted, message } = action.payload;
        if (error) {
          state.error = message as string;
        } else {
          state.error = '';
          state.datas = state.datas.filter((data: RegistrationType) => data.id_inscription !== id_deleted);
        }
      })
      .addCase(deleteRegistration.rejected, (state) => {
        state.action.isDeleting = false;
        state.error = 'Erreur de connexion au server';
        toast.error("Erreur de connexion au server");
      })
  }
});

export default registrationSlice.reducer;
export const getRegistrationState = (state: RootStateType) => state.registration;
