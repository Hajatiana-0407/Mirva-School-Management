import React, { useEffect, useState } from 'react';
import { Search, Filter, Archive, User, UserCheck, CalendarDays, MapPin, Home, Phone, Mail, Globe, Eye, Edit, Activity, Users, FolderOpen, Focus } from 'lucide-react';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';
import Table from '../Table';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../Hooks/useForm';
import { StudentType, StudentInitialValue, RegistrationType } from '../../Utils/Types';
import { object, string } from 'yup';
import { AppDispatch } from '../../Redux/store';
import { createStudent, deleteStudent, getAllStudent, getStatistique, updateStudent } from './redux/StudentAsyncThunk';
import { getAppState } from '../../Redux/AppSlice';
import InputError from '../ui/InputError';
import { getStudentState } from './redux/StudentSlice';
import clsx from 'clsx';
import { baseUrl } from '../../Utils/Utils';
import Input from '../ui/Input';
import { Link, useNavigate } from 'react-router-dom';

// Validation de donnée avec yup 
const StudentSchema = object({
  // Élève
  nom: string().required('Le nom est obligatoire.'),
  prenom: string().required('Le prénom est obligatoire.'),
  sexe: string().required('Le sexe est obligatoire.'),
  date_naissance: string().required("La date de naissance est obligatoire."),
  lieu_naissance: string().required("Le lieu de naissance est obligatoire."),
  adresse: string().required('L\'adresse est obligatoire.'),
  nationalite: string().required('La nationalité est obligatoire.'),
});

const Student = () => {
  const [sexe, setSexe] = useState({ homme: false, femme: true });
  const { datas: students, action, error } = useSelector(getStudentState);
  const { onSubmite, formErrors } = useForm<StudentType>(StudentSchema, StudentInitialValue);
  const { hiddeTheModalActive } = useSelector(getAppState);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [studentToArchive, setStudentToArchive] = useState<StudentType | null>(null);
  const [statistique, setStatistique] = useState<any>(null)
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();



  const handleEdit = (student: StudentType) => {
    setEditingStudent(student);
    setPhotoPreview(baseUrl(student.photo as string))
    setShowModal(true);
    setSexe(student?.sexe === 'Homme' ? { homme: true, femme: false } : { homme: false, femme: true });
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmite((validateData) => {
      editingStudent ? dispatch(updateStudent({ student: validateData, id: editingStudent?.id_eleve as number })) : dispatch(createStudent(validateData))
    }, e)
  }

  // Modal
  useEffect(() => {
    if (showModal && hiddeTheModalActive) {
      handleCloseModal();
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
  }, [students.length])


  // ===================== TABLEAUX =====================
  const actions = [
    { icon: Eye, label: 'Voir', onClick: (item: RegistrationType) => navigate('/students/' + item.matricule_etudiant), color: 'blue' },
    { icon: Edit, label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive, label: 'Archiver', onClick: handleArchive, color: 'red' },
  ];

  const columns = [
    {
      key: 'nom', label: 'Profil', render: (value: string, item: StudentType) => (
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
      key: 'denomination', label: 'Classe', render: (value: string, item: any) => (
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Liste des étudiants</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Fille</p>
              <p className="text-2xl font-bold text-gray-900"> {parseInt(statistique?.girl?.percent) || 0} %</p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-rose-100`}>
              <User className={`w-6 h-6 text-rose-500`} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Garçcon</p>
              <p className="text-2xl font-bold text-gray-900"> {parseInt(statistique?.boy?.percent) || 0} %</p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-blue-100`}>
              <User className={`w-6 h-6 text-blue-500`} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900"> {statistique?.all?.percent || 0} %</p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-green-100`}>
              <Users className={`w-6 h-6 text-green-500`} />
            </div>
          </div>
        </div>
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
        title={editingStudent ? 'Modifier la matière' : 'Nouvelle matière'}
        size='lg'
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputError message={error} />
          {/* Information personnel */}
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
                  defaultValue={editingStudent?.nom || ''}
                  icon={User}
                  errorMessage={formErrors?.nom}
                />
                <Input
                  label='Prénom'
                  name='prenom'
                  defaultValue={editingStudent?.prenom || ''}
                  icon={UserCheck}
                  errorMessage={formErrors?.prenom}
                />
                <Input
                  label='Date de naissance'
                  name='date_naissance'
                  defaultValue={editingStudent?.date_naissance || ''}
                  icon={CalendarDays}
                  errorMessage={formErrors?.date_naissance} type='date'
                />
                <Input
                  label='Lieu de naissance'
                  name='lieu_naissance'
                  defaultValue={editingStudent?.lieu_naissance || ''}
                  icon={MapPin}
                  errorMessage={formErrors?.lieu_naissance}
                />
              </div>
              <div className='w-full'>
                <Input
                  label='Adresse complète'
                  name='adresse'
                  defaultValue={editingStudent?.adresse || ''}
                  icon={Home}
                  errorMessage={formErrors?.adresse}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label='Téléphone'
                  name='telephone'
                  defaultValue={editingStudent?.telephone || ''}
                  icon={Phone}
                  errorMessage={formErrors?.telephone}
                />
                <Input
                  label='Email'
                  name='email'
                  defaultValue={editingStudent?.email || ''}
                  icon={Mail}
                  errorMessage={formErrors?.email}
                />
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
            <Input
              label='Nationalité'
              name='nationalite'
              defaultValue={editingStudent?.nationalite || ''}
              icon={Globe}
              errorMessage={formErrors?.nationalite}
            />
          </div>
          <div className='space-y-4'>
            {/* Alergies ou Maladies chroniques   */}
            <h2 className='text-sm text-gray-500 italic'>Autres informations : </h2>
            <Input
              label='Alergies ou Maladies chroniques '
              name='maladies'
              defaultValue={editingStudent?.maladies || ''}
              icon={Activity} errorMessage={formErrors?.maladies}
            />
            <Input
              label='Personne à contacter en cas d’urgence'
              name='urgence_nom' defaultValue={editingStudent?.urgence_nom || ''}
              icon={User}
              errorMessage={formErrors?.urgence_nom}
            />
            <Input
              label='Lien avec l’élève (urgence)'
              name='urgence_lien'
              defaultValue={editingStudent?.urgence_lien || ''}
              icon={UserCheck} errorMessage={formErrors?.urgence_lien}
            />
            <Input
              label='Téléphone urgence'
              name='urgence_tel'
              defaultValue={editingStudent?.urgence_tel || ''}
              icon={Phone} errorMessage={formErrors?.urgence_tel}
            />

            <Input
              label='Copie de l’acte de naissance'
              name='acte_naissance'
              defaultValue={editingStudent?.pc_act_naissance || ''}
              icon={FolderOpen}
              iconColor='text-amber-500'
              type='file' />

            <Input
              label='Copie de la pièce d’identité'
              name='piece_identite'
              defaultValue={editingStudent?.pc_pi || ''} icon={FolderOpen}
              iconColor='text-amber-500'
              type='file'
            />
            <Input
              label='Bulletins scolaires / dernier diplôme'
              name='bulletin'
              defaultValue={editingStudent?.bulletin || ''}
              icon={FolderOpen}
              iconColor='text-amber-500'
              type='file'
            />
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
              {editingStudent ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
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