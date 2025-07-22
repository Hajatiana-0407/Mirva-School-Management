import { configureStore } from "@reduxjs/toolkit";
import LevelReducer from '../components/Levels/redux/LevelSlice' ;
import AppReducer from './AppSlice' ; 
import SubjectReducer from '../components/Subjects/redux/SubjectSlice' ;
import ClasseReducer from '../components/Classes/redux/ClasseSlice' ;
export const store = configureStore({
    reducer : {
        app : AppReducer ,  
        levels : LevelReducer ,
        subjects: SubjectReducer, 
        classe: ClasseReducer 
    }
}) ; 

export type RootStateType = ReturnType<typeof store.getState>  ; 
export type AppDispatch = typeof store.dispatch;

