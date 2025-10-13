import { createSlice } from "@reduxjs/toolkit";
import { RootStateType } from "./store";
import { AppInitialValue } from "../Utils/Types";

const AppSlice = createSlice( {
    name:'Appication Slice' , 
    initialState: AppInitialValue , 
    reducers:{
        setHiddeModalValue: ( state , action: {payload: boolean } ) => {
            state.hiddeTheModalActive = action.payload ; 
        }
    }
})

export const getAppState = ( state: RootStateType ) => state.app
export const { setHiddeModalValue } = AppSlice.actions ; 
export default AppSlice.reducer ; 