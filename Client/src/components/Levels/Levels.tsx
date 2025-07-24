import { useEffect, useState } from 'react';
import { Plus, Search, Filter, Edit, Archive, Eye } from 'lucide-react';
import Table from '../Table';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import { AppDispatch } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getLevelState } from './redux/LevelSlice';
import { createLevel, deleteLevel, getAllLevel, updateLevel } from './redux/LevelAsyncThunk';
import { cycles } from '../../Utils/Utils';
import { levelType } from '../../Utils/Types';
import { object, string } from 'yup';
import useForm from '../../Hooks/useForm';
import InputError from '../ui/InputError';
import { getAppState } from '../../Redux/AppSlice';
import LevelSubject from './LevelSubject';

// Validation de donnée avec yup 
const LevelSchema = object({
  niveau: string().required('Le nom du niveau est obligatoire.'),
  cycle: string().required('Le cycle est obligatoire.'),
  description: string().required('La description est obligatoire.')
})

const Levels = () => {
  const dispatch: AppDispatch = useDispatch();
  const { datas, action, error } = useSelector(getLevelState);
  const { onSubmite, formErrors } = useForm<levelType>(LevelSchema, { niveau: '', cycle: '', description: '' });
  const { hiddeTheModalActive } = useSelector(getAppState);
  const [activeTab, setActiveTab] = useState('listeLevel');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingLevel, setEditingLevel] = useState<levelType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [levelToDelete, setLevelToDelete] = useState<levelType | null>(null);
  const [isActiveAutoGenationClasse, setIsActiveAutoGenationClasse] = useState(false)

  // fonctions
  const handleEdit = (level: any) => {
    setEditingLevel(level);
    setShowModal(true);
  };

  const handleDelete = (level: any) => {
    setLevelToDelete(level);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    if (levelToDelete) {
      dispatch(deleteLevel(levelToDelete.id_niveau as number))
    }
    setShowConfirmDialog(false);
    setLevelToDelete(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingLevel(null);
    setIsActiveAutoGenationClasse(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmite((validateData: levelType) => {
      editingLevel ? dispatch(updateLevel({ level: validateData, id: editingLevel?.id_niveau as number })) : dispatch(createLevel(validateData))
    }, e)
  }

  // Modal
  useEffect(() => {
    if (showModal && hiddeTheModalActive) {
      handleCloseModal();
    }
  }, [hiddeTheModalActive]);

  useEffect(() => {
    dispatch(getAllLevel());
  }, [dispatch]);

  // Tableau //
  const columns = [
    { key: 'niveau', label: 'Niveau' },
    { key: 'cycle', label: 'Cycle' },
    { key: 'description', label: 'Description' },
    { key: 'total_classe', label: 'Nombre de classe', render: (value: number) => <div className={value == 0 ? "text-gray-300" : ''}>{value > 0 ? value : 'Aucune'} </div> },
    { key: 'total_matiere', label: 'Nombre de matière', render: (value: number) => <div className={value == 0 ? "text-gray-300" : ''}>{value > 0 ? value : 'Aucune'} </div> },
  ];

  const actions = [
    { icon: Eye, label: 'Voir', onClick: (item: any) => console.log('Voir', item), color: 'blue' },
    { icon: Edit, label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive, label: 'Archiver', onClick: handleDelete, color: 'red' },
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

      {/* Onglets */}
      <div className="border-b">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('listeLevel')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'listeLevel'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            Listes des niveaux
          </button>
          <button
            onClick={() => setActiveTab('levelSbject')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'levelSbject'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            Niveau & Matiere
          </button>
        </nav>
      </div>

      {activeTab === "listeLevel" &&
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
            isLoading={action.isLoading as boolean}
          />
        </div>
      }

      {activeTab === 'levelSbject' &&  <LevelSubject />
      }


      {/* Modal pour ajouter/modifier un niveau */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingLevel ? 'Modifier le niveau' : 'Nouveau niveau'}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
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
          {!editingLevel &&
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Générer des classes automatiquement</h4>
                <p className="text-sm text-gray-600">Création des classes automatiquement pour ce niveau.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" onChange={(e) => setIsActiveAutoGenationClasse(e.target.checked)} defaultChecked={isActiveAutoGenationClasse} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          }
          {
            (isActiveAutoGenationClasse && !editingLevel) &&
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de classe</label>
                <input
                  name='classe'
                  type="number"
                  min={0}
                  max={15}
                  defaultValue={0}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-gray-600">Les classes générées sont nommées par ordre alphabétique.</p>
              </div>
            </>
          }
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
        onClose={() => { setShowConfirmDialog(false) }}
        onConfirm={handleConfirmDelete}
        title="Suppression du niveau"
        message={`Êtes-vous sûr de vouloir archiver le niveau ${levelToDelete?.niveau} ?`}
      />
    </div>
  );
};

export default Levels;