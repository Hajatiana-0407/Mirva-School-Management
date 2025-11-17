import { Archive, Edit, Eye, Filter, Search } from "lucide-react"
import { ClasseType, levelType, SubjectType } from "../../Utils/Types";
import { hexToRgba } from "../../Utils/Utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLevelState } from "./redux/LevelSlice";
import Table from "../Table";
import ConfirmDialog from "../ConfirmDialog";
import { AppDispatch } from "../../Redux/store";
import { deleteLevel, getAllLevel } from "./redux/LevelAsyncThunk";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import ClasseForm from "../../Components/Forms/ClasseForm";
import { getAppState } from "../../Redux/AppSlice";
import { getClasseState } from "../Classes/redux/ClasseSlice";

type LevelListePropsType = {
    handleEdit: (level: levelType) => void
    setIdLevelToAddSubject: React.Dispatch<React.SetStateAction<number>>
}

type ActionColTypeLevel = SubjectType & { coefficient: number };
const LevelListe = ({ handleEdit, setIdLevelToAddSubject }: LevelListePropsType) => {
    const { datas, action } = useSelector(getLevelState);
    const { datas : Classes } = useSelector( getClasseState )
    const [searchTerm, setSearchTerm] = useState('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [levelToDelete, setLevelToDelete] = useState<levelType | null>(null);
    const [showClasseModale, setShowClasseModale] = useState(false)
    const [idLevelToAddClasse, setIdLevelToAddClasse] = useState<number | null>(null);
    const { hiddeTheModalActive } = useSelector(getAppState)

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    // Contenue pour la liste des classes
    const getContentClasseCol = (classes: { listes: ClasseType[], id_niveau: number }) => {
        if (classes.listes.length > 0) {
            return (
                <div className=''>
                    <div className="ml-2 py-2 flex gap-1 items-center min-w-40  max-w-52 flex-wrap ">
                        {classes.listes?.map((classe) => (
                            <Link 
                            to={`/back-office/classes/${ classe.id_classe }`}
                                key={classe.id_classe}
                                className="px-2 py-1 rounded text-xs font-medium hover:opacity-80 border bg-secondary-200"
                            >
                                <span>{classe.denomination}</span>
                            </Link>
                        ))}
                    </div>
                    <div
                        className="p-2 rounded text-xs text-secondary-500 hover:bg-secondary-50 cursor-pointer"
                        onClick={() => {
                            setIdLevelToAddClasse(classes.id_niveau)
                            setShowClasseModale(true);
                        }}
                    >
                        + Ajouter
                    </div>
                </div>)
        }
        return <div
            className="p-2 rounded text-xs text-secondary-500 hover:bg-secondary-50 cursor-pointer"
            onClick={() => {
                setIdLevelToAddClasse(classes.id_niveau)
                setShowClasseModale(true);
            }}
        >
            + Ajouter
        </div>
    }

    // Contenue pour le liste des matieres
    const getContentMatiereCol = (subjects: { listes: ActionColTypeLevel[]; id_niveau: number }) => {
        if (subjects.listes.length > 0) {
            return (
                <div className=''>
                    <div className="ml-2 py-2 flex gap-1 items-center min-w-40  max-w-52 flex-wrap">
                        {subjects.listes?.map((subject) => (
                            <div
                                key={subject.id_matiere}
                                className="px-2 py-1 rounded text-xs font-medium hover:opacity-80"
                                style={{ backgroundColor: hexToRgba(subject.couleur, 0.5) }}
                            >
                                <span>{subject.abbreviation}</span>
                            </div>
                        ))}
                    </div>
                    <div
                        className="p-2 rounded text-xs text-secondary-500 hover:bg-secondary-50 cursor-pointer"
                        onClick={() => {
                            navigate('/back-office/levels?o=subject-level-coef')
                            setIdLevelToAddSubject(subjects.id_niveau);
                        }}
                    >
                        + Ajouter
                    </div>
                </div>)
        }
        return <div
            className="p-2 rounded text-xs text-secondary-400 hover:bg-secondary-50 cursor-pointer"
            onClick={() => {
                navigate('/back-office/levels?o=subject-level-coef')
                setIdLevelToAddSubject(subjects.id_niveau);
            }}
        >
            + Ajouter
        </div>
    }

    // HANDLERS
    const handleDelete = (level: any) => {
        setLevelToDelete(level);
        setShowConfirmDialog(true);
    };
    const handleConfirmDelete = () => {
        if (levelToDelete) {
            dispatch(deleteLevel(levelToDelete.id_niveau as number))
        }
        setShowConfirmDialog(false);
        setLevelToDelete(null);
    };
    const handleClasseModaleClose = () => {
        setShowClasseModale(false);
        setIdLevelToAddClasse(null);
    }


    // Modale 
    useEffect(() => {
        if (showClasseModale && hiddeTheModalActive) {
            handleClasseModaleClose();
        }
    }, [hiddeTheModalActive]);

    useEffect(() => {
        dispatch(getAllLevel());
    }, [dispatch ,Classes ]);

    // TABLEAU //
    const columns = [
        {
            key: 'niveau', label: 'Niveau', render: (value: string) => (
                <div className="font-semibold uppercase">
                    {value}
                </div>
            )
        },
        { key: 'cycle', label: 'Cycle' },
        { key: 'description', label: 'Description' },
        { key: 'classe', label: 'Classes', render: getContentClasseCol },
        { key: 'matiere', label: 'Matières', render: getContentMatiereCol },
    ];

    const actions = [
        { icon: Eye, label: 'Voir', onClick: (item: any) => navigate(`/back-office/level-details/${ item.id_niveau }`), color: 'primary' },
        { icon: Edit, type: 'update', label: 'Modifier', onClick: handleEdit, color: 'green' },
        { icon: Archive, type: 'delete', label: 'Archiver', onClick: handleDelete, color: 'red' },
    ];

    return (
        <>
            <div className="bg-light p-3 md:p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-6 md:mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                            <input
                                type="text"
                                placeholder="Rechercher un niveau..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                        <button className="flex items-center space-x-2 px-2 py-1 sm:px-4 sm:py-2 _classe border border-secondary-300 rounded-lg hover:bg-secondary-50">
                            <Filter className="w-4 h-4" />
                            <span>Filtres</span>
                        </button>
                    </div>
                </div>

                <Table
                    data={datas}
                    columns={columns}
                    actions={actions}
                    searchTerm={searchTerm}
                    isLoading={action.isLoading as boolean}
                />
            </div>
            {/* CONFIRAMTION DE SUPPRESSION */}
            <ConfirmDialog
                isOpen={showConfirmDialog}
                onClose={() => { setShowConfirmDialog(false) }}
                onConfirm={handleConfirmDelete}
                title="Suppression du niveau"
                message={`Êtes-vous sûr de vouloir archiver le niveau ${levelToDelete?.niveau} ?`}
            />

            {/* Modal pour ajouter/modifier une matière */}
            <Modal
                isOpen={showClasseModale}
                onClose={handleClasseModaleClose}
                title={'Nouvelle matière'}
            >
                <ClasseForm handleClose={handleClasseModaleClose} idLevelToAddClasse={idLevelToAddClasse as number} />
            </Modal>
        </>
    )
}

export default LevelListe