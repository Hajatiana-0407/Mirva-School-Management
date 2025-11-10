import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Users, BookOpen, Layers, PenBox, Eye } from "lucide-react";
import HeadingSmall from "../../Components/ui/HeadingSmall";
// import { getLevelById, getLevelSubjectsById } from "../../Store/Levels/levelActions"; // ajuster selon vos actions
import { levelType, ClasseType, SubjectType } from "../../Utils/Types";
import Loading from "../../Components/ui/Loading";
import { AppDispatch } from "../../Redux/store";
import Title from "../../Components/ui/Title";
import { useHashPermission } from "../../Hooks/useHashPermission";
import Modal from "../Modal";
import LevelForm from "../../Components/Forms/LevelForm";
import { useActiveUser } from "../../Hooks/useActiveUser";
import Profile from "../../Components/ui/Profile";
import { getAppState } from "../../Redux/AppSlice";
import { getAllLevel } from "./redux/LevelAsyncThunk";

const LevelDetails: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const dispatch: AppDispatch = useDispatch();
    const permission = useHashPermission({ id: 'levels' });
    const [showModalLevel, setShowModalLevel] = useState(false)
    const { isStudent } = useActiveUser();
    const { hiddeTheModalActive } = useSelector(getAppState)
    const [level, setLevel] = useState<levelType | null>(null)

    // selector existant (adapter si votre selector s'appelle différemment)
    const levelState = useSelector((state: any) => state.levels ?? {});
    const { datas = [], action = {} } = levelState;

    // trouvons le niveau ciblé dans le store
    useEffect(() => {
        if (!!datas) {
            const level: levelType | undefined =
                datas?.find((l: levelType) => String(l.id_niveau) === String(id)) || datas?.selected;
            setLevel(level as levelType);
        }

        return () => { }
    }, [datas])


    // HANDLERS

    const handleCloseModalLevel = () => {
        setShowModalLevel(false);
    }

    useEffect(() => {
        if (!id) return;
        // dispatch pour récupérer le niveau si absent
        if (!level) {
            dispatch(getAllLevel());
        }
    }, [id, dispatch]);

    // Modale
    useEffect(() => {
        if (showModalLevel && hiddeTheModalActive) {
            handleCloseModalLevel();
        }
    }, [hiddeTheModalActive]);

    if (action?.isLoading || (!level && action?.isLoading !== false)) {
        return (
            <div className="p-6">
                <Loading />
            </div>
        );
    }

    if (!level) {
        return (
            <div className="p-6">
                <div className="text-center text-gray-500">Niveau introuvable.</div>
            </div>
        );
    }

    const classes: ClasseType[] = level.classe?.listes || [];
    const subjects: SubjectType[] = (level.matiere as any)?.listes || [];

    return (
        <div className="space-y-6">

            <Title
                title={`Niveau : "${level.niveau}"`}
                description={level.description}
            >
                {permission.create &&
                    <button
                        onClick={() => {
                            setShowModalLevel(true);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                        disabled={isStudent}
                    >
                        <PenBox className="w-4 h-4" />
                        <span>Modifier</span>
                    </button>
                }
            </Title>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-2 bg-white border rounded-lg p-4 shadow-sm">
                    <HeadingSmall title="Description" />
                    <p className="text-sm text-gray-600 mb-4">{level.description || "Aucune description fournie."}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="bg-gray-50 border rounded-lg p-3 text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Layers className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="text-md font-semibold">{classes.length}</div>
                            <div className="text-md text-gray-500">Classes</div>
                        </div>

                        <div className="bg-gray-50 border rounded-lg p-3 text-center">
                            <div className="flex items-center justify-center mb-2">
                                <BookOpen className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="text-md font-semibold">{subjects.length}</div>
                            <div className="text-md text-gray-500">Matières</div>
                        </div>

                        <div className="bg-gray-50 border rounded-lg p-3 text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Users className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="text-md font-semibold">{level?.prof?.listes ? level?.prof?.listes.length : '0'}</div>
                            <div className="text-md text-gray-500">Professeurs</div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <HeadingSmall title="Matières" />
                        {subjects.length === 0 ? (
                            <div className="text-sm text-gray-500">Aucune matière pour ce niveau.</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                                {subjects.map((s) => (
                                    <div key={s.id_matiere} className="flex items-center space-x-3 bg-white border rounded-lg p-3">
                                        <div className={`w-3 h-3 rounded-full`} style={{ background: s.couleur || "#CBD5E1" }} />
                                        <div>
                                            <div className="font-medium text-sm">{s.denomination}</div>
                                            <div className="text-xs text-gray-500">{s.abbreviation}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-6">
                        <HeadingSmall title="Classes" />
                        {classes.length === 0 ? (
                            <div className="text-sm text-gray-500">Aucune classe pour ce niveau.</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                                {classes.map((c) => (
                                    <Link
                                        to={`/classes/${c.id_classe}`}
                                        key={c.id_classe}
                                        className="bg-white border rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 transition-all duration-150"
                                    >
                                        <div>
                                            <div className="font-medium">{c.denomination}</div>
                                            <div className="text-xs text-gray-500">ID: {c.id_classe}</div>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            <Eye className="w-5 h-5 text-blue-500" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <aside className="bg-white border rounded-lg p-4 shadow-sm">
                    <HeadingSmall title="Informations" />
                    <div className="text-sm text-gray-700 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-500">Niveau</div>
                            <div className="font-medium">{level.niveau}</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-500">Cycle</div>
                            <div className="font-medium">{level.cycle}</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-500">Créé le</div>
                            <div className="text-xs text-gray-500">{level?.created_at ? new Date(level.created_at).toLocaleDateString() : "-"}</div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <HeadingSmall title="Professeurs associés" />
                        {/* si vous possédez une liste de profs liée au niveau, afficher ici */}

                        {level?.prof?.listes && level?.prof?.listes.length > 0 ?
                            <div className="py-3 space-y-4">
                                {level?.prof?.listes.map((teacher) => (
                                    <Profile
                                        key={teacher.matricule_personnel}
                                        fullName={`${teacher.nom} ${teacher.prenom}`}
                                        photo={teacher.photo as string}
                                        copy={false}
                                        identification={teacher.matricule_personnel}
                                        link={`/employees/${teacher.matricule_personnel}`}
                                    />
                                ))}
                            </div>
                            : <div className="text-sm text-gray-500">Aucun professeur associé affiché.</div>
                        }

                    </div>
                </aside>
            </div>

            {/* MOADALE POUR FORMULAIRE AJOUT / MODIF */}
            <Modal
                isOpen={showModalLevel}
                onClose={handleCloseModalLevel}
                title={'Modifier le niveau'}
            >
                <LevelForm level={level} handleClose={handleCloseModalLevel} />
            </Modal>
        </div>
    );
};

export default LevelDetails;