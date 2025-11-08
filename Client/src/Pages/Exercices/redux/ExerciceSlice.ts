import { createSlice } from "@reduxjs/toolkit";
import { ActionIntialValue, ActionType, ApiReturnType, ExerciceInitialValue, ExerciceType } from "../../../Utils/Types";
import { RootStateType } from "../../../Redux/store";
import { createExercice, deleteExercice, getAllExercices, publish, updateexercice } from "./ExerciceAsyncThunk";

// Type SchoolYear à adapter selon votre modèle

type initialStateType = {
    action: ActionType,
    datas: ExerciceType[],
    page: number,
    error: string,
    single: {
        data?: ExerciceType;
        action: ActionType
    }
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: [],
    page: 1,
    error: '',
    single: {
        data: ExerciceInitialValue,
        action: ActionIntialValue
    }
}

const ExerciceSlice = createSlice({
    name: 'Exercice',
    initialState,
    reducers: {
        getExerciceBySlug: (state, action: { payload: string }) => {
            state.single.action.isLoading = true;
            if (action.payload) {
                state.datas.map((exercice) => {
                    if (exercice.slug === action.payload) {
                        state.single.data = exercice;
                    }
                })
            }
            state.single.action.isLoading = false;
        }
    },
    extraReducers(builder) {
        // ? ===================== Read  ===================== //
        builder
            .addCase(getAllExercices.pending, (state) => {
                state.action.isLoading = true;
                state.error = '';
            })
            .addCase(getAllExercices.fulfilled, (state, action: {
                payload: ExerciceType[]
            }) => {
                state.action.isLoading = false;
                state.datas = action.payload;
            })
            .addCase(getAllExercices.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server'
            });


        // ? ************************************* CREATE ************************************* //
        builder
            .addCase(createExercice.pending, (state) => {
                state.action.isLoading = true;
                state.error = '';
            })
            .addCase(createExercice.fulfilled, (state, action: {
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
            .addCase(createExercice.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server';
            })


        // ?===================== UPDATE ===================== //
        builder
            .addCase(updateexercice.pending, (state) => {
                state.action.isUpdating = true;
                state.error = '';
            })
            .addCase(updateexercice.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isUpdating = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    state.datas = state.datas.map(exercice => {
                        // Si la leçoon modifier est celle dans le single 
                        if (state.single.data?.id_exercice === data?.id_exercice) {
                            state.single.data = data;
                        }
                        
                        if (exercice.id_exercice === data?.id_exercice) {
                            return {
                                ...data,
                                id_exercice: exercice.id_exercice
                            }
                        }
                        return exercice
                    })
                }
            })
            .addCase(updateexercice.rejected, (state) => {
                state.action.isUpdating = false
                state.error = 'Erreur de connexion au server';
            })

        // ! ===================== DELETE ===================== //
        builder
            .addCase(deleteExercice.pending, (state) => {
                state.action.isDeleting = true;
                state.error = '';
            })
            .addCase(deleteExercice.fulfilled, (state, action: { payload: any }) => {
                state.action.isDeleting = false;
                const { error, data: id_deleted, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    state.datas = state.datas.filter((data: ExerciceType) => data.id_exercice !== id_deleted);
                }
            })
            .addCase(deleteExercice.rejected, (state) => {
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
                const { error, data: id_exercice, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    state.datas = state.datas.map(exercice => {
                        // Si la leçoon modifier est celle dans le single 
                        if (state.single.data?.id_exercice === id_exercice) {
                            state.single.data = { ...state.single.data, published: 1 } as ExerciceType;
                        }
                        if (exercice.id_exercice == id_exercice) {
                            return {
                                ...exercice,
                                published: 1
                            }
                        }
                        return exercice
                    })
                }
            })
            .addCase(publish.rejected, (state) => {
                state.action.isDeleting = false;
                state.error = 'Erreur de connexion au server';
            });


        // ? ************************************* Single ************************************* //
        // builder
        //     .addCase(getExerciceBySlug.pending, (state) => {
        //         state.single.action.isLoading = true;
        //         state.error = '';
        //     })
        //     .addCase(getExerciceBySlug.fulfilled, (state, action: { payload: ApiReturnType }) => {
        //         state.single.action.isLoading = false;
        //         const { error, data: employe, message } = action.payload;

        //         if (error) {
        //             state.error = message as string;
        //         } else {
        //             state.single.data = employe;
        //         }
        //     })
        //     .addCase(getExerciceBySlug.rejected, (state) => {
        //         state.single.action.isLoading = false;
        //         state.error = 'Erreur de connexion au server';
        //     })
    }
});

export const getExerciceState = (state: RootStateType) => state.exercice;
export const getExerciceSingleState = (state: RootStateType) => state.exercice.single;
export const { getExerciceBySlug } = ExerciceSlice.actions;
export default ExerciceSlice.reducer;
