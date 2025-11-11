import { useDispatch, useSelector } from "react-redux"
import { getEmployeState } from "./redux/EmployeSlice"
import { AppDispatch } from "../../Redux/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeByMatricule } from "./redux/EmployeAsyncThunk";
import Loading from "../../Components/ui/Loading";
import Page_404 from "../Page_404";
import { Award, BadgeInfo, CalendarDays, Globe, Home, PenBox, Phone, Tag, Target, User, Workflow } from "lucide-react";
import { baseUrl, getAge, getShortDate, NumberFormat } from "../../Utils/Utils";
import InfoBlock from "../../Components/InfoBlock";
import DocumentImage from "../../Components/DocumentImage";
import Modal from "../Modal";
import { getAppState } from "../../Redux/AppSlice";
import EmployeForm from "../../Components/Forms/EmployeForm";
import HeadingSmall from "../../Components/ui/HeadingSmall";
import ImageProfile from "../../Components/ui/ImageProfile";
import { useHashPermission } from "../../Hooks/useHashPermission";
import Title from "../../Components/ui/Title";

const EmployeesSinglePage = () => {
    const { id } = useParams();
    const { error, single: { data: employee, action } } = useSelector(getEmployeState);
    const dispatch: AppDispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const { hiddeTheModalActive } = useSelector(getAppState);
    const permission = useHashPermission(  { redirect : true  });

    useEffect(() => {
        if (id) {
            dispatch(getEmployeByMatricule(id as string));
        }
    }, [dispatch]);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Modal
    useEffect(() => {
        if (showModal && hiddeTheModalActive) {
            handleCloseModal();
        }
    }, [hiddeTheModalActive]);


    // ! Gestion des erreurs 
    if (action.isLoading) return <Loading />
    if (error) return <Page_404 message={error as string} />
    return (
        <div className="space-y-4 md:space-y-6">
            <Title
                title={`${employee?.nom.toUpperCase()} ${employee?.prenom} (${employee?.matricule_personnel})`}
                description="Consultez les informations complètes de l’employé."
            >
                {permission.update &&
                    <button
                        onClick={() => {
                            setShowModal(true);
                        }}
                        className="bg-blue-600 text-white px-2 py-1 sm:px-4 smpy-2 _classe rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
                    >
                        <PenBox className="w-4 h-4" />
                        <span className="max-md:hidden-susp">Modifié</span>
                    </button>
                }
            </Title>
            <div className="space-y-4">

                {/* Bloc principal : Photo + Identité */}
                <div className="flex gap-4 md:gap-6 items-start">

                    {/* Photo de profile  */}
                    <div className='w-[16.2rem] h-[16.2rem]'>
                        <ImageProfile isInput={false} url={employee?.photo} />
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
                        label={
                            <span>
                                {employee?.urgence_lien?.toUpperCase()}
                                <span className="text-red-500 font-bold"> ( Contact d’urgence ) </span>
                            </span>
                        }
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
                {employee?.pc_cin &&
                    <div className="space-y-4">
                        <div className="">
                            <HeadingSmall title="Pièces jointes :" />
                        </div>
                        {!!employee?.pc_cin &&
                            <DocumentImage url={baseUrl(employee?.pc_cin)} label="Photocopie CIN" />
                        }
                    </div>
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