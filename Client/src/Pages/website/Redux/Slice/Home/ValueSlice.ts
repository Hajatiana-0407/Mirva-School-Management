import { createSlice } from "@reduxjs/toolkit";
import { RootStateType } from "../../../../../Redux/store";
import { ActionIntialValue, ActionType, ApiReturnType } from "../../../../../Utils/Types";
import { ValueType } from "../../../Type";
import { getAllValue } from "../../AsyncThunk/HomeAsyncThunk";

type initialStateType = {
    action: ActionType,
    datas: ValueType[],
    error: string
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: [],
    error: '',
}

const ValueSlice = createSlice({
    name: 'Value section ( site ) ',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        
        // ? Recuperation 
        builder
            .addCase(getAllValue.pending, (state) => {
                state.action.isLoading = true;
                state.error = '';
            })
            .addCase(getAllValue.fulfilled, (state, action: {
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
            .addCase(getAllValue.rejected, (state) => {
                state.action.isLoading = false
                state.error = 'Erreur de connexion au server';
            })
    }
})

export const getValueState = (state: RootStateType) => state.values;
export default ValueSlice.reducer; 