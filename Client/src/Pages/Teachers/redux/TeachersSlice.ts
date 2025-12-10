import { createSlice } from "@reduxjs/toolkit";
import { ActionIntialValue, ActionType, ApiReturnType, EmployeeType, PaginationInitialValue, PaginationType, TypePersonnelType } from "../../../Utils/Types";
import { RootStateType } from "../../../Redux/store";
import { toast } from "react-toastify";
import { assignationTeacher, createTeacher, filterTeacher, getAllTeachers, getTeacherByMatricule, updateTeacher } from "./TeacherAsyncThunk";
import { deleteEmployees } from "../../Employees/redux/EmployeAsyncThunk";
import { AssignationType } from "../../TeacherSubject";

type initialStateType = {
    action: ActionType,
    datas: EmployeeType[],
    pagination: PaginationType,
    error: string;
    single: {
        data?: EmployeeType & TypePersonnelType & { assignations?: AssignationType[] };
        action: ActionType & { isLoadingAssignation?: boolean }
    }
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: [],
    pagination: PaginationInitialValue,
    error: '',
    single: {
        action: ActionIntialValue
    }
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
        // ? ************************************* Read ************************************* //
        builder
            .addCase(getAllTeachers.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(getAllTeachers.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isLoading = false;
                if (action.payload.data)
                    state.datas = action.payload.data;
                if (action.payload.pagination)
                    state.pagination = action.payload.pagination
            })
            .addCase(getAllTeachers.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server'
                toast.error("Erreur de connexion au server");
            });
        // Filtre 
        builder
            .addCase(filterTeacher.pending, (state) => {
                state.action.isFilterLoading = true;
                state.error = '';
            })
            .addCase(filterTeacher.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isFilterLoading = false;
                if (action.payload.data)
                    state.datas = action.payload.data;
                if (action.payload.pagination)
                    state.pagination = action.payload.pagination
            })
            .addCase(filterTeacher.rejected, (state) => {
                state.action.isFilterLoading = false;
                state.error = 'Erreur de connexion au server'
            });

        // ************************************* Create ************************************* //
        builder
            .addCase(createTeacher.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(createTeacher.fulfilled, (state, action: {
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
            .addCase(createTeacher.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })

        // ! ************************************* Update ************************************* //
        builder
            .addCase(updateTeacher.pending, (state) => {
                state.action.isUpdating = true;
            })
            .addCase(updateTeacher.fulfilled, (state, action: {
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
            .addCase(updateTeacher.rejected, (state) => {
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



        //? ===================== Teacher detaails ===================== //
        builder
            .addCase(getTeacherByMatricule.pending, (state) => {
                state.single.action.isLoading = true;
                state.error = '';
            })
            .addCase(getTeacherByMatricule.fulfilled, (state, action: { payload: ApiReturnType }) => {
                state.single.action.isLoading = false;
                const { error, data: employe, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.single.data = employe;
                }
            })
            .addCase(getTeacherByMatricule.rejected, (state) => {
                state.single.action.isLoading = false;
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })


        // ===================== ASSIGNATIONS CLASSE ET MATIÈRE ===================== //
        builder
            .addCase(assignationTeacher.pending, (state) => {
                state.single.action.isLoadingAssignation = true;
                state.error = '';
            })
            .addCase(assignationTeacher.fulfilled, (state, action: { payload: ApiReturnType }) => {
                state.single.action.isLoadingAssignation = false;
                const { error, message, data } = action.payload;

                if (error) {
                    state.error = message as string;
                } else {
                    if (data.id_personnel) {
                        state.single.data = data;
                    }
                    toast("Assignations mise à jour avec succès")
                }
            })
            .addCase(assignationTeacher.rejected, (state) => {
                state.single.action.isLoadingAssignation = false;
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })

    }
})

export const getTeacherState = (state: RootStateType) => state.teacher

export const { setSubjectDeleting } = TeacherSlice.actions;
export default TeacherSlice.reducer; 