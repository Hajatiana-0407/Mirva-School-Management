import { useEffect, useState } from 'react';
import { Archive, User, Eye, Edit, Users, TrendingUp, TrendingDown, Plus } from 'lucide-react';

import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import Table from '../Table';
import { useDispatch, useSelector } from 'react-redux';
import { StudentType, RegistrationType } from '../../Utils/Types';
import { AppDispatch } from '../../Redux/store';
import { deleteStudent, filterStudent, getAllStudent, getStatistique } from './redux/StudentAsyncThunk';
import { getAppState } from '../../Redux/AppSlice';
import { getStudentState } from './redux/StudentSlice';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import Profile from '../../Components/ui/Profile';
import RegisterForm from '../../Components/Forms/RegisterForm';
import StudentForm from '../../Components/Forms/StudentForm';
import { useHashPermission } from '../../Hooks/useHashPermission';
import Title from '../../Components/ui/Title';
import FilterAndSearch, { FilterAndSearchType } from '../../Components/FilterAndSearch';
import { getLevelState } from '../Levels/redux/LevelSlice';
import { getClasseState } from '../Classes/redux/ClasseSlice';
import { getAllLevel } from '../Levels/redux/LevelAsyncThunk';
import { getAllClasse } from '../Classes/redux/ClasseAsyncThunk';


const Student = () => {
  const { datas: students, action, pagination } = useSelector(getStudentState);
  const { datas: levels } = useSelector(getLevelState);
  const { datas: classes } = useSelector(getClasseState);

  const { hiddeTheModalActive } = useSelector(getAppState);
  const [showModal, setShowModal] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [studentToArchive, setStudentToArchive] = useState<StudentType | null>(null);
  const [statistique, setStatistique] = useState<any>(null)
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const permission = useHashPermission({ redirect: true });

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
    if (students.length == 0)
      dispatch(getAllStudent({}));

    if (levels.length == 0)
      dispatch(getAllLevel({}));
    if (classes.length == 0)
      dispatch(getAllClasse({}));
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
    { icon: Eye, label: "Voir les détails", onClick: (item: RegistrationType) => navigate('/back-office/students/' + item.matricule_etudiant), color: 'primary' },
    { icon: Edit, type: 'update', label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive, type: 'delete', label: "Supprimer", onClick: handleArchive, color: 'red' },
  ];

  const columns = [
    {
      key: 'nom', label: 'Profil', render: (value: string, item: StudentType) => (
        <Profile
          fullName={`${value} ${item.prenom}`}
          identification={item.matricule_etudiant}
          photo={item.photo as string}
          link={`/back-office/students/${item.matricule_etudiant}`}
        />
      )
    },
    {
      key: 'denomination', label: 'Classe', render: (value: string, item: any) => (
        <div className="flex flex-col">
          <span className={clsx({
            'hidden': !item.niveau
          }, 'text-xs italic text-primary-600')}>
            {item.niveau}
          </span>
          {value}
          {!value && !item.niveau &&
            <div className='text-secondary-400 italic'>non inscrit</div>
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


  // Donnée pour le filtre 
  const filter: FilterAndSearchType = {
    pagination: pagination,
    thunk: getAllStudent,
    isAdvanced: true,
    filters: [
      { label: 'Niveau', name: 'niveau', type: 'select', options: levels.map(level => ({ label: level.niveau, value: level.id_niveau as number })) },
      { label: 'Classe', name: 'classe', type: 'select', options: classes.map(classe => ({ label: classe.denomination, value: classe.id_classe as number })) },
      { label: 'Genre', name: 'sexe', type: 'select', options: [{ label: 'Homme', value: 2 }, { label: 'Femme', value: 1 }] },
    ],
    filterThunk: filterStudent,
    isLoading: action.isFilterLoading
  }
  return (
    <div className="space-y-4 md:space-y-6">
      <Title
        title='Liste des étudiants'
        description='Consultez et gérez les informations des étudiants inscrits.'
        fixed
        filter={filter}
      >
        {permission.create &&
          <button
            onClick={() => setShowModalRegister(true)}
            className="bg-primary-600 text-light px-2 py-1 sm:px-4 sm:py-2 _classe rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className='max-md:hidden-susp'>Nouvelle inscription  </span>
          </button>
        }
      </Title>

      {/* Girl statistique */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-light p-3 md:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Fille</p>
              <p className="text-2xl font-bold text-secondary-900"> {parseInt(statistique?.girl?.nbr) || 0}</p>
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
              {parseInt(statistique?.girl?.percent) || 0} %
            </span>
          </div>
        </div>

        {/* Boy statistique */}
        <div className="bg-light p-3 md:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Graçon</p>
              <p className="text-2xl font-bold text-secondary-900"> {parseInt(statistique?.boy?.nbr) || 0}</p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-primary-100`}>
              <User className={`w-6 h-6 text-primary-500`} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {statistique?.boy.nbr >= statistique?.girl.nbr ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm ${statistique?.boy.nbr >= statistique?.girl.nbr ? 'text-green-600' : 'text-red-600'}`}>
              {parseInt(statistique?.boy?.percent) || 0} %
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="bg-light p-3 md:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Total</p>
              <p className="text-2xl font-bold text-secondary-900"> {statistique?.all?.nbr || 0}</p>
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

      <div className="bg-light p-3 md:p-6 rounded-lg shadow-sm border">
        <FilterAndSearch
          pagination={pagination}
          thunk={getAllStudent}
          filterThunk={filterStudent}
        />

        <Table
          data={students}
          columns={columns}
          actions={actions}
          isLoading={action.isLoading as boolean}
          onRowClick={(item: StudentType) => navigate(`/back-office/students/${item.matricule_etudiant}`)}
          pagination={pagination}
          thunk={getAllStudent}
          filterThunk={filterStudent}
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