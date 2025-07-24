import { createSlice } from "@reduxjs/toolkit";
import { ActionIntialValue, ActionType, LevelSubjectType } from "../../../Utils/Types";
import { RootStateType } from "../../../Redux/store";
import { getLelvelSubjectByIdNiveau, registerSubjectLevelCoef } from "./LevelAsyncThunk";
import { toast } from "react-toastify";



type initialStateType = {
    action: ActionType,
    datas: LevelSubjectType[],
    page: number,
    error: string
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: [],
    page: 1,
    error: '',
}

const LevelSubjectSlice = createSlice({
    name: 'Level & Subject (Niveau & Sujet)',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getLelvelSubjectByIdNiveau.pending, (state) => {
            state.action.isLoading = true;
        })
            .addCase(getLelvelSubjectByIdNiveau.fulfilled, (state, action: {
                payload: LevelSubjectType[]
            }) => {
                state.action.isLoading = false;
                state.datas = action.payload;
            })
            .addCase(getLelvelSubjectByIdNiveau.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server'
            });


        builder.addCase(registerSubjectLevelCoef.pending, (state) => {
            state.action.isUpdating = true;
        })
            .addCase(registerSubjectLevelCoef.fulfilled, (state) => {
                state.action.isUpdating = false;
                toast.success('Opération effectuée avec succès.');
            })
            .addCase(registerSubjectLevelCoef.rejected, (state) => {
                state.action.isUpdating = false;
                state.error = 'Erreur de connexion au server'
            });

    }
})

export const getLevelSubjectState = (state: RootStateType) => state.levelSubject

export const { } = LevelSubjectSlice.actions;
export default LevelSubjectSlice.reducer; 