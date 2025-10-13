import React from 'react';
import {  Calendar,  Shield, UserCog } from 'lucide-react';
import School from './School/School';
import GeneralSettings from './General/GeneralSettings';
import Onglet from '../../Components/ui/Onglet';
import AccountSettings from './Account/AccountSettings';

const Settings: React.FC = () => {

  const tabs = [
    { key: 'Général', Icon: Shield, component: <GeneralSettings /> },
    { key: 'Établissement', Icon: Calendar, component: <School /> },
    { key: 'Compte' , Icon: UserCog , component: <AccountSettings/>}
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