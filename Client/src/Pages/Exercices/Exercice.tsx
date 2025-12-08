import { useEffect, useState } from 'react';
import { Plus, Trash, PenBox, Download, Eye, BellPlus, Share, Share2, BookOpen, GraduationCap } from 'lucide-react';
import Modal from '../Modal';
import { getAppState } from '../../Redux/AppSlice';
import { ExerciceType } from '../../Utils/Types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { getExerciceState } from './redux/ExerciceSlice';
import { deleteExercice, filterExercice, getAllExercices, publish } from './redux/ExerciceAsyncThunk';
import ActionMenu from '../../Components/ActionMenu';
import { baseUrl, download, hexToRgba } from '../../Utils/Utils';
import Profile from '../../Components/ui/Profile';
import ExerciceForm from '../../Components/Forms/ExerciceForm';
import { getFileIcon } from '../../Components/ui/VideoOrFileInput';
import ConfirmDialog from '../ConfirmDialog';
import Loading from '../../Components/ui/Loading';
import DownloadProgression from '../../Components/DownloadProgression';
import { Link } from 'react-router-dom';
import { useHashPermission } from '../../Hooks/useHashPermission';
import Title from '../../Components/ui/Title';
import { useActiveUser } from '../../Hooks/useActiveUser';
import Pagination from '../../Components/Pagination';
import { FilterAndSearchType } from '../../Components/FilterAndSearch';
import { getLevelState } from '../Levels/redux/LevelSlice';
import { getSubjectState } from '../Subjects/redux/SubjectSlice';
import { getAllSubject } from '../Subjects/redux/SubjectAsyncThunk';
import { getAllLevel } from '../Levels/redux/LevelAsyncThunk';



const Exercice = () => {
  const { hiddeTheModalActive } = useSelector(getAppState);
  const { datas: levels } = useSelector(getLevelState);
  const { datas: subjects } = useSelector(getSubjectState);
  const [showModal, setShowModal] = useState(false);
  const [editingExercice, setEditingExercice] = useState<ExerciceType | null>(null);
  const { datas, action, pagination } = useSelector(getExerciceState);
  const [exerciceToArchive, setexerciceToArchive] = useState<ExerciceType | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showProgress, setShowProgress] = useState(false)
  const dispatch: AppDispatch = useDispatch();
  const permission = useHashPermission({ redirect: true });
  const { isStudent } = useActiveUser();

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingExercice(null);
  };

  const handlEdit = (exercice: ExerciceType) => {
    setEditingExercice(exercice);
    setShowModal(true);
  }
  const handleDelete = (exercice: ExerciceType) => {
    setexerciceToArchive(exercice);
    setShowConfirmDialog(true);
  }
  const handleConfirmArchive = () => {
    dispatch(deleteExercice(exerciceToArchive?.id_exercice as number));
    setShowConfirmDialog(false);
  }

  const handlePublish = (exercice: ExerciceType) => {
    dispatch(publish(exercice.id_exercice as number))
  }

  const handleDownload = async (exercice: ExerciceType) => {
    setShowProgress(true);
    await download({
      title: exercice.titre,
      description: exercice.exercice_description,
      principalFileUrl: exercice.ficher_principale || "",
      supportFileUrl: exercice.fichier_support,
    }, (percent: number) => setProgress(percent))
  }
  const handleCloaseProgress = () => {
    setShowProgress(false);
  }

  useEffect(() => {
    if (showModal && hiddeTheModalActive) {
      handleCloseModal();
    }
  }, [hiddeTheModalActive]);

  useEffect(() => {
    if (datas.length == 0)
      dispatch(getAllExercices({}));
    if (subjects.length == 0)
      dispatch(getAllSubject({}));
    if (levels.length == 0)
      dispatch(getAllLevel({}));
  }, [dispatch])


  // Parametre pour le filtre dans le header 
  const filter: FilterAndSearchType = {
    pagination: pagination,
    thunk: getAllExercices,
    isAdvanced: true,
    filters: [
      { label: 'Date de debut', name: 'date_debut', type: 'date' },
      { label: 'Date de fin', name: 'date_fin', type: 'date' },
      { label: 'Niveau', name: 'niveau', type: 'select', options: levels.map(level => ({ label: level.niveau, value: level.id_niveau as number })) },
      { label: 'Matière', name: 'matiere', type: 'select', options: subjects.map(sugject => ({ label: sugject.denomination, value: sugject.id_matiere as number })) },
    ],
    filterThunk: filterExercice,
    isLoading: action.isFilterLoading
  }

  return (
    <div className="space-y-4 md:space-y-6">

      <Title
        title='Exercices'
        description='Gérez les exercices, les devoirs et les activités d’apprentissage.'
        fixed
        filter={filter}
      >
        {permission.create &&
          <button
            onClick={() => setShowModal(true)}
            disabled={isStudent}
            className="bg-primary-600 text-light px-2 py-1 sm:px-4 sm:py-2 _classe rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition-colors disabled:bg-primary-400"
          >
            <Plus className="w-4 h-4" />
            <span className='max-md:hidden-susp'>Nouvelle exercice</span>
          </button>
        }
      </Title>

      <Pagination
        pagination={pagination}
        thunk={getAllExercices}
        filterThunk={filterExercice}
      />

      <div>
        {datas.length === 0 && action.isLoading &&
          <div className='w-full border'>
            <Loading />
          </div>
        }
        {!action.isLoading && !datas.length && (
          <div className='text-secondary-400 text-md text-center pt-6'>
            Nous n’avons trouvé aucun élément.
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {datas.length > 0 && datas.map((exercice: ExerciceType, idx: number) => {
            const createdAt = exercice.created_at ? new Date(exercice.created_at) : null;
            const isNew = createdAt && (Date.now() - createdAt.getTime()) < 2 * 24 * 60 * 60 * 1000;

            // Détection du type de fichier
            const fileUrl = baseUrl(exercice.ficher_principale) || '';

            // Détection vidéo
            const isVideo = fileUrl.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i);
            // Détection image
            const isImage = fileUrl.match(/\.(jpg|jpeg|png|gif|webp|bmp)$/i);

            // Action 
            let actions = [
              {
                label: 'Supprimer',
                type: 'delete',
                color: 'text-red-500',
                onClick: () => handleDelete(exercice),
                icon: Trash
              },
              {
                label: 'Modifier',
                type: 'update',
                color: 'text-green-500',
                onClick: () => handlEdit(exercice),
                icon: PenBox
              },
              {
                label: 'Télécharger',
                color: 'text-primary-500',
                onClick: () => handleDownload(exercice),
                icon: Download
              },
            ]
            // Si la exercice n'est pas encore publlié 
            if (exercice.published == 0) {
              actions.push({
                label: 'Publié',
                type: '',
                color: 'text-orange-600',
                onClick: () => handlePublish(exercice),
                icon: Share
              })
            }
            return (
              <div key={`${exercice.id_exercice}_${idx}`} className="bg-light rounded-lg shadow p-4 border flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="px-3 py-1 flex items-center gap-1 relative rounded-full text-xs font-semibold border"
                    style={{ backgroundColor: hexToRgba(exercice.couleur, 0.3), border: '1px solid ' + hexToRgba(exercice.couleur, 0.8) }}
                  >
                    <BookOpen className='w-4 h-4' />
                    {exercice.denomination || 'Matière'}
                  </span>
                  <div className='flex items-center'>
                    <span className="bg-secondary-100  flex items-center gap-1 px-2 py-1 rounded-full text-xs text-secondary-900">
                      <GraduationCap className='w-4 h-4' />
                      {exercice.niveau || ''}

                    </span>
                    {isNew && (
                      <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-semibold text-green-500">
                        <BellPlus className='animate-bell-infinite' />
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center my-2">
                  <Profile fullName={exercice.nom ? `${exercice.nom} ${exercice.prenom}` : 'Administrateur'} photo={exercice.photo as string} copy={false} />
                </div>
                {/* Indication des nouveau cours */}
                <div className="flex items-center mb-1">
                  <h2 className="font-bold text-lg">{exercice.titre}</h2>
                </div>

                {/* Date d'ajout */}
                <span className="text-xs text-secondary-400 mb-2">
                  {createdAt ? `Ajouté le ${createdAt.toLocaleDateString()}` : ''}
                </span>

                {/* Aperçu vidéo ou icône fichier */}
                <div className="mb-4 flex justify-center items-center h-32 bg-secondary-50 rounded">
                  {isVideo ? (
                    <video src={fileUrl} controls className="rounded shadow h-32 max-w-full" />
                  ) :
                    isImage ?
                      <img src={fileUrl} alt="Image" className="rounded shadow h-28 max-w-full" />
                      :
                      (
                        getFileIcon(fileUrl, 28)
                      )}
                </div>

                {/* Description du leçcon */}
                <div className="max-w-full">
                  <p className="text-secondary-500 text-sm mb-4 line-clamp-3 text-justify">
                    {exercice.exercice_description}
                  </p>
                </div>

                {/* Boutons d'actions */}
                <div className="mt-auto flex items-center justify-between space-x-2">
                  <div>
                    <Link
                      to={`/back-office/exercices/${exercice.slug}`}
                      className="bg-primary-600 border border-primary-700 rounded-lg px-4 py-1 text-light hover:bg-primary-700 transition flex items-center">
                      <span className='max-md:hidden-susp'>Voir plus</span>
                      <Eye className=' ms-2' />
                    </Link>
                  </div>
                  <div className='space-x-2 flex '>
                    {exercice.published == 0 && !isStudent &&
                      <button
                        className="bg-orange-600 relative rounded-lg p-2 text-light hover:bg-orange-700 transition group"
                        title="Publié"
                        onClick={() => { handlePublish(exercice) }}
                      >
                        <Share2 className='w-5 h-5' />
                        <div className="hidden group-hover:block absolute z-20 left-full bottom-full mt-1 px-2 py-1 bg-orange-500 text-light rounded-full rounded-bl-none text-sm shadow">
                          Publié
                        </div>
                      </button>
                    }
                    <button
                      className="bg-green-600 relative rounded-lg p-2 text-light hover:bg-green-700 transition group"
                      title="Télécharger"
                      onClick={() => { handleDownload(exercice) }}
                    >
                      <Download className='w-5 h-5' />
                      <div className="hidden group-hover:block absolute z-20 left-full bottom-full mt-1 px-2 py-1 bg-green-500 text-light rounded-full rounded-bl-none text-sm shadow">
                        Télécharger
                      </div>
                    </button>
                    <ActionMenu actions={actions} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Pagination
        pagination={pagination}
        thunk={getAllExercices}
      />

      {/* Modal pour ajouter/modifier une année scolaire */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingExercice ? 'Modification' : 'Nouvelle exercice'}
        size='lg'
      >
        <ExerciceForm exercice={editingExercice as ExerciceType} handleCloseModal={handleCloseModal} />
      </Modal>

      {/* Dialog de confirmation */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmArchive}
        title="Supprimer les parent"
        message={`Êtes-vous sûr de vouloir supprimer l' exercice "${exerciceToArchive?.titre}"?`}
      />
      <DownloadProgression
        showProgress={showProgress}
        percent={progress}
        handleClose={handleCloaseProgress}
        Icon={Download}
        color='green'
      />
    </div>
  );
};

export default Exercice;