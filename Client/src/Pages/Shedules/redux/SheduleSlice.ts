import { createSlice } from "@reduxjs/toolkit";
import { ActionIntialValue, ActionType, ApiReturnType, SheduleByClasseType } from "../../../Utils/Types";
import { createShedule, deleteShedule, getAllShedule, updateShedule } from "./SheduleAsyncThunk";
import { RootStateType } from "../../../Redux/store";
import { logoutUser } from "../../Auth/redux/AuthAsyncThunk";
type initialStateType = {
    action: ActionType,
    datas?: SheduleByClasseType[],
    page: number,
    error: string
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: [],
    page: 1,
    error: '',
}

const SheduleSlice = createSlice({
    name: 'Shedule',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(logoutUser.fulfilled, () => {
            return initialState;
        });

        // // ************************************* Read ************************************* //
        builder
            .addCase(getAllShedule.pending, (state) => {
                state.action.isLoading = true;
                state.error = '';
            })
            .addCase(getAllShedule.fulfilled, (state, action: {
                payload: SheduleByClasseType[]
            }) => {
                state.action.isLoading = false;
                state.datas = action.payload;
            })
            .addCase(getAllShedule.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server'
            });

        // ************************************* Create ************************************* //
        builder
            .addCase(createShedule.pending, (state) => {
                state.action.isLoading = true;
                state.error = '';
            })
            .addCase(createShedule.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isLoading = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    if (data) {
                        state.datas = state.datas?.map(shedule => {
                            if ((shedule.id_classe && shedule.id_classe == data.id_classe) || (shedule.id_personnel && shedule.id_personnel == data.id_personnel)) {
                                return data;
                            }
                            return shedule
                        })
                    }
                }
            })
            .addCase(createShedule.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server';
            })

        //  ************************************* Update ************************************* //
        builder
            .addCase(updateShedule.pending, (state) => {
                state.action.isUpdating = true;
            })
            .addCase(updateShedule.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isUpdating = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    if (data) {
                        state.datas = state.datas?.map(shedule => {
                            if ((shedule.id_classe && shedule.id_classe == data.id_classe) || (shedule.id_personnel && shedule.id_personnel == data.id_personnel)) {
                                return data;
                            }
                            return shedule
                        })
                    }
                }
            })
            .addCase(updateShedule.rejected, (state) => {
                state.action.isUpdating = false
                state.error = 'Erreur de connexion au server';
            })
        // // ************************************* Delete ************************************* //

        builder
            .addCase(deleteShedule.pending, (state) => {
                state.action.isDeleting = true;
                state.error = '';
            })
            .addCase(deleteShedule.fulfilled, (state, action: { payload: ApiReturnType }) => {
                state.action.isDeleting = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    state.error = '';
                    if (data) {
                        state.datas = state.datas?.map(shedule => {
                            if ((shedule.id_classe && shedule.id_classe == data.id_classe) || (shedule.id_personnel && shedule.id_personnel == data.id_personnel)) {
                                return data;
                            }
                            return shedule
                        })
                    }
                }
            })
            .addCase(deleteShedule.rejected, (state) => {
                state.action.isDeleting = false;
                state.error = 'Erreur de connexion au server';
            })
    }
})

export const getSheduleState = (state: RootStateType) => state.shedule
export default SheduleSlice.reducer; 