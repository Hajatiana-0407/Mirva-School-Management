import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { ClasseType, levelType, ParentType, StudentType } from "../../Utils/Types";
import { useDispatch } from "react-redux";
import { getStudent } from "./redux/StudentAsyncThunk";
import { AppDispatch } from "../../Redux/store";
import Loading from "../ui/Loading";
import { baseUrl } from "../../Utils/Utils";
import { InfoBlock } from "../Registrations/Registration";
import { ArrowLeft, CalendarDays, Focus, Globe, GraduationCap, HeartPulse, Home, Phone, Tag, User } from "lucide-react";
type StudentDetailsType = StudentType & ParentType & levelType & ClasseType;
const StudentSinglePage = () => {
    const { id: matricule } = useParams();
    const [student, setStudent] = useState<StudentDetailsType | null>(null);
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(false)
    const navigate = useNavigate();

    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {

        if (matricule !== '') {
            dispatch(getStudent(matricule as string)).then((action) => {
                if (getStudent.pending.match(action)) {
                    setisLoading(true);
                }
                if (getStudent.fulfilled.match(action)) {
                    setisLoading(false);
                    setStudent(action.payload as StudentDetailsType)
                }
            }).catch((action) => {
                setisLoading(false);
                setError(true);
                console.error(`Erreur lors la recuperation de l\'étudiant ${matricule}`, action.payload);
            })
        }

    }, [matricule])

    if (isLoading) return <Loading />
    if (error) return <div className="px-5 py-5 text-center text-gray-400">
        <h2>Une erreur c'est produite</h2>
    </div>
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                    <ArrowLeft className="h-6 w-6 inline-block me-1 cursor-pointer" onClick={() => navigate(-1)} />
                    Inscription des élèves
                </h1>
            </div>
            <div className="space-y-4">

                {/* Bloc principal : Photo + Identité */}
                <div className="flex gap-6 items-start">

                    {/* PHOTO D IDENTITE */}
                    <div className="relative flex flex-col items-center justify-center">
                        <label
                            htmlFor="photo-upload"
                            className="cursor-pointer flex flex-col items-center justify-center w-[11.8rem] h-[11.8rem] rounded-md bg-gray-100 border-2 border-dashed border-gray-300 hover:bg-gray-200 transition-all"
                        >
                            {
                                student?.photo
                                    ? <img
                                        src={baseUrl(student?.photo)}
                                        alt="Photo"
                                        className="w-[11rem] h-[11rem] rounded-md object-cover"
                                    />
                                    : <div className="flex flex-col justify-center items-center">
                                        <Focus className="w-20 h-20 text-gray-400 mb-1" />
                                        <span className="text-gray-400 text-sm">Aucune photo trouvé</span>
                                    </div>
                            }


                        </label>
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
                {student?.pc_pi != '' &&
                    <div className="w-full p-6 border rounded bg-white max-h-96 py-10 px-4 relative">
                        <a href={baseUrl(student?.pc_pi)} target="_blank" className="absolute top-2 left-4 italic px-2 rounded-full bg-red-200 hover:underline cursor-pointer">CIN</a>
                        <div className="overflow-auto max-h-80 w-full border">
                            <img src={baseUrl(student?.pc_pi)} className="w-full mx-auto" alt="Photocopie CIN" />
                        </div>
                    </div>
                }



                {student?.pc_act_naissance != '' &&
                    <div className="w-full p-6 border rounded bg-white max-h-96 py-10 px-4 relative">
                        <a href={baseUrl(student?.pc_act_naissance)} target="_blank" className="absolute top-2 left-4 italic px-2 rounded-full bg-blue-200 hover:underline cursor-pointer">Acte de naissance</a>
                        <div className="overflow-auto max-h-80 w-full border">
                            <img src={baseUrl(student?.pc_act_naissance)} className="w-full mx-auto" alt="Photocopie acte de naissana" />
                        </div>
                    </div>
                }
                {student?.bulletin != '' &&
                    <div className="w-full p-6 border rounded bg-white max-h-96 py-10 px-4 relative">
                        <a href={baseUrl(student?.bulletin)} target="_blank" className="absolute top-2 left-4 italic px-2 rounded-full bg-green-200 hover:underline cursor-pointer">Bulletin</a>
                        <div className="overflow-auto max-h-80 w-full border">
                            <img src={baseUrl(student?.bulletin)} className="w-full mx-auto" alt="Bulletin" />
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}
export default StudentSinglePage