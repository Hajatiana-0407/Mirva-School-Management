import { createSlice } from "@reduxjs/toolkit";
import { RootStateType } from "../../../../../Redux/store";
import { ActionIntialValue, ActionType, ApiReturnType } from "../../../../../Utils/Types";
import { getAllPilier, updatePilier } from "../../AsyncThunk/AboutAsyncThunk";
import { EducationalPillarType } from "../../../Type";

type initialStateType = {
    action: ActionType,
    datas: EducationalPillarType[],
    error: string
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas:[],
    error: '',
}

const PilierSlice = createSlice({
    name: 'About section ( site ) ',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        // ? Recuperation 
        builder
            .addCase(getAllPilier.pending, (state) => {
                state.action.isLoading = true;
                state.error = '';
            })
            .addCase(getAllPilier.fulfilled, (state, action: {
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
            .addCase(getAllPilier.rejected, (state) => {
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

export const getPilierState = (state: RootStateType) => state.pilier;
export default PilierSlice.reducer; 