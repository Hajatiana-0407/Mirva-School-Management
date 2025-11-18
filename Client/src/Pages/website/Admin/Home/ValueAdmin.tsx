import React, { useEffect, useState } from 'react';
import { Plus, Edit, Archive, Eye, EyeOff, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getValueState } from '../../Redux/Slice/Home/ValueSlice';
import { getAppState } from '../../../../Redux/AppSlice';
import { AppDispatch } from '../../../../Redux/store';
import { useHashPermission } from '../../../../Hooks/useHashPermission';
import { deleteValue, getAllValue, publishValue } from '../../Redux/AsyncThunk/HomeAsyncThunk';
import { ValueType } from '../../Type';
import Title from '../../../../Components/ui/Title';
import Modal from '../../../Modal';
import ConfirmDialog from '../../../ConfirmDialog';
import Loading from '../../../../Components/ui/Loading';
import { navigate } from '../../../../Utils/navigate';
import DynamicLucideIcon from '../../Components/DynamicLucideIcon';
import useForm from '../../../../Hooks/useForm';
import { object } from 'yup';
import ValueForm from '../../Components/Form/ValueForm';

const ValueAdmin: React.FC = () => {
    const { datas: values, action } = useSelector(getValueState);
    const { hiddeTheModalActive } = useSelector(getAppState);
    const dispatch: AppDispatch = useDispatch();
    const permission = useHashPermission({ redirect: true });

    const [showModal, setShowModal] = useState(false);
    const [editingValue, setEditingValue] = useState<ValueType | null>(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [valueToArchive, setValueToArchive] = useState<ValueType | null>(null);
    const [activeIcon, setActiveIcon] = useState<string | null>(null);

    // Pour le toggle Active 
    const { onSubmite } = useForm(object({}), {})

    useEffect(() => {
        if (!values.length) dispatch(getAllValue());
    }, [dispatch]);

    useEffect(() => {
        if (showModal && hiddeTheModalActive) {
            setShowModal(false);
            setEditingValue(null);
        }
    }, [hiddeTheModalActive]);

    const handleEdit = (value: ValueType) => {
        setEditingValue(value);
        setShowModal(true);
    };

    const handleArchive = (value: ValueType) => {
        setValueToArchive(value);
        setShowConfirmDialog(true);
    };

    const handleConfirmArchive = () => {
        if (valueToArchive) {
            dispatch(deleteValue(valueToArchive.id_valeur as number));
        }
        setShowConfirmDialog(false);
        setValueToArchive(null);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingValue(null);
    };

    // Toggle actif
    const toggleActive = (e: React.FormEvent<HTMLFormElement>) => {
        onSubmite((validateData) => {
            dispatch(publishValue(validateData))
        }, e);
    };

    return (
        <div className="space-y-4 md:space-y-6">
            <Title
                backButton={false}
                title="Valeurs - Section Accueil"
                description="Gérez les valeurs affichées sur la page d’accueil."
            >
                <button
                    onClick={() => navigate('/?section=value')}
                    className="bg-orange-600 text-light px-3 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-700 transition-colors"
                >
                    <Eye className="w-5 h-5" />
                    <span>Voir le site</span>
                </button>
                {permission.create &&
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-primary-600 text-light px-3 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Nouvelle valeur</span>
                    </button>
                }
            </Title>

            <div className="">
                {action?.isLoading ? (
                    <Loading />
                ) : values.length === 0 ? (
                    <div className="text-center text-secondary-500 py-12">Aucune valeur enregistrée.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value) => (
                            <div
                                key={value.id_valeur}
                                className="relative text-center bg-light p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                            >
                                {/* Actions en haut à droite */}
                                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                    {permission.update &&
                                        <button
                                            onClick={() => handleEdit(value)}
                                            className="bg-green-100 hover:bg-green-200 p-2 rounded-full"
                                            title="Modifier"
                                        >
                                            <Edit className="w-4 h-4 text-green-700" />
                                        </button>
                                    }
                                    {permission.delete &&
                                        <button
                                            onClick={() => handleArchive(value)}
                                            className="bg-red-100 hover:bg-red-200 p-2 rounded-full"
                                            title="Archiver"
                                        >
                                            <Archive className="w-4 h-4 text-red-700" />
                                        </button>
                                    }
                                </div>
                                {/* Icône */}
                                <div
                                    className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer"
                                    onClick={() => setActiveIcon(value.icone || '')}
                                >
                                    <DynamicLucideIcon iconName={value.icone as string} color='primary' size='7' />
                                </div>
                                {/* Titre */}
                                <h3 className="text-xl font-semibold text-primary-800 mb-3">
                                    {value.titre}
                                </h3>
                                {/* Description */}
                                <p className="text-secondary-600">
                                    {value.description}
                                </p>
                                {/* Actif toggle */}
                                {permission.update &&
                                    <form onSubmit={toggleActive} className="flex justify-center mt-5">
                                        <input type="hidden" name="id_valeur" value={value.id_valeur} readOnly />
                                        <input type="hidden" name="actif" value={value.actif == '1' ? '0' : '1'} readOnly />
                                        <button
                                            type="submit"
                                            className={`ml-2 p-2 rounded-full border ${value.actif ? 'bg-green-100 text-green-700' : 'bg-secondary-100 text-secondary-400'} hover:bg-primary-50 transition`}
                                            title={value.actif ? 'Désactiver' : 'Activer'}
                                        >
                                            {value.actif == '1' ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                        </button>
                                    </form>
                                }
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Icon preview modal */}
            {activeIcon &&
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-light rounded-xl p-8 relative flex flex-col items-center">
                        <button
                            onClick={() => setActiveIcon(null)}
                            className="absolute top-3 right-3 bg-secondary-100 hover:bg-secondary-200 p-2 rounded-full"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <DynamicLucideIcon iconName={activeIcon} color='primary' size='16' />
                        <div className="mt-4 text-secondary-700">{activeIcon}</div>
                    </div>
                </div>
            }

            <Modal
                size='lg'
                isOpen={showModal}
                onClose={handleCloseModal}
                title={editingValue ? 'Modifier la valeur' : 'Nouvelle valeur'}
            >
                <div></div>
                <ValueForm value={editingValue} handleClose={handleCloseModal} />
            </Modal>

            <ConfirmDialog
                isOpen={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onConfirm={handleConfirmArchive}
                title="Archiver la valeur"
                message={`Êtes-vous sûr de vouloir archiver cette valeur ?`}
            />
        </div>
    );
};

export default ValueAdmin;