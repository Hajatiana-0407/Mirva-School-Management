import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, Edit, Archive, Eye } from 'lucide-react';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import Table from '../Table';
import { useDispatch, useSelector } from 'react-redux';
// Remplacez par vos propres slices pour SchoolYear
import { getSchoolYearState } from './redux/SchoolYearSlice';
import useForm from '../../Hooks/useForm';
import { object, string } from 'yup';
import { AppDispatch } from '../../Redux/store';
import { createSchoolYear, deleteSchoolYear, getAllSchoolYear, updateSchoolYear } from './redux/SchoolYearAsyncThunk';
import { getAppState } from '../../Redux/AppSlice';
import InputError from '../../Components/ui/InputError';
import { schoolYearInitialValue, SchoolYearType } from '../../Utils/Types';


// Validation
const SchoolYearSchema = object({
  nom: string().required('Le nom de l\'année scolaire est obligatoire.'),
  date_debut: string().required('La date de début est obligatoire.'),
  date_fin: string().required('La date de fin est obligatoire.'),
});

const SchoolYear = () => {
  const { datas: schoolYears, action, error } = useSelector(getSchoolYearState);
  const { onSubmite, formErrors } = useForm<SchoolYearType>(SchoolYearSchema, schoolYearInitialValue);
  const { hiddeTheModalActive } = useSelector(getAppState);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingSchoolYear, setEditingSchoolYear] = useState<SchoolYearType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [schoolYearToArchive, setSchoolYearToArchive] = useState<SchoolYearType | null>(null);
  const dispatch: AppDispatch = useDispatch();

  console.log(schoolYears);
  

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmite((validateData) => {
      editingSchoolYear
        ? dispatch(updateSchoolYear({ schoolYear: validateData, id: editingSchoolYear?.id_annee_scolaire as number }))
        : dispatch(createSchoolYear(validateData));
    }, e);
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
    { icon: Edit, label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive, label: 'Archiver', onClick: handleArchive, color: 'red' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des années scolaires</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle année scolaire</span>
        </button>
      </div>

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
        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputError message={error} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'année scolaire</label>
            <input
              name='nom'
              type="text"
              defaultValue={editingSchoolYear?.nom || ''}
              placeholder='2023-2024'
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <InputError message={formErrors?.nom} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={3}
              name="description"
              defaultValue={editingSchoolYear?.description || ""}
              placeholder='Décrivez brièvement cette année scolaire'
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <InputError message={formErrors?.description} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
              <input
                name='date_debut'
                type="date"
                defaultValue={editingSchoolYear?.date_debut || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputError message={formErrors?.date_debut} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
              <input
                name='date_fin'
                type="date"
                defaultValue={editingSchoolYear?.date_fin || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputError message={formErrors?.date_fin} />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingSchoolYear ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
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