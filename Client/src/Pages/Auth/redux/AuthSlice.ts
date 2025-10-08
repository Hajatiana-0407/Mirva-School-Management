import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from '../../../Redux/store';
import { ActionIntialValue, ActionType, ApiReturnType, AuthInitialValue, AuthStateType } from '../../../Utils/Types';
import { loginUser } from './AuthAsyncThunk';
import { toast } from 'react-toastify';
import { decodeToken } from '../../../Utils/Utils';



type initialStateType = {
  action: ActionType,
  datas: AuthStateType,
  error: string
}
const initialState: initialStateType = {
  action: ActionIntialValue,
  datas: AuthInitialValue,
  error: '',
}

const authSlice = createSlice({
  name: 'Authentification',
  initialState,
  reducers: {
    testAuthentication: (state) => {
      const token = localStorage.getItem('token');
      if (token && token !== '') {
        state.datas = {
          isLoggedIn: true,
          token: token,
          user: decodeToken(token).data
        }
      }
    },
    logout: (state) => {
      state.datas = AuthInitialValue;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.action.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: {
        payload: ApiReturnType
      }) => {
        state.action.isLoading = false;
        const { error, data, message } = action.payload;
        if (error) {
          state.error = message as string;
        } else {
          state.error = '';
          state.datas = {
            isLoggedIn: true,
            token: data,
            user: decodeToken(data).data
          }
          // Stocker le token dans le localostorage 
          localStorage.setItem('token', data);
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.action.isLoading = false
        state.error = 'Erreur de connexion au server';
        toast.error("Erreur de connexion au server");
      })
  }
});

export default authSlice.reducer;
export const { testAuthentication , logout } = authSlice.actions;
export const getAuthState = (state: RootStateType) => state.auth;
