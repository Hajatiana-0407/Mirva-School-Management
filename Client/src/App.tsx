import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Classes from './components/Classes/Classes';
import Levels from './components/Levels/Levels';
import Subjects from './components/Subjects/Subjects';
import Schedule from './components/Schedule';
import Attendance from './components/Attendance';
import Exams from './components/Exams';
import Parents from './components/Parents';
import Payments from './components/Payments';
import Messages from './components/Messages';
import Settings from './components/Settings/Settings';
import { ToastContainer } from 'react-toastify';
import Employees from './components/Employees/Employees';
import { useEffect } from 'react';
import { AppDispatch } from './Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTypePersonnel } from './Redux/Other/asyncThunk/TypeEmployesAsyncThunk';
import EmployeesSinglePage from './components/Employees/EmployeesSinglePage';
import Teachers from './components/Teachers/Teachers';
import { getSchoolState } from './components/Settings/School/redux/SchoolSlice';
import { getSchoolInfo } from './components/Settings/School/redux/SchoolAsyncThunk';
import SchoolYear from './components/School-Year/SchoolYear';
import { getSchoolYearState } from './components/School-Year/redux/SchoolYearSlice';
import { getAllSchoolYear } from './components/School-Year/redux/SchoolYearAsyncThunk';
import Registration from './components/Registration/Registration';



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
  }, []);

  return (
    <Layout >
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
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="registration" element={<Registration />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="employees"  >
          <Route index element={<Employees />} />
          <Route path=':id' element={<EmployeesSinglePage />} />
        </Route>
        <Route path="classes" element={<Classes />} />
        <Route path="levels" element={<Levels />} />
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
      </Routes>
    </Layout>
  );
}

export default App;