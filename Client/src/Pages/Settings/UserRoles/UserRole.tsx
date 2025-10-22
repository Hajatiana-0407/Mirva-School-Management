import { Check, Copy, Edit, Plus, Search, Trash2, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Modal from '../../Modal'
import RoleForm from '../../../Components/Forms/RoleForm'
import { useDispatch, useSelector } from 'react-redux'
import { getRoleState } from './redux/UserRolesSlice'
import InputError from '../../../Components/ui/InputError'
import { AppDispatch } from '../../../Redux/store'
import { deleteRole, getAllRole } from './redux/UserRolesAsyncThunk'
import Loading from '../../../Components/ui/Loading'
import { RoleInitialValue, RoleType } from '../../../Utils/Types'
import { getAppState } from '../../../Redux/AppSlice'
import ConfirmDialog from '../../ConfirmDialog'
import { useHashPermission } from '../../../Hooks/useHashPermission'

const getPermissionIcon = (hasPermission: boolean) => {
    return hasPermission ? (
        <Check className="w-5 text-green-700" />
    ) : (
        <X className="w-5 text-red-700" />
    );
};

const UserRole: React.FC = () => {
    const { action, datas, error } = useSelector(getRoleState);
    const dispatch: AppDispatch = useDispatch();
    const [editingRole, setEditingRole] = useState<RoleType | null>(null);
    const [copyRole, setCopyRole] = useState<RoleType | null>(RoleInitialValue);
    const [showRoleModal, setShowRoleModal] = useState(false)
    const { hiddeTheModalActive } = useSelector(getAppState);
    const [roleToDelete, setRoleToDelete] = useState<RoleType | null>(null)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const permissions = useHashPermission('roles-settings');
    const [searchTerm, setSearchTerm] = useState('');

    // Handler 
    const handleCloseModal = () => {
        setShowRoleModal(false);
        setEditingRole(null);
        setCopyRole(null);
    }

    const handleDelete = (role: RoleType) => {
        setRoleToDelete(role);
        setShowConfirmDialog(true);
    }

    const handleConfirmDelete = () => {
        setShowConfirmDialog(false);
        dispatch(deleteRole(roleToDelete?.id_role as number))
    }

    const handleEdit = (role: RoleType) => {
        setEditingRole(role);
        setShowRoleModal(true);
    }
    const handleCopy = (role: RoleType) => {
        setCopyRole(role);
        setShowRoleModal(true);
    }

    useEffect(() => {
        dispatch(getAllRole());
        if (datas.length === 0) {
        }
        return () => { }
    }, [datas.length, dispatch])


    useEffect(() => {
        if (showRoleModal && hiddeTheModalActive) {
            handleCloseModal();
        }
    }, [hiddeTheModalActive]);


    const filteredRoles = datas.filter(role =>
        role.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Gestion des rôles et permissions</h2>
                    <p className="text-gray-600 mt-1">Définissez les droits d'accès pour chaque type d'utilisateur</p>
                </div>
                {permissions.create &&
                    <button
                        onClick={() => {
                            setShowRoleModal(true);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Nouveau rôle</span>
                    </button>
                }
            </div>
            {/* Search and Filters */}
            <div>
                <InputError message={error} />
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Rechercher un rôle..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Roles Grid */}
            <div className='lg:w-max grid md:grid-cols-2 lg:grid-cols-4  gap-2 '>
                <div className='border px-2 flex gap-2 bg-green-100 p-1 rounded'>
                    <span className='bg-green-400 rounded text-white bg w-5 inline-block text-center'>L</span>
                    <span> Lécture</span>
                </div>
                <div className='border px-2 flex gap-2 bg-blue-100  p-1 rounded'>
                    <span className='bg-blue-400 text-center rounded text-white w-5 inline-block'>C</span>
                    <span>Création</span>
                </div>
                <div className='border px-2 flex gap-2 bg-yellow-100  p-1 rounded'>
                    <span className='bg-yellow-400 text-center rounded text-white w-5 inline-block'>M</span>
                    <span>Modification</span>
                </div>
                <div className='border px-2 flex gap-2 bg-red-100  p-1 rounded'>
                    <span className='bg-red-400 text-center rounded text-white w-5 inline-block'>S</span>
                    <span>Suppression</span>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {action.isLoading && datas.length == 0
                    ? <Loading />
                    : filteredRoles.map((role) => (
                        <div key={role.id_role} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-6  transition-all duration-200 ">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div
                                        className="w-4 h-4 rounded-full shrink-0"
                                        style={{ backgroundColor: role.couleur }}
                                    ></div>
                                    <div className=''>
                                        <h3 className="text-lg font-semibold text-gray-900">{role.nom.toLocaleUpperCase()}</h3>
                                        <p className="text-sm text-gray-600 inline-block">{role.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {permissions.update &&
                                        <button
                                            onClick={() => handleEdit(role)}
                                            className="p-2 text-green-600  hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Modifier"
                                            disabled={!permissions.update}
                                        >
                                            <Edit className="w-5" />
                                        </button>
                                    }
                                    {permissions.create &&
                                        <button
                                            onClick={() => handleCopy(role)}
                                            className="p-2 text-blue-600 hover:bg-green-50 rounded-lg transition-colors"
                                            title="Dupliquer"
                                            disabled={!permissions.create}
                                        >
                                            <Copy className="w-5" />
                                        </button>
                                    }
                                    {permissions.delete &&
                                        <button
                                            onClick={() => handleDelete(role)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:text-gray-400"
                                            title="Supprimer"
                                            disabled={role.is_restrict == '1'}
                                        >
                                            <Trash2 className="w-5" />
                                        </button>
                                    }
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-gray-600">{role.total_utilisateur} utilisateur(s)</span>
                                {role.total_utilisateur > 0 &&
                                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium underline">
                                        Voir les utilisateurs
                                    </button>
                                }
                            </div>

                            {/* Permissions */}
                            <div className="space-y-2">
                                <div className='flex border-b pb-1'>
                                    <h4 className="text-md font-medium text-gray-700">Permissions principales</h4>
                                    <div className='flex ml-auto gap-3 text-center text-lg'>
                                        <span className='bg-green-400 rounded text-white bg w-5 inline-block'>L</span>
                                        <span className='bg-blue-400 rounded text-white w-5 inline-block'>C</span>
                                        <span className='bg-yellow-400 rounded text-white w-5 inline-block'>M</span>
                                        <span className='bg-red-400  rounded text-white w-5 inline-block'>S</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {Object.entries(role.permissions).slice(0, 6).map(([key, permission]) => {
                                        return (
                                            <div key={key} className="flex items-center justify-between">
                                                <span className="text-gray-600 capitalize text-md">{permission.label}</span>
                                                <div className="flex space-x-3">
                                                    {getPermissionIcon(permission.read)}
                                                    {getPermissionIcon(permission.create)}
                                                    {getPermissionIcon(permission.update)}
                                                    {getPermissionIcon(permission.delete)}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                {Object.keys(role.permissions).length > 6 && (
                                    <button className="text-xs text-blue-600 hover:text-blue-700 underline">
                                        Voir toutes les permissions
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
            </div>

            {/* Role Modal */}
            <Modal
                isOpen={showRoleModal}
                onClose={handleCloseModal}
                title={editingRole ? `Modifier le rôle : "${editingRole.nom}"` : 'Nouveau rôle'}
                size='lg'
            >
                <RoleForm handleClose={handleCloseModal} role={editingRole as RoleType} copy={copyRole as RoleType} />
            </Modal>
            {/* Confirm Dialog */}
            <ConfirmDialog
                isOpen={showConfirmDialog}
                onClose={() => { setRoleToDelete(null); setShowConfirmDialog(false) }}
                onConfirm={handleConfirmDelete}
                title="Supprimer le rôle"
                message={`Êtes-vous sûr de vouloir supprimer le rôle "${roleToDelete?.nom}" ? Cette action est irréversible.`}
            />
        </div>
    )
}

export default UserRole