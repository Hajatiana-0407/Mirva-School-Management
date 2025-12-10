import React, { ChangeEvent, useState } from 'react'
import Input from '../ui/Input';
import { Plus, User, Calculator, UserCheck, CalendarDays, Phone, Mail, MapPinned, X, SquarePen, Check, FolderOpen, Handshake, ArrowRight, MapPin, BadgeCheck, Flag, Briefcase, Layers, Award, UserPlus, ArrowLeft } from 'lucide-react';
import clsx from 'clsx';
import { object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../Hooks/useForm';
import { AppDispatch } from '../../Redux/store';
import { employeeInitialValue, EmployeeType, TypePersonnelType } from '../../Utils/Types';
import { createEmployees, updateEmployees } from '../../Pages/Employees/redux/EmployeAsyncThunk';
import { getTypeEmployeesState } from '../../Redux/Other/slices/TypeEmployeesSlice';
import TeacherSubject from '../../Pages/TeacherSubject';
import { getEmployeState } from '../../Pages/Employees/redux/EmployeSlice';
import HeadingSmall from '../ui/HeadingSmall';
import ImageProfile from '../ui/ImageProfile';
import { createTeacher, updateTeacher } from '../../Pages/Teachers/redux/TeacherAsyncThunk';
import { getTeacherState } from '../../Pages/Teachers/redux/TeachersSlice';

// ? VALIDATION DES DONNÉ AVEC YUP
const EmployeSchema = object({
    nom: string()
        .required('Veuillez renseigner le nom.'),
    prenom: string()
        .required('Veuillez renseigner le prénom.'),
    addresse: string()
        .required('Veuillez renseigner l’adresse complète.'),
    date_naissance: string()
        .required("Veuillez indiquer la date de naissance."),
    lieu_naissance: string()
        .required("Veuillez préciser le lieu de naissance."),
    date_embauche: string()
        .required("Veuillez indiquer la date d’embauche."),
    telephone: string()
        .required('Veuillez saisir le numéro de téléphone.'),
    nationalite: string()
        .required('Veuillez indiquer la nationalité.'),
    type_contrat: string()
        .required('Veuillez sélectionner le type de contrat.'),
    type_personnel: string()
        .required('Veuillez sélectionner le type de personnel.'),
    numero_cin: string()
        .required('Veuillez saisir le numéro de la carte d’identité ou du passeport.'),
});


export const contrats = [
    { label: 'CDI', value: 'cdi' },
    { label: 'CDD', value: 'cdd' },
    { label: 'Vacataire', value: 'vacataire' },
    { label: 'Stage', value: 'stage' },
    { label: 'Apprentissage / Alternance', value: 'apprentissage' },
    { label: 'Temporaire / Intérim', value: 'interim' },
    { label: 'Prestation de service', value: 'prestation' },
];

type EmployeFormPropsType = {
    handleClose?: () => void;
    editingEmployees?: EmployeeType | null,
    type?: 'teacher'
};


const EmployeForm: React.FC<EmployeFormPropsType> = ({ editingEmployees, handleClose = () => { }, type }) => {
    const { datas: TypesEmployees } = useSelector(getTypeEmployeesState);
    const { action: employeeAction } = useSelector(getEmployeState);
    const { action: teacherAction } = useSelector(getTeacherState)
    const [isTeacher, setIsTeacher] = useState(type == 'teacher' ? true : false);
    const [page, setPage] = useState(1)
    const { onSubmite, formErrors, resetError, HandleValidateSchema } = useForm<EmployeeType>(EmployeSchema, employeeInitialValue);
    const dispatch: AppDispatch = useDispatch();
    const sexe = [
        { label: 'Homme', value: 'Homme' },
        { label: 'Femme', value: 'Femme' },
    ];

    let typePersonnelOptions;
    switch (type) {
        case 'teacher':
            const typeTeacher: TypePersonnelType = TypesEmployees.find(type => type.type.toLowerCase() === 'enseignant') as TypePersonnelType;
            typePersonnelOptions = [{ label: typeTeacher?.type, value: typeTeacher?.id_type_personnel as number }];
            break;
        default:
            typePersonnelOptions = TypesEmployees.map((type) => ({ value: type.id_type_personnel as number, label: type.type }));
            break;
    }
    // Fermer la modale
    const handleCloseModal = () => {
        setIsTeacher(false);
        setPage(1);
        resetError();

        // Fermer le modale 
        handleClose();
    };

    // Soumission du formulaire
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData: EmployeeType) => {
            if (!isTeacher) {
                editingEmployees ? dispatch(updateEmployees({ datas: validateData, id: editingEmployees?.id_personnel as number })) : dispatch(createEmployees(validateData))
            }
            else if (isTeacher) {
                editingEmployees ? dispatch(updateTeacher({ datas: validateData, id: editingEmployees?.id_personnel as number })) : dispatch(createTeacher(validateData))
            }
        }, e);
    };

    // changement du selection du  type de personnel
    const handleTypeEmployeesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        // ?  si le poste est enseignant
        setIsTeacher(TypesEmployees.some((type) => ((type.id_type_personnel as number).toString()) == value && type.type.toLowerCase() === 'enseignant'));
    }

    // Passer a la page suivant si le type est enseignant
    const handleNext = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        const formulaire = document.querySelector<HTMLFormElement>('#__formulaire_personnel');
        if (formulaire && e.currentTarget.type === 'button') {
            const isValide = await HandleValidateSchema(formulaire);
            if (isValide) {
                setPage(v => v + 1);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} id='__formulaire_personnel'>

            {/* Page numero 1  */}
            <div className={clsx({
                'sr-only': (page !== 1)
            }, 'space-y-4 md:space-y-6')} >
                <div className="flex flex-col sm:flex-row gap-5 items-center justify-center  space-y-2">

                    {/* Photo de profil de l'employé */}
                    <div className='w-[14rem] h-[14rem]'>
                        <ImageProfile url={editingEmployees?.photo} />
                    </div>

                    {/* Information personnel sur l'employer  */}
                    <div className='flex-1 space-y-4 w-full' >
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
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
                        </div>
                        <Input
                            label='Date de naissance'
                            name='date_naissance'
                            defaultValue={editingEmployees?.date_naissance || ''}
                            icon={CalendarDays}
                            errorMessage={formErrors?.date_naissance}
                            type='date'
                        />
                        <Input
                            label='Lieu de naissance'
                            name='lieu_naissance'
                            defaultValue={editingEmployees?.lieu_naissance || ''}
                            icon={MapPin}
                            errorMessage={formErrors?.lieu_naissance}
                        />
                        <Input
                            label='Genre'
                            name='sexe'
                            defaultValue={editingEmployees?.sexe || ''}
                            icon={UserCheck}
                            errorMessage={formErrors?.sexe}
                            type='select'
                            options={sexe}
                        />
                    </div>
                </div>

                <Input
                    label='Numéro CIN ou Numéro de passeport'
                    name='numero_cin'
                    defaultValue={editingEmployees?.numero_cin || ''}
                    icon={BadgeCheck}
                    errorMessage={formErrors?.numero_cin}
                />
                <Input
                    label='Natinalité'
                    name='nationalite'
                    defaultValue={editingEmployees?.nationalite || ''}
                    icon={Flag}
                    errorMessage={formErrors?.nationalite}
                />
                {/* Engagement  */}
                <Input
                    label='État civil'
                    name='engagement'
                    defaultValue={editingEmployees?.engagement || 'Célibataire'}
                    icon={Handshake}
                    type='select'
                    options={[
                        { label: 'Célibataire', value: 'Célibataire' },
                        { label: 'Marié', value: 'Marié' },
                        { label: 'Divorcé', value: 'Divorcé' },
                    ]}
                />

                {/* Information sur les coordonner de l'employer */}
                <div className="space-y-4">
                    <HeadingSmall title='Information sur les coordonner :' />
                    <div className="space-y-4">
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <Input
                                label='Email'
                                name='email'
                                defaultValue={editingEmployees?.email || ''}
                                icon={Mail}
                                errorMessage={formErrors?.email}
                            />
                            <Input
                                label='Téléphone'
                                name='telephone'
                                defaultValue={editingEmployees?.telephone || ''}
                                icon={Phone}
                                errorMessage={formErrors?.telephone}
                            />
                        </div>
                        <Input
                            label='Adresse'
                            name='addresse'
                            defaultValue={editingEmployees?.addresse || ''}
                            icon={MapPinned}
                            errorMessage={formErrors?.addresse}
                        />
                    </div>
                </div>

                {/* Information sur les Autres informations */}
                <div className='space-y-4'>
                    <HeadingSmall title='Informations professionnelles :' />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            type='number'
                        />
                    </div>
                    <div className='space-y-4'>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Fonctions du personnel  */}
                            <Input
                                label='Poste'
                                name='type_personnel'
                                defaultValue={editingEmployees?.id_type_personnel || typePersonnelOptions[0]?.value}
                                icon={Briefcase}
                                errorMessage={formErrors?.type_personnel} type='select'
                                options={typePersonnelOptions}
                                onChange={(e) => { handleTypeEmployeesChange(e as ChangeEvent<HTMLSelectElement>) }}
                            />
                            <Input
                                label='Type de contrat'
                                name='type_contrat'
                                defaultValue={editingEmployees?.type_contrat || 'cdd'}
                                icon={Check}
                                errorMessage={formErrors?.type_contrat} type='select'
                                options={contrats}
                            />
                        </div>
                        <Input
                            label='Spécialisation'
                            name='specialisation'
                            defaultValue={editingEmployees?.specialisation || ''}
                            icon={Layers}
                            errorMessage={formErrors?.specialisation}
                        />
                        <Input
                            label='Certifications'
                            name='certification'
                            defaultValue={editingEmployees?.certification || ''}
                            icon={Award}
                            errorMessage={formErrors?.certification}
                        />
                        <Input
                            label='Status'
                            name='status'
                            defaultValue={editingEmployees?.status || 'Actif'}
                            icon={Check}
                            errorMessage={formErrors?.status} type='select'
                            options={[
                                { label: 'Actif', value: 'Actif' },
                                { label: 'Suspendu', value: 'Suspendu' },
                                { label: 'Démissionnaire', value: 'Démissionnaire' },
                            ]}
                        />
                    </div>
                </div>


                {/* Photocopie CIN  */}
                <Input
                    label="Pièce d'indetité (SVG, PNG, JPG, GIF)"
                    name='pc_cin'
                    icon={FolderOpen} iconColor='text-amber-500'
                    type='file'
                />

                <div className='space-y-4'>
                    <HeadingSmall title="Informations sur le contacte d'urgence :" />
                    <Input
                        label="Nom et prénom de la personne à contacter en cas d’urgence"
                        name='urgence_nom'
                        defaultValue={editingEmployees?.urgence_nom || ''}
                        icon={User}
                        errorMessage={formErrors?.urgence_nom}
                    />
                    <Input
                        label="Lien"
                        name='urgence_lien'
                        defaultValue={editingEmployees?.urgence_lien || ''}
                        icon={UserPlus}
                        errorMessage={formErrors?.urgence_lien}
                    />
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Input
                            label="Télephone"
                            name='urgence_tel'
                            defaultValue={editingEmployees?.urgence_tel || ''}
                            icon={Phone}
                            errorMessage={formErrors?.urgence_tel}
                        />
                        <Input
                            label="Email"
                            name='urgence_email'
                            defaultValue={editingEmployees?.urgence_email || ''}
                            icon={Mail}
                            errorMessage={formErrors?.urgence_email}
                        />
                    </div>
                </div>

                {/* Boutons de validation , d'annulation et pour passer au  suivant  */}
                <div className="flex justify-end space-x-3 pt-4">
                    {handleCloseModal !== undefined &&
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="px-2 py-1 sm:px-4 sm:py-2 _classe text-secondary-600 border border-secondary-300 rounded-lg hover:bg-secondary-50"
                        >
                            <X className='w-5 h-5 inline-block me-1' />
                            Annuler
                        </button>

                    }
                    <button
                        type={(isTeacher && !editingEmployees) ? 'button' : 'submit'}
                        className="px-2 py-1 sm:px-4 sm:py-2 _classe bg-primary-600 text-light flex items-center rounded-lg hover:bg-primary-700 disabled:bg-primary-300"
                        onClick={handleNext}
                        disabled={employeeAction.isLoading || employeeAction.isUpdating || teacherAction.isLoading || teacherAction.isUpdating}
                    >
                        {employeeAction.isLoading || employeeAction.isUpdating || teacherAction.isLoading || teacherAction.isUpdating ?
                            <div className="w-5 h-5 me-1 inline-block border-4 border-light border-t-transparent rounded-full animate-spin"></div>
                            : <>
                                {/* Icone si le mot est modifier */}
                                {editingEmployees && <SquarePen className='w-5 h-5 inline-block me-1' />}
                                {/* Icone si le mot est Ajouter */}
                                {!!!editingEmployees && !isTeacher && <Plus className='w-5 h-5 inline-block me-1' />}
                            </>
                        }
                        {editingEmployees ? 'Modifier' : isTeacher ? 'Suivant' : 'Ajouter'}
                        {/* Icone si le mot suivant */}
                        {isTeacher && !!!editingEmployees && <ArrowRight className='w-5 h-5 inline-block ms-1' />}
                    </button>
                </div>
            </div>

            {/* Page numero 2 si le c'est une enseignant  */}
            <div className={clsx({
                'sr-only': page !== 2
            })} >
                {/* Composant pour l'assigantion des matieres dans les classes pour le proffesseur */}
                <TeacherSubject />

                {/* Boutons de validation et retour dans l'assignation des matieres et classes pour le prof actuel */}
                <div className='flex items-center justify-between'>
                    <button
                        className="bg-secondary-200 text-secondary-700 font-semibold px-2 py-1 sm:px-4 sm:py-2 _classe rounded-lg flex items-center hover:bg-secondary-300 transition-colors  gap-01 "
                        onClick={() => { setPage(v => v - 1) }}
                        type='button'
                    >
                        <ArrowLeft className='h-5 w-5 inline-block me-1' />
                        <span>Percedent</span>
                    </button>
                    <button
                        className={`bg-primary-600 text-light font-semibold px-2 py-1 sm:px-4 sm:py-2 _classe rounded-lg flex items-center gap-1 transition-colors hover:bg-primary-700 disabled:bg-primary-300`}
                        type='submit'
                        disabled={employeeAction.isLoading || employeeAction.isUpdating || teacherAction.isLoading || teacherAction.isUpdating}
                    >
                        {employeeAction.isLoading || employeeAction.isUpdating || teacherAction.isLoading || teacherAction.isUpdating
                            ? <div className="w-5 h-5 me-1 inline-block border-4 border-light border-t-transparent rounded-full animate-spin"></div>
                            : <Check className='h-5 w-5 inline-block me-1' />
                        }
                        <span>Valider</span>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default EmployeForm