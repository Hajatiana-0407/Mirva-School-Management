import { useEffect, useState } from 'react';
import { Plus, Search, Filter, Edit, Archive, Eye } from 'lucide-react';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import Table from '../Table';
import { useDispatch, useSelector } from 'react-redux';
import { getSchoolYearState } from './redux/SchoolYearSlice';
import { AppDispatch } from '../../Redux/store';
import { deleteSchoolYear, getAllSchoolYear } from './redux/SchoolYearAsyncThunk';
import { getAppState } from '../../Redux/AppSlice';
import { SchoolYearType } from '../../Utils/Types';
import SchoolYearForm from '../../Components/Forms/SchoolYearForm';
import { useHashPermission } from '../../Hooks/useHashPermission';
import Title from '../../Components/ui/Title';




const SchoolYear = () => {
  const { datas: schoolYears, action } = useSelector(getSchoolYearState);
  const { hiddeTheModalActive } = useSelector(getAppState);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingSchoolYear, setEditingSchoolYear] = useState<SchoolYearType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [schoolYearToArchive, setSchoolYearToArchive] = useState<SchoolYearType | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const permission = useHashPermission();

  const columns = [
    { key: 'nom', label: 'Année scolaire' },
    {
      key: 'isActif', label: 'Status', render: (value: string) => (
        value === '1' ? <div className='w-4 h-4 rounded-full bg-green-400'></div>
          : <div className='w-4 h-4 rounded-full bg-gray-400'></div>
      )
    },
    { key: 'date_debut', label: 'Date de début' },
    { key: 'date_fin', label: 'Date de fin' },
    { key: 'description', label: 'Description' },
    { key: 'created_at', label: 'Date d\'ajout' },
  ];

  const handleEdit = (schoolYear: any) => {
    setEditingSchoolYear(schoolYear);
    setShowModal(true);
  };

  const handleArchive = (schoolYear: any) => {
    setSchoolYearToArchive(schoolYear);
    setShowConfirmDialog(true);
  };

  const handleConfirmArchive = () => {
    if (schoolYearToArchive) {
      dispatch(deleteSchoolYear(schoolYearToArchive?.id_annee_scolaire as number));
    }
    setShowConfirmDialog(false);
    setSchoolYearToArchive(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSchoolYear(null);
  };


  useEffect(() => {
    if (showModal && hiddeTheModalActive) {
      handleCloseModal();
    }
  }, [hiddeTheModalActive]);

  useEffect(() => {
    if (!schoolYears.length) {
      dispatch(getAllSchoolYear());
    }
  }, [dispatch]);

  const actions = [
    { icon: Eye, label: 'Voir', onClick: (item: any) => console.log('Voir', item), color: 'blue' },
    { icon: Edit, type: 'update', label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive, type: 'delete', label: 'Archiver', onClick: handleArchive, color: 'red' },
  ];

  return (
    <div className="space-y-6">
      <Title
        title='Gestion des années scolaires'
        description='Gérez et planifiez les années scolaires.'
      >
        {permission.create &&
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className='max-md:hidden-susp'>Nouvelle année scolaire</span>
          </button>
        }
      </Title>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une année scolaire..."
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
          data={schoolYears}
          columns={columns}
          actions={actions}
          searchTerm={searchTerm}
          isLoading={action.isLoading as boolean}
        />
      </div>

      {/* Modal pour ajouter/modifier une année scolaire */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingSchoolYear ? 'Modifier l\'année scolaire' : 'Nouvelle année scolaire'}
      >
        <SchoolYearForm schoolYear={editingSchoolYear} handleClose={handleCloseModal} />
      </Modal>

      {/* Dialog de confirmation */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmArchive}
        title="Archiver l'année scolaire"
        message={`Êtes-vous sûr de vouloir archiver l'année scolaire ${schoolYearToArchive?.nom} ?`}
      />
    </div>
  );
};

export default SchoolYear;