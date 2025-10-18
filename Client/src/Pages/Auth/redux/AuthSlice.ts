import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from '../../../Redux/store';
import { ActionIntialValue, ActionType, ApiReturnType, AuthInitialValue, AuthStateType } from '../../../Utils/Types';
import { loginUser, logoutUser, updateAccount } from './AuthAsyncThunk';
import { toast } from 'react-toastify';
import { decodeToken } from '../../../Utils/Utils';



type initialStateType = {
  action: ActionType & { isLoginOut?: boolean },
  datas: AuthStateType & {
    exp?: number;
    iat?: number;
  },
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
      if (!state.datas.isLoggedIn) {
        const token = localStorage.getItem('token');
        if (token && token !== '') {
          const tokenDecode = decodeToken(token)
          state.datas = {
            isLoggedIn: true,
            token: token,
            ...tokenDecode.data,
            iat: tokenDecode.iat,
            exp: tokenDecode.exp,
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    //  ?===================== LOGIN ===================== //
    builder
      .addCase(loginUser.pending, (state) => {
        state.action.isLoading = true;
        state.error = '';
      })
      .addCase(loginUser.fulfilled, (state, action: {
        payload: ApiReturnType
      }) => {
        state.action.isLoading = false;
        const { error, data: token, message } = action.payload;
        if (error) {
          state.error = message as string;
        } else {
          state.error = '';
          const tokenDecode = decodeToken(token)
          state.datas = {
            isLoggedIn: true,
            token: token,
            ...tokenDecode.data,
            iat: tokenDecode.iat,
            exp: tokenDecode.exp,
          }
          // Stocker le token dans le localostorage 
          localStorage.setItem('token', token);
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.action.isLoading = false
        state.error = 'Erreur de connexion au server';
        toast.error("Erreur de connexion au server");
      })

    builder
      .addCase(logoutUser.pending, (state) => {
        state.action.isLoginOut = true;
        state.error = '';
      })
      .addCase(logoutUser.fulfilled, (state, action: {
        payload: ApiReturnType
      }) => {
        state.action.isLoginOut = false;
        const { error, message } = action.payload;
        if (error) {
          state.error = message as string;
        } else {
          // Effacer le token 
          localStorage.removeItem('token');
          state.datas = AuthInitialValue ;
        }
      })
      .addCase(logoutUser.rejected, (state) => {
        state.action.isLoginOut = false
        state.error = 'Erreur de connexion au server';

      })


    // ? ===================== MODIFICATION DU COMPTE ===================== //
    builder
      .addCase(updateAccount.pending, (state) => {
        state.action.isUpdating = true;
        state.error = '';
      })
      .addCase(updateAccount.fulfilled, (state, action: {
        payload: ApiReturnType
      }) => {
        state.action.isUpdating = false;
        const { error, data, message } = action.payload;
        if (error) {
          state.error = message as string;
        } else {
          state.error = '';
          const tokenDecode = decodeToken(data.token)
          state.datas = {
            isLoggedIn: true,
            token: data.token,
            ...tokenDecode.data,
            iat: tokenDecode.iat,
            exp: tokenDecode.exp,
          }
          // Stocker le token dans le localostorage 
          localStorage.setItem('token', data.token);
        }
      })
      .addCase(updateAccount.rejected, (state) => {
        state.action.isUpdating = false
        state.error = 'Erreur de connexion au server';
        toast.error("Erreur de connexion au server");
      })
  }
});

export default authSlice.reducer;
export const { testAuthentication } = authSlice.actions;
export const getAuthState = (state: RootStateType) => state.auth;
