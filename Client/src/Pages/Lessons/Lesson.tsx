import { useEffect, useState } from 'react';
import { Plus, Search, Filter, Trash, PenBox, Download, Eye, BellPlus } from 'lucide-react';
import Modal from '../Modal';
import { getAppState } from '../../Redux/AppSlice';
import { LessonType } from '../../Utils/Types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { getLessonState } from './redux/LessonSlice';
import { getAllLessons } from './redux/LessonAsyncThunk';
import ActionMenu from '../../Components/ActionMenu';
import { baseUrl, hexToRgba } from '../../Utils/Utils';
import Profile from '../../Components/ui/Profile';
import LessonForm from '../../Components/Forms/LessonForm';
import { getFileIcon } from '../../Components/ui/VideoOrFileInput';



const Lesson = () => {
  const { hiddeTheModalActive } = useSelector(getAppState);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState<LessonType | null>(null);
  const { datas } = useSelector(getLessonState);
  const dispatch: AppDispatch = useDispatch();

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingLesson(null);
  };

  const handlEdit = (lesson: LessonType) => {
    setEditingLesson(lesson);
    setShowModal(true);
  }

  useEffect(() => {
    if (showModal && hiddeTheModalActive) {
      handleCloseModal();
    }
  }, [hiddeTheModalActive]);

  useEffect(() => {
    if (!datas.length) {
      dispatch(getAllLessons());
    }
  }, [dispatch])


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Cours et leçons disponibles</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle leçon</span>
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

        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {datas.map((lesson: LessonType, idx: number) => {
              const createdAt = lesson.created_at ? new Date(lesson.created_at) : null;
              const isNew = createdAt && (Date.now() - createdAt.getTime()) < 2 * 24 * 60 * 60 * 1000;

              // Détection du type de fichier
              const fileUrl = baseUrl(lesson.ficher_principale) || '';

              // Détection vidéo
              const isVideo = fileUrl.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i);
              // Détection image
              const isImage = fileUrl.match(/\.(jpg|jpeg|png|gif|webp|bmp)$/i);

              return (
                <div key={`${lesson.id_lecon}_${idx}`} className="bg-white rounded-lg shadow p-4 border flex flex-col">

                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold border"
                      style={{ backgroundColor: hexToRgba(lesson.couleur, 0.3), border: '1px solid ' + hexToRgba(lesson.couleur, 0.8) }}
                    >
                      {lesson.denomination || 'Matière'}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-500">{lesson.niveau || ''}</span>
                  </div>
                  <div className="flex items-center my-2">
                    <Profile fullName={lesson.nom ? `${lesson.nom} ${lesson.prenom}` : 'Administrateur'} photo={lesson.photo as string} copy={false} />
                  </div>

                  {/* Indication des nouveau cours */}
                  <div className="flex items-center mb-1">
                    <h2 className="font-bold text-lg">{lesson.titre}</h2>
                    {isNew && (
                      <span className="ml-auto bg-green-500 px-2 py-0.5 rounded-full text-xs font-semibold text-white">
                        <BellPlus />
                      </span>
                    )}
                  </div>

                  {/* Date d'ajout */}
                  <span className="text-xs text-gray-400 mb-2">
                    {createdAt ? `Ajouté le ${createdAt.toLocaleDateString()}` : ''}
                  </span>

                  {/* Aperçu vidéo ou icône fichier */}
                  <div className="mb-4 flex justify-center items-center h-32 bg-gray-50 rounded">
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
                    <p className="text-gray-500 text-sm mb-4 line-clamp-3 text-justify">
                      {lesson.lecon_description}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between space-x-2">
                    <div>
                      <button className="bg-blue-600 border border-blue-700 rounded-lg px-4 py-1 text-white hover:bg-blue-700 transition flex items-center">
                        Voir plus
                        <Eye className=' ms-2' />
                      </button>
                    </div>
                    <div className='space-x-2'>
                      <button className="bg-gray-100 border border-gray-300 rounded-lg px-2 py-2 text-gray-700 hover:bg-gray-200 transition" title="Télécharger">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                      </button>
                      <ActionMenu actions={[
                        {
                          label: 'Supprimer',
                          color: 'text-red-500',
                          onClick: () => { },
                          icon: Trash
                        },
                        {
                          label: 'Modifier',
                          color: 'text-green-500',
                          onClick: () => handlEdit(lesson),
                          icon: PenBox
                        },
                        {
                          label: 'Télécharger',
                          color: 'text-blue-500',
                          onClick: () => { },
                          icon: Download
                        },
                      ]} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <div className="bg-white border rounded-lg px-6 py-2 text-center text-gray-700 font-mono">pagination</div>
          </div>
        </div>
      </div>

      {/* Modal pour ajouter/modifier une année scolaire */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingLesson ? 'Modification' : 'Nouvelle leçon'}
        size='lg'
      >
        <LessonForm lesson={editingLesson as LessonType} />
      </Modal>
    </div>
  );
};

export default Lesson;