import { createSlice } from "@reduxjs/toolkit";
import { ActionIntialValue, ActionType, ApiReturnType, levelType } from "../../../Utils/Types";
import { createLevel, deleteLevel, getAllLevel, updateLevel } from "./LevelAsyncThunk";
import { RootStateType } from "../../../Redux/store";
import { toast } from "react-toastify";


type initialStateType = {
    action: ActionType,
    datas: levelType[],
    page: number,
    error: string
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: [],
    page: 1,
    error: '',
}

const LevelSlice = createSlice({
    name: 'Level (Niveau)',
    initialState,
    reducers: {
        setLevelDeleting: (state) => {
            state.action.isDeleting = true;
        },

    },
    extraReducers(builder) {

        // // ************************************* Read ************************************* //
        builder
            .addCase(getAllLevel.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(getAllLevel.fulfilled, (state, action: {
                payload: levelType[]
            }) => {
                state.action.isLoading = false;
                state.datas = action.payload;
            })
            .addCase(getAllLevel.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server'
                toast.error("Erreur de connexion au server")  ; 
            }) ; 

        // ************************************* Create ************************************* //
        builder
            .addCase(createLevel.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(createLevel.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isLoading = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    toast('Niveau ajouté !');
                    state.error = '';
                    state.datas.unshift(data);
                }
            })
            .addCase(createLevel.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server'; 
                toast.error("Erreur de connexion au server") ; 
            })

        // // ************************************* Update ************************************* //
        builder
            .addCase(updateLevel.pending, (state) => {
                state.action.isUpdating = true;
            })
            .addCase(updateLevel.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isUpdating = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    toast('Niveau modifié !');
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
            .addCase(updateLevel.rejected, (state) => {
                state.action.isUpdating = false
                state.error = 'Erreur de connexion au server'; 
                toast.error("Erreur de connexion au server") ; 
            })

        // // ************************************* Delete ************************************* //

        builder
            .addCase(deleteLevel.pending, (state) => {
                state.action.isDeleting = true;

            })
            .addCase(deleteLevel.fulfilled, (state, action: { payload: ApiReturnType }) => {
                state.action.isDeleting = false;
                const { error, data: id_deleted, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    toast('Suppression effectuée');
                    state.error = '';
                    state.datas = state.datas.filter((data: levelType) => data.id_niveau !== id_deleted);
                }
            })
            .addCase(deleteLevel.rejected, (state) => {
                state.action.isDeleting = false;
                state.error = 'Erreur de connexion au server'; 
                toast.error("Erreur de connexion au server") ; 
            })
    }
})

export const getLevelState = (state: RootStateType) => state.levels

export const { setLevelDeleting } = LevelSlice.actions;
export default LevelSlice.reducer; 