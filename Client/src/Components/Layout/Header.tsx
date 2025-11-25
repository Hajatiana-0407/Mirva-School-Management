import { Bell, Search, User, LogOut, Settings, ChevronDown, Mail } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAuthState } from '../../Pages/Auth/redux/AuthSlice';
import ConfirmDialog from '../../Pages/ConfirmDialog';
import { useState, useRef, useEffect } from 'react';
import { AppDispatch } from '../../Redux/store';
import { logoutUser } from '../../Pages/Auth/redux/AuthAsyncThunk';
import { baseUrl } from '../../Utils/Utils';

const Header = () => {
  const { datas: auth } = useSelector(getAuthState);
  const [isOpentDialog, setIsOpentDialog] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();

  // Fermer le dropdown profil en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ===================== DECONNEXION ===================== //
  const onConfirmLogout = () => {
    setIsOpentDialog(false);
    dispatch(logoutUser(auth.user?.id_user as number));
  };

  const handleLogoutclick = () => {
    setIsOpentDialog(true);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-secondary-100 px-3 md:px-6 py-2 sticky top-0 z-[49]">
        <div className="flex items-center justify-between">
          {/* Section Recherche */}
          <div className="flex items-center flex-1 max-w-2xl">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-2.5 border border-secondary-200 rounded-lg md:rounded-xl focus:outline-none focus:border-primary-500 bg-white transition-colors text-sm md:text-base"
              />
            </div>
          </div>

          {/* Section Actions et Profil */}
          <div className="flex items-center sm:ml-6">
            {/* Bouton Messages */}
            <button
              className="relative p-3 text-secondary-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200 group border border-transparent hover:border-primary-100"
              title="Messages"
            >
              <Mail className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full ring-2 ring-white"></span>
            </button>

            {/* Bouton Notifications */}
            <button
              className="relative p-3 text-secondary-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200 group border border-transparent hover:border-primary-100"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>

            {/* Séparateur */}
            <div className="h-8 w-px bg-secondary-200 mx-1"></div>

            {/* Profil Utilisateur */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={toggleProfile}
                className="flex items-center p-2 rounded-xl hover:bg-secondary-50 transition-all duration-200 group border border-transparent hover:border-secondary-200"
              >
                <div className="hidden md:block text-right mr-2">
                  <p className="text-sm font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
                    {auth.user?.role_id === 'admin'
                      ? auth.user?.identifiant
                      : auth.info?.prenom
                        ? auth.info?.prenom
                        : auth.user?.identifiant
                    }
                  </p>
                  <p className="text-xs text-secondary-500 flex items-center justify-end gap-1.5 mt-0.5">
                    <span className='inline-block w-1.5 h-1.5 bg-green-400 rounded-full'></span>
                    {auth.user?.role || 'Role'}
                  </p>
                </div>
                {/* Avatar */}
                <div className="flex items-center">
                  {auth.info?.photo ? (
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden border-2 border-secondary-100 group-hover:border-primary-200 transition-all duration-200 shadow-sm">
                      <img
                        src={baseUrl(auth.info?.photo)}
                        alt="Photo de profil"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow transition-all">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <ChevronDown className={`w-4 h-4 ml-2 text-secondary-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''
                    }`} />
                </div>
              </button>

              {/* Dropdown Profil */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-secondary-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                  {/* En-tête du profil */}
                  <div className="px-4 py-4 border-b border-secondary-100 bg-gradient-to-r from-secondary-50 to-white">
                    <div className="flex items-center space-x-3">
                      {auth.info?.photo ? (
                        <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-sm">
                          <img
                            src={baseUrl(auth.info?.photo)}
                            alt="Photo de profil"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-sm">
                          <User className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-secondary-900 truncate">
                          {auth.user?.role_id === 'admin'
                            ? auth.user?.identifiant
                            : auth.info?.prenom
                              ? `${auth.info?.prenom} ${auth.info?.nom || ''}`
                              : auth.user?.identifiant
                          }
                        </p>
                        <p className="text-xs text-secondary-500 mt-1 flex items-center">
                          <span className='inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5'></span>
                          {auth.user?.role || 'Role'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu du profil */}
                  <div className="py-2">
                    <Link
                      to={'/back-office/settings?o=account'}
                      className="flex items-center px-4 py-3 text-sm text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors group"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="w-4 h-4 mr-3 text-secondary-400 group-hover:text-primary-500 transition-colors" />
                      <span>Mon compte</span>
                    </Link>

                    <Link
                      to={'/back-office/settings'}
                      className="flex items-center px-4 py-3 text-sm text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors group"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-3 text-secondary-400 group-hover:text-primary-500 transition-colors" />
                      <span>Paramètres</span>
                    </Link>

                    {/* Séparateur */}
                    <div className="border-t border-secondary-100 my-2"></div>

                    {/* Déconnexion */}
                    <button
                      onClick={handleLogoutclick}
                      className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                    >
                      <LogOut className="w-4 h-4 mr-3 text-red-400 group-hover:text-red-500 transition-colors" />
                      <span>Se déconnecter</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </header>
      <ConfirmDialog
        isOpen={isOpentDialog}
        title="Confirmer la déconnexion"
        message="Êtes-vous sûr de vouloir vous déconnecter ?"
        onConfirm={onConfirmLogout}
        onClose={() => setIsOpentDialog(false)}
      />
    </>
  );
};

export default Header;