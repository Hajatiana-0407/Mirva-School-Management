import { createSlice } from "@reduxjs/toolkit";
import { RootStateType } from "../../../../../Redux/store";
import { ActionIntialValue, ActionType, ApiReturnType } from "../../../../../Utils/Types";
import { getAllInstallation, updatePilier } from "../../AsyncThunk/AboutAsyncThunk";
import { InstallationType } from "../../../Type";

type initialStateType = {
    action: ActionType,
    datas: InstallationType[],
    error: string
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas:[],
    error: '',
}

const InstallationSlice = createSlice({
    name: 'About section ( site ) ',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        // ? Recuperation 
        builder
            .addCase(getAllInstallation.pending, (state) => {
                state.action.isLoading = true;
                state.error = '';
            })
            .addCase(getAllInstallation.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isLoading = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.datas = data
                }
            })
            .addCase(getAllInstallation.rejected, (state) => {
                state.action.isLoading = false
                state.error = 'Erreur de connexion au server';
            })


        // ? Modification 
        builder
            .addCase(updatePilier.pending, (state) => {
                state.action.isUpdating = true;
                state.error = '';
            })
            .addCase(updatePilier.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isUpdating = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    if ( data?.id_slogan   ){ 
                        state.datas = data
                    }
                }
            })
            .addCase(updatePilier.rejected, (state) => {
                state.action.isUpdating = false
                state.error = 'Erreur de connexion au server';
            })
    }
})

export const getInstallationState = (state: RootStateType) => state.installation;
export default InstallationSlice.reducer; 