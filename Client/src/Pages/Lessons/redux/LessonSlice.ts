import { createSlice } from "@reduxjs/toolkit";
import { ActionIntialValue, ActionType, ApiReturnType, LessonType } from "../../../Utils/Types";
import { RootStateType } from "../../../Redux/store";
import { createLesson, getAllLessons, updatelesson } from "./LessonAsyncThunk";

// Type SchoolYear à adapter selon votre modèle

type initialStateType = {
    action: ActionType,
    datas: LessonType[],
    page: number,
    error: string
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: [],
    page: 1,
    error: '',
}

const LessonSlice = createSlice({
    name: 'Lesson',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // ? ===================== Read  ===================== //
        builder
            .addCase(getAllLessons.pending, (state) => {
                state.action.isLoading = true;
                state.error = '';
            })
            .addCase(getAllLessons.fulfilled, (state, action: {
                payload: LessonType[]
            }) => {
                state.action.isLoading = false;
                state.datas = action.payload;
            })
            .addCase(getAllLessons.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server'
            });


        // ? ************************************* CREATE ************************************* //
        builder
            .addCase(createLesson.pending, (state) => {
                state.action.isLoading = true;
                state.error = '';
            })
            .addCase(createLesson.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isLoading = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    state.datas.unshift(data);
                }
            })
            .addCase(createLesson.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server';
            })


        // ?===================== UPDATE ===================== //
        builder
            .addCase(updatelesson.pending, (state) => {
                state.action.isUpdating = true;
                state.error = '';
            })
            .addCase(updatelesson.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isUpdating = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    state.datas = state.datas.map(level => {
                        if (level.id_niveau === data?.id_niveau) {
                            return {
                                ...data,
                                id_niveau: level.id_niveau
                            }
                        }
                        return level
                    })
                }
            })
            .addCase(updatelesson.rejected, (state) => {
                state.action.isUpdating = false
                state.error = 'Erreur de connexion au server';
            })
    }
});

export const getLessonState = (state: RootStateType) => state.lesson;
export default LessonSlice.reducer;
