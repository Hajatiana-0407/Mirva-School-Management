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
  ChevronDown,
  Menu,
  ChevronLeft,
  Backpack,
  UserPlus,
  Notebook,
  BookOpenText,
  Power,
  NotebookPen,
  UserRound,
  Computer,
  Home,
  Undo2,
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
import { navigate } from '../../Utils/navigate';

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

// Liste des menues
const menuItems: MenuItemType[] = [
  { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, path: '/back-office/dashboard' },
  { id: 'registration', label: 'Inscriptions', icon: UserPlus, path: '/back-office/registration' },
  { id: 'students', label: 'Élèves', icon: Users, path: '/back-office/students' },
  { id: 'schedule', label: 'Emploi du temps', icon: Calendar, path: '/back-office/schedule' },
  { id: 'attendance', label: 'Présences', icon: UserCog, path: '/back-office/attendance' },
  { id: 'exams', label: 'Examens et Notes', icon: FileText, path: '/back-office/exams' },
  {
    id: 'course',
    label: 'Leçons et exercices',
    icon: Notebook,
    children: [
      { id: 'lessons', label: 'Leçons', icon: BookOpenText, path: '/back-office/lessons' },
      { id: 'exercices', label: 'Exercices', icon: NotebookPen, path: '/back-office/exercices' },
    ],
  },
  {
    id: 'management',
    label: 'Administration',
    icon: UserCheck,
    children: [
      { id: 'employees', label: 'Employés', icon: UserRound, path: '/back-office/employees' },
      { id: 'teachers', label: 'Enseignants', icon: UserCheck, path: '/back-office/teachers' },
      { id: 'parents', label: 'Parents', icon: Users, path: '/back-office/parents' },
      { id: 'payments', label: 'Paiements', icon: CreditCard, path: '/back-office/payments' },
      { id: 'messages', label: 'Messagerie', icon: MessageSquare, path: '/back-office/messages' },
    ],
  },
  {
    id: 'settingsSection',
    label: 'Configuration',
    icon: Settings,
    children: [
      { id: 'school-year', label: 'Année scolaire', icon: Backpack, path: '/back-office/school-year' },
      { id: 'levels', label: 'Niveaux', icon: GraduationCap, path: '/back-office/levels?o=list-level' },
      { id: 'classes', label: 'Classes', icon: School, path: '/back-office/classes' },
      { id: 'subjects', label: 'Matières', icon: BookOpen, path: '/back-office/subjects' },
      { id: 'settings', label: 'Paramètres', icon: Settings, path: '/back-office/settings' },
    ],
  },
  {
    id: 'website-settings',
    label: 'Paramètres du site',
    icon: Computer,
    children: [
      { id: 'homepage-settings', label: "Page d'accueil", icon: Home, path: '/back-office/homepage-settings' },
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
                      'px-3 md:px-6': !collapsed,
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
                        {isActive && (
                          <div className='w-1.5 h-5 bg-blue-500 ml-auto rounded-full'></div>
                        )}
                      </>
                    )}
                  </>
                )}
              </NavLink>
            ) : (
              <button
                type="button"
                className={clsx(
                  'w-full flex items-center py-3 px-3 md:px-6 text-left transition-colors font-medium text-gray-800 hover:bg-gray-400/60 bg-gray-300/50',
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
      className={`${collapsed ? 'w-10 sm:w-16' : 'w-64'} bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col h-screen`}
    >
      <div className="py-6 border-b border-r">
        <div className="flex items-center justify-center">
          {!collapsed && (
            <div className='text-center'>
              <h1 className="text-xl font-bold text-gray-800">
                {shoolInfo?.nom || "Nom de l'école"}
              </h1>
              <p className="text-sm text-gray-600">{shoolInfo?.slogan || 'Votre slogan'}</p>
              <p className="text-xs text-left font-semibold text-blue-600">
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
      <nav className="mt-2 flex-1  overflow-y-auto scroll">
        {collapsed ? renderCollapsedMenuItems() : renderMenuItems(menuItems)}
      </nav>

      {/* Bouton Déconnexion */}
      <div className="h-max  py-2 space-y-0.5">
        <button
          className={clsx(
            {
              'justify-center': collapsed,
              'px-3 md:px-6': !collapsed,
            },
            'text-gray-700 hover:bg-slate-300 bg-slate-200 w-full gap-3 flex items-center  py-3 text-left transition-colors group relative'
          )}
          onClick={()=>navigate('/')}
        >
          <Undo2 className="w-5 h-5 text-gray-600" />
          {!collapsed && <span>Revenir dans le site</span>}
        </button>
        <button
          className={clsx(
            {
              'justify-center': collapsed,
              'px-3 md:px-6': !collapsed,
            },
            'text-gray-700 hover:bg-slate-300 bg-slate-200 w-full gap-3 flex items-center  py-3 text-left transition-colors group relative'
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
