import { createSlice } from "@reduxjs/toolkit";
import { ActionIntialValue, ActionType, ApiReturnType, ParentType } from "../../../Utils/Types";
import { RootStateType } from "../../../Redux/store";
import { toast } from "react-toastify";
import { createParent, deleteParent, getAllParent, updateParent } from "./ParentAsyncThunk";


type initialStateType = {
    action: ActionType,
    datas: ParentType[],
    page: number,
    error: string
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: [],
    page: 1,
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

        // // ************************************* Read ************************************* //
        builder
            .addCase(getAllParent.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(getAllParent.fulfilled, (state, action: {
                payload: ParentType[]
            }) => {
                state.action.isLoading = false;
                state.datas = action.payload;
            })
            .addCase(getAllParent.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server'
                toast.error("Erreur de connexion au server")  ; 
            }) ; 

        // ************************************* Create ************************************* //
        builder
            .addCase(createParent.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(createParent.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isLoading = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    toast.success('Matière ajoutée !');
                    state.error = '';
                    state.datas.unshift(data);
                }
            })
            .addCase(createParent.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server'; 
                toast.error("Erreur de connexion au server") ; 
            })

        // // ************************************* Update ************************************* //
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
                    toast.success('Matière modifiée !');
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
                toast.error("Erreur de connexion au server") ; 
            })

        // // ************************************* Delete ************************************* //

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
                    toast.success('Suppression effectuée');
                    state.error = '';
                    state.datas = state.datas.filter((data: ParentType) => data.id_parent !== id_deleted);
                }
            })
            .addCase(deleteParent.rejected, (state) => {
                state.action.isDeleting = false;
                state.error = 'Erreur de connexion au server'; 
                toast.error("Erreur de connexion au server") ; 
            })
    }
})

export const getParentState = (state: RootStateType) => state.parent

export const { setParentDeleting } = ParentSlice.actions;
export default ParentSlice.reducer; 