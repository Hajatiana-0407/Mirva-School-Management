import React, { useEffect, useState } from 'react';
import { Check, PenBox, X, Calendar, BookOpen, Users, MapPin, Clock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import useForm from '../../Hooks/useForm';
import InputError from '../../Components/ui/InputError';
import Input from '../../Components/ui/Input';
import { SheduleType, SheduleInitialeValue, ApiReturnType, AssignationType } from '../../Utils/Types';
import { getSheduleState } from '../../Pages/Shedules/redux/SheduleSlice';
import { EditingSlotType } from '../../Pages/Shedules/Schedule';
import { timeSlots } from '../../Utils/Utils';
import { createShedule, getAssignationByClasseId, getAssignationByTeacherId, updateShedule } from '../../Pages/Shedules/redux/SheduleAsyncThunk';
import Loading from '../ui/Loading';
import * as yup from 'yup';
import { useHashPermission } from '../../Hooks/useHashPermission';
import { useActiveUser } from '../../Hooks/useActiveUser';
import { getAuthState } from '../../Pages/Auth/redux/AuthSlice';

const sheduleSchema = yup.object({
    jour_id: yup
        .number()
        .typeError('Le jour est obligatoire.')
        .required('Le jour est obligatoire.')
        .min(1, 'Le jour doit être entre 1 et 6.')
        .max(6, 'Le jour doit être entre 1 et 6.'),

    heure_debut: yup
        .number()
        .typeError("L'heure de début est obligatoire.")
        .required("L'heure de début est obligatoire.")
        .min(1, "L'heure de début doit être entre 1 et 6.")
        .max(11, "L'heure de début doit être entre 1 et 11."),

    heure_fin: yup
        .number()
        .typeError("L'heure de fin est obligatoire.")
        .required("L'heure de fin est obligatoire.")
        .min(1, "L'heure de fin doit être entre 1 et 6.")
        .max(11, "L'heure de fin doit être entre 1 et 11."),

    assignation_id: yup
        .number()
        .typeError("L'assignation est obligatoire.")
        .required("L'assignation est obligatoire.")
        .min(1, "L'assignation est obligatoire.")
});

const days = [
    { cle: 1, label: 'Lundi' },
    { cle: 2, label: 'Mardi' },
    { cle: 3, label: 'Mercredi' },
    { cle: 4, label: 'Jeudi' },
    { cle: 5, label: 'Vendredi' }
];


type SheduleFormPropsType = {
    handleClose?: () => void;
    shedule?: SheduleType | null;
    editingSlot?: EditingSlotType
}
const SheduleForm: React.FC<SheduleFormPropsType> = ({ shedule, handleClose, editingSlot }) => {
    const dispatch: AppDispatch = useDispatch();
    const { error, action: shedule_action } = useSelector(getSheduleState);
    const { onSubmite, formErrors } = useForm<SheduleType>(sheduleSchema, SheduleInitialeValue);
    const [isLoading, setIsLoading] = useState(false);
    const [assignationWithThisClasse, setAssignationWithThisClasse] = useState<AssignationType[] | null>(null);
    const [teacher, setTeacher] = useState('');
    const [assignationId, setassignationId] = useState<number>(shedule?.assignation_id as number | 0);
    const [classeId, setClasseId] = useState(0);
    const permission = useHashPermission({ id: 'schedule' });
    // Pour savoire si l'utilisateur est une enseignant 
    const { isTeacher } = useActiveUser();
    const { datas: { info } } = useSelector(getAuthState);

    useEffect(() => {
    }, [dispatch]);
    useEffect(() => {
        if (editingSlot?.classe) {
            setIsLoading(true);
            if (isTeacher) {
                // Si l'utilisateur est une enseignant 
                dispatch(getAssignationByTeacherId(info?.id_personnel as number)).unwrap()
                    .then((response: ApiReturnType) => {
                        if (!response.error) {
                            const assignations: AssignationType[] = response.data;
                            setAssignationWithThisClasse(assignations);
                            setClasseId(shedule?.id_classe as number || assignations?.[0]?.id_classe );
                            // Si c'est du modification => valeur par defaut pour proffesseur
                            if (shedule) {
                                assignations.map(assignation => {
                                    assignation.id_assignation == shedule?.assignation_id ? setTeacher(`${assignation.nom} ${assignation.prenom}`) : '';
                                })
                            }
                        }
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });

            } else {
                // Si l'utilisateur n'est pas une enseignant 
                dispatch(getAssignationByClasseId(editingSlot?.classe?.id_classe as number)).unwrap()
                    .then((response: ApiReturnType) => {
                        if (!response.error) {
                            const assignations: AssignationType[] = response.data;
                            setAssignationWithThisClasse(assignations);
                            // Si c'est du modification => valeur par defaut pour proffesseur
                            if (shedule) {
                                assignations.map(assignation => {
                                    assignation.id_assignation == shedule?.assignation_id ? setTeacher(`${assignation.nom} ${assignation.prenom}`) : '';
                                })
                            }
                        }
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }
        }
    }, [dispatch, editingSlot?.classe?.id_classe])


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData: any) => {
            if (shedule && permission.update) {
                dispatch(updateShedule({ Shedule: validateData, id: shedule.assignation_id }))
            } else if (permission.create) {
                dispatch(createShedule(validateData))
            }
        }, e);
    };

    // Option pour la liste des matiere disponnible 
    const subjectOptions = assignationWithThisClasse?.filter(assignation => {
        if (isTeacher) {
            return assignation.id_classe == classeId;
        }
        return true;
    }).map(assignation => {
        return {
            label: `${assignation.matiere}`,
            value: assignation.id_assignation as number
        }
    });


    const classesOptions = assignationWithThisClasse?.map(assignation => ({
        label: `${assignation.classe}`,
        value: assignation.id_assignation as number
    }))
    subjectOptions?.unshift({ label: 'Sélectionner une matière', value: 0 })
    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <InputError message={error} />
            <Input
                label="Jour"
                name="jour_id"
                type="select"
                icon={Calendar}
                options={days.map(day => ({ label: day.label, value: day.cle }))}
                defaultValue={editingSlot?.day || ''}
                errorMessage={formErrors?.jour_id}
            />
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Heure de début"
                    name="heure_debut"
                    type="select"
                    icon={Clock}
                    options={timeSlots}
                    defaultValue={editingSlot?.time || ''}
                    errorMessage={formErrors?.heure_debut}
                />
                <Input
                    label="Heure de fin"
                    name="heure_fin"
                    type="select"
                    icon={Clock}
                    options={[...timeSlots, { label: '17:00', value: 11 }]}
                    defaultValue={editingSlot?.time ? editingSlot?.time + 1 : ''}
                    errorMessage={formErrors?.heure_fin}
                />
            </div>
            {isLoading ? <Loading size='sm' /> :
                <div className='space-y-4'>
                    {isTeacher &&
                        <Input
                            label="Classe"
                            name=""
                            type="select"
                            icon={BookOpen}
                            options={classesOptions}
                            defaultValue={shedule?.assignation_id || ''}
                            errorMessage={formErrors?.matiere}
                            onChange={(e) => {
                                const assignation = assignationWithThisClasse?.find((assingation) => assingation.id_assignation == parseInt(e.target.value))
                                setassignationId(assignation?.id_assignation as number)
                                setClasseId(assignation?.id_classe as number);
                            }}
                        />
                    }
                    <Input
                        label="Matière"
                        name=""
                        type="select"
                        icon={BookOpen}
                        options={subjectOptions}
                        value={assignationId}
                        errorMessage={formErrors?.matiere}
                        onChange={(e) => {
                            const assignation = assignationWithThisClasse?.find((assingation) => assingation.id_assignation == parseInt(e.target.value))
                            assignation ? setTeacher(assignation.nom + ' ' + assignation.prenom) : setTeacher('');
                            setassignationId(assignation?.id_assignation as number)
                        }}
                    />
                    <Input
                        label="Professeur"
                        type='text'
                        name=""
                        icon={Users}
                        value={isTeacher ? `${info?.nom} ${info?.prenom}` : teacher}
                        onChange={() => { }}
                        readonly
                    />
                    <input type="hidden" name='assignation_id' value={assignationId} onChange={() => { }} />
                    <input type="hidden" name='id_classe' value={editingSlot?.classe?.id_classe} onChange={() => { }} />
                    {isTeacher &&
                        <input type="hidden" name='id_personnel' value={info?.id_personnel} onChange={() => { }} />
                    }
                </div>
            }
            <Input
                label="Salle"
                name="salle"
                icon={MapPin}
                defaultValue={shedule?.salle || ''}
                errorMessage={formErrors?.assignation_id}
            />
            <div className="flex justify-end space-x-3 pt-4">
                {handleClose &&
                    <button
                        type="button"
                        onClick={handleClose}
                        className="px-2 py-1 sm:px-4 sm:py-2 text-secondary-600 border border-secondary-300 rounded-lg hover:bg-secondary-50"
                    >
                        <X className='inline-block w-5 h-5 me-1' />
                        Annuler
                    </button>
                }
                <button
                    type="submit"
                    className="px-2 py-1 sm:px-4 sm:py-2 bg-primary-600 text-light rounded-lg hover:bg-primary-700 flex items-center disabled:bg-primary-400"
                    disabled={!permission.create && !permission.update}
                >
                    {shedule_action.isLoading || shedule_action.isUpdating ? <div className="w-5 h-5 me-1 inline-block border-4 border-light border-t-transparent rounded-full animate-spin"></div> : <>
                        {shedule ? <PenBox className='inline-block w-5 h-5 me-1' /> : <Check className='inline-block w-5 h-5 me-1' />}
                    </>}
                    {shedule ? 'Modifier' : 'Valider'}
                </button>
            </div>
        </form>
    );
};

export default SheduleForm;