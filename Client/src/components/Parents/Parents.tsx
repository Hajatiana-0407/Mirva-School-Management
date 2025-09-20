import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, Edit, Archive, Eye, User, Users, UserCheck, Phone, FolderOpen, Home, Mail, PenBox, Check, X, User2 } from 'lucide-react';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import Table from '../Table';
import { useDispatch, useSelector } from 'react-redux';
import { getParentState } from './redux/ParentSlice';
import useForm from '../../Hooks/useForm';
import { ParentType, ParentInitialValue, StudentType } from '../../Utils/Types';
import { object, string } from 'yup';
import { AppDispatch } from '../../Redux/store';
import { createParent, deleteParent, getAllParent, updateParent } from './redux/ParentAsyncThunk';
import { getAppState } from '../../Redux/AppSlice';
import InputError from '../ui/InputError';
import { baseUrl } from '../../Utils/Utils';
import { Link } from 'react-router-dom';
import Input from '../ui/Input';
import { StudentDetailsType } from '../Students/StudentSinglePage';
import { getStudent } from '../Students/redux/StudentAsyncThunk';
import Onglet from '../ui/Onglet';

const SearchFormSchema = object({
  matricule_etudiant: string().required('le matricule ne peut pas être vide .'),
});

// ? Style pour la column relation
const getParentRelationColor = (status: string) => {
  switch (status) {
    case 'tuteur':
      return 'bg-yellow-100 text-yellow-800';
    case 'parent':
      return 'bg-green-100 text-green-800';
    case 'parent/tuteur':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getParentRelationIcon = (status: string) => {
  switch (status) {
    case 'tuteur':
      return <User className="w-4 h-4" />;
    case 'parent':
      return <Users className="w-4 h-4" />;
    case 'parent/tuteur':
      return <User2 className="w-4 h-4" />;
    default:
      return null;
  }
};




type ParentStudentType = ParentType & StudentType;

const Parents = () => {
  const { datas: parents, action, error } = useSelector(getParentState);
  const { hiddeTheModalActive } = useSelector(getAppState);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  // const [searchLoading, setSearchLoading] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [parentToArchive, setParentToArchive] = useState<ParentStudentType | null>(null);
  const [sutudentToAddParent, setSutudentToAddParent] = useState<StudentDetailsType | null>(null);
  const { onSubmite: onSearchMatSubmit, formErrors: searMatchFormErrors } = useForm(SearchFormSchema, { matricule_etudiant: '' });
  const dispatch: AppDispatch = useDispatch();


  const handleEdit = (student: StudentDetailsType) => {
    setSutudentToAddParent(student);
    setShowModal(true);
  };

  const handleArchive = (parent: any) => {
    setParentToArchive(parent);
    setShowConfirmDialog(true);
  };

  const handleConfirmArchive = () => {
    if (parentToArchive) {
      dispatch(deleteParent(parentToArchive?.id_parent as number))
    }
    setShowConfirmDialog(false);
    setParentToArchive(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // ? Rechercher l'etudiant 
  const handleSearcheStudent = (e: React.FormEvent<HTMLFormElement>) => {
    setSutudentToAddParent(null);
    onSearchMatSubmit((validateData: any) => {
      dispatch(getStudent(validateData.get('matricule_etudiant') as string)).then((action) => {
        if (getStudent.pending.match(action)) {
          // setSearchLoading(true);
        }
        if (getStudent.fulfilled.match(action)) {
          const response = action.payload;
          // setSearchLoading(false);
          if (response) {
            setSutudentToAddParent(action.payload as StudentDetailsType);
          } else {
            setSutudentToAddParent(null);
          }
        }
      }).catch((action) => {
        console.error(`Erreur lors la recuperation de l\'étudiant ${validateData.get('matricule_etudiant')}`, action.payload);
      })
    }, e);
  }


  // Modal
  useEffect(() => {
    if (showModal && hiddeTheModalActive) {
      handleCloseModal();
      setSutudentToAddParent(null);
    }
  }, [hiddeTheModalActive]);

  useEffect(() => {
    dispatch(getAllParent());
  }, [dispatch]);

  // ? ================== TABLEAU ===================== //
  const actions = [
    { icon: Eye, label: 'Voir', onClick: (item: any) => console.log('Voir', item), color: 'blue' },
    { icon: Edit, label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive, label: 'Archiver', onClick: handleArchive, color: 'red' },
  ];
  const columns = [
    {
      key: 'nom', label: 'Etudiant', render: (value: string, item: any) => (
        <div className="flex items-center space-x-3 relative">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer">
            {item.photo && <img src={baseUrl(item.photo)} alt="" className="w-full h-full object-cover" />}
          </div>
          <div>
            <div className="font-medium text-blue-500 hover:underline">
              <Link to={`/students/${item.matricule_etudiant}`}>{value} {item.prenom}</Link>
            </div>
            <div className="text-xs text-gray-500">{item.matricule_etudiant}</div>
          </div>
        </div>
      )
    },
    {
      key: 'nom_pere', label: 'Père', render: (value: string, item: ParentType) => (
        <div>
          {value !== '' ? <>
            <div>
              <span className=''> {item.nom_pere} • </span>
              <span className='italic text-gray-500'>{item.profession_pere}</span>
            </div>
            <span className='text-sm italic text-blue-600'>{item.telephone_pere}</span>
          </> : <span className='text-gray-400'>Non défini</span>}
        </div>
      )
    },
    {
      key: 'nom_mere', label: 'Mère', render: (value: string, item: ParentType) => (
        <div>
          {value !== '' ? <>
            <div>
              <span className=''> {item.nom_mere} • </span>
              <span className='italic text-gray-500'>{item.profession_mere}</span>
            </div>
            <span className='text-sm italic text-blue-600'>{item.telephone_mere}</span>
          </> : <span className='text-gray-400'>Non défini</span>}
        </div>
      )
    },
    {
      key: 'tuteur_nom', label: 'Tuteur', render: (value: string, item: ParentType) => (
        <div>
          {value !== '' ? <>
            <div>
              <span className=''> {item.tuteur_nom}</span>
            </div>
            <span className='text-sm italic text-blue-600'>{item.tuteur_tel}</span>
          </> : <span className='text-gray-400'>Non défini</span>}
        </div>
      )
    },
    { key: 'tuteur_email', label: 'Email' },
    {
      key: 'type', label: 'Relation', render: (value: string, item: ParentType) => (
        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getParentRelationColor(value)}`}>
          {getParentRelationIcon(value)}
          <span>{value === 'parent/tuteur' ? `PARENT / ${item.tuteur_lien?.toUpperCase()}` : value === 'parent' ? value.toLocaleUpperCase() : item?.tuteur_lien != '' ? item?.tuteur_lien?.toLocaleUpperCase() : value?.toLocaleUpperCase()}</span>
        </span>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Parents et Tuteurs</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une matière..."
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
          data={parents}
          columns={columns}
          actions={actions}
          searchTerm={searchTerm}
          isLoading={action.isLoading as boolean}
        />
      </div>

      {/* Modal pour ajouter/modifier une matière */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={sutudentToAddParent?.id_parent ? 'Modification' : 'Ajout Parent / Tuteur'}
        size='lg'
      >
        <div className="space-y-4">
          <InputError message={error} />
          {/* Formulaire pour Rechercher une etudiant */}
          <form className='' onSubmit={handleSearcheStudent}>
            <div className="flex gap-2">
              <div className='flex-1'>
                <Input
                  label="Matricule de l'étudiant"

                  name='matricule_etudiant'
                  icon={Search}
                  placeholder="Rechercher le matricule de l'étudiant"
                  defaultValue={sutudentToAddParent?.matricule_etudiant}
                />
              </div>
              <button
                // onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>Rechercher</span>
              </button>
            </div>
            <div className='w-full'>
              <InputError message={searMatchFormErrors?.matricule_etudiant} />
            </div>
          </form>
          {/* Si il n'y a pas d'etudiant et pas de modification  */}
          {sutudentToAddParent === null &&
            <div className='bg-gray-50 p-6 border border-gray-100 rounded flex items-center justify-center text-xl text-gray-400 italic'>
              <div>Acune étudiant trouvé...</div>
            </div>
          }
          {sutudentToAddParent !== null &&
            <div className="flex items-center justify-center border-b py-2 space-x-3 relative">
              <div className="w-116 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer">
                {sutudentToAddParent.photo && <img src={baseUrl(sutudentToAddParent.photo)} alt="" className="w-full h-full object-cover" />}
              </div>
              <div>
                <div className="font-medium text-blue-500 hover:underline">
                  <Link
                    to={`/students/${sutudentToAddParent.matricule_etudiant}`}
                    className='text-xl'>
                    {sutudentToAddParent.nom} {sutudentToAddParent.prenom}
                  </Link>
                </div>
                <div className="text-sm text-gray-500">{sutudentToAddParent.matricule_etudiant}</div>
                <div className="text-sm text-orange-500">{sutudentToAddParent.denomination}</div>
              </div>
            </div>
          }
        </div>
        {sutudentToAddParent !== null &&
          <Onglet onlgets={[
            {
              key: 'Parent',
              component: <ParentForm
                student={sutudentToAddParent as StudentDetailsType}
                handleCloseModal={handleCloseModal}
              />
            },
            {
              key: 'Tuteur', component: <TuteurForm
                student={sutudentToAddParent as StudentDetailsType}
                handleCloseModal={handleCloseModal}
              />
            },
          ]} />
        }
      </Modal>

      {/* Dialog de confirmation */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmArchive}
        title="Supprimer les parent"
        message={`Êtes-vous sûr de vouloir supprimer les information sur les parent de ${parentToArchive?.nom?.toUpperCase()} ${parentToArchive?.prenom} ?`}
      />
    </div>
  );
};

export default Parents;

// Validation de donnée avec yup 
const ParentSchema = object({
  nom_pere: string()
    .required('Le nom du père est obligatoire.'),
  nom_mere: string()
    .required('Le nom de la mère est obligatoire.'),
  telephone_pere: string()
    .required('Le numero de télephone.'),
  adresse: string()
    .required('L\'addresse est obligatoire.'),
});
type ParentFormPropsType = { student: StudentDetailsType, handleCloseModal: () => void };
const ParentForm: React.FC<ParentFormPropsType> = ({ student, handleCloseModal }) => {

  const { onSubmite: onSubmitParent, formErrors: formErrorsParent } = useForm<ParentType>(ParentSchema, ParentInitialValue);
  const dispatch: AppDispatch = useDispatch();
  const [isDeletingTuteurInfo, setIsDeletingTuteurInfo] = useState(true)

  // ? Handlers
  const handleParentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmitParent((validateData) => {
      student?.id_parent != null ? dispatch(updateParent({ parent: validateData, id: student?.id_parent as number })) : dispatch(createParent(validateData))
    }, e)
  }
  return (
    <form onSubmit={handleParentSubmit}>
      <div className='space-y-4'>
        {/* Information sur le père  */}
        <h2 className='text-sm text-gray-500 italic'>Information sur le père : </h2>
        <input type="hidden"
          name='tuteur_type' value={'parent'}
        />
        <input type="hidden"
          name='id_eleve' value={student.id_eleve}
          onChange={() => { }}
        />
        <Input
          label='Nom et prénoms du père'
          name='nom_pere'
          defaultValue={student?.nom_pere || ''}
          icon={User}

          errorMessage={formErrorsParent?.nom_pere}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label='Profession du père'
            name='profession_pere'
            defaultValue={student?.profession_pere || ''}
            icon={UserCheck}
            errorMessage={formErrorsParent?.profession_pere}
          />
          <Input
            label='Téléphone du père'
            name='telephone_pere'
            defaultValue={student?.telephone_pere || ''}
            icon={Phone}
            errorMessage={formErrorsParent?.telephone_pere}
          />
        </div>
        <Input
          label='Photocopie CIN du père'
          name='pc_cin_pere'
          defaultValue={student?.bulletin || ''}
          icon={FolderOpen}
          iconColor='text-amber-500' type='file'
        />

        {/* Information sur la mère */}
        <h2 className='text-sm text-gray-500 italic'>Information sur la mère : </h2>
        <Input
          label='Nom et prénoms de la mère'
          name='nom_mere'
          defaultValue={student?.nom_mere || ''}
          icon={User}
          errorMessage={formErrorsParent?.nom_mere}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label='Profession de la mère'
            name='profession_mere'
            defaultValue={student?.profession_mere || ''}
            icon={UserCheck}
            errorMessage={formErrorsParent?.profession_mere}
          />
          <Input
            label='Téléphone de la mère'
            name='telephone_mere'
            defaultValue={student?.telephone_mere || ''}
            icon={Phone}
            errorMessage={formErrorsParent?.telephone_mere}
          />
        </div>
        <Input
          label='Photocopie CIN de la mère'
          name='pc_cin_mere'
          defaultValue={student?.bulletin || ''}
          icon={FolderOpen}
          iconColor='text-amber-500' type='file'
        />

        {/* Autre information  */}
        <h2 className='text-sm text-gray-500 italic'>Autre Information : </h2>
        <Input
          label='Adresse des parents'
          name='adresse'
          defaultValue={student?.adresse || ''}
          icon={Home}
          errorMessage={formErrorsParent?.adresse}
        />
        <Input
          label='Email'
          name='tuteur_email'
          defaultValue={student?.tuteur_email || ''}
          icon={Mail}
          errorMessage={formErrorsParent?.tuteur_email}
        />

        {student.id_parent &&
          <label className="flex cursor-pointer col-span-2  bg-yellow-100 p-3 rounded  items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Supprimer les information sur le tuteur actuel</h4>
              <p className="text-sm text-gray-600">Ne garder que les information sur les parent de {student.nom} {student.prenom} </p>
            </div>
            <div className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value={isDeletingTuteurInfo ? 'true' : 'false'}
                name='to_delete_tuteur'
                className="sr-only peer"
                onChange={(e) => setIsDeletingTuteurInfo(e.target.checked)}
                defaultChecked={isDeletingTuteurInfo}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </div>
          </label>
        }
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={handleCloseModal}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <X className='h-5 w-5 me-1 inline-block' />
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {student.id_parent ? <>
            <PenBox className='h-5 w-5 me-1 inline-block' />
            <span>Modifier</span>
          </>
            : <>
              <Check className='h-5 w-5 me-1 inline-block' />
              <span>Ajouter</span>
            </>}
        </button>
      </div>
    </form>
  )
}

// ! FORMULAIRE POUR LE TYPE TUTEUR
// Validation de donnée avec yup 
const TuteurSchema = object({
  tuteur_nom: string()
    .required('Le nom  est obligatoire.'),
  tuteur_tel: string()
    .required('Le numero de télephone.'),
  adresse: string()
    .required('L\'addresse est obligatoire.'),
  tuteur_lien: string()
    .required('Ce champ est obligatoire')
});

type TuteurFormPropsType = { student: StudentDetailsType, handleCloseModal: () => void };
const TuteurForm: React.FC<TuteurFormPropsType> = ({ student, handleCloseModal }) => {

  const { onSubmite, formErrors } = useForm<ParentType>(TuteurSchema, ParentInitialValue);
  const [isDeletingParentInfo, setIsDeletingParentInfo] = useState(true)
  const dispatch: AppDispatch = useDispatch();

  // ? Handlers
  const handleSubmite = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmite((validateData) => {
      student?.id_parent != null ? dispatch(updateParent({ parent: validateData, id: student?.id_parent as number })) : dispatch(createParent(validateData))
    }, e)
  }

  return (
    <form onSubmit={handleSubmite}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="hidden"
          name='tuteur_type'
          value={'tuteur'}
        />
        <input type="hidden"
          name='id_eleve' value={student.id_eleve}
          onChange={() => { }}
        />
        <Input
          label='Nom et prénoms du tuteur légal'
          name='tuteur_nom'
          defaultValue={student?.tuteur_nom || ''}
          icon={User}
          errorMessage={formErrors?.tuteur_nom}
        />
        <Input
          label='Lien avec l’élève'
          name='tuteur_lien'
          defaultValue={student?.tuteur_lien || ''}
          icon={UserCheck}
          errorMessage={formErrors?.tuteur_lien}
        />
        <Input
          label='Téléphone du tuteur'
          name='tuteur_tel'
          defaultValue={student?.tuteur_tel || ''}
          icon={Phone}
          errorMessage={formErrors?.tuteur_tel}
        />
        <Input
          label='Email du tuteur'
          name='tuteur_email'
          defaultValue={student?.tuteur_email || ''}
          icon={Mail}
          errorMessage={formErrors?.tuteur_email}
        />
        <Input
          label='Adresse '
          name='adresse'
          defaultValue={student?.adresse || ''}
          icon={Home}
          errorMessage={formErrors?.adresse}
        />
        <Input
          label='Photocopie CIN du tuteur'
          name='pc_cin_tuteur'
          defaultValue={student?.bulletin || ''}
          icon={FolderOpen}
          iconColor='text-amber-500'
          type='file'
        />

        {student.id_parent &&
          <label className="flex cursor-pointer col-span-2  bg-yellow-100 p-3 rounded  items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Supprimer les information sur les parent</h4>
              <p className="text-sm text-gray-600">Ne garder que les information sur le tuteur de {student.nom} {student.prenom} </p>
            </div>
            <div className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value={isDeletingParentInfo ? 'true' : 'false'}
                name='to_delete_parent'
                className="sr-only peer"
                onChange={(e) => setIsDeletingParentInfo(e.target.checked)}
                defaultChecked={isDeletingParentInfo}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </div>
          </label>
        }
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={handleCloseModal}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <X className='h-5 w-5 me-1 inline-block' />
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {student.id_parent ? <>
            <PenBox className='h-5 w-5 me-1 inline-block' />
            <span>Modifier</span>
          </>
            : <>
              <Check className='h-5 w-5 me-1 inline-block' />
              <span>Ajouter</span>
            </>}
        </button>
      </div>
    </form>
  )
}