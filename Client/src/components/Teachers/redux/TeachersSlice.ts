import { createSlice } from "@reduxjs/toolkit";
import { ActionIntialValue, ActionType, ApiReturnType, EmployeeType, TypePersonnelType } from "../../../Utils/Types";
import { RootStateType } from "../../../Redux/store";
import { toast } from "react-toastify";
import { getAllTeachers } from "./TeacherAsyncThunk";
import { createEmployees, deleteEmployees, updateEmployees } from "../../Employees/redux/EmployeAsyncThunk";


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

const TeacherSlice = createSlice({
    name: 'Teacher (enseignant)',
    initialState,
    reducers: {
        setSubjectDeleting: (state) => {
            state.action.isDeleting = true;
        },

    },
    extraReducers(builder) {

        // // ************************************* Read ************************************* //
        builder
            .addCase(getAllTeachers.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(getAllTeachers.fulfilled, (state, action: {
                payload: EmployeeType[]
            }) => {
                state.action.isLoading = false;
                state.datas = action.payload;
            })
            .addCase(getAllTeachers.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server'
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
                    const newData = data as TypePersonnelType & EmployeeType;
                    if (newData.type.includes('Enseignant')) {
                        state.datas.unshift(data);
                    }
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

        // // ************************************* Delete ************************************* //

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

export const getTeacherState = (state: RootStateType) => state.teacher

export const { setSubjectDeleting } = TeacherSlice.actions;
export default TeacherSlice.reducer; 