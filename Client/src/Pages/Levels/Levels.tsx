import { useEffect, useState } from 'react';
import { BookOpenCheck, ListChecks, Plus } from 'lucide-react';
import Modal from '../Modal';
import { useDispatch, useSelector } from 'react-redux';
import { levelType } from '../../Utils/Types';
import { getAppState } from '../../Redux/AppSlice';
import LevelSubject from './LevelSubject';
import LevelListe from './LevelListe';
import Onglet from '../../Components/ui/Onglet';
import LevelForm from '../../Components/Forms/LevelForm';
import { useHashPermission } from '../../Hooks/useHashPermission';
import { AppDispatch } from '../../Redux/store';
import { getAllLevel } from './redux/LevelAsyncThunk';
import Title from '../../Components/ui/Title';
import { useActiveUser } from '../../Hooks/useActiveUser';



const Levels = () => {
  const permission = useHashPermission();
  const { hiddeTheModalActive } = useSelector(getAppState);
  const [showModal, setShowModal] = useState(false);
  const [editingLevel, setEditingLevel] = useState<levelType | null>(null);
  const [idLevelToAddSubject, setIdLevelToAddSubject] = useState<number>(0);
  const dispatch: AppDispatch = useDispatch();
  const { isStudent} = useActiveUser() ; 

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
  }, [dispatch]);
  return (

    <div className="space-y-6">
      {/* EN TETE  */}
      <Title
        title='Gestion des niveaux'
        description='Gérer les différents niveaux et leurs paramètres.'
      >
        {permission.create &&
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            disabled={ isStudent }
          >
            <Plus className="w-4 h-4" />
            <span>Nouveau niveau</span>
          </button>
        }
      </Title>

      {/* ONGLETS */}
      <Onglet
        type='delete'
        onlgets={[
          {
            key: 'list-level',
            label: 'Listes des niveaux',
            component: <LevelListe handleEdit={handleEdit} setIdLevelToAddSubject={setIdLevelToAddSubject} />,
            Icon: ListChecks
          },
          {
            key: 'subject-level-coef',
            label: 'Niveau & Matiere',
            component: <LevelSubject idLevelToAddSubject={idLevelToAddSubject} />,
            Icon: BookOpenCheck
          },
        ]}
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