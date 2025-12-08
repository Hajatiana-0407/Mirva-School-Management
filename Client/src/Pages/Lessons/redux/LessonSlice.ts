import { createSlice } from "@reduxjs/toolkit";
import { ActionIntialValue, ActionType, ApiReturnType, LessonInitialValue, LessonType, PaginationInitialValue, PaginationType } from "../../../Utils/Types";
import { RootStateType } from "../../../Redux/store";
import { createLesson, deleteLesson, filterLesson, getAllLessons, publish, updatelesson } from "./LessonAsyncThunk";
import { logoutUser } from "../../Auth/redux/AuthAsyncThunk";

// Type SchoolYear à adapter selon votre modèle

type initialStateType = {
    action: ActionType,
    datas: LessonType[],
    pagination: PaginationType,
    error: string,
    single: {
        data?: LessonType;
        action: ActionType
    }
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: [],
    pagination: PaginationInitialValue,
    error: '',
    single: {
        data: LessonInitialValue,
        action: ActionIntialValue
    }
}

const LessonSlice = createSlice({
    name: 'Lesson',
    initialState,
    reducers: {
        getLessonBySlug: (state, action: { payload: string }) => {
            state.single.action.isLoading = true;
            if (action.payload) {
                state.datas.map((lesson) => {
                    if (lesson.slug === action.payload) {
                        state.single.data = lesson;
                    }
                })
            }
            state.single.action.isLoading = false;
        }
    },
    extraReducers(builder) {
        builder.addCase(logoutUser.fulfilled, () => {
            return initialState;
        });
        // ? ===================== Read  ===================== //
        builder
            .addCase(getAllLessons.pending, (state) => {
                state.action.isLoading = true;
                state.error = '';
            })
            .addCase(getAllLessons.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isLoading = false;
                state.datas = action.payload.data;
                state.pagination = action.payload.pagination
            })
            .addCase(getAllLessons.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server'
            });

        // Filtre 
        builder
            .addCase(filterLesson.pending, (state) => {
                state.action.isFilterLoading = true;
                state.error = '';
            })
            .addCase(filterLesson.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isFilterLoading = false;
                state.datas = action.payload.data;
                state.pagination = action.payload.pagination
            })
            .addCase(filterLesson.rejected, (state) => {
                state.action.isFilterLoading = false;
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
                        // Si la leçoon modifier est celle dans le single 
                        if (state.single.data?.id_lecon === data?.id_lecon) {
                            state.single.data = data;
                        }

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
                        // Si la leçoon modifier est celle dans le single 
                        if (state.single.data?.id_lecon === id_lecon) {
                            state.single.data = { ...state.single.data, published: 1 } as LessonType;
                        }
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


        // ? ************************************* Single ************************************* //
        // builder
        //     .addCase(getLessonBySlug.pending, (state) => {
        //         state.single.action.isLoading = true;
        //         state.error = '';
        //     })
        //     .addCase(getLessonBySlug.fulfilled, (state, action: { payload: ApiReturnType }) => {
        //         state.single.action.isLoading = false;
        //         const { error, data: employe, message } = action.payload;

        //         if (error) {
        //             state.error = message as string;
        //         } else {
        //             state.single.data = employe;
        //         }
        //     })
        //     .addCase(getLessonBySlug.rejected, (state) => {
        //         state.single.action.isLoading = false;
        //         state.error = 'Erreur de connexion au server';
        //     })
    }
});

export const getLessonState = (state: RootStateType) => state.lesson;
export const getLessonSingleState = (state: RootStateType) => state.lesson.single;
export const { getLessonBySlug } = LessonSlice.actions;
export default LessonSlice.reducer;
