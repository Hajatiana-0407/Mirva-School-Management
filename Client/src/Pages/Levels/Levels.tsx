import { useEffect, useState } from 'react';
import { BookOpenCheck, ListChecks, Plus } from 'lucide-react';
import Modal from '../Modal';
import { AppDispatch } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { levelType } from '../../Utils/Types';
import { getAppState } from '../../Redux/AppSlice';
import LevelSubject from './LevelSubject';
import LevelListe from './LevelListe';
import { useParams } from 'react-router-dom';
import Onglet from '../../Components/ui/Onglet';
import LevelForm from '../../Components/Forms/LevelForm';
import { getAllLevel } from './redux/LevelAsyncThunk';



const Levels = () => {
  const { active } = useParams();

  const dispatch: AppDispatch = useDispatch();

  const { hiddeTheModalActive } = useSelector(getAppState);
  const [activeTab, setActiveTab] = useState<number>(active !== undefined ? 2 : 1);
  const [showModal, setShowModal] = useState(false);
  const [editingLevel, setEditingLevel] = useState<levelType | null>(null);
  const [idLevelToAddSubject, setIdLevelToAddSubject] = useState<number>(0);


  // HANDLERS
  const handleEdit = (level: levelType) => {
    setEditingLevel(level);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingLevel(null);
  };


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
    if (activeTab == 2) {
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
      <Onglet
        onlgets={[
          {
            key: 'Listes des niveaux',
            component: <LevelListe handleEdit={handleEdit} setActiveTab={setActiveTab} setIdLevelToAddSubject={setIdLevelToAddSubject} />,
            Icon: ListChecks
          },
          {
            key: 'Niveau & Matiere',
            component: <LevelSubject idLevelToAddSubject={idLevelToAddSubject} />,
            Icon: BookOpenCheck
          },
        ]}
        active={activeTab || undefined}
        setActive={setActiveTab}
      />

      {/* MOADALE POUR FORMULAIRE AJOUT / MODIF */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingLevel ? 'Modifier le niveau' : 'Nouveau niveau'}
      >
        <LevelForm level={editingLevel} handleClose={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default Levels;