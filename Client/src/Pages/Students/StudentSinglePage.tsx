import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { ClasseType, levelType, ParentType, StudentInitialValue, StudentType } from "../../Utils/Types";
import { useDispatch, useSelector } from "react-redux";
import { getStudent, updateStudent } from "./redux/StudentAsyncThunk";
import { AppDispatch } from "../../Redux/store";
import Loading from "../../Components/ui/Loading";
import { baseUrl } from "../../Utils/Utils";
import { InfoBlock } from "../Registrations/Registration";
import { Activity, ArrowLeft, CalendarDays, Check, ChevronDown, ChevronUp, FolderOpen, Globe, GraduationCap, HeartPulse, Home, Mail, MapPin, PenBox, Phone, Tag, User, UserCheck, X } from "lucide-react";
import Modal from "../Modal";
import { object, string } from "yup";
import useForm from "../../Hooks/useForm";
import Input from "../../Components/ui/Input";
import InputError from "../../Components/ui/InputError";
import { getStudentState } from "./redux/StudentSlice";
import { getAppState } from "../../Redux/AppSlice";
import clsx from "clsx";
import ImageProfile from "../../Components/ui/ImageProfile";
export type StudentDetailsType = StudentType & ParentType & levelType & ClasseType;

// Validation de donnée avec yup 
const StudentSchema = object({
    // Élève
    nom: string().required('Le nom est obligatoire.'),
    prenom: string().required('Le prénom est obligatoire.'),
    sexe: string().required('Le sexe est obligatoire.'),
    date_naissance: string().required("La date de naissance est obligatoire."),
    lieu_naissance: string().required("Le lieu de naissance est obligatoire."),
    adresse: string().required('L\'adresse est obligatoire.'),
    nationalite: string().required('La nationalité est obligatoire.'),
});
const StudentSinglePage = () => {
    const { id: matricule } = useParams();
    const [student, setStudent] = useState<StudentDetailsType | null>(null);
    const [isLoading, setisLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false)
    const navigate = useNavigate();
    const { hiddeTheModalActive } = useSelector(getAppState);
    const { error: formUpdateError } = useSelector(getStudentState)
    // ? Modale
    const [showModal, setShowModal] = useState(false);
    const { onSubmite, formErrors } = useForm<StudentType>(StudentSchema, StudentInitialValue);
    const dispatch: AppDispatch = useDispatch();
    const [sexe, setSexe] = useState({ homme: false, femme: true });

    useEffect(() => {
        if (student) {
            setSexe(student?.sexe === 'Homme' ? { homme: true, femme: false } : { homme: false, femme: true });
        }
    }, [matricule])

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData) => {
            dispatch(updateStudent({ student: validateData, id: student?.id_eleve as number }));
            setIsUpdating(true);
        }, e)
    }

    
    useEffect(() => {
        if (matricule !== '') {
            dispatch(getStudent(matricule as string)).then((action) => {
                if (getStudent.pending.match(action)) {
                    setisLoading(true);
                }
                if (getStudent.fulfilled.match(action)) {
                    setisLoading(false);
                    setIsUpdating(false);
                    setStudent(action.payload as StudentDetailsType)
                }
            }).catch((action) => {
                setisLoading(false);
                console.error(`Erreur lors la recuperation de l\'étudiant ${matricule}`, action.payload);
            })
        }
    }, [matricule, isUpdating]);
    // Modal
    useEffect(() => {
        if (showModal && hiddeTheModalActive) {
            handleCloseModal();
        }
    }, [hiddeTheModalActive]);

    if (isLoading) return <Loading />
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                    <ArrowLeft className="h-6 w-6 inline-block me-1 cursor-pointer" onClick={() => navigate(-1)} />
                    {student?.nom.toUpperCase()} {student?.prenom} ( {student?.matricule_etudiant} )
                </h1>
                <button
                    onClick={() => {
                        setShowModal(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
                >
                    <PenBox className="w-4 h-4" />
                    <span>Modifié</span>
                </button>
            </div>
            <div className="space-y-4">

                {/* Bloc principal : Photo + Identité */}
                <div className="flex gap-6 items-start">
                    {/* PHOTO D IDENTITE */}
                    <div className='w-[15.2rem] h-[15.2rem]'>
                        <ImageProfile url={student?.photo} isInput={false} />
                    </div>

                    {/* Identité + infos importantes */}
                    <div className="flex-1 grid grid-cols-1 gap-3">
                        <InfoBlock
                            icon={<User className="w-6 h-6 text-blue-500" />}
                            label="Nom & Prénom"
                            value={
                                <span className="text-blue-700 font-semibold">
                                    {student?.nom} {student?.prenom}
                                </span>
                            }
                        />
                        <InfoBlock
                            icon={<CalendarDays className="w-6 h-6 text-purple-500" />}
                            label="Naissance"
                            value={`${student?.date_naissance} - ${student?.lieu_naissance}`}
                        />
                        <InfoBlock
                            icon={<Globe className="w-6 h-6 text-blue-400" />}
                            label="Nationalité"
                            value={student?.nationalite}
                        />

                        {/* Niveau & Classe */}
                        <InfoBlock
                            icon={<GraduationCap className="w-6 h-6 text-green-600" />}
                            label="Niveau & Classe"
                            value={
                                <span className="text-blue-700 font-semibold">
                                    {student?.niveau && student.denomination ? `${student.niveau} • ${student.denomination}` : ''}
                                </span>
                            }
                        />
                    </div>
                </div>

                <div className="space-y-4 ">
                    <InfoBlock
                        icon={<Tag className="w-6 h-6 text-green-600" />}
                        label="Matricule"
                        value={
                            <span className="text-blue-700 font-semibold">
                                {student?.matricule_etudiant}
                            </span>
                        }
                    />


                </div>

                {/* Coordonnées */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InfoBlock
                        icon={<Home className="w-6 h-6 text-orange-500" />}
                        label="Adresse"
                        value={student?.adresse}
                    />
                    <InfoBlock
                        icon={<Phone className="w-6 h-6 text-teal-500" />}
                        label="Téléphone & Email"
                        value={
                            <span className="text-blue-700 font-semibold">
                                {student?.telephone} • {student?.email}
                            </span>
                        }
                    />
                </div>

                {/* Parents */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InfoBlock
                        icon={<User className="w-6 h-6 text-blue-500" />}
                        label="Père"
                        value={`${student?.nom_pere} • ${student?.profession_pere}`}
                    />
                    <InfoBlock
                        icon={<User className="w-6 h-6 text-pink-500" />}
                        label="Mère"
                        value={`${student?.nom_mere} • ${student?.profession_mere}`}
                    />
                    <div className="col-span-2">
                        <InfoBlock
                            icon={<Home className="w-6 h-6 text-orange-500" />}
                            label="Adresse des parents"
                            value={student?.parent_adresse}
                        />
                    </div>
                </div>

                {/* Santé + Urgence */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InfoBlock
                        icon={<HeartPulse className="w-6 h-6 text-red-500" />}
                        label="Maladies"
                        value={student?.maladies}
                    />
                    <InfoBlock
                        icon={<Phone className="w-6 h-6 text-indigo-500" />}
                        label="Contact d’urgence"
                        value={
                            <span className="text-blue-700 font-semibold">
                                {student?.urgence_nom} • {student?.urgence_tel}
                            </span>
                        }
                    />
                </div>


                {/* Piece jointe */}
                {student?.pc_act_naissance != '' &&
                    <PhotoComponent url={baseUrl(student?.pc_act_naissance)} label="Acte de naissance" />
                }
                {student?.pc_pi != '' &&
                    <PhotoComponent url={baseUrl(student?.pc_pi)} label="CIN" />
                }

                {student?.bulletin != '' &&
                    <PhotoComponent url={baseUrl(student?.bulletin)} label="Bulletin" />
                }
            </div>


            <Modal
                isOpen={showModal}
                onClose={handleCloseModal}
                title={student ? 'Modifier la matière' : 'Nouvelle matière'}
                size='lg'
            >
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <InputError message={formUpdateError} />
                    {/* Information personnel */}
                    <div className="flex flex-col sm:flex-row gap-5 space-y-2">
                        {/* PHOTO D IDENTITE */}
                        <div className='w-[15.2rem] h-[15.2rem]'>
                            <ImageProfile url={student?.photo} isInput={false} />
                        </div>

                        <div className='flex-1 space-y-4'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label='Nom'
                                    name='nom'
                                    defaultValue={student?.nom || ''}
                                    icon={User}
                                    errorMessage={formErrors?.nom}
                                />
                                <Input
                                    label='Prénom'
                                    name='prenom'
                                    defaultValue={student?.prenom || ''}
                                    icon={UserCheck}
                                    errorMessage={formErrors?.prenom}
                                />
                                <Input
                                    label='Date de naissance'
                                    name='date_naissance'
                                    defaultValue={student?.date_naissance || ''}
                                    icon={CalendarDays}
                                    errorMessage={formErrors?.date_naissance} type='date'
                                />
                                <Input
                                    label='Lieu de naissance'
                                    name='lieu_naissance'
                                    defaultValue={student?.lieu_naissance || ''}
                                    icon={MapPin}
                                    errorMessage={formErrors?.lieu_naissance}
                                />
                            </div>
                            <div className='w-full'>
                                <Input
                                    label='Adresse complète'
                                    name='adresse'
                                    defaultValue={student?.adresse || ''}
                                    icon={Home}
                                    errorMessage={formErrors?.adresse}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label='Téléphone'
                                    name='telephone'
                                    defaultValue={student?.telephone || ''}
                                    icon={Phone}
                                    errorMessage={formErrors?.telephone}
                                />
                                <Input
                                    label='Email'
                                    name='email'
                                    defaultValue={student?.email || ''}
                                    icon={Mail}
                                    errorMessage={formErrors?.email}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-6 px-1 py-2">
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name='sexe'
                                    value='Homme'
                                    checked={sexe.homme}
                                    onChange={(e) => { setSexe({ homme: e.target.checked, femme: !e.target.checked }) }}
                                    className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-gray-700">Homme</span>
                            </label>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name='sexe'
                                    value='Femme'
                                    checked={sexe.femme}
                                    onChange={(e) => { setSexe({ homme: !e.target.checked, femme: e.target.checked }) }}
                                    className="form-checkbox h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                                />
                                <span className="ml-2 text-gray-700">Femme</span>
                            </label>
                        </div>
                        <Input
                            label='Nationalité'
                            name='nationalite'
                            defaultValue={student?.nationalite || ''}
                            icon={Globe}
                            errorMessage={formErrors?.nationalite}
                        />
                    </div>
                    <div className='space-y-4'>
                        {/* Alergies ou Maladies chroniques   */}
                        <h2 className='text-sm text-gray-500 italic'>Autres informations : </h2>
                        <Input
                            label='Alergies ou Maladies chroniques '
                            name='maladies'
                            defaultValue={student?.maladies || ''}
                            icon={Activity} errorMessage={formErrors?.maladies}
                        />
                        <Input
                            label='Personne à contacter en cas d’urgence'
                            name='urgence_nom' defaultValue={student?.urgence_nom || ''}
                            icon={User}
                            errorMessage={formErrors?.urgence_nom}
                        />
                        <Input
                            label='Lien avec l’élève (urgence)'
                            name='urgence_lien'
                            defaultValue={student?.urgence_lien || ''}
                            icon={UserCheck} errorMessage={formErrors?.urgence_lien}
                        />
                        <Input
                            label='Téléphone urgence'
                            name='urgence_tel'
                            defaultValue={student?.urgence_tel || ''}
                            icon={Phone} errorMessage={formErrors?.urgence_tel}
                        />

                        <Input
                            label='Copie de l’acte de naissance'
                            name='acte_naissance'
                            defaultValue={student?.pc_act_naissance || ''}
                            icon={FolderOpen}
                            iconColor='text-amber-500'
                            type='file' />

                        <Input
                            label='Copie de la pièce d’identité'
                            name='piece_identite'
                            defaultValue={student?.pc_pi || ''} icon={FolderOpen}
                            iconColor='text-amber-500'
                            type='file'
                        />
                        <Input
                            label='Bulletins scolaires / dernier diplôme'
                            name='bulletin'
                            defaultValue={student?.bulletin || ''}
                            icon={FolderOpen}
                            iconColor='text-amber-500'
                            type='file'
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
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {student ?
                                <PenBox className='inline-block w-5 h-5 me-1' /> :
                                <Check className='inline-block w-5 h-5 me-1' />
                            }

                            {student ? 'Modifier' : 'Ajouter'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div >
    )
}
export default StudentSinglePage

export const PhotoComponent = ({ url = '', label = 'photo' }: { url: string, label?: string }) => {
    const [isShow, setIsShow] = useState(false)
    return (
        <div className={clsx({
            'h-[5rem]': !isShow
        }, "w-full p-6 border rounded bg-white max-h-[24rem] relative overflow-hidden transition-all duration-700")} >
            <a href={url} target="_blank" className="absolute top-2 left-4 italic px-2 rounded-full bg-green-200 hover:underline cursor-pointer"> {label} </a>
            <button
                className="absolute top-2 right-4 italic px-4 border border-gray-300 rounded-full bg-gray-200 hover:bg-gray-300 translate-all duration-150 cursor-pointer"
                onClick={() => setIsShow(v => !v)}
            >
                {isShow ? <ChevronUp /> : <ChevronDown />}
            </button>
            <div className={clsx({
                'h-[2rem] overflow-hidden': !isShow,
                'overflow-auto': isShow,
            }, "w-full max-h-[18rem] border")} >
                <img src={url} className="w-full mx-auto" alt={label} />
            </div>
        </div>
    )
}