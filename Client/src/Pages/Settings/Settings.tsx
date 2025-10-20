import React from 'react';
import { Calendar, Shield, UserCog, Users } from 'lucide-react';
import School from './School/School';
import GeneralSettings from './General/GeneralSettings';
import Onglet from '../../Components/ui/Onglet';
import AccountSettings from './Account/AccountSettings';
// import UserRole from './UserRoles/UserRole';

const Settings: React.FC = () => {

  let tabs = [
    { key: 'Général', Icon: Shield, component: <div className='bg-white p-6 shadow-sm border rounded-md'> <GeneralSettings /></div> },
    { key: 'Établissement', Icon: Calendar, component: <div className='bg-white p-6 shadow-sm border rounded-md'><School /></div> },
    // { key: 'Utilisateurs & Rôles', Icon: Users, component: <div className='bg-white p-6 shadow-sm border rounded-md'><UserRole /></div> },
    { key: 'Compte', Icon: UserCog, component: <div className='bg-white p-6 shadow-sm border rounded-md'><AccountSettings /></div> }
  ];


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
      </div>

      {/* Contenue */}
      <Onglet
        onlgets={tabs}
        type='delete'
      />
    </div>
  );
};

export default Settings;