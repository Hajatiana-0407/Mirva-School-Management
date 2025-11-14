import { createSlice } from "@reduxjs/toolkit";
import { RootStateType } from "../../../../../Redux/store";
import { ActionIntialValue, ActionType, ApiReturnType } from "../../../../../Utils/Types";
import { ValueType } from "../../../Type";
import { createValue, deleteValue, getAllValue, publishValue, updateValue } from "../../AsyncThunk/HomeAsyncThunk";

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


        // ? Creation 
        builder
            .addCase(createValue.pending, (state) => {
                state.action.isLoading = true;
                state.error = '';
            })
            .addCase(createValue.fulfilled, (state, action: {
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
            .addCase(createValue.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server';
            })

        // ? Modification 
        builder
            .addCase(updateValue.pending, (state) => {
                state.action.isUpdating = true;
                state.error = '';
            })
            .addCase(updateValue.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isUpdating = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    state.datas = state.datas.map(slide => {
                        if (slide.id_valeur === data?.id_valeur) {
                            return {
                                ...data,
                                id_valeur: slide.id_valeur
                            }
                        }
                        return slide
                    })
                }
            })
            .addCase(updateValue.rejected, (state) => {
                state.action.isUpdating = false
                state.error = 'Erreur de connexion au server';
            })

        // ! Suppression 
        builder
            .addCase(deleteValue.pending, (state) => {
                state.action.isDeleting = true;
                state.error = '';

            })
            .addCase(deleteValue.fulfilled, (state, action: { payload: ApiReturnType }) => {
                state.action.isDeleting = false;
                const { error, data: id_deleted, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    state.datas = state.datas.filter((data: ValueType) => data.id_valeur !== id_deleted);
                }
            })
            .addCase(deleteValue.rejected, (state) => {
                state.action.isDeleting = false;
                state.error = 'Erreur de connexion au server';
            })

        // ? Publication ( afficher ou cache dans page d'accueil ) 
        builder
            .addCase(publishValue.pending, (state) => {
                state.action.isUpdating = true;
                state.error = '';
            })
            .addCase(publishValue.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isUpdating = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    state.datas = state.datas.map(slide => {
                        if (slide.id_valeur === data?.id_valeur) {
                            return {
                                ...data,
                                id_valeur: slide.id_valeur
                            }
                        }
                        return slide
                    })
                }
            })
            .addCase(publishValue.rejected, (state) => {
                state.action.isUpdating = false
                state.error = 'Erreur de connexion au server';
            })
    }
})

export const getValueState = (state: RootStateType) => state.values;
export default ValueSlice.reducer; 