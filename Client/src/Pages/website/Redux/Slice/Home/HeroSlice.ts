import { createSlice } from "@reduxjs/toolkit";
import { RootStateType } from "../../../../../Redux/store";
import { ActionIntialValue, ActionType, ApiReturnType } from "../../../../../Utils/Types";
import { HeroSlideType } from "../../../Type";
import { getAllHero } from "../../AsyncThunk/HomeAsyncThunk";

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
    }
})

export const getHeroState = (state: RootStateType) => state.hero;
export default HeroSlice.reducer; 