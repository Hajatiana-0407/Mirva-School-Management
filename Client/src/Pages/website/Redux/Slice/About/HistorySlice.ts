import { createSlice } from "@reduxjs/toolkit";
import { RootStateType } from "../../../../../Redux/store";
import { ActionIntialValue, ActionType, ApiReturnType } from "../../../../../Utils/Types";
import { HistoryInitialValue, HistoryType } from "../../../Type";
import { getAllHistory , updateHistory} from "../../AsyncThunk/AboutAsyncThunk";

type initialStateType = {
    action: ActionType,
    datas: HistoryType,
    error: string
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: HistoryInitialValue,
    error: '',
}

const HistorySlice = createSlice({
    name: 'About section ( site ) ',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        // ? Recuperation 
        builder
            .addCase(getAllHistory.pending, (state) => {
                state.action.isLoading = true;
                state.error = '';
            })
            .addCase(getAllHistory.fulfilled, (state, action: {
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
            .addCase(getAllHistory.rejected, (state) => {
                state.action.isLoading = false
                state.error = 'Erreur de connexion au server';
            })


        // ? Modification 
        builder
            .addCase(updateHistory.pending, (state) => {
                state.action.isUpdating = true;
                state.error = '';
            })
            .addCase(updateHistory.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isUpdating = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    if ( data?.id_histoire   ){ 
                        state.datas = data
                    }
                }
            })
            .addCase(updateHistory.rejected, (state) => {
                state.action.isUpdating = false
                state.error = 'Erreur de connexion au server';
            })
    }
})

export const getHistoryState = (state: RootStateType) => state.history;
export default HistorySlice.reducer; 