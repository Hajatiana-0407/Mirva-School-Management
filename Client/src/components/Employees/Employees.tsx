import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, Edit, Archive, Eye, BookOpen, User, Users, Shield, Brush, Library, Calculator, Truck } from 'lucide-react';
import Table from '../Table';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import { date, object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeState } from './redux/EmployeSlice';
import { employeeInitialValue, EmployeeType } from '../../Utils/Types';
import { AppDispatch } from '../../Redux/store';
import { getAllEmployees } from './redux/EmployeAsyncThunk';
import useForm from '../../Hooks/useForm';
import InputError from '../ui/InputError';


// Mapping des types à des couleurs de fond
const typeBgColors: Record<string, string> = {
  'Enseignant': 'bg-blue-100 text-blue-800',
  'Secrétaire': 'bg-green-100 text-green-800',
  'Gardin': 'bg-yellow-100 text-yellow-800',
  'Surveillant': 'bg-purple-100 text-purple-800',
  "Agent d’entretien": 'bg-pink-100 text-pink-800',
  'Bibliothécaire': 'bg-indigo-100 text-indigo-800',
  'Comptable': 'bg-orange-100 text-orange-800',
  'Chauffeur': 'bg-teal-100 text-teal-800',
};
// Mapping des types à des icônes Lucide
const typeIcons: Record<string, any> = {
  'Enseignant': BookOpen,
  'Secrétaire': User,
  'Gardin': Shield,
  'Surveillant': Users,
  "Agent d’entretien": Brush,
  'Bibliothécaire': Library,
  'Comptable': Calculator,
  'Chauffeur': Truck,
};

// Validation de donnée avec yup 
const EmployeSchema = object({
  nom: string().required('Le nom est obligatoire.'),
  prenom: string().required('La prénom est obligatoire.'),
  date_naissance: date().required('La date est obligatoire.'),
  sexe: string().required('Ce champ est obligatoire.'),
});

const Employees: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<any>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [teacherToArchive, setTeacherToArchive] = useState<any>(null);

  // *** //
    const { datas: employees, action , error  } = useSelector(getEmployeState);
    const { onSubmite, formErrors } = useForm<EmployeeType>(EmployeSchema, employeeInitialValue);

    const dispatch: AppDispatch = useDispatch();
  // *** //
  

  //Handlers
  const handleEdit = (teacher: any) => {
    setEditingTeacher(teacher);
    setShowModal(true);
  };

  const handleArchive = (teacher: any) => {
    setTeacherToArchive(teacher);
    setShowConfirmDialog(true);
  };

  const handleConfirmArchive = () => {
    console.log('Archivage de:', teacherToArchive);
    setShowConfirmDialog(false);
    setTeacherToArchive(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTeacher(null);
  };

  const actions = [
    { icon: Eye, label: 'Voir', onClick: (item: any) => console.log('Voir', item), color: 'blue' },
    { icon: Edit, label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive, label: 'Archiver', onClick: handleArchive, color: 'red' },
  ];


  const columns = [
    { key: 'nom', label: 'Profil'  , render: (value: string, item: EmployeeType) => (
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <img src={item.photo} alt='' className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="font-medium text-gray-900">{value} {item.prenom}</div>
          <div className="text-sm text-gray-500">{item.email}</div>
        </div>
      </div>
    ) },  
      { key: 'type', label: 'Fonction', render: (employeType: string ) => {
      const type = employeType || 'Autre';
      const color = typeBgColors[type] || 'bg-gray-200 text-gray-800';
      const Icon = typeIcons[type];
      return (
        <span className={`px-2 py-1 rounded-full text-sm flex items-center gap-1 ${color}`}>
          {Icon && <Icon className="w-4 h-4 mr-1" />}
          {type}
        </span>
      );
    } },
    { key: 'addresse', label: 'Addrèsse' },
    { key: 'telephone', label: 'Tél' },
    { key: 'sexe', label: 'Sex' },
  ];

  // Effets
    useEffect(() => {
      if (!employees.length) {
        dispatch(getAllEmployees());
      }
    }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des employés</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau employés</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un enseignant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filtres</span>
            </button>
          </div>
        </div>

        <Table
          isLoading={action.isLoading as boolean}
          data={employees}
          columns={columns}
          actions={actions}
          searchTerm={searchTerm}
        />
      </div>

      {/* Modal pour ajouter/modifier un enseignant */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingTeacher ? 'Modifier l\'enseignant' : 'Nouvel enseignant'}
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                type="text"
                defaultValue={editingTeacher?.nom || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputError message={ formErrors?.nom } />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input
                type="text"
                defaultValue={editingTeacher?.prenom || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Spécialité</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Sélectionner une spécialité</option>
              <option value="Mathématiques">Mathématiques</option>
              <option value="Français">Français</option>
              <option value="Anglais">Anglais</option>
              <option value="Histoire">Histoire</option>
              <option value="Sciences">Sciences</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              defaultValue={editingTeacher?.email || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input
              type="tel"
              defaultValue={editingTeacher?.telephone || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Actif">Actif</option>
              <option value="Congé">Congé</option>
              <option value="Suspendu">Suspendu</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingTeacher ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Dialog de confirmation */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmArchive}
        title="Archiver l'enseignant"
        message={`Êtes-vous sûr de vouloir archiver l'enseignant ${teacherToArchive?.prenom} ${teacherToArchive?.nom} ?`}
      />
    </div>
  );
};

export default Employees;