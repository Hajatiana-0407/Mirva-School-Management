import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, Edit, Archive, Eye } from 'lucide-react';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import Table from '../Table';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectState } from './redux/SubjectSlice';
import useForm from '../../Hooks/useForm';
import { subjectInitialValue, SubjectType } from '../../Utils/Types';
import { object, string } from 'yup';
import { AppDispatch } from '../../Redux/store';
import { createSubject, deleteSubject, getAllSubject, updateSubject } from './redux/SubjectAsyncThunk';
import { getAppState } from '../../Redux/AppSlice';
import InputError from '../../Components/ui/InputError';

// Validation de donnée avec yup 
const SubjectSchema = object({
  denomination: string().required('La denomination est obligatoire.'),
  abbreviation: string().required('L\' abbreviation est obligatoire.'),
  couleur: string().required('La couleur est obligatoire.'),
});

const Subjects = () => {
  const { datas: subjects, action , error  } = useSelector(getSubjectState);
  const { onSubmite, formErrors } = useForm<SubjectType>(SubjectSchema, subjectInitialValue);
  const { hiddeTheModalActive } = useSelector(getAppState);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState<SubjectType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [subjectToArchive, setSubjectToArchive] = useState<SubjectType | null>(null);
  const dispatch: AppDispatch = useDispatch();


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
    if( subjectToArchive ){
      dispatch(deleteSubject( subjectToArchive?.id_matiere as number))
    }
    setShowConfirmDialog(false);
    setSubjectToArchive(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSubject(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmite((validateData ) => {
      editingSubject ? dispatch(updateSubject({ subject: validateData, id: editingSubject?.id_matiere as number })) : dispatch(createSubject(validateData))
    }, e)
  }

  // Modal
  useEffect(() => {
    if (showModal && hiddeTheModalActive) {
      handleCloseModal();
    }
  }, [hiddeTheModalActive]);

  useEffect(() => {
    if (!subjects.length) {
      dispatch(getAllSubject());
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
        <h1 className="text-2xl font-bold text-gray-900">Gestion des matières</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle matière</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une matière..."
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
          data={subjects}
          columns={columns}
          actions={actions}
          searchTerm={searchTerm}
          isLoading={action.isLoading as boolean}
        />
      </div>

      {/* Modal pour ajouter/modifier une matière */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingSubject ? 'Modifier la matière' : 'Nouvelle matière'}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputError message={error}/>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" >Nom de la matière</label>
              <input
                name='denomination'
                type="text"
                defaultValue={editingSubject?.denomination || ''}
                placeholder='Ex:Mathématique'
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputError message={ formErrors?.denomination } />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Abbreviation</label>
              <input
                name='abbreviation'
                type="text"
                defaultValue={editingSubject?.abbreviation || ''}
                placeholder='Ex:MATH'
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputError message={ formErrors?.abbreviation } />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Déscription</label>
            <textarea
              name='description'
              defaultValue={editingSubject?.description}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <InputError message={ formErrors?.description } />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Couleur</label>
            <input
              type="color"
              name='couleur'
              defaultValue={editingSubject?.couleur || '#80aed1'}
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <InputError message={ formErrors?.couleur } />
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
              {editingSubject ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
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