import { createSlice } from "@reduxjs/toolkit";
import { ActionIntialValue, ActionType, ApiReturnType, StudentType } from "../../../Utils/Types";
import { RootStateType } from "../../../Redux/store";
import { toast } from "react-toastify";
import { createStudent, deleteStudent, getAllStudent, updateStudent } from "./StudentAsyncThunk";


type initialStateType = {
    action: ActionType,
    datas: StudentType[],
    page: number,
    error: string
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: [],
    page: 1,
    error: '',
}

const StudentSlice = createSlice({
    name: 'Student (Etudiant)',
    initialState,
    reducers: {
        setStudentDeleting: (state) => {
            state.action.isDeleting = true;
        },

    },
    extraReducers(builder) {

        // // // ************************************* Read ************************************* //
        builder
            .addCase(getAllStudent.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(getAllStudent.fulfilled, (state, action: {
                payload: StudentType[]
            }) => {
                state.action.isLoading = false;
                state.datas = action.payload;
            })
            .addCase(getAllStudent.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server'
                toast.error("Erreur de connexion au server")  ; 
            }) ; 

        // ************************************* Create ************************************* //
        builder
            .addCase(createStudent.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(createStudent.fulfilled, (state, action: {
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
            .addCase(createStudent.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server'; 
                toast.error("Erreur de connexion au server") ; 
            })

        // // ************************************* Update ************************************* //
        builder
            .addCase(updateStudent.pending, (state) => {
                state.action.isUpdating = true;
            })
            .addCase(updateStudent.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isUpdating = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    state.datas = state.datas.map(level => {
                        if (level.id_eleve === data?.id_eleve) {
                            return {
                                ...data,
                                id_eleve: level.id_eleve
                            }
                        }
                        return level
                    })
                }
            })
            .addCase(updateStudent.rejected, (state) => {
                state.action.isUpdating = false
                state.error = 'Erreur de connexion au server'; 
                toast.error("Erreur de connexion au server") ; 
            })

        // // ************************************* Delete ************************************* //

        builder
            .addCase(deleteStudent.pending, (state) => {
                state.action.isDeleting = true;

            })
            .addCase(deleteStudent.fulfilled, (state, action: { payload: ApiReturnType }) => {
                state.action.isDeleting = false;
                const { error, data: id_deleted, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    state.datas = state.datas.filter((data: StudentType) => data.id_eleve !== id_deleted);
                }
            })
            .addCase(deleteStudent.rejected, (state) => {
                state.action.isDeleting = false;
                state.error = 'Erreur de connexion au server'; 
                toast.error("Erreur de connexion au server") ; 
            })
    }
})

export const getStudentState = (state: RootStateType) => state.student

export const { setStudentDeleting } = StudentSlice.actions;
export default StudentSlice.reducer; 