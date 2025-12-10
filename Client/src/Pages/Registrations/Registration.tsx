import React, { useEffect, useState } from 'react';
import { Plus, Archive, CheckCircle, Clock, Eye } from 'lucide-react';
import Table from '../Table';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import { getRegistrationState } from './redux/registerSlice';
import { RegistrationType, StudentType } from '../../Utils/Types'
import { AppDispatch } from '../../Redux/store';
import { deleteRegistration, filterRegistration, getAllRegistrations } from './redux/registerAsyncThunk';
import clsx from 'clsx';
import { getAppState } from '../../Redux/AppSlice';
import Profile from '../../Components/ui/Profile';
import { getShortDate } from '../../Utils/Utils';
import RegisterForm from '../../Components/Forms/RegisterForm';
import { useHashPermission } from '../../Hooks/useHashPermission';
import Title from '../../Components/ui/Title';
import { navigate } from '../../Utils/navigate';
import FilterAndSearch, { FilterAndSearchType } from '../../Components/FilterAndSearch';
import { getAllClassesNoPagination, getAllLevelsNoPagination } from '../../Redux/Other/asyncThunk/AppAsyncThunk';


const Registration: React.FC = () => {
  // ? ===================== GESTION DES ETATS ===================== //
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<RegistrationType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [dataToDelete, setDataToDelete] = useState<RegistrationType | null>(null);
  const { datas: registrations, action, pagination } = useSelector(getRegistrationState);
  const { allLevels: levels } = useSelector(getAppState);
  const { allClasses: classes } = useSelector(getAppState);
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
    if (registrations?.length == 0)
      dispatch(getAllRegistrations({}));

    if (!levels || levels?.length == 0)
      dispatch(getAllLevelsNoPagination())
    if (!classes || classes?.length == 0)
      dispatch(getAllClassesNoPagination())

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

  // Donnée pour le filtre 
  const filter: FilterAndSearchType = {
    pagination: pagination,
    thunk: getAllRegistrations,
    isAdvanced: true,
    filters: [
      { label: 'Date de debut', name: 'date_debut', type: 'date' },
      { label: 'Date de fin', name: 'date_fin', type: 'date' },
      { label: 'Niveau', name: 'niveau', type: 'select', options: levels?.map(level => ({ label: level.niveau, value: level.id_niveau as number })) },
      { label: 'Classe', name: 'classe', type: 'select', options: classes?.map(classe => ({ label: classe.denomination, value: classe.id_classe as number })) },
      { label: 'Droit d\'inscription', name: 'droit', type: 'select', options: [{ label: 'Payé', value: 1 }, { label: 'Non payé', value: 0 }] },
    ],
    filterThunk: filterRegistration,
    isLoading: action.isFilterLoading
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <Title
        title='Inscription des élèves'
        description='Gérez les inscriptions des élèves pour la nouvelle année scolaire.'
        filter={filter}
        fixed
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

        <FilterAndSearch
          pagination={pagination}
          thunk={getAllRegistrations}
        />

        <Table
          isLoading={action.isLoading as boolean}
          data={registrations}
          columns={columns}
          actions={actions}
          onRowClick={(item: StudentType) => navigate(`/back-office/students/${item.matricule_etudiant}`)}
          pagination={pagination}
          thunk={getAllRegistrations}
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