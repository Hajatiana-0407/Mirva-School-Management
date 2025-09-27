import React, { useEffect, useState } from 'react';
import { Plus, Search, Archive, User, UserCheck, CalendarDays, Phone, Mail, Check, MapPin, Globe, Home, ArrowRight, ArrowLeft, Activity, FolderOpen, HeartPulse, GraduationCap, Focus, } from 'lucide-react';
import Table from '../Table';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import { object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getRegistrationState } from './redux/registerSlice';
import { ClasseType, registrationInitialValue, RegistrationType, StudentFormDataType } from '../../Utils/Types'
import { AppDispatch } from '../../Redux/store';
import { createRegistration, deleteRegistration, getAllRegistrations } from './redux/registerAsyncThunk';
import useForm from '../../Hooks/useForm';
import Input from '../../Components/ui/Input';
import clsx from 'clsx';
import {  fakeStudentData, getShortDate } from '../../Utils/Utils';
import { getLevelState } from '../Levels/redux/LevelSlice';
import { getAllLevel } from '../Levels/redux/LevelAsyncThunk';
import { getSchoolYearState } from '../School-Year/redux/SchoolYearSlice';
import { getAppState } from '../../Redux/AppSlice';
import InputError from '../../Components/ui/InputError';
import Profile from '../../Components/ui/Profile';

const RegistrationSchema = object({
  // Élève
  nom: string().required('Le nom est obligatoire.'),
  prenom: string().required('Le prénom est obligatoire.'),
  sexe: string().required('Le sexe est obligatoire.'),
  date_naissance: string().required("La date de naissance est obligatoire."),
  lieu_naissance: string().required("Le lieu de naissance est obligatoire."),
  adresse: string().required('L\'adresse est obligatoire.'),
  nationalite: string().required('La nationalité est obligatoire.'),
  annee_scolaire: string().required("Veuillez d'abord créer une nouvelle année scolaire dans la section configuration."),

  // Scolarité
  niveau: string().required("Le niveau d'inscription est obligatoire."),
  classe: string().required("La classe souhaitée est obligatoire."),

  date_inscription: string().required("La date d'inscription est obligatoire."),
});

// Champs à vérifier selon l'étape
const stepFields: Record<number, string[]> = {
  1: ['nom', 'prenom', 'sexe', 'date_naissance', 'lieu_naissance', 'nationalite', 'adresse', 'telephone', 'email'],
  2: ['niveau', 'classe'],
  3: ['pere_nom', 'pere_profession', 'pere_tel', 'pere_email', 'mere_nom', 'mere_profession', 'mere_tel', 'mere_email', 'adresse_parents', 'tuteur_nom', 'tuteur_lien', 'tuteur_tel', 'tuteur_email'],
  4: ['groupe_sanguin', 'allergies', 'maladies', 'traitements', 'medecin', 'medecin_contact', 'urgence_nom', 'urgence_lien', 'urgence_tel'],
  5: ['paiement', 'bourse', 'payeur_nom', 'payeur_coord'],
  6: ['acte_naissance', 'piece_identite', 'photo_recente', 'bulletin', 'vaccination'],
};

// ===================== ETAPES DANS LE FORMULAIRE =====================
type FormStepType = { number: number; title: string }
const fomrStep: FormStepType[] = [
  { number: 1, title: "Informations sur l’élève" },
  { number: 2, title: "Informations scolaires" },
  { number: 3, title: "Informations sur les parents / tuteur" },
  { number: 4, title: "Informations médicales" },
  { number: 5, title: "Pièces jointes à fournir" },
]

const Registration: React.FC = () => {
  // ===================== GESTION DES ETATS =====================
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<RegistrationType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [dataToDelete, setDataToDelete] = useState<RegistrationType | null>(null);
  const [sexe, setSexe] = useState({ homme: false, femme: true });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({ parentType: 'parent' });
  const [formValues, setFormValues] = useState<StudentFormDataType>(fakeStudentData);
  const { datas: registrations, action, error } = useSelector(getRegistrationState);
  const { onSubmite, formErrors, resetError, forceError } = useForm<RegistrationType>(RegistrationSchema, registrationInitialValue);
  const [formTitle, setFormTitle] = useState("Nouvel élève")
  const { datas: levelDatas } = useSelector(getLevelState);
  const [classeOptions, setclasseOptions] = useState<any[]>([])
  const dispatch: AppDispatch = useDispatch();
  const [classeAndLevel, setClasseAndLevel] = useState<{ classe: string | null; level: string | null; }>({ classe: null, level: null })
  // ! Level input options
  const levelOptions = levelDatas.map((level) => ({ value: level.id_niveau as number, label: level.niveau }));
  // ! Année scolaire 
  const { activeSchoolYear } = useSelector(getSchoolYearState);
  // ! Droit d'inscription
  const [isPayed, setIsPayed] = useState(true)
  const { hiddeTheModalActive } = useSelector(getAppState)

  const totalSteps = fomrStep.length + 1;

  // ? ===================== HANDLERS =====================
  const handleArchive = (student: any) => {
    setDataToDelete(student);
    setShowConfirmDialog(true);
  };

  const handleConfirmArchive = () => {
    if (dataToDelete) {
      dispatch(deleteRegistration(dataToDelete?.id_inscription as number))
    }
    setShowConfirmDialog(false);
    setDataToDelete(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingStudent(null);
    setPhotoPreview(null);
    resetError();
    setStep(1)
  };

  // ? ===================== SOUMISSION DE LA FORMULAIRE  =====================
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmite((validateData: any) => {
      editingStudent && editingStudent?.id_eleve ? '' : dispatch(createRegistration(validateData));
    }, e);
  };

  // ! Wizard navigation
  const handleNext = (toStep?: number) => {
    const formulaire = document.querySelector<HTMLFormElement>('#__formulaire_eleve');
    if (formulaire) {
      const elements = formulaire.elements;
      let canNext = true;
      let errors: any = {};

      const fields = stepFields[step];
      // Récupérer les messages d'erreur du schema
      const schemaFields = RegistrationSchema.fields;
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        if (fields.includes(element.name)) {
          // Vérifier si le champ est requis dans le schema
          const fieldSchema: any = schemaFields[element.name as keyof typeof schemaFields];
          const isRequired = fieldSchema && fieldSchema.tests && fieldSchema.tests.some((t: any) => t.OPTIONS && t.OPTIONS.name === 'required');
          if (isRequired && !element.value) {
            // Récupérer le message d'erreur du test 'required'
            const requiredTest = fieldSchema.tests.find((t: any) => t.OPTIONS && t.OPTIONS.name === 'required');
            errors[element.name] = requiredTest ? requiredTest.OPTIONS.message : 'Ce champ est obligatoire.';
            canNext = false;
          }
        }
      }
      if (canNext) {
        if (toStep) {
          setStep(toStep as number);
        } else {
          setStep((prev) => Math.min(prev + 1, totalSteps));
        }
        resetError();
      } else {
        forceError(errors);
      }
    }
  };
  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Ajout du handler pour les inputs (sauf type file)
  const handleInputValueChange = (label: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (e.target.type !== 'file') {
      setFormValues(prev => ({
        ...prev,
        [e.target.name]: { label, value: e.target.value }
      }));
    }

    if (e.target.name === 'niveau') {
      const selectedLevel = levelDatas.find((level) => level.id_niveau == parseInt(e.target.value))
      const newClasseOptions = selectedLevel ? selectedLevel?.classe?.listes.map((classe: ClasseType) => ({ value: classe.id_classe as number, label: classe.denomination })) : []
      setclasseOptions(newClasseOptions as any[])

      // Gerer l'affichage dans le résumé
      const classeLevelValue = { classe: selectedLevel?.classe?.listes[0]?.denomination || null, level: selectedLevel?.niveau || null };
      setClasseAndLevel(classeLevelValue);
    }
  };

  // ? ===================== EFFETS =====================
  useEffect(() => {
    dispatch(getAllRegistrations());
  }, [dispatch]);

  useEffect(() => {
    if (fomrStep.find(s => s.number === step)?.title) {
      setFormTitle(fomrStep.find(s => s.number === step)?.title as string)
    } else {
      setFormTitle("Nouvel élève")
    }
  }, [step]);

  useEffect(() => {
    if (!levelDatas.length) {
      dispatch(getAllLevel())
    }
  }, [dispatch]);

  // Level pare defaut 
  useEffect(() => {
    if (levelDatas.length) {
      const selectedLevel = levelDatas[0]
      const newClasseOptions = selectedLevel ? selectedLevel?.classe?.listes.map((classe: ClasseType) => ({ value: classe.id_classe as number, label: classe.denomination })) : []
      setclasseOptions(newClasseOptions as any[]);

      // Gerer l'affichage dans le résumé par défaut
      const classeLevelValue = { classe: selectedLevel?.classe?.listes[0]?.denomination || null, level: selectedLevel?.niveau || null };
      setClasseAndLevel(classeLevelValue);
    }
  }, [levelDatas])

  // ! Modale 
  useEffect(() => {
    if (showModal && hiddeTheModalActive) {
      handleCloseModal();
    }
  }, [hiddeTheModalActive]);


  // ===================== TABLEAUX =====================
  const actions = [
    { icon: Archive, label: 'Archiver', onClick: handleArchive, color: 'red' },
  ];

  const columns = [
    {
      key: 'nom_eleve', label: 'Profil', render: (value: string, item: RegistrationType) => (
        <Profile
          fullName={`${value} ${item.prenom}`}
          identification={item.matricule_etudiant}
          photo={item.photo as string}
          link={`/students/${item.matricule_etudiant}`}
        />
      )
    },
    {
      key: 'denomination',
      label: 'Classe',
      render: (value: string, item: any) => (
        <div className="flex flex-col">
          <span className={clsx({
            'hidden': !item.niveau
          }, 'text-xs italic text-blue-600')}>
            {item.niveau}
          </span>
          {value}
        </div>
      )
    },
    { key: 'annee_scolaire_nom', label: 'Année scolaire' },
    {
      key: 'date_inscription', label: 'date d\'inscription ',
      render: (value: string) => (
        <div className="">
          { getShortDate( value )}
        </div>
      )
    },
    { key: 'telephone', label: 'Téléphone' },
    {
      key: 'is_droit_payed', label: 'Droit d\'inscription ', render: (value: string) => (
        <div className={clsx({
          'bg-green-300 text-green-800': value === '1',
          'bg-red-300 text-red-800': value !== '1',
        }, 'rounded-full text-xs text-center italic w-20')}>
          {value === '1' ? 'Payé' : 'Non payé'}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Inscription des élèves</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvel élève</span>
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un élève..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        <Table
          isLoading={action.isLoading as boolean}
          data={registrations}
          columns={columns}
          actions={actions}
          searchTerm={searchTerm}
        />
      </div>
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingStudent ? "Modifier l'élève" : formTitle}
        size='lg'
      >
        <form id='__formulaire_eleve' onSubmit={handleSubmit}>
          <div className='space-y-6'>
            <InputError message={error} />
            {/* Etape 1 : Informations sur l'élève */}
            <div className={clsx({ 'hidden': step !== 1 })}>
              <div className="flex flex-col sm:flex-row gap-5 space-y-2">
                {/* PHOTO D IDENTITE */}
                <div className="relative flex flex-col items-center justify-center">
                  <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center justify-center w-56 h-56 rounded-md bg-gray-100 border-2 border-dashed border-gray-300 hover:bg-gray-200 transition-all">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Photo" className="w-52 h-52 rounded-md object-cover" />
                    ) : (
                      <div className="flex flex-col justify-center items-center">
                        <Focus className="w-20 h-20 text-gray-400 mb-1" />
                        <span className="text-gray-400 text-sm">Aucune photo trouvé</span>
                      </div>
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
                            setFormData((prev: any) => ({ ...prev, photo: reader.result }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
                <div className='flex-1 space-y-4'>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label='Nom'
                      name='nom'
                      defaultValue={editingStudent?.nom ? editingStudent?.nom : formValues.nom.value ? formValues.nom.value : ''}
                      icon={User}
                      errorMessage={formErrors?.nom}
                      onChange={handleInputValueChange('Nom')} />
                    <Input
                      label='Prénom'
                      name='prenom'
                      defaultValue={editingStudent?.prenom ? editingStudent?.prenom : formValues.prenom.value ? formValues.prenom.value : ''}
                      icon={UserCheck}
                      errorMessage={formErrors?.prenom}
                      onChange={handleInputValueChange('Prénom')} />
                    <Input
                      label='Date de naissance'
                      name='date_naissance'
                      defaultValue={editingStudent?.date_naissance ? editingStudent?.date_naissance : formValues.date_naissance.value ? formValues.date_naissance.value : ''}
                      icon={CalendarDays}
                      errorMessage={formErrors?.date_naissance} type='date'
                      onChange={handleInputValueChange('Date de naissance')} />
                    <Input
                      label='Lieu de naissance'
                      name='lieu_naissance'
                      defaultValue={editingStudent?.lieu_naissance ? editingStudent?.lieu_naissance : formValues.lieu_naissance.value ? formValues.lieu_naissance.value : ''}
                      icon={MapPin}
                      errorMessage={formErrors?.lieu_naissance}
                      onChange={handleInputValueChange('Lieu de naissance')} />
                  </div>
                  <div className='w-full'>
                    <Input
                      label='Adresse complète'
                      name='adresse'
                      defaultValue={editingStudent?.adresse ? editingStudent?.adresse : formValues.adresse.value ? formValues.adresse.value : ''}
                      icon={Home}
                      errorMessage={formErrors?.adresse}
                      onChange={handleInputValueChange('Adresse complète')} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label='Téléphone'
                      name='telephone'
                      defaultValue={editingStudent?.telephone ? editingStudent?.telephone : formValues.telephone.value ? formValues.telephone.value : ''}
                      icon={Phone}
                      errorMessage={formErrors?.telephone}
                      onChange={handleInputValueChange('Téléphone')} />
                    <Input
                      label='Email'
                      name='email'
                      defaultValue={editingStudent?.email ? editingStudent?.email : formValues.email.value ? formValues.email.value : ''}
                      icon={Mail}
                      errorMessage={formErrors?.email}
                      onChange={handleInputValueChange('Email')} />
                  </div>
                </div>
              </div>
              <div>
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
                <Input label='Nationalité' name='nationalite' defaultValue={editingStudent?.nationalite ? editingStudent?.nationalite : formValues.nationalite.value ? formValues.nationalite.value : ''} icon={Globe} errorMessage={formErrors?.nationalite} onChange={handleInputValueChange('Nationalité')} />
              </div>
            </div>

            {/* Etape 2 : Informations scolaires */}
            <div className={clsx({
              'hidden': step !== 2
            }, 'space-y-4')}>
              <Input
                label='Niveau d’inscription demandé'
                name='niveau'
                defaultValue={editingStudent?.niveau ? editingStudent?.niveau : formValues.niveau.value ? formValues.niveau.value : ''}
                icon={User}
                errorMessage={formErrors?.niveau} type='select' onChange={handleInputValueChange('Niveau d’inscription demandé')}
                options={levelOptions}
              />
              <Input
                label='Classe souhaitée'
                name='classe'
                defaultValue={editingStudent?.classe ? editingStudent?.classe : formValues.classe.value ? formValues.classe.value : ''}
                icon={UserCheck}
                errorMessage={formErrors?.classe}
                type='select'
                onChange={handleInputValueChange('Classe souhaitée')}
                options={classeOptions}
              />
              <Input
                label='Ancienne école fréquentée'
                name='ancienne_ecole'
                defaultValue={editingStudent?.ancienne_ecole ? editingStudent?.ancienne_ecole : formValues.ancienne_ecole.value ? formValues.ancienne_ecole.value : ''}
                icon={Home}
                errorMessage={formErrors?.ancienne_ecole}
                onChange={handleInputValueChange('Ancienne école fréquentée')}
              />
            </div>

            {/* Etape 3 : Informations parents/tuteurs */}
            <div className={clsx(
              { 'hidden': step !== 3 },
              'space-y-4'
            )}>
              <div className="flex gap-4 mb-4 justify-center">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg  border transition-colors duration-150 ${formData.parentType === 'parent' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-100'}`}
                  onClick={() => setFormData((prev: any) => ({ ...prev, parentType: 'parent' }))}
                >
                  <span>
                    <User className="w-4 h-4 inline-block mr-1" />
                  </span>
                  Parents
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg  border transition-colors duration-150 ${formData.parentType === 'tuteur' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-100'}`}
                  onClick={() => setFormData((prev: any) => ({ ...prev, parentType: 'tuteur' }))}
                >
                  <span>
                    <UserCheck className='w-4 h-4 inline-block mr-1' />
                  </span>
                  Tuteur
                </button>
              </div>
              {formData.parentType === 'parent' && (
                <div className='space-y-4'>
                  {/* Information sur le père  */}
                  <h2 className='text-sm text-gray-500 italic'>Information sur le père : </h2>
                  <input type="hidden" name='tuteur_type' value={'parent'} />
                  <Input label='Nom et prénoms du père' name='pere_nom' defaultValue={editingStudent?.pere_nom ? editingStudent?.pere_nom : formValues.pere_nom.value ? formValues.pere_nom.value : ''} icon={User} errorMessage={formErrors?.pere_nom} onChange={handleInputValueChange('Nom et prénoms du père')} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label='Profession du père' name='pere_profession' defaultValue={editingStudent?.pere_profession ? editingStudent?.pere_profession : formValues.pere_profession.value ? formValues.pere_profession.value : ''} icon={UserCheck} errorMessage={formErrors?.pere_profession} onChange={handleInputValueChange('Profession du père')} />
                    <Input label='Téléphone du père' name='pere_tel' defaultValue={editingStudent?.pere_tel ? editingStudent?.pere_tel : formValues.pere_tel.value ? formValues.pere_tel.value : ''} icon={Phone} errorMessage={formErrors?.pere_tel} onChange={handleInputValueChange('Téléphone du père')} />
                  </div>
                  <Input label='Photocopie CIN du père' name='pc_cin_pere' defaultValue={editingStudent?.bulletin || ''} icon={FolderOpen} iconColor='text-amber-500' type='file' />

                  {/* Information sur la mère */}
                  <h2 className='text-sm text-gray-500 italic'>Information sur la mère : </h2>
                  <Input label='Nom et prénoms de la mère' name='mere_nom' defaultValue={editingStudent?.mere_nom ? editingStudent?.mere_nom : formValues.mere_nom.value ? formValues.mere_nom.value : ''} icon={User} errorMessage={formErrors?.mere_nom} onChange={handleInputValueChange('Nom et prénoms de la mère')} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label='Profession de la mère' name='mere_profession' defaultValue={editingStudent?.mere_profession ? editingStudent?.mere_profession : formValues.mere_profession.value ? formValues.mere_profession.value : ''} icon={UserCheck} errorMessage={formErrors?.mere_profession} onChange={handleInputValueChange('Profession de la mère')} />
                    <Input label='Téléphone de la mère' name='mere_tel' defaultValue={editingStudent?.mere_tel ? editingStudent?.mere_tel : formValues.mere_tel.value ? formValues.mere_tel.value : ''} icon={Phone} errorMessage={formErrors?.mere_tel} onChange={handleInputValueChange('Téléphone de la mère')} />
                  </div>
                  <Input label='Photocopie CIN de la mère' name='pc_cin_mere' defaultValue={editingStudent?.bulletin || ''} icon={FolderOpen} iconColor='text-amber-500' type='file' />

                  {/* Autre information  */}
                  <h2 className='text-sm text-gray-500 italic'>Autre Information : </h2>
                  <Input label='Adresse des parents' name='adresse_parents' defaultValue={editingStudent?.adresse_parents ? editingStudent?.adresse_parents : formValues.adresse_parents.value ? formValues.adresse_parents.value : ''} icon={Home} errorMessage={formErrors?.adresse_parents} onChange={handleInputValueChange('Adresse des parents')} />
                  <Input label='Email' name='tuteur_email' defaultValue={editingStudent?.tuteur_email ? editingStudent?.tuteur_email : formValues.tuteur_email.value ? formValues.tuteur_email.value : ''} icon={Mail} errorMessage={formErrors?.tuteur_email} onChange={handleInputValueChange('Email')} />
                </div>
              )}
              {formData.parentType === 'tuteur' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="hidden" name='tuteur_type' value={'tuteur'} />
                  <Input label='Nom et prénoms du tuteur légal' name='tuteur_nom' defaultValue={editingStudent?.tuteur_nom ? editingStudent?.tuteur_nom : formValues.tuteur_nom.value ? formValues.tuteur_nom.value : ''} icon={User} errorMessage={formErrors?.tuteur_nom} onChange={handleInputValueChange('Nom et prénoms du tuteur légal')} />
                  <Input label='Lien avec l’élève' name='tuteur_lien' defaultValue={editingStudent?.tuteur_lien ? editingStudent?.tuteur_lien : formValues.tuteur_lien.value ? formValues.tuteur_lien.value : ''} icon={UserCheck} errorMessage={formErrors?.tuteur_lien} onChange={handleInputValueChange('Lien avec l’élève')} />
                  <Input label='Téléphone du tuteur' name='tuteur_tel' defaultValue={editingStudent?.tuteur_tel ? editingStudent?.tuteur_tel : formValues.tuteur_tel.value ? formValues.tuteur_tel.value : ''} icon={Phone} errorMessage={formErrors?.tuteur_tel} onChange={handleInputValueChange('Téléphone du tuteur')} />
                  <Input label='Email du tuteur' name='tuteur_email' defaultValue={editingStudent?.tuteur_email ? editingStudent?.tuteur_email : formValues.tuteur_email.value ? formValues.tuteur_email.value : ''} icon={Mail} errorMessage={formErrors?.tuteur_email} onChange={handleInputValueChange('Email du tuteur')} />
                  <Input label='Photocopie CIN du tuteur' name='pc_cin_tuteur' defaultValue={editingStudent?.bulletin || ''} icon={FolderOpen} iconColor='text-amber-500' type='file' />
                </div>
              )}
            </div>

            {/* Etape 4 : Informations médicales */}
            <div className={clsx({ 'hidden': step !== 4 }, 'space-y-4')}>
              {/* Alergies ou Maladies chroniques   */}
              <Input label='Alergies ou Maladies chroniques ' name='maladies' defaultValue={editingStudent?.maladies ? editingStudent?.maladies : formValues.maladies.value ? formValues.maladies.value : ''} icon={Activity} errorMessage={formErrors?.maladies} onChange={handleInputValueChange('Alergies ou Maladies chroniques')} />
              <Input label='Personne à contacter en cas d’urgence' name='urgence_nom' defaultValue={editingStudent?.urgence_nom ? editingStudent?.urgence_nom : formValues.urgence_nom.value ? formValues.urgence_nom.value : ''} icon={User} errorMessage={formErrors?.urgence_nom} onChange={handleInputValueChange('Personne à contacter en cas d’urgence')} />
              <Input label='Lien avec l’élève (urgence)' name='urgence_lien' defaultValue={editingStudent?.urgence_lien ? editingStudent?.urgence_lien : formValues.urgence_lien.value ? formValues.urgence_lien.value : ''} icon={UserCheck} errorMessage={formErrors?.urgence_lien} onChange={handleInputValueChange('Lien avec l’élève (urgence)')} />
              <Input label='Téléphone urgence' name='urgence_tel' defaultValue={editingStudent?.urgence_tel ? editingStudent?.urgence_tel : formValues.urgence_tel.value ? formValues.urgence_tel.value : ''} icon={Phone} errorMessage={formErrors?.urgence_tel} onChange={handleInputValueChange('Téléphone urgence')} />
            </div>

            {/* Etape 5 : Pièces jointes */}
            <div className={clsx({ 'hidden': step !== 5 }, 'space-y-4')}>
              <Input label='Copie de l’acte de naissance' name='acte_naissance' defaultValue={editingStudent?.acte_naissance || ''} icon={FolderOpen} errorMessage={formErrors?.acte_naissance} iconColor='text-amber-500' type='file' />
              <Input label='Copie de la pièce d’identité' name='piece_identite' defaultValue={editingStudent?.piece_identite || ''} icon={FolderOpen} errorMessage={formErrors?.piece_identite} iconColor='text-amber-500' type='file' />
              <Input label='Bulletins scolaires / dernier diplôme' name='bulletin' defaultValue={editingStudent?.bulletin || ''} icon={FolderOpen} errorMessage={formErrors?.bulletin} iconColor='text-amber-500' type='file' />
            </div>

            {/* Étape 6 : Résumé compact et moderne */}
            <div className={clsx({ hidden: step !== 6 }, "space-y-6")}>

              {/* Bloc principal : Photo + Identité */}
              <div className="flex gap-6 items-start">

                {/* PHOTO D IDENTITE */}
                <div className="relative flex flex-col items-center justify-center">
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer flex flex-col items-center justify-center w-[11.8rem] h-[11.8rem] rounded-md bg-gray-100 border-2 border-dashed border-gray-300 hover:bg-gray-200 transition-all"
                  >
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Photo"
                        className="w-[11rem] h-[11rem] rounded-md object-cover"
                      />
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
                        {formValues.nom.value} {formValues.prenom.value}
                      </span>
                    }
                  />
                  <InfoBlock
                    icon={<CalendarDays className="w-6 h-6 text-purple-500" />}
                    label="Naissance"
                    value={`${formValues.date_naissance.value} - ${formValues.lieu_naissance.value}`}
                  />
                  <InfoBlock
                    icon={<Globe className="w-6 h-6 text-blue-400" />}
                    label="Nationalité"
                    value={formValues.nationalite.value}
                  />

                </div>
              </div>

              <div className="space-y-4 ">
                {/* Niveau & Classe */}
                <InfoBlock
                  icon={<GraduationCap className="w-6 h-6 text-green-600" />}
                  label="Niveau & Classe"
                  value={
                    <span className="text-blue-700 font-semibold">
                      {classeAndLevel.level && classeAndLevel.classe ? `${classeAndLevel.level} • ${classeAndLevel.classe}` : ''}
                    </span>
                  }
                  important={true}
                />
              </div>

              {/* Coordonnées */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InfoBlock
                  icon={<Home className="w-6 h-6 text-orange-500" />}
                  label="Adresse"
                  value={formValues.adresse.value}
                />
                <InfoBlock
                  icon={<Phone className="w-6 h-6 text-teal-500" />}
                  label="Téléphone & Email"
                  value={
                    <span className="text-blue-700 font-semibold">
                      {formValues.telephone.value} • {formValues.email.value}
                    </span>
                  }
                />
              </div>

              {/* Parents */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InfoBlock
                  icon={<User className="w-6 h-6 text-blue-500" />}
                  label="Père"
                  value={`${formValues.pere_nom.value} • ${formValues.pere_profession.value}`}
                />
                <InfoBlock
                  icon={<User className="w-6 h-6 text-pink-500" />}
                  label="Mère"
                  value={`${formValues.mere_nom.value} • ${formValues.mere_profession.value}`}
                />
                <div className="col-span-2">
                  <InfoBlock
                    icon={<Home className="w-6 h-6 text-orange-500" />}
                    label="Adresse des parents"
                    value={formValues.adresse_parents.value}
                  />
                </div>
              </div>

              {/* Santé + Urgence */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InfoBlock
                  icon={<HeartPulse className="w-6 h-6 text-red-500" />}
                  label="Maladies"
                  value={formValues.maladies.value}
                />
                <InfoBlock
                  icon={<Phone className="w-6 h-6 text-indigo-500" />}
                  label="Contact d’urgence"
                  value={
                    <span className="text-blue-700 font-semibold">
                      {formValues.urgence_nom.value} • {formValues.urgence_tel.value}
                    </span>
                  }
                />
              </div>

              {/* Date d'inscription  */}
              <Input
                label='Date d’inscription'
                name='date_inscription'
                defaultValue={new Date().toISOString().split('T')[0]}
                icon={CalendarDays}
                type='date'
              />

              {/* Date d'inscription  */}
              <Input
                label='Année scolaire'
                name=''
                defaultValue={activeSchoolYear?.nom}
                icon={CalendarDays}
                type='text'
                errorMessage={formErrors?.annee_scolaire}
                readonly
              />
              <input type="hidden" name='annee_scolaire' value={activeSchoolYear?.id_annee_scolaire} />

              <div
                className="flex items-center ps-4 border border-blue-300   rounded bg-blue-100 cursor-pointer">
                <input id="bordered-checkbox-1"
                  type="checkbox"
                  value={isPayed ? "1" : "0"}
                  name='isDroitPaye'
                  checked={isPayed}
                  onChange={(e) => setIsPayed(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                />
                <label htmlFor="bordered-checkbox-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 cursor-pointer ">Droit d'inscription</label>
              </div>

            </div>

            {/* Navigation boutons */}
            <div className="flex justify-between pt-4 ">
              {step > 1 && (
                <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg" onClick={handlePrev}>
                  <span>
                    <ArrowLeft className="w-4 h-4 inline-block mr-1" />
                  </span>
                  Précédent
                </button>
              )}
              {step < totalSteps && (
                <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-lg ml-auto" onClick={() => handleNext()}>
                  Suivant
                  <span>
                    <ArrowRight className="w-4 h-4 inline-block ml-1" />
                  </span>
                </button>
              )}
              {step === totalSteps && (
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg">
                  <span>
                    <Check className="w-4 h-4 inline-block mr-1" />
                  </span>
                  Confirmer et valider
                </button>
              )}
            </div>
          </div>
        </form>
      </Modal>
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmArchive}
        title="Archiver l'élève"
        message={`Êtes-vous sûr de vouloir archiver l'élève ${dataToDelete?.prenom} ${dataToDelete?.nom_eleve} ?`}
      />
    </div>
  );
};

/* Composant InfoBlock modernisé */
type InfoBlockPropsType = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  important?: boolean
}

export const InfoBlock = ({ icon, label, value, important }: InfoBlockPropsType) => (
  <div className={clsx({
    '': important,
    '': !important,
  }, "flex rounded-lg items-center overflow-hidden hover:shadow-sm transition-all bg-white")} >
    {/* Icône avec fond léger */}
    <div className={clsx({
      ' bg-red-100': important,
      'bg-white border-e border-gray-50': !important,
    }, "flex items-center justify-center w-12 h-full")}>
      {icon}
    </div>

    {/* Texte */}
    <div className="flex flex-col px-4 py-2">
      <span className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </span>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  </div>
);


export default Registration;