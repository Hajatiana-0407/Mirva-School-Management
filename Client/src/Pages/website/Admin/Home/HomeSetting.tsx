import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, Edit, Archive, ChevronLeft, ChevronRight, Trash2, ArrowRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getHeroState } from '../../Redux/Slice/Home/HeroSlice';
import { getAppState } from '../../../../Redux/AppSlice';
import { HeroSlideType } from '../../Type';
import { AppDispatch } from '../../../../Redux/store';
import { useHashPermission } from '../../../../Hooks/useHashPermission';
import { deleteSlide, getAllHero } from '../../Redux/AsyncThunk/HomeAsyncThunk';
import Table from '../../../Table';
import Modal from '../../../Modal';
import ConfirmDialog from '../../../ConfirmDialog';
import Title from '../../../../Components/ui/Title';
import { baseUrl } from '../../../../Utils/Utils';
import Loading from '../../../../Components/ui/Loading';
import HeroSlideFrom from '../../Components/Form/HeroSlideFrom';

const HomeSetting: React.FC = () => {
    const { datas: heroSlices, action } = useSelector(getHeroState);
    const { hiddeTheModalActive } = useSelector(getAppState);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingSlide, setEditingSlide] = useState<HeroSlideType | null>(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [slideToArchive, setSlideToArchive] = useState<HeroSlideType | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const dispatch: AppDispatch = useDispatch();
    const permission = useHashPermission({ redirect: true });

    useEffect(() => {
        if (!heroSlices.length) dispatch(getAllHero());
    }, [dispatch]);

    useEffect(() => {
        if (showModal && hiddeTheModalActive) {
            setShowModal(false);
            setEditingSlide(null);
        }
    }, [hiddeTheModalActive]);



    const handleEdit = (slide: HeroSlideType) => {
        setEditingSlide(slide);
        setShowModal(true);
    };

    const handleArchive = (slide: HeroSlideType) => {
        setSlideToArchive(slide);
        setShowConfirmDialog(true);
    };

    const handleConfirmArchive = () => {
        if (slideToArchive) {
            // dispatch action to archive/delete slide
            dispatch(deleteSlide(slideToArchive.id_slide as number));
        }
        setShowConfirmDialog(false);
        setSlideToArchive(null);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingSlide(null);
    };

    const handleSelect = (index: number) => setSelectedIndex(index);
    const handlePrev = () => setSelectedIndex(i => (i <= 0 ? Math.max(0, heroSlices.length - 1) : i - 1));
    const handleNext = () => setSelectedIndex(i => (i >= heroSlices.length - 1 ? 0 : i + 1));

    // Tableau
    const columns = [
        { key: 'titre', label: 'Titre' },
        { key: 'soustitre', label: 'Sous-titre' },
        {
            key: 'image',
            label: 'Image',
            render: (value: string) => (
                <div className="w-28 h-16 overflow-hidden rounded">
                    <img src={baseUrl(value || '')} alt="slide" className="object-cover w-full h-full" />
                </div>
            )
        },
        {
            key: 'cta',
            label: 'Bouton',
            render: (value: string, item: HeroSlideType) => (
                <div className="w-28 h-16 overflow-hidden rounded flex flex-col">
                    <span className='text-md'>{value} </span>
                    <span className='text-sm italic text-gray-500'>{item.cta_link}</span>
                </div>
            )
        },

    ];
    const actions = [
        { icon: Edit, type: 'update', label: 'Modifier', onClick: handleEdit, color: 'green' },
        { icon: Archive, type: 'delete', label: 'Archiver', onClick: handleArchive, color: 'red' }
    ];

    return (
        <div className="space-y-4 md:space-y-6">
            <Title
                title="Hero - Section Accueil"
                description="Gérez les slides du carrousel d’accueil : image, titre, sous-titre et lien."
            >
                {permission.create &&
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Nouvelle slide</span>
                    </button>
                }
            </Title>

            <div className="bg-white p-3 md:p-6 rounded-lg shadow-sm border">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* left: list & controls */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Rechercher un slide..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                    <Filter className="w-4 h-4" />
                                    <span>Filtres</span>
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <Table
                                data={heroSlices}
                                columns={columns}
                                actions={actions}
                                searchTerm={searchTerm}
                                isLoading={action?.isLoading}
                            // onRowClick={(row: any, idx: number) => handleSelect(idx)}
                            />
                        </div>
                    </div>

                    {/* right: preview */}
                    <div className="w-full lg:w-1/3 bg-gray-50 rounded-lg p-3 flex flex-col items-center justify-center border">
                        {action?.isLoading ? (
                            <Loading />
                        ) : heroSlices.length === 0 ? (
                            <div className="text-sm text-gray-500">Aucun slide disponible.</div>
                        ) : (
                            <>
                                <div className="relative w-full h-48 rounded overflow-hidden shadow-md bg-black">
                                    <img
                                        src={baseUrl(heroSlices[selectedIndex]?.image || '')}
                                        alt="hero preview"
                                        className="object-cover w-full h-full opacity-90"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
                                        <div className="text-lg font-bold truncate">{heroSlices[selectedIndex]?.titre}</div>
                                        <div className="text-sm opacity-90 truncate">{heroSlices[selectedIndex]?.soustitre}</div>
                                        {heroSlices[selectedIndex]?.cta && (
                                            <div
                                                className="inline-flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-xs    text-white px-2 py-1 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                            >
                                                <span>{heroSlices[selectedIndex].cta}</span>
                                                <ArrowRight className="h-5 w-5" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="w-full flex items-center justify-between mt-3">
                                    <button onClick={handlePrev} className="p-2 rounded-md hover:bg-white/40">
                                        <ChevronLeft />
                                    </button>

                                    <div className="flex-1 px-3">
                                        <div className="text-xs text-gray-500 mb-1">Slide {selectedIndex + 1} / {heroSlices.length}</div>
                                        <div className="flex items-center gap-2 overflow-auto">
                                            {heroSlices.map((s: HeroSlideType, i: number) => (
                                                <button
                                                    key={s.id_slide || i}
                                                    onClick={() => handleSelect(i)}
                                                    className={`w-16 h-10 rounded overflow-hidden border ${i === selectedIndex ? 'ring-2 ring-blue-500' : 'border-transparent'}`}
                                                >
                                                    <img src={baseUrl(s.image || '')} alt="thumb" className="object-cover w-full h-full" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button onClick={handleNext} className="p-2 rounded-md hover:bg-white/40">
                                        <ChevronRight />
                                    </button>
                                </div>

                                <div className="w-full flex gap-2 mt-3">
                                    <button
                                        onClick={() => handleEdit(heroSlices[selectedIndex])}
                                        className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700"
                                    >
                                        <Edit className="w-4 h-4" /> Modifier
                                    </button>
                                    <button
                                        onClick={() => handleArchive(heroSlices[selectedIndex])}
                                        className="bg-red-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
                                    >
                                        <Trash2 className="w-4 h-4" /> Supprimer
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Modal
                size='lg'
                isOpen={showModal}
                onClose={handleCloseModal}
                title={editingSlide ? 'Modifier le slide' : 'Nouvelle slide'}
            >
                <HeroSlideFrom slide={editingSlide} handleClose={handleCloseModal} />
            </Modal>

            <ConfirmDialog
                isOpen={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onConfirm={handleConfirmArchive}
                title="Archiver le slide"
                message={`Êtes-vous sûr de vouloir archiver ce slide ?`}
            />
        </div>
    );
};

export default HomeSetting;