import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, Edit, Archive, Eye } from 'lucide-react';
import Table from '../Table';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import { number, object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import useForm from '../../Hooks/useForm';
import { classeInitialState, ClasseType, levelType } from '../../Utils/Types';
import { createClasse, deleteClasse, getAllClasse, updateClasse } from './redux/ClasseAsyncThunk';
import { getAppState } from '../../Redux/AppSlice';
import { getClasseState } from './redux/ClasseSlice';
import { getLevelState } from '../Levels/redux/LevelSlice';
import { getAllLevel } from '../Levels/redux/LevelAsyncThunk';
import InputError from '../ui/InputError';

// Validation de donnée avec yup 
const LevelSchema = object({
  denomination: string().required('La denomination est obligatoire.'),
  niveau_id_niveau: number().min(1, "'Selectionner un niveau.'").required('Selectionner un niveau.'),
})

const Classes: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { datas: classes, action, error } = useSelector(getClasseState);
  const { onSubmite, formErrors } = useForm<ClasseType>(LevelSchema, classeInitialState);
  const { hiddeTheModalActive } = useSelector(getAppState);
  const { datas: niveaux } = useSelector(getLevelState);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState<ClasseType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [classToArchive, setClassToArchive] = useState<ClasseType | null>(null);



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

  useEffect(() => {
    dispatch(getAllLevel());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmite((validateData: ClasseType) => {
      editingClass ? dispatch(updateClasse({ Classe: validateData, id: editingClass?.id_classe as number })) : dispatch(createClasse(validateData))
    }, e)
  }

  const columns = [
    { key: 'denomination', label: 'Nom de la classe' },
    { key: 'niveau', label: 'Niveau' },
    // { key: 'effectif', label: 'Effectif' },
  ];

  const actions = [
    { icon: Eye, label: 'Voir', onClick: (item: any) => console.log('Voir', item), color: 'blue' },
    { icon: Edit, label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive, label: 'Archiver', onClick: handleArchive, color: 'red' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des classes</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle classe</span>
        </button>
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
        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputError message={error} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la classe</label>
            <input
              type="text"
              name='denomination'
              defaultValue={editingClass?.denomination || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <InputError message={formErrors?.denomination} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
            <select name='niveau_id_niveau' className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              {!editingClass && <option value="0">Sélectionner un niveau</option>}

              {niveaux.map((niveau: levelType, key: number) => {
                return editingClass && editingClass.niveau_id_niveau === niveau.id_niveau
                  ? <option key={key} value={niveau.id_niveau}>{niveau.niveau}</option>
                  : editingClass ? "" : <option key={key} value={niveau.id_niveau}>{niveau.niveau}</option>
              })}
              {niveaux.map((niveau: levelType, key: number) => {
                return editingClass && editingClass.niveau_id_niveau !== niveau.id_niveau
                  ? <option key={key} value={niveau.id_niveau}>{niveau.niveau}</option>
                  : ""
              })}
            </select>
            <InputError message={formErrors?.niveau_id_niveau} />
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
              {editingClass ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
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