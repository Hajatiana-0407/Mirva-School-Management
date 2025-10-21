import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, Edit, Archive, Eye } from 'lucide-react';
import Table from '../Table';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { ClasseType } from '../../Utils/Types';
import { deleteClasse, getAllClasse } from './redux/ClasseAsyncThunk';
import { getAppState } from '../../Redux/AppSlice';
import { getClasseState } from './redux/ClasseSlice';
import ClasseForm from '../../Components/Forms/ClasseForm';
import { useHashPermission } from '../../Hooks/useHashPermission';


const Classes: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { datas: classes, action } = useSelector(getClasseState);
  const { hiddeTheModalActive } = useSelector(getAppState);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState<ClasseType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [classToArchive, setClassToArchive] = useState<ClasseType | null>(null);
  const permission = useHashPermission();



  const handleEdit = (classItem: any) => {
    setEditingClass(classItem);
    setShowModal(true);
  };

  const handleArchive = (classItem: any) => {
    setClassToArchive(classItem);
    setShowConfirmDialog(true);
  };

  const handleConfirmArchive = () => {
    if (classToArchive) {
      dispatch(deleteClasse(classToArchive.id_classe as number))
    }
    setShowConfirmDialog(false);
    setClassToArchive(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingClass(null);
  };


  // Modale 
  useEffect(() => {
    if (showModal && hiddeTheModalActive) {
      handleCloseModal();
    }
  }, [hiddeTheModalActive]);

  useEffect(() => {
    dispatch(getAllClasse());
  }, [dispatch]);

  const columns = [
    { key: 'denomination', label: 'Nom de la classe' },
    { key: 'niveau', label: 'Niveau' },
    // { key: 'effectif', label: 'Effectif' },
  ];

  const actions = [
    { icon: Eye, label: 'Voir', onClick: (item: any) => console.log('Voir', item), color: 'blue' },
    { icon: Edit, type: 'update', label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive, type: 'delete', label: 'Archiver', onClick: handleArchive, color: 'red' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des classes</h1>
        {permission.create &&
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvelle classe</span>
          </button>
        }
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une classe..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filtres</span>
            </button>
          </div>
        </div>

        <Table
          data={classes}
          columns={columns}
          actions={actions}
          searchTerm={searchTerm}
          isLoading={action.isLoading as boolean}
        />
      </div>

      {/* Modal pour ajouter/modifier une classe */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingClass ? 'Modifier la classe' : 'Nouvelle classe'}
      >
        <ClasseForm handleClose={handleCloseModal} classe={editingClass} />
      </Modal>

      {/* Dialog de confirmation */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmArchive}
        title="Archiver la classe"
        message={`Êtes-vous sûr de vouloir archiver la classe ${classToArchive?.denomination} ?`}
      />
    </div>
  );
};

export default Classes;