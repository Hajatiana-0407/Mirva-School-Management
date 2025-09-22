import React, { ChangeEvent, useState } from 'react'
import Input from '../ui/Input';
import { Plus, User, Calculator, Camera, UserCheck, CalendarDays, Phone, Mail, MapPinned, X, SquarePen, ChevronLeft, Check, FolderOpen, Handshake, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../Hooks/useForm';
import { AppDispatch } from '../../Redux/store';
import { employeeInitialValue, EmployeeType, TypePersonnelType } from '../../Utils/Types';
import { createEmployees, updateEmployees } from '../Employees/redux/EmployeAsyncThunk';
import { getTypeEmployeesState } from '../../Redux/Other/slices/TypeEmployeesSlice';
import TeacherSubject from '../TeacherSubject';
import { baseUrl } from '../../Utils/Utils';
import { getEmployeState } from '../Employees/redux/EmployeSlice';



// ? VALIDATION DES DONNÉ AVEC YUP
const EmployeSchema = object({
    nom: string()
        .required('Le nom est obligatoire.'),
    prenom: string()
        .required('La prénom est obligatoire.'),
    addresse: string()
        .required('La adresse est obligatoire.'),
    date_naissance: string()
        .required("La date de naissance est obligatoire."),
    date_embauche: string()
        .required("La date d'embauche est obligatoire."),
    telephone: string()
        .required('Le téléphone est obligatoire.'),
    type_personnel: string()
        .required('Veuillez choisir un type.'),
});

type EmployeFormPropsType = {
    handleClose?: () => void;
    editingEmployees?: EmployeeType | null,
    type?: 'teacher'
};


const EmployeForm: React.FC<EmployeFormPropsType> = ({ editingEmployees, handleClose = () => { }, type }) => {
    // const { datas: TypesEmployees } = useSelector(getTypeEmployeesState);
    const [assignations, setAssignations] = useState<any>([]);
    const { datas: TypesEmployees } = useSelector(getTypeEmployeesState);
    const { action } = useSelector(getEmployeState);
    const [isTeacher, setIsTeacher] = useState(type == 'teacher' ? true : false);
    const [page, setPage] = useState(1)
    const [photoPreview, setPhotoPreview] = useState<string | null>(editingEmployees?.photo ? baseUrl(editingEmployees?.photo) : null);
    const { onSubmite, formErrors, resetError, forceError } = useForm<EmployeeType>(EmployeSchema, employeeInitialValue);
    const dispatch: AppDispatch = useDispatch();
    const sexe = [
        { label: 'Homme', value: 'Homme' },
        { label: 'Femme', value: 'Femme' },
    ];

    let typePersonnelOptions;
    switch (type) {
        case 'teacher':
            const typeTeacher: TypePersonnelType = TypesEmployees.find(type => type.type.toLowerCase() === 'enseignant') as TypePersonnelType;
            typePersonnelOptions = [{ label: typeTeacher.type, value: typeTeacher.id_type_personnel as number }];
            break;
        default:
            typePersonnelOptions = TypesEmployees.map((type) => ({ value: type.id_type_personnel as number, label: type.type }));
            break;
    }

    console.log('loading', action.isLoading);


    // Fermer la modale
    const handleCloseModal = () => {
        setPhotoPreview(null);
        setIsTeacher(false);
        setPage(1);
        resetError();

        // Fermer le modale 
        handleClose();
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


    return (
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
                            defaultValue={editingEmployees?.nom || 'dshfkjdshfkdshf '}
                            icon={User}
                            errorMessage={formErrors?.nom}
                        />
                        <Input
                            label='Prénom'
                            name='prenom'
                            defaultValue={editingEmployees?.prenom || 'dshfkjdshfkdshf  '}
                            icon={UserCheck}
                            errorMessage={formErrors?.prenom}
                        />
                        <Input
                            label='Date de naissance'
                            name='date_naissance'
                            defaultValue={editingEmployees?.date_naissance || 'dshfkjdshfkdshf  '}
                            icon={CalendarDays}
                            errorMessage={formErrors?.date_naissance}
                            type='date'
                        />

                        <Input
                            label='Genre'
                            name='sexe'
                            defaultValue={editingEmployees?.sexe || 'dshfkjdshfkdshf    '}
                            icon={UserCheck}
                            errorMessage={formErrors?.sexe}
                            type='select'
                            options={sexe}
                        />
                    </div>
                </div>

                {/* Information sur les coordonner de l'employer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <h2 className='text-sm col-span-2 text-gray-500 italic'>Information sur les coordonner</h2>
                    <Input
                        label='Email'
                        name='email'
                        defaultValue={editingEmployees?.email || 'dshfkjdshfkdshf   '}
                        icon={Mail}
                        errorMessage={formErrors?.email}
                    />

                    <Input
                        label='Téléphone'
                        name='telephone'
                        defaultValue={editingEmployees?.telephone || 'dshfkjdshfkdshf   '}
                        icon={Phone}
                        errorMessage={formErrors?.telephone}
                    />
                    <div className='col-span-2'>
                        <Input
                            label='Addresse'
                            name='addresse'
                            defaultValue={editingEmployees?.addresse || 'dshfkjdshfkdshf    '}
                            icon={MapPinned}
                            errorMessage={formErrors?.addresse}
                        />
                    </div>
                </div>

                {/* Information sur les Autres informations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <h2 className='text-sm col-span-2 text-gray-500 italic'>Autres informations</h2>
                    <Input
                        label="Date d'embauche"
                        name='date_embauche'
                        defaultValue={editingEmployees?.date_embauche || 'dshfkjdshfkdshf   '}
                        type='date'
                        icon={CalendarDays}
                        errorMessage={formErrors?.date_embauche}
                    />

                    <Input
                        label='Salaire de base'
                        name='salaire_base'
                        defaultValue={editingEmployees?.salaire_base ? editingEmployees?.salaire_base.toString() : 'dshfkjdshfkdshf '}
                        icon={Calculator}
                        type='number'
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

                    {/* Fonctions du personnel  */}
                    <Input
                        label='Type du personnel'
                        name='type_personnel'
                        defaultValue={editingEmployees?.engagement || typePersonnelOptions[0]?.value}
                        icon={Handshake}
                        errorMessage={formErrors?.type_personnel} type='select'
                        options={typePersonnelOptions}
                        onChange={(e) => { handleTypeEmployeesChange(e as ChangeEvent<HTMLSelectElement>) }}
                    />

                    <div className='col-span-2'>
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
                <Input label="Pièce d'indetité (SVG, PNG, JPG, GIF)" name='pc_cin' icon={FolderOpen} iconColor='text-amber-500' type='file' />

                {/* Boutons de validation , d'annulation et pour passer au  suivant  */}
                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={handleCloseModal}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <X className='w-5 h-5 inline-block me-1' />
                        Annuler
                    </button>
                    <button
                        type={(isTeacher && !editingEmployees) ? 'button' : 'submit'}
                        className="px-4 py-2 bg-blue-600 text-white flex items-center rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                        onClick={handleNext}
                        disabled={action.isLoading || action.isUpdating}
                    >
                        {action.isLoading || action.isUpdating ?
                            <div className="w-5 h-5 me-1 inline-block border-4 border-white border-t-transparent rounded-full animate-spin"></div>
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
                <TeacherSubject setParentAssignation={setAssignations} />

                {/* Boutons de validation et retour dans l'assignation des matieres et classes pour le prof actuel */}
                <div className='flex items-center justify-between'>
                    <button
                        className="bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg flex items-center hover:bg-gray-300 transition-colors  gap-01 "
                        onClick={() => { setPage(v => v - 1) }}
                        type='button'
                    >
                        <ChevronLeft className='h-5 w-5 inline-block me-1' />
                        <span>Percedent</span>
                    </button>
                    <button
                        className={`bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-1 transition-colors hover:bg-blue-700 disabled:bg-blue-300`}
                        type='submit'
                        disabled={action.isLoading || action.isUpdating}
                    >
                        {action.isLoading || action.isUpdating
                            ? <div className="w-5 h-5 me-1 inline-block border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            : <Check className='h-5 w-5 inline-block me-1' />
                        }
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
    )
}

export default EmployeForm