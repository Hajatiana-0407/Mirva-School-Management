import { ChangeEvent, useEffect, useState } from "react";
import { Check, Clock, Trash2, X, Pencil, BookOpen, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectState } from "./Subjects/redux/SubjectSlice";
import { ClasseType, SubjectType } from "../Utils/Types";
import { AppDispatch } from "../Redux/store";
import { getAllSubject } from "./Subjects/redux/SubjectAsyncThunk";
import { getAllClasse, getSubjectLevelByIdSubject } from "./Classes/redux/ClasseAsyncThunk";
import Table from "./Table";
import Input from "../Components/ui/Input";
import { Link } from "react-router-dom";
import clsx from "clsx";

export type AssignationType = {
    id_matiere?: number | string;
    matiere: string;
    id_classe?: number | string;
    classe: string;
    heures: number;
};
type TeacherSubjectPropsType = {
    assignationsInitialValue?: AssignationType[]
};
type subjectOptionsType = { label: string, value: number | string }[] | any[];
const TeacherSubject = ({ assignationsInitialValue }: TeacherSubjectPropsType) => {
    const [assignations, setAssignations] = useState<AssignationType[]>(assignationsInitialValue || []);
    const [selectedSubject, setSelectedSubject] = useState<string>("");
    const [selectedClasses, setSelectedClasses] = useState<{ [key: string]: boolean }>({});
    const [hoursByClass, setHoursByClass] = useState<{ [key: string]: number }>({});
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editHour, setEditHour] = useState<number>(1);
    const [classes, setClasses] = useState<ClasseType[]>([])

    const { datas: subjects } = useSelector(getSubjectState);

    const dispatch: AppDispatch = useDispatch();

    const [subjectOptions, setsubjectOptions] = useState<subjectOptionsType>([]);

    useEffect(() => {
        if (subjects.length === 0) dispatch(getAllSubject());

    }, [dispatch]);

    useEffect(() => {
        if (classes.length === 0) {
            dispatch(getAllClasse()).then((res: any) => {
                const allClasses = res.payload as ClasseType[];
                setClasses(allClasses);

                if (!assignationsInitialValue) {
                    setSelectedSubject('tous');
                }
            });
        }
    }, [dispatch])


    useEffect(() => {
        let options: subjectOptionsType = [];
        // ? Creation de la liste options matiere
        assignations.length ? '' : options = [{ label: 'Tous', value: 'tous' }];

        if (!assignations.some((assignation: AssignationType) => assignation.matiere == 'Tous')) {
            subjects.map((subject) => {
                options = [
                    ...options,
                    { label: `${subject.denomination} ${subject.abbreviation.toUpperCase()}`, value: subject.id_matiere as number }
                ]
            })
        }
        setsubjectOptions(options);
    }, [assignations, subjects])


    // Vérifier si une classe a déjà la matière assignée
    const isClassAlreadyAssigned = (classeId: number) => {
        const matiereName = selectedSubject === "tous"
            ? "Tous"
            : subjects.find((s: SubjectType) => (s.id_matiere as number).toString() === selectedSubject)?.denomination;
        const classeName = classes.find((c: ClasseType) => c.id_classe === classeId)?.denomination;
        return assignations.some(a => a.matiere === matiereName && a.classe === classeName);
    };

    // Gestion des changements
    const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubject(e.target.value);
        setSelectedClasses({});
        setHoursByClass({});

        // Recherche des niveaux associés à la matière sélectionnée
        if (e.target.value && e.target.value !== "tous") {
            dispatch(getSubjectLevelByIdSubject(parseInt(e.target.value))).then((res: any) => {
                const allClasses = res.payload as ClasseType[];
                setClasses(allClasses);
            });
        } else {
            if (e.target.value === "tous") {
                dispatch(getAllClasse()).then((res: any) => {
                    const allClasses = res.payload as ClasseType[];
                    setClasses(allClasses);
                });
            } else {
                setClasses([]);
            }
        }
    };

    // Gestion des cases à cocher
    const handleClassCheck = (id: number) => {
        if (isClassAlreadyAssigned(id)) return;

        setSelectedClasses(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Gestion des heures par classe
    const handleHoursChange = (id: number, value: number) => {
        setHoursByClass(prev => ({
            ...prev,
            [id]: value
        }));
    };

    // Validation des assignations
    const handleValidate = () => {
        if (!selectedSubject) return;
        const subjectObj = selectedSubject === "tous"
            ? { denomination: "Tous", id_matiere: "tous" }
            : subjects.find((s: SubjectType) => (s.id_matiere as number).toString() == selectedSubject);

        Object.keys(selectedClasses).forEach(classeId => {
            if (selectedClasses[classeId]) {
                const classeObj = classes.find((c: ClasseType) => (c.id_classe as number).toString() === classeId);
                const heures = hoursByClass[classeId] || 1;
                if (!assignations.some(a =>
                    a.matiere === (subjectObj?.denomination || "") &&
                    a.classe === (classeObj?.denomination || "")
                )) {
                    setAssignations(prev => [
                        ...prev,
                        {
                            id_classe: classeObj?.id_classe,
                            id_matiere: subjectObj?.id_matiere || "tous",
                            matiere: subjectObj?.denomination || "",
                            classe: classeObj?.denomination || "",
                            heures
                        }
                    ]);
                }
            }
        });


        setSelectedSubject("");
        setSelectedClasses({});
        setHoursByClass({});
    };

    // Gestion de l'annulation
    const handleCancel = () => {
        setSelectedSubject("");
        setSelectedClasses({});
        setHoursByClass({});
    };

    // Gestion de la suppression dans le tableau
    const handleDeleteAssignation = (index: number) => {
        setAssignations(prev => prev.filter((_, i) => i !== index));
    };

    // Modification des heures dans le tableau
    const handleEditHour = (index: number, heures: number) => {
        setEditIndex(index);
        setEditHour(heures);
    };

    // Gestion de l'heure par semaine à modifier
    const handleSaveHour = (index: number) => {
        setAssignations(prev =>
            prev.map((a, i) =>
                i === index ? { ...a, heures: editHour } : a
            )
        );
        setEditIndex(null);
    };

    // Gestion de la modification de l'input heure
    const handleEditHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditHour(Number(e.target.value));
    };

    const isValidateDisabled =
        !selectedSubject ||
        Object.values(selectedClasses).filter(Boolean).length === 0;


    // DONNER POUR LE TABLEAU
    const columns = [
        { key: 'matiere', label: 'Matière' },
        { key: 'classe', label: 'Classe' },
        {
            key: 'heures',
            label: 'h/semaine',
            render: (value: any, item: any) => (
                editIndex === item.index ? (
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            min={1}
                            value={editHour}
                            onChange={handleEditHourChange}
                            className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
                        />
                        <button
                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleSaveHour(item.index);
                            }}
                            type="button"
                        >
                            <Check className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        {value}
                        <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleEditHour(item.index, value)}
                            title="Modifier"
                        >
                            <Pencil className="w-4 h-4" />
                        </button>
                    </div>
                )
            )
        }
    ];



    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {/* Colonne 1 */}
                <div className="col-span-2 rounded p-1">
                    <h2 className='text-sm col-span-2 text-gray-500 italic mb-4'>Attribution matière(s) et classe(s) a cette enseigant </h2>
                    <div className="col-span-2 rounded  bg-white flex flex-col gap-4">
                        {/* Choix matière */}
                        <div>
                            <Input
                                label="Sélectionnez une matière"
                                name=""
                                icon={BookOpen}
                                type="select"
                                options={subjectOptions}
                                onChange={handleSubjectChange as (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void}
                            />
                        </div>

                        {/* Sélection classes toujours affichée */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Classes :</label>
                            <div className="rounded mb-2">
                                <div className="flex px-4 py-2 border-b text-base font-semibold mb-2 rounded-t-2xl">
                                    <div className="w-10"></div>
                                    <div className="flex-1">Nom</div>
                                    <div className="w-24 text-center">h/semaine</div>
                                </div>
                                <div className="space-y-2 max-h-[350px] overflow-y-auto">
                                    {classes.map((classe: ClasseType, idx: number) => {
                                        const checked = !!selectedClasses[classe.id_classe as number];
                                        const disabled =
                                            !selectedSubject ||
                                            (selectedSubject === "tous" && Object.values(selectedClasses).some(v => v) && !checked)
                                            || isClassAlreadyAssigned(classe.id_classe as number);
                                        return (
                                            <label
                                                key={classe.id_classe || idx}
                                                className={`flex items-center px-4 py-2 bg-white rounded border border-gray-200 hover:shadow-sm transition mb-1 cursor-pointer ${disabled ? "opacity-50 pointer-events-none" : ""}`}
                                                htmlFor={`__classe_input_${classe.id_classe}`}
                                            >
                                                {/* Checkbox */}
                                                <div className="w-10 flex items-center justify-center">
                                                    <input
                                                        type="checkbox"
                                                        className="peer appearance-none w-6 h-6 border-2 border-blue-300 rounded-md bg-blue-50 checked:bg-blue-500 checked:border-blue-500 transition cursor-pointer"
                                                        id={`__classe_input_${classe.id_classe}`}
                                                        checked={checked}
                                                        disabled={disabled}
                                                        onChange={() => handleClassCheck(classe.id_classe as number)}
                                                    />
                                                </div>
                                                {/* Nom de la classe */}
                                                <div className="flex-1 flex items-center font-semibold text-gray-800 pl-2">
                                                    {classe.denomination}
                                                </div>
                                                {/* Input heure/semaine avec icône */}
                                                <div className="w-24 flex items-center relative">
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        className={clsx({
                                                            'border border-gray-500': checked,
                                                            'border border-gray-200': !checked,
                                                        }, "w-full  px-3 py-1 bg-gray-50 focus:ring-2 focus:ring-blue-200 font-medium")}
                                                        placeholder="1"
                                                        value={hoursByClass[classe.id_classe as number] || ""}
                                                        onChange={e => handleHoursChange(classe.id_classe as number, Number(e.target.value))}
                                                        disabled={!checked}
                                                    />
                                                    <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5 pointer-events-none bg-white" />
                                                </div>
                                            </label>
                                        );
                                    })}

                                    {!classes.length && <>
                                        <div className="text-gray-500 bg-blue-100 text-center p-5 border rounded shadow-inner">
                                            <h6>Aucune classe trouver pour ce matière</h6>
                                            <Link to={'/levels/level-subject'} className="text-blue-500 underline">Click ici pour ajouter</Link>
                                        </div>
                                    </>}
                                </div>
                                {/* Boutons */}
                                <div className="flex gap-2 justify-end mt-3">
                                    <button
                                        className="bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-300 transition-colors"
                                        onClick={handleCancel}
                                        disabled={isValidateDisabled && !selectedSubject && !Object.values(selectedClasses).some(Boolean)}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    <button
                                        className={`bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${isValidateDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
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

                {/* Colonne 2 : Tableau récapitulatif */}
                <div className="col-span-3 max-lg:border-t lg:border-l">
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
            </div>

            {/* Div cacher pour creation d'input qui va contenire les valeur des assigantions  */}
            <div>
                {assignations.map((assignation: any, index: number) => (
                    <div key={index}>
                        <input type="hidden" name={`assignations[${index}][id_classe]`} value={assignation.id_classe} onChange={() => { }} />
                        <input type="hidden" name={`assignations[${index}][id_matiere]`} value={assignation.id_matiere} onChange={() => { }} />
                        <input type="hidden" name={`assignations[${index}][heures]`} value={assignation.heures} onChange={() => { }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherSubject;