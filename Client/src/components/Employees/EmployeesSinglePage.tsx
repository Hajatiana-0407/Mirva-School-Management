import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../Utils/Utils';
import { EmployeeType, TypePersonnelType } from '../../Utils/Types';
import { getEmployeState } from './redux/EmployeSlice';
import { BookOpen, User, Users, Shield, Brush, Library, Calculator, Truck, Mail, Phone, MapPin, Calendar, HeartPulse, CreditCard, ArrowBigLeft, Archive } from 'lucide-react';
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
                        <ArrowBigLeft className="w-8 h-8 inline-block cursor-pointer  mr-2"
                            onClick={() => window.history.back()}
                        />
                    </span>
                    Fiche Employé
                </h1>
            </div>
            <div className=" mx-auto bg-white rounded-2xl shadow-xl p-8">

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Photo */}
                    <div className=" flex flex-col">
                        <div className="w-48 h-48 rounded-xl bg-gradient-to-br from-blue-50 to-gray-100 border-4 border-blue-200 overflow-hidden flex  shadow-md">
                            <img
                                src={baseUrl(employee?.photo)}
                                alt={`${employee?.nom} ${employee?.prenom}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className={`mt-5 w-max px-4 py-1 rounded-full flex items-center gap-2 text-base font-semibold shadow-sm ${color}`}>
                            {Icon && <Icon className="w-5 h-5" />}
                            {types?.[employee?.id_type_personnel as number] || 'Type inconnu'}
                            <span className={`px-2 py-1 rounded-full text-sm flex gap-2 items-center ${colorClass}`}>
                                {icon}
                                {statusLabel}
                            </span>
                        </span>
                    </div>
                    {/* Infos */}
                    <div className="flex-1  space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <User className="w-7 h-7 text-blue-400" />
                            {employee?.nom} {employee?.prenom}
                        </h2>
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
                <div className='flex gap-2 my-5'>
                    <span>Salaire de base : </span>
                    <span className='font-semibold'>  {parseFloat(employee?.salaire_base?.toString() as string).toLocaleString("fr-FR")} Ar</span>
                </div>
                <div className='flex gap-2'>
                    <span>Date d'embauche : </span>
                    <span className='font-semibold'>
                        {employee?.date_embauche ? new Date(employee?.date_embauche).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }) : 'N/A'}
                    </span>
                </div>
                {/* Pièce d'identité si dispo */}
                {employee?.pc_cin && (
                    <div className="mt-10">
                        <h3 className="font-semibold mb-3 flex items-center gap-2 text-gray-700">
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