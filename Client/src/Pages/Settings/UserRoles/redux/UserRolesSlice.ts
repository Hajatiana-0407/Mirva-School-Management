import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ActionIntialValue, ActionType, ApiReturnType, RoleType } from "../../../../Utils/Types";
import { createRole, deleteRole, getAllRole, updateRole } from "./UserRolesAsyncThunk";
import { RootStateType } from "../../../../Redux/store";
import { logoutUser } from "../../../Auth/redux/AuthAsyncThunk";

type initialStateType = {
    action: ActionType,
    datas: RoleType[],
    page: number,
    error: string
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: [],
    page: 1,
    error: '',
}

const ParentSlice = createSlice({
    name: 'Parent (Niveau)',
    initialState,
    reducers: {
        setParentDeleting: (state) => {
            state.action.isDeleting = true;
        },

    },
    extraReducers(builder) {
        builder.addCase(logoutUser.fulfilled, () => {
            return initialState;
        });


        // ? ************************************* Read ************************************* //
        builder
            .addCase(getAllRole.pending, (state) => {
                state.action.isLoading = true;
            })
            .addCase(getAllRole.fulfilled, (state, action: {
                payload: RoleType[]
            }) => {
                state.action.isLoading = false;
                state.datas = action.payload;
            })
            .addCase(getAllRole.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server'
                toast.error("Erreur de connexion au server");
            });

        // ? ************************************* CREATE ************************************* //
        builder
            .addCase(createRole.pending, (state) => {
                state.action.isLoading = true;
                state.error = '';
            })
            .addCase(createRole.fulfilled, (state, action: {
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
            .addCase(createRole.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server';
            })



        // ? ************************************* Update ************************************* //
        builder
            .addCase(updateRole.pending, (state) => {
                state.action.isUpdating = true;
            })
            .addCase(updateRole.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isUpdating = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    state.datas = state.datas.map(role => {
                        if (role.id_role === data?.id_role) {
                            return {
                                ...data,
                                id_role: role.id_role
                            }
                        }
                        return role
                    })
                }
            })
            .addCase(updateRole.rejected, (state) => {
                state.action.isUpdating = false
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })


        // ! ************************************* Delete ************************************* //

        builder
            .addCase(deleteRole.pending, (state) => {
                state.action.isDeleting = true;

            })
            .addCase(deleteRole.fulfilled, (state, action: { payload: ApiReturnType }) => {
                state.action.isDeleting = false;
                const { error, data: id_deleted, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    state.datas = state.datas.filter((data: RoleType) => data.id_role !== id_deleted);
                }
            })
            .addCase(deleteRole.rejected, (state) => {
                state.action.isDeleting = false;
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })
    }
})

export const getRoleState = (state: RootStateType) => state.role

export const { setParentDeleting } = ParentSlice.actions;
export default ParentSlice.reducer; 