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
import SchoolYearReducer from '../components/School-Year/redux/SchoolYearSlice';
import RegisterSlice from '../components/Registrations/redux/registerSlice';
import StudentReducer from '../components/Students/redux/StudentSlice'
import ParentReducer from '../components/Parents/redux/ParentSlice'

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
        schoolYears : SchoolYearReducer,
        registration : RegisterSlice,
        student : StudentReducer  , 
        parent: ParentReducer
    }
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

