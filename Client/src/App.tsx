import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AnimatedBackground from './Components/ui/AnimatedBackground';
import BackOffice from './App/BackOffice';
import Website from './App/Website';
import Signin from './Pages/Auth/Signin';
import { useSectionScroll } from './Hooks/useSectionScroll';

function App() {
  // Gerer le scroll automatique dans une section spécifique 
  useSectionScroll()
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
        <Route path="/signin" element={<Signin />} />
        <Route path="/back-office/*" element={<BackOffice />} />
      </Routes>
    </div>
  );
}

export default App;