import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getStudentByMatricule } from "./redux/StudentAsyncThunk";
import { AppDispatch } from "../../Redux/store";
import Loading from "../../Components/ui/Loading";
import { baseUrl } from "../../Utils/Utils";
import InfoBlock from "../../Components/InfoBlock";
import { CalendarDays, Globe, GraduationCap, HeartPulse, Home, PenBox, Phone, Tag, User } from "lucide-react";
import Modal from "../Modal";
import { getStudentState } from "./redux/StudentSlice";
import { getAppState } from "../../Redux/AppSlice";
import ImageProfile from "../../Components/ui/ImageProfile";
import StudentForm from "../../Components/Forms/StudentForm";
import HeadingSmall from "../../Components/ui/HeadingSmall";
import DocumentImage from "../../Components/DocumentImage";
import { useHashPermission } from "../../Hooks/useHashPermission";
import Title from "../../Components/ui/Title";

const StudentSinglePage = () => {
    const { id: matricule } = useParams();
    const { hiddeTheModalActive } = useSelector(getAppState);
    const { single: { data: student, action: { isLoading } } } = useSelector(getStudentState)
    // ? Modale
    const [showModal, setShowModal] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const permission = useHashPermission(  { redirect : true  });


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
        <div className="space-y-4 md:space-y-6">
            <Title
                title={`${student?.nom.toUpperCase()} ${student?.prenom} ( ${student?.matricule_etudiant} )`}
                description="Consultez les informations personnelles et scolaires."
            >
                {permission.update &&
                    <button
                        onClick={() => {
                            setShowModal(true);
                        }}
                        className="bg-blue-600 text-white px-2 py-1 sm:px-4 sm:py-2 _classe rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
                    >
                        <PenBox className="w-4 h-4" />
                        <span className="max-md:hidden-susp">Modifié</span>
                    </button>
                }
            </Title>
            <div className="space-y-4">

                {/* Bloc principal : Photo + Identité */}
                <div className="flex gap-4 flex-col md:flex-row items-center">
                    {/* PHOTO D IDENTITE */}
                    <div className='w-[16.2rem] h-[16.2rem]'>
                        <ImageProfile url={student?.photo} isInput={false} />
                    </div>
                    {/* Identité + infos importantes */}
                    <div className="flex-1 grid grid-cols-1 gap-3 w-full">
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
                                    {student?.niveau && student.denomination ? `${student.niveau} • ${student.denomination}` : '--'}
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
                <div className="space-y-2">
                    <div className="col-span-2">
                        <HeadingSmall title="Coordonnées : " />
                    </div>
                    <div className="space-y-4">
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
                </div>


                {/* Informations sur les parents */}
                <div className="space-y-2">
                    <div className="col-span-2">
                        <HeadingSmall title="Informations sur les parent : " />
                    </div>
                    <div className="space-y-4">
                        {student?.mere &&
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoBlock
                                    icon={<User className="w-6 h-6 text-cyan-500" />}
                                    label={
                                        <span>
                                            Mère
                                            {student.mere.contact_urgence == '1' &&
                                                <span className="text-red-500 font-bold"> ( Contact d'urgence ) </span>
                                            }
                                        </span>
                                    }
                                    value={
                                        <span className="font-semibold">
                                            {student.mere.nom} {student.mere.prenom}
                                        </span>
                                    }
                                    important={student.mere.contact_urgence == "1"}
                                />
                                <InfoBlock
                                    icon={<Phone className="w-6 h-6 text-teal-500" />}
                                    label={
                                        <span>
                                            Contact de la mère
                                            {student.mere.contact_urgence == '1' &&
                                                <span className="text-red-500 font-bold"> ( Contact d'urgence ) </span>
                                            }
                                        </span>
                                    }
                                    value={
                                        <span className="text-blue-700 font-semibold">
                                            {student.mere.telephone} • {student?.mere.email}
                                        </span>
                                    }

                                    important={student.mere.contact_urgence == "1"}
                                />
                            </div>
                        }
                        {student?.pere &&
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoBlock
                                    icon={<User className="w-6 h-6 text-cyan-500" />}
                                    label={
                                        <span>
                                            Père
                                            {student.pere.contact_urgence == '1' &&
                                                <span className="text-red-500 font-bold"> ( Contact d'urgence ) </span>
                                            }
                                        </span>
                                    }
                                    value={
                                        <span className="font-semibold">
                                            {student.pere.nom} {student.pere.prenom}
                                        </span>
                                    }
                                    important={student.pere.contact_urgence == "1"}
                                />
                                <InfoBlock
                                    icon={<Phone className="w-6 h-6 text-teal-500" />}
                                    label={
                                        <span>
                                            Contact du père
                                            {student.pere.contact_urgence == '1' &&
                                                <span className="text-red-500 font-bold"> ( Contact d'urgence ) </span>
                                            }
                                        </span>
                                    }
                                    value={
                                        <span className="text-blue-700 font-semibold">
                                            {student.pere.telephone} • {student?.pere.email}
                                        </span>
                                    }

                                    important={student.pere.contact_urgence == "1"}
                                />
                            </div>
                        }
                        {student?.tuteur &&
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoBlock
                                    icon={<User className="w-6 h-6 text-cyan-500" />}
                                    label={
                                        <span>
                                            Tuteur
                                            {student.tuteur.contact_urgence == '1' &&
                                                <span className="text-red-500 font-bold"> ( Contact d'urgence ) </span>
                                            }
                                        </span>
                                    }
                                    value={
                                        <span className="font-semibold">
                                            {student.tuteur.nom} {student.tuteur.prenom}
                                        </span>
                                    }
                                    important={student.tuteur.contact_urgence == "1"}
                                />
                                <InfoBlock
                                    icon={<Phone className="w-6 h-6 text-teal-500" />}
                                    label={
                                        <span>
                                            Contact du Tuteur
                                            {student.tuteur.contact_urgence == '1' &&
                                                <span className="text-red-500 font-bold"> ( Contact d'urgence ) </span>
                                            }
                                        </span>
                                    }
                                    value={
                                        <span className="text-blue-700 font-semibold">
                                            {student.tuteur.telephone} • {student?.tuteur.email}
                                        </span>
                                    }

                                    important={student.tuteur.contact_urgence == "1"}
                                />
                            </div>
                        }
                    </div>
                </div>


                {/* Santé + Urgence */}
                {student?.maladies &&
                    <InfoBlock
                        icon={<HeartPulse className="w-6 h-6 text-red-500" />}
                        label="Maladies"
                        value={student?.maladies}
                    />
                }


                {/* Piece jointe */}
                <div className="space-y-2">
                    <div>
                        <HeadingSmall title="Pièces jointes :" />
                    </div>
                    <div className="space-y-4">
                        {student?.pc_act_naissance != '' &&
                            <DocumentImage url={baseUrl(student?.pc_act_naissance)} label="Acte de naissance" />
                        }
                        {student?.pc_pi != '' &&
                            <DocumentImage url={baseUrl(student?.pc_pi)} label="CIN" />
                        }

                        {student?.bulletin != '' &&
                            <DocumentImage url={baseUrl(student?.bulletin)} label="Bulletin" />
                        }
                    </div>
                </div>
            </div>


            <Modal
                isOpen={showModal}
                onClose={handleCloseModal}
                title={student ? `${student.nom} ${student.prenom} ( ${student.matricule_etudiant} )` : 'Nouvelle matière'}
                size='lg'
            >
                <StudentForm editingStudent={student} handleCloseModal={handleCloseModal} />
            </Modal>
        </div >
    )
}
export default StudentSinglePage

