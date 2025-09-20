import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import Modal from '../Modal';
import { AppDispatch } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getLevelState } from './redux/LevelSlice';
import { createLevel, getAllLevel, updateLevel } from './redux/LevelAsyncThunk';
import { cycles } from '../../Utils/Utils';
import { levelType } from '../../Utils/Types';
import { object, string } from 'yup';
import useForm from '../../Hooks/useForm';
import InputError from '../ui/InputError';
import { getAppState } from '../../Redux/AppSlice';
import LevelSubject from './LevelSubject';
import LevelListe from './LevelListe';
import { useParams } from 'react-router-dom';

// Validation de donnée avec yup 
const LevelSchema = object({
  niveau: string().required('Le nom du niveau est obligatoire.'),
  cycle: string().required('Le cycle est obligatoire.'),
  description: string().required('La description est obligatoire.')
})

const Levels = () => {
  const { active } = useParams();

  const dispatch: AppDispatch = useDispatch();
  const { onSubmite, formErrors } = useForm<levelType>(LevelSchema, { niveau: '', cycle: '', description: '' });
  const { hiddeTheModalActive } = useSelector(getAppState);
  const [activeTab, setActiveTab] = useState<'levelSbject' | 'listeLevel'>(active !== undefined ? 'levelSbject' : 'listeLevel');
  const [showModal, setShowModal] = useState(false);
  const [editingLevel, setEditingLevel] = useState<levelType | null>(null);
  const [isActiveAutoGenationClasse, setIsActiveAutoGenationClasse] = useState(false)
  const [idLevelToAddSubject, setIdLevelToAddSubject] = useState<number>(0);
  const { error } = useSelector(getLevelState);


  // HANDLERS
  const handleEdit = (level: levelType) => {
    setEditingLevel(level);
    setShowModal(true);
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


  // EFFET
  useEffect(() => {
    if (showModal && hiddeTheModalActive) {
      handleCloseModal();
    }
  }, [hiddeTheModalActive]);

  useEffect(() => {
    dispatch(getAllLevel());
  }, [dispatch, activeTab]);

  useEffect(() => {
    if (activeTab == 'listeLevel') {
      setIdLevelToAddSubject(0);
    }
  }, [activeTab])



  return (

    <div className="space-y-6">
      {/* EN TETE  */}
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

      {/* ONGLETS */}
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
      {/* CONTENUE DES DEUX ONGLETS */}
      {activeTab === "listeLevel" && <LevelListe handleEdit={handleEdit} setActiveTab={setActiveTab} setIdLevelToAddSubject={setIdLevelToAddSubject} />}
      {activeTab === 'levelSbject' && <LevelSubject idLevelToAddSubject={idLevelToAddSubject} />}

      {/* MOADALE POUR FORMULAIRE AJOUT / MODIF */}
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


    </div>
  );
};

export default Levels;