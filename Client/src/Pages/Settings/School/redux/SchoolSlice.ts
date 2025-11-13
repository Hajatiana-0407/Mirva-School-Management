import { createSlice } from "@reduxjs/toolkit";
import { ActionIntialValue, ActionType, ApiReturnType, SchoolInfoInitialValue, ShoolInfoType } from "../../../../Utils/Types";
import { RootStateType } from "../../../../Redux/store";
import { toast } from "react-toastify";
import { getSchoolInfo, updateSchoolInfo } from "./SchoolAsyncThunk";


type initialStateType = {
    action: ActionType,
    datas: ShoolInfoType,
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: SchoolInfoInitialValue,
}

const SchoolSlice = createSlice({
    name: 'School info (information sur l\'établissement)',
    initialState,
    reducers: {
        setLevelDeleting: (state) => {
            state.action.isDeleting = true;
        },

    },
    extraReducers(builder) {

        //  ************************************* Read ************************************* //
        builder
            .addCase(getSchoolInfo.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(getSchoolInfo.fulfilled, (state, action: {
                payload: ShoolInfoType
            }) => {
                state.action.isLoading = false;
                if (!!action.payload) {
                    state.datas = action.payload;
                }
            })
            .addCase(getSchoolInfo.rejected, (state) => {
                state.action.isLoading = false;
                toast.error("Erreur de connexion au server");
            });

        //  ************************************* Update ************************************* //
        builder
            .addCase(updateSchoolInfo.pending, (state) => {
                state.action.isUpdating = true;
            })
            .addCase(updateSchoolInfo.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isUpdating = false;
                const { data } = action.payload;
                state.datas = data as ShoolInfoType;
            })
            .addCase(updateSchoolInfo.rejected, (state) => {
                state.action.isUpdating = false
                toast.error("Erreur de connexion au server");
            })

    }
})

export const getSchoolState = (state: RootStateType) => state.school

export const { setLevelDeleting } = SchoolSlice.actions;
export default SchoolSlice.reducer; 