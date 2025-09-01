import { configureStore } from "@reduxjs/toolkit";
import AppReducer from './AppSlice';
import LevelReducer from '../components/Levels/redux/LevelSlice';
import LevelsubjectReducer from '../components/Levels/redux/LevelSubjectSlice';
import SubjectReducer from '../components/Subjects/redux/SubjectSlice';
import ClasseReducer from '../components/Classes/redux/ClasseSlice';
import EmployeReducer from '../components/Employees/redux/EmployeSlice';
import TypeEmployeesReducer from '../Redux/Other/slices/TypeEmployeesSlice';
import TeacherReducer from '../components/Teachers/redux/TeachersSlice';
import SchoolReducer from '../components/Settings/School/redux/SchoolSlice';
export const store = configureStore({
    reducer: {
        app: AppReducer,
        levels: LevelReducer,
        levelSubject: LevelsubjectReducer,
        subjects: SubjectReducer,
        classe: ClasseReducer,
        employes: EmployeReducer,
        teacher: TeacherReducer,
        typeEmployees: TypeEmployeesReducer,
        school : SchoolReducer,
    }
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

