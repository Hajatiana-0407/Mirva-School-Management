import React, { useEffect, useState } from 'react'
import Input from '../../Components/ui/Input';
import InputError from '../../Components/ui/InputError';
import ImageProfile from '../../Components/ui/ImageProfile';
import { User, UserCheck, CalendarDays, Phone, Mail, Check, MapPin, Globe, Home, ArrowRight, ArrowLeft, Activity, FolderOpen, GraduationCap, Timer } from 'lucide-react';
import clsx from 'clsx';
import { InfoBlock } from '../../Pages/Registrations/Registration';
import { object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { ClasseType, registrationInitialValue, RegistrationType, StudentFormDataInitialValue, StudentFormDataType } from '../../Utils/Types';
import useForm from '../../Hooks/useForm';
import { getLevelState } from '../../Pages/Levels/redux/LevelSlice';
import { AppDispatch } from '../../Redux/store';
import { getSchoolYearState } from '../../Pages/School-Year/redux/SchoolYearSlice';
import { createRegistration } from '../../Pages/Registrations/redux/registerAsyncThunk';
import { getRegistrationState } from '../../Pages/Registrations/redux/registerSlice';
import { getAllLevel } from '../../Pages/Levels/redux/LevelAsyncThunk';
import HeadingSmall from '../ui/HeadingSmall';
import Onglet from '../ui/Onglet';
import ParentForm, { personSchema } from './ParentForm';
import TuteurForm from './TuteurForm';
import CheckInput from '../ui/CheckInput';

// ?  ===================== Schema de validation pour le formulaire  ===================== //
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

    // Parents
    pere: personSchema,
    mere: personSchema,
    tuteur: personSchema
});


// ? ===================== ETAPES DANS LE FORMULAIRE ===================== //
type FormStepType = { number: number; title: string }
const fomrStep: FormStepType[] = [
    { number: 1, title: "Informations sur l’élève" },
    { number: 2, title: "Informations scolaires" },
    { number: 3, title: "Informations sur les parents / tuteur" },
]

type RegisterFormPropsType = {
    editingStudent?: RegistrationType;
    setTitle?: (title: string) => void
}

const RegisterForm: React.FC<RegisterFormPropsType> = ({ editingStudent }) => {

    const { error, action: { isLoading } } = useSelector(getRegistrationState);
    const [step, setStep] = useState(1);
    const [formValues, setFormValues] = useState<StudentFormDataType>(StudentFormDataInitialValue);
    const { onSubmite, formErrors, HandleValidateSchema } = useForm<RegistrationType>(RegistrationSchema, registrationInitialValue);
    const { datas: levelDatas } = useSelector(getLevelState);
    const [classeOptions, setclasseOptions] = useState<any[]>([])
    const dispatch: AppDispatch = useDispatch();
    const [classeAndLevel, setClasseAndLevel] = useState<{ classe: string | null; level: string | null; }>({ classe: null, level: null })
    const sexe = [
        { label: 'Homme', value: 'Homme' },
        { label: 'Femme', value: 'Femme' },
    ];
    // ! Level input options
    const levelOptions = levelDatas.map((level) => ({ value: level.id_niveau as number, label: level.niveau }));
    // ! Année scolaire 
    const { activeSchoolYear } = useSelector(getSchoolYearState);
    const totalSteps = fomrStep.length + 1;


    // ? ===================== SOUMISSION DE LA FORMULAIRE  =====================
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData: any) => {
            editingStudent && editingStudent?.id_eleve ? '' : dispatch(createRegistration(validateData));
        }, e);
    };

    //! ===================== Wizard navigation ===================== //
    const handleNext = async (toStep?: number) => {
        const formulaire = document.querySelector<HTMLFormElement>('#__formulaire_eleve');
        const next = await HandleValidateSchema(formulaire as HTMLFormElement);
        if (next) {
            if (!toStep) {
                setStep((prev) => Math.min(prev + 1, totalSteps));
            } else {
                setStep(toStep);
            }
        }
    };
    const handlePrev = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };
    //! =====================  ===================== //

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

    const handleProfileChanage = (url: string) => {
        setFormValues({ ...formValues, photo: url });
    }


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


    useEffect(() => {
        if (!levelDatas.length) {
            dispatch(getAllLevel())
        }
    }, [dispatch]);


    return (
        <form id='__formulaire_eleve' onSubmit={handleSubmit}>
            <div className='space-y-6'>
                <InputError message={error} />

                {/* ETAPE 1 : INFORMATION SUR L'ELEVE */}
                <div className={clsx({ 'hidden': step !== 1 }, 'space-y-4')}>

                    {/* Information personnel */}
                    <div className='space-y-4'>
                        <div className="flex flex-col sm:flex-row gap-5 space-y-2">

                            {/* photo d'indentité  */}
                            <div className='w-[14rem] h-[14rem]'>
                                <ImageProfile uri={formValues.photo} setUrl={handleProfileChanage} />
                            </div>


                            <div className='flex-1 space-y-4'>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label='Nom'
                                        name='nom'
                                        defaultValue={editingStudent?.nom ? editingStudent?.nom : formValues.nom.value ? formValues.nom.value : ''}
                                        icon={User}
                                        errorMessage={formErrors?.nom}
                                        onChange={handleInputValueChange('Nom')}
                                    />
                                    <Input
                                        label='Prénom'
                                        name='prenom'
                                        defaultValue={editingStudent?.prenom ? editingStudent?.prenom : formValues.prenom.value ? formValues.prenom.value : ''}
                                        icon={UserCheck}
                                        errorMessage={formErrors?.prenom}
                                        onChange={handleInputValueChange('Prénom')}
                                    />

                                    <div className='col-span-2 space-y-4'>
                                        <Input
                                            label='Date de naissance'
                                            name='date_naissance'
                                            defaultValue={editingStudent?.date_naissance ? editingStudent?.date_naissance : formValues.date_naissance.value ? formValues.date_naissance.value : ''}
                                            icon={CalendarDays}
                                            errorMessage={formErrors?.date_naissance} type='date'
                                            onChange={handleInputValueChange('Date de naissance')}
                                        />
                                        <Input
                                            label='Lieu de naissance'
                                            name='lieu_naissance'
                                            defaultValue={editingStudent?.lieu_naissance ? editingStudent?.lieu_naissance : formValues.lieu_naissance.value ? formValues.lieu_naissance.value : ''}
                                            icon={MapPin}
                                            errorMessage={formErrors?.lieu_naissance}
                                            onChange={handleInputValueChange('Lieu de naissance')}
                                        />
                                        <Input
                                            label='Genre'
                                            name='sexe'
                                            defaultValue={editingStudent?.sexe || ''}
                                            icon={UserCheck}
                                            errorMessage={formErrors?.sexe}
                                            type='select'
                                            options={sexe}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div>
                            <Input
                                label='Nationalité'
                                name='nationalite' defaultValue={editingStudent?.nationalite ? editingStudent?.nationalite : formValues.nationalite.value ? formValues.nationalite.value : ''}
                                icon={Globe} errorMessage={formErrors?.nationalite}
                                onChange={handleInputValueChange('Nationalité')}
                            />
                        </div>
                    </div>

                    {/* Information sur les coordonner */}
                    <div className='space-y-4'>
                        <HeadingSmall title='Information sur les coordonner :' />
                        <Input
                            label='Adresse complète'
                            name='adresse'
                            defaultValue={editingStudent?.adresse ? editingStudent?.adresse : formValues.adresse.value ? formValues.adresse.value : ''}
                            icon={Home}
                            errorMessage={formErrors?.adresse}
                            onChange={handleInputValueChange('Adresse complète')}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label='Téléphone'
                                name='telephone'
                                defaultValue={editingStudent?.telephone ? editingStudent?.telephone : formValues.telephone.value ? formValues.telephone.value : ''}
                                icon={Phone}
                                errorMessage={formErrors?.telephone}
                                onChange={handleInputValueChange('Téléphone')}
                            />
                            <Input
                                label='Email'
                                name='email'
                                defaultValue={editingStudent?.email ? editingStudent?.email : formValues.email.value ? formValues.email.value : ''}
                                icon={Mail}
                                errorMessage={formErrors?.email}
                                onChange={handleInputValueChange('Email')}
                            />
                        </div>
                    </div>


                    {/* Informations médicales & contact d’urgence */}
                    <div className="space-y-4">
                        <div>
                            <HeadingSmall title='Infos médicales & contact d’urgence :' />
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className="col-span-2">
                                <Input
                                    label='Alergies ou Maladies chroniques '
                                    name='maladies'
                                    defaultValue={editingStudent?.maladies ? editingStudent?.maladies : formValues.maladies.value ? formValues.maladies.value : ''}
                                    icon={Activity}
                                    errorMessage={formErrors?.maladies}
                                    onChange={handleInputValueChange('Alergies ou Maladies chroniques')}
                                />
                            </div>
                            <Input
                                label='Personne à contacter en cas d’urgence'
                                name='urgence_nom'
                                defaultValue={editingStudent?.urgence_nom ? editingStudent?.urgence_nom : formValues.urgence_nom.value ? formValues.urgence_nom.value : ''}
                                icon={User}
                                errorMessage={formErrors?.urgence_nom}
                                onChange={handleInputValueChange('Personne à contacter en cas d’urgence')}
                            />
                            <Input
                                label='Lien avec l’élève (urgence)'
                                name='urgence_lien'
                                defaultValue={editingStudent?.urgence_lien ? editingStudent?.urgence_lien : formValues.urgence_lien.value ? formValues.urgence_lien.value : ''}
                                icon={UserCheck}
                                errorMessage={formErrors?.urgence_lien}
                                onChange={handleInputValueChange('Lien avec l’élève (urgence)')}
                            />
                            <div className="col-span-2">
                                <Input
                                    label='Téléphone urgence'
                                    name='urgence_tel'
                                    defaultValue={editingStudent?.urgence_tel ? editingStudent?.urgence_tel : formValues.urgence_tel.value ? formValues.urgence_tel.value : ''}
                                    icon={Phone}
                                    errorMessage={formErrors?.urgence_tel}
                                    onChange={handleInputValueChange('Téléphone urgence')}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pièces jointes */}
                    <div className='space-y-4'>
                        <div>
                            <HeadingSmall title='Pièces jointes :' />
                        </div>
                        <Input
                            label='Copie de l’acte de naissance'
                            name='acte_naissance'
                            defaultValue={editingStudent?.acte_naissance || ''}
                            icon={FolderOpen}
                            errorMessage={formErrors?.acte_naissance} iconColor='text-amber-500' type='file'
                        />
                        <Input
                            label='Copie de la pièce d’identité'
                            name='piece_identite'
                            defaultValue={editingStudent?.piece_identite || ''}
                            icon={FolderOpen}
                            errorMessage={formErrors?.piece_identite} iconColor='text-amber-500' type='file'
                        />
                        <Input
                            label='Bulletins scolaires / dernier diplôme'
                            name='bulletin'
                            defaultValue={editingStudent?.bulletin || ''}
                            icon={FolderOpen}
                            errorMessage={formErrors?.bulletin} iconColor='text-amber-500' type='file'
                        />
                    </div>
                </div>

                {/* ETAPE 2 : INFORMATION SCOLAIRE */}
                <div className={clsx({ 'hidden': step !== 2 }, 'space-y-4')}>
                    <Input
                        label='Année scolaire'
                        name=''
                        defaultValue={activeSchoolYear?.nom}
                        icon={CalendarDays}
                        type='text'
                        errorMessage={formErrors?.annee_scolaire}
                        readonly
                    />

                    <div>
                        <HeadingSmall title='Information sur l’inscription :' />
                    </div>
                    <Input
                        label='Date d’inscription'
                        name='date_inscription'
                        defaultValue={new Date().toISOString().split('T')[0]}
                        icon={CalendarDays}
                        type='date'
                    />
                    <Input
                        label='Niveau d’inscription demandé'
                        name='niveau'
                        defaultValue={editingStudent?.niveau ? editingStudent?.niveau : formValues.niveau.value ? formValues.niveau.value : ''}
                        icon={User}
                        errorMessage={formErrors?.niveau}
                        type='select'
                        onChange={handleInputValueChange('Niveau d’inscription demandé')}
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

                    <div>
                        <HeadingSmall title='Autre information :' />
                    </div>
                    <Input
                        label='Ancienne école fréquentée'
                        name='ancienne_ecole'
                        defaultValue={editingStudent?.ancienne_ecole ? editingStudent?.ancienne_ecole : formValues.ancienne_ecole.value ? formValues.ancienne_ecole.value : ''}
                        icon={Home}
                        errorMessage={formErrors?.ancienne_ecole}
                        onChange={handleInputValueChange('Ancienne école fréquentée')}
                    />
                </div>

                {/* ETAPE 3 : INFORMATIONS SUR LES PARENT / TUTEUR */}
                <div className={clsx(
                    { 'hidden': step !== 3 },
                    'space-y-4'
                )}>
                    <Onglet onlgets={[
                        {
                            key: 'Parent',
                            component: <ParentForm
                                formErrors={formErrors}
                            />
                        },
                        {
                            key: 'Tuteur', component: <TuteurForm
                                formErrors={formErrors}
                            />
                        },
                    ]} />
                </div>

                {/* RÉSUMÉ DES INFORMATION IMPORTANTES ET VALIDATION */}
                <div className={clsx({ hidden: step !== 4 }, "space-y-6")}>

                    {/* Bloc principal : Photo + Identité */}
                    <div className="flex gap-6 items-start">

                        {/* PHOTO D IDENTITE */}
                        <div className='w-[15.3rem] h-[15.3rem]'>
                            <ImageProfile uri={formValues.photo} isInput={false} />
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
                                icon={<Globe className="w-6 h-6 text-blue-400" />}
                                label="Nationalité"
                                value={formValues.nationalite.value}
                            />

                            <InfoBlock
                                icon={<GraduationCap className="w-6 h-6 text-green-600" />}
                                label="Niveau & Classe"
                                value={
                                    <span className="text-blue-700 font-semibold">
                                        {classeAndLevel.level && classeAndLevel.classe ? `${classeAndLevel.level} • ${classeAndLevel.classe}` : ''}
                                    </span>
                                }
                            />
                            <InfoBlock
                                icon={<Timer className="w-6 h-6 text-orange-600" />}
                                label="Annéé scolaire"
                                value={activeSchoolYear?.nom}
                            />
                        </div>
                    </div>
                    <input type="hidden" name='annee_scolaire' value={activeSchoolYear?.id_annee_scolaire} />
                    <CheckInput
                        name='isDroitPaye'
                        label="Droit d'inscription"
                        description="Cocher si le droit d' inscription a été réglé"
                    />
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
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center">
                            {isLoading ?
                                <div className="w-5 h-5 me-1 inline-block border-4 border-white border-t-transparent rounded-full animate-spin"></div> :
                                <Check className="w-4 h-4 inline-block mr-1" />
                            }
                            Confirmer l'inscription
                        </button>
                    )}
                </div>
            </div>
        </form>
    )
}

export default RegisterForm