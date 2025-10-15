import { BookOpen, FileText, X, PenBox, Check, GraduationCap } from "lucide-react";
import Input from "../ui/Input";
import HeadingSmall from "../ui/HeadingSmall";
import * as Yup from "yup";
import CheckInput from "../ui/CheckInput";
import VideoOrFileInput from "../ui/VideoOrFileInput";
import { LessonInitialValue, LessonType, LevelSubjectType } from "../../Utils/Types";
import useForm from "../../Hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState } from "../../Pages/Auth/redux/AuthSlice";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../Redux/store";
import { getAllLevel, getLelvelSubjectByIdNiveau } from "../../Pages/Levels/redux/LevelAsyncThunk";
import { getLevelState } from "../../Pages/Levels/redux/LevelSlice";
import Loading from "../ui/Loading";
import InputError from "../ui/InputError";
import { createLesson, updatelesson } from "../../Pages/Lessons/redux/LessonAsyncThunk";
import { getLessonState } from "../../Pages/Lessons/redux/LessonSlice";
import { baseUrl } from "../../Utils/Utils";

// Schéma de validation pour leçon
export const lessonSchema = Yup.object({
    titre: Yup.string().required("Le titre est obligatoire."),
    description: Yup.string().required("La description est obligatoire."),

    id_niveau: Yup.string().required("Le niveau est obligatoire!"),
    id_matiere: Yup.string().required("Le matière est obligatoire!")
});

type LessonFormPropsType = {
    lesson?: LessonType,
    handleCloseModal: () => void
};

const LessonForm: React.FC<LessonFormPropsType> = ({ lesson , handleCloseModal }) => {
    const { formErrors, onSubmite } = useForm(lessonSchema, LessonInitialValue)
    const { } = useSelector(getAuthState);
    const { datas: levels } = useSelector(getLevelState);
    const { action, error } = useSelector(getLessonState);
    const dispatch: AppDispatch = useDispatch();
    const [isCheckingLevel, setIsCheckingLevel] = useState(false)
    const [subjectOptions, setSubjectOptions] = useState<{ value: number, label: string }[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData: any) => {
            lesson ? dispatch(updatelesson({ lesson: validateData, id: lesson.id_lecon as number }))
                : dispatch(createLesson(validateData));
        }, e);
    }
    const getSubjectByIdLevel = (id_level: number) => {
        dispatch(getLelvelSubjectByIdNiveau(id_level))
            .unwrap()
            .then((response: LevelSubjectType[]) => {
                if (!!response) {
                    let options: any[] = [];
                    if (response.length) {
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

    const handleChangeLevel = (level_id: number) => {
        if (!level_id) return;
        getSubjectByIdLevel(level_id);
    }

    useEffect(() => {
        if (!levels.length) {
            dispatch(getAllLevel());
        }
        return () => { }
    }, [dispatch]);

    useEffect(() => {
        if (levels.length > 0 && !!levels?.[0]?.id_niveau) {
            getSubjectByIdLevel(lesson?.id_niveau || levels?.[0]?.id_niveau as number);
        }
        return () => { }
    }, [dispatch])

    // ===================== levels options ===================== //
    let levelsOptions = levels.map((level) => ({
        value: level.id_niveau as number, label: level.niveau
    }))
    // =====================  ===================== //

    const published = lesson ? (lesson.published == 0 ? false : true) : true;
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* levels  */}
            <input type="hidden" name="id_prof" value='' onChange={() => { }} />
            {lesson &&
                <input type="hidden" name="id_lecon" value={lesson?.id_lecon} onChange={() => { }} />
            }
            <InputError message={error} />
            <Input
                label="Choisissez un niveau"
                name="id_niveau"
                defaultValue={lesson?.id_niveau || levelsOptions?.[0]?.value || ''}
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
                    defaultValue={lesson?.id_matiere || subjectOptions?.[0]?.value || ''}
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
                        defaultValue={lesson ? baseUrl(lesson.ficher_principale) : undefined}
                    />
                </div>
                <HeadingSmall title="Informations sur la leçon :" />
                <div className="grid grid-cols-1 gap-4">
                    <Input
                        label="Titre de la leçon"
                        name="titre"
                        defaultValue={lesson?.titre || ""}
                        icon={BookOpen}
                        errorMessage={formErrors?.titre}
                    />
                    <div>
                        <textarea
                            id="message"
                            rows={4}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Écrivez ici une description pour cette leçon..."
                            name="description"
                            defaultValue={lesson?.lecon_description}
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
                        label="Rendre la leçon visible aux étudiants"
                        description="Cocher cette case pour publier la leçon."
                        name="published"
                        defaultValue={published}
                    />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={handleCloseModal}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <X className='inline-block w-5 h-5 me-1' />
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                    >
                        {action.isLoading || action.isUpdating ?
                            <div className="w-5 h-5 me-1 inline-block border-4 border-white border-t-transparent rounded-full animate-spin"></div> :
                            <>
                                {lesson ?
                                    <PenBox className='inline-block w-5 h-5 me-1' /> :
                                    <Check className='inline-block w-5 h-5 me-1' />
                                }
                            </>
                        }
                        {lesson ? 'Modifier' : 'Ajouter'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default LessonForm;