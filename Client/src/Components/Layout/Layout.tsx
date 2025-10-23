import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';


const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  console.log('windth : ' , windowWidth );
  

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
    <div className="bg-gray-50 relative h-screen max-h-screen">
      <div className='fixed top-0 left-0 bottom-0 z-50'>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          widowWidth={windowWidth}
        />
      </div>
      <div className={clsx(
        { "pl-[16rem]": !sidebarCollapsed && windowWidth > 1000 }
        , "flex-1 flex flex-col overflow-hidden pl-[4rem] transition-all duration-300 max-h-screen"
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


