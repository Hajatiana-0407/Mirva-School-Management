import {
  LayoutDashboard,
  Users,
  UserCheck,
  School,
  GraduationCap,
  BookOpen,
  Calendar,
  UserCog,
  FileText,
  MessageSquare,
  CreditCard,
  Settings,
  ChevronRight,
  Menu,
  ChevronLeft
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

interface SidebarPropsType {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar = ({ collapsed, onToggleCollapse }: SidebarPropsType) => {

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'students', label: 'Élèves', icon: Users, path: '/students' },
    { id: 'teachers', label: 'Enseignants', icon: UserCheck, path: '/teachers' },
    { id: 'classes', label: 'Classes', icon: School, path: '/classes' },
    { id: 'levels', label: 'Niveaux', icon: GraduationCap, path: '/levels' },
    { id: 'subjects', label: 'Matières', icon: BookOpen, path: '/subjects' },
    { id: 'schedule', label: 'Emploi du temps', icon: Calendar, path: '/schedule' },
    { id: 'attendance', label: 'Présences', icon: UserCog, path: '/attendance' },
    { id: 'exams', label: 'Examens et Notes', icon: FileText, path: '/exams' },
    { id: 'parents', label: 'Parents', icon: Users, path: '/parents' },
    { id: 'payments', label: 'Paiements', icon: CreditCard, path: '/payments' },
    { id: 'messages', label: 'Messagerie', icon: MessageSquare, path: '/messages' },
    { id: 'settings', label: 'Paramètres', icon: Settings, path: '/settings' },
  ];


  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} bg-white shadow-lg transition-all duration-300 ease-in-out`}>
      <div className="py-6 border-b border-r">
        <div className="flex items-center justify-center">
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-gray-800">École Manager</h1>
              <p className="text-sm text-gray-600">Gestion scolaire</p>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={collapsed ? 'Développer le menu' : 'Réduire le menu'}
          >
            {collapsed ? (
              <Menu className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <nav className="mt-6">
        <ul className="space-y-1">
          {menuItems.map((menu) => {
            return (
              <li key={menu.id}>
                <NavLink
                  to={menu.path}
                  title={collapsed ? menu.label : ''}
                  className={({ isActive }: { isActive: boolean }) => {
                    return clsx(
                      {
                        "px-4 justify-center": collapsed,
                        "px-6": !collapsed,
                        "bg-blue-50 text-blue-700 border-r-2 border-blue-700": isActive,
                        "text-gray-700 hover:bg-gray-50": !isActive,
                      },
                      "w-full flex items-center py-3 text-left transition-colors group relative"
                    );
                  }}
                >
                  {({ isActive }: { isActive: boolean }) => {
                    const Icon = menu.icon;
                    return (
                      <>
                        <Icon className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
                        {!collapsed && (
                          <>
                            <span className="font-medium">{menu.label}</span>
                            {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                          </>
                        )}
                        {collapsed && (
                          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                            {menu.label}
                          </div>
                        )}
                      </>
                    );
                  }}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;