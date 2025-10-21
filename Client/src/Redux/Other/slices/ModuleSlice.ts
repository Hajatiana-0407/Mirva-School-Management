import { createSlice } from "@reduxjs/toolkit";
import { ActionIntialValue, ActionType, ModuleType } from "../../../Utils/Types";
import { RootStateType } from "../../../Redux/store";
import { getAllModule } from "../asyncThunk/ModuleAsyncThunk";


type initialStateType = {
    action: ActionType,
    datas: ModuleType[],
    page: number,
    error: string
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: [],
    page: 1,
    error: '',
}

const TypeEmployeesSlice = createSlice({
    name: 'Modules',
    initialState,
    reducers: {},
    extraReducers(builder) {

        // ? ************************************* Read ************************************* //
        builder
            .addCase(getAllModule.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(getAllModule.fulfilled, (state, action: {
                payload: ModuleType[]
            }) => {
                state.action.isLoading = false;
                state.datas = action.payload;
            })
            .addCase(getAllModule.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server'
            });
    }
})

export const getModuleState = (state: RootStateType) => state.module;

export const { } = TypeEmployeesSlice.actions;
export default TypeEmployeesSlice.reducer; 