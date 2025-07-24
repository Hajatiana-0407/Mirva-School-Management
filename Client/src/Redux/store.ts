import { configureStore } from "@reduxjs/toolkit";
import AppReducer from './AppSlice';
import LevelReducer from '../components/Levels/redux/LevelSlice';
import LevelsubjectReducer from '../components/Levels/redux/LevelSubjectSlice';
import SubjectReducer from '../components/Subjects/redux/SubjectSlice';
import ClasseReducer from '../components/Classes/redux/ClasseSlice';
export const store = configureStore({
    reducer: {
        app: AppReducer,
        levels: LevelReducer,
        levelSubject: LevelsubjectReducer , 
        subjects: SubjectReducer,
        classe: ClasseReducer,
    }
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

