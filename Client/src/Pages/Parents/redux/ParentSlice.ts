import { createSlice } from "@reduxjs/toolkit";
import { ActionIntialValue, ActionType, ApiReturnType, PaginationInitialValue, PaginationType, ParentType } from "../../../Utils/Types";
import { RootStateType } from "../../../Redux/store";
import { toast } from "react-toastify";
import { upsertParent, deleteParent, getAllParent, updateParent, filterParent } from "./ParentAsyncThunk";
import { logoutUser } from "../../Auth/redux/AuthAsyncThunk";


type initialStateType = {
    action: ActionType,
    datas: ParentType[],
    pagination: PaginationType,
    error: string
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: [],
    pagination: PaginationInitialValue,
    error: '',
}

const ParentSlice = createSlice({
    name: 'Parent (Niveau)',
    initialState,
    reducers: {
        setParentDeleting: (state) => {
            state.action.isDeleting = true;
        },

    },
    extraReducers(builder) {
        builder.addCase(logoutUser.fulfilled, () => {
            return initialState;
        });

        // ? ************************************* Read ************************************* //
        builder
            .addCase(getAllParent.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(getAllParent.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isLoading = false;
                if (action.payload.data)
                    state.datas = action.payload.data;
                if (action.payload.pagination)
                    state.pagination = action.payload.pagination
            })
            .addCase(getAllParent.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server'
                toast.error("Erreur de connexion au server");
            });
        // Filtre 
        builder
            .addCase(filterParent.pending, (state) => {
                state.action.isFilterLoading = true;
                state.error = '';
            })
            .addCase(filterParent.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isFilterLoading = false;
                if (action.payload.data)
                    state.datas = action.payload.data;
                if (action.payload.pagination)
                    state.pagination = action.payload.pagination
            })
            .addCase(filterParent.rejected, (state) => {
                state.action.isFilterLoading = false;
                state.error = 'Erreur de connexion au server'
            });

        // ************************************* Upsert ************************************* //
        builder
            .addCase(upsertParent.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(upsertParent.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isLoading = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';

                    // ===================== Insertion ===================== //
                    const inserted: ParentType[] = data?.insert;
                    inserted.map((parent) => {
                        state.datas.unshift(parent);
                    });

                    // ===================== Modification ===================== //
                    const updated: ParentType[] = data?.update;
                    updated.map((parent) => {
                        state.datas = state.datas.map(level => {
                            if (level.id_parent === parent?.id_parent) {
                                return {
                                    ...parent,
                                    id_parent: level.id_parent
                                }
                            }
                            return level
                        })
                    })
                }
            })
            .addCase(upsertParent.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })



        // ? ************************************* Update ************************************* //
        builder
            .addCase(updateParent.pending, (state) => {
                state.action.isUpdating = true;
            })
            .addCase(updateParent.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isUpdating = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    state.datas = state.datas.map(level => {
                        if (level.id_parent === data?.id_parent) {
                            return {
                                ...data,
                                id_parent: level.id_parent
                            }
                        }
                        return level
                    })
                }
            })
            .addCase(updateParent.rejected, (state) => {
                state.action.isUpdating = false
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })



        // ! ************************************* Delete ************************************* //

        builder
            .addCase(deleteParent.pending, (state) => {
                state.action.isDeleting = true;

            })
            .addCase(deleteParent.fulfilled, (state, action: { payload: ApiReturnType }) => {
                state.action.isDeleting = false;
                const { error, data: id_deleted, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    state.datas = state.datas.filter((data: ParentType) => data.id_parent !== id_deleted);
                }
            })
            .addCase(deleteParent.rejected, (state) => {
                state.action.isDeleting = false;
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })
    }
})

export const getParentState = (state: RootStateType) => state.parent

export const { setParentDeleting } = ParentSlice.actions;
export default ParentSlice.reducer; 