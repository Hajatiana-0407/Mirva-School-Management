import { useDispatch, useSelector } from "react-redux"
import Loading from "../../../../Components/ui/Loading";
import { Award, BookMarked, BookOpen, Check, Eye, Heart, PenBox, Users } from "lucide-react";
import Input from "../../../../Components/ui/Input";
import { number, object, string } from "yup";
import InputError from "../../../../Components/ui/InputError";
import useForm from "../../../../Hooks/useForm";
import Title from "../../../../Components/ui/Title";
import { AppDispatch } from "../../../../Redux/store";
import { getPresentationState } from "../../Redux/Slice/Home/PresentationSlice";
import { useHashPermission } from "../../../../Hooks/useHashPermission";
import { PresentationInitialValue } from "../../Type";
import VideoOrFileInput from "../../../../Components/ui/VideoOrFileInput";
import { baseUrl } from "../../../../Utils/Utils";
import { navigate } from "../../../../Utils/navigate";
import HeadingSmall from "../../../../Components/ui/HeadingSmall";
import { getAllPresentation, updatePresentation } from "../../Redux/AsyncThunk/HomeAsyncThunk";
import { useEffect } from "react";

// Validation de donnée avec yup 
const presentationSchema = object({
    titre: string()
        .required("Le titre est obligatoire.")
        .max(255, "Le titre ne doit pas dépasser 255 caractères."),

    description: string()
        .required("La description est obligatoire."),

    image: string()
        .nullable()
        .url("L'image doit être une URL valide.")
        .max(255, "L'image ne doit pas dépasser 255 caractères."),

    nombre_eleves: number()
        .typeError("Le nombre d'élèves doit être un nombre.")
        .min(0, "Le nombre d'élèves ne peut pas être négatif."),

    nombre_professeurs: number()
        .typeError("Le nombre de professeurs doit être un nombre.")
        .min(0, "Le nombre de professeurs ne peut pas être négatif."),

    annees_experience: number()
        .typeError("Le nombre d'années d'expérience doit être un nombre.")
        .min(0, "Les années d'expérience ne peuvent pas être négatives."),

    taux_reussite: number()
        .typeError("Le taux de réussite doit être un nombre.")
        .min(0, "Le taux de réussite doit être au minimum 0%.")
        .max(100, "Le taux de réussite ne peut pas dépasser 100%."),
});

const PresentationAdmin = () => {
    const dispatch: AppDispatch = useDispatch()
    // State
    const { action, datas: presentation, error } = useSelector(getPresentationState);
    const { onSubmite, formErrors } = useForm(presentationSchema, PresentationInitialValue);
    const permission = useHashPermission({ redirect: true });

    // Handlers
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite(
            (validateData) => {
                if (permission.update) {
                    dispatch(updatePresentation({ dataToUpdate: validateData, id: presentation.id_presentation as number }))
                }
            }, e);
    }

    useEffect(() => {
        if (!presentation?.id_presentation) {
            dispatch(getAllPresentation())
        }
        return () => { }
    }, [dispatch])

    if (action.isLoading) return <Loading />
    return (
        <div>
            <Title
                backButton={false}
                title="Présentation - Section Accueil"
                description="Gérez les slides du carrousel d’accueil : image, titre, sous-titre et lien."
            >
                <button
                    onClick={() => navigate('/?section=presentation')}
                    className="bg-orange-600 text-white px-3 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-700 transition-colors"
                >
                    <Eye className="w-5 h-5" />
                    <span>Voire le site</span>
                </button>
            </Title>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <InputError message={error} />
                <div>
                    <VideoOrFileInput
                        name="image"
                        key={'Ficher'}
                        errorMessage={formErrors?.image}
                        defaultValue={presentation?.image ? baseUrl(presentation?.image) : undefined}
                    />
                    <InputError message={formErrors?.image} />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <Input
                        label="Titre"
                        name="titre"
                        defaultValue={presentation?.titre || ""}
                        icon={BookMarked}
                        errorMessage={formErrors?.titre}
                    />
                    <div>
                        <textarea
                            id="message"
                            rows={4}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Écrivez ici une description pour cette slider..."
                            name="description"
                            defaultValue={presentation?.description}
                        >
                        </textarea>
                        <InputError message={formErrors?.description} />
                    </div>
                </div>
                <HeadingSmall title="Statistique sur la présentation :" />
                <div className="flex gap-2">
                    <Input
                        type="number"
                        label="Combien d'élève :"
                        name="nombre_eleves"
                        defaultValue={presentation?.nombre_eleves || ""}
                        icon={Users}
                        errorMessage={formErrors?.nombre_eleves}
                    />
                    <Input
                        type="number"
                        label="Combien de personnel :"
                        name="nombre_professeurs"
                        defaultValue={presentation?.nombre_professeurs || ""}
                        icon={BookOpen}
                        errorMessage={formErrors?.nombre_professeurs}
                    />
                    <Input
                        type="number"
                        label="Combien d'année d'expérience  :"
                        name="annees_experience"
                        defaultValue={presentation?.annees_experience || ""}
                        icon={Award}
                        errorMessage={formErrors?.annees_experience}
                    />
                    <Input
                        type="number"
                        label="Taux de réussite ( % ) :"
                        name="taux_reussite"
                        defaultValue={presentation?.taux_reussite || ""}
                        icon={Heart}
                        errorMessage={formErrors?.taux_reussite}
                    />
                </div>


                {/* Boutons */}
                <div className="flex justify-end space-x-3 pt-4">
                    {permission.update &&
                        <button
                            type="submit"
                            className="px-2 py-1 sm:px-4 sm:py-2 _slide bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                        >
                            {action.isLoading || action.isUpdating ?
                                <div className="w-5 h-5 me-1 inline-block border-4 border-white border-t-transparent rounded-full animate-spin"></div> :
                                <>
                                    {presentation ?
                                        <PenBox className='inline-block w-5 h-5 me-1' /> :
                                        <Check className='inline-block w-5 h-5 me-1' />
                                    }
                                </>
                            }
                            {presentation ? 'Modifier' : 'Ajouter'}
                        </button>
                    }
                </div>
            </form>
        </div>
    )
}

export default PresentationAdmin