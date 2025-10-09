import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, Edit, Archive, Eye, HeartPulse } from 'lucide-react';
import Table from '../Table';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import { TeacherType } from '../../Utils/Types';
import { AppDispatch } from '../../Redux/store';
import { getAppState } from '../../Redux/AppSlice';
import { useNavigate } from 'react-router-dom';
import { getTeacherState } from './redux/TeachersSlice';
import { getAllTeachers } from './redux/TeacherAsyncThunk';
import { deleteEmployees } from '../Employees/redux/EmployeAsyncThunk';
import Profile from '../../Components/ui/Profile';
import EmployeForm from '../../Components/Forms/EmployeForm';
import { hexToRgba } from '../../Utils/Utils';

const Teachers: React.FC = () => {
  // Nom du fichier pièce d'identité (verso)
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingEmployees, setEditingEmployees] = useState<TeacherType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [teacherToArchive, setTeacherToArchive] = useState<TeacherType | null>(null);

  const { hiddeTheModalActive } = useSelector(getAppState);
  // *** //
  const { datas: employees, action } = useSelector(getTeacherState);
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

  const getSubjectLevelContent = (value: string, item: TeacherType) => {
    return (
      <div>
        {value &&
          item.classes?.slice(0, 3).map((classe, index) => (
            <div key={index} className="border-b border-gray-300 last:border-0 text-sm flex ">
              <div className="font-semibold border-r pe-2 py-2 min-w-24">{classe.denomination} </div>
              <div className="ml-2 py-2">
                {classe.matieres?.slice(0, 2).map((subject) => (
                  <div key={subject.id_matiere} className='px-2  py-1 rounded text-xs font-medium  hover:opacity-80' style={{ backgroundColor: hexToRgba(subject.couleur, 0.5) }}>
                    <span>
                      {subject.abbreviation}
                    </span>
                  </div>
                ))}
                <div className='text-center text-gray-400 text-xs'>
                  {classe.matieres?.length && classe.matieres?.length > 2 ? `+${classe?.matieres?.length - 2}` : ''}
                </div>
              </div>
            </div>
          ))
        }
        {item.classes && item.classes.length > 3 && (
          <div className="text-sm text-gray-500">
            et {item.classes.length - 3} autre{item.classes.length - 3 > 1 ? 's' : ''}...
          </div>
        )}
      </div>
    )
  }

  // TABLEAUX 
  const actions = [
    { icon: Eye, label: 'Voir le détail', onClick: (item: TeacherType) => navigate("/employees/" + item.matricule_personnel), color: 'blue' },
    { icon: Edit, label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive, label: 'Supprimer', onClick: handleArchive, color: 'red' },
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
          link={`/employees/${item.matricule_personnel}`}
        />
      )
    },
    { key: 'addresse', label: 'Addrèsse' },
    {
      key: 'telephone', label: 'Contact', render: (value: string, item: TeacherType) => (
        <div>
          {value}
          <span className='block text-sm text-blue-500'>{item.email} </span>
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

    { key: 'classes', label: 'Classes et Matières', render: getSubjectLevelContent }
  ];

  // Effets
  useEffect(() => {
    dispatch(getAllTeachers());
  }, [dispatch]);

  // Modale 
  useEffect(() => {
    if (showModal && hiddeTheModalActive) {
      handleCloseModal();
    }
  }, [hiddeTheModalActive]);

  return (
    <div className="space-y-6">

      {/* Entete */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des employés</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau enseigant</span>
        </button>
      </div>

      {/* Filtrage  */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un enseignant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 cursor-pointer"
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
            >
              <option value="">Tous les Status</option>
              <option value="Actif">Actif</option>
              <option value="Suspendu">Suspendu</option>
              <option value="Démissionnaire">Démissionnaire</option>

            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filtres</span>
            </button>
          </div>
        </div>


        <Table
          isLoading={action.isLoading as boolean}
          data={employees}
          columns={columns}
          actions={actions}
          searchTerm={searchTerm}
          actionType='pop-up'
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