    import React, { useState } from 'react';
    import { Link, useLocation } from 'react-router-dom';
    import { Menu, X, GraduationCap, Globe } from 'lucide-react';
    import { useLanguage } from '../../../contexts/LanguageContext';

    const Header: React.FC = () => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const { language, setLanguage, t } = useLanguage();
      const location = useLocation();

      const navigation = [
        { name: t('nav.home'), href: '/' },
        { name: t('nav.about'), href: '/about' },
        { name: t('nav.programs'), href: '/programs' },
        { name: t('nav.team'), href: '/team' },
        { name: t('nav.news'), href: '/news' },
        { name: t('nav.gallery'), href: '/gallery' },
        { name: t('nav.contact'), href: '/contact' },
      ];

      const toggleLanguage = () => {
        setLanguage(language === 'fr' ? 'en' : 'fr');
      };

      const isActive = (path: string) => location.pathname === path;

      return (
        <header className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3">
                <div className="bg-emerald-600 p-2 rounded-lg">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-emerald-800">Mirva school</h1>
                  <p className="text-sm text-emerald-600">Tanjombato</p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-emerald-600 ${
                      isActive(item.href) 
                        ? 'text-emerald-600 border-b-2 border-emerald-600' 
                        : 'text-gray-700'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Language Toggle & Admin Link */}
              <div className="hidden md:flex items-center space-x-4">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors duration-200"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-sm font-medium">{language.toUpperCase()}</span>
                </button>
                <Link
                  to="/admin"
                  className="text-sm font-medium text-orange-600 hover:text-orange-500 transition-colors duration-200"
                >
                  {t('nav.admin')}
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors duration-200"
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
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isActive(item.href)
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-2 border-t border-gray-200">
                    <button
                      onClick={toggleLanguage}
                      className="flex items-center space-x-2 w-full px-3 py-2 rounded-md bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors duration-200"
                    >
                      <Globe className="h-4 w-4" />
                      <span className="text-sm font-medium">{language.toUpperCase()}</span>
                    </button>
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 mt-2 rounded-md text-sm font-medium text-orange-600 hover:bg-orange-50 transition-colors duration-200"
                    >
                      {t('nav.admin')}
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