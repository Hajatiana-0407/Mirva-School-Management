import React, { useState } from 'react';
import { object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { BookMarked, Check, PenBox, X } from 'lucide-react';
import { ValueInitialValue, ValueType } from '../../Type';
import { AppDispatch } from '../../../../Redux/store';
import { getValueState } from '../../Redux/Slice/Home/ValueSlice';
import InputError from '../../../../Components/ui/InputError';
import useForm from '../../../../Hooks/useForm';
import Input from '../../../../Components/ui/Input';
import { createValue, updateValue } from '../../Redux/AsyncThunk/HomeAsyncThunk';
import CheckInput from '../../../../Components/ui/CheckInput';
import IconPicker from '../ui/IconPicker';

// Validation de donnée avec yup 
const valueSchema = object({
    titre: string().required('Le titre est obligatoire.'),
    description: string().required('La description est obligatoire.'),
    icone: string().required("L'icône est obligatoire."),
    actif: string(),
});

type ValueFormProps = {
    handleClose?: () => void;
    value?: ValueType | null;
};

const ValueForm: React.FC<ValueFormProps> = ({ value, handleClose }) => {
    const dispatch: AppDispatch = useDispatch();
    const { action, error } = useSelector(getValueState);

    // Utilisation minimale de useForm
    const { onSubmite, formErrors } = useForm<ValueType>(
        valueSchema, ValueInitialValue
    );

    // Pour la gestion locale de l'icône et couleur
    const [icon, setIcon] = useState<string>(value?.icone || '');

    // Gestion soumission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData: any) => {
            value
                ? dispatch(updateValue({ id: value.id_valeur as number, dataToUpdate: validateData }))
                : dispatch(createValue(validateData));
        }, e);
    };

    // Gestion sélection icône
    const handleIconChange = (iconName: string) => {
        setIcon(iconName);
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <InputError message={error} />
            <div className="grid grid-cols-1 gap-4">
                <Input
                    label="Titre"
                    name="titre"
                    defaultValue={value?.titre}
                    errorMessage={formErrors?.titre}
                    icon={BookMarked}
                />
                <div>
                    <textarea
                        rows={3}
                        name="description"
                        defaultValue={value?.description}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Décrivez la valeur..."
                    />
                    <InputError message={formErrors?.description} />
                </div>
                <div>
                    <IconPicker
                        value={icon}
                        onChange={handleIconChange}
                    />
                    <input type="hidden" name='icone' value={icon} onChange={() => { }} />
                    <InputError message={formErrors?.icone} />
                </div>
                <CheckInput
                    name="actif"
                    label="Valeur active"
                    defaultValue={true}
                    description="Si oui, la valeur sera affichée sur la page d'accueil."
                />
            </div>
            {/* Boutons */}
            <div className="flex justify-end space-x-3 pt-4">
                {handleClose &&
                    <button
                        type="button"
                        onClick={handleClose}
                        className="px-2 py-1 sm:px-4 sm:py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <X className='inline-block w-5 h-5 me-1' />
                        Annuler
                    </button>
                }
                <button
                    type="submit"
                    className="px-2 py-1 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                    {action.isLoading || action.isUpdating ?
                        <div className="w-5 h-5 me-1 inline-block border-4 border-white border-t-transparent rounded-full animate-spin"></div> :
                        <>
                            {value ?
                                <PenBox className='inline-block w-5 h-5 me-1' /> :
                                <Check className='inline-block w-5 h-5 me-1' />
                            }
                        </>
                    }
                    {value ? 'Modifier' : 'Ajouter'}
                </button>
            </div>
        </form>
    );
};

export default ValueForm;