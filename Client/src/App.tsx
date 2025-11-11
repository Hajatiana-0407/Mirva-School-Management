import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AnimatedBackground from './Components/ui/AnimatedBackground';
import BackOffice from './Components/App/BackOffice';
import Website from './Components/App/Website';

function App() {
  return (
    <div className='' >
      <AnimatedBackground />
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
        {/* Route pour le site */}
        <Route path="/*" element={<Website />} />
        <Route path="/back-office/*" element={<BackOffice />} />
      </Routes>
    </div>
  );
}

export default App;