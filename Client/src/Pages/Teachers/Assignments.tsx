import { useEffect, useState } from 'react'
import TeacherSubject from '../TeacherSubject'
import { Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Components/ui/Loading';
import { getTeacherState } from './redux/TeachersSlice';
import { assignationTeacher, getTeacherByMatricule } from './redux/TeacherAsyncThunk';
import InputError from '../../Components/ui/InputError';
import { object, string } from 'yup';
import useForm from '../../Hooks/useForm';
import { useHashPermission } from '../../Hooks/useHashPermission';
import Title from '../../Components/ui/Title';
import ConfirmDialog from '../ConfirmDialog';
import React from 'react';


// Validation de donnée avec yup 
const assignationSchema = object({
    // Élève
    id_personnel: string().required("L'enseignant est introuvable"),
});
const Assignments: React.FC = () => {
    const { error, single: { data: teacher, action } } = useSelector(getTeacherState);
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const permission = useHashPermission({ id: 'teachers' });
    const [hasChanges, setHasChanges] = useState(false);
    const [showRegisterConfirm, setShowRegisterConfirm] = useState(false)
    const navigate = useNavigate()

    // ? Confirmation de l'enregistrement 
    const handleComfirmation = () => {
        const button = document.getElementById('assignation_button') as HTMLButtonElement;
        if (button) {
            button.click();
        }
        setShowRegisterConfirm(false);
        navigate(-1)
    };
    const handleAnnuleRegistration = () => {
        setShowRegisterConfirm(false);
        navigate(-1)
    }

    const assignationChangeIndication = (hasChanges: boolean) => {
        setHasChanges(hasChanges);
    }
    const { onSubmite, formErrors } = useForm(assignationSchema, { id_personnel: teacher?.id_personnel || '' });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData: any) => {
            dispatch(assignationTeacher(validateData));
        }, e);
    }
    useEffect(() => {
        if (!error && !action.isLoadingAssignation) {
            // navigate(-41);
        }
        return () => { }
    }, [action.isLoadingAssignation])

    useEffect(() => {
        if (id) {
            dispatch(getTeacherByMatricule(id as string));
        }
    }, [dispatch]);

    return (
        <>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit} >
                {/* Entete */}
                <Title
                     title={`${teacher?.nom.toUpperCase()} ${teacher?.prenom} (${teacher?.matricule_personnel})`}
                    description='Gérez l’attribution des enseignants aux classes et aux matières.'
                    onBackClick={() => {
                        hasChanges ? setShowRegisterConfirm(true) : navigate(-1);
                    }}
                >
                    {permission.update && permission.create &&
                        <button
                            id='assignation_button'
                            className="bg-primary-600 text-light px-2 py-1 sm:px-4 sm:py-2 _classe rounded-lg space-x-2 hover:bg-primary-700 transition-colors flex items-center disabled:bg-primary-300"
                            type='submit'
                            disabled={action.isLoadingAssignation || !hasChanges}
                        >
                            {action.isLoadingAssignation
                                ? <div className="w-5 h-5 me-1 inline-block border-4 border-light border-t-transparent rounded-full animate-spin"></div> :
                                <Save className="w-4 h-4" />
                            }
                            <span className='max-md:hidden-susp'>Enregistrer</span>
                        </button>
                    }
                </Title>
                {teacher?.id_personnel &&
                    <input type="hidden" name='id_personnel' value={teacher.id_personnel} onChange={() => { }} />
                }

                {error &&
                    <div>
                        <InputError message={error} />
                    </div>
                }
                {formErrors?.id_personnel &&
                    <div>
                        <InputError message={formErrors.id_personnel} />
                    </div>
                }

                {action.isLoading && <Loading />}
                {!action.isLoading && 
                    <TeacherSubject assignationsInitialValue={teacher?.assignations} onChange={assignationChangeIndication} />
                }
            </form>
            <ConfirmDialog
                title='Enregistrer les modifications ?'
                message="Voulez-vous enregistrer les modifications ?"
                isOpen={showRegisterConfirm}
                onConfirm={handleComfirmation}
                onClose={handleAnnuleRegistration}
                cancelButtonLabel="Ne pas enregistrer"
                cancelButtonColor='red'
                confirmButtonColor='blue'
                confirmButtonLabel='Enregistrer'
            />
        </>
    )
}

export default Assignments