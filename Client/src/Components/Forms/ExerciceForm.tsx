import { BookOpen, FileText, X, PenBox, Check, GraduationCap } from "lucide-react";
import Input from "../ui/Input";
import HeadingSmall from "../ui/HeadingSmall";
import * as Yup from "yup";
import CheckInput from "../ui/CheckInput";
import VideoOrFileInput from "../ui/VideoOrFileInput";
import { ApiReturnType, ExerciceInitialValue, ExerciceType, LevelSubjectType, levelType } from "../../Utils/Types";
import useForm from "../../Hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState } from "../../Pages/Auth/redux/AuthSlice";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../Redux/store";
import { getAllLevel, getLelvelSubjectByIdNiveau, getLevelByTeacherId } from "../../Pages/Levels/redux/LevelAsyncThunk";
import { getLevelState } from "../../Pages/Levels/redux/LevelSlice";
import Loading from "../ui/Loading";
import InputError from "../ui/InputError";
import { createExercice, updateexercice } from "../../Pages/Exercices/redux/ExerciceAsyncThunk";
import { getExerciceState } from "../../Pages/Exercices/redux/ExerciceSlice";
import { baseUrl } from "../../Utils/Utils";
import { useActiveUser } from "../../Hooks/useActiveUser";

// Schéma de validation pour exercice
export const exerciceSchema = Yup.object({
    titre: Yup.string().required("Le titre est obligatoire."),
    description: Yup.string().required("La description est obligatoire."),

    id_niveau: Yup.string().required("Le niveau est obligatoire!"),
    id_matiere: Yup.string().required("Le matière est obligatoire!")
});

type ExerciceFormPropsType = {
    exercice?: ExerciceType,
    handleCloseModal: () => void
};

const ExerciceForm: React.FC<ExerciceFormPropsType> = ({ exercice, handleCloseModal }) => {
    const { formErrors, onSubmite } = useForm(exerciceSchema, ExerciceInitialValue)
    const { datas: { info } } = useSelector(getAuthState);
    const { datas: levelsState } = useSelector(getLevelState);
    const [levels, setLevels] = useState<levelType[]>([])
    const { action, error } = useSelector(getExerciceState);
    const dispatch: AppDispatch = useDispatch();
    const [isCheckingLevel, setIsCheckingLevel] = useState(false)
    const [subjectOptions, setSubjectOptions] = useState<{ value: number, label: string }[]>([]);
    const { isTeacher, isStudent } = useActiveUser();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData: any) => {
            exercice ? dispatch(updateexercice({ exercice: validateData, id: exercice.id_exercice as number }))
                : dispatch(createExercice(validateData));
        }, e);
    }

    useEffect(() => {
        // Si utilisateur est prof ( on recuper seulement les niveau que cette prof enseigne 
        if (isTeacher) {
            dispatch(getLevelByTeacherId(info?.id_personnel as number))
                .unwrap()
                .then((response: ApiReturnType) => {
                    if (!response.error) {
                        if (response.data) {
                            setLevels(response.data as ExerciceType[]);
                        }
                    } else {
                        console.error('Erreur lors de recuperation de niveau par utilisatuer ');
                    }
                })
                .catch((err) => {
                    console.error("Erreur lors de la recherche par niveau", err);
                })
                .finally(() => {
                    setIsCheckingLevel(false);
                });

        } else {
            setLevels(levelsState);
        }
        return () => { }
    }, [levelsState])


    /**
     * Prendre toute les matiere pour le niveau active 
     * @param id_level 
     */
    const getSubjectByIdLevel = (id_level: number) => {
        dispatch(getLelvelSubjectByIdNiveau(id_level))
            .unwrap()
            .then((response: LevelSubjectType[]) => {
                if (!!response) {
                    let options: any[] = [];
                    if (response.length > 0) {
                        options = response.map((subject) => ({
                            value: subject.id_matiere as number,
                            label: subject.denomination
                        }))
                    }
                    setSubjectOptions(options);
                }
            })
            .catch((err) => {
                console.error("Erreur lors de la recherche par niveau", err);
            })
            .finally(() => {
                setIsCheckingLevel(false);
            });
    }

    /**
     * Detecte chaque changement de niveau 
     * @param level_id 
     * @returns 
     */
    const handleChangeLevel = (level_id: number) => {
        if (!level_id) return;
        getSubjectByIdLevel(level_id);
    }

    /**
     * Si l'etat du niveau est encore vide on recupere dans le back 
     */
    useEffect(() => {
        if (!levelsState.length && !isTeacher) {
            dispatch(getAllLevel());
        }
        return () => { }
    }, [dispatch]);

    useEffect(() => {
        if (levels.length > 0 && !!levels?.[0]?.id_niveau) {
            getSubjectByIdLevel(exercice?.id_niveau || levels?.[0]?.id_niveau as number);
        }
        return () => { }
    }, [dispatch, levels.length])

    // ===================== levels options ===================== //
    let levelsOptions = levels?.length > 0 ? levels.filter(level => !exercice ? true : exercice.id_niveau !== level.id_niveau).map((level) => ({
        value: level.id_niveau as number, label: level.niveau
    })) : [];
    // ? mettre le Niveau dans edit en premier
    if (levels.length > 0) {
        levels.map(level => {
            if (!!exercice && exercice.id_niveau === level.id_niveau) {
                levelsOptions.unshift({
                    value: level.id_niveau as number,
                    label: level.niveau
                })
            }
        })
    }
    // =====================  ===================== //

    const published = exercice ? (exercice.published == 0 ? false : true) : true;
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* levels  */}
            <input type="hidden" name="id_prof" value={isTeacher ? info?.id_personnel : ''} onChange={() => { }} />
            {exercice &&
                <input type="hidden" name="id_exercice" value={exercice?.id_exercice} onChange={() => { }} />
            }
            <InputError message={error} />
            <Input
                label="Choisissez un niveau"
                name="id_niveau"
                defaultValue={exercice?.id_niveau || levelsOptions?.[0]?.value || ''}
                errorMessage={formErrors?.id_niveau}
                options={levelsOptions}
                type="select"
                icon={GraduationCap}
                onChange={(e) => {
                    setIsCheckingLevel(true);
                    handleChangeLevel(parseInt(e.target.value as string))
                }}
            />
            <div className="space-y-4 relative">
                {isCheckingLevel &&
                    <div className="absolute -top-2 -right-2 -left-2 -bottom-2 rounded bg-black/1 backdrop-blur-[2px] z-30 flex items-center justify-center">
                        <Loading />
                    </div>
                }

                {/* Matiere */}
                <Input
                    label="Choisissez une matière"
                    name="id_matiere"
                    defaultValue={exercice?.id_matiere || subjectOptions?.[0]?.value || ''}
                    errorMessage={formErrors?.id_matiere}
                    options={subjectOptions}
                    type="select"
                    icon={BookOpen}
                />
                <div>
                    <VideoOrFileInput
                        name="ficher_principale"
                        key={'Ficher'}
                        errorMessage={formErrors?.ficher_principale}
                        defaultValue={exercice ? baseUrl(exercice.ficher_principale) : undefined}
                    />
                </div>
                <HeadingSmall title="Informations sur la exercice :" />
                <div className="grid grid-cols-1 gap-4">
                    <Input
                        label="Titre de la exercice"
                        name="titre"
                        defaultValue={exercice?.titre || ""}
                        icon={BookOpen}
                        errorMessage={formErrors?.titre}
                    />
                    <div>
                        <textarea
                            id="message"
                            rows={4}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Écrivez ici une description pour cette exercice..."
                            name="description"
                            defaultValue={exercice?.exercice_description}
                        >
                        </textarea>
                        <InputError message={formErrors?.description} />
                    </div>
                </div>
                <Input
                    label="Fichier de support"
                    name="fichier_support"
                    icon={FileText}
                    iconColor="text-amber-500"
                    type="file"
                    errorMessage={formErrors?.fichier_support}
                />
                <div className="space-y-4">
                    <CheckInput
                        label="Rendre la exercice visible aux étudiants"
                        description="Cocher cette case pour publier la exercice."
                        name="published"
                        defaultValue={published}
                    />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                    {handleCloseModal !== undefined &&
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="px-2 py-1 sm:px-4 smpy-2 _classe text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <X className='inline-block w-5 h-5 me-1' />
                            Annuler
                        </button>
                    }
                    <button
                        type="submit"
                        disabled={isStudent}
                        className="px-2 py-1 sm:px-4 smpy-2 _classe bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center disabled:bg-blue-400"
                    >
                        {action.isLoading || action.isUpdating ?
                            <div className="w-5 h-5 me-1 inline-block border-4 border-white border-t-transparent rounded-full animate-spin"></div> :
                            <>
                                {exercice ?
                                    <PenBox className='inline-block w-5 h-5 me-1' /> :
                                    <Check className='inline-block w-5 h-5 me-1' />
                                }
                            </>
                        }
                        {exercice ? 'Modifier' : 'Ajouter'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ExerciceForm;