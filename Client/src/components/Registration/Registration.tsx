import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, Edit, Archive, Eye, BookOpen, User, Users, Shield, Brush, Library, Calculator, Truck, Camera, HeartPulse, UserCheck, CalendarDays, Phone, Mail, MapPinned, X, ChevronRight, SquarePen, ChevronLeft, Check } from 'lucide-react';
import Table from '../Table';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import { date, object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeState } from './redux/EmployeSlice';
import { employeeInitialValue, EmployeeType, TypePersonnelType } from '../../Utils/Types';
import { AppDispatch } from '../../Redux/store';
import { createEmployees, deleteEmployees, getAllEmployees, updateEmployees } from './redux/EmployeAsyncThunk';
import useForm from '../../Hooks/useForm';
import { getTypeEmployeesState } from '../../Redux/Other/slices/TypeEmployeesSlice';
import { baseUrl } from '../../Utils/Utils';
import { getAppState } from '../../Redux/AppSlice';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import clsx from 'clsx';
import TeacherSubject from '../TeacherSubject';

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
  nom: string()
    .required('Le nom est obligatoire.'),
  prenom: string()
    .required('La prénom est obligatoire.'),
  addresse: string()
    .required('La adresse est obligatoire.'),
  date_naissance: date()
    .typeError("La date n'est pas valide.")
    .required("La date de naissance est obligatoire.")
    .max(new Date(), "La date ne peut pas être dans le futur."),
  date_embauche: date()
    .typeError("La date n'est pas valide.")
    .required("La date d'embauche est obligatoire."),
  telephone: string()
    .required('Le téléphone est obligatoire.'),
});

const Registration: React.FC = () => {
  // Nom du fichier pièce d'identité (verso)
  const [ciVersoFileName, setCiVersoFileName] = useState<string>("");

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingEmployees, setEditingEmployees] = useState<EmployeeType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [teacherToArchive, setTeacherToArchive] = useState<EmployeeType | null>(null);
  const [sexe, setSexe] = useState({
    homme: false,
    femme: true
  })
  const { datas: TypesEmployees } = useSelector(getTypeEmployeesState);
  const [assignations, setAssignations] = useState<any>([])


  // Traitement quand le type est enseigant 
  const [isTeacher, setIsTeacher] = useState(false)
  const [page, setPage] = useState(1)

  // Aperçu de la photo uploadée
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const { hiddeTheModalActive } = useSelector(getAppState);

  // *** //
  const { datas: employees, action } = useSelector(getEmployeState);
  const { onSubmite, formErrors, resetError, forceError } = useForm<EmployeeType>(EmployeSchema, employeeInitialValue);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();


  //Handlers
  const handleEdit = (employee: any) => {
    setEditingEmployees(employee);
    setPhotoPreview(baseUrl(employee?.photo) || null);
    setSexe(employee?.sexe === 'Homme' ? { homme: true, femme: false } : { homme: false, femme: true });
    setShowModal(true);
  };

  // Comfirmation de l'archivage
  const handleArchive = (employee: any) => {
    setTeacherToArchive(employee);
    setShowConfirmDialog(true);
  };

  // Suppression de l'employé
  const handleConfirmArchive = () => {
    if (teacherToArchive) {
      dispatch(deleteEmployees(teacherToArchive?.id_personnel as number))
    }
    setShowConfirmDialog(false);
    setTeacherToArchive(null);
  };

  // Fermer la modale
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEmployees(null);
    setPhotoPreview(null);
    setIsTeacher(false);
    setPage(1);
    resetError();
  };

  // Soumission du formulaire
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmite((validateData: EmployeeType) => {
      editingEmployees ? dispatch(updateEmployees({ datas: validateData, id: editingEmployees?.id_personnel as number })) : dispatch(createEmployees(validateData))
    }, e);
  };

  // changement du selection du  type de personnel
  const handleTypeEmployeesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    let teste = false;
    TypesEmployees.map((type: TypePersonnelType) => {
      if ((type.id_type_personnel as number).toString() == value && type.type.toLowerCase() === 'enseignant') {
        teste = true;
      }
    })
    setIsTeacher(teste);
  }

  // Passer a la page suivant si le type est enseignant
  const handleNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    const formulaire = document.querySelector<HTMLFormElement>('#__formulaire_personnel');

    if (formulaire && e.currentTarget.type === 'button') {
      const elements = formulaire.elements; // HTMLFormControlsCollection
      let canNext = true;
      let errors = {};
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        switch (element.name) {
          case 'nom':
            if (element.value == '') {
              canNext = false
              errors = { nom: "Le nom est obligatoire." };
            }
            break;
          case 'prenom':
            if (element.value == '') {
              canNext = false
              errors = { ...errors, prenom: "Le prénom est obligatoire." };
            }
            break;
          case 'addresse':
            if (element.value == '') {
              canNext = false
              errors = { ...errors, addresse: "L'addresse est obligatoire." };
            }
            break;
          case 'telephone':
            if (element.value == '') {
              canNext = false
              errors = { ...errors, telephone: "Le téléphone est obligatoire." };
            }
            break;
          case 'date_naissance':
            if (element.value == '') {
              canNext = false
              errors = { ...errors, date_naissance: "La date de naissance est obligatoire." };
            }
            break;
          case 'date_embauche':
            if (element.value == '') {
              canNext = false
              errors = { ...errors, date_embauche: "La date d'embauche est obligatoire." }
            }
            break;
          default:
            break;
        }
      }
      if (canNext) {
        setPage(v => v + 1)
        resetError();
      } else {
        // Forcer les erreurs
        forceError(errors);
      }
    }
  };



  // TABLEAUX 
  const actions = [
    { icon: Eye, label: 'Voir', onClick: (item: EmployeeType) => navigate("/employees/" + item.id_personnel), color: 'blue' },
    { icon: Edit, label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive, label: 'Archiver', onClick: handleArchive, color: 'red' },
  ];

  const columns = [
    // Profil employé
    {
      key: 'nom',
      label: 'Profil',
      render: (value: string, item: EmployeeType) => (
        <div className="flex items-center space-x-3 relative">
          {/* Image miniature */}
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer">
            <img
              src={baseUrl(item.photo)}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-gray-900">{value} {item.prenom}</div>
            <div className="text-sm text-gray-500">{item.email}</div>
          </div>
        </div>
      )
    },
    { key: 'matricule_personnel', label: 'Matricule' },
    // Fonction employé
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
    { key: 'date_embauche', label: "Date d'embauche" },
    { key: 'addresse', label: 'Addrèsse' },
    { key: 'telephone', label: 'Téléphone' },
    // Statut employé
    {
      key: 'status',
      label: 'Statut',
      render: (status: string) => {
        // Définir l'icône et la couleur selon le statut
        let icon = null;
        let colorClass = '';
        const statusLower = status?.toLocaleLowerCase();

        if (statusLower === 'actif') {
          icon = <HeartPulse className="w-4 h-4 text-green-600" />;
          colorClass = 'bg-green-100 text-green-800';
        } else if (statusLower === 'suspendu') {
          icon = <Archive className="w-4 h-4 text-yellow-600" />;
          colorClass = 'bg-yellow-100 text-yellow-800';
        } else {
          icon = <Archive className="w-4 h-4 text-red-600" />;
          colorClass = 'bg-red-100 text-red-800';
        }

        // Mettre la première lettre en majuscule
        const statusLabel = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

        return (
          <span className={`px-2 py-1 rounded-full text-sm flex gap-2 items-center ${colorClass}`}>
            {icon}
            {statusLabel}
          </span>
        );
      }
    },
    { key: 'sexe', label: 'Sex' },
  ];

  // Effets
  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  // Modale 
  useEffect(() => {
    if (showModal && hiddeTheModalActive) {
      handleCloseModal();
    }
  }, [hiddeTheModalActive]);

  return (
    <div className="space-y-6">

      {/* Entete */}
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

      {/* Filtrage  */}
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
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 cursor-pointer"
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
            >
              <option value="">Tous les fonctions</option>
              {
                TypesEmployees.map((type: TypePersonnelType) => (
                  <option key={type.id_type_personnel} value={type.type}>{type.type}</option>
                ))
              }
            </select>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 cursor-pointer"
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
            >
              <option value="">Tous les Status</option>
              <option value="Actif">Actif</option>
              <option value="Suspendu">Suspendu</option>
              <option value="Démissionnaire">Démissionnaire</option>

            </select>
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
        <form onSubmit={handleSubmit} id='__formulaire_personnel'>
          {/* Page numero 1  */}

          {/* Photo de profil de l'employé */}
          <div className={clsx({
            'sr-only': (page !== 1)
          }, 'space-y-6')} >
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

              {/* Information personnel sur l'employer  */}
              <div className='flex-1 space-y-4' >
                <Input
                  label='Nom'
                  name='nom'
                  defaultValue={editingEmployees?.nom || ''}
                  icon={User}
                  errorMessage={formErrors?.nom}
                />
                <Input
                  label='Prénom'
                  name='prenom'
                  defaultValue={editingEmployees?.prenom || ''}
                  icon={UserCheck}
                  errorMessage={formErrors?.prenom}
                />
                <Input
                  label='Date de naissance'
                  name='date_naissance'
                  defaultValue={editingEmployees?.date_naissance || ''}
                  icon={CalendarDays}
                  errorMessage={formErrors?.date_naissance}
                  type='date'
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sexe</label>
                  <div className="flex items-center gap-6 px-1 py-2">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name='sexe'
                        value='Homme'
                        checked={sexe.homme}
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
                        checked={sexe.femme}
                        onChange={(e) => { setSexe({ homme: !e.target.checked, femme: e.target.checked }) }}
                        className="form-checkbox h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                      />
                      <span className="ml-2 text-gray-700">Femme</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Information sur les coordonner de l'employer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label='Addresse'
                name='addresse'
                defaultValue={editingEmployees?.addresse || ''}
                icon={MapPinned}
                errorMessage={formErrors?.addresse}
              />
              <Input
                label='Téléphone'
                name='telephone'
                defaultValue={editingEmployees?.telephone || ''}
                icon={Phone}
                errorMessage={formErrors?.telephone}
              />
              <Input
                label='Email'
                name='email'
                defaultValue={editingEmployees?.email || ''}
                icon={Mail}
                errorMessage={formErrors?.email}
              />

              {/* Engagement  */}
              <div>
                <div className="relative">
                  <select
                    defaultValue={editingEmployees?.engagement || ''}
                    name='engagement'
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10"
                  >
                    <option value="">Sélectionner une engagement</option>
                    <option value="Célibataire">Célibataire</option>
                    <option value="Marié">Marié</option>
                    <option value="Divorcé">Divorcé</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <HeartPulse className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Fonctions du personnel  */}
              <div>
                <div className="relative">
                  <select
                    defaultValue={editingEmployees?.id_type_personnel || ''}
                    name='type_personnel'
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10"
                    onChange={handleTypeEmployeesChange}
                  >
                    <option value="">Sélectionner une fonction</option>
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

              <Input
                label="Date d'embauche"
                name='date_embauche'
                defaultValue={editingEmployees?.date_embauche || ''}
                type='date'
                icon={CalendarDays}
                errorMessage={formErrors?.date_embauche}
              />

              <Input
                label='Salaire de base'
                name='salaire_base'
                defaultValue={editingEmployees?.salaire_base ? editingEmployees?.salaire_base.toString() : ''}
                icon={Calculator}
                errorMessage={formErrors?.salaire_base}
                type='number'
              />
              <div>
                <div className="relative">
                  <select
                    defaultValue={editingEmployees?.status || ''}
                    name='status'
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10"
                  >
                    <option value="">Sélectionner un status</option>
                    <option value="Actif">Actif</option>
                    <option value="Suspendu">Suspendu</option>
                    <option value="Démissionnaire">Démissionnaire</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <User className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>

            {/* Photocopie CIN  */}
            <div className=''>
              <div className="flex w-full flex-col items-start gap-2">
                <label htmlFor="pc_cin" className="flex w-full items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                  <Camera className="w-5 h-5 " />
                  <span className=" text-sm font-medium">
                    {ciVersoFileName ? ciVersoFileName : "Pièce d'indetité (SVG, PNG, JPG, GIF)"}
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

            {/* Boutons de validation , d'annulation et pour passer au  suivant  */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex gap-1 items-center "
              >
                <X size={25} />
                Annuler
              </button>
              <button
                type={isTeacher ? 'button' : 'submit'}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex gap-1 items-center"
                onClick={handleNext}
              >
                {/* Icone si le mot est modifier */}
                {editingEmployees && <SquarePen />}
                {/* Icone si le mot est Ajouter */}
                {!!!editingEmployees && !isTeacher && <Plus size={25} />}
                {editingEmployees ? 'Modifier' : isTeacher ? 'Suivant' : 'Ajouter'}
                {/* Icone si le mot suivant */}
                {isTeacher && !!!editingEmployees && <ChevronRight size={25} />}
              </button>
            </div>
          </div>

          {/* Page numero 2 si le c'est une enseignant  */}
          <div className={clsx({
            'sr-only': page !== 2
          })} >
            {/* Composant pour l'assigantion des matieres dans les classes pour le proffesseur */}
            <TeacherSubject setParentAssignation={setAssignations} />

            {/* Boutons de validation et retour dans l'assignation des matieres et classes pour le prof actuel */}
            <div className='flex items-center justify-between'>
              <button
                className="bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg flex items-center hover:bg-gray-300 transition-colors  gap-01 "
                onClick={() => { setPage(v => v - 1) }}
                type='button'
              >
                <ChevronLeft size={25} />
                <span>Percedent</span>
              </button>
              <button
                className={`bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-1 transition-colors hover:bg-blue-700`}
                type='submit'
              >
                <Check size={25} />
                <span>Valider</span>
              </button>
            </div>

            {/* Div cacher pour creation d'input qui va contenire les valeur des assigantions  */}
            <div>
              {assignations.map((assignation: any, index: number) => (
                <div key={index}>
                  <input type="hidden" name={`assignations[${index}][id_classe]`} value={assignation.id_classe} onChange={() => { }} />
                  <input type="hidden" name={`assignations[${index}][id_matiere]`} value={assignation.id_matiere} onChange={() => { }} />
                  <input type="hidden" name={`assignations[${index}][heures]`} value={assignation.heures} onChange={() => { }} />
                </div>
              ))}
            </div>
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

export default Registration;