import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useSelector } from 'react-redux';
import { getSchoolState } from '../../../Pages/Settings/School/redux/SchoolSlice';

const Footer: React.FC = () => {
  const { datas: school } = useSelector(getSchoolState)
  return (
    <footer className="bg-primary-800 text-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* School Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 capitalize">{school.nom || 'Nom de votre école'} {school.adresse ? '- ' + school.adresse : ''} </h3>
            <p className="text-primary-100 mb-4">
              Depuis plus de 20 ans, nous formons les leaders de demain dans un environnement bienveillant et stimulant au cœur de Alarobia Amboniloha.
            </p>
            <div className="flex space-x-4">
              {school.facebook &&
                <a href={school.facebook} target='_blank' className="text-primary-300 hover:text-light transition-colors duration-200">
                  <Facebook className="h-5 w-5" />
                </a>
              }
              {school.twitter &&
                <a href={school.twitter} target='_blank' className="text-primary-300 hover:text-light transition-colors duration-200">
                  <Twitter className="h-5 w-5" />
                </a>
              }
              {school.instagram &&
                <a href={school.instagram} target='_blank' className="text-primary-300 hover:text-light transition-colors duration-200">
                  <Instagram className="h-5 w-5" />
                </a>
              }
              {school.youtube &&
                <a href={school.youtube} target='_blank' className="text-primary-300 hover:text-light transition-colors duration-200">
                  <Youtube className="h-5 w-5" />
                </a>
              }
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Informations de contact</h4>
            <div className="space-y-3">
              {school.adresse &&
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary-300 mt-0.5 flex-shrink-0" />
                  <span className="text-primary-100">{school.adresse}</span>
                </div>
              }
              {school.telephone &&
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary-300 flex-shrink-0" />
                  <span className="text-primary-100"> {school.telephone} </span>
                </div>
              }
              {school.email &&
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary-300 flex-shrink-0" />
                  <span className="text-primary-100">{school.email}</span>
                </div>
              }
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Horaires d'ouverture</h4>
            <div className="space-y-2 text-primary-100">
              <p>Lundi - Vendredi : 7h00 - 17h00</p>
              <p>Samedi : 8h00 - 12h00</p>
              <p>Dimanche : Fermé</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-8 pt-8 text-center">
          <p className="text-primary-100">
            © 2025 École { school.nom }. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;