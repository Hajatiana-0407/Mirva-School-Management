import { Check, Component, Eye, FilePlus, Lock, PenBox, Trash, X } from 'lucide-react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRoleState } from '../../Pages/Settings/UserRoles/redux/UserRolesSlice';
import { RoleInitialValue, RoleType } from '../../Utils/Types';
import { getModuleState } from '../../Redux/Other/slices/ModuleSlice';
import CheckInput from '../ui/CheckInput';
import { object, string } from 'yup';
import useForm from '../../Hooks/useForm';
import InputError from '../ui/InputError';
import { AppDispatch } from '../../Redux/store';
import { createRole, updateRole } from '../../Pages/Settings/UserRoles/redux/UserRolesAsyncThunk';
import clsx from 'clsx';

// Validation de donnée avec yup 
const RoleSchema = object({
    nom: string().required('Le nom est obligatoire.'),
    description: string().required('La description est obligatoire.'),
    couleur: string().required('La couleur est obligatoire.')
})

type RoleFormPropsType = {
    handleClose?: () => void;
    role?: RoleType;
    copy?: RoleType;
}
const RoleForm: React.FC<RoleFormPropsType> = ({ handleClose, role, copy }) => {
    const { action, error } = useSelector(getRoleState);
    const { datas: modules } = useSelector(getModuleState);
    const { onSubmite, formErrors } = useForm(RoleSchema, RoleInitialValue);
    const dispatch: AppDispatch = useDispatch();


    // ? Handler 
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData: any) => {
            role ? dispatch(updateRole({ role: validateData, id: role.id_role as number }))
                : dispatch(createRole(validateData));
        }, e);
    }

    return (
        <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit}
        >
            <InputError message={error} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom du rôle</label>
                    <input
                        name='nom'
                        type="text"
                        defaultValue={role?.nom || ''}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Ex: Professeur principal"
                    />
                    <InputError message={formErrors?.nom} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Couleur</label>
                    <input
                        name='couleur'
                        type="color"
                        defaultValue={role?.couleur || '#7C3AED'}
                        className="w-full h-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <InputError message={formErrors?.couleur} />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Déscription</label>
                <textarea
                    name='description'
                    rows={3}
                    defaultValue={role?.description || ''}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Décrivez les responsabilités de ce rôle..."
                />
                <InputError message={formErrors?.description} />
            </div>

            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Lock className='w-5 inline-block me-2' />
                    Permissions
                </h3>
                <div className="space-y-4 max-h-80 overflow-auto p-2 border bg-gray-50 relative">
                    <div className="sticky top-0 min-w-[800px]  h-14 bg-white border-orange-200 shadow-orange-200 text-gray-800 text-md shadow-sm font-semibold border rounded-xl z-10 grid grid-cols-5 gap-4 items-center p-4">
                        <div className='flex items-center gap-2'>
                            <Component className='w-5 h-5 text-orange-500' />
                            <span>Module</span>
                        </div>
                        <div className='flex items-center gap-2 '>
                            <Eye className='w-5 h-5 text-green-500' />
                            <span>Lécture</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <FilePlus className='w-5 h-5 text-blue-500' />
                            <span>Création</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <PenBox className='w-5 h-5 text-yellow-500' />
                            <span>Modification</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Trash className='w-5 h-5 text-red-500' />
                            <span>Suppression</span>
                        </div>
                    </div>
                    {modules.map((module) => {
                        return (
                            <div key={module.id_module} className={
                                clsx({
                                    'shadow shadow-orange-300': module.is_section,
                                },'bg-white border rounded-xl p-4 min-w-[800px]')
                            } >
                                <div className={clsx({
                                    'text-orange-600': module.is_section,
                                    'text-gray-600': !module.is_section,
                                }, 'grid grid-cols-5 gap-4 items-center')} >
                                    <h4 className={clsx({
                                        'capitalize' : !module.is_section , 
                                        'uppercase' : module.is_section , 
                                    }, "font-semibold")} >{module.label}</h4>
                                    <CheckInput
                                        name={`rolePermissions[${module.id_module}][read]`}
                                        color='green'
                                        defaultValue={role?.permissions[module.id_module as number]?.read || copy?.permissions[module.id_module as number]?.read}
                                    />
                                    {!module.is_section &&
                                        <>
                                            <CheckInput
                                                name={`rolePermissions[${module.id_module}][create]`}
                                                color='blue'
                                                defaultValue={role?.permissions[module.id_module as number]?.create || copy?.permissions[module.id_module as number]?.create}
                                            />
                                            <CheckInput
                                                name={`rolePermissions[${module.id_module}][update]`}
                                                color='yellow'
                                                defaultValue={role?.permissions[module.id_module as number]?.update || copy?.permissions[module.id_module as number]?.update}
                                            />
                                            <CheckInput
                                                name={`rolePermissions[${module.id_module}][delete]`}
                                                color='red'
                                                defaultValue={role?.permissions[module.id_module as number]?.delete || copy?.permissions[module.id_module as number]?.delete}
                                            />
                                        </>
                                    }
                                </div>
                            </div>
                        );
                    })}
                </div>
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
                    {action.isUpdating || action.isLoading ?
                        <div className="w-5 h-5 me-1 inline-block border-4 border-white border-t-transparent rounded-full animate-spin"></div> :
                        <>
                            {role ?
                                <PenBox className='inline-block w-5 h-5 me-1' /> :
                                <Check className='inline-block w-5 h-5 me-1' />
                            }
                        </>
                    }
                    {role ? 'Modifier' : 'Ajouter'}
                </button>
            </div>
        </form>
    )
}

export default RoleForm