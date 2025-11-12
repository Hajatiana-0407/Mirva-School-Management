import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, LogIn } from 'lucide-react';
import { useSelector } from 'react-redux';
import { getSchoolState } from '../../../Pages/Settings/School/redux/SchoolSlice';
import { baseUrl } from '../../../Utils/Utils';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { datas: school } = useSelector(getSchoolState)

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'À propos', href: '/about' },
    { name: 'Formations', href: '/programs' },
    { name: 'Équipe', href: '/team' },
    { name: 'Actualités', href: '/news' },
    { name: 'Galerie', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="">
              {school.logo ?
                <div>
                  <img src={baseUrl(school.logo)} alt="Mirva" className='max-h-14' />
                </div>
                : <div className='bg-primary-600 p-2 rounded-lg'>
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
              }
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-800">{school.nom || 'École'}</h1>
              <p className="text-sm text-primary-600"> { school.adresse || 'Adresse'} </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary-600 ${isActive(item.href)
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-700'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Admin Link */}
          <div className="hidden md:flex items-center">
            <Link
              to="/back-office/singin"
              className="text-sm font-medium text-white bg-primary-600 py-2 px-4 rounded flex items-center gap-2 justify-center transition-colors duration-200"
            >
              <LogIn className='w-5 h-5' />
              <span>Se connnecter</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive(item.href)
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-200">
                <Link
                  to="/back-office/singin"
                  className="text-sm font-medium text-white bg-primary-600 py-2 px-4 rounded flex items-center gap-2 justify-center transition-colors duration-200"
                >
                  <LogIn className='w-5 h-5' />
                  <span>Se connnecter</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;