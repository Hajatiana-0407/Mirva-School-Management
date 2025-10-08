import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Dashboard from './Pages/Dashboard';
import Classes from './Pages/Classes/Classes';
import Levels from './Pages/Levels/Levels';
import Subjects from './Pages/Subjects/Subjects';
import Schedule from './Pages/Schedule';
import Attendance from './Pages/Attendance';
import Exams from './Pages/Exams';
import Payments from './Pages/Payments';
import Messages from './Pages/Messages';
import Settings from './Pages/Settings/Settings';
import { ToastContainer } from 'react-toastify';
import Employees from './Pages/Employees/Employees';
import { useEffect } from 'react';
import { AppDispatch } from './Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTypePersonnel } from './Redux/Other/asyncThunk/TypeEmployesAsyncThunk';
import EmployeesSinglePage from './Pages/Employees/EmployeesSinglePage';
import Teachers from './Pages/Teachers/Teachers';
import { getSchoolState } from './Pages/Settings/School/redux/SchoolSlice';
import { getSchoolInfo } from './Pages/Settings/School/redux/SchoolAsyncThunk';
import SchoolYear from './Pages/School-Year/SchoolYear';
import { getSchoolYearState } from './Pages/School-Year/redux/SchoolYearSlice';
import { getAllSchoolYear } from './Pages/School-Year/redux/SchoolYearAsyncThunk';
import Registration from './Pages/Registrations/Registration';
import Student from './Pages/Students/Student';
import StudentSinglePage from './Pages/Students/StudentSinglePage';
import Parents from './Pages/Parents/Parents';
import Signin from './Pages/Auth/Signin';
import ProtectedRoute from './Security/ProtectedRoute';
import { testAuthentication } from './Pages/Auth/redux/AuthSlice';



function App() {
  const dispatch: AppDispatch = useDispatch();
  const { datas: schoolInfo } = useSelector(getSchoolState)
  const { activeSchoolYear } = useSelector(getSchoolYearState)

  // Utils
  useEffect(() => {
    dispatch(getAllTypePersonnel())
    // Load school info
    if (schoolInfo?.code === "") {
      // Fetch school info only if not already loaded
      dispatch(getSchoolInfo());
    }

    if (!!!activeSchoolYear) {
      dispatch(getAllSchoolYear());
    }
    // Verification si l'utilisateur est toujours authentifié
    dispatch(testAuthentication())
  }, []);

  return (
    < >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
      <Routes>
        {/* Authentification */}
        <Route path='/signin' element={<Signin />} />
        {/* Authentification */}

        <Route element={<Layout />}>
          <Route element={<ProtectedRoute />}>

            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="students"  >
              <Route index element={<Student />} />
              <Route path=':id' element={<StudentSinglePage />} />
            </Route>
            <Route path="registration" element={<Registration />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="employees"  >
              <Route index element={<Employees />} />
              <Route path=':id' element={<EmployeesSinglePage />} />
            </Route>
            <Route path="classes" element={<Classes />} />
            <Route path='levels'>
              <Route index element={<Levels />} />
              <Route path=':active' element={<Levels />} />
            </Route>
            <Route path="subjects" element={<Subjects />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="exams" element={<Exams />} />
            <Route path="parents" element={<Parents />} />
            <Route path="payments" element={<Payments />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<Settings />} />
            <Route path="school-year" element={<SchoolYear />} />
            {/* 404 Not found  */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />

          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;