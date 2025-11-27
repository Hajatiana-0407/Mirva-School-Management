import { createSlice } from "@reduxjs/toolkit";
import { RootStateType } from "../../../../../Redux/store";
import { ActionIntialValue, ActionType, ApiReturnType } from "../../../../../Utils/Types";
import {  SloganType } from "../../../Type";
import { getAllMission, updateMission} from "../../AsyncThunk/AboutAsyncThunk";

type initialStateType = {
    action: ActionType,
    datas: SloganType[],
    error: string
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: [],
    error: '',
}

const MissionSlice = createSlice({
    name: 'About section ( site ) ',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        // ? Recuperation 
        builder
            .addCase(getAllMission.pending, (state) => {
                state.action.isLoading = true;
                state.error = '';
            })
            .addCase(getAllMission.fulfilled, (state, action: {
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
            .addCase(getAllMission.rejected, (state) => {
                state.action.isLoading = false
                state.error = 'Erreur de connexion au server';
            })


        // ? Modification 
        builder
            .addCase(updateMission.pending, (state) => {
                state.action.isUpdating = true;
                state.error = '';
            })
            .addCase(updateMission.fulfilled, (state, action: {
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
            .addCase(updateMission.rejected, (state) => {
                state.action.isUpdating = false
                state.error = 'Erreur de connexion au server';
            })
    }
})

export const getMissionState = (state: RootStateType) => state.mission;
export default MissionSlice.reducer; 