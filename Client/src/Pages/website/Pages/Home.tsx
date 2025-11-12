import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, BookOpen, Heart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides, siteContent } from '../data/mockData';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textKey, setTextKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % heroSlides.length;
        // Déclencher l'animation du texte quand l'image change
        setTextKey(prevKey => prevKey + 1);
        return nextSlide;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const nextSlide = (prev + 1) % heroSlides.length;
      setTextKey(prevKey => prevKey + 1);
      return nextSlide;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const nextSlide = (prev - 1 + heroSlides.length) % heroSlides.length;
      setTextKey(prevKey => prevKey + 1);
      return nextSlide;
    });
  };

  const stats = [
    { icon: Users, value: '500+', label: 'Élèves' },
    { icon: BookOpen, value: '25+', label: 'Enseignants' },
    { icon: Award, value: '20+', label: 'Années d\'expérience' },
    { icon: Heart, value: '100%', label: 'Réussite' },
  ];

  const currentSlideData = heroSlides[currentSlide];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30 backdrop-blur-[2px]"></div>
        
        {/* Slider - Images seulement */}
        <div className="relative h-screen">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-blend-overlay"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            </div>
          ))}
          
          {/* Texte fixe avec effet d'écriture */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 
                key={`title-${textKey}`}
                className="text-4xl lg:text-6xl font-bold mb-6 leading-tight typewriter"
              >
                {currentSlideData.title}
              </h1>
              <p 
                key={`subtitle-${textKey}`}
                className="text-xl lg:text-2xl mb-8 text-blue-100 typewriter-subtitle"
              >
                {currentSlideData.subtitle}
              </p>
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in-up animation-delay-400"
              >
                <span>{currentSlideData.cta}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          {/* Navigation Arrows */}
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
          
          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setTextKey(prevKey => prevKey + 1);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-6">
                Bienvenue à {siteContent.schoolName}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {siteContent.description}
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
                src="https://images.pexels.com/photos/8500552/pexels-photo-8500552.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Students learning"
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary-500 text-white p-4 rounded-lg shadow-lg">
                <p className="font-semibold">Excellence depuis {siteContent.foundedYear}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-800 mb-4">
              Nos Valeurs
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-3">
                Excellence Académique
              </h3>
              <p className="text-gray-600">
                Un enseignement de qualité adapté aux standards internationaux
              </p>
            </div>
            <div className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-3">
                Respect et Tolérance
              </h3>
              <p className="text-gray-600">
                Un environnement inclusif où chaque élève peut s'épanouir
              </p>
            </div>
            <div className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-3">
                Innovation Pédagogique
              </h3>
              <p className="text-gray-600">
                Des méthodes d'enseignement modernes et interactives
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Rejoignez notre communauté
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Découvrez comment nous pouvons accompagner votre enfant vers la réussite
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>Nous contacter</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;