import { useEffect, useState } from 'react';
import { Search, Filter, Archive, User, Eye, Edit, Users, TrendingUp, TrendingDown, Plus } from 'lucide-react';

import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import Table from '../Table';
import { useDispatch, useSelector } from 'react-redux';
import { StudentType, RegistrationType } from '../../Utils/Types';
import { AppDispatch } from '../../Redux/store';
import { deleteStudent, getAllStudent, getStatistique } from './redux/StudentAsyncThunk';
import { getAppState } from '../../Redux/AppSlice';
import { getStudentState } from './redux/StudentSlice';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import Profile from '../../Components/ui/Profile';
import RegisterForm from '../../Components/Forms/RegisterForm';
import StudentForm from '../../Components/Forms/StudentForm';
import { useHashPermission } from '../../Hooks/useHashPermission';
import Title from '../../Components/ui/Title';


const Student = () => {
  const { datas: students, action } = useSelector(getStudentState);

  const { hiddeTheModalActive } = useSelector(getAppState);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [studentToArchive, setStudentToArchive] = useState<StudentType | null>(null);
  const [statistique, setStatistique] = useState<any>(null)
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const permission = useHashPermission(  { redirect : true  });

  const handleEdit = (student: StudentType) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  const handleArchive = (student: any) => {
    setStudentToArchive(student);
    setShowConfirmDialog(true);
  };

  const handleConfirmArchive = () => {
    if (studentToArchive) {
      dispatch(deleteStudent(studentToArchive?.id_eleve as number))
    }
    setShowConfirmDialog(false);
    setStudentToArchive(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingStudent(null);
  };
  const handleCloseModalRegister = () => {
    setShowModalRegister(false);
  };



  // Modal
  useEffect(() => {
    if (showModal && hiddeTheModalActive) {
      handleCloseModal();
    }
  }, [hiddeTheModalActive]);
  useEffect(() => {
    if (showModalRegister && hiddeTheModalActive) {
      handleCloseModalRegister();
    }
  }, [hiddeTheModalActive]);

  useEffect(() => {
    dispatch(getAllStudent());
  }, [dispatch]);


  useEffect(() => {
    dispatch(getStatistique()).then((action) => {
      if (getStatistique.fulfilled.match(action)) {
        setStatistique(action.payload);
      }
      if (getStatistique.rejected.match(action)) {
        console.error("Erreur lors de la recupération de statistique des étudiant ", action.payload);
      }
    })
  }, [students])


  // ===================== TABLEAUX =====================
  const actions = [
    { icon: Eye, label: 'Voir', onClick: (item: RegistrationType) => navigate('/students/' + item.matricule_etudiant), color: 'blue' },
    { icon: Edit, type: 'update', label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive, type: 'delete', label: 'Archiver', onClick: handleArchive, color: 'red' },
  ];

  const columns = [
    {
      key: 'nom', label: 'Profil', render: (value: string, item: StudentType) => (
        <Profile
          fullName={`${value} ${item.prenom}`}
          identification={item.matricule_etudiant}
          photo={item.photo as string}
          link={`/students/${item.matricule_etudiant}`}
        />
      )
    },
    {
      key: 'denomination', label: 'Classe', render: (value: string, item: any) => (
        <div className="flex flex-col">
          <span className={clsx({
            'hidden': !item.niveau
          }, 'text-xs italic text-blue-600')}>
            {item.niveau}
          </span>
          {value}
          {!value && !item.niveau &&
            <div className='text-gray-400 italic'>non inscrit</div>
          }
        </div>
      )
    },
    {
      key: 'telephone', label: 'Contact', render: (value: string, item: StudentType) => (
        <div className='flex flex-col'>
          <span>{value}</span>
          <span className='text-sm text-green-500'>{item.email}</span>
        </div>
      )
    },
    {
      key: 'adresse', label: 'Adresse', render: (value: string) => (
        <div className='' >
          {value}
        </div>
      )
    },
    { key: 'nationalite', label: 'Nationalité' },
    { key: 'sexe', label: 'Sexe' },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <Title
        title='Liste des étudiants'
        description='Consultez et gérez les informations des étudiants inscrits.'
      >
        {permission.create &&
          <button
            onClick={() => setShowModalRegister(true)}
            className="bg-blue-600 text-white px-2 py-1 sm:px-4 sm:py-2 _classe rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className='max-md:hidden-susp'>Nouvelle inscription  </span>
          </button>
        }
      </Title>

      {/* Girl statistique */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white p-3 md:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Fille</p>
              <p className="text-2xl font-bold text-gray-900"> {parseInt(statistique?.girl?.nbr) || 0}</p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-rose-100`}>
              <User className={`w-6 h-6 text-rose-500`} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {statistique?.girl.nbr >= statistique?.boy.nbr ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm ${statistique?.girl.nbr >= statistique?.boy.nbr ? 'text-green-600' : 'text-red-600'}`}>
              {parseInt(statistique?.girl?.percent) || 0 } %
            </span>
          </div>
        </div>

        {/* Boy statistique */}
        <div className="bg-white p-3 md:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Graçon</p>
              <p className="text-2xl font-bold text-gray-900"> {parseInt(statistique?.boy?.nbr) || 0}</p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-blue-100`}>
              <User className={`w-6 h-6 text-blue-500`} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {statistique?.boy.nbr >= statistique?.girl.nbr ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm ${statistique?.boy.nbr >= statistique?.girl.nbr ? 'text-green-600' : 'text-red-600'}`}>
              {parseInt(statistique?.boy?.percent) || 0 } %
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="bg-white p-3 md:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900"> {statistique?.all?.nbr || 0}</p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-green-100`}>
              <Users className={`w-6 h-6 text-green-500`} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className={`text-sm text-green-600`}>
              {parseInt(statistique?.all?.percent)} %
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white p-3 md:p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6 md:mb-6">
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
            <button className="flex items-center space-x-2 px-2 py-1 sm:px-4 sm:py-2 _classe border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filtres</span>
            </button>
          </div>
        </div>

        <Table
          data={students}
          columns={columns}
          actions={actions}
          searchTerm={searchTerm}
          isLoading={action.isLoading as boolean}
        />
      </div>

      {/* Modal pour ajouter/modifier un etudiant */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingStudent ? `${editingStudent.nom} ${editingStudent.prenom} ( ${editingStudent.matricule_etudiant} )` : 'Nouvelle étudiant'}
        size='lg'
      >
        <StudentForm
          editingStudent={editingStudent as StudentType}
          handleCloseModal={handleCloseModal}
        />
      </Modal>


      {/* Formulaire d'inscription */}
      <Modal
        isOpen={showModalRegister}
        onClose={handleCloseModalRegister}
        title={editingStudent ? "Modifier l'élève" : "Nouvelle inscription"}
        size='lg'
      >
        <RegisterForm />
      </Modal>

      {/* Dialog de confirmation */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmArchive}
        title="Archiver la matière"
        message={`Êtes-vous sûr de vouloir archiver la matière ${studentToArchive?.nom} ?`}
      />
    </div>
  );
};

export default Student;