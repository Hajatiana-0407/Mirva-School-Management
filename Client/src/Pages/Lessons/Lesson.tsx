import { useEffect, useState } from 'react';
import { Plus, Trash, PenBox, Download, Eye, BellPlus, Share, Share2, BookOpen, GraduationCap } from 'lucide-react';
import Modal from '../Modal';
import { getAppState } from '../../Redux/AppSlice';
import { LessonType } from '../../Utils/Types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { getLessonState } from './redux/LessonSlice';
import { deleteLesson, getAllLessons, publish } from './redux/LessonAsyncThunk';
import ActionMenu from '../../Components/ActionMenu';
import { baseUrl, download, hexToRgba } from '../../Utils/Utils';
import Profile from '../../Components/ui/Profile';
import LessonForm from '../../Components/Forms/LessonForm';
import { getFileIcon } from '../../Components/ui/VideoOrFileInput';
import ConfirmDialog from '../ConfirmDialog';
import Loading from '../../Components/ui/Loading';
import DownloadProgression from '../../Components/DownloadProgression';
import { Link } from 'react-router-dom';
import { useHashPermission } from '../../Hooks/useHashPermission';
import Title from '../../Components/ui/Title';
import { useActiveUser } from '../../Hooks/useActiveUser';
import Pagination from '../../Components/Pagination';



const Lesson = () => {
  const { hiddeTheModalActive } = useSelector(getAppState);
  const [showModal, setShowModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState<LessonType | null>(null);
  const { datas, action, pagination } = useSelector(getLessonState);
  const [lessonToArchive, setlessonToArchive] = useState<LessonType | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showProgress, setShowProgress] = useState(false)
  const dispatch: AppDispatch = useDispatch();
  const permission = useHashPermission({ redirect: true });
  const { isStudent } = useActiveUser();

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingLesson(null);
  };

  const handlEdit = (lesson: LessonType) => {
    setEditingLesson(lesson);
    setShowModal(true);
  }
  const handleDelete = (lesson: LessonType) => {
    setlessonToArchive(lesson);
    setShowConfirmDialog(true);
  }
  const handleConfirmArchive = () => {
    dispatch(deleteLesson(lessonToArchive?.id_lecon as number));
    setShowConfirmDialog(false);
  }

  const handlePublish = (lesson: LessonType) => {
    dispatch(publish(lesson.id_lecon as number))
  }

  const handleDownload = async (lesson: LessonType) => {
    setShowProgress(true);
    await download({
      title: lesson.titre,
      description: lesson.lecon_description,
      principalFileUrl: lesson.ficher_principale || "",
      supportFileUrl: lesson.fichier_support,
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
      dispatch(getAllLessons({}));
  }, [dispatch])


  return (
    <div className="space-y-4 md:space-y-6">

      <Title
        title='Cours et leçons'
        description='Gérez les cours, les leçons et le contenu pédagogique.'
      >
        {permission.create &&
          <button
            onClick={() => setShowModal(true)}
            disabled={isStudent}
            className="bg-primary-600 text-light px-2 py-1 sm:px-4 sm:py-2 _classe rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition-colors disabled:bg-primary-400"
          >
            <Plus className="w-4 h-4" />
            <span className='max-md:hidden-susp'>Nouvelle leçon</span>
          </button>
        }
      </Title>


      <Pagination
        pagination={pagination}
        thunk={getAllLessons}
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
          {datas.length > 0 && datas.map((lesson: LessonType, idx: number) => {
            const createdAt = lesson.created_at ? new Date(lesson.created_at) : null;
            const isNew = createdAt && (Date.now() - createdAt.getTime()) < 2 * 24 * 60 * 60 * 1000;

            // Détection du type de fichier
            const fileUrl = baseUrl(lesson.ficher_principale) || '';

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
                onClick: () => handleDelete(lesson),
                icon: Trash
              },
              {
                label: 'Modifier',
                type: 'update',
                color: 'text-green-500',
                onClick: () => handlEdit(lesson),
                icon: PenBox
              },
              {
                label: 'Télécharger',
                color: 'text-primary-500',
                onClick: () => handleDownload(lesson),
                icon: Download
              },
            ]
            // Si la leçon n'est pas encore publlié 
            if (lesson.published == 0) {
              actions.push({
                label: 'Publié',
                type: '',
                color: 'text-orange-600',
                onClick: () => handlePublish(lesson),
                icon: Share
              })
            }
            return (
              <div key={`${lesson.id_lecon}_${idx}`} className="bg-light rounded-lg shadow p-4 border flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="px-3 py-1 flex items-center gap-1 relative rounded-full text-xs font-semibold border"
                    style={{ backgroundColor: hexToRgba(lesson.couleur, 0.3), border: '1px solid ' + hexToRgba(lesson.couleur, 0.8) }}
                  >
                    <BookOpen className='w-4 h-4' />
                    {lesson.denomination || 'Matière'}
                  </span>
                  <div className='flex items-center'>
                    <span className="bg-secondary-100  flex items-center gap-1 px-2 py-1 rounded-full text-xs text-secondary-900">
                      <GraduationCap className='w-4 h-4' />
                      {lesson.niveau || ''}

                    </span>
                    {isNew && (
                      <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-semibold text-green-500">
                        <BellPlus className='animate-bell-infinite' />
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center my-2">
                  <Profile fullName={lesson.nom ? `${lesson.nom} ${lesson.prenom}` : 'Administrateur'} photo={lesson.photo as string} copy={false} />
                </div>
                {/* Indication des nouveau cours */}
                <div className="flex items-center mb-1">
                  <h2 className="font-bold text-lg">{lesson.titre}</h2>
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
                    {lesson.lecon_description}
                  </p>
                </div>

                {/* Boutons d'actions */}
                <div className="mt-auto flex items-center justify-between space-x-2">
                  <div>
                    <Link
                      to={`/back-office/lessons/${lesson.slug}`}
                      className="bg-primary-600 border border-primary-700 rounded-lg px-4 py-1 text-light hover:bg-primary-700 transition flex items-center">
                      <span className='max-md:hidden-susp'>Voir plus</span>
                      <Eye className=' ms-2' />
                    </Link>
                  </div>
                  <div className='space-x-2 flex '>
                    {lesson.published == 0 && !isStudent &&
                      <button
                        className="bg-orange-600 relative rounded-lg p-2 text-light hover:bg-orange-700 transition group"
                        title="Publié"
                        onClick={() => { handlePublish(lesson) }}
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
                      onClick={() => { handleDownload(lesson) }}
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
        thunk={getAllLessons}
      />

      {/* Modal pour ajouter/modifier une année scolaire */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingLesson ? 'Modification' : 'Nouvelle leçon'}
        size='lg'
      >
        <LessonForm lesson={editingLesson as LessonType} handleCloseModal={handleCloseModal} />
      </Modal>

      {/* Dialog de confirmation */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmArchive}
        title="Supprimer les parent"
        message={`Êtes-vous sûr de vouloir supprimer la leçon "${lessonToArchive?.titre}"?`}
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

export default Lesson;