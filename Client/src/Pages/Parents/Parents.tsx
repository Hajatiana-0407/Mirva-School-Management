import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, Edit, Archive, Eye, User, Users, User2 } from 'lucide-react';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import Table from '../Table';
import { useDispatch, useSelector } from 'react-redux';
import { getParentState } from './redux/ParentSlice';
import useForm from '../../Hooks/useForm';
import { ParentType, StudentType } from '../../Utils/Types';
import { object, string } from 'yup';
import { AppDispatch } from '../../Redux/store';
import { deleteParent, getAllParent } from './redux/ParentAsyncThunk';
import { getAppState } from '../../Redux/AppSlice';
import InputError from '../../Components/ui/InputError';
import Input from '../../Components/ui/Input';
import { StudentDetailsType } from '../Students/StudentSinglePage';
import { getStudentByMatricule } from '../Students/redux/StudentAsyncThunk';
import Onglet from '../../Components/ui/Onglet';
import Profile from '../../Components/ui/Profile';
import ParentForm from '../../Components/Forms/ParentForm';
import TuteurForm from '../../Components/Forms/TuteurForm';
import { getStudentState } from '../Students/redux/StudentSlice';
import Loading from '../../Components/ui/Loading';

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
  const { single: studendSingle } = useSelector(getStudentState);

  const { hiddeTheModalActive } = useSelector(getAppState);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [parentToArchive, setParentToArchive] = useState<ParentStudentType | null>(null);
  const [studentToAddParent, setStudentToAddParent] = useState<StudentDetailsType | null>(null);
  const { onSubmite: onSearchMatSubmit, formErrors: searMatchFormErrors } = useForm(SearchFormSchema, { matricule_etudiant: '' });
  const dispatch: AppDispatch = useDispatch();


  const handleEdit = (student: StudentDetailsType) => {
    setStudentToAddParent(student);
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
    setStudentToAddParent(null);
  };

  // ? Rechercher l'etudiant 
  const handleSearcheStudent = (e: React.FormEvent<HTMLFormElement>) => {
    setStudentToAddParent(null);
    onSearchMatSubmit((validateData: any) => {
      dispatch(getStudentByMatricule(validateData.get('matricule_etudiant') as string))
    }, e);
  }

  useEffect(() => {
    if (studendSingle) {
      setStudentToAddParent(studendSingle.data as StudentDetailsType)
    }
  }, [studendSingle])

  // Modal
  useEffect(() => {
    if (showModal && hiddeTheModalActive) {
      handleCloseModal();
      setStudentToAddParent(null);
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
      key: 'nom', label: 'Etudiant', render: (value: string, item: StudentType) => (
        <Profile
          fullName={value ? `${value} ${item.prenom}` : ""}
          photo={item.photo as string}
          identification={item.matricule_etudiant}
          link={`/students/${item.matricule_etudiant}`}
        />
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
          onClick={() => {
            setStudentToAddParent(null);
            setShowModal(true);
          }}
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
        title={studentToAddParent?.id_parent ? `Modification Parent de ${studentToAddParent?.prenom}` : 'Ajout Parent / Tuteur'}
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
                  defaultValue={studentToAddParent?.matricule_etudiant}
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
          {studentToAddParent === null && !studendSingle.action.isLoading &&
            <div className='bg-gray-50  p-6 border border-gray-100 rounded flex items-center justify-center text-lg text-gray-400 italic'>
              <div>Acune étudiant trouvé...</div>
            </div>
          }
          {studendSingle.action.isLoading &&
            <Loading />
          }

          {studentToAddParent !== null  &&
            <div className='w-full py-5 mb-5 flex justify-center bg-blue-50 border border-blue-200 rounded'>
              <Profile
                fullName={studentToAddParent?.nom ? `${studentToAddParent?.nom} ${studentToAddParent?.prenom}` : ''}
                photo={studentToAddParent?.photo as string}
                copy={false}
                identification={studentToAddParent?.matricule_etudiant}
              />
            </div>
          }
        </div>

        {studentToAddParent !== null && !studendSingle.action.isLoading  &&
          <div className='mt-5'>
            <Onglet onlgets={[
              {
                key: 'Parent',
                component: <ParentForm
                  student={studentToAddParent as StudentDetailsType}
                  handleCloseModal={handleCloseModal}
                />
              },
              {
                key: 'Tuteur', component: <TuteurForm
                  student={studentToAddParent as StudentDetailsType}
                  handleCloseModal={handleCloseModal}
                />
              },
            ]} />
          </div>
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
