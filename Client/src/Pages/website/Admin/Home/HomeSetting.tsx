import { useEffect, useState } from 'react';
import { Plus, Search, Filter, Edit, Archive, Eye } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getHeroState } from '../../Redux/Slice/Home/HeroSlice';
import { getAppState } from '../../../../Redux/AppSlice';
import { HeroSlideType } from '../../Type';
import { AppDispatch } from '../../../../Redux/store';
import { useHashPermission } from '../../../../Hooks/useHashPermission';
import { getAllHero } from '../../Redux/AsyncThunk/HomeAsyncThunk';
import Table from '../../../Table';
import Modal from '../../../Modal';
import ConfirmDialog from '../../../ConfirmDialog';
import Title from '../../../../Components/ui/Title';
import { baseUrl } from '../../../../Utils/Utils';


const HomeSetting = () => {
    const { datas: heroSlices, action } = useSelector(getHeroState);
    const { hiddeTheModalActive } = useSelector(getAppState);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingSlide, setEditingSlide] = useState<HeroSlideType | null>(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [slideToArchive, setSlidelideToArchive] = useState<HeroSlideType | null>(null);
    const dispatch: AppDispatch = useDispatch();
    const permission = useHashPermission({ redirect: true });


    const columns = [
        { key: 'titre', label: 'Titre' },
        { key: 'soustitre', label: 'Sous-titre' },
        { key: 'image' , label: 'Image' ,  render: (value: string ) =>(
            <div>
                <img src={baseUrl( value )} alt='Image-slide' className='max-w-24' />
            </div>
        )}
    ];

    const handleEdit = (subject: any) => {
        setEditingSlide(subject);
        setShowModal(true);
    };

    const handleArchive = (subject: any) => {
        setSlidelideToArchive(subject);
        setShowConfirmDialog(true);
    };

    const handleConfirmArchive = () => {
        if (slideToArchive) {
            // dispatch(deleteSubject(slideToArchive?.id_matiere as number))
        }
        setShowConfirmDialog(false);
        setSlidelideToArchive(null);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingSlide(null);
    };

    // Modal
    useEffect(() => {
        if (showModal && hiddeTheModalActive) {
            handleCloseModal();
        }
    }, [hiddeTheModalActive]);


    // Prendre toutes les slece dans la base de données
    useEffect(() => {
        if (!heroSlices.length) {
            dispatch(getAllHero());
        }
    }, [dispatch]);


    const actions = [
        { icon: Eye, label: 'Voir', onClick: (item: any) => console.log('Voir', item), color: 'blue' },
        { icon: Edit, type: 'update', label: 'Modifier', onClick: handleEdit, color: 'green' },
        { icon: Archive, type: 'delete', label: 'Archiver', onClick: handleArchive, color: 'red' },
    ];

    return (
        <div className="space-y-4 md:space-y-6">
            <Title  
                title='Gestion des matières'
                description='Créez et organisez les matières enseignées.'
            >
                {permission.create &&
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-2 py-1 sm:px-4 sm:py-2 _classe rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span className='max-md:hidden-susp'>Nouvelle matière</span>
                    </button>
                }
            </Title>

            <div className="bg-white p-3 md:p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-6 md:mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher une matière..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <button className="flex items-center space-x-2 px-2 py-1 sm:px-4 sm:py-2 _classe border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Filter className="w-4 h-4" />
                            <span>Filtres</span>
                        </button>
                    </div>
                </div>

                <Table
                    data={heroSlices}
                    columns={columns}
                    actions={actions}
                    searchTerm={searchTerm}
                    isLoading={action.isLoading}
                />
            </div>

            {/* Modal pour ajouter/modifier une matière */}
            <Modal
                isOpen={showModal}
                onClose={handleCloseModal}
                title={editingSlide ? 'Modifier la matière' : 'Nouvelle matière'}
            >
                <div></div>
            </Modal>

            {/* Dialog de confirmation */}
            <ConfirmDialog
                isOpen={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onConfirm={handleConfirmArchive}
                title="Archiver le slide"
                message={`Êtes-vous sûr de vouloir archiver cette slide ?`}
            />
        </div>
    );
};

export default HomeSetting;