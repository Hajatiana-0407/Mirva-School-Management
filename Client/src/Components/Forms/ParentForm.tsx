import { Check, FolderOpen, Home, Mail, PenBox, Phone, User, UserCheck, X } from "lucide-react";
import Input from "../ui/Input";
import HeadingSmall from "../ui/HeadingSmall";
import { object, string } from "yup";
import { StudentDetailsType } from "../../Pages/Students/StudentSinglePage";
import { ParentInitialValue, ParentType } from "../../Utils/Types";
import { AppDispatch } from "../../Redux/store";
import { useDispatch } from "react-redux";
import useForm from "../../Hooks/useForm";
import { useState } from "react";
import { createParent, updateParent } from "../../Pages/Parents/redux/ParentAsyncThunk";

const ParentSchema = object({
    nom_pere: string()
        .required('Le nom du père est obligatoire.'),
    nom_mere: string()
        .required('Le nom de la mère est obligatoire.'),
    telephone_pere: string()
        .required('Le numero de télephone.'),
    adresse: string()
        .required('L\'addresse est obligatoire.'),
});
type ParentFormPropsType = { student: StudentDetailsType, handleCloseModal: () => void };
const ParentForm: React.FC<ParentFormPropsType> = ({ student, handleCloseModal }) => {

    const { onSubmite: onSubmitParent, formErrors: formErrorsParent } = useForm<ParentType>(ParentSchema, ParentInitialValue);
    const dispatch: AppDispatch = useDispatch();
    const [isDeletingTuteurInfo, setIsDeletingTuteurInfo] = useState(true)

    // ? Handlers
    const handleParentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmitParent((validateData) => {
            student?.id_parent != null ? dispatch(updateParent({ parent: validateData, id: student?.id_parent as number })) : dispatch(createParent(validateData))
        }, e)
    }
    return (
        <form onSubmit={handleParentSubmit}>
            <div className='space-y-4'>
                {/* Information sur le père  */}
                <HeadingSmall title='Information sur le père : ' />
                <input type="hidden"
                    name='tuteur_type' value={'parent'}
                />
                <input type="hidden"
                    name='id_eleve' value={student.id_eleve}
                    onChange={() => { }}
                />
                <Input
                    label='Nom et prénoms du père'
                    name='nom_pere'
                    defaultValue={student?.nom_pere || ''}
                    icon={User}

                    errorMessage={formErrorsParent?.nom_pere}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label='Profession du père'
                        name='profession_pere'
                        defaultValue={student?.profession_pere || ''}
                        icon={UserCheck}
                        errorMessage={formErrorsParent?.profession_pere}
                    />
                    <Input
                        label='Téléphone du père'
                        name='telephone_pere'
                        defaultValue={student?.telephone_pere || ''}
                        icon={Phone}
                        errorMessage={formErrorsParent?.telephone_pere}
                    />
                </div>
                <Input
                    label='Photocopie CIN du père'
                    name='pc_cin_pere'
                    defaultValue={student?.bulletin || ''}
                    icon={FolderOpen}
                    iconColor='text-amber-500' type='file'
                />

                {/* Information sur la mère */}
                <HeadingSmall title='Information sur la mère : ' />
                <Input
                    label='Nom et prénoms de la mère'
                    name='nom_mere'
                    defaultValue={student?.nom_mere || ''}
                    icon={User}
                    errorMessage={formErrorsParent?.nom_mere}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label='Profession de la mère'
                        name='profession_mere'
                        defaultValue={student?.profession_mere || ''}
                        icon={UserCheck}
                        errorMessage={formErrorsParent?.profession_mere}
                    />
                    <Input
                        label='Téléphone de la mère'
                        name='telephone_mere'
                        defaultValue={student?.telephone_mere || ''}
                        icon={Phone}
                        errorMessage={formErrorsParent?.telephone_mere}
                    />
                </div>
                <Input
                    label='Photocopie CIN de la mère'
                    name='pc_cin_mere'
                    defaultValue={student?.bulletin || ''}
                    icon={FolderOpen}
                    iconColor='text-amber-500' type='file'
                />

                {/* Autre information  */}
                <HeadingSmall title='Autre Information : ' />
                <Input
                    label='Adresse des parents'
                    name='adresse'
                    defaultValue={student?.adresse || ''}
                    icon={Home}
                    errorMessage={formErrorsParent?.adresse}
                />
                <Input
                    label='Email'
                    name='tuteur_email'
                    defaultValue={student?.tuteur_email || ''}
                    icon={Mail}
                    errorMessage={formErrorsParent?.tuteur_email}
                />

                {student.id_parent &&
                    <label className="flex cursor-pointer col-span-2  bg-yellow-100 p-3 rounded  items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900">Supprimer les information sur le tuteur actuel</h4>
                            <p className="text-sm text-gray-600">Ne garder que les information sur les parent de {student.nom} {student.prenom} </p>
                        </div>
                        <div className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value={isDeletingTuteurInfo ? 'true' : 'false'}
                                name='to_delete_tuteur'
                                className="sr-only peer"
                                onChange={(e) => setIsDeletingTuteurInfo(e.target.checked)}
                                defaultChecked={isDeletingTuteurInfo}
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

export default ParentForm ; 