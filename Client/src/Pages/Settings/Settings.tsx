import React from 'react';
import { Calendar, Shield, UserCog, Users } from 'lucide-react';
import School from './School/School';
import GeneralSettings from './General/GeneralSettings';
import Onglet from '../../Components/ui/Onglet';
import AccountSettings from './Account/AccountSettings';
import UserRole from './UserRoles/UserRole';
import { useHashPermission } from '../../Hooks/useHashPermission';

const Settings: React.FC = () => {
  const generalPermission = useHashPermission( { id : 'general-settings'  , redirect : false } );
  const etablissementPermission = useHashPermission( { id : 'school-settings'  , redirect : false } );
  const rolePermission = useHashPermission( { id : 'roles-settings'  , redirect : false } );
  let tabs = [
    { key: 'account', label: 'Paramètre du compte', Icon: UserCog, component: <div className='bg-light p-3 md:p-6 shadow-sm border rounded-md'><AccountSettings /></div> }
  ];

  rolePermission.read && tabs.unshift(
    { key: 'user-role', label: 'Utilisateurs & Rôles', Icon: Users, component: <div className='bg-light p-3 md:p-6 shadow-sm border rounded-md'><UserRole /></div> },
  );
  etablissementPermission.read && tabs.unshift(
    { key: 'school-info', label: 'Établissement', Icon: Calendar, component: <div className='bg-light p-3 md:p-6 shadow-sm border rounded-md'><School /></div> },
  );
  generalPermission.read && tabs.unshift(
    { key: 'general', label: 'Général', Icon: Shield, component: <div className='bg-light p-3 md:p-6 shadow-sm border rounded-md'> <GeneralSettings /></div> },
  );

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Contenue */}
      <Onglet
        onlgets={tabs}
        type='delete'
      />
    </div>
  );
};

export default Settings;