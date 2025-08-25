import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, Edit, Archive, Eye, BookOpen, User, Users, Shield, Brush, Library, Calculator, Truck, Camera, HeartPulse } from 'lucide-react';
import Table from '../Table';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import { date, object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeState } from './redux/EmployeSlice';
import { employeeInitialValue, EmployeeType, TypePersonnelType } from '../../Utils/Types';
import { AppDispatch } from '../../Redux/store';
import { createEmployees, getAllEmployees, updateEmployees } from './redux/EmployeAsyncThunk';
import useForm from '../../Hooks/useForm';
import InputError from '../ui/InputError';
import { getTypeEmployeesState } from '../../Redux/Other/slices/TypeEmployeesSlice';
import { baseUrl } from '../../Utils/Utils';

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
  addresse: string().required('La adresse est obligatoire.'),
  telephone: string().required('Le téléphone est obligatoire.'),
});

const Employees: React.FC = () => {
  // Nom du fichier pièce d'identité (verso)
  const [ciVersoFileName, setCiVersoFileName] = useState<string>("");

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingEmployees, setEditingEmployees] = useState<any>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [teacherToArchive, setTeacherToArchive] = useState<any>(null);
  const [sexe, setSexe] = useState({
    homme: false,
    femme: true
  })
  const { datas: TypesEmployees } = useSelector(getTypeEmployeesState);

  // Aperçu de la photo uploadée
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // *** //
  const { datas: employees, action } = useSelector(getEmployeState);
  const { onSubmite, formErrors } = useForm<EmployeeType>(EmployeSchema, employeeInitialValue);

  const dispatch: AppDispatch = useDispatch();
  // *** //


  //Handlers
  const handleEdit = (employee: any) => {
    setEditingEmployees(employee);
    setPhotoPreview(employee?.photo || null);
    setShowModal(true);
  };

  const handleArchive = (employee: any) => {
    setTeacherToArchive(employee);
    setShowConfirmDialog(true);
  };

  const handleConfirmArchive = () => {
    console.log('Archivage de:', teacherToArchive);
    setShowConfirmDialog(false);
    setTeacherToArchive(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEmployees(null);
    setPhotoPreview(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmite((validateData: EmployeeType) => {
      editingEmployees ? dispatch(updateEmployees({ datas: validateData, id: editingEmployees?.id_personnel as number })) : dispatch(createEmployees(validateData))
    } , e );
  };




// TABLEAUX 
  const actions = [
    { icon: Eye, label: 'Voir', onClick: (item: any) => console.log('Voir', item), color: 'blue' },
    { icon: Edit, label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive, label: 'Archiver', onClick: handleArchive, color: 'red' },
  ];


  const columns = [
    {
      key: 'nom', label: 'Profil', render: (value: string, item: EmployeeType) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <img src={  baseUrl(item.photo ) } alt='' className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{value} {item.prenom}</div>
            <div className="text-sm text-gray-500">{item.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'type', label: 'Fonction', render: (employeType: string) => {
        const type = employeType || 'Autre';
        const color = typeBgColors[type] || 'bg-gray-200 text-gray-800';
        const Icon = typeIcons[type];
        return (
          <span className={`px-2 py-1 rounded-full text-sm flex items-center gap-1 ${color}`}>
            {Icon && <Icon className="w-4 h-4 mr-1" />}
            {type}
          </span>
        );
      }
    },
    { key: 'addresse', label: 'Addrèsse' },
    { key: 'telephone', label: 'Téléphone' },
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

      {/* Modal pour ajouter/modifier */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingEmployees ? "Modifier l'employé" : 'Nouvel employé'}
        size='lg'
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-5  space-y-2">
            <div className="relative flex flex-col items-center justify-center">
              <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center justify-center w-60 h-60 rounded-md bg-gray-100 border-2 border-dashed border-gray-300 hover:bg-gray-200 transition-all">
                {photoPreview ? (
                  <img src={photoPreview} alt="Photo" className="w-56 h-56 rounded-md object-cover" />
                ) : (
                  <>
                    <Camera className="w-8 h-8 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500 text-center ">Ajouter une photo de profil </span>
                  </>
                )}
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  name='photo'
                  onChange={e => {
                    const file = e.target.files && e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPhotoPreview(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
            <div className='flex-1 space-y-4' >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  name='nom'
                  defaultValue={editingEmployees?.nom || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <InputError message={formErrors?.nom} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <input
                  type="text"
                  name='prenom'
                  defaultValue={editingEmployees?.prenom || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <InputError message={formErrors?.prenom} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sexe</label>
                <div className="flex items-center gap-6 px-1 py-2">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name='sexe'
                      value='Homme'
                      checked={editingEmployees ? editingEmployees?.sexe === 'Homme' : sexe.homme}
                      onChange={(e) => { setSexe({ homme: e.target.checked, femme: !e.target.checked }) }}
                      className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">Homme</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name='sexe'
                      value='Femme'
                      checked={editingEmployees ? editingEmployees?.sexe === 'Homme' : sexe.femme}
                      onChange={(e) => { setSexe({ homme: !e.target.checked, femme: e.target.checked }) }}
                      className="form-checkbox h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                    />
                    <span className="ml-2 text-gray-700">Femme</span>
                  </label>
                </div>
              </div>

            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
              <input
                type="date"
                name='date_naissance  '
                defaultValue={editingEmployees?.date_naissance || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputError message={formErrors?.date_naissance} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input
                type="text"
                name='addresse'
                defaultValue={editingEmployees?.addresse || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder='Tananarivo'
              />
              <InputError message={formErrors?.addresse} />

            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input
                type="tel"
                name='telephone'
                defaultValue={editingEmployees?.telephone || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder='+243 000 000 000'
              />
              <InputError message={formErrors?.telephone} />

            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name='email'
                defaultValue={editingEmployees?.email || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder='exemple@gmail.com'
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Engagement</label>
              <div className="relative">
                <select
                  defaultValue={editingEmployees?.engagement || ''}
                  name='engagement'
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10"
                >
                  <option value="Marié">Célibataire</option>
                  <option value="Marié">Marié</option>
                  <option value="Divorcé">Divorcé</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <HeartPulse className="w-4 h-4" />
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fonction</label>
              <div className="relative">
                <select
                  defaultValue={editingEmployees?.type || ''}
                  name='type_personnel'
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10"
                >
                  {TypesEmployees && TypesEmployees.map((type: TypePersonnelType) => (
                    <option
                      key={type.id_type_personnel}
                      value={type.id_type_personnel}>
                      {type.type}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <User className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Photocopie CIN  */}
            <div className=''>
              <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="pc_cin">Pièce d'identité </label>
              <div className="flex w-full flex-col items-start gap-2">
                <label htmlFor="pc_cin" className="flex w-full items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                  <Camera className="w-5 h-5 " />
                  <span className=" text-sm font-medium">
                    {ciVersoFileName ? ciVersoFileName : "Choisir un fichier (SVG, PNG, JPG, GIF)"}
                  </span>
                </label>
                <input
                  id="pc_cin"
                  name='pc_cin'
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files && e.target.files[0];
                    if (file) {
                      setCiVersoFileName(file.name);
                    } else {
                      setCiVersoFileName("");
                    }
                  }}
                />
                <p className="text-xs text-gray-500 ml-1">Max 800x400px</p>
              </div>

            </div>
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
              {editingEmployees ? 'Modifier' : 'Ajouter'}
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