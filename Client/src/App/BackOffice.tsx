import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
import Dashboard from '../Pages/Dashboard';
import Classes from '../Pages/Classes/Classes';
import Levels from '../Pages/Levels/Levels';
import Subjects from '../Pages/Subjects/Subjects';
import Schedule from '../Pages/Shedules/Schedule';
import Attendance from '../Pages/Attendance';
import Exams from '../Pages/Exams';
import Payments from '../Pages/Payments';
import Messages from '../Pages/Messages';
import Settings from '../Pages/Settings/Settings';
import Employees from '../Pages/Employees/Employees';
import { useEffect } from 'react';
import { AppDispatch } from '../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTypePersonnel } from '../Redux/Other/asyncThunk/TypeEmployesAsyncThunk';
import EmployeesSinglePage from '../Pages/Employees/EmployeesSinglePage';
import Teachers from '../Pages/Teachers/Teachers';
import { getSchoolState } from '../Pages/Settings/School/redux/SchoolSlice';
import { getSchoolInfo } from '../Pages/Settings/School/redux/SchoolAsyncThunk';
import SchoolYear from '../Pages/School-Year/SchoolYear';
import { getSchoolYearState } from '../Pages/School-Year/redux/SchoolYearSlice';
import { getAllSchoolYear } from '../Pages/School-Year/redux/SchoolYearAsyncThunk';
import Registration from '../Pages/Registrations/Registration';
import Student from '../Pages/Students/Student';
import StudentSinglePage from '../Pages/Students/StudentSinglePage';
import Parents from '../Pages/Parents/Parents';
import ProtectedRoute from '../Security/ProtectedRoute';
import { getAuthState, testAuthentication } from '../Pages/Auth/redux/AuthSlice';
import Assignments from '../Pages/Teachers/Assignments';
import Lesson from '../Pages/Lessons/Lesson';
import Exercice from '../Pages/Exercices/Exercice';
import LessonSingle from '../Pages/Lessons/LessonSingle';
import { setNavigator } from '../Utils/navigate';
import { getModuleState } from '../Redux/Other/slices/ModuleSlice';
import { getAllModule } from '../Redux/Other/asyncThunk/ModuleAsyncThunk';
import ExerciceSingle from '../Pages/Exercices/ExerciceSingle';
import LevelDetails from '../Pages/Levels/LevelDetails';
import ClasseDetails from '../Pages/Classes/ClasseDetails';
import HomeSetting from '../Pages/website/Admin/Home/HomeAdmin';

function BackOffice() {
    const dispatch: AppDispatch = useDispatch();
    const { datas: schoolInfo } = useSelector(getSchoolState)
    const { activeSchoolYear } = useSelector(getSchoolYearState)
    const { datas: { isLoggedIn } } = useSelector(getAuthState);
    const { datas: modules } = useSelector(getModuleState)
    const navigate = useNavigate();
    // Utils
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getAllTypePersonnel())
            // Load school info
            if (schoolInfo?.code === "") {
                // Fetch school info only if not already loaded
                dispatch(getSchoolInfo());
            }
            if (!activeSchoolYear) {
                dispatch(getAllSchoolYear({}));
            }
            if (modules.length === 0) {
                dispatch(getAllModule());
            }
            // Verification si l'utilisateur est toujours authentifié
        }

        if (!isLoggedIn) {
            const token = localStorage.getItem('token');
            if (!!token) {
                dispatch(testAuthentication())
            } else {
                navigate('/signin');
            }
        }
    }, [isLoggedIn]);


    useEffect(() => {
        setNavigator(navigate);
    }, [navigate])


    return (
        <Routes>
            <Route element={<Layout />}>
                <Route element={<ProtectedRoute />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="students"  >
                        <Route index element={<Student />} />
                        <Route path=':id' element={<StudentSinglePage />} />
                    </Route>
                    <Route path="registration" element={<Registration />} />
                    <Route path='teachers'>
                        <Route index element={<Teachers />} />
                        <Route path=':id' element={<Assignments />} />
                    </Route>
                    <Route path="employees"  >
                        <Route index element={<Employees />} />
                        <Route path=':id' element={<EmployeesSinglePage />} />
                    </Route>

                    <Route path='classes'>
                        <Route index element={<Classes />} />
                        <Route path=':id' element={<ClasseDetails />} />
                    </Route>
                    <Route path='levels'>
                        <Route index element={<Levels />} />
                        <Route path=':active' element={<Levels />} />
                    </Route>
                    <Route path="level-details/:id" element={<LevelDetails />} />

                    <Route path="subjects" element={<Subjects />} />
                    <Route path="schedule" element={<Schedule />} />
                    <Route path="attendance" element={<Attendance />} />
                    <Route path="exams" element={<Exams />} />
                    <Route path="parents" element={<Parents />} />
                    <Route path="payments" element={<Payments />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="school-year" element={<SchoolYear />} />

                    {/* leçcons et exercices  */}
                    <Route path='lessons'>
                        <Route index element={<Lesson />} />
                        <Route path=':slug' element={<LessonSingle />} />
                    </Route>
                    <Route path='exercices'>
                        <Route index element={<Exercice />} />
                        <Route path=':slug' element={<ExerciceSingle />} />
                    </Route>

                    <Route path='homepage-settings' element={<HomeSetting />} />
                    {/* 404 Not found  */}
                    <Route path="*" element={<Navigate to="/back-office/dashboard" replace />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default BackOffice;