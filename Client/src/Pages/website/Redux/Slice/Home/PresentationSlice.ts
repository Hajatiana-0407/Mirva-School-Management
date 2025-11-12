import { createSlice } from "@reduxjs/toolkit";
import { RootStateType } from "../../../../../Redux/store";
import { ActionIntialValue, ActionType, ApiReturnType } from "../../../../../Utils/Types";
import { PresentationInitialValue, PresentationType } from "../../../Type";
import { getAllPresentation } from "../../AsyncThunk/HomeAsyncThunk";

type initialStateType = {
    action: ActionType,
    datas: PresentationType,
    error: string
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: PresentationInitialValue,
    error: '',
}

const HeroSlice = createSlice({
    name: 'Welcome section ( site ) ',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        // ? Recuperation 
        builder
            .addCase(getAllPresentation.pending, (state) => {
                state.action.isLoading = true;
                state.error = '';
            })
            .addCase(getAllPresentation.fulfilled, (state, action: {
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
            .addCase(getAllPresentation.rejected, (state) => {
                state.action.isLoading = false
                state.error = 'Erreur de connexion au server';
            })
    }
})

export const getPresentationState = (state: RootStateType) => state.presentation;
export default HeroSlice.reducer; 