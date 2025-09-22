import { createSlice } from "@reduxjs/toolkit";
import { ActionIntialValue, ActionType, ApiReturnType, EmployeeType } from "../../../Utils/Types";
import { RootStateType } from "../../../Redux/store";
import { toast } from "react-toastify";
import { createEmployees, deleteEmployees, getAllEmployees, updateEmployees } from "./EmployeAsyncThunk";


type initialStateType = {
    action: ActionType,
    datas: EmployeeType[],
    page: number,
    error: string
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: [],
    page: 1,
    error: '',
}

const EmployeSlice = createSlice({
    name: 'Subject (Niveau)',
    initialState,
    reducers: {
        setSubjectDeleting: (state) => {
            state.action.isDeleting = true;
        },

    },
    extraReducers(builder) {

        // ? ************************************* Read ************************************* //
        builder
            .addCase(getAllEmployees.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(getAllEmployees.fulfilled, (state, action: {
                payload: EmployeeType[]
            }) => {
                state.action.isLoading = false;
                state.datas = action.payload;
            })
            .addCase(getAllEmployees.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server'
                toast.error("Erreur de connexion au server");
            });

        // ************************************* Create ************************************* //
        builder
            .addCase(createEmployees.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(createEmployees.fulfilled, (state, action: {
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
            .addCase(createEmployees.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })

        // // ************************************* Update ************************************* //
        builder
            .addCase(updateEmployees.pending, (state) => {
                state.action.isUpdating = true;
            })
            .addCase(updateEmployees.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isUpdating = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {

                    state.error = '';
                    state.datas = state.datas.map(level => {
                        if (level.id_personnel === data?.id_personnel) {
                            return {
                                ...data,
                                id_matiere: level.id_personnel
                            }
                        }
                        return level
                    })
                }
            })
            .addCase(updateEmployees.rejected, (state) => {
                state.action.isUpdating = false
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })

        // ! ************************************* Delete ************************************* //

        builder
            .addCase(deleteEmployees.pending, (state) => {
                state.action.isDeleting = true;

            })
            .addCase(deleteEmployees.fulfilled, (state, action: { payload: ApiReturnType }) => {
                state.action.isDeleting = false;
                const { error, data: id_deleted, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    state.datas = state.datas.filter((data: EmployeeType) => data.id_personnel !== id_deleted);
                }
            })
            .addCase(deleteEmployees.rejected, (state) => {
                state.action.isDeleting = false;
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })
    }
})

export const getEmployeState = (state: RootStateType) => state.employes

export const { setSubjectDeleting } = EmployeSlice.actions;
export default EmployeSlice.reducer; 