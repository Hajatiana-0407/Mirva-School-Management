import { ChangeEvent, useEffect, useState } from "react";
import { Check, Clock, Trash2, X, Pencil, BookOpen, ArrowRight, Trash, AlertCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectState } from "./Subjects/redux/SubjectSlice";
import { ClasseType } from "../Utils/Types";
import { AppDispatch } from "../Redux/store";
import { getAllSubject } from "./Subjects/redux/SubjectAsyncThunk";
import { getAllClasse, getSubjectLevelByIdSubject } from "./Classes/redux/ClasseAsyncThunk";
import Table from "./Table";
import Input from "../Components/ui/Input";
import { Link } from "react-router-dom";
import clsx from "clsx";
import ConfirmDialog from "./ConfirmDialog";

export type AssignationType = {
    id_matiere?: number | string;
    matiere: string;
    id_classe?: number | string;
    classe: string;
    heures: number;
};

type TeacherSubjectPropsType = {
    assignationsInitialValue?: AssignationType[];
    onChange?: (hasChanges: boolean, assignations: AssignationType[]) => void;
};

const TeacherSubject = ({ assignationsInitialValue = [], onChange }: TeacherSubjectPropsType) => {
    // États
    const [assignations, setAssignations] = useState<AssignationType[]>(assignationsInitialValue);
    const [selectedSubject, setSelectedSubject] = useState<string>("");
    const [selectedClasses, setSelectedClasses] = useState<Set<number>>(new Set());
    const [hoursByClass, setHoursByClass] = useState<Map<number, number>>(new Map());
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editHour, setEditHour] = useState<number>(1);
    const [classes, setClasses] = useState<ClasseType[]>([]);
    const [isActiveConfirmation, setIsActiveConfirmation] = useState(false);

    const { datas: subjects } = useSelector(getSubjectState);
    const dispatch: AppDispatch = useDispatch();

    // Options des matières
    const subjectOptions = [
        ...(assignations.length === 0 ? [{ label: 'Tous', value: 'tous' }] : []),
        ...subjects
            .filter(() => !assignations.some(a => a.matiere === 'Tous'))
            .map(subject => ({
                label: `${subject.denomination} ${subject.abbreviation.toUpperCase()}`,
                value: subject.id_matiere as number
            }))
    ];

    // Fonction de comparaison robuste pour détecter les changements
    const hasRealChanges = (current: AssignationType[], initial: AssignationType[]): boolean => {
        // Si les longueurs sont différentes, il y a changement
        if (current.length !== initial.length) return true;

        // Créer des Maps pour une comparaison indépendante de l'ordre
        const currentMap = new Map();
        const initialMap = new Map();

        current.forEach(assignation => {
            const key = `${assignation.id_matiere}-${assignation.id_classe}-${assignation.heures}`;
            currentMap.set(key, assignation);
        });

        initial.forEach(assignation => {
            const key = `${assignation.id_matiere}-${assignation.id_classe}-${assignation.heures}`;
            initialMap.set(key, assignation);
        });

        // Vérifier si toutes les assignations initiales sont présentes dans les courantes
        for (const [key, initialAssignation] of initialMap) {
            const currentAssignation = currentMap.get(key);
            if (!currentAssignation) return true;
            // Vérifier chaque propriété
            if (currentAssignation.id_matiere != initialAssignation.id_matiere ||
                currentAssignation.id_classe != initialAssignation.id_classe ||
                currentAssignation.matiere != initialAssignation.matiere ||
                currentAssignation.classe != initialAssignation.classe ||
                currentAssignation.heures != initialAssignation.heures) {
                return true;
            }
        }
        // Vérifier qu'il n'y a pas de nouvelles assignations
        return currentMap.size !== initialMap.size;
    };

    // Utilisation dans le useEffect
    useEffect(() => {
        if (onChange) {
            const hasChanges = hasRealChanges(assignations, assignationsInitialValue);
            onChange(hasChanges, assignations);
        }
    }, [assignations, assignationsInitialValue, onChange]);


    // Chargement initial des données
    useEffect(() => {
        if (subjects.length === 0) {
            dispatch(getAllSubject());
        }
    }, [dispatch, subjects.length]);

    useEffect(() => {
        if (classes?.length === 0) {
            dispatch(getAllClasse()).then((res: any) => {
                const allClasses = res.payload as ClasseType[];
                setClasses(allClasses);
                if (!assignationsInitialValue.length) {
                    setSelectedSubject('tous');
                }
            });
        }
    }, [dispatch, classes?.length, assignationsInitialValue.length]);

    // Vérifier si une classe a déjà la matière assignée
    const isClassAlreadyAssigned = (classeId: number): boolean => {
        const matiereName = selectedSubject === "tous"
            ? "Tous"
            : subjects.find(s => s.id_matiere?.toString() === selectedSubject)?.denomination;

        const classeName = classes?.find(c => c.id_classe === classeId)?.denomination;

        return assignations.some(a =>
            a.matiere === matiereName &&
            a.classe === classeName
        );
    };

    // Gestion des changements de matière
    const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedSubject(value);
        setSelectedClasses(new Set());
        setHoursByClass(new Map());

        if (value && value !== "tous") {
            dispatch(getSubjectLevelByIdSubject(parseInt(value))).then((res: any) => {
                setClasses(res.payload as ClasseType[]);
            });
        } else if (value === "tous") {
            dispatch(getAllClasse()).then((res: any) => {
                setClasses(res.payload as ClasseType[]);
            });
        } else {
            setClasses([]);
        }
    };

    // Gestion des cases à cocher
    const handleClassCheck = (classeId: number) => {
        if (isClassAlreadyAssigned(classeId)) return;

        setSelectedClasses(prev => {
            const newSet = new Set(prev);
            if (newSet.has(classeId)) {
                newSet.delete(classeId);
                setHoursByClass(prevMap => {
                    const newMap = new Map(prevMap);
                    newMap.delete(classeId);
                    return newMap;
                });
            } else {
                newSet.add(classeId);
                setHoursByClass(prevMap => new Map(prevMap.set(classeId, 2)));
            }
            return newSet;
        });
    };

    // Gestion des heures par classe
    const handleHoursChange = (classeId: number, value: number) => {
        setHoursByClass(prev => new Map(prev.set(classeId, Math.max(1, value))));
    };

    // Validation des assignations
    const handleValidate = () => {
        if (!selectedSubject || selectedClasses.size === 0) return;

        const subjectObj = selectedSubject === "tous"
            ? { denomination: "Tous", id_matiere: "tous" }
            : subjects.find(s => s.id_matiere?.toString() === selectedSubject);

        if (!subjectObj) return;

        const newAssignations: AssignationType[] = [];

        selectedClasses.forEach(classeId => {
            const classeObj = classes?.find(c => c.id_classe === classeId);
            if (!classeObj) return;

            const heures = hoursByClass.get(classeId) || 2;
            const assignationExists = assignations.some(a =>
                a.matiere === subjectObj.denomination &&
                a.classe === classeObj.denomination
            );

            if (!assignationExists) {
                newAssignations.push({
                    id_classe: classeObj.id_classe,
                    id_matiere: subjectObj.id_matiere,
                    matiere: subjectObj.denomination,
                    classe: classeObj.denomination,
                    heures
                });
            }
        });

        if (newAssignations.length > 0) {
            setAssignations(prev => [...newAssignations , ...prev]);
        }

        // Réinitialisation
        setSelectedSubject("");
        setSelectedClasses(new Set());
        setHoursByClass(new Map());
    };

    // Gestion de l'annulation
    const handleCancel = () => {
        setSelectedSubject("");
        setSelectedClasses(new Set());
        setHoursByClass(new Map());
    };

    // Gestion de la suppression
    const handleDeleteAssignation = (index: number) => {
        setAssignations(prev => prev.filter((_, i) => i !== index));
    };

    // Modification des heures
    const handleEditHour = (index: number, heures: number) => {
        setEditIndex(index);
        setEditHour(heures);
    };

    const handleSaveHour = (index: number) => {
        setAssignations(prev =>
            prev.map((a, i) => i === index ? { ...a, heures: editHour } : a)
        );
        setEditIndex(null);
    };

    const handleDeleteAll = () => setIsActiveConfirmation(true);
    const handleConfirmDeleteAll = () => {
        setAssignations([]);
        setIsActiveConfirmation(false);
    };

    // Vérifications
    const hasSelectedClasses = selectedClasses.size > 0;
    const isValidateDisabled = !selectedSubject || !hasSelectedClasses;

    // Configuration du tableau
    const columns = [
        { key: 'matiere', label: 'Matière' },
        { key: 'classe', label: 'Classe' },
        {
            key: 'heures',
            label: 'h/semaine',
            render: (value: number, item: any) => (
                editIndex === item.index ? (
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            min={1}
                            value={editHour}
                            onChange={(e) => setEditHour(Number(e.target.value))}
                            className="w-20 border border-gray-300 rounded-lg px-3 py-1.5 text-center focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                        <button
                            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                            onClick={() => handleSaveHour(item.index)}
                            type="button"
                        >
                            <Check className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {value}h
                        </span>
                        <button
                            className="text-gray-500 hover:text-primary-600 transition-colors p-1.5 hover:bg-primary-50 rounded-lg"
                            onClick={() => handleEditHour(item.index, value)}
                            title="Modifier les heures"
                        >
                            <Pencil className="w-4 h-4" />
                        </button>
                    </div>
                )
            )
        }
    ];
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                {/* Panneau de sélection */}
                <div className="xl:col-span-2">
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6">
                            Attribution des matières et classes
                        </h2>

                        {/* Sélection de la matière */}
                        <div className="mb-6">
                            <Input
                                label="Sélectionnez une matière"
                                name=""
                                icon={BookOpen}
                                type="select"
                                options={subjectOptions}
                                onChange={handleSubjectChange as (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void}
                            />
                        </div>

                        {/* Sélection des classes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Classes disponibles ({selectedClasses.size} sélectionnée(s))
                            </label>

                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                {/* En-tête */}
                                <div className="grid grid-cols-[auto_1fr_100px] gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200">
                                    <div className="w-8"></div>
                                    <div className="font-medium text-gray-700">Classe</div>
                                    <div className="font-medium text-gray-700 text-center">Heures</div>
                                </div>

                                {/* Liste des classes */}
                                <div className="max-h-80 overflow-y-auto">
                                    {classes?.map((classe) => {
                                        const classeId = classe.id_classe as number;
                                        const checked = selectedClasses.has(classeId);
                                        const disabled = !selectedSubject || isClassAlreadyAssigned(classeId);
                                        const hours = hoursByClass.get(classeId) || 2;

                                        return (
                                            <label
                                                key={classeId}
                                                className={clsx(
                                                    "grid grid-cols-[auto_1fr_100px] gap-4 px-4 py-3 border-b border-gray-100 last:border-b-0 transition-colors ",
                                                    checked && "bg-primary-50",
                                                    !disabled && "hover:bg-gray-50 cursor-pointer",
                                                    disabled && "opacity-60"
                                                )}
                                            >
                                                {/* Checkbox */}
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className={clsx(
                                                            "w-4 h-4 rounded border-2 transition-colors",
                                                            checked
                                                                ? "bg-primary-500 border-primary-500"
                                                                : "border-gray-300",
                                                            disabled && "cursor-not-allowed"
                                                        )}
                                                        checked={checked}
                                                        disabled={disabled}
                                                        onChange={() => handleClassCheck(classeId)}
                                                    />
                                                </div>

                                                {/* Nom de la classe */}
                                                <div className="flex items-center gap-2">
                                                    <span className={clsx(
                                                        "font-medium",
                                                        checked ? "text-primary-700" : "text-gray-700"
                                                    )}>
                                                        {classe.denomination}
                                                    </span>
                                                    {disabled && isClassAlreadyAssigned(classeId) && (
                                                        <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full flex items-center gap-1">
                                                            <AlertCircle className="w-3 h-3" />
                                                            Déjà attribué
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Input heures */}
                                                <div className="flex items-center justify-center">
                                                    <div className="relative">
                                                        <input
                                                            type="number"
                                                            min={1}
                                                            className={clsx(
                                                                "w-20 text-center border rounded-lg px-3 py-1.5 transition-all font-medium",
                                                                checked
                                                                    ? "border-primary-300 bg-white text-primary-700 focus:ring-2 focus:ring-primary-500"
                                                                    : "border-gray-300 bg-gray-100 text-gray-500",
                                                                !checked && "cursor-not-allowed"
                                                            )}
                                                            value={hours}
                                                            onChange={(e) => handleHoursChange(classeId, Number(e.target.value))}
                                                            disabled={!checked}
                                                        />
                                                        <Clock className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                                                    </div>
                                                </div>
                                            </label>
                                        );
                                    })}

                                    {classes?.length === 0 && (
                                        <div className="text-center py-8 px-4">
                                            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                            <p className="text-gray-500 mb-2">Aucune classe disponible</p>
                                            <Link
                                                to="/back-office/levels/level-subject"
                                                className="text-primary-600 hover:text-primary-700 font-medium underline"
                                            >
                                                Configurer les classes
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Boutons d'action */}
                                <div className="flex gap-3 justify-end p-4 bg-gray-50 border-t">
                                    <button
                                        className={clsx(
                                            "px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 border",
                                            isValidateDisabled && !selectedSubject
                                                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                        )}
                                        onClick={handleCancel}
                                        disabled={isValidateDisabled && !selectedSubject}
                                    >
                                        <X className="w-4 h-4" />
                                        Annuler
                                    </button>
                                    <button
                                        className={clsx(
                                            "px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2",
                                            isValidateDisabled
                                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                : "bg-primary-600 text-white hover:bg-primary-700 shadow-sm"
                                        )}
                                        onClick={handleValidate}
                                        disabled={isValidateDisabled}
                                    >
                                        <span>Valider</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tableau des assignations */}
                <div className="xl:col-span-3">
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Assignations en cours</h3>
                                <p className="text-sm text-gray-600">{assignations.length} assignation(s)</p>
                            </div>
                            <button
                                type="button"
                                className={clsx(
                                    "px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2",
                                    assignations.length === 0
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "bg-red-500 text-white hover:bg-red-600"
                                )}
                                onClick={handleDeleteAll}
                                disabled={assignations.length === 0}
                            >
                                <Trash className="w-4 h-4" />
                                Tout effacer
                            </button>
                        </div>

                        <div className="flex-1">
                            <Table
                                columns={columns}
                                data={assignations.map((a, i) => ({ ...a, index: i }))}
                                actions={[
                                    {
                                        icon: Trash2,
                                        label: "Supprimer",
                                        onClick: (item) => handleDeleteAssignation(item.index),
                                        color: "red"
                                    }
                                ]}
                                isLoading={false}
                            />
                        </div>

                        {assignations.length === 0 && (
                            <div className="text-center py-12">
                                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">Aucune assignation</p>
                                <p className="text-gray-400 text-sm">Ajoutez des matières et classes à gauche</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Champs cachés pour le formulaire */}
            <div className="hidden">
                {assignations.map((assignation, index) => (
                    <div key={index}>
                        <input type="hidden" name={`assignations[${index}][id_classe]`} value={assignation.id_classe} onChange={() => { }} />
                        <input type="hidden" name={`assignations[${index}][id_matiere]`} value={assignation.id_matiere} onChange={() => { }} />
                        <input type="hidden" name={`assignations[${index}][heures]`} value={assignation.heures} onChange={() => { }} />
                    </div>
                ))}
            </div>

            <ConfirmDialog
                isOpen={isActiveConfirmation}
                onClose={() => setIsActiveConfirmation(false)}
                onConfirm={handleConfirmDeleteAll}
                title="Confirmer la suppression"
                message="Êtes-vous sûr de vouloir supprimer toutes les assignations ? Cette action est irréversible."
            />
        </div>
    );
};

export default TeacherSubject;