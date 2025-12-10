import { createSlice } from "@reduxjs/toolkit";
import { ActionIntialValue, ActionType, ApiReturnType, PaginationInitialValue, PaginationType, SubjectType } from "../../../Utils/Types";
import { RootStateType } from "../../../Redux/store";
import { toast } from "react-toastify";
import { createSubject, deleteSubject, getAllSubject, updateSubject } from "./SubjectAsyncThunk";


type initialStateType = {
    action: ActionType,
    datas: SubjectType[],
    pagination : PaginationType,
    error: string
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: [],
    pagination : PaginationInitialValue ,
    error: '',
}

const SubjectSlice = createSlice({
    name: 'Subject (Niveau)',
    initialState,
    reducers: {
        setSubjectDeleting: (state) => {
            state.action.isDeleting = true;
        },

    },
    extraReducers(builder) {

        // // ************************************* Read ************************************* //
        builder
            .addCase(getAllSubject.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(getAllSubject.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isLoading = false;
                if (action.payload.data)
                    state.datas = action.payload.data;
                if (action.payload.pagination)
                    state.pagination = action.payload.pagination
            })
            .addCase(getAllSubject.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server'
                toast.error("Erreur de connexion au server");
            });

        // ************************************* Create ************************************* //
        builder
            .addCase(createSubject.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(createSubject.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isLoading = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    toast('Matière ajoutée !');
                    state.error = '';
                    state.datas.unshift(data);
                }
            })
            .addCase(createSubject.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })

        // // ************************************* Update ************************************* //
        builder
            .addCase(updateSubject.pending, (state) => {
                state.action.isUpdating = true;
            })
            .addCase(updateSubject.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isUpdating = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    toast('Matière modifiée !');
                    state.error = '';
                    state.datas = state.datas.map(level => {
                        if (level.id_matiere === data?.id_matiere) {
                            return {
                                ...data,
                                id_matiere: level.id_matiere
                            }
                        }
                        return level
                    })
                }
            })
            .addCase(updateSubject.rejected, (state) => {
                state.action.isUpdating = false
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })

        // // ************************************* Delete ************************************* //

        builder
            .addCase(deleteSubject.pending, (state) => {
                state.action.isDeleting = true;

            })
            .addCase(deleteSubject.fulfilled, (state, action: { payload: ApiReturnType }) => {
                state.action.isDeleting = false;
                const { error, data: id_deleted, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    toast('Suppression effectuée');
                    state.error = '';
                    state.datas = state.datas.filter((data: SubjectType) => data.id_matiere !== id_deleted);
                }
            })
            .addCase(deleteSubject.rejected, (state) => {
                state.action.isDeleting = false;
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })
    }
})

export const getSubjectState = (state: RootStateType) => state.subjects

export const { setSubjectDeleting } = SubjectSlice.actions;
export default SubjectSlice.reducer; 