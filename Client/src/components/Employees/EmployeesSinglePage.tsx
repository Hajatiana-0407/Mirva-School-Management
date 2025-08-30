import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../Utils/Utils';
import { EmployeeType, TypePersonnelType } from '../../Utils/Types';
import { getEmployeState } from './redux/EmployeSlice';
import { BookOpen, User, Users, Shield, Brush, Library, Calculator, Truck, Mail, Phone, MapPin, Calendar, HeartPulse, CreditCard, Archive, DollarSign, Clock, ChevronLeft } from 'lucide-react';
import { getTypeEmployeesState } from '../../Redux/Other/slices/TypeEmployeesSlice';

const EmployeesSinglePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { datas: employees } = useSelector(getEmployeState);
    const { datas: typeEmployees } = useSelector(getTypeEmployeesState);



    // Création des couleurs dynamiquement
    const typeBgColors: Record<string, string> = {};
    const typeIcons: Record<string, any> = {};
    const types: Record<string, string> = {};
    typeEmployees.map((typeEmp: TypePersonnelType) => {
        switch (typeEmp.type) {
            case "Enseignant":
                typeBgColors[typeEmp.id_type_personnel as number] = 'bg-blue-100 text-blue-800';
                typeIcons[typeEmp.id_type_personnel as number] = BookOpen;
                types[typeEmp.id_type_personnel as number] = typeEmp.type;
                break;
            case "Secrétaire":
                typeBgColors[typeEmp.id_type_personnel as number] = 'bg-green-100 text-green-800';
                typeIcons[typeEmp.id_type_personnel as number] = User;
                types[typeEmp.id_type_personnel as number] = typeEmp.type;
                break;
            case "Gardin":
                typeBgColors[typeEmp.id_type_personnel as number] = 'bg-yellow-100 text-yellow-800';
                typeIcons[typeEmp.id_type_personnel as number] = Shield;
                types[typeEmp.id_type_personnel as number] = typeEmp.type;
                break;
            case "Surveillant":
                typeBgColors[typeEmp.id_type_personnel as number] = 'bg-purple-100 text-purple-800';
                typeIcons[typeEmp.id_type_personnel as number] = Users;
                types[typeEmp.id_type_personnel as number] = typeEmp.type;
                break;
            case "Agent d’entretien":
                typeBgColors[typeEmp.id_type_personnel as number] = 'bg-pink-100 text-pink-800';
                typeIcons[typeEmp.id_type_personnel as number] = Brush;
                types[typeEmp.id_type_personnel as number] = typeEmp.type;
                break;
            case "Bibliothécaire":
                typeBgColors[typeEmp.id_type_personnel as number] = 'bg-indigo-100 text-indigo-800';
                typeIcons[typeEmp.id_type_personnel as number] = Library;
                types[typeEmp.id_type_personnel as number] = typeEmp.type;
                break;
            case "Comptable":
                typeBgColors[typeEmp.id_type_personnel as number] = 'bg-orange-100 text-orange-800';
                typeIcons[typeEmp.id_type_personnel as number] = Calculator;
                types[typeEmp.id_type_personnel as number] = typeEmp.type;
                break;
            case "Chauffeur":
                typeBgColors[typeEmp.id_type_personnel as number] = 'bg-teal-100 text-teal-800';
                typeIcons[typeEmp.id_type_personnel as number] = Truck;
                types[typeEmp.id_type_personnel as number] = typeEmp.type;
                break;
            default:
                typeBgColors[typeEmp.id_type_personnel as number] = 'bg-gray-200 text-gray-800';
                typeIcons[typeEmp.id_type_personnel as number] = User;
                types[typeEmp.id_type_personnel as number] = typeEmp.type;
                break;
        }
    });

    // Recherche de l'employé par id
    const employee: EmployeeType | undefined = employees.find((emp: EmployeeType) => emp.id_personnel?.toString() === id);

    if (!employee) {
        return (
            <div className="flex items-center justify-center h-96">
                <span className="text-gray-500 text-lg">Aucun employé trouvé.</span>
            </div>
        );
    }

    // Définir l'icône et la couleur selon le statut
    let icon = null;
    let colorClass = '';
    const statusLower = employee?.status?.toLocaleLowerCase();

    if (statusLower === 'actif') {
        icon = <HeartPulse className="w-4 h-4 text-green-600" />;
        colorClass = 'bg-green-50 text-green-800';
    } else if (statusLower === 'suspendu') {
        icon = <Archive className="w-4 h-4 text-yellow-600" />;
        colorClass = 'bg-yellow-50 text-yellow-800';
    } else {
        icon = <Archive className="w-4 h-4 text-red-600" />;
        colorClass = 'bg-red-50 text-red-800';
    }

    // Mettre la première lettre en majuscule
    const statusLabel = employee?.status ? employee?.status?.charAt(0).toUpperCase() + employee?.status.slice(1).toLowerCase() : "Inconnu";;


    const Icon = typeIcons[employee?.id_type_personnel as number] || User;
    const color = typeBgColors[employee?.id_type_personnel as number] || 'bg-gray-200 text-gray-800';

    return (
        <div className='space-y-6'>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                    <span>
                        <ChevronLeft className="w-8 h-8 inline-block cursor-pointer  mr-2"
                            onClick={() => window.history.back()}
                        />
                    </span>
                    Fiche Employé
                </h1>
            </div>
            <div className=" mx-auto bg-white rounded-2xl shadow-xl p-4 space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2 max-sm:justify-center">
                    <User className="w-7 h-7 text-blue-400" />
                    {employee?.nom} {employee?.prenom}
                </h2>
                <div className="flex max-sm:justify-center flex-wrap gap-4">
                    {/* Photo */}
                    <div className="flex flex-col max-w-52">
                        <div className="w-48 h-48 rounded-xl relative bg-gradient-to-br from-blue-50 to-gray-100 border-4 border-blue-200 overflow-hidden flex  shadow-md">
                            <img
                                src={baseUrl(employee?.photo)}
                                alt={`${employee?.nom} ${employee?.prenom}`}
                                className="w-full h-full object-cover"
                            />
                            <span className={`px-2 py-1 absolute bottom-0 right-0  text-sm flex gap-2 items-center rounded-ms rounded-tl border ${colorClass}`}>
                                {icon}
                                {statusLabel}
                            </span>
                        </div>
                        <span className={`mt-5 w-max px-4 py-1 min-w-48 text rounded-full flex items-center justify-center gap-2 text-base font-semibold shadow-sm  ${color}`}>
                            {Icon && <Icon className="w-5 h-5" />}
                            {types?.[employee?.id_type_personnel as number] || 'Type inconnu'}
                        </span>
                    </div>

                    {/* Information sur le personnel */}
                    <div className="space-y-6" >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {employee?.email && (
                                <div className="flex items-center gap-3 text-gray-700 bg-gray-50 rounded-lg px-4 py-2 shadow-sm">
                                    <Mail className="w-5 h-5 text-blue-400" />
                                    <span>{employee?.email}</span>
                                </div>
                            )}
                            {employee?.telephone && (
                                <div className="flex items-center gap-3 text-gray-700 bg-gray-50 rounded-lg px-4 py-2 shadow-sm">
                                    <Phone className="w-5 h-5 text-green-400" />
                                    <span>{employee?.telephone}</span>
                                </div>
                            )}
                            {employee?.addresse && (
                                <div className="flex items-center gap-3 text-gray-700 bg-gray-50 rounded-lg px-4 py-2 shadow-sm">
                                    <MapPin className="w-5 h-5 text-pink-400" />
                                    <span>{employee?.addresse}</span>
                                </div>
                            )}
                            {employee?.date_naissance && (
                                <div className="flex items-center gap-3 text-gray-700 bg-gray-50 rounded-lg px-4 py-2 shadow-sm">
                                    <Calendar className="w-5 h-5 text-purple-400" />
                                    <span>{employee?.date_naissance}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-3 text-gray-700 bg-gray-50 rounded-lg px-4 py-2 shadow-sm">
                                <User className="w-5 h-5 text-blue-400" />
                                <span>{employee?.sexe}</span>
                            </div>
                            {employee?.engagement && (
                                <div className="flex items-center gap-3 text-gray-700 bg-gray-50 rounded-lg px-4 py-2 shadow-sm">
                                    <HeartPulse className="w-5 h-5 text-red-400" />
                                    <span>{employee?.engagement}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='flex flex-wrap max-sm:justify-center gap-6'>
                    <div className="relative w-full max-w-xs">
                        <div className="absolute -top-3 -left-2  flex items-center gap-2 px-4 py-1 rounded-md border border-green-500text-gray-700 bg-gray-50 border-orange-500 font-semibold ">
                            <Clock className='text-orange-500' />
                            <span className="text-base">Date d'embauche</span>
                        </div>
                        <div className="rounded-xl border-2 border-red-300 bg-white shadow-md py-4 px-1 flex flex-col items-center">
                            <span className="text-xl font-bold font-mono tracking-widest text-gray-900 mt-2">
                                {employee?.date_embauche ? new Date(employee?.date_embauche).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) : 'N/A'}
                            </span>
                        </div>
                    </div>
                    <div className="relative w-full max-w-xs">
                        <div className="absolute -top-3 -left-2  flex items-center gap-2 px-4 py-1 rounded-md border border-green-500text-gray-700 bg-gray-50 border-green-500 font-semibold ">
                            <DollarSign className='text-green-500' />
                            <span className="text-base">Salaire de base</span>
                        </div>
                        <div className="rounded-xl border-2 border-blue-300 bg-white shadow-md py-4 px-1 flex flex-col items-center">
                            <span className="text-3xl font-bold font-mono tracking-widest text-gray-900 mt-2">
                                {parseFloat(employee?.salaire_base?.toString() as string).toLocaleString("fr-FR")} AR
                            </span>
                        </div>
                    </div>
                </div>
                {/* Pièce d'identité si dispo */}
                {employee?.pc_cin && (
                    <div className="mt-10">
                        <h3 className="font-semibold mb-3 flex items-center max-sm:justify-center gap-2 text-gray-700">
                            <CreditCard className="w-5 h-5 text-indigo-400" />
                            Pièce d'identité
                        </h3>
                        <div className="w-full flex flex-col sm:flex-row gap-6 items-center">
                            <img
                                src={baseUrl(employee?.pc_cin)}
                                alt="Pièce d'identité"
                                className="w-72 h-44 object-cover rounded-lg border shadow"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeesSinglePage;