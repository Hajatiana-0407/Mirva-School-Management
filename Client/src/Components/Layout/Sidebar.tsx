import { ChevronDown, Menu, Power, Home, X } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSchoolState } from '../../Pages/Settings/School/redux/SchoolSlice';
import { getSchoolYearState } from '../../Pages/School-Year/redux/SchoolYearSlice';
import { getAuthState } from '../../Pages/Auth/redux/AuthSlice';
import ConfirmDialog from '../../Pages/ConfirmDialog';
import { AppDispatch } from '../../Redux/store';
import { logoutUser } from '../../Pages/Auth/redux/AuthAsyncThunk';
import CollapsedMenuItem from '../CollapsedMenuItem';
import { navigate } from '../../Utils/navigate';
import { baseUrl } from '../../Utils/Utils';
import { MenuItemType } from '../../Utils/Types';
import { menuItems } from '../../Utils/dataUtils';

interface SidebarPropsType {
  collapsed: boolean;
  onToggleCollapse: () => void;
  widowWidth: number;
}

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
  const location = useLocation();

  // Fonction CORRIGÉE pour vérifier si un menu parent a un enfant actif
  const isParentActive = useMemo(() => {
    const activePaths: { [key: string]: boolean } = {};

    const checkChildrenActive = (items: MenuItemType[], parentId?: string): boolean => {
      return items.some(item => {
        let isActive = false;

        // Vérifier si cet item est actif
        if (item.path) {
          // Comparaison plus robuste des URLs
          const currentPath = location.pathname + location.search;
          const itemPath = item.path;

          // Vérifier si le chemin actuel correspond au chemin de l'item
          // ou si c'est un sous-chemin (pour les routes imbriquées)
          isActive = currentPath === itemPath ||
            currentPath.startsWith(itemPath + '/') ||
            (itemPath.includes('?') && currentPath.split('?')[0] === itemPath.split('?')[0]);
        }

        // Vérifier les enfants récursivement
        if (item.children) {
          const childActive = checkChildrenActive(item.children, item.id);
          if (childActive) {
            isActive = true;
            // Marquer le parent comme actif si un enfant est actif
            if (parentId) {
              activePaths[parentId] = true;
            }
          }
        }

        // Si cet item est actif, marquer son parent comme actif
        if (isActive && parentId) {
          activePaths[parentId] = true;
        }

        // Marquer l'item lui-même comme actif si nécessaire
        if (isActive && item.id) {
          activePaths[item.id] = true;
        }

        return isActive;
      });
    };

    checkChildrenActive(menuItems);
    return activePaths;
  }, [location.pathname, location.search]);

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
      <ul className="space-y-2">
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
                color={menu.color}
              />
            );
          }
          if (idx < flatMenus.length - 1) {
            return <hr key={`hr-${idx}`} className="border-t border-secondary-200 mx-1 my-3" />;
          }
          return null;
        })}
      </ul>
    );
  };

  const renderMenuItems = (items: (MenuItemType & { color?: string; childColor?: string })[], level = 0, parentColor?: string) => (
    <ul className={clsx(
      "space-y-2",
      level === 0 ? "p-3" : "py-2"
    )}>
      {items.map(menu => {
        const Icon = menu.icon;
        const hasChildren = !!menu.children?.length;
        const isOpen = openMenus[menu.id];
        const isParentActiveItem = isParentActive[menu.id];
        if (!permissions?.[menu.id]?.read) return null;

        // Déterminer la couleur de l'icône
        const iconColor = level > 0
          ? (menu.color || parentColor || 'text-secondary-500')
          : (menu.color || 'text-secondary-600');

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
                      'px-3 justify-center': collapsed,
                      'px-4': !collapsed,
                      // Style différent pour les parents (level 0) vs sous-menus (level > 0)
                      'bg-primary-500  text-white shadow-lg': (isActive || isParentActiveItem) && level === 0,
                      'bg-primary-50 text-primary-700 border border-primary-200': isActive && level > 0,
                      'text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900 border border-transparent hover:border-secondary-200': !isActive && !isParentActiveItem,
                    },
                    'w-full flex items-center py-3 text-left transition-all duration-200 rounded-xl group relative',
                    level > 0 ? '' : ''
                  )
                }
              >
                {({ isActive }: { isActive: boolean }) => (
                  <>
                    <div className={clsx(
                      'relative z-10 flex-shrink-0',
                      collapsed ? '' : 'mr-3'
                    )}>
                      <Icon className={clsx(
                        'w-5 h-5 transition-colors duration-200',
                        (isActive || isParentActiveItem)
                          ? (level === 0 ? 'text-white' : 'text-primary-600')
                          : iconColor
                      )} />
                    </div>
                    {!collapsed && (
                      <>
                        <span className={clsx(
                          'font-medium transition-colors duration-200 flex-grow',
                          (isActive || isParentActiveItem)
                            ? (level === 0 ? 'text-white' : 'text-primary-700')
                            : 'text-secondary-800'
                        )}>
                          {menu.label}
                        </span>
                        {(isActive || isParentActiveItem) && level === 0 && (
                          <div className="ml-2 w-2 h-2 bg-white rounded-full animate-pulse flex-shrink-0"></div>
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
                  'w-full flex items-center py-3 text-left transition-all duration-200 rounded-xl font-medium',
                  {
                    'bg-primary-500  text-white shadow-lg': isParentActiveItem && level === 0,
                    'bg-primary-50 text-primary-700 border border-primary-200': isParentActiveItem && level > 0,
                    'text-secondary-800 hover:bg-secondary-100 hover:text-secondary-900 border border-transparent hover:border-secondary-200': !isParentActiveItem,
                  },
                  collapsed ? 'justify-center px-3' : 'px-3',
                  level > 0 ? 'ml-2' : ''
                )}
                onClick={() => handleToggleMenu(menu.id)}
              >
                <Icon className={clsx(
                  'w-5 h-5 transition-colors duration-200 flex-shrink-0',
                  isParentActiveItem
                    ? (level === 0 ? 'text-white' : 'text-primary-600')
                    : iconColor,
                  collapsed ? '' : 'mr-3'
                )} />
                {!collapsed && (
                  <>
                    <span className="flex-grow text-left">{menu.label}</span>
                    <span className="ml-2 flex-shrink-0">
                      <ChevronDown
                        className={clsx(
                          'w-5 h-5 transition-transform duration-200',
                          isParentActiveItem
                            ? (level === 0 ? 'text-white' : 'text-primary-500')
                            : 'text-secondary-500',
                          isOpen ? 'rotate-180' : ''
                        )}
                      />
                    </span>
                  </>
                )}
              </button>
            )}
            {hasChildren && isOpen && !collapsed && (
              <div className={clsx(
                "mt-2 rounded-xl bg-secondary-50/80 border border-secondary-200/60 px-1",
                level === 0 ? "" : "ml-3"
              )}>
                {renderMenuItems(menu.children!, level + 1, menu.childColor || menu.color)}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div
      className={clsx(
        'bg-white shadow-sm border-r border-secondary-200 transition-all duration-300 ease-in-out flex flex-col h-screen',
        collapsed ? ' w-[2.8rem] sm:w-16' : 'w-64'
      )}
    >
      {/* Header sobre */}
      <div className="relative py-4 bg-white border-b border-secondary-200">

        {/* Logo | slogan | Année scolaire actif */}
        <div className="flex items-center justify-center">
          {!collapsed && (
            <div className='text-center flex-1 mr-3'>
              <div className="text-xl font-bold text-secondary-800 font-halfre truncate flex justify-center">
                <img src={baseUrl(shoolInfo.logo)} alt={shoolInfo.nom} className='max-h-20' />
              </div>
              <p className="text-sm text-secondary-600 truncate mt-1">{shoolInfo?.slogan || 'Votre slogan'}</p>
              <p className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full mt-2 inline-block">
                {activeSchoolYear?.nom}
              </p>
            </div>
          )}

          {/* Boutons pour reduire et afficher le menu */}
          {collapsed ?
            <button
              onClick={onToggleCollapse}
              className=" rounded-lg transition-all duration-200 flex-shrink-0"
              title={'Développer le menu'}
            >
              <Menu className="w-6 h-6 text-secondary-600" />
            </button>
            :
            <button
              onClick={onToggleCollapse}
              className='top-2 right-2 absolute border p-1 rounded hover:bg-secondary-50 transition-all duration-150'
              title='Réduire le menu'
            >
              <X className="w-5 h-5 text-secondary-600" />
            </button>
          }
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary-300 scrollbar-track-secondary-100 py-2">
        {collapsed ? renderCollapsedMenuItems() : renderMenuItems(menuItems)}
      </nav>

      {/* Footer avec couleurs discrètes */}
      <div className="p-3 space-y-3 bg-white border-t border-secondary-200">
        <button
          className={clsx(
            'w-full flex items-center transition-all duration-200 rounded-xl',
            'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 hover:from-primary-100 hover:to-primary-200',
            'border border-primary-200 hover:border-primary-300 hover:shadow-md ',
            'group',
            collapsed ? 'justify-center px-3 py-3' : 'px-4 py-3 justify-start'
          )}
          onClick={() => navigate('/')}
        >
          <Home className="w-5 h-5 flex-shrink-0  transition-transform" />
          {!collapsed && <span className="ml-3 font-medium">Aller sur le site</span>}
        </button>

        <button
          className={clsx(
            'w-full flex items-center transition-all duration-200 rounded-xl',
            'bg-gradient-to-r from-red-50 to-red-100 text-red-700 hover:from-red-100 hover:to-red-200',
            'border border-red-200 hover:border-red-300 hover:shadow-md ',
            'group',
            collapsed ? 'justify-center px-3 py-3' : 'px-4 py-3 justify-start'
          )}
          onClick={() => setIsOpentDialog(true)}
        >
          <Power className="w-5 h-5 flex-shrink-0 transition-transform" />
          {!collapsed && <span className="ml-3 font-medium">Se déconnecter</span>}
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