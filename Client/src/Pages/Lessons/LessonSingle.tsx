import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash, PenBox, Download, Share2, ArrowLeft } from 'lucide-react';
import { deleteLesson, publish } from './redux/LessonAsyncThunk';
import { AppDispatch } from '../../Redux/store';
import LessonForm from '../../Components/Forms/LessonForm';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import Profile from '../../Components/ui/Profile';
import Loading from '../../Components/ui/Loading';
import { baseUrl, download, hexToRgba } from '../../Utils/Utils';
import { RenderFilePreview } from '../../Components/RenderFilePreviews';
import DownloadProgression from '../../Components/DownloadProgression';
import { getLessonBySlug, getLessonSingleState } from './redux/LessonSlice';
import { getAppState } from '../../Redux/AppSlice';
import { useHashPermission } from '../../Hooks/useHashPermission';

const LessonSingle = () => {
    const { slug } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { data: lesson, action } = useSelector(getLessonSingleState);
    const { hiddeTheModalActive } = useSelector(getAppState);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const permission = useHashPermission(  { redirect : true  });


    // Progession pour le telechargement 
    const [showProgress, setShowProgress] = useState(false);
    const [progress, setProgress] = useState(0)
    const handleCloaseProgress = () => {
        setShowProgress(false);
    }




    const handleDelete = () => setShowConfirmDialog(true);
    const confirmDelete = async () => {
        if (lesson?.id_lecon) {
            await dispatch(deleteLesson(lesson.id_lecon));
            navigate('/back-office/lessons');
        }
    };

    const handleEdit = () => setShowModal(true);
    const handlePublish = async () => {
        if (lesson?.id_lecon) {
            await dispatch(publish(lesson.id_lecon));
        }
    };

    const handleDownload = async () => {
        if (lesson?.id_lecon) {
            setShowProgress(true);
            await download({
                title: lesson.titre,
                description: lesson.lecon_description,
                principalFileUrl: lesson.ficher_principale || "",
                supportFileUrl: lesson.fichier_support,
            }, (percent: number) => setProgress(percent))
        }
    }



    useEffect(() => {
        if (slug !== '') {
            dispatch(getLessonBySlug(slug as string))
        }
        return () => { }
    }, [dispatch, slug]);
    useEffect(() => {
        if (showModal && hiddeTheModalActive) {
            setShowModal(false)
        }
    }, [hiddeTheModalActive]);


    if (action.isLoading) return <Loading />;
    if (!lesson) return <div className="text-center py-10 text-gray-500">Leçon introuvable.</div>;

    return (
        <div className="space-y-4 md:space-y-6">
            <div className="flex items-center justify-between max-md:flex-wrap max-md:justify-center">
                <h1 className="text-2xl font-bold text-gray-900 w-96 truncate inline-block">
                    <ArrowLeft className="h-6 w-6 inline-block me-1 cursor-pointer" onClick={() => navigate(-1)} />
                    {lesson.titre}
                </h1>
                <div className="flex space-x-2">
                    <button
                        className="bg-green-600 text-white px-2 py-1 sm:px-4 sm:py-2 _classe gap-2 transition-colors rounded-lg hover:bg-green-700 flex items-center"
                        onClick={handleDownload}
                    >
                        <Download className="w-4 h-4 " />
                        <span className='hidden lg:inline-block'>
                            Télécharger
                        </span>
                    </button>
                    {permission.update &&
                        <button
                            className="bg-blue-600 text-white px-2 py-1 sm:px-4 sm:py-2 _classe gap-2 transition-colors rounded-lg hover:bg-blue-700 flex items-center"
                            onClick={handleEdit}
                        >
                            <PenBox className="w-4 h-4 " />
                            <span className='hidden lg:inline-block'>
                                Modifier
                            </span>
                        </button>
                    }
                    {permission.delete &&
                        <button
                            className="bg-red-600 text-white px-2 py-1 sm:px-4 sm:py-2 _classe gap-2 transition-colors rounded-lg hover:bg-red-700 flex items-center"
                            onClick={handleDelete}
                        >
                            <Trash className="w-4 h-4 " />
                            <span className='hidden lg:inline-block'>
                                Supprimer
                            </span>
                        </button>
                    }
                    { lesson.published == 0 &&
                        <button
                            className="bg-orange-600 text-white px-2 py-1 sm:px-4 sm:py-2 _classe gap-2 transition-colors rounded-lg hover:bg-orange-700 flex items-center"
                            onClick={handlePublish}
                        >
                            <Share2 className="w-4 h-4 " />
                            <span className='hidden lg:inline-block'>
                                Publier
                            </span>
                        </button>
                    }
                </div>
            </div>

            <div className="p-3 md:p-6 space-y-4 md:space-y-6 bg-gradient-to-b from-white to-gray-50 shadow-md border border-gray-200 rounded-2xl transition hover:shadow-lg duration-200">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center sm:justify-between gap-4 border-b-2 pb-4">
                    <div className="">
                        <Profile
                            fullName={lesson.nom ? `${lesson.nom} ${lesson.prenom}` : 'Administrateur'}
                            photo={lesson.photo as string}
                            copy={false}
                        />

                    </div>
                    <div className='flex items-center gap-3 '>
                        <div className="flex items-center gap-2 text-sm">
                            <span
                                className="px-3 py-1 rounded-full font-medium text-gray-800"
                                style={{
                                    backgroundColor: hexToRgba(lesson.couleur, 0.15),
                                    border: '1px solid ' + hexToRgba(lesson.couleur, 0.6),
                                }}
                            >
                                {lesson.denomination || 'Matière'}
                            </span>
                            {lesson.niveau && (
                                <span className="bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full text-gray-700 font-medium">
                                    {lesson.niveau}
                                </span>
                            )}
                        </div>
                        {lesson.created_at && (
                            <div className="text-xs text-gray-500 italic">
                                Ajouté le {new Date(lesson.created_at).toLocaleDateString('fr-FR')}
                            </div>
                        )}
                    </div>
                </div>
                {/* Titre */}
                <section className="space-y-2">
                    <h2 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-red-500 rounded-full"></span>
                        Titre
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {lesson.titre || 'Aucune titre.'}
                    </p>
                </section>
                {/* Description */}
                <section className="space-y-2">
                    <h2 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-blue-500 rounded-full"></span>
                        Description
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {lesson.lecon_description || 'Aucune description disponible.'}
                    </p>
                </section>

                {/* Fichier principal */}
                <section className="space-y-3">
                    <h2 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-green-500 rounded-full"></span>
                        Fichier principal
                    </h2>
                    <div className="rounded-xl overflow-hidden">
                        <RenderFilePreview url={baseUrl(lesson.ficher_principale)} />
                    </div>
                </section>

                {/* Fichier support (optionnel) */}
                {lesson.fichier_support && (
                    <section className="space-y-3">
                        <h2 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                            <span className="w-1.5 h-5 bg-amber-500 rounded-full"></span>
                            Fichier support
                        </h2>
                        <div className="rounded-xl overflow-hidden">
                            <RenderFilePreview url={baseUrl(lesson.fichier_support)} />
                        </div>
                    </section>
                )}
            </div>

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Modifier la leçon"
                size="lg"
            >
                <LessonForm lesson={lesson} handleCloseModal={() => setShowModal(false)} />
            </Modal>
            <ConfirmDialog
                isOpen={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onConfirm={confirmDelete}
                title="Supprimer la leçon"
                message={`Êtes-vous sûr de vouloir supprimer la leçon "${lesson.titre}" ?`}
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

export default LessonSingle;