import { useDispatch, useSelector } from "react-redux";
import { getEmployeState } from "./redux/EmployeSlice";
import { AppDispatch } from "../../Redux/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeByMatricule } from "./redux/EmployeAsyncThunk";
import Loading from "../../Components/ui/Loading";
import Page_404 from "../Page_404";
import {
    Award,
    BadgeInfo,
    CalendarDays,
    Globe,
    PenBox,
    Phone,
    Tag,
    Target,
    Workflow,
    BookOpenText,
    Mail,
    MapPin,
    GraduationCap,
    DollarSign,
    Clock4,
} from "lucide-react";
import { baseUrl, getAge, getShortDate, NumberFormat } from "../../Utils/Utils";
import DocumentImage from "../../Components/DocumentImage";
import Modal from "../Modal";
import { getAppState } from "../../Redux/AppSlice";
import EmployeForm from "../../Components/Forms/EmployeForm";
import HeadingSmall from "../../Components/ui/HeadingSmall";
import ImageProfile from "../../Components/ui/ImageProfile";
import { useHashPermission } from "../../Hooks/useHashPermission";
import Title from "../../Components/ui/Title";
import { getTeacherByMatricule } from "../Teachers/redux/TeacherAsyncThunk";
import { getTeacherState } from "../Teachers/redux/TeachersSlice";
import { AssignationType } from "../TeacherSubject";




// Nouveau composant pour la fiche identité stylée
const EmployeeIdentityCard = ({ employee }: { employee: any }) => (
    <div className="rounded-lg bg-light border border-secondary-200 p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0">
                <div className="w-56 h-56">
                    <ImageProfile isInput={false} url={employee?.photo} />
                </div>
            </div>
            <div className="flex-1 space-y-4">
                <div>
                    <h1 className="text-2xl font-bold text-secondary-900">{employee?.nom} {employee?.prenom}</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <Tag className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-secondary-600">{employee?.matricule_personnel}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-secondary-100 shadow-sm">
                        <Workflow className="w-5 h-5 text-primary-600" />
                        <div>
                            <div className="text-sm text-secondary-500">Poste</div>
                            <div className="font-semibold text-secondary-900">{employee?.type}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-secondary-100 shadow-sm">
                        <CalendarDays className="w-5 h-5 text-purple-600" />
                        <div>
                            <div className="text-sm text-secondary-500">Âge</div>
                            <div className="font-semibold text-secondary-900">
                                {getAge(employee?.date_naissance as string)} ans
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-secondary-100 shadow-sm">
                        <Globe className="w-5 h-5 text-green-600" />
                        <div>
                            <div className="text-sm text-secondary-500">Nationalité</div>
                            <div className="font-semibold text-secondary-900">{employee?.nationalite?.toUpperCase()}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-secondary-100 shadow-sm">
                        <BadgeInfo className="w-5 h-5 text-orange-600" />
                        <div>
                            <div className="text-sm text-secondary-500">Engagement</div>
                            <div className="font-semibold text-secondary-900">{employee?.engagement}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Composant pour les informations de contact
const ContactInfo = ({ employee }: { employee: any }) => (
    <div className="rounded-lg bg-white border border-secondary-200 p-6 space-y-4">
        <HeadingSmall title="Informations de contact" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                    <Phone className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                    <div className="text-sm text-secondary-500">Téléphone</div>
                    <div className="font-semibold text-secondary-900">{employee?.telephone || "Non renseigné"}</div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                    <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                    <div className="text-sm text-secondary-500">Email</div>
                    <div className="font-semibold text-secondary-900">{employee?.email || "Non renseigné"}</div>
                </div>
            </div>

            <div className="flex items-center gap-3 md:col-span-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                    <div className="text-sm text-secondary-500">Adresse</div>
                    <div className="font-semibold text-secondary-900">{employee?.addresse || "Non renseignée"}</div>
                </div>
            </div>
        </div>
    </div>
);

// Composant pour les informations professionnelles
const ProfessionalInfo = ({ employee }: { employee: any }) => (
    <div className="rounded-lg bg-white border border-secondary-200 p-6">
        <HeadingSmall title="Informations professionnelles" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg border border-primary-200">
                <DollarSign className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary-900">{NumberFormat(employee?.salaire_base as number)} Ar</div>
                <div className="text-sm text-primary-700">Salaire de base</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                <Clock4 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-900">
                    {getAge(employee?.date_embauche as string)}
                </div>
                <div className="text-sm text-green-700">Années de service</div>
                <div className="text-xs text-green-600 mt-1">
                    depuis {getShortDate(employee?.date_embauche as string)}
                </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-purple-900 truncate">
                    {employee?.specialisation || "Non spécifié"}
                </div>
                <div className="text-sm text-purple-700">Spécialisation</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-orange-900 truncate">
                    {employee?.certification || "Aucun"}
                </div>
                <div className="text-sm text-orange-700">Certifications</div>
            </div>
        </div>
    </div>
);

// Composant pour le suivi des paiements
// const PaymentTracker = () => (
//     <div className="rounded-lg bg-white border border-secondary-200 p-6">
//         <HeadingSmall title="Suivi des paiements" />

//         <div className="grid grid-cols-3 gap-4 mb-6">
//             <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
//                 <CheckCircle2 className="w-6 h-6 mx-auto text-green-600 mb-2" />
//                 <div className="text-2xl font-bold text-green-900">
//                     {dummyPayments.filter(p => p.statut === "payé").length}
//                 </div>
//                 <div className="text-sm text-green-700 font-medium">Payés</div>
//             </div>

//             <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//                 <AlertTriangle className="w-6 h-6 mx-auto text-yellow-600 mb-2" />
//                 <div className="text-2xl font-bold text-yellow-900">
//                     {dummyPayments.filter(p => p.statut === "retard").length}
//                 </div>
//                 <div className="text-sm text-yellow-700 font-medium">Retards</div>
//             </div>

//             <div className="text-center p-4 bg-secondary-50 border border-secondary-200 rounded-lg">
//                 <Clock className="w-6 h-6 mx-auto text-secondary-600 mb-2" />
//                 <div className="text-2xl font-bold text-secondary-900">
//                     {dummyPayments.filter(p => p.statut === "en attente").length}
//                 </div>
//                 <div className="text-sm text-secondary-700 font-medium">En attente</div>
//             </div>
//         </div>

//         <div className="space-y-3">
//             {dummyPayments.map((payment) => (
//                 <div
//                     key={payment.id}
//                     className={clsx(
//                         "flex items-center justify-between p-4 rounded-lg border transition-all duration-200",
//                         {
//                             "bg-green-50 border-green-200": payment.statut === "payé",
//                             "bg-yellow-50 border-yellow-200": payment.statut === "retard",
//                             "bg-secondary-50 border-secondary-200": payment.statut === "en attente",
//                         }
//                     )}
//                 >
//                     <div className="flex items-center gap-3">
//                         <div className={clsx(
//                             "w-3 h-3 rounded-full",
//                             {
//                                 "bg-green-500": payment.statut === "payé",
//                                 "bg-yellow-500": payment.statut === "retard",
//                                 "bg-secondary-400": payment.statut === "en attente",
//                             }
//                         )} />
//                         <div>
//                             <div className="font-semibold text-secondary-900">{payment.mois}</div>
//                             <div className="text-sm text-secondary-500">
//                                 {payment.date ? getShortDate(payment.date) : "À venir"}
//                             </div>
//                         </div>
//                     </div>

//                     <div className="text-right">
//                         <div className="font-bold text-secondary-900">{NumberFormat(payment.montant)} Ar</div>
//                         <div className={clsx(
//                             "text-xs font-medium px-2 py-1 rounded-full",
//                             {
//                                 "bg-green-200 text-green-800": payment.statut === "payé",
//                                 "bg-yellow-200 text-yellow-800": payment.statut === "retard",
//                                 "bg-secondary-200 text-secondary-800": payment.statut === "en attente",
//                             }
//                         )}>
//                             {payment.statut}
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     </div>
// );

// Composant pour les assignations (enseignants)
const AssignmentsSection = ({assignations } : { assignations: AssignationType[]}) => (
    <div className="rounded-lg bg-white border border-secondary-200 p-6">
        <HeadingSmall title="Assignations" />
        {assignations.length === 0 ? (
            <div className="text-center py-8 text-secondary-500">
                <GraduationCap className="w-12 h-12 mx-auto mb-3 text-secondary-300" />
                <p>Aucune assignation pour le moment</p>
            </div>
        ) : (
            <div className="space-y-3">
                {assignations.map((assignment , idx ) => (
                    <div
                        key={idx + '__assignation'}
                        className="flex items-center gap-4 p-4 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors duration-200"
                    >
                        <div className="p-2 bg-primary-100 rounded-lg">
                            <BookOpenText className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold text-secondary-900">{assignment.matiere}</div>
                            <div className="text-sm text-secondary-600">
                                {assignment.matiere} - {assignment.classe} • {assignment.heures}h/semaine
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

// Composant pour les contacts d'urgence
const EmergencyContact = ({ employee }: { employee: any }) => (
    <div className="rounded-lg bg-light border border-red-200 p-6">
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
                <Phone className="w-5 h-5 text-red-600" />
            </div>
            <div>
                <h3 className="font-semibold text-red-900">Contact d'urgence</h3>
                <p className="text-sm text-red-700">Personne à contacter en cas d'urgence</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <div className="text-sm text-red-600">Nom</div>
                <div className="font-semibold text-red-900">{employee?.urgence_nom || "Non renseigné"}</div>
            </div>
            <div>
                <div className="text-sm text-red-600">Lien</div>
                <div className="font-semibold text-red-900">{employee?.urgence_lien?.toUpperCase() || "Non renseigné"}</div>
            </div>
            <div>
                <div className="text-sm text-red-600">Téléphone</div>
                <div className="font-semibold text-red-900">{employee?.urgence_tel || "Non renseigné"}</div>
            </div>
            <div>
                <div className="text-sm text-red-600">Email</div>
                <div className="font-semibold text-red-900">{employee?.urgence_email || "Non renseigné"}</div>
            </div>
        </div>
    </div>
);

const EmployeesSinglePage = () => {
    const { id } = useParams();
    const { error, single: { data: simpleEmploye, action }, datas: employees } = useSelector(getEmployeState);
    const { single: { data: teacher, action: teacherAction }, error: teacherError } = useSelector(getTeacherState);
    const dispatch: AppDispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const { hiddeTheModalActive } = useSelector(getAppState);
    const permission = useHashPermission({ redirect: true });

    const isTeacher = employees.some(employee => employee.matricule_personnel?.toLowerCase() == id?.toLowerCase() && employee.type?.toLowerCase() == 'enseignant');


    useEffect(() => {
        if (id) {
            isTeacher ? dispatch(getTeacherByMatricule(id as string)) : dispatch(getEmployeByMatricule(id as string));
        }
    }, [dispatch, id]);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (showModal && hiddeTheModalActive) {
            handleCloseModal();
        }
    }, [hiddeTheModalActive]);

    if (action.isLoading || teacherAction.isLoading) return <Loading />;
    if (error || teacherError) return <Page_404 message={isTeacher ? teacherError : error} />;

    // Construction du details
    const employee: typeof teacher = isTeacher ? teacher : simpleEmploye;


    // Titre pour section 
    const title = isTeacher ? `Fiche employé - ${teacher?.nom?.toUpperCase()} ${teacher?.prenom}` : `Fiche employé - ${employee?.nom?.toUpperCase()} ${employee?.prenom}`;
    return (
        <div className="space-y-6">
            <Title
                title={title}
                description="Informations détaillées et suivi de l'employé"
            >
                {permission.update &&
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-primary-600 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-primary-700 transition-all duration-200"
                    >
                        <PenBox className="w-4 h-4" />
                        <span>Modifier</span>
                    </button>
                }
            </Title>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Colonne principale */}
                <div className="xl:col-span-2 space-y-6">
                    <EmployeeIdentityCard employee={employee} />
                    <ContactInfo employee={employee} />
                    <ProfessionalInfo employee={employee} />
                    <EmergencyContact employee={employee} />

                    {/* Pièces jointes */}
                    {employee?.pc_cin && (
                        <div className="rounded-lg bg-white border border-secondary-200 p-6">
                            <HeadingSmall title="Documents" />
                            <div className="mt-4">
                                <DocumentImage url={baseUrl(employee?.pc_cin)} label="Photocopie CIN" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Colonne latérale */}
                <div className="space-y-6">
                    {/* <PaymentTracker /> */}
                    {isTeacher && employee?.assignations && <AssignmentsSection assignations={employee.assignations} />}
                </div>
            </div>

            {/* Modal édition */}
            <Modal
                isOpen={showModal}
                onClose={handleCloseModal}
                title={`Modifier - ${employee?.nom?.toUpperCase()} ${employee?.prenom}`}
                size='lg'
            >
                <EmployeForm editingEmployees={employee} handleClose={handleCloseModal} />
            </Modal>
        </div>
    );
};

export default EmployeesSinglePage;