import React, { useEffect } from 'react';
import { number, object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import useForm from '../../Hooks/useForm';
import { classeInitialState, ClasseType, levelType } from '../../Utils/Types';
import { getClasseState } from '../../Pages/Classes/redux/ClasseSlice';
import { getLevelState } from '../../Pages/Levels/redux/LevelSlice';
import { getAllLevel } from '../../Pages/Levels/redux/LevelAsyncThunk';
import InputError from '../../Components/ui/InputError';
import { createClasse, updateClasse } from '../../Pages/Classes/redux/ClasseAsyncThunk';
import { Check, PenBox, X } from 'lucide-react';

// Validation de donnée avec yup 
const classeSchema = object({
    denomination: string().required('La denomination est obligatoire.'),
    niveau_id_niveau: number().min(1, "'Selectionner un niveau.'").required('Selectionner un niveau.'),
})

type ClasseFormPropsType = {
    handleClose?: () => void;
    classe?: ClasseType | null;
    idLevelToAddClasse?: number
}
const ClasseForm: React.FC<ClasseFormPropsType> = ({ classe, handleClose, idLevelToAddClasse }) => {
    const dispatch: AppDispatch = useDispatch();
    const { action, error } = useSelector(getClasseState);
    const { onSubmite, formErrors } = useForm<ClasseType>(classeSchema, classeInitialState);
    const { datas: niveaux } = useSelector(getLevelState);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData: ClasseType) => {
            classe ? dispatch(updateClasse({ Classe: validateData, id: classe?.id_classe as number })) : dispatch(createClasse(validateData))
        }, e)
    }
    useEffect(() => {
        if (niveaux.length === 0) {
            dispatch(getAllLevel());
        }
    }, [dispatch]);

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <InputError message={error} />
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                <select
                    defaultValue={idLevelToAddClasse || ''}
                    name='niveau_id_niveau'
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {!classe && <option value="0">Sélectionner un niveau</option>}

                    {niveaux.map((niveau: levelType, key: number) => {
                        return classe && classe.niveau_id_niveau === niveau.id_niveau
                            ? <option key={key} value={niveau.id_niveau}>{niveau.niveau}</option>
                            : classe ? "" : <option key={key} value={niveau.id_niveau}>{niveau.niveau}</option>
                    })}
                    {niveaux.map((niveau: levelType, key: number) => {
                        return classe && classe.niveau_id_niveau !== niveau.id_niveau
                            ? <option key={key} value={niveau.id_niveau}>{niveau.niveau}</option>
                            : ""
                    })}
                </select>
                <InputError message={formErrors?.niveau_id_niveau} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la classe</label>
                <input
                    type="text"
                    name='denomination'
                    defaultValue={classe?.denomination || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <InputError message={formErrors?.denomination} />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                {handleClose !== undefined &&
                    <button
                        type="button"
                        onClick={handleClose}
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
                    {action.isLoading || action.isUpdating ?
                        <div className="w-5 h-5 me-1 inline-block border-4 border-white border-t-transparent rounded-full animate-spin"></div> :
                        <>
                            {classe ?
                                <PenBox className='inline-block w-5 h-5 me-1' /> :
                                <Check className='inline-block w-5 h-5 me-1' />
                            }
                        </>
                    }
                    {classe ? 'Modifier' : 'Ajouter'}
                </button>
            </div>
        </form>
    )
}

export default ClasseForm