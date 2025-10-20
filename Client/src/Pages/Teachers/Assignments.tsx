import { useEffect } from 'react'
import TeacherSubject from '../TeacherSubject'
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Components/ui/Loading';
import { getTeacherState } from './redux/TeachersSlice';
import { assignationTeacher, getTeacherByMatricule } from './redux/TeacherAsyncThunk';
import InputError from '../../Components/ui/InputError';
import { object, string } from 'yup';
import useForm from '../../Hooks/useForm';
import Profile from '../../Components/ui/Profile';
import { useHashPermission } from '../../Hooks/useHashPermission';


// Validation de donnée avec yup 
const assignationSchema = object({
    // Élève
    id_personnel: string().required("L'enseignant est introuvable"),
});
const Assignments = () => {
    const { error, single: { data: teacher, action } } = useSelector(getTeacherState);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const permission = useHashPermission('teachers');


    const { onSubmite, formErrors } = useForm(assignationSchema, { id_personnel: teacher?.id_personnel || '' });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData: any) => {
            console.log(validateData);

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
        <form className='space-y-6' onSubmit={handleSubmit} >
            <input type="hidden" name='id_personnel' value={teacher?.id_personnel} onChange={() => { }} />
            {/* Entete */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                    <ArrowLeft className="h-6 w-6 inline-block me-1 cursor-pointer" onClick={() => navigate(-1)} />
                    Attribution des classes et des matières
                </h1>
                {permission.update && permission.create &&
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg space-x-2 hover:bg-blue-700 transition-colors flex items-center disabled:bg-blue-300"
                        type='submit'
                        disabled={action.isLoadingAssignation}
                    >
                        {action.isLoadingAssignation
                            ? <div className="w-5 h-5 me-1 inline-block border-4 border-white border-t-transparent rounded-full animate-spin"></div> :
                            <Save className="w-4 h-4" />
                        }
                        <span>Enregistrer</span>
                    </button>
                }
            </div>

            {teacher &&
                <div className='w-full py-5 mb-5 flex justify-center bg-blue-50 border border-blue-100 rounded'>
                    <Profile
                        fullName={teacher?.nom ? `${teacher?.nom} ${teacher?.prenom}` : ''}
                        photo={teacher?.photo as string}
                        copy={false}
                        identification={teacher?.matricule_personnel}
                    />
                </div>
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
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <TeacherSubject assignationsInitialValue={teacher?.assignations} />
                </div>
            }
        </form>
    )
}

export default Assignments