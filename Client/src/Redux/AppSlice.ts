import { createSlice } from "@reduxjs/toolkit";
import { RootStateType } from "./store";
import { ApiReturnType, AppInitialValue } from "../Utils/Types";
import { getAllClassesNoPagination, getAllLevelsNoPagination, getAllSubjectsNoPagination } from "./Other/asyncThunk/AppAsyncThunk";
import { getAllSchoolYear } from "../Pages/School-Year/redux/SchoolYearAsyncThunk";

const AppSlice = createSlice({
    name: 'Appication Slice',
    initialState: AppInitialValue,
    reducers: {
        setHiddeModalValue: (state, action: { payload: boolean }) => {
            state.hiddeTheModalActive = action.payload;
        }
    },
    extraReducers: (builder) => {
        // ************************************* Classes ************************************* //
        builder
            .addCase(getAllClassesNoPagination.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.allClasses = action.payload.data;
            })
        // ************************************* Niveaux ************************************* //
        builder
            .addCase(getAllLevelsNoPagination.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.allLevels = action.payload.data;
            })
        // ************************************* Matières  ************************************* //
        builder
            .addCase(getAllSubjectsNoPagination.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.allSubjects = action.payload.data;
            })
        // ************************************* Matières  ************************************* //
        builder
            .addCase(getAllSchoolYear.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.allSchoolyears = action.payload.data;
            })
    }
})

export const getAppState = (state: RootStateType) => state.app
export const { setHiddeModalValue } = AppSlice.actions;
export default AppSlice.reducer; 