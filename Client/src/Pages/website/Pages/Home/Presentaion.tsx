import React, { useEffect } from 'react'
import { Award, BookOpen, Heart, Users } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getPresentationState } from '../../Redux/Slice/Home/PresentationSlice';
import Loading from '../../../../Components/ui/Loading';
import { AppDispatch } from '../../../../Redux/store';
import { getAllPresentation } from '../../Redux/AsyncThunk/HomeAsyncThunk';
import { baseUrl } from '../../../../Utils/Utils';
import InputError from '../../../../Components/ui/InputError';

const Presentaion: React.FC = () => {
    const { action, datas: presentations, error } = useSelector(getPresentationState);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (!presentations.id_presentation) {
            dispatch(getAllPresentation());
        }
        return () => { }
    }, [dispatch])


    // Statistique de l'etat de l'ecole 
    const stats = [
        { icon: Users, value: `${presentations.nombre_eleves}+`, label: 'Élèves' },
        { icon: BookOpen, value: `${presentations.nombre_professeurs}+`, label: 'Enseignants' },
        { icon: Award, value: `${presentations.annees_experience}+`, label: 'Années d\'expérience' },
        { icon: Heart, value: `${presentations.taux_reussite}%`, label: 'Réussite' },
    ];

    // Loading 
    if (action.isLoading) return <Loading />

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Erreur  */}
                <InputError message={error} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-6">
                            {presentations.titre}
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            {presentations.description}
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center p-4 bg-primary-50 rounded-lg">
                                    <stat.icon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-primary-800">{stat.value}</div>
                                    <div className="text-sm text-primary-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src={baseUrl(presentations.image)}
                            alt="Students learning"
                            className="rounded-lg shadow-xl w-full h-96 object-cover"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-primary-500 text-white p-4 rounded-lg shadow-lg">
                            {/* TODO */}
                            <p className="font-semibold">Excellence depuis 3</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Presentaion