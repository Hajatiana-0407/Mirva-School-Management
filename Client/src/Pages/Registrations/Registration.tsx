import React, { useEffect, useState } from 'react';
import { Plus, Search, Archive, CheckCircle, Clock, Eye } from 'lucide-react';
import Table from '../Table';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import { getRegistrationState } from './redux/registerSlice';
import { RegistrationType, StudentType } from '../../Utils/Types'
import { AppDispatch } from '../../Redux/store';
import { deleteRegistration, getAllRegistrations } from './redux/registerAsyncThunk';
import clsx from 'clsx';
import { getAppState } from '../../Redux/AppSlice';
import Profile from '../../Components/ui/Profile';
import { getShortDate } from '../../Utils/Utils';
import RegisterForm from '../../Components/Forms/RegisterForm';
import { useHashPermission } from '../../Hooks/useHashPermission';
import Title from '../../Components/ui/Title';
import { navigate } from '../../Utils/navigate';


const Registration: React.FC = () => {
  // ? ===================== GESTION DES ETATS ===================== //
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<RegistrationType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [dataToDelete, setDataToDelete] = useState<RegistrationType | null>(null);
  const { datas: registrations, action } = useSelector(getRegistrationState);
  const dispatch: AppDispatch = useDispatch();
  const { hiddeTheModalActive } = useSelector(getAppState);
  const permission = useHashPermission({ redirect: true });


  // ? ===================== HANDLERS ===================== //
  const handleArchive = (student: any) => {
    setDataToDelete(student);
    setShowConfirmDialog(true);
  };

  const handleConfirmArchive = () => {
    if (dataToDelete) {
      dispatch(deleteRegistration(dataToDelete?.id_inscription as number))
    }
    setShowConfirmDialog(false);
    setDataToDelete(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingStudent(null);
  };



  // ? ===================== EFFETS =====================
  useEffect(() => {
    dispatch(getAllRegistrations());
  }, [dispatch]);

  // ! Modale 
  useEffect(() => {
    if (showModal && hiddeTheModalActive) {
      handleCloseModal();
    }
  }, [hiddeTheModalActive]);


  // ? ===================== TABLEAUX =====================
  const actions = [
     { icon: Eye, label: "Voir les détails", onClick: (item: RegistrationType) => navigate('/back-office/students/' + item.matricule_etudiant), color: 'primary' },
    { icon: Archive, type: 'delete', label: "Supprimer", onClick: handleArchive, color: 'red' },
  ];

  const columns = [
    {
      key: 'nom_eleve', label: 'Profil', render: (value: string, item: RegistrationType) => (
        <Profile
          fullName={`${value} ${item.prenom}`}
          identification={item.matricule_etudiant}
          photo={item.photo as string}
          link={`/back-office/students/${item.matricule_etudiant}`}
        />
      )
    },
    {
      key: 'denomination',
      label: 'Classe',
      render: (value: string, item: any) => (
        <div className="flex flex-col">
          <span className={clsx({
            'hidden': !item.niveau
          }, 'text-xs italic text-primary-600')}>
            {item.niveau}
          </span>
          {value}
        </div>
      )
    },
    { key: 'annee_scolaire_nom', label: 'Année scolaire' },
    {
      key: 'date_inscription', label: 'date d\'inscription ',
      render: (value: string) => (
        <div className="">
          {getShortDate(value)}
        </div>
      )
    },
    { key: 'telephone', label: 'Téléphone' },
    {
      key: 'is_droit_payed', label: 'Droit', render: (value: string) => {
        const colors = {
          '1': 'bg-green-100 text-green-800',
          '0': 'bg-yellow-100 text-yellow-800',
        };
        const icons = {
          '1': <CheckCircle className="w-4 h-4" />,
          '0': <Clock className="w-4 h-4" />,
        };
        return (
          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${colors[value as keyof typeof colors]}`}>
            {icons[value as keyof typeof icons]}
            <span>{value == '1' ? 'Payé' : 'En attente'}</span>
          </span>
        );
      }
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <Title
        title='Inscription des élèves'
        description='Gérez les inscriptions des élèves pour la nouvelle année scolaire.'
      >
        {permission.create &&
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary-600 text-light px-2 py-1 sm:px-4 sm:py-2 _classe rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className='max-md:hidden-susp' >Nouvelle inscription  </span>
          </button>
        }
      </Title>
      <div className="bg-light p-3 md:p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6 md:mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
              <input
                type="text"
                placeholder="Rechercher un élève..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        <Table
          isLoading={action.isLoading as boolean}
          data={registrations}
          columns={columns}
          actions={actions}
          searchTerm={searchTerm}
          onRowClick={(item: StudentType) => navigate(`/back-office/students/${item.matricule_etudiant}`)}
        />
      </div>
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingStudent ? "Modifier l'élève" : "Nouvelle inscription"}
        size='lg'
      >
        <RegisterForm />
      </Modal>
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmArchive}
        title="Archiver l'élève"
        message={`Êtes-vous sûr de vouloir archiver l'élève ${dataToDelete?.prenom} ${dataToDelete?.nom_eleve} ?`}
      />
    </div>
  );
};

export default Registration;