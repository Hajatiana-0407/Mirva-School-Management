import React, { useEffect, useState } from 'react';
import { Plus, Edit, Archive, Eye, BookOpen, User, Users, Shield, Brush, Library, Calculator, Truck, HeartPulse } from 'lucide-react';
import Table from '../Table';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeState } from './redux/EmployeSlice';
import { EmployeeType } from '../../Utils/Types';
import { AppDispatch } from '../../Redux/store';
import { deleteEmployees, getAllEmployees } from './redux/EmployeAsyncThunk';
import { getAppState } from '../../Redux/AppSlice';
import { useNavigate } from 'react-router-dom';
import Profile from '../../Components/ui/Profile';
import EmployeForm from '../../Components/Forms/EmployeForm';
import { getShortDate } from '../../Utils/Utils';
import { useHashPermission } from '../../Hooks/useHashPermission';
import Title from '../../Components/ui/Title';
import FilterAndSearch from '../../Components/FilterAndSearch';

// Mapping des types à des couleurs de fond
export const typeBgColors: Record<string, string> = {
  'Enseignant': 'bg-primary-100 text-primary-800',
  'Secrétaire': 'bg-green-100 text-green-800',
  'Gardin': 'bg-yellow-100 text-yellow-800',
  'Surveillant': 'bg-purple-100 text-purple-800',
  "Agent d’entretien": 'bg-pink-100 text-pink-800',
  'Bibliothécaire': 'bg-indigo-100 text-indigo-800',
  'Comptable': 'bg-orange-100 text-orange-800',
  'Chauffeur': 'bg-teal-100 text-teal-800',
};
// Mapping des types à des icônes Lucide
export const typeIcons: Record<string, any> = {
  'Enseignant': BookOpen,
  'Secrétaire': User,
  'Gardin': Shield,
  'Surveillant': Users,
  "Agent d’entretien": Brush,
  'Bibliothécaire': Library,
  'Comptable': Calculator,
  'Chauffeur': Truck,
};

const Employees: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingEmployees, setEditingEmployees] = useState<EmployeeType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [teacherToArchive, setTeacherToArchive] = useState<EmployeeType | null>(null);
  const { hiddeTheModalActive } = useSelector(getAppState);
  const { datas: employees, action, pagination } = useSelector(getEmployeState);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const permission = useHashPermission({ redirect: true });


  //Handlers
  const handleEdit = (employee: any) => {
    setEditingEmployees(employee);
    setShowModal(true);
  };

  // Comfirmation de l'archivage
  const handleArchive = (employee: any) => {
    setTeacherToArchive(employee);
    setShowConfirmDialog(true);
  };

  // Suppression de l'employé
  const handleConfirmArchive = () => {
    if (teacherToArchive) {
      dispatch(deleteEmployees(teacherToArchive?.id_personnel as number))
    }
    setShowConfirmDialog(false);
    setTeacherToArchive(null);
  };

  // Fermer la modale
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEmployees(null);
  };

  // TABLEAUX 
  const actions = [
    { icon: Eye, label: "Voir les détails", onClick: (item: EmployeeType) => navigate("/back-office/employees/" + item.matricule_personnel), color: 'primary' },
    { icon: Edit, type: 'update', label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive, type: 'delete', label: "Supprimer", onClick: handleArchive, color: 'red' },
  ];

  const columns = [
    // Profil employé
    {
      key: 'nom',
      label: 'Profil',
      render: (value: string, item: EmployeeType) => (
        <Profile
          fullName={`${value} ${item.prenom}`}
          identification={item.matricule_personnel}
          photo={item.photo as string}
          link={`/back-office/employees/${item.matricule_personnel}`}
        />
      )
    },
    { key: 'matricule_personnel', label: 'Matricule' },
    // Fonction employé
    {
      key: 'type', label: 'Fonction', render: (employeType: string) => {
        const type = employeType || 'Autre';
        const color = typeBgColors[type] || 'bg-secondary-200 text-secondary-800';
        const Icon = typeIcons[type];
        return (
          <span className={`px-2 py-1 rounded-full text-sm flex items-center gap-1 ${color}`}>
            {Icon && <Icon className="w-4 h-4 mr-1" />}
            {type}
          </span>
        );
      }
    },
    {
      key: 'date_embauche', label: "Date d'embauche", render: (value: string) => (
        <div>
          {getShortDate(value)}
        </div>
      )
    },
    {
      key: 'telephone', label: 'Contact', render: (value: string, item: EmployeeType) => (
        <div>
          {value}
          <span className='block text-sm text-primary-500'>{item.email} </span>
        </div>
      )
    },
    // Statut employé
    {
      key: 'status',
      label: 'Statut',
      render: (status: string) => {
        // Définir l'icône et la couleur selon le statut
        let icon = null;
        let colorClass = '';
        const statusLower = status?.toLocaleLowerCase();

        if (statusLower === 'actif') {
          icon = <HeartPulse className="w-4 h-4 text-green-600" />;
          colorClass = 'bg-green-100 text-green-800';
        } else if (statusLower === 'suspendu') {
          icon = <Archive className="w-4 h-4 text-yellow-600" />;
          colorClass = 'bg-yellow-100 text-yellow-800';
        } else {
          icon = <Archive className="w-4 h-4 text-red-600" />;
          colorClass = 'bg-red-100 text-red-800';
        }

        // Mettre la première lettre en majuscule
        const statusLabel = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

        return (
          <span className={`px-2 py-1 rounded-full text-sm flex gap-2 items-center ${colorClass}`}>
            {icon}
            {statusLabel}
          </span>
        );
      }
    },
  ];


  // Effets
  useEffect(() => {
    if (employees.length == 0)
      dispatch(getAllEmployees({}));
  }, [dispatch]);

  // Modale 
  useEffect(() => {
    if (showModal && hiddeTheModalActive) {
      handleCloseModal();
    }
  }, [hiddeTheModalActive]);

  return (
    <div className="space-y-4 md:space-y-6">

      {/* Entete */}
      <Title
        title='Gestion des employés'
        description='Gérez et suivez l’ensemble des employés de votre établissement.'
      >
        {permission.create &&
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary-600 text-light px-2 py-1 sm:px-4 sm:py-2 _classe rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className='max-md:hidden-susp' >Nouveau employés</span>
          </button>
        }
      </Title>

      {/* Filtrage  */}
      <div className="bg-light p-3 md:p-6 rounded-lg shadow-sm border">
        <FilterAndSearch
          pagination={pagination}
          thunk={getAllEmployees}
        />


        <Table
          isLoading={action.isLoading as boolean}
          data={employees}
          columns={columns}
          actions={actions}
          onRowClick={(item: EmployeeType) => navigate(`/back-office/employees/${item.matricule_personnel}`)}
          pagination={pagination}
          thunk={getAllEmployees}
        />
      </div>

      {/* Modal pour ajouter/modifier */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingEmployees ? "Modifier l'employé" : 'Nouvel employé'}
        size='lg'
      >
        <EmployeForm
          editingEmployees={editingEmployees}
          handleClose={handleCloseModal}
        />
      </Modal>

      {/* Dialog de confirmation */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmArchive}
        title="Archiver l'enseignant"
        message={`Êtes-vous sûr de vouloir archiver l'enseignant ${teacherToArchive?.prenom} ${teacherToArchive?.nom} ?`}
      />
    </div>
  );
};

export default Employees;