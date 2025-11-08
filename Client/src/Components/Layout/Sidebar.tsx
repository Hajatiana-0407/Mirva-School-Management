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
  Power,
  NotebookPen,
  UserRound
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSchoolState } from '../../Pages/Settings/School/redux/SchoolSlice';
import { getSchoolYearState } from '../../Pages/School-Year/redux/SchoolYearSlice';
import { getAuthState } from '../../Pages/Auth/redux/AuthSlice';
import ConfirmDialog from '../../Pages/ConfirmDialog';
import { AppDispatch } from '../../Redux/store';
import { logoutUser } from '../../Pages/Auth/redux/AuthAsyncThunk';
import CollapsedMenuItem from '../CollapsedMenuItem';

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
  widowWidth: number;
}

const menuItems: MenuItemType[] = [
  { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'registration', label: 'Inscriptions', icon: UserPlus, path: '/registration' },
  { id: 'students', label: 'Élèves', icon: Users, path: '/students' },
  { id: 'schedule', label: 'Emploi du temps', icon: Calendar, path: '/schedule' },
  { id: 'attendance', label: 'Présences', icon: UserCog, path: '/attendance' },
  { id: 'exams', label: 'Examens et Notes', icon: FileText, path: '/exams' },
  {
    id: 'course',
    label: 'Leçons et exercices',
    icon: Notebook,
    children: [
      { id: 'lessons', label: 'Leçons', icon:  BookOpenText, path: '/lessons' },
      { id: 'exercices', label: 'Exercices', icon: NotebookPen , path: '/exercices' },
    ],
  },
  {
    id: 'management',
    label: 'Administration',
    icon: UserCheck,
    children: [
      { id: 'employees', label: 'Employés', icon: UserRound , path: '/employees' },
      { id: 'teachers', label: 'Enseignants', icon: UserCheck, path: '/teachers' },
      { id: 'parents', label: 'Parents', icon: Users, path: '/parents' },
      { id: 'payments', label: 'Paiements', icon: CreditCard, path: '/payments' },
      { id: 'messages', label: 'Messagerie', icon: MessageSquare, path: '/messages' },
    ],
  },
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
    ],
  },
];

const flattenMenuItems = (items: MenuItemType[]): MenuItemType[] => {
  let flat: MenuItemType[] = [];
  items.forEach(item => {
    flat.push(item);
    if (item.children) flat = flat.concat(item.children);
  });
  return flat;
};

const Sidebar = ({ collapsed, onToggleCollapse, widowWidth }: SidebarPropsType) => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    course: true,
  });
  const { datas: shoolInfo } = useSelector(getSchoolState);
  const { activeSchoolYear } = useSelector(getSchoolYearState);
  const { datas: { permissions, user } } = useSelector(getAuthState);
  const [isOpentDialog, setIsOpentDialog] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const onConfirmLogout = () => {
    setIsOpentDialog(false);
    dispatch(logoutUser(user?.id_user as number));
  };

  const handleToggleMenu = (id: string) => {
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderCollapsedMenuItems = () => {
    const flatMenus = flattenMenuItems(menuItems);
    return (
      <ul>
        {flatMenus.map((menu, idx) => {
          if (!permissions?.[menu.id]?.read) return null;
          if (menu.path) {
            return (
              <CollapsedMenuItem
                key={menu.id}
                id={menu.id}
                label={menu.label}
                icon={menu.icon}
                path={menu.path}
              />
            );
          }
          if (idx < flatMenus.length - 1) {
            return <hr key={`hr-${idx}`} className="border-t border-blue-200 mx-2" />;
          }
          return null;
        })}
      </ul>
    );
  };

  const renderMenuItems = (items: MenuItemType[], level = 0) => (
    <ul className="space-y-0.5">
      {items.map(menu => {
        const Icon = menu.icon;
        const hasChildren = !!menu.children?.length;
        const isOpen = openMenus[menu.id];
        if (!permissions?.[menu.id]?.read) return null;

        return (
          <li key={menu.id}>
            {menu.path ? (
              <NavLink
                to={menu.path}
                title={collapsed ? menu.label : ''}
                onClick={() => {
                  if (widowWidth < 1000) onToggleCollapse();
                }}
                className={({ isActive }: { isActive: boolean }) =>
                  clsx(
                    {
                      'px-4 justify-center': collapsed,
                      'px-6': !collapsed,
                      'bg-blue-50 text-blue-700 border-r-2 border-blue-700': isActive,
                      'text-gray-700 hover:bg-gray-50': !isActive,
                    },
                    'w-full flex items-center py-3 text-left transition-colors group relative',
                    level > 0 ? 'pl-8' : ''
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
                  </>
                )}
              </NavLink>
            ) : (
              <button
                type="button"
                className={clsx(
                  'w-full flex items-center py-3 px-6 text-left transition-colors font-medium text-gray-800 hover:bg-gray-400/60 bg-gray-300/50',
                  collapsed ? 'justify-center px-4' : '',
                  level > 0 ? 'pl-8' : ''
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
                          'w-4 h-4 transition-transform',
                          isOpen ? 'rotate-180' : ''
                        )}
                      />
                    </span>
                  </>
                )}
              </button>
            )}
            {hasChildren && isOpen && !collapsed && (
              <div className="mx-1 mb-1 rounded mt-0.5 shadow-inner border-2 border-gray-300">
                {renderMenuItems(menu.children!, level + 1)}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div
      className={`${collapsed ? 'w-16' : 'w-64'} bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col h-screen`}
    >
      <div className="py-6 border-b border-r">
        <div className="flex items-center justify-center">
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {shoolInfo?.nom || "Nom de l'école"}
              </h1>
              <p className="text-sm text-gray-600">{shoolInfo?.slogan || 'Votre slogan'}</p>
              <p className="text-xs font-semibold text-blue-600">
                {activeSchoolYear?.nom}
              </p>
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

      {/* Navigation */}
      <nav className="mt-2 flex-1 overflow-y-auto scroll">
        {collapsed ? renderCollapsedMenuItems() : renderMenuItems(menuItems)}
      </nav>

      {/* Bouton Déconnexion */}
      <div className="h-max w-full border bg-gray-100">
        <button
          className={clsx(
            {
              'px-4': collapsed,
              'px-6': !collapsed,
            },
            'text-gray-700 hover:bg-gray-50 w-full gap-3 flex items-center justify-center py-3 text-left transition-colors group relative'
          )}
          onClick={() => setIsOpentDialog(true)}
        >
          <Power className="w-5 h-5 text-gray-600" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>

      <ConfirmDialog
        isOpen={isOpentDialog}
        title="Confirmer la déconnexion"
        message="Êtes-vous sûr de vouloir vous déconnecter ?"
        onConfirm={onConfirmLogout}
        onClose={() => setIsOpentDialog(false)}
      />
    </div>
  );
};

export default Sidebar;
