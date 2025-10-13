import { createSlice } from "@reduxjs/toolkit";
import { ActionIntialValue, ActionType,  TypePersonnelType } from "../../../Utils/Types";
import { RootStateType } from "../../../Redux/store";
import { getAllTypePersonnel } from "../asyncThunk/TypeEmployesAsyncThunk";


type initialStateType = {
    action: ActionType,
    datas: TypePersonnelType[],
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
    name: 'type-personnel',
    initialState,
    reducers: {},
    extraReducers(builder) {

        // // ************************************* Read ************************************* //
        builder
            .addCase(getAllTypePersonnel.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(getAllTypePersonnel.fulfilled, (state, action: {
                payload: TypePersonnelType[]
            }) => {
                state.action.isLoading = false;
                state.datas = action.payload;
            })
            .addCase(getAllTypePersonnel.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server'
            }) ; 
    }
})

export const getTypeEmployeesState = (state: RootStateType) => state.typeEmployees;

export const {  } = TypeEmployeesSlice.actions;
export default TypeEmployeesSlice.reducer; 