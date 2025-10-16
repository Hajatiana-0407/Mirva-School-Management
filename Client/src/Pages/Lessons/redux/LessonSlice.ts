import { createSlice } from "@reduxjs/toolkit";
import { ActionIntialValue, ActionType, ApiReturnType, LessonType } from "../../../Utils/Types";
import { RootStateType } from "../../../Redux/store";
import { createLesson, deleteLesson, getAllLessons, publish, updatelesson } from "./LessonAsyncThunk";

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
                    state.datas = state.datas.map(lesson => {
                        if (lesson.id_lecon === data?.id_lecon) {
                            return {
                                ...data,
                                id_lecon: lesson.id_lecon
                            }
                        }
                        return lesson
                    })
                }
            })
            .addCase(updatelesson.rejected, (state) => {
                state.action.isUpdating = false
                state.error = 'Erreur de connexion au server';
            })

        // ! ===================== DELETE ===================== //
        builder
            .addCase(deleteLesson.pending, (state) => {
                state.action.isDeleting = true;
                state.error = '';
            })
            .addCase(deleteLesson.fulfilled, (state, action: { payload: any }) => {
                state.action.isDeleting = false;
                const { error, data: id_deleted, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    state.datas = state.datas.filter((data: LessonType) => data.id_lecon !== id_deleted);
                }
            })
            .addCase(deleteLesson.rejected, (state) => {
                state.action.isDeleting = false;
                state.error = 'Erreur de connexion au server';
            });

        // ? ===================== PUBLIÉ ===================== //
        builder
            .addCase(publish.pending, (state) => {
                state.action.isDeleting = true;
                state.error = '';
            })
            .addCase(publish.fulfilled, (state, action: { payload: any }) => {
                state.action.isDeleting = false;
                const { error, data: id_lecon, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    state.datas = state.datas.map(lesson => {
                        if (lesson.id_lecon == id_lecon) {
                            return {
                                ...lesson,
                                published: 1
                            }
                        }
                        return lesson
                    })
                }
            })
            .addCase(publish.rejected, (state) => {
                state.action.isDeleting = false;
                state.error = 'Erreur de connexion au server';
            });
    }
});

export const getLessonState = (state: RootStateType) => state.lesson;
export default LessonSlice.reducer;
