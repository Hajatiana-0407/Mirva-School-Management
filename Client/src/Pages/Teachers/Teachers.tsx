import React, { useEffect, useState } from 'react';
import { Plus, Edit, Archive, Eye, HeartPulse } from 'lucide-react';
import Table from '../Table';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import { TeacherType } from '../../Utils/Types';
import { AppDispatch } from '../../Redux/store';
import { getAppState } from '../../Redux/AppSlice';
import { useNavigate } from 'react-router-dom';
import { getTeacherState } from './redux/TeachersSlice';
import { filterTeacher, getAllTeachers } from './redux/TeacherAsyncThunk';
import { deleteEmployees } from '../Employees/redux/EmployeAsyncThunk';
import Profile from '../../Components/ui/Profile';
import EmployeForm from '../../Components/Forms/EmployeForm';
import SubjectLevelContent from '../../Components/SubjectLevelContent';
import { useHashPermission } from '../../Hooks/useHashPermission';
import Title from '../../Components/ui/Title';
import FilterAndSearch from '../../Components/FilterAndSearch';

const Teachers: React.FC = () => {
  // Nom du fichier pièce d'identité (verso)
  const [showModal, setShowModal] = useState(false);
  const [editingEmployees, setEditingEmployees] = useState<TeacherType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [teacherToArchive, setTeacherToArchive] = useState<TeacherType | null>(null);
  const permission = useHashPermission({ redirect: true });

  const { hiddeTheModalActive } = useSelector(getAppState);
  // *** //
  const { datas: employees, action, pagination } = useSelector(getTeacherState);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

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
    { icon: Eye, label: 'Voir le détail', onClick: (item: TeacherType) => navigate("/back-office/employees/" + item.matricule_personnel), color: 'primary' },
    { icon: Plus, label: 'Classes et Matières', onClick: (item: TeacherType) => navigate("/back-office/teachers/" + item.matricule_personnel), color: 'purple' },
    { icon: Edit, type: 'update', label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive, type: 'delete', label: 'Supprimer', onClick: handleArchive, color: 'red' },
  ];

  const columns = [
    // Profil employé
    {
      key: 'nom',
      label: 'Profil',
      render: (value: string, item: TeacherType) => (
        <Profile
          fullName={`${value} ${item.prenom}`}
          identification={item.matricule_personnel}
          photo={item.photo as string}
          link={`/back-office/employees/${item.matricule_personnel}`}
        />
      )
    },
    {
      key: 'telephone', label: 'Contact', render: (value: string, item: TeacherType) => (
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

    {
      key: 'classes', label: 'Classes et Matières', render: (value: any[], item: TeacherType) => (
        <SubjectLevelContent
          value={value}
          item={item}
        />
      )
    }
  ];


  // Effets
  useEffect(() => {
    // if (employees.length == 0)
    dispatch(getAllTeachers({}));
  }, [dispatch]);

  // Modale 
  useEffect(() => {
    if (showModal && hiddeTheModalActive) {
      handleCloseModal();
    }
  }, [hiddeTheModalActive]);

  return (
    <div className="space-y-4 md:space-y-6">
      <Title
        title='Gestion des enseignants'
        description='Administrez les informations et affectations des enseignants.'
        fixed
      >
        {permission.create &&
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary-600 text-light px-2 py-1 sm:px-4 sm:py-2 _classe rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className='max-md:hidden-susp'>Nouveau enseignant</span>
          </button>
        }
      </Title>

      {/* Filtrage  */}
      <div className="bg-light p-3 md:p-6 rounded-lg shadow-sm border">
        <FilterAndSearch
          pagination={pagination}
          thunk={getAllTeachers}
        />

        <Table
          isLoading={action.isLoading as boolean}
          data={employees}
          columns={columns}
          actions={actions}
          actionType='pop-up'
          onRowClick={(item: TeacherType) => navigate(`/back-office/employees/${item.matricule_personnel}`)}
          pagination={pagination}
          thunk={getAllTeachers}
          filterThunk={filterTeacher}
        />
      </div>

      {/* Modal pour ajouter/modifier */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingEmployees ? "Modifier l'enseigant" : 'Nouvel enseigant'}
        size='lg'
      >
        <EmployeForm editingEmployees={editingEmployees} handleClose={handleCloseModal} type='teacher' />
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

export default Teachers;
