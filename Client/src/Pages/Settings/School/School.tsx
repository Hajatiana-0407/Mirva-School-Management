import { useDispatch, useSelector } from "react-redux"
import { getSchoolState } from "./redux/SchoolSlice";
import Loading from "../../../Components/ui/Loading";
import { useEffect, useState } from "react";
import { Facebook, Focus, Instagram, Linkedin, Save, Twitter, Youtube } from "lucide-react";
import Input from "../../../Components/ui/Input";
import { object, string } from "yup";
import InputError from "../../../Components/ui/InputError";
import useForm from "../../../Hooks/useForm";
import { SchoolInfoInitialValue } from "../../../Utils/Types";
import { AppDispatch } from "../../../Redux/store";
import { updateSchoolInfo } from "./redux/SchoolAsyncThunk";
import { baseUrl } from "../../../Utils/Utils";

// Validation de donnée avec yup 
const schoolInfoSchema = object({
    nom: string()
        .required('Le nom de l\'établissement est obligatoire.'),
    adresse: string()
        .required('La adresse est obligatoire.'),
    // prefix: string()
    //     .required('Veuillez ajouter un préfixe afin d’assurer l’unicité des matricules.'),
    telephone: string()
        .required('Le téléphone est obligatoire.'),
    slogan: string()
        .required('Le slogan est obligatoire.'),
});
const School = () => {
    const dispatch: AppDispatch = useDispatch()
    // State
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const { action, datas: schoolInfo } = useSelector(getSchoolState);
    const { onSubmite, formErrors } = useForm(schoolInfoSchema, SchoolInfoInitialValue);
    const [idEteblissement, setIdEteblissement] = useState<number | null>(null);

    // Effets
    useEffect(() => {
        if (schoolInfo && schoolInfo.id_etablissement) {
            setIdEteblissement(schoolInfo.id_etablissement);
        }
        if (schoolInfo && schoolInfo.logo) {
            setPhotoPreview(baseUrl(schoolInfo.logo));
        }
    }, [schoolInfo]);


    // Handlers
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite(
            (validateData) => {
                dispatch(updateSchoolInfo({ schoolInfo: validateData, id: idEteblissement as number }))
            }, e);
    }

    if (action.isLoading) return <Loading />
    return (
        <form onSubmit={handleSubmit} id="__etablissement-form" className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informations de l'établissement</h3>
            <div className="flex gap-5">
                <div className="relative flex flex-col items-center justify-center">
                    <label htmlFor="icone-upload" className="cursor-pointer flex flex-col items-center justify-center w-60 h-60 rounded-md bg-gray-100 border-2 border-dashed border-gray-500 hover:bg-gray-200 transition-all">
                        {photoPreview ? (
                            <img src={photoPreview} alt="Logo" className="w-56 h-56 rounded-md object-cover" />
                        ) : (
                            <>
                                <Focus className="w-20 h-20 text-gray-400 mb-1" />
                                <span className="text-sm text-gray-500 text-center ">Ajouter votre logo ici</span>
                            </>
                        )}
                        <input
                            id="icone-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            name='logo'
                            onChange={e => {
                                const file = e.target.files && e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setPhotoPreview(reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </label>
                </div>
                <div className="flex-1 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'établissement</label>
                        <input
                            type="text"
                            defaultValue={schoolInfo.nom || ""}
                            name="nom"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <InputError message={formErrors?.nom} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Code établissement</label>
                        <input
                            type="text"
                            defaultValue={schoolInfo.code || ""}
                            name="code"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slogan</label>
                        <input
                            type="text"
                            name="slogan"
                            defaultValue={schoolInfo.slogan || ""}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <InputError message={formErrors?.slogan} />
                    </div>
                </div>
            </div>
            <div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                    <textarea
                        rows={3}
                        name="adresse"
                        defaultValue={schoolInfo.adresse || ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <InputError message={formErrors?.adresse} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                        <input
                            type="tel"
                            name="telephone"
                            defaultValue={schoolInfo.telephone || ""}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <InputError message={formErrors?.telephone} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            defaultValue={schoolInfo.email || ""}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Déscription</label>
                    <textarea
                        rows={3}
                        name="description"
                        defaultValue={schoolInfo.description || ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Préfix ( pour les matricules ) </label>
                    <input
                        type="text"
                        defaultValue={schoolInfo.prefix || ""}
                        name="prefix"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informations sur les réseaux sociaux</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site web</label>
                <input
                    type="text"
                    name="site_web"
                    defaultValue={schoolInfo.site_web || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <Input
                    label="Facebook"
                    name="facebook"
                    defaultValue={schoolInfo.facebook || ""}
                    icon={Facebook}
                    iconColor="text-blue-600"
                />
                <Input
                    label="twitter"
                    name="twitter"
                    defaultValue={schoolInfo.twitter || ""}
                    icon={Twitter}
                    iconColor="text-blue-400"
                />
                <Input
                    label="instagram"
                    name="instagram"
                    defaultValue={schoolInfo.instagram || ""}
                    icon={Instagram}
                    iconColor="text-pink-500"
                />
                <Input
                    label="linkedin"
                    name="linkedin"
                    defaultValue={schoolInfo.linkedin || ""}
                    icon={Linkedin}
                    iconColor="text-blue-700"
                />
                <Input
                    label="youtube"
                    name="youtube"
                    defaultValue={schoolInfo.youtube || ""}
                    icon={Youtube}
                    iconColor="text-red-600"
                />
            </div>

            <div className="flex justify-end">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg space-x-2 hover:bg-blue-700 transition-colors flex items-center"
                >
                    {action.isUpdating
                        ? <div className="w-5 h-5 me-1 inline-block border-4 border-white border-t-transparent rounded-full animate-spin"></div> :
                        <Save className="w-4 h-4" />
                    }
                    <span>Enregistrer</span>
                </button>
            </div>
        </form>
    )
}

export default School