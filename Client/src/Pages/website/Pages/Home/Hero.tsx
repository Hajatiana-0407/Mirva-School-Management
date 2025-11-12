import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getHeroState } from '../../Redux/Slice/Home/HeroSlice';
import { AppDispatch } from '../../../../Redux/store';
import { getAllHero } from '../../Redux/AsyncThunk/HomeAsyncThunk';
import { HeroSlideType, HeroSlideInitialValue } from '../../Type';
import Loading from '../../../../Components/ui/Loading';
import { baseUrl } from '../../../../Utils/Utils';

const Hero: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const { datas: sliders } = useSelector(getHeroState);
    const dispatch: AppDispatch = useDispatch();

    const currentSlideData: HeroSlideType = sliders[currentSlide] || HeroSlideInitialValue;

    /**
     * Récupération des données
     */
    useEffect(() => {
        if (!sliders.length) {
            dispatch(getAllHero());
        }
    }, [dispatch, sliders.length]);

    /**
     * Navigation entre les slides
     */
    const nextSlide = () => {
        if (!sliders.length) return;
        setCurrentSlide(prev => (prev + 1) % sliders.length);
    };

    const prevSlide = () => {
        if (!sliders.length) return;
        setCurrentSlide(prev => (prev - 1 + sliders.length) % sliders.length);
    };

    /**
     * Auto-slide toutes les 8 secondes
     */
    useEffect(() => {
        if (sliders.length === 0) return;

        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % sliders.length);
        }, 8000);

        return () => clearInterval(timer);
    }, [sliders.length]);

    /**
     * Si les données ne sont pas encore chargées
     */
    if (sliders.length === 0) {
        return <Loading />;
    }

    return (
        <section className="relative text-white bg-linear-to-r from-blue-500 via-blue-600 to-blue overflow-hidden">
            {/* Slider - Images */}
            <div className="relative h-screen">
                {sliders.map((slide, index) => (
                    <div
                        key={slide.id_slide}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-blend-overlay"
                            style={{ backgroundImage: `url(${baseUrl(slide.image)})` }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40" />
                    </div>
                ))}

                {/* Texte affiché directement */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 h-full flex items-center">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight min-h-[1.2em]">
                            {currentSlideData.titre}
                        </h1>
                        <p className="text-xl lg:text-2xl mb-8 text-blue-100 min-h-[1.2em]">
                            {currentSlideData.soustitre}
                        </p>

                        {currentSlideData.cta && (
                            <Link
                                to={currentSlideData.cta_link || '/about'}
                                className="inline-flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                            >
                                <span>{currentSlideData.cta}</span>
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        )}
                    </div>
                </div>

                {/* Flèches de navigation */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>

                {/* Indicateurs (dots) */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                    {sliders.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
