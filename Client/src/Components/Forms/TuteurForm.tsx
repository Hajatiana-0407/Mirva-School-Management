import { Check, FolderOpen, Home, Mail, PenBox, Phone, User, UserCheck, X } from "lucide-react";
import Input from "../ui/Input";
import { object, string } from "yup";
import { StudentDetailsType } from "../../Pages/Students/StudentSinglePage";
import { ParentInitialValue, ParentType } from "../../Utils/Types";
import { AppDispatch } from "../../Redux/store";
import { useDispatch } from "react-redux";
import useForm from "../../Hooks/useForm";
import { useState } from "react";
import { createParent, updateParent } from "../../Pages/Parents/redux/ParentAsyncThunk";

// ! FORMULAIRE POUR LE TYPE TUTEUR
// Validation de donnée avec yup 
const TuteurSchema = object({
    tuteur_nom: string()
        .required('Le nom  est obligatoire.'),
    tuteur_tel: string()
        .required('Le numero de télephone.'),
    adresse: string()
        .required('L\'addresse est obligatoire.'),
    tuteur_lien: string()
        .required('Ce champ est obligatoire')
});

type TuteurFormPropsType = { student: StudentDetailsType, handleCloseModal: () => void };
const TuteurForm: React.FC<TuteurFormPropsType> = ({ student, handleCloseModal }) => {

    const { onSubmite, formErrors } = useForm<ParentType>(TuteurSchema, ParentInitialValue);
    const [isDeletingParentInfo, setIsDeletingParentInfo] = useState(true)
    const dispatch: AppDispatch = useDispatch();

    // ? Handlers
    const handleSubmite = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData) => {
            student?.id_parent != null ? dispatch(updateParent({ parent: validateData, id: student?.id_parent as number })) : dispatch(createParent(validateData))
        }, e)
    }

    return (
        <form onSubmit={handleSubmite}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="hidden"
                    name='tuteur_type'
                    value={'tuteur'}
                />
                <input type="hidden"
                    name='id_eleve' value={student?.id_eleve}
                    onChange={() => { }}
                />
                <Input
                    label='Nom et prénoms du tuteur légal'
                    name='tuteur_nom'
                    defaultValue={student?.tuteur_nom || ''}
                    icon={User}
                    errorMessage={formErrors?.tuteur_nom}
                />
                <Input
                    label='Lien avec l’élève'
                    name='tuteur_lien'
                    defaultValue={student?.tuteur_lien || ''}
                    icon={UserCheck}
                    errorMessage={formErrors?.tuteur_lien}
                />
                <Input
                    label='Téléphone du tuteur'
                    name='tuteur_tel'
                    defaultValue={student?.tuteur_tel || ''}
                    icon={Phone}
                    errorMessage={formErrors?.tuteur_tel}
                />
                <Input
                    label='Email du tuteur'
                    name='tuteur_email'
                    defaultValue={student?.tuteur_email || ''}
                    icon={Mail}
                    errorMessage={formErrors?.tuteur_email}
                />
                <Input
                    label='Adresse '
                    name='adresse'
                    defaultValue={student?.adresse || ''}
                    icon={Home}
                    errorMessage={formErrors?.adresse}
                />
                <Input
                    label='Photocopie CIN du tuteur'
                    name='pc_cin_tuteur'
                    defaultValue={student?.bulletin || ''}
                    icon={FolderOpen}
                    iconColor='text-amber-500'
                    type='file'
                />

                {student.id_parent &&
                    <label className="flex cursor-pointer col-span-2  bg-yellow-100 p-3 rounded  items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900">Supprimer les information sur les parent</h4>
                            <p className="text-sm text-gray-600">Ne garder que les information sur le tuteur de {student.nom} {student.prenom} </p>
                        </div>
                        <div className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value={isDeletingParentInfo ? 'true' : 'false'}
                                name='to_delete_parent'
                                className="sr-only peer"
                                onChange={(e) => setIsDeletingParentInfo(e.target.checked)}
                                defaultChecked={isDeletingParentInfo}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </div>
                    </label>
                }
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    <X className='h-5 w-5 me-1 inline-block' />
                    Annuler
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    {student.id_parent ? <>
                        <PenBox className='h-5 w-5 me-1 inline-block' />
                        <span>Modifier</span>
                    </>
                        : <>
                            <Check className='h-5 w-5 me-1 inline-block' />
                            <span>Ajouter</span>
                        </>}
                </button>
            </div>
        </form>
    )
}

export default TuteurForm