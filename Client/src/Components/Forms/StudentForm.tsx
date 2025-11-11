import React from 'react'
import { User, UserCheck, CalendarDays, MapPin, Home, Phone, Mail, FolderOpen, X, PenBox, Check, Fingerprint } from 'lucide-react';
import InputError from '../../Components/ui/InputError';
import Input from '../../Components/ui/Input';
import ImageProfile from '../ui/ImageProfile';
import useForm from '../../Hooks/useForm';
import { StudentInitialValue, StudentType } from '../../Utils/Types';
import { object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { createStudent, updateStudent } from '../../Pages/Students/redux/StudentAsyncThunk';
import { getStudentState } from '../../Pages/Students/redux/StudentSlice';
import HeadingSmall from '../ui/HeadingSmall';

// Validation de donnée avec yup 
const StudentSchema = object({
    // Élève
    matricule_etudiant: string().required('La matricule est obligatoire.'),
    nom: string().required('Le nom est obligatoire.'),
    prenom: string().required('Le prénom est obligatoire.'),
    sexe: string().required('Le sexe est obligatoire.'),
    date_naissance: string().required("La date de naissance est obligatoire."),
    lieu_naissance: string().required("Le lieu de naissance est obligatoire."),
    adresse: string().required('L\'adresse est obligatoire.'),
    nationalite: string().required('La nationalité est obligatoire.'),
});


type StudentFormPropsType = {
    editingStudent?: StudentType;
    handleCloseModal?: () => void
}
const StudentForm: React.FC<StudentFormPropsType> = ({ editingStudent, handleCloseModal = () => { } }) => {
    const { error, action: { isLoading, isUpdating } } = useSelector(getStudentState);
    const { onSubmite, formErrors } = useForm<StudentType>(StudentSchema, StudentInitialValue);
    const dispatch: AppDispatch = useDispatch();

    const sexe = [
        { label: 'Homme', value: 'Homme' },
        { label: 'Femme', value: 'Femme' },
    ];
    // ===================== Soumission de la formulaire  ===================== //
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData) => {
            editingStudent ? dispatch(updateStudent({ student: validateData, id: editingStudent?.id_eleve as number })) : dispatch(createStudent(validateData))
        }, e)
    }
    return (
        <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Information personnel */}
            <div className="flex flex-col md:flex-row items-center gap-5 space-y-2">
                {/* PHOTO D IDENTITE */}
                <div className="w-[15rem] h-[15rem]">
                    <ImageProfile url={editingStudent?.photo} />
                </div>
                <div className='flex-1 space-y-4 w-full'>
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
            <div className='space-y-4'>
                <Input
                    label='Genre'
                    name='sexe'
                    defaultValue={editingStudent?.sexe || ''}
                    icon={UserCheck}
                    errorMessage={formErrors?.sexe}
                    type='select'
                    options={sexe}
                />
                {/* Nationalité  */}
                <input type="hidden" name='nationalite' value={'Malagasy'} onChange={() => { }} />
                <Input
                    label='Matricule'
                    name='matricule_etudiant'
                    defaultValue={editingStudent?.matricule_etudiant || ''}
                    icon={Fingerprint}
                    errorMessage={formErrors?.matricule_etudiant}
                />
            </div>

            <div className='space-y-4'>
                <div>
                    <HeadingSmall title='Pièces jointes :' />
                </div>
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
            <InputError message={error} />
            <div className="flex justify-end space-x-3 pt-4">
                {handleCloseModal !== undefined &&
                    <button
                        type="button"
                        onClick={handleCloseModal}
                        className="px-2 py-1 sm:px-4 smpy-2 _classe text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <X className='inline-block w-5 h-5 me-1' />
                        Annuler
                    </button>
                }
                <button
                    type="submit"
                    className="px-2 py-1 sm:px-4 smpy-2 _classe bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                    {isLoading || isUpdating ?
                        <div className="w-5 h-5 me-1 inline-block border-4 border-white border-t-transparent rounded-full animate-spin"></div> :
                        <>
                            {editingStudent ?
                                <PenBox className='inline-block w-5 h-5 me-1' /> :
                                <Check className='inline-block w-5 h-5 me-1' />
                            }
                        </>
                    }
                    {editingStudent ? 'Modifier' : 'Ajouter'}
                </button>
            </div>

        </form>
    )
}

export default StudentForm