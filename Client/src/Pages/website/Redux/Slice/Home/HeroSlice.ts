import { createSlice } from "@reduxjs/toolkit";
import { RootStateType } from "../../../../../Redux/store";
import { ActionIntialValue, ActionType, ApiReturnType } from "../../../../../Utils/Types";
import { HeroSlideType } from "../../../Type";
import { createSlide, deleteSlide, getAllHero, updateSlide } from "../../AsyncThunk/HomeAsyncThunk";
import { toast } from "react-toastify";

type initialStateType = {
    action: ActionType,
    datas: HeroSlideType[],
    error: string
}

const initialState: initialStateType = {
    action: ActionIntialValue,
    datas: [],
    error: '',
}

const HeroSlice = createSlice({
    name: 'Hero section ( site ) ',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        // ? Recuperation 
        builder
            .addCase(getAllHero.pending, (state) => {
                state.action.isLoading = true;
                state.error = '';
            })
            .addCase(getAllHero.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isLoading = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.datas = data
                }
            })
            .addCase(getAllHero.rejected, (state) => {
                state.action.isLoading = false
                state.error = 'Erreur de connexion au server';
            })

        // ? Creation 
        builder
            .addCase(createSlide.pending, (state) => {
                state.action.isLoading = true;
                state.error = '';
            })
            .addCase(createSlide.fulfilled, (state, action: {
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
            .addCase(createSlide.rejected, (state) => {
                state.action.isLoading = false;
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })

        // ? Modification 
        builder
            .addCase(updateSlide.pending, (state) => {
                state.action.isUpdating = true;
                state.error = '';
            })
            .addCase(updateSlide.fulfilled, (state, action: {
                payload: ApiReturnType
            }) => {
                state.action.isUpdating = false;
                const { error, data, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    state.datas = state.datas.map(slide => {
                        if (slide.id_slide === data?.id_slide) {
                            return {
                                ...data,
                                id_slide: slide.id_slide
                            }
                        }
                        return slide
                    })
                }
            })
            .addCase(updateSlide.rejected, (state) => {
                state.action.isUpdating = false
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })

        // ! Suppression 
        builder
            .addCase(deleteSlide.pending, (state) => {
                state.action.isDeleting = true;
                state.error = '';

            })
            .addCase(deleteSlide.fulfilled, (state, action: { payload: ApiReturnType }) => {
                state.action.isDeleting = false;
                const { error, data: id_deleted, message } = action.payload;
                if (error) {
                    state.error = message as string;
                } else {
                    state.error = '';
                    state.datas = state.datas.filter((data: HeroSlideType) => data.id_slide !== id_deleted);
                }
            })
            .addCase(deleteSlide.rejected, (state) => {
                state.action.isDeleting = false;
                state.error = 'Erreur de connexion au server';
                toast.error("Erreur de connexion au server");
            })
    }
})

export const getHeroState = (state: RootStateType) => state.hero;
export default HeroSlice.reducer; 