import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getStudentByMatricule } from "./redux/StudentAsyncThunk";
import { AppDispatch } from "../../Redux/store";
import Loading from "../../Components/ui/Loading";
import { baseUrl, getAge } from "../../Utils/Utils";
import Modal from "../Modal";
import { getStudentState } from "./redux/StudentSlice";
import { getAppState } from "../../Redux/AppSlice";
import ImageProfile from "../../Components/ui/ImageProfile";
import StudentForm from "../../Components/Forms/StudentForm";
import HeadingSmall from "../../Components/ui/HeadingSmall";
import DocumentImage from "../../Components/DocumentImage";
import { useHashPermission } from "../../Hooks/useHashPermission";
import Title from "../../Components/ui/Title";
import {
    CalendarDays,
    Globe,
    GraduationCap,
    HeartPulse,
    PenBox,
    Phone,
    Tag,
    User,
    Mail,
    MapPin,
    Users,
    AlertTriangle,
    BookOpen,
    Clock,
    DollarSign,
    BarChart3,
    School,
    Calendar,
    FileText,
    TrendingUp,
    AlertCircle,
} from "lucide-react";

// Composant pour la fiche identité de l'étudiant
const StudentIdentityCard = ({ student }: { student: any }) => (
    <div className="rounded-lg bg-light border border-secondary-200 p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0">
                <div className="w-56 h-56">
                    <ImageProfile isInput={false} url={student?.photo} />
                </div>
            </div>
            <div className="flex-1 space-y-4">
                <div>
                    <h1 className="text-2xl font-bold text-secondary-900">{student?.nom} {student?.prenom}</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <Tag className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-secondary-600">{student?.matricule_etudiant}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-secondary-100 shadow-sm">
                        <GraduationCap className="w-5 h-5 text-primary-600" />
                        <div>
                            <div className="text-sm text-secondary-500">Niveau & Classe</div>
                            <div className="font-semibold text-secondary-900">
                                {student?.niveau && student.denomination ? `${student.niveau} • ${student.denomination}` : 'Non assigné'}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-secondary-100 shadow-sm">
                        <CalendarDays className="w-5 h-5 text-purple-600" />
                        <div>
                            <div className="text-sm text-secondary-500">Âge</div>
                            <div className="font-semibold text-secondary-900">
                                {getAge(student?.date_naissance as string)} ans
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-secondary-100 shadow-sm">
                        <Globe className="w-5 h-5 text-green-600" />
                        <div>
                            <div className="text-sm text-secondary-500">Nationalité</div>
                            <div className="font-semibold text-secondary-900">{student?.nationalite?.toUpperCase()}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-secondary-100 shadow-sm">
                        <User className="w-5 h-5 text-orange-600" />
                        <div>
                            <div className="text-sm text-secondary-500">Lieu de naissance</div>
                            <div className="font-semibold text-secondary-900">{student?.lieu_naissance || "Non renseigné"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Composant pour les informations de contact
const ContactInfo = ({ student }: { student: any }) => (
    <div className="rounded-lg bg-white border border-secondary-200 p-6 space-y-4">
        <HeadingSmall title="Informations de contact" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                    <Phone className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                    <div className="text-sm text-secondary-500">Téléphone</div>
                    <div className="font-semibold text-secondary-900">{student?.telephone || "Non renseigné"}</div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                    <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                    <div className="text-sm text-secondary-500">Email</div>
                    <div className="font-semibold text-secondary-900">{student?.email || "Non renseigné"}</div>
                </div>
            </div>

            <div className="flex items-center gap-3 md:col-span-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                    <div className="text-sm text-secondary-500">Adresse</div>
                    <div className="font-semibold text-secondary-900">{student?.adresse || "Non renseignée"}</div>
                </div>
            </div>
        </div>
    </div>
);

// Composant pour les informations médicales
const MedicalInfo = ({ student }: { student: any }) => {
    if (!student?.maladies) return null;

    return (
        <div className="rounded-lg bg-light border border-red-200 p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                    <HeartPulse className="w-5 h-5 text-red-600" />
                </div>
                <div>
                    <h3 className="font-semibold text-red-900">Informations médicales</h3>
                    <p className="text-sm text-red-700">Conditions de santé à connaître</p>
                </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-red-100">
                <div className="font-semibold text-red-900">{student.maladies}</div>
            </div>
        </div>
    );
};

// Composant pour les informations des parents
const ParentsInfo = ({ student }: { student: any }) => (
    <div className="rounded-lg bg-white border border-secondary-200 p-6">
        <HeadingSmall title="Informations des parents et tuteur" />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
            {/* Mère */}
            {student?.mere && (
                <div className={`p-4 rounded-lg border ${student.mere.contact_urgence === '1' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
                    <div className="flex items-center gap-3 mb-3">
                        <Users className={`w-5 h-5 ${student.mere.contact_urgence === '1' ? 'text-red-600' : 'text-blue-600'}`} />
                        <div>
                            <div className="font-semibold text-secondary-900">Mère</div>
                            {student.mere.contact_urgence === '1' && (
                                <div className="flex items-center gap-1 text-xs text-red-600">
                                    <AlertTriangle className="w-3 h-3" />
                                    Contact d'urgence
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div>
                            <div className="text-secondary-500">Nom complet</div>
                            <div className="font-semibold text-secondary-900">{student.mere.nom} {student.mere.prenom}</div>
                        </div>
                        <div>
                            <div className="text-secondary-500">Téléphone</div>
                            <div className="font-semibold text-secondary-900">{student.mere.telephone || "Non renseigné"}</div>
                        </div>
                        <div>
                            <div className="text-secondary-500">Email</div>
                            <div className="font-semibold text-secondary-900">{student.mere.email || "Non renseigné"}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Père */}
            {student?.pere && (
                <div className={`p-4 rounded-lg border ${student.pere.contact_urgence === '1' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                    <div className="flex items-center gap-3 mb-3">
                        <Users className={`w-5 h-5 ${student.pere.contact_urgence === '1' ? 'text-red-600' : 'text-green-600'}`} />
                        <div>
                            <div className="font-semibold text-secondary-900">Père</div>
                            {student.pere.contact_urgence === '1' && (
                                <div className="flex items-center gap-1 text-xs text-red-600">
                                    <AlertTriangle className="w-3 h-3" />
                                    Contact d'urgence
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div>
                            <div className="text-secondary-500">Nom complet</div>
                            <div className="font-semibold text-secondary-900">{student.pere.nom} {student.pere.prenom}</div>
                        </div>
                        <div>
                            <div className="text-secondary-500">Téléphone</div>
                            <div className="font-semibold text-secondary-900">{student.pere.telephone || "Non renseigné"}</div>
                        </div>
                        <div>
                            <div className="text-secondary-500">Email</div>
                            <div className="font-semibold text-secondary-900">{student.pere.email || "Non renseigné"}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tuteur */}
            {student?.tuteur && (
                <div className={`p-4 rounded-lg border ${student.tuteur.contact_urgence === '1' ? 'bg-red-50 border-red-200' : 'bg-purple-50 border-purple-200'}`}>
                    <div className="flex items-center gap-3 mb-3">
                        <Users className={`w-5 h-5 ${student.tuteur.contact_urgence === '1' ? 'text-red-600' : 'text-purple-600'}`} />
                        <div>
                            <div className="font-semibold text-secondary-900">Tuteur</div>
                            {student.tuteur.contact_urgence === '1' && (
                                <div className="flex items-center gap-1 text-xs text-red-600">
                                    <AlertTriangle className="w-3 h-3" />
                                    Contact d'urgence
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div>
                            <div className="text-secondary-500">Nom complet</div>
                            <div className="font-semibold text-secondary-900">{student.tuteur.nom} {student.tuteur.prenom}</div>
                        </div>
                        <div>
                            <div className="text-secondary-500">Téléphone</div>
                            <div className="font-semibold text-secondary-900">{student.tuteur.telephone || "Non renseigné"}</div>
                        </div>
                        <div>
                            <div className="text-secondary-500">Email</div>
                            <div className="font-semibold text-secondary-900">{student.tuteur.email || "Non renseigné"}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
);

// Composant pour les documents
const DocumentsSection = ({ student }: { student: any }) => {
    const hasDocuments = student?.pc_act_naissance || student?.pc_pi || student?.bulletin;

    if (!hasDocuments) return null;

    return (
        <div className="rounded-lg bg-white border border-secondary-200 p-6">
            <HeadingSmall title="Documents" />
            <div className="grid grid-cols-1 gap-4 mt-4">
                {student?.pc_act_naissance && (
                    <DocumentImage url={baseUrl(student.pc_act_naissance)} label="Acte de naissance" />
                )}
                {student?.pc_pi && (
                    <DocumentImage url={baseUrl(student.pc_pi)} label="Carte d'identité" />
                )}
                {student?.bulletin && (
                    <DocumentImage url={baseUrl(student.bulletin)} label="Bulletin scolaire" />
                )}
            </div>
        </div>
    );
};

// Composant pour les statistiques de l'étudiant
const StudentStats = ({ student }: { student: any }) => {
    // Données simulées - À remplacer par vos vraies données
    const statsData = {
        retards: 3,
        absences: 5,
        paiementsEnRetard: 2,
        moyenneGenerale: 14.5,
        paiementsTotal: 12,
        paiementsPayes: 8
    };

    return (
        <div className="rounded-lg bg-white border border-secondary-200 p-6">
            <HeadingSmall title="Statistiques" />
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-3 bg-red-50 border border-red-200 rounded-lg">
                    <Clock className="w-6 h-6 text-red-600 mx-auto mb-1" />
                    <div className="text-xl font-bold text-red-900">{statsData.retards}</div>
                    <div className="text-xs text-red-700">Retards</div>
                </div>

                <div className="text-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                    <div className="text-xl font-bold text-yellow-900">{statsData.absences}</div>
                    <div className="text-xs text-yellow-700">Absences</div>
                </div>

                <div className="text-center p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <DollarSign className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                    <div className="text-xl font-bold text-orange-900">{statsData.paiementsEnRetard}</div>
                    <div className="text-xs text-orange-700">Paiements en retard</div>
                </div>

                <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
                    <div className="text-xl font-bold text-green-900">{statsData.moyenneGenerale}</div>
                    <div className="text-xs text-green-700">Moyenne générale</div>
                </div>
            </div>

            {/* Barre de progression des paiements */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex justify-between text-sm text-blue-900 mb-1">
                    <span>Progression des paiements</span>
                    <span>{statsData.paiementsPayes}/{statsData.paiementsTotal}</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(statsData.paiementsPayes / statsData.paiementsTotal) * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

// Composant pour le menu latéral des actions
const StudentActionsMenu = ({ student }: { student: any }) => {
    const menuItems = [
        {
            icon: BookOpen,
            label: "Notes et résultats",
            description: "Consulter les bulletins et notes",
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            onClick: () => console.log("Voir les notes")
        },
        {
            icon: DollarSign,
            label: "Suivi des paiements",
            description: "Historique et état des paiements",
            color: "text-green-600",
            bgColor: "bg-green-50",
            onClick: () => console.log("Voir les paiements")
        },
        {
            icon: School,
            label: "Historique des classes",
            description: "Classes fréquentées précédemment",
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            onClick: () => console.log("Voir l'historique")
        },
        {
            icon: Calendar,
            label: "Emploi du temps",
            description: "Planning des cours et activités",
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            onClick: () => console.log("Voir l'emploi du temps")
        },
        {
            icon: BarChart3,
            label: "Statistiques détaillées",
            description: "Analyses et performances",
            color: "text-indigo-600",
            bgColor: "bg-indigo-50",
            onClick: () => console.log("Voir les statistiques")
        },
        {
            icon: FileText,
            label: "Rapports disciplinaires",
            description: "Incidents et comportement",
            color: "text-red-600",
            bgColor: "bg-red-50",
            onClick: () => console.log("Voir les rapports")
        }
    ];

    return (
        <div className="space-y-4">
            <StudentStats student={student} />

            <div className="rounded-lg bg-white border border-secondary-200 p-6">
                <HeadingSmall title="Actions rapides" />
                <div className="space-y-2 mt-4">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={index}
                                onClick={item.onClick}
                                className="w-full text-left p-3 rounded-lg transition-all duration-200 
                         bg-white border border-gray-200 
                         hover:border-primary-300 hover:bg-primary-50 
                         active:bg-primary-100 active:scale-[0.98]
                         group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg transition-colors duration-200 
                                  ${item.bgColor} group-hover:bg-white`}>
                                        <Icon className={`w-5 h-5 transition-colors duration-200 
                                       ${item.color} group-hover:text-primary-600`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-secondary-900 group-hover:text-primary-900 transition-colors duration-200">
                                            {item.label}
                                        </div>
                                        <div className="text-sm text-secondary-600 group-hover:text-secondary-700 transition-colors duration-200">
                                            {item.description}
                                        </div>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const StudentSinglePage = () => {
    const { id: matricule } = useParams();
    const { hiddeTheModalActive } = useSelector(getAppState);
    const { single: { data: student, action: { isLoading } } } = useSelector(getStudentState)
    const [showModal, setShowModal] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const permission = useHashPermission({ redirect: true });

    useEffect(() => {
        if (matricule) {
            dispatch(getStudentByMatricule(matricule as string));
        }
    }, [matricule])

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (showModal && hiddeTheModalActive) {
            handleCloseModal();
        }
    }, [hiddeTheModalActive]);

    if (isLoading) return <Loading />

    return (
        <div className="space-y-6">
            <Title
                title={`Fiche étudiant - ${student?.nom?.toUpperCase()} ${student?.prenom}`}
                description="Informations détaillées et suivi de l'étudiant"
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
                    <StudentIdentityCard student={student} />
                    <ContactInfo student={student} />
                    <ParentsInfo student={student} />
                    <MedicalInfo student={student} />
                    <DocumentsSection student={student} />
                </div>

                {/* Colonne latérale */}
                <div className="space-y-6">
                    <StudentActionsMenu student={student} />
                </div>
            </div>

            <Modal
                isOpen={showModal}
                onClose={handleCloseModal}
                title={`Modifier - ${student?.nom?.toUpperCase()} ${student?.prenom}`}
                size='lg'
            >
                <StudentForm editingStudent={student} handleCloseModal={handleCloseModal} />
            </Modal>
        </div>
    )
}

export default StudentSinglePage;