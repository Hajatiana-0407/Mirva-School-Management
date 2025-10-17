import React from 'react'
import InputError from '../ui/InputError'
import { object, string } from 'yup'
import { levelType } from '../../Utils/Types'
import useForm from '../../Hooks/useForm'
import { useState } from 'react';
import { AppDispatch } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getLevelState } from '../../Pages/Levels/redux/LevelSlice'
import { cycles } from '../../Utils/Utils';
import { updateLevel, createLevel } from '../../Pages/Levels/redux/LevelAsyncThunk'
import { Check, PenBox, X } from 'lucide-react'


// Validation de donnée avec yup 
const LevelSchema = object({
    niveau: string().required('Le nom du niveau est obligatoire.'),
    cycle: string().required('Le cycle est obligatoire.'),
    description: string().required('La description est obligatoire.')
})

type LevelFormPropsType = {
    handleClose?: () => void ;
    level?: levelType | null 
}
const LevelForm: React.FC<LevelFormPropsType> = ({ handleClose, level }) => {
    const { onSubmite, formErrors } = useForm<levelType>(LevelSchema, { niveau: '', cycle: '', description: '' });
    const dispatch: AppDispatch = useDispatch();
    const [isActiveAutoGenationClasse, setIsActiveAutoGenationClasse] = useState(false)
    const { error, action } = useSelector(getLevelState);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData: levelType) => {
            level ? dispatch(updateLevel({ level: validateData, id: level?.id_niveau as number })) : dispatch(createLevel(validateData))
        }, e)
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <InputError message={error} />
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom du niveau</label>
                <input
                    name='niveau'
                    type="text"
                    defaultValue={level?.niveau || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <InputError message={formErrors?.niveau} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cycle</label>
                <select name='cycle' className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {cycles.map((cycle: string, key: number) => cycle === level?.cycle ? <option key={key} value={cycle}>{cycle}</option> : '')}
                    {cycles.map((cycle: string, key: number) => cycle !== level?.cycle ? <option key={key} value={cycle}>{cycle}</option> : '')}
                </select>
                <InputError message={formErrors?.cycle} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    name='description'
                    defaultValue={level?.description || ''}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <InputError message={formErrors?.description} />
            </div>
            {!level &&
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium text-gray-900">Générer des classes automatiquement</h4>
                        <p className="text-sm text-gray-600">Création des classes automatiquement pour ce niveau.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" onChange={(e) => setIsActiveAutoGenationClasse(e.target.checked)} defaultChecked={isActiveAutoGenationClasse} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            }
            {
                (isActiveAutoGenationClasse && !level) &&
                <>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de classe</label>
                        <input
                            name='classe'
                            type="number"
                            min={0}
                            max={15}
                            defaultValue={0}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-sm text-gray-600">Les classes générées sont nommées par ordre alphabétique.</p>
                    </div>
                </>
            }
            <div className="flex justify-end space-x-3 pt-4">
                {handleClose !== undefined &&
                    <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <X className='inline-block w-5 h-5 me-1' />
                        Annuler
                    </button>
                }
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                    {action.isLoading || action.isUpdating ?
                        <div className="w-5 h-5 me-1 inline-block border-4 border-white border-t-transparent rounded-full animate-spin"></div> :
                        <>
                            {level ?
                                <PenBox className='inline-block w-5 h-5 me-1' /> :
                                <Check className='inline-block w-5 h-5 me-1' />
                            }
                        </>
                    }
                    {level ? 'Modifier' : 'Ajouter'}
                </button>
            </div>
        </form>
    )
}

export default LevelForm