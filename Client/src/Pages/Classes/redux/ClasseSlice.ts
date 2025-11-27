import { createSlice } from "@reduxjs/toolkit";
import { ActionIntialValue, ActionType, ApiReturnType, ClasseType } from "../../../Utils/Types";
import { createClasse, deleteClasse, getAllClasse, updateClasse } from "./ClasseAsyncThunk";
import { RootStateType } from "../../../Redux/store";
import { toast } from "react-toastify";
import { logoutUser } from "../../Auth/redux/AuthAsyncThunk";


type initialStateType = {
    action: ActionType,
    datas: ClasseType[],
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
    name: 'Classe',
    initialState,
    reducers: {
        setLevelDeleting: (state) => {
            state.action.isDeleting = true;
        },

    },
    extraReducers(builder) {
        builder.addCase(logoutUser.fulfilled, () => {
            return initialState;
        });
        // // ************************************* Read ************************************* //
        builder
            .addCase(getAllClasse.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(getAllClasse.fulfilled, (state, action: {
                payload: ClasseType[]
            }) => {
                state.action.isLoading = false;
                state.datas = action.payload;
            })
            .addCase(getAllClasse.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server'
                toast.error("Erreur de connexion au server");
            });

        // ************************************* Create ************************************* //
        builder
            .addCase(createClasse.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(createClasse.fulfilled, (state, action: {
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
            .addCase(createClasse.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })

        // // ************************************* Update ************************************* //
        builder
            .addCase(updateClasse.pending, (state) => {
                state.action.isUpdating = true;
            })
            .addCase(updateClasse.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isUpdating = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    toast('Niveau modifié !');
                    state.error = '';
                    state.datas = state.datas.map(classe => {
                        if (classe.id_classe === data?.id_classe) {
                            return {
                                ...data,
                                id_classe: classe.id_classe
                            }
                        }
                        return classe
                    })
                }
            })
            .addCase(updateClasse.rejected, (state) => {
                state.action.isUpdating = false
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })

        // // ************************************* Delete ************************************* //

        builder
            .addCase(deleteClasse.pending, (state) => {
                state.action.isDeleting = true;

            })
            .addCase(deleteClasse.fulfilled, (state, action: { payload: ApiReturnType }) => {
                state.action.isDeleting = false;
                const { error, data: id_deleted, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    toast('Suppression effectuée');
                    state.error = '';
                    state.datas = state.datas.filter((data: ClasseType) => data.id_classe !== id_deleted);
                }
            })
            .addCase(deleteClasse.rejected, (state) => {
                state.action.isDeleting = false;
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })
    }
})

export const getClasseState = (state: RootStateType) => state.classe

export const { setLevelDeleting } = LevelSlice.actions;
export default LevelSlice.reducer; 