import { configureStore } from "@reduxjs/toolkit";
import LevelReducer from '../components/Levels/redux/LevelSlice' ; 
export const store = configureStore({
    reducer : {
        levels : LevelReducer 
    }
}) ; 

export type RootStateType = ReturnType<typeof store.getState>  ; 
export type AppDispatch = typeof store.dispatch;

