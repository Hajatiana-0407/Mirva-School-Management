import { createSlice } from "@reduxjs/toolkit";
import { ActionIntialValue, ActionType, ApiReturnType, levelType } from "../../../Utils/Types";
import { getAllLevel, updateLevel } from "./LevelAsyncThunk";
import { RootStateType } from "../../../Redux/store";
import { toast } from "react-toastify";


type initialStateType = {
    action: ActionType,
    datas: levelType[],
    page: number,
    error: string
}

const initialState: initialStateType = {
    action: ActionIntialValue ,
    datas: [],
    page: 1,
    error: '' , 
}

const LevelSlice = createSlice({
    name: 'Level (Niveau)',
    initialState,
    reducers: {
        setLevelDeleting: (state) => {
            state.action.isDeleting = true;
        }  , 
        
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
                state.action.isLoading = false
            })



        // ************************************* Creat ************************************* //
        // builder
        //     .addCase(LevelAdd.pending, (state) => {
        //         state.action.isLoading = true;
        //     })
        //     .addCase(LevelAdd.fulfilled, (state, action: {
        //         payload: levelType
        //     }) => {
        //         state.action.isLoading = false;
        //         state.datas.unshift({
        //             ...action.payload,
        //             id: state.datas.length + 1
        //         })
        //     })
        //     .addCase(LevelAdd.rejected, (state) => {
        //         state.action.isLoading = false
        //     })

        // // ************************************* Update ************************************* //
        builder
            .addCase(updateLevel.pending, (state) => {
                state.action.isUpdating = true;
            })
            .addCase(updateLevel.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isLoading = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    toast.success('Niveau modifié !');
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
            })

        // // ************************************* Delete ************************************* //

        // builder
        //     .addCase(LevelDelete.pending, (state) => {
        //         state.action.isLoading = true;
        //         state.action.isDeleting = true;

        //     })
        //     .addCase(LevelDelete.fulfilled, (state, action: { payload: number }) => {
        //         state.action.isLoading = false;
        //         state.action.isDeleting = false;
        //         state.datas = state.datas.filter((data: levelType) => data.id !== action.payload);
        //         toast.success('Suppression effectuée');
        //     })
        //     .addCase(LevelDelete.rejected, (state) => {
        //         state.action.isLoading = false
        //         state.action.isDeleting = false
        //     })
    }
})

export const getLevelState = (state: RootStateType) => state.levels

export const { setLevelDeleting } = LevelSlice.actions;
export default LevelSlice.reducer; 