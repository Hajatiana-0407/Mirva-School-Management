import React from 'react';
import { Save,  Calendar, Shield } from 'lucide-react';
import School from './School/School';
import GeneralSettings from './General/GeneralSettings';
import { getSchoolYearState } from '../School-Year/redux/SchoolYearSlice';
import { useSelector } from 'react-redux';
import { getSchoolState } from './School/redux/SchoolSlice';
import Onglet from '../../Components/ui/Onglet';

const Settings: React.FC = () => {
  const { action: schoolYearAction } = useSelector(getSchoolYearState)
  const { action: shoolAction } = useSelector(getSchoolState)

  const tabs = [
    { key: 'Général', Icon: Shield, component: <GeneralSettings /> },
    { key: 'Établissement', Icon: Calendar, component: <School /> },
    // { key: 'Utilisateurs', Icon: Users , component:  },
    // { key: 'Notifications', Icon: Bell , component:  },
  ];


  const handleSave = () => {
    let form = document.getElementById('__etablissement-form') as HTMLFormElement;
    if (!form) {
      form = document.getElementById('__form-to-change-active-schoolYear') as HTMLFormElement;
    }
    if (form) {
      form.requestSubmit();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg space-x-2 hover:bg-blue-700 transition-colors flex items-center"
          onClick={() => {
            handleSave();
          }}
        >
          {shoolAction.isLoading || shoolAction.isUpdating || schoolYearAction.isLoading || schoolYearAction.isUpdating
            ? <div className="w-5 h-5 me-1 inline-block border-4 border-white border-t-transparent rounded-full animate-spin"></div> :
            <Save className="w-4 h-4" />
          }
          <span>Enregistrer</span>
        </button>
      </div>

      {/* Contenue */}
      <Onglet
        onlgets={tabs}
      />
    </div>
  );
};

export default Settings;