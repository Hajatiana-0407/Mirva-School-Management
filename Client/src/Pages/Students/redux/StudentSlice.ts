import { createSlice } from "@reduxjs/toolkit";
import { ActionIntialValue, ActionType, ApiReturnType, PaginationInitialValue, PaginationType, StudentType } from "../../../Utils/Types";
import { RootStateType } from "../../../Redux/store";
import { toast } from "react-toastify";
import { createStudent, deleteStudent, filterStudent, getAllStudent, getStudentByMatricule, updateStudent } from "./StudentAsyncThunk";
import { StudentDetailsType } from "../../../Utils/Types";
import { createRegistration } from "../../Registrations/redux/registerAsyncThunk";
import { logoutUser } from "../../Auth/redux/AuthAsyncThunk";


type initialStateType = {
    action: ActionType,
    datas: StudentType[],
    pagination: PaginationType,
    error: string
    single: {
        data?: StudentDetailsType;
        action: ActionType
    }
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: [],
    pagination: PaginationInitialValue,
    error: '',
    single: { action: ActionIntialValue }
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
        builder.addCase(logoutUser.fulfilled, () => {
            return initialState;
        });

        // ? ===================== Read  ===================== //
        builder
            .addCase(getAllStudent.pending, (state) => {
                state.action.isLoading = true;
                state.error = '';
            })
            .addCase(getAllStudent.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isLoading = false;
                state.datas = action.payload.data;
                state.pagination = action.payload.pagination
            })
            .addCase(getAllStudent.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server'
            });

        // Filtre 
        builder
            .addCase(filterStudent.pending, (state) => {
                state.action.isFilterLoading = true;
                state.error = '';
            })
            .addCase(filterStudent.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isFilterLoading = false;
                state.datas = action.payload.data;
                state.pagination = action.payload.pagination
            })
            .addCase(filterStudent.rejected, (state) => {
                state.action.isFilterLoading = false;
                state.error = 'Erreur de connexion au server'
            });


        // ? ************************************* Create ************************************* //
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
                toast.error("Erreur de connexion au server");
            })

        // ************************************* Update ************************************* //
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
                    });
                    if (state.single.data?.id_eleve === data?.id_eleve) {
                        state.single.data = data;
                    }
                }
            })
            .addCase(updateStudent.rejected, (state) => {
                state.action.isUpdating = false
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })

        // ! ************************************* Delete ************************************* //

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
                toast.error("Erreur de connexion au server");
            })


        // ? ************************************* Student single  ************************************* //
        builder
            .addCase(getStudentByMatricule.pending, (state) => {
                state.single.action.isLoading = true;
                state.error = '';
            })
            .addCase(getStudentByMatricule.fulfilled, (state, action: { payload: ApiReturnType }) => {
                state.single.action.isLoading = false;
                const { error, data: employe, message } = action.payload;

                if (error) {
                    state.error = message as string;
                } else {
                    state.single.data = employe;
                }
            })
            .addCase(getStudentByMatricule.rejected, (state) => {
                state.single.action.isLoading = false;
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })



        // Inscription
        builder
            .addCase(createRegistration.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(createRegistration.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isLoading = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    const newStudent: StudentDetailsType = {
                        id_eleve: data.eleve_id_eleve,
                        nom: data.nom_eleve,
                        prenom: data.prenom,
                        photo: data.photo,
                        matricule_etudiant: data.matricule_etudiant,
                        email: data.email,
                        telephone: data.telephone,
                        nationalite: data.nationalite,
                        sexe: data.sexe,
                        classe: data.telephone,
                        date_naissance: data.date_naissance,
                        lieu_naissance: data.date_naissance,
                        adresse: data.adresse,

                        niveau: data.niveau,
                        cycle: data.cycle,
                        description: data.description,
                        denomination: data.denomination,
                        niveau_id_niveau: data.niveau_id_niveau,

                        urgence_lien: data.urgence_lien,
                        urgence_nom: data.urgence_nom,
                        urgence_tel: data.urgence_tel
                    }


                    state.error = '';
                    state.datas.unshift(newStudent);
                }
            })
            .addCase(createRegistration.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })
    }
})

export const getStudentState = (state: RootStateType) => state.student

export const { setStudentDeleting } = StudentSlice.actions;
export default StudentSlice.reducer; 