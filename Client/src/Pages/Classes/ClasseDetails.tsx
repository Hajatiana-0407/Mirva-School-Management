import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Users, Layers, PenBox } from 'lucide-react';
import HeadingSmall from '../../Components/ui/HeadingSmall';
import { AppDispatch } from '../../Redux/store';
// import { getClasseById, getClasseSubjectsById } from '../../Store/Classes/classeActions'; 
import { ClasseType, SubjectType, StudentType } from '../../Utils/Types';
import Loading from '../../Components/ui/Loading';
import { getClasseState } from './redux/ClasseSlice';
import Title from '../../Components/ui/Title';
import Profile from '../../Components/ui/Profile';
import { useHashPermission } from '../../Hooks/useHashPermission';
import Modal from '../Modal';
import ClasseForm from '../../Components/Forms/ClasseForm';
import { getAppState } from '../../Redux/AppSlice';
import { getAllClasse } from './redux/ClasseAsyncThunk';

const ClasseDetails: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const dispatch: AppDispatch = useDispatch();
    const permission = useHashPermission({ id: 'classes' });
    const [showModal, setShowModal] = useState(false);
    const { hiddeTheModalActive } = useSelector(getAppState)
    const [classe, setClasse] = useState<ClasseType | null>(null)

    // selector existant (adapter si votre selector s'appelle différemment)
    const { datas, action } = useSelector(getClasseState);

    // trouvons la classe ciblée dans le store
    useEffect(() => {
        if (!!datas) {
            const classe: ClasseType | undefined =
                datas?.find((c: ClasseType) => String(c.id_classe) === String(id));
            setClasse(classe as ClasseType);
        }

        return () => { }
    }, [datas])
    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (!id) return;
        // dispatch pour récupérer la classe si absente
        if (!classe) {
            dispatch(getAllClasse({}));
        }
    }, [id, dispatch]);

    // Modale 
    useEffect(() => {
        if (showModal && hiddeTheModalActive) {
            handleCloseModal();
        }
    }, [hiddeTheModalActive]);


    if (action?.isLoading || (!classe && action?.isLoading !== false)) {
        return (
            <div className="p-3 md:p-6">
                <Loading />
            </div>
        );
    }

    if (!classe) {
        return (
            <div className="p-3 md:p-6">
                <div className="text-center text-secondary-500">Classe introuvable.</div>
            </div>
        );
    }

    const subjects: SubjectType[] = classe.matiere?.listes || [];
    const students: StudentType[] = classe.eleve?.listes || [];

    return (
        <div className="space-y-4 md:space-y-6">
            <Title
                title={`Classe : "${classe.denomination}"`}
                description={`Classe "${classe.denomination}" dans le niveau ${classe.niveau}`}
            >
                {permission.update &&
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-primary-600 text-light px-2 py-1 sm:px-4 sm:py-2 _classe rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition-colors w-max"
                    >
                        <PenBox className="w-4 h-4" />
                        <span className='max-md:hidden-susp'>Modifier</span>
                    </button>
                }
            </Title>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="col-span-2 bg-light border rounded-lg p-4 shadow-sm">
                    <HeadingSmall title="Description" />
                    {/* <p className="text-sm text-secondary-600 mb-4">{classe.description || "Aucune description fournie."}</p> */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="bg-secondary-50 border rounded-lg p-3 text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Layers className="w-5 h-5 text-secondary-600" />
                            </div>
                            <div className="text-sm font-semibold">{subjects.length}</div>
                            <div className="text-xs text-secondary-500">Matières</div>
                        </div>

                        <div className="bg-secondary-50 border rounded-lg p-3 text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Users className="w-5 h-5 text-secondary-600" />
                            </div>
                            <div className="text-sm font-semibold">{students.length}</div>
                            <div className="text-xs text-secondary-500">Élèves</div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <HeadingSmall title="Matières" />
                        {subjects.length === 0 ? (
                            <div className="text-sm text-secondary-500">Aucune matière pour cette classe.</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                                {subjects.map((s) => (
                                    <div key={s.id_matiere} className="flex items-center space-x-3 bg-light border rounded-lg p-3">
                                        <div className={`w-3 h-3 rounded-full`} style={{ background: s.couleur || "#CBD5E1" }} />
                                        <div>
                                            <div className="font-medium text-sm">{s.denomination}</div>
                                            <div className="text-xs text-secondary-500">{s.abbreviation}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-6">
                        <HeadingSmall title="Élèves inscrits" />
                        {students.length === 0 ? (
                            <div className="text-sm text-secondary-500">Aucun élève inscrit dans cette classe.</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                                {students.map((student) => (
                                    <div key={student.id_eleve} className="bg-light border rounded-lg p-3 flex items-center justify-between">
                                        <Profile
                                            key={student.matricule_etudiant}
                                            fullName={`${student.nom} ${student.prenom}`}
                                            photo={student.photo as string}
                                            copy={false}
                                            identification={student.matricule_etudiant}
                                            link={`/back-office/students/${student.matricule_etudiant}`}
                                        />
                                        <div className="text-xs text-secondary-500"></div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <aside className="bg-light border rounded-lg p-4 shadow-sm">
                    <HeadingSmall title="Informations" />
                    <div className="text-sm text-secondary-700 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-secondary-500">Classe</div>
                            <div className="font-medium">{classe.denomination}</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-secondary-500">Niveau</div>
                            <div className="font-medium">{classe.niveau}</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-secondary-500">Créé le</div>
                            <div className="text-xs text-secondary-500">{classe?.created_at ? new Date(classe.created_at).toLocaleDateString() : "-"}</div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <HeadingSmall title="Professeurs associés" />
                        {/* si vous possédez une liste de profs liée au niveau, afficher ici */}

                        {classe?.prof?.listes && classe?.prof?.listes.length > 0 ?
                            <div className="py-3 space-y-4">
                                {classe?.prof?.listes.map((teacher) => (
                                    <Profile
                                        key={teacher.matricule_personnel}
                                        fullName={`${teacher.nom} ${teacher.prenom}`}
                                        photo={teacher.photo as string}
                                        copy={false}
                                        identification={teacher.matricule_personnel}
                                        link={`/back-office/employees/${teacher.matricule_personnel}`}
                                    />
                                ))}
                            </div>
                            : <div className="text-sm text-secondary-500">Aucun professeur associé affiché.</div>
                        }

                    </div>
                </aside>
                {/* Modal pour ajouter/modifier une classe */}
                <Modal
                    isOpen={showModal}
                    onClose={handleCloseModal}
                    title={'Modifier la classe'}
                >
                    <ClasseForm handleClose={handleCloseModal} classe={classe} />
                </Modal>
            </div>
        </div>
    );
};

export default ClasseDetails;