import { useEffect, useState } from 'react';
import { Plus, Search, Filter, Edit, Archive, Eye } from 'lucide-react';
import Table from '../Table';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import { AppDispatch } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getLevelState } from './redux/LevelSlice';
import { getAllLevel, updateLevel } from './redux/LevelAsyncThunk';
import { cycles } from '../../Utils/Utils';
import { levelType } from '../../Utils/Types';
import { object, string } from 'yup';
import useForm from '../../Hooks/useForm';
import InputError from '../ui/InputError';

// Validation de donnée avec yup 
const LevelSchema = object({
  niveau: string().required('Le nom du niveau est obligatoire.'),
  cycle: string().required('Le cycle est obligatoire.'),
  description: string().required('La description est obligatoire.')
})


const Levels = () => {
  const dispatch: AppDispatch = useDispatch();
  const { datas, action, error } = useSelector(getLevelState);
  
  const {
    onSubmite,
    formErrors
  } = useForm<levelType>(LevelSchema, { niveau: '', cycle: '', description: '' });


  useEffect(() => {
    dispatch(getAllLevel());
  }, [dispatch]);


  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingLevel, setEditingLevel] = useState<levelType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [levelToArchive, setLevelToArchive] = useState<levelType | null>(null);




  const handleEdit = (level: any) => {

    setEditingLevel(level);
    setShowModal(true);
  };

  const handleArchive = (level: any) => {
    setLevelToArchive(level);
    setShowConfirmDialog(true);
  };

  const handleConfirmArchive = () => {
    console.log('Archivage de:', levelToArchive);
    setShowConfirmDialog(false);
    setLevelToArchive(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingLevel(null);
  };


  // Tableau //
  const columns = [
    { key: 'niveau', label: 'Niveau' },
    { key: 'cycle', label: 'Cycle' },
    { key: 'description', label: 'Description' },
    { key: 'ordre', label: 'Ordre' },
  ];

  const actions = [
    { icon: Eye, label: 'Voir', onClick: (item: any) => console.log('Voir', item), color: 'blue' },
    { icon: Edit, label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive, label: 'Archiver', onClick: handleArchive, color: 'red' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des niveaux</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau niveau</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un niveau..."
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
          data={datas}
          columns={columns}
          actions={actions}
          searchTerm={searchTerm}
        />
      </div>

      {/* Modal pour ajouter/modifier un niveau */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingLevel ? 'Modifier le niveau' : 'Nouveau niveau'}
      >
        <form className="space-y-4" onSubmit={(e) => {
          onSubmite((validateData: levelType) => { dispatch(updateLevel({ level: validateData, id: editingLevel?.id_niveau as number })) }, e)
        }}>
          <InputError message={error} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom du niveau</label>
            <input
              name='niveau'
              type="text"
              defaultValue={editingLevel?.niveau || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <InputError message={formErrors?.niveau} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cycle</label>
            <select name='cycle' className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              {cycles.map((cycle: string, key: number) => cycle === editingLevel?.cycle ? <option key={key} value={cycle}>{cycle}</option> : '')}
              {cycles.map((cycle: string, key: number) => cycle !== editingLevel?.cycle ? <option key={key} value={cycle}>{cycle}</option> : '')}
            </select>
            <InputError message={formErrors?.cycle} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name='description'
              defaultValue={editingLevel?.description || ''}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <InputError message={formErrors?.description} />
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
              {editingLevel ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Dialog de confirmation */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmArchive}
        title="Archiver le niveau"
        message={`Êtes-vous sûr de vouloir archiver le niveau ${levelToArchive?.niveau} ?`}
      />
    </div>
  );
};

export default Levels;