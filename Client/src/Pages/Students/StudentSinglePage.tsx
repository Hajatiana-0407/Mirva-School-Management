import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getStudentByMatricule } from "./redux/StudentAsyncThunk";
import { AppDispatch } from "../../Redux/store";
import Loading from "../../Components/ui/Loading";
import { baseUrl } from "../../Utils/Utils";
import { InfoBlock } from "../Registrations/Registration";
import {  ArrowLeft, CalendarDays, ChevronDown, ChevronUp, Globe, GraduationCap, HeartPulse, Home,  PenBox, Phone, Tag, User} from "lucide-react";
import Modal from "../Modal";
import { getStudentState } from "./redux/StudentSlice";
import { getAppState } from "../../Redux/AppSlice";
import clsx from "clsx";
import ImageProfile from "../../Components/ui/ImageProfile";
import StudentForm from "../../Components/Forms/StudentForm";


const StudentSinglePage = () => {
    const { id: matricule } = useParams();
    const navigate = useNavigate();
    const { hiddeTheModalActive } = useSelector(getAppState);
    const { single: { data: student, action: { isLoading } } } = useSelector(getStudentState)
    // ? Modale
    const [showModal, setShowModal] = useState(false);
    const dispatch: AppDispatch = useDispatch();


    useEffect(() => {
        if (matricule) {
            dispatch(getStudentByMatricule(matricule as string));
        }
    }, [matricule])

    const handleCloseModal = () => {
        setShowModal(false);
    };


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
                            important
                        />
                    </div>
                </div>

                <div className="space-y-4 grid">
                    <InfoBlock
                        icon={<Tag className="w-6 h-6 text-green-600" />}
                        label="Matricule"
                        value={
                            <span className="text-blue-700 font-semibold">
                                {student?.matricule_etudiant}
                            </span>
                        }
                        important
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
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                </div> */}

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
                <StudentForm editingStudent={student} handleCloseModal={handleCloseModal} />
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