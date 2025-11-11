import { ArrowDown, ArrowRight, BookOpen, GraduationCap, Plus, Save } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getLevelState } from "./redux/LevelSlice";
import { LevelSubjectType, levelType, SubjectType } from "../../Utils/Types";
import { getSubjectState } from "../Subjects/redux/SubjectSlice";
import { getAllLevel, getLelvelSubjectByIdNiveau, registerSubjectLevelCoef } from "./redux/LevelAsyncThunk";
import { AppDispatch } from "../../Redux/store";
import { getLevelSubjectState } from "./redux/LevelSubjectSlice";
import Loading from "../../Components/ui/Loading";
import { hexToRgba } from "../../Utils/Utils";
import { getAllSubject } from "../Subjects/redux/SubjectAsyncThunk";
import SubjectComponent from "./SubjectComponent";
import useForm from "../../Hooks/useForm";
import { object } from "yup";
import AlertDialog from "../../Components/ui/AlertDialog";
import { useHashPermission } from "../../Hooks/useHashPermission";
import HeadingSmall from "../../Components/ui/HeadingSmall";
import Modal from "../Modal";
import SubjectForm from "../../Components/Forms/SubjectForm";
import { getAppState } from "../../Redux/AppSlice";

const LevelSubjectSchema = object({})
const LevelSubject = ({ idLevelToAddSubject }: { idLevelToAddSubject: number }) => {
    const [idActiveLevel, setIdActiveLevel] = useState<any>(0);
    const { datas: levels } = useSelector(getLevelState);
    const { datas: subjects } = useSelector(getSubjectState);
    const [levelActive, setLevelActive] = useState<levelType | null>(null)
    const { datas: levelSubjects, action: levelSubjectAction } = useSelector(getLevelSubjectState);
    const [subjectSave, setSubjectSave] = useState<number[]>([]);
    const dispatch: AppDispatch = useDispatch();
    // Matiere ajouter 
    const [allSubjectCoefAdded, setAllSubjectCoefAdded] = useState<SubjectType[]>([]);
    const [idAllSubjectCoefAdded, setIdAllSubjectCoefAdded] = useState<number[]>([]);
    // Matiere a supprimer 
    const [subjectCoefToDelete, setSubjectCoefToDelete] = useState<number[]>([]);
    const { onSubmite } = useForm<any>(LevelSubjectSchema, {});
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const permission = useHashPermission({ redirect: true });
    const permissionSubject = useHashPermission({ id: 'subjects' });
    const [showModalSubject, setShowModalSubject] = useState(false)
    const { hiddeTheModalActive } = useSelector(getAppState);


    // ? Modal d'ajout de nouveaux sujet 
    const handleCloseModalSubject = () => {
        setShowModalSubject(false);
    }

    useEffect(() => {
        const allLevelActiveSubject = [];

        if (idActiveLevel === 0) {
            setSubjectSave([]);
        } else {
            for (let i = 0; i < levelSubjects.length; i++) {
                const element = levelSubjects[i];
                allLevelActiveSubject.push(element.matiere_id_matiere);
            }
            setSubjectSave(allLevelActiveSubject);
            setAllSubjectCoefAdded([]);
            setSubjectCoefToDelete([]);
        }
        return () => {
            setSubjectSave([]);
        }
    }, [levelSubjects, idActiveLevel]);

    useEffect(() => {
        dispatch(getAllSubject());
    }, [dispatch])

    useEffect(() => {
        if (idActiveLevel) {
            levels.map((level: levelType) => {
                if (level.id_niveau == idActiveLevel) {
                    setLevelActive(level);
                }
            })
        }
    }, [levels, idActiveLevel]);




    // Liste des id matiere ajouter 
    useEffect(() => {
        let idSubjectListe = [];
        for (let i = 0; i < allSubjectCoefAdded.length; i++) {
            const subject = allSubjectCoefAdded[i];
            idSubjectListe.push(subject.id_matiere as number)
        }
        setIdAllSubjectCoefAdded(idSubjectListe);
    }, [allSubjectCoefAdded])

    // 
    useEffect(() => {
        if (idActiveLevel && !levelSubjectAction.isUpdating) {
            dispatch(getLelvelSubjectByIdNiveau(idActiveLevel));
        }
    }, [levelSubjectAction.isUpdating])

    // EFFET POUR LE AJOUT VENANT DE LA LISTE DE NIVEAU
    useEffect(() => {
        if (idLevelToAddSubject && idLevelToAddSubject !== 0) {
            setIdActiveLevel(idLevelToAddSubject);
            dispatch(getLelvelSubjectByIdNiveau(idLevelToAddSubject));
        }
    }, [idLevelToAddSubject])




    // HANDLERS 
    const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id_level = parseInt(e.target.value, 10);
        setIdActiveLevel(id_level);
        dispatch(getLelvelSubjectByIdNiveau(id_level));
    }

    /**
     * Suppression du matiere dans la liste ( coef )
     * @param idSubject 
     */
    const handleDelete = (idSubjectToDelete: number) => {
        // Suppression si dans la liste d'ajout
        const addListe = allSubjectCoefAdded.filter((subject: SubjectType) => subject.id_matiere != idSubjectToDelete);
        setAllSubjectCoefAdded(addListe);

        // Suppression si dans la liste a modifier ( verification direct dans l'affichage par boocle )
        // Ajout dans la liste a supprimer 
        setSubjectCoefToDelete([
            idSubjectToDelete,
            ...subjectCoefToDelete
        ])
    }

    /**
     * Ajoute matiere coefficient 
     * @param subject 
     */
    const handleAddSubjectInLevel = (subject: SubjectType) => {
        if (idActiveLevel != 0) {
            setAllSubjectCoefAdded([
                subject,
                ...allSubjectCoefAdded
            ]);

            // Verification si la matière est dans la liste a supprimer 
            const testeIdToDeleteListe = subjectCoefToDelete.filter((id: number) => subject.id_matiere as number != id)
            setSubjectCoefToDelete(testeIdToDeleteListe);
        } else {
            setIsAlertOpen(true);
        }
    }

    /**
     * Enregistrement
     * @param e 
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData: any) => {
            dispatch(registerSubjectLevelCoef(validateData));
        }, e);
    }

    useEffect(() => {
        dispatch(getAllLevel());
    }, [dispatch]);

    // Modal
    useEffect(() => {
        if (showModalSubject && hiddeTheModalActive) {
            handleCloseModalSubject();
        }
    }, [hiddeTheModalActive]);

    return (
        <div className="space-y-4 md:space-y-6">
            <div className="flex">
                <button
                    className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 "
                    type="button"
                >
                    <GraduationCap />
                </button>
                <label className="sr-only">Choisissez un niveau</label>
                <select
                    value={idActiveLevel}
                    onChange={handleLevelChange}
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                    <option value={0} >Choisissez un niveau</option>
                    {levels.map((value: levelType, key: number) => (
                        <option key={key} value={value.id_niveau} >{value.niveau} </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                {/* LISTE DES MATIERE A AJOUTER  */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg border">
                        <div className="p-4 flex justify-between items-center">
                            <HeadingSmall title="Matières disponible." />
                            {permissionSubject.create &&
                                <button
                                    type="submit"
                                    onClick={() => setShowModalSubject(true)}
                                    className="bg-blue-600 text-white px-2 py-1 sm:px-4 smpy-2 _classe rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            }
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                            {subjects.map((subject: SubjectType, key: number) => {
                                if (
                                    !levelSubjects.some((value) => (value.matiere_id_matiere === subject.id_matiere) //* Si le matiere a deja une une coefficient dans  la base  */
                                        && !subjectCoefToDelete.includes(subject.id_matiere)) && !idAllSubjectCoefAdded.includes(subject.id_matiere as number) // si la matiere a ete supprimer de la liste 
                                ) {
                                    return <div key={key} className={`w-full p-4 border-b flex justify-between  hover:bg-gray-50`}
                                        style={{ backgroundColor: hexToRgba(subject.couleur, 0.4) }}
                                    >
                                        <span>{subject.denomination}</span>
                                        <button
                                            onClick={() => { handleAddSubjectInLevel(subject) }}
                                            className="bg-green-600 text-white px-2 py-1 sm:px-4 smpy-2 _classe rounded-lg flex items-center justify-center space-x-2 hover:bg-green-700 transition-colors"
                                        >
                                            <ArrowDown className="m-0 h-5 w-5 hidden max-lg:block" />
                                            <ArrowRight className="m-0 h-5 w-5 hidden lg:block" />
                                        </button>
                                    </div>
                                } else {
                                    return ''
                                }
                            })}
                        </div>
                    </div>
                </div>

                {/* LISTING MATIERE ET COEFFICIENT ( UPDATE , ADD , DELETE ) */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-sm border">
                        <div className="px-2 lg:px-12 py-5 text-center">
                            {levelSubjectAction.isLoading &&
                                <Loading />
                            }
                            {!levelSubjectAction.isLoading && (subjectSave.length == 0 && allSubjectCoefAdded.length === 0) &&
                                <>
                                    <div className="w-16 text-gray-500 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                        <BookOpen className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500">Cliquer sur une matière pour l’ajouter</p>
                                </>
                            }
                            {!levelSubjectAction.isLoading && (subjectSave.length > 0 || allSubjectCoefAdded.length > 0) &&
                                <form onSubmit={handleSubmit}>
                                    <div className="text-xl mb-5 pb-2 text-black border-b flex justify-between items-center">
                                        <HeadingSmall
                                            title={levelActive?.niveau as string}
                                        />
                                    </div>
                                    <div className="space-y-2 ">
                                        <div className="w-100 h-10  border-b grid grid-cols-3 uppercase font-semibold text-gray-800">
                                            <div className="col-span-1 flex  items-center justify-center" >
                                                Matière
                                            </div>
                                            <div className="col-span-2">
                                                Coefficient
                                            </div>
                                        </div>
                                        <div className="space-y-2 max-h-80 overflow-y-auto">
                                            <input type="text" className="sr-only" name="deletes" value={subjectCoefToDelete.join(',')} onChange={() => { }} />
                                            <input type="text" className="sr-only" name="id_niveau" value={idActiveLevel} onChange={() => { }} />
                                            {/* Matiere | Niveau | Coefficient -> Ajouter */}
                                            {allSubjectCoefAdded.map((subject: SubjectType) => {
                                                if (levelSubjects.some((levelSubject: LevelSubjectType) => levelSubject.matiere_id_matiere == subject.id_matiere)) {
                                                    return '';
                                                }
                                                return <SubjectComponent key={`add-${subject.id_matiere}`} subject={subject} nameKey={`add[${subject.id_matiere}]`} onDelete={handleDelete} type="addition" />
                                            }
                                            )}

                                            {/* Matiere | Niveau | Coefficient -> Modifier */}
                                            {subjects.slice().reverse().map((subject: SubjectType) => {
                                                const levelSubject = levelSubjects.find((value) => value.matiere_id_matiere === subject.id_matiere)
                                                if (levelSubject && !subjectCoefToDelete.includes(levelSubject.matiere_id_matiere as number)) {
                                                    return <SubjectComponent key={`update-${subject.id_matiere}`} subject={subject} levelSubject={levelSubject} nameKey={`update[${subject.id_matiere}]`} onDelete={handleDelete} type="update" />
                                                }
                                                return '';
                                            })}
                                        </div>
                                        <div className="flex justify-end pt-4">
                                            {permission.create &&
                                                <button
                                                    type="submit"
                                                    className="bg-blue-600 text-white px-2 py-1 sm:px-4 smpy-2 _classe rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
                                                >
                                                    {levelSubjectAction.isUpdating ?
                                                        <div className="w-4 h-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        :
                                                        <Save className="w-4 h-4" />
                                                    }
                                                    <span>Enregistrer</span>
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </form>
                            }
                        </div>
                    </div>
                </div>


                {/* Alert Modal */}
                <AlertDialog
                    isOpen={isAlertOpen}
                    message="Vous devez sélectionner un niveau"
                    title="Aucun niveau n'a été sélectionné"
                    onClose={() => setIsAlertOpen(false)}
                />

                {/* Modal pour l'ajout des nouveaux sujets */}
                <Modal
                    isOpen={showModalSubject}
                    onClose={handleCloseModalSubject}
                    title={'Nouvelle matière'}
                >
                    <SubjectForm handleClose={handleCloseModalSubject} />
                </Modal>
            </div>
        </div>
    )
}



export default LevelSubject