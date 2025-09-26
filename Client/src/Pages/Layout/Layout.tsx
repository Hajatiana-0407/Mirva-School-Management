import  { PropsWithChildren, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

type LayoutPropsType = PropsWithChildren


const Layout = ({ children }: LayoutPropsType ) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          { children }
        </main>
      </div>
    </div>
  );
};

export default Layout;


 