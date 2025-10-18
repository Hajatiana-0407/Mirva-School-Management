import { Bell, Search, User, LogOut, Settings } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAuthState } from '../../Pages/Auth/redux/AuthSlice';
import ConfirmDialog from '../../Pages/ConfirmDialog';
import { useState } from 'react';
import { AppDispatch } from '../../Redux/store';
import { logoutUser } from '../../Pages/Auth/redux/AuthAsyncThunk';

const Header = () => {
  const { datas: auth } = useSelector(getAuthState);
  const [isOpentDialog, setIsOpentDialog] = useState(false);
  const dispatch: AppDispatch = useDispatch();


  // ===================== DECONNEXION ===================== //
  const onConfirmLogout = () => {
    setIsOpentDialog(false);
    dispatch(logoutUser(auth.user?.id_user as number))
  }

  const handleLogoutclick = () => {
    setIsOpentDialog(true);
  }

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link to={'/settings'} className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <Settings className="w-5 h-5" />
          </Link>

          <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700"> {auth.user?.identifiant || 'Identifiant'} </p>
              <p className="text-xs text-gray-500 flex items-center justify-end">
                <span className='inline-block w-3 h-3 me-2 bg-green-500 rounded-full'></span>
                {auth.user?.role || 'Role'}
              </p>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <button
              onClick={handleLogoutclick}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isOpentDialog}
        title="Confirmer la déconnexion"
        message="Êtes-vous sûr de vouloir vous déconnecter ?"
        onConfirm={onConfirmLogout}
        onClose={() => setIsOpentDialog(false)}
      />
    </header>
  );
};

export default Header;