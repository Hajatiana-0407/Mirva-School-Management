import { configureStore } from "@reduxjs/toolkit";
import AppReducer from './AppSlice';
import LevelReducer from '../Pages/Levels/redux/LevelSlice';
import LevelsubjectReducer from '../Pages/Levels/redux/LevelSubjectSlice';
import SubjectReducer from '../Pages/Subjects/redux/SubjectSlice';
import ClasseReducer from '../Pages/Classes/redux/ClasseSlice';
import EmployeReducer from '../Pages/Employees/redux/EmployeSlice';
import TypeEmployeesReducer from '../Redux/Other/slices/TypeEmployeesSlice';
import TeacherReducer from '../Pages/Teachers/redux/TeachersSlice';
import SchoolReducer from '../Pages/Settings/School/redux/SchoolSlice';
import SchoolYearReducer from '../Pages/School-Year/redux/SchoolYearSlice';
import RegisterSlice from '../Pages/Registrations/redux/registerSlice';
import StudentReducer from '../Pages/Students/redux/StudentSlice'
import ParentReducer from '../Pages/Parents/redux/ParentSlice'
import AuthReduce from '../Pages/Auth/redux/AuthSlice'
import LessonReducer from '../Pages/Lessons/redux/LessonSlice'
import ExerciceReducer from '../Pages/Exercices/redux/ExerciceSlice'
import RoleReducer from '../Pages/Settings/UserRoles/redux/UserRolesSlice';
import ModuleReducer from './Other/slices/ModuleSlice'

// ? Import reducer pour le site 
import HeroReducer from '../Pages/website/Redux/Slice/Home/HeroSlice'
import Presentatioreducer from '../Pages/website/Redux/Slice/Home/PresentationSlice'
import ValueReducer from '../Pages/website/Redux/Slice/Home/ValueSlice'
import HistoryReducer from '../Pages/website/Redux/Slice/About/HistorySlice'
import MissionReducer from '../Pages/website/Redux/Slice/About/MissionSlice'
import PilierReducer from '../Pages/website/Redux/Slice/About/PilierSlice'
import InstallationReducer from '../Pages/website/Redux/Slice/About/InstallationSlice'

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
        school: SchoolReducer,
        schoolYears: SchoolYearReducer,
        registration: RegisterSlice,
        student: StudentReducer,
        parent: ParentReducer,
        auth: AuthReduce,
        lesson: LessonReducer,
        exercice: ExerciceReducer,
        role: RoleReducer,
        module: ModuleReducer,

        /**Reducer pour le site  */
        hero: HeroReducer , 
        presentation : Presentatioreducer,
        values : ValueReducer,
        history : HistoryReducer,
        mission : MissionReducer,
        pilier : PilierReducer,
        installation : InstallationReducer 
    }
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

