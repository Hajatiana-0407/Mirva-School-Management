import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, Edit, Archive,  User, X, PenBox, Check, Users } from 'lucide-react';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import Table from '../Table';
import { useDispatch, useSelector } from 'react-redux';
import { getParentState } from './redux/ParentSlice';
import useForm from '../../Hooks/useForm';
import { ApiReturnType, ParentType, StudentType } from '../../Utils/Types';
import { object, string } from 'yup';
import { AppDispatch } from '../../Redux/store';
import { deleteParent, getAllParent, upsertParent } from './redux/ParentAsyncThunk';
import { getAppState } from '../../Redux/AppSlice';
import InputError from '../../Components/ui/InputError';
import Input from '../../Components/ui/Input';
import { StudentDetailsType } from '../../Utils/Types';
import { getStudentByMatricule } from '../Students/redux/StudentAsyncThunk';
import Onglet from '../../Components/ui/Onglet';
import Profile from '../../Components/ui/Profile';
import ParentForm, { ParentSchema } from '../../Components/Forms/ParentForm';
import TuteurForm from '../../Components/Forms/TuteurForm';
import Loading from '../../Components/ui/Loading';
import ParentModifForm from '../../Components/Forms/ParentModifForm';
import { baseUrl } from '../../Utils/Utils';

const SearchFormSchema = object({
  matricule_etudiant: string().required('le matricule ne peut pas être vide .'),
});

// ? Style pour la column relation
const getParentRelationColor = (status: string) => {
  switch (status) {
    case 'tuteur':
      return 'bg-yellow-100 text-yellow-800';
    case 'père':
      return 'bg-green-100 text-green-800';
    case 'mère':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};


type ParentStudentType = ParentType & StudentType;

const Parents = () => {
  const { datas: parents, action, error } = useSelector(getParentState);

  const { hiddeTheModalActive } = useSelector(getAppState);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [parentToArchive, setParentToArchive] = useState<ParentStudentType | null>(null);
  const [studentToAddParent, setStudentToAddParent] = useState<StudentDetailsType | null>(null);
  const { onSubmite: onSearchMatSubmit, formErrors: searMatchFormErrors } = useForm(SearchFormSchema, { matricule_etudiant: '' });
  const dispatch: AppDispatch = useDispatch();
  const [parentToUpdate, setParentToUpdate] = useState<ParentType | undefined>(undefined);

  const [showModalModif, setShowModalModif] = useState(false)

  const [isLoading, setIsLoading] = useState(false);

  const { formErrors, onSubmite } = useForm(ParentSchema, {})

  const handleEdit = (parent: ParentType) => {
    setParentToUpdate(parent);
    setShowModalModif(true);
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

  const handleCloseModalModif = () => {
    setShowModalModif(false);
  }

  const handleSearchByMat = (matricule: string) => {
    dispatch(getStudentByMatricule(matricule))
      .unwrap()
      .then((data: ApiReturnType) => {
        setStudentToAddParent(data.data);
      })
      .catch((err) => {
        console.error("Erreur lors de la recherche par matricule etudiant", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // ? Rechercher l'etudiant 
  const handleSearcheStudent = (e: React.FormEvent<HTMLFormElement>) => {
    setStudentToAddParent(null);
    onSearchMatSubmit((validateData: any) => {
      setIsLoading(true);
      handleSearchByMat(validateData.get('matricule_etudiant') as string);
    }, e);
  }

  // ! ===================== Soumission de la formulaire d'ajout parent ===================== //
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmite((validateData: any) => {
      dispatch(upsertParent(validateData));
    }, e)
  }

  // Modal
  useEffect(() => {
    if (showModal && hiddeTheModalActive) {
      handleCloseModal();
      setStudentToAddParent(null);
    }

    if (showModalModif && hiddeTheModalActive) {
      handleCloseModalModif();
    }
  }, [hiddeTheModalActive]);

  useEffect(() => {
    dispatch(getAllParent());
  }, [dispatch]);

  // ? ================== TABLEAU ===================== //
  const actions = [
    { icon: Edit, label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive, label: 'Archiver', onClick: handleArchive, color: 'red' },
  ];
  const columns = [
    {
      key: 'type', label: 'Relation', render: (value: string) => (
        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getParentRelationColor(value)}`}>
          <User className="w-4 h-4" />
          <span>{value?.toUpperCase()}</span>
        </span>
      )
    },
    {
      key: 'nom', label: 'Nom complet', render: (value: string, item: ParentType) => (
        <div>
          {value !== '' ? <>
            <div>
              <span className=''> {item.nom} {item.prenom} • </span>
              <span className='italic text-gray-500'>{item.profession}</span>
            </div>
            <span className='text-sm italic text-blue-600'>{item.telephone}</span>
          </> : <span className='text-gray-400'>Non défini</span>}
        </div>
      )
    },
    { key: 'email', label: 'Email' },
    { key: 'adresse', label: 'Adresse' },
    {
      key: 'pc_cin', label: 'CIN', render: (value: string) => (
        <div>
          {value &&
            <a href={baseUrl(value)} target='_blank'>
              <img src={baseUrl(value)} alt="CIN" className='h-10' />
            </a>
          }
        </div>
      )
    }

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

      {/* Modal pour ajouter une Parents */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={studentToAddParent ? `Modification Parent de ${studentToAddParent?.prenom}` : 'Ajout Parent / Tuteur'}
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
                type='submit'
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
          {studentToAddParent === null && !isLoading &&
            <div className='bg-gray-50  p-6 border border-gray-100 rounded flex items-center justify-center text-lg text-gray-400 italic'>
              <div>Acune étudiant trouvé...</div>
            </div>
          }
          {isLoading &&
            <Loading />
          }

          {studentToAddParent &&
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

        {studentToAddParent &&
          <form onSubmit={handleSubmit} className='mt-5'>
            <input type="hidden" name='id_eleve' value={studentToAddParent.id_eleve} />
            <Onglet onlgets={[
              {
                key: 'Parent',
                component: <ParentForm
                  formErrors={formErrors}
                  student={studentToAddParent as StudentDetailsType}
                /> , 
                Icon: Users 
              },
              {
                key: 'Tuteur', component: <TuteurForm
                  formErrors={formErrors}
                  student={studentToAddParent as StudentDetailsType}
                /> , 
                Icon: User 
              },
            ]} />

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
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                {action.isLoading && <div className="w-5 h-5 me-1 inline-block border-4 border-white border-t-transparent rounded-full animate-spin"></div>}
                {studentToAddParent?.pere || studentToAddParent?.mere || studentToAddParent?.tuteur ? <>
                  {!action.isLoading &&
                    <PenBox className='h-5 w-5 me-1 inline-block' />
                  }
                  <span>Modifier</span>
                </>
                  : <>
                    {!action.isLoading &&
                      <Check className='h-5 w-5 me-1 inline-block' />
                    }
                    <span>Ajouter</span>
                  </>}
              </button>
            </div>
          </form>
        }
      </Modal>

      <Modal
        isOpen={showModalModif}
        onClose={handleCloseModalModif}
        title={parentToUpdate ? parentToUpdate.nom + ' ' + parentToUpdate.prenom + '( ' + parentToUpdate.type + ' )' : 'Modification'}
        size='lg'
      >
        <ParentModifForm handleCloseModal={handleCloseModalModif} parent={parentToUpdate as ParentType} />
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
