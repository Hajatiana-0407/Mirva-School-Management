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
  ChevronDown,
  Menu,
  ChevronLeft,
  Backpack,
  UserPlus,
  Notebook,
  BookOpenText,
  ListChecks
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getSchoolState } from '../../Pages/Settings/School/redux/SchoolSlice';
import { getSchoolYearState } from '../../Pages/School-Year/redux/SchoolYearSlice';
import { getAuthState } from '../../Pages/Auth/redux/AuthSlice';

interface MenuItemType {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  children?: MenuItemType[];
}
interface SidebarPropsType {
  collapsed: boolean;
  onToggleCollapse: () => void;
}




const menuItems: MenuItemType[] = [
  { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, path: '/dashboard' },

  { id: 'registration', label: 'Inscriptions', icon: UserPlus, path: '/registration' },
  { id: 'students', label: 'Élèves', icon: Users, path: '/students' },
  { id: 'schedule', label: 'Emploi du temps', icon: Calendar, path: '/schedule' },
  { id: 'attendance', label: 'Présences', icon: UserCog, path: '/attendance' },
  { id: 'exams', label: 'Examens et Notes', icon: FileText, path: '/exams' },

  // Section Lessons et exercice 
  {
    id: 'course',
    label: 'Leçons et exerices',
    icon: Notebook,
    children: [
      { id: 'lessons', label: 'Leçons', icon: UserCheck, path: '/lessons' },
      { id: 'exercices', label: 'Exercices', icon: ListChecks, path: '/exercices' },
    ],
  },
  // Section Administration
  {
    id: 'management',
    label: 'Administration',
    icon: UserCheck,
    children: [
      { id: 'employees', label: 'Employés', icon: BookOpenText, path: '/employees' },
      { id: 'teachers', label: 'Enseignants', icon: UserCheck, path: '/teachers' },
      { id: 'parents', label: 'Parents', icon: Users, path: '/parents' },
      { id: 'payments', label: 'Paiements', icon: CreditCard, path: '/payments' },
      { id: 'messages', label: 'Messagerie', icon: MessageSquare, path: '/messages' },
    ],
  },

  // Section Paramétrage
  {
    id: 'settingsSection',
    label: 'Configuration',
    icon: Settings,
    children: [
      { id: 'school-year', label: 'Année scolaire', icon: Backpack, path: '/school-year' },
      { id: 'levels', label: 'Niveaux', icon: GraduationCap, path: '/levels' },
      { id: 'classes', label: 'Classes', icon: School, path: '/classes' },
      { id: 'subjects', label: 'Matières', icon: BookOpen, path: '/subjects' },
      { id: 'settings', label: 'Paramètres', icon: Settings, path: '/settings' },
      // Ici tu peux ajouter d'autres menus liés aux paramètres si besoin
    ],
  },
];


const flattenMenuItems = (items: MenuItemType[]): MenuItemType[] => {
  let flat: MenuItemType[] = [];
  items.forEach(item => {
    flat.push(item);
    if (item.children) {
      flat = flat.concat(item.children);
    }
  });
  return flat;
};

const Sidebar = ({ collapsed, onToggleCollapse }: SidebarPropsType) => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    'course': true,
  });
  const { datas: shoolInfo } = useSelector(getSchoolState)
  const { activeSchoolYear } = useSelector(getSchoolYearState)
  const { datas: { permissions } } = useSelector(getAuthState);


  const handleToggleMenu = (id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Rendu des menus pour collapsed
  const renderCollapsedMenuItems = () => {
    const flatMenus = flattenMenuItems(menuItems);

    return (
      <ul>
        {flatMenus.map((menu, idx) => {
          const Icon = menu.icon;

          // ===================== L'utilisateur na pas le permission de lecture  ===================== //
          if (!permissions[menu.id] || !permissions?.[menu.id]?.includes('read')) return '';

          return (
            <li key={menu.id} className="relative">
              {menu.path ? (
                <NavLink
                  to={menu.path}
                  title={menu.label}
                  className={({ isActive }: { isActive: boolean }) =>
                    clsx(
                      "px-4 justify-center w-full flex items-center py-3 text-left transition-colors group relative",
                      isActive
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    )
                  }
                >
                  <Icon className="w-5 h-5" />
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {menu.label}
                  </div>
                </NavLink>
              ) : (
                idx < flatMenus.length - 1 && (
                  <hr className="border-t border-blue-200 mx-2" />
                )
              )}
            </li>
          );
        })}
      </ul>
    );
  };
  // Rendu récursif des menus et sous-menus (pour non-collapsed)
  const renderMenuItems = (items: MenuItemType[], level = 0) => (
    <ul className='space-y-0.5'>
      {items.map((menu) => {
        const Icon = menu.icon;
        const hasChildren = !!menu.children?.length;
        const isOpen = openMenus[menu.id];
        // ===================== L'utilisateur na pas le permission de lecture  ===================== //
        if (!permissions[menu.id] || !permissions?.[menu.id]?.includes('read')) return '';
        return (
          <li key={menu.id}>
            {menu.path ? (
              <NavLink
                to={menu.path}
                title={collapsed ? menu.label : ''}
                className={({ isActive }: { isActive: boolean }) =>
                  clsx(
                    {
                      "px-4 justify-center": collapsed,
                      "px-6": !collapsed,
                      "bg-blue-50 text-blue-700 border-r-2 border-blue-700": isActive,
                      "text-gray-700 hover:bg-gray-50": !isActive,
                    },
                    "w-full  flex items-center py-3 text-left transition-colors group relative",
                    level > 0 ? "pl-8" : ""
                  )
                }
              >
                {({ isActive }: { isActive: boolean }) => (
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
                )}
              </NavLink>
            ) : (
              <button
                type="button"
                className={clsx(
                  "w-full flex items-center py-3 px-6 text-left transition-colors font-medium text-gray-800 hover:bg-gray-400/60 bg-gray-300/50",
                  collapsed ? "justify-center px-4" : "",
                  level > 0 ? "pl-8" : ""
                )}
                onClick={() => handleToggleMenu(menu.id)}
              >
                <Icon className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
                {!collapsed && (
                  <>
                    <span>{menu.label}</span>
                    <span className="ml-auto">
                      <ChevronDown
                        className={clsx(
                          "w-4 h-4 transition-transform",
                          isOpen ? "rotate-180" : ""
                        )}
                      />
                    </span>
                  </>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {menu.label}
                  </div>
                )}
              </button>
            )}
            {hasChildren && isOpen && !collapsed && (
              <div className="mx-1 mb-1 rounded mt-0.5 shadow-inner  border-2 border-gray-300 ">
                {renderMenuItems(menu.children!, level + 1)}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col min-h-screen`}>
      <div className="py-6 border-b border-r">
        <div className="flex items-center justify-center">
          {!collapsed && (
            <div >
              <h1 className="text-xl font-bold text-gray-800">{shoolInfo?.nom || "Nom de l'école"}</h1>
              <p className="text-sm text-gray-600">{shoolInfo?.slogan || 'Votre slogan'}</p>
              <p className='text-xs font-semibold text-blue-600'> {activeSchoolYear?.nom} </p>
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
      <nav className="mt-6 flex-1 overflow-y-auto">
        {collapsed ? renderCollapsedMenuItems() : renderMenuItems(menuItems)}
      </nav>
    </div>
  );
};

export default Sidebar;