import { BookOpen, GraduationCap, Plus, Save } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getLevelState } from "./redux/LevelSlice";
import { LevelSubjectType, levelType, SubjectType } from "../../Utils/Types";
import { getSubjectState } from "../Subjects/redux/SubjectSlice";
import { getLelvelSubjectByIdNiveau, registerSubjectLevelCoef } from "./redux/LevelAsyncThunk";
import { AppDispatch } from "../../Redux/store";
import { getLevelSubjectState } from "./redux/LevelSubjectSlice";
import Loading from "../ui/Loading";
import { hexToRgba } from "../../Utils/Utils";
import { getAllSubject } from "../Subjects/redux/SubjectAsyncThunk";
import SubjectComponent from "./SubjectComponent";
import useForm from "../../Hooks/useForm";
import { object } from "yup";

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
        if (idActiveLevel !== 0) {
            setAllSubjectCoefAdded([
                subject,
                ...allSubjectCoefAdded
            ]);

            // Verification si la matière est dans la liste a supprimer 
            const testeIdToDeleteListe = subjectCoefToDelete.filter((id: number) => subject.id_matiere as number != id)
            setSubjectCoefToDelete(testeIdToDeleteListe);
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

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LISTE DES MATIERE A AJOUTER  */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="p-4 ">
                        <select
                            value={idActiveLevel}
                            onChange={handleLevelChange}
                            className="px-4  py-2 border-b cursor-pointer w-full border-gray-300 bg-transparent rounded-none   focus:outline-none"
                        >
                            <option value={0} >Choisissez un niveau</option>
                            {levels.map((value: levelType, key: number) => (
                                <option key={key} value={value.id_niveau} >{value.niveau} </option>
                            ))}
                        </select>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                        {subjects.map((subject: SubjectType, key: number) => {
                            if (
                                !levelSubjects.some((value) => (value.matiere_id_matiere === subject.id_matiere) //* Si le matiere a deja une une coefficient dans  la base  */
                                    && !subjectCoefToDelete.includes(subject.id_matiere)) && !idAllSubjectCoefAdded.includes(subject.id_matiere as number) // si la matiere a ete supprimer de la liste 
                            ) {
                                return <div key={key} className={`w-full p-4 border-b flex justify-between  hover:bg-gray-50`}
                                    style={{ backgroundColor: hexToRgba(subject.couleur, 0.1) }}
                                >
                                    <span>{subject.denomination}</span>
                                    <button
                                        type="button"
                                        className="text-gray-500 bg- px-2 py-1 bg-gray-50 transition-all duration-200 cursor-pointer hover:bg-blue-500 hover:text-white hover:border-transparent flex gap-2 border rounded-lg"
                                        onClick={() => { handleAddSubjectInLevel(subject) }}
                                    >
                                        <Plus />
                                        <span>Ajouter</span>
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
                    <div className="px-12 py-5 text-center">
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
                                    <h1 className="text-2xl  text-gray-900 text-left flex items-center  gap-3">
                                        <GraduationCap />
                                        <span>{levelActive?.niveau}</span>
                                    </h1>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors text-sm">
                                        {levelSubjectAction.isUpdating ?
                                            <div className="w-4 h-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                            :
                                            <Save className="w-4 h-4" />
                                        }
                                        <span>Enregistrer</span>
                                    </button>
                                </div>
                                <div className="space-y-2 ">
                                    <div className="w-100 h-10 text-black border-b grid grid-cols-3">
                                        <div className="col-span-1 flex  items-center justify-center" >
                                            Matière
                                        </div>
                                        <div className="col-span-2">
                                            Doefficient
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
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}



export default LevelSubject