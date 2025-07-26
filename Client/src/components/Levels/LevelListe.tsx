import { Archive, Edit, Eye, Filter, Search } from "lucide-react"
import { levelType, SubjectType } from "../../Utils/Types";
import { hexToRgba } from "../../Utils/Utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLevelState } from "./redux/LevelSlice";
import Table from "../Table";
import ConfirmDialog from "../ConfirmDialog";
import { AppDispatch } from "../../Redux/store";
import { deleteLevel } from "./redux/LevelAsyncThunk";

type LevelListePropsType = {
    handleEdit: (level: levelType) => void
    setActiveTab: React.Dispatch<React.SetStateAction<"levelSbject" | "listeLevel">>;
    setIdLevelToAddSubject: React.Dispatch<React.SetStateAction<number>>
}

type ActionColTypeLevel = SubjectType&{ coefficient: number}; 
const LevelListe = ({ handleEdit, setActiveTab, setIdLevelToAddSubject }: LevelListePropsType) => {
    const { datas, action } = useSelector(getLevelState);
    const [searchTerm, setSearchTerm] = useState('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [levelToDelete, setLevelToDelete] = useState<levelType | null>(null);
    const dispatch: AppDispatch = useDispatch();


    // HANDLERS
    const getContentMatiereCol = (subjects: { listes: ActionColTypeLevel[]; id_niveau: number }) => {
        if (subjects.listes.length > 0) {
            return (
                <div className='flex justify-center items-center gap-2'>
                    {subjects.listes.slice(0, 2).map((subject: ActionColTypeLevel) => (
                        <div key={subject.id_matiere} className='px-2  py-1 rounded text-xs font-medium  hover:opacity-80' style={{ backgroundColor: hexToRgba(subject.couleur, 0.5) }}>
                            <span>
                                {subject.abbreviation} ({ subject.coefficient})
                            </span>
                        </div>)
                    )}
                    <div className='text-center text-gray-400 text-xs'>
                        {subjects.listes.length > 2 ? `+${subjects.listes.length - 2}` : ''}
                    </div>
                </div>)
        }
        return <div
            className="p-2 rounded text-xs text-gray-400 hover:bg-gray-50 cursor-pointer"
            onClick={() => {
                setActiveTab('levelSbject');
                setIdLevelToAddSubject(subjects.id_niveau);
            }}
        >
            + Ajouter
        </div>
    }
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


    // TABLEAU //
    const columns = [
        { key: 'niveau', label: 'Niveau' },
        { key: 'cycle', label: 'Cycle' },
        { key: 'description', label: 'Description' },
        { key: 'total_classe', label: 'Nombre de classe', render: (value: number) => <div className={value == 0 ? "text-gray-300" : ''}>{value > 0 ? value : 'Aucune'} </div> },
        { key: 'matiere', label: 'Matières', render: getContentMatiereCol },
    ];

    const actions = [
        { icon: Eye, label: 'Voir', onClick: (item: any) => console.log('Voir', item), color: 'blue' },
        { icon: Edit, label: 'Modifier', onClick: handleEdit, color: 'green' },
        { icon: Archive, label: 'Archiver', onClick: handleDelete, color: 'red' },
    ];

    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher un niveau..."
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
        </>
    )
}

export default LevelListe