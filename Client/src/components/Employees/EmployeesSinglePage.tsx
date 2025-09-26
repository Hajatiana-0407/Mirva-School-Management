import { useDispatch, useSelector } from "react-redux"
import { getEmployeState } from "./redux/EmployeSlice"
import { AppDispatch } from "../../Redux/store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeByMatricule } from "./redux/EmployeAsyncThunk";
import Loading from "../ui/Loading";
import Page_404 from "../Page_404";
import { ArrowLeft, Award, BadgeInfo, CalendarDays, Focus, Globe, Home, PenBox, Phone, Tag, Target, User, Workflow } from "lucide-react";
import { baseUrl, getAge, getShortDate, NumberFormat } from "../../Utils/Utils";
import { InfoBlock } from "../Registrations/Registration";
import { PhotoComponent } from "../Students/StudentSinglePage";
import Modal from "../Modal";
import { getAppState } from "../../Redux/AppSlice";
import EmployeForm from "../Forms/EmployeForm";
import HeadingSmall from "../ui/HeadingSmall";
import { typeBgColors, typeIcons } from "./Employees";
import clsx from "clsx";

const EmployeesSinglePage = () => {
    const { id } = useParams();
    const { error, single: { data: employee, action }, action: { isUpdating } } = useSelector(getEmployeState);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { hiddeTheModalActive } = useSelector(getAppState);

    useEffect(() => {
        if (id) {
            dispatch(getEmployeByMatricule(id as string));
        }
    }, [dispatch, isUpdating]);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Modal
    useEffect(() => {
        if (showModal && hiddeTheModalActive) {
            handleCloseModal();
        }
    }, [hiddeTheModalActive]);

    const Icon = typeIcons[employee?.type as string];
    const IconClasse = typeBgColors[employee?.type as string];


    // ! Gestion des erreurs 
    if (action.isLoading) return <Loading />
    if (error) return <Page_404 message={error as string} />
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                    <ArrowLeft className="h-6 w-6 inline-block me-1 cursor-pointer" onClick={() => navigate(-1)} />
                    {employee?.nom.toUpperCase()} {employee?.prenom} ( {employee?.matricule_personnel} )
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

                    {/* PHOTO D' IDENTITE */}
                    <div className="relative flex flex-col items-center justify-center">
                        <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center justify-center w-[15.9rem] h-[15.9rem] rounded-md bg-gray-100 border-2 border-dashed border-gray-300 hover:bg-gray-200 transition-all">
                            {employee?.photo ? (
                                <img src={baseUrl(employee?.photo)} alt="Photo" className="w-52 h-52 rounded-md object-cover" />
                            ) : (
                                <div className="flex flex-col justify-center items-center">
                                    <Focus className="w-20 h-20 text-gray-400 mb-1" />
                                    <span className="text-gray-400 text-sm">Aucune photo trouvé</span>
                                </div>
                            )}
                        </label>
                    </div>

                    {/* Identité + infos importantes */}
                    <div className="flex-1 grid grid-cols-1 gap-3">
                        <InfoBlock
                            icon={<User className="w-6 h-6 text-blue-500" />}
                            label="Nom & Prénom"
                            value={
                                <span className="text-blue-700 font-semibold">
                                    {employee?.nom} {employee?.prenom}
                                </span>
                            }
                        />
                        <InfoBlock
                            icon={<CalendarDays className="w-6 h-6 text-purple-500" />}
                            label="Naissance"
                            value={`${employee?.date_naissance} - ${employee?.lieu_naissance}`}
                        />
                        <InfoBlock
                            icon={<Globe className="w-6 h-6 text-blue-400" />}
                            label="CIN / Numéro passeport"
                            value={employee?.numero_cin}
                        />
                        <InfoBlock
                            icon={<BadgeInfo className="w-6 h-6 text-blue-400" />}
                            label="État civil"
                            value={
                                <div>
                                    {employee?.nationalite.toUpperCase()} •
                                    <span className="text-orange-600"> {getAge(employee?.date_naissance as string)} Ans  </span> • {employee?.engagement}
                                </div>
                            }
                        />
                    </div>

                </div>
                <div className="grid">
                    <InfoBlock
                        icon={<Tag className="w-6 h-6 text-green-600" />}
                        label="Matricule"
                        value={
                            <span className="text-blue-700 font-semibold">
                                {employee?.matricule_personnel}
                            </span>
                        }
                        important
                    />
                </div>

                {/* Coordonnées */}
                <div>

                    <div className="mb-2">
                        <HeadingSmall title="Information sur les coordonner :" />
                    </div>
                    <div className="grid gap-5">


                        <InfoBlock
                            icon={<Phone className="w-6 h-6 text-teal-500" />}
                            label="Téléphone & Email"
                            value={
                                <span className="text-blue-700 font-semibold">
                                    {employee?.telephone} • {employee?.email}
                                </span>
                            }
                        />
                        <InfoBlock
                            icon={<Home className="w-6 h-6 text-orange-500" />}
                            label="Adresse"
                            value={employee?.addresse}
                        />
                    </div>
                </div>

                {/* Informations professionnelles */}
                <div>
                    <div className="col-span-2 mb-2">
                        <HeadingSmall title="Informations professionnelles :" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InfoBlock
                            icon={<Workflow className={'w-6 h-6 text-cyan-500'} />}
                            label="Poste"
                            value={employee?.type}
                            important
                        />
                        <InfoBlock
                            icon={<Home className="w-6 h-6 text-orange-500" />}
                            label="Salaire de base"
                            value={NumberFormat(employee?.salaire_base as number) + " Ar"}
                            important
                        />
                        <div className="col-span-2 grid gap-4">
                            <InfoBlock
                                icon={<Phone className="w-6 h-6 text-teal-500" />}
                                label="Années de service"
                                value={
                                    <span className="font-semibold flex gap-1">
                                        {getAge(employee?.date_embauche as string)} Ans de Service •
                                        <span className="text-blue-500 text-sm font-normal">
                                            {getShortDate(employee?.date_embauche as string)}
                                        </span>
                                    </span>
                                }
                            />
                            <InfoBlock
                                icon={<Target className="w-6 h-6 text-orange-500" />}
                                label="Spécialisation"
                                value={employee?.specialisation}
                            />
                            <InfoBlock
                                icon={<Award className="w-6 h-6 text-red-500" />}
                                label="Certicicats"
                                value={employee?.certification}
                            />
                        </div>
                    </div>
                </div>

                {/* Urgence */}
                <div className="grid  gap-2">
                    <HeadingSmall title="Urgence :" />
                    <InfoBlock
                        icon={<Phone className="w-6 h-6 text-indigo-500" />}
                        label="Contact d’urgence"
                        value={
                            <span className="text-blue-700 font-semibold flex flex-col">
                                {employee?.urgence_nom} • {employee?.urgence_tel}
                                <span className="text-sm text-blue-500">
                                    {employee?.urgence_email}
                                </span>
                            </span>
                        }
                        important
                    />
                </div>

                {/* Piece jointe */}
                {!!employee?.pc_cin &&
                    <PhotoComponent url={baseUrl(employee?.pc_cin)} label="Photocopie CIN" />
                }

            </div>

            <Modal
                isOpen={showModal}
                onClose={handleCloseModal}
                title={employee ? `${employee.nom.toUpperCase()} ${employee.prenom} ( ${employee.matricule_personnel?.toUpperCase()} )` : 'Nouvelle employée'}
                size='lg'
            >
                <EmployeForm editingEmployees={employee} handleClose={handleCloseModal} />
            </Modal>
        </div >
    )
}

export default EmployeesSinglePage