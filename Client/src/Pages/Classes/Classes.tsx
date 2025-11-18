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
import Title from '../../Components/ui/Title';
import { navigate } from '../../Utils/navigate';


const Classes: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { datas: classes, action } = useSelector(getClasseState);
  const { hiddeTheModalActive } = useSelector(getAppState);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState<ClasseType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [classToArchive, setClassToArchive] = useState<ClasseType | null>(null);
  const permission = useHashPermission(  { redirect : true  });



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
    { icon: Eye, label: 'Voir', onClick: (item: any) => navigate(`/back-office/classes/${ item.id_classe}`), color: 'primary' },
    { icon: Edit, type: 'update', label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive, type: 'delete', label: 'Archiver', onClick: handleArchive, color: 'red' },
  ];

  return (
    <div className="space-y-4 md:space-y-6">

      <Title
        title='Gestion des classes'
        description='Organisez facilement les classes et leurs niveaux.'
      >
        {permission.create &&
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary-600 text-light px-2 py-1 sm:px-4 sm:py-2 _classe rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition-colors w-max"
          >
            <Plus className="w-4 h-4" />
            <span className='max-md:hidden-susp'>Nouvelle classe</span>
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
                placeholder="Rechercher une classe..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />

            </div>
            <button className="flex items-center space-x-2 px-2 py-1 sm:px-4 sm:py-2 _classe border border-secondary-300 rounded-lg hover:bg-secondary-50">
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
          onRowClick={( item: ClasseType ) => navigate(`/back-office/classes/${ item.id_classe}`)}
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