import { createSlice } from "@reduxjs/toolkit";
import { ActionIntialValue, ActionType, ApiReturnType, PaginationInitialValue, PaginationType, SchoolYearType } from "../../../Utils/Types";
import { RootStateType } from "../../../Redux/store";
import { toast } from "react-toastify";
import { changeActiveSchoolYear, createSchoolYear, deleteSchoolYear, getAllSchoolYear, updateSchoolYear } from "./SchoolYearAsyncThunk";

// Type SchoolYear à adapter selon votre modèle

type initialStateType = {
    action: ActionType,
    datas: SchoolYearType[],
    activeSchoolYear: SchoolYearType | null,
    pagination: PaginationType,
    error: string
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: [],
    activeSchoolYear: null,
    pagination: PaginationInitialValue ,
    error: '',
}

const SchoolYearSlice = createSlice({
    name: 'SchoolYear',
    initialState,
    reducers: {
        setSchoolYearDeleting: (state) => {
            state.action.isDeleting = true;
        },
    },
    extraReducers(builder) {
        // READ
        builder
            .addCase(getAllSchoolYear.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(getAllSchoolYear.fulfilled, (state, action: { payload: ApiReturnType }) => {
                state.action.isLoading = false;
                state.datas = action.payload.data;
                state.pagination = action.payload.pagination

                if (state.datas.length > 0) {
                    state.activeSchoolYear = state.datas.find(year => year.isActif === '1') || state.datas[0];
                } else {
                    state.activeSchoolYear = null;
                }
                state.error = '';
            })
            .addCase(getAllSchoolYear.rejected, (state) => {
                state.action.isLoading = false;
                toast.error("Erreur de connexion au server");
            });

        // CREATE
        builder
            .addCase(createSchoolYear.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(createSchoolYear.fulfilled, (state, action: { payload: any }) => {
                state.action.isLoading = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    toast('Année scolaire ajoutée !');
                    state.error = '';
                    state.datas.unshift(data);
                    // l'année scolaire nouvellement créée devient l'année scolaire active
                    state.datas = state.datas.map(year =>
                        year.id_annee_scolaire === data?.id_annee_scolaire ? { ...data, id_annee_scolaire: year.id_annee_scolaire } : { ...year, isActif: '0' }
                    );
                    state.activeSchoolYear = {
                        ...data, id_annee_scolaire: data?.id_annee_scolaire
                    }
                }
            })
            .addCase(createSchoolYear.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            });

        // UPDATE
        builder
            .addCase(updateSchoolYear.pending, (state) => {
                state.action.isUpdating = true;
            })
            .addCase(updateSchoolYear.fulfilled, (state, action: { payload: any }) => {
                state.action.isUpdating = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    toast('Année scolaire modifiée !');
                    state.error = '';
                    state.datas = state.datas.map(year =>
                        year.id_annee_scolaire === data?.id_annee_scolaire ? { ...data, id_annee_scolaire: year.id_annee_scolaire } : year
                    );
                }
            })
            .addCase(updateSchoolYear.rejected, (state) => {
                state.action.isUpdating = false;
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            });

        // DELETE
        builder
            .addCase(deleteSchoolYear.pending, (state) => {
                state.action.isDeleting = true;
            })
            .addCase(deleteSchoolYear.fulfilled, (state, action: { payload: any }) => {
                state.action.isDeleting = false;
                const { error, data: id_deleted, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    toast('Suppression effectuée');
                    state.error = '';
                    state.datas = state.datas.filter((data: SchoolYearType) => data.id_annee_scolaire !== id_deleted);

                    if (state.datas.length > 0) {
                        state.datas[0].isActif = '1';
                        // Met à jour l'année scolaire active si l'année supprimée était active
                        if (state.activeSchoolYear?.id_annee_scolaire === id_deleted) {
                            state.activeSchoolYear = state.datas[0];
                        }
                    }
                    else {
                        state.activeSchoolYear = null;
                    }
                }
            })
            .addCase(deleteSchoolYear.rejected, (state) => {
                state.action.isDeleting = false;
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            });

        // Change the active school-year 
        builder
            .addCase(changeActiveSchoolYear.pending, (state) => {
                state.action.isUpdating = true;
            })
            .addCase(changeActiveSchoolYear.fulfilled, (state, action: { payload: ApiReturnType }) => {
                state.action.isUpdating = false;
                const { error, data: id_annee_scolaire } = action.payload;
                if (!error) {
                    state.datas = state.datas.map((data: SchoolYearType) => {
                        if (data.id_annee_scolaire == id_annee_scolaire as number) {
                            state.activeSchoolYear = { ...data, isActif: '1' };
                            return { ...data, isActif: '1' };
                        }
                        return { ...data, isActif: '0' };
                    })

                }
            })
            .addCase(changeActiveSchoolYear.rejected, (state) => {
                state.action.isUpdating = false;
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            });
    }
});

export const getSchoolYearState = (state: RootStateType) => state.schoolYears;
export const { setSchoolYearDeleting } = SchoolYearSlice.actions;
export default SchoolYearSlice.reducer;
