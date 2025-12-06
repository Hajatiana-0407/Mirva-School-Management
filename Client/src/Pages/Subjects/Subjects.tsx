import { useEffect, useState } from 'react';
import { Plus, Edit, Archive, Eye } from 'lucide-react';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import Table from '../Table';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectState } from './redux/SubjectSlice';
import { SubjectType } from '../../Utils/Types';
import { AppDispatch } from '../../Redux/store';
import { deleteSubject, getAllSubject } from './redux/SubjectAsyncThunk';
import { getAppState } from '../../Redux/AppSlice';
import SubjectForm from '../../Components/Forms/SubjectForm';
import { useHashPermission } from '../../Hooks/useHashPermission';
import Title from '../../Components/ui/Title';
import FilterAndSearch from '../../Components/FilterAndSearch';



const Subjects = () => {
  const { datas: subjects, action, pagination } = useSelector(getSubjectState);
  const { hiddeTheModalActive } = useSelector(getAppState);
  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState<SubjectType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [subjectToArchive, setSubjectToArchive] = useState<SubjectType | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const permission = useHashPermission({ redirect: true });


  const columns = [
    { key: 'denomination', label: 'Matière' },
    { key: 'abbreviation', label: 'Abbreviation' },
    { key: 'description', label: 'Déscription' },
    {
      key: 'couleur', label: 'Couleur', render: (value: string) => (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: value }}></div>
          <span>{value}</span>
        </div>
      )
    },
    { key: 'created_at', label: 'Date d\'ajout' },
  ];

  const handleEdit = (subject: any) => {
    setEditingSubject(subject);
    setShowModal(true);
  };

  const handleArchive = (subject: any) => {
    setSubjectToArchive(subject);
    setShowConfirmDialog(true);
  };

  const handleConfirmArchive = () => {
    if (subjectToArchive) {
      dispatch(deleteSubject(subjectToArchive?.id_matiere as number))
    }
    setShowConfirmDialog(false);
    setSubjectToArchive(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSubject(null);
  };

  // Modal
  useEffect(() => {
    if (showModal && hiddeTheModalActive) {
      handleCloseModal();
    }
  }, [hiddeTheModalActive]);

  useEffect(() => {
    if (!subjects.length) {
      dispatch(getAllSubject({}));
    }
  }, [dispatch]);


  const actions = [
    { icon: Eye, label: "Voir les détails", onClick: (item: any) => console.log("Voir les détails", item), color: 'primary' },
    { icon: Edit, type: 'update', label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive, type: 'delete', label: "Supprimer", onClick: handleArchive, color: 'red' },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <Title
        title='Gestion des matières'
        description='Créez et organisez les matières enseignées.'
      >
        {permission.create &&
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary-600 text-light px-2 py-1 sm:px-4 sm:py-2 _classe rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className='max-md:hidden-susp'>Nouvelle matière</span>
          </button>
        }
      </Title>

      <div className="bg-light p-3 md:p-6 rounded-lg shadow-sm border">
        <FilterAndSearch
          pagination={pagination}
          thunk={getAllSubject}
        />

        <Table
          data={subjects}
          columns={columns}
          actions={actions}
          isLoading={action.isLoading as boolean}
          pagination={pagination}
          thunk={getAllSubject}
        />
      </div>

      {/* Modal pour ajouter/modifier une matière */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingSubject ? 'Modifier la matière' : 'Nouvelle matière'}
      >
        <SubjectForm handleClose={handleCloseModal} subject={editingSubject} />
      </Modal>

      {/* Dialog de confirmation */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmArchive}
        title="Archiver la matière"
        message={`Êtes-vous sûr de vouloir archiver la matière ${subjectToArchive?.denomination} ?`}
      />
    </div>
  );
};

export default Subjects;