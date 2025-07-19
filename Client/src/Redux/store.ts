import { configureStore } from "@reduxjs/toolkit";
import LevelReducer from '../components/Levels/redux/LevelSlice' ;
import AppReducer from './AppSlice' ; 
export const store = configureStore({
    reducer : {
        levels : LevelReducer , 
        app : AppReducer ,  
    }
}) ; 

export type RootStateType = ReturnType<typeof store.getState>  ; 
export type AppDispatch = typeof store.dispatch;

