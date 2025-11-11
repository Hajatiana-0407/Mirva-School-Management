import React from 'react'
import { subjectInitialValue, SubjectType } from '../../Utils/Types';
import useForm from '../../Hooks/useForm';
import InputError from '../../Components/ui/InputError';
import { object, string } from 'yup';
import { Check, PenBox, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectState } from '../../Pages/Subjects/redux/SubjectSlice';
import { AppDispatch } from '../../Redux/store';
import { createSubject, updateSubject } from '../../Pages/Subjects/redux/SubjectAsyncThunk';


// Validation de donnée avec yup 
const SubjectSchema = object({
    denomination: string().required('La denomination est obligatoire.'),
    abbreviation: string().required('L\' abbreviation est obligatoire.'),
    couleur: string().required('La couleur est obligatoire.'),
});

type SubjectFormPropsType = {
    handleClose?: () => void;
    subject?: SubjectType | null
}
const SubjectForm: React.FC<SubjectFormPropsType> = ({ handleClose, subject }) => {
    const { onSubmite, formErrors } = useForm<SubjectType>(SubjectSchema, subjectInitialValue);
    const { action, error } = useSelector(getSubjectState)
    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData) => {
            subject ? dispatch(updateSubject({ subject: validateData, id: subject?.id_matiere as number })) : dispatch(createSubject(validateData))
        }, e)
    }
    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <InputError message={error} />
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" >Nom de la matière</label>
                    <input
                        name='denomination'
                        type="text"
                        defaultValue={subject?.denomination || ''}
                        placeholder='Ex:Mathématique'
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <InputError message={formErrors?.denomination} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Abbreviation</label>
                    <input
                        name='abbreviation'
                        type="text"
                        defaultValue={subject?.abbreviation || ''}
                        placeholder='Ex:MATH'
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <InputError message={formErrors?.abbreviation} />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Déscription</label>
                <textarea
                    name='description'
                    defaultValue={subject?.description}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <InputError message={formErrors?.description} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Couleur</label>
                <input
                    type="color"
                    name='couleur'
                    defaultValue={subject?.couleur || '#80aed1'}
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <InputError message={formErrors?.couleur} />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    onClick={handleClose}
                    className="px-2 py-1 sm:px-4 sm:py-2 _classe text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    <X className='inline-block w-5 h-5 me-1' />
                    Annuler
                </button>
                <button
                    type="submit"
                    className="px-2 py-1 sm:px-4 sm:py-2 _classe bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                    {action.isLoading || action.isUpdating ?
                        <div className="w-5 h-5 me-1 inline-block border-4 border-white border-t-transparent rounded-full animate-spin"></div> :
                        <>
                            {subject ?
                                <PenBox className='inline-block w-5 h-5 me-1' /> :
                                <Check className='inline-block w-5 h-5 me-1' />
                            }
                        </>
                    }
                    {subject ? 'Modifier' : 'Ajouter'}
                </button>
            </div>
        </form>
    )
}

export default SubjectForm