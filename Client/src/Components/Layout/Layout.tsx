import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../Pages/Auth/redux/AuthSlice';
import Loading from '../ui/Loading';


const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 1000);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { action: { isLoginOut } } = useSelector(getAuthState)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 1000) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bg-secondary-50 relative h-screen max-h-screen">

      {/* Loading pour la déconexion */}
      {isLoginOut &&
        <div className='fixed inset-0 z-[60] bg-black/10 backdrop-blur-[2px]  transition-opacity flex items-center'>
          <Loading title='Déconexion' />
        </div>
      }
      <div className='fixed top-0 left-0 bottom-0 z-50'>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          widowWidth={windowWidth}
        />
      </div>
      <div className={clsx(
        { "pl-[16rem]": !sidebarCollapsed && windowWidth > 1000 },
        { "pl-[2.5rem] sm:pl-[4rem]": !(!sidebarCollapsed && windowWidth > 1000) }
        , "flex-1 flex flex-col overflow-hidden  transition-all duration-300 max-h-screen w-screen"
      )} >
        <Header />
        <main className="flex-1 overflow-y-auto p-3 md:p-6 relative">
          <Outlet />
        </main>
      </div>
    </div >
  );
};

export default Layout;


