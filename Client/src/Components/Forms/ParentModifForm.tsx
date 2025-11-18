import React from 'react'
import { ParentInitialValue, ParentType } from '../../Utils/Types'
import Input from '../ui/Input'
import { Briefcase, FileText, Mail, MapPin, PenBox, Phone, User, X } from 'lucide-react'
import useForm from '../../Hooks/useForm'
import { personSchema } from './ParentForm'
import { useDispatch, useSelector } from 'react-redux'
import { getParentState } from '../../Pages/Parents/redux/ParentSlice'
import { AppDispatch } from '../../Redux/store'
import { updateParent } from '../../Pages/Parents/redux/ParentAsyncThunk'
import CheckInput from '../ui/CheckInput'

type ParentModifFormPropsType = {
    parent: ParentType;
    handleCloseModal: () => void
}
const ParentModifForm: React.FC<ParentModifFormPropsType> = ({ parent, handleCloseModal }) => {
    const { onSubmite, formErrors } = useForm(personSchema, ParentInitialValue);
    const { action: { isUpdating } } = useSelector(getParentState);
    const dispatch: AppDispatch = useDispatch();

    // ===================== Handlers ===================== //
    const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData: any) => {
            dispatch(updateParent({ id: parent.id_parent as number, parent: validateData }));
        }, e);
    }

    return (
        <form onSubmit={handleSumbit} >
            <div className='space-y-4'>
                <input type="hidden" name="id_parent" value={parent.id_parent} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        label="Nom"
                        name="nom"
                        defaultValue={parent.nom || ""}
                        icon={User}
                        errorMessage={formErrors?.nom}
                    />
                    <Input
                        label="Prénom"
                        name="prenom"
                        defaultValue={parent.prenom || ""}
                        icon={User}
                        errorMessage={formErrors?.prenom}
                    />
                </div>
                <Input
                    label="Profession"
                    name="profession"
                    defaultValue={parent.profession || ""}
                    icon={Briefcase}
                    errorMessage={formErrors?.profession}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        label="Adresse"
                        name="adresse"
                        defaultValue={parent.adresse || ""}
                        icon={MapPin}
                        errorMessage={formErrors?.adresse}
                    />
                    <Input
                        label="Téléphone"
                        name="telephone"
                        defaultValue={parent.telephone || ""}
                        icon={Phone}
                        errorMessage={formErrors?.telephone}
                    />
                </div>
                <Input
                    label="Email"
                    name="email"
                    defaultValue={parent.email || ""}
                    icon={Mail}
                    errorMessage={formErrors?.email}
                />
                <Input
                    label="Photocopie CIN"
                    name="pc_cin"
                    icon={FileText}
                    iconColor="text-amber-500"
                    type="file"
                    errorMessage={formErrors?.pc_cin}
                />
                <CheckInput
                    label="Contact d’urgence"
                    description="Cocher cette case si ce parent doit être contacté en priorité en cas d’urgence."
                    name="contact_urgence"
                    defaultValue={parent.contact_urgence == '1' ? true : false}
                />

                <div className="flex justify-end space-x-3 pt-4">
                    {handleCloseModal !== undefined &&
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="px-2 py-1 sm:px-4 sm:py-2 _classe text-secondary-600 border border-secondary-300 rounded-lg hover:bg-secondary-50"
                        >
                            <X className='h-5 w-5 me-1 inline-block' />
                            Annuler
                        </button>
                    }
                    <button
                        type="submit"
                        className="px-2 py-1 sm:px-4 sm:py-2 _classe bg-primary-600 text-light rounded-lg hover:bg-primary-700 flex items-center "
                    >
                        {isUpdating ?
                            <div className="w-5 h-5 me-1 inline-block border-4 border-light border-t-transparent rounded-full animate-spin"></div> :
                            <PenBox className='h-5 w-5 me-1 inline-block' />
                        }
                        <span>Modifier</span>
                    </button>
                </div>

            </div>
        </form>
    )
}

export default ParentModifForm