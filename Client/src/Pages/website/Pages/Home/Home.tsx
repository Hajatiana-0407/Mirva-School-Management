import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, BookOpen, Heart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides, siteContent } from '../../data/mockData';
import Hero from './Hero';

const Home: React.FC = () => {
  const stats = [
    { icon: Users, value: '500+', label: 'Élèves' },
    { icon: BookOpen, value: '25+', label: 'Enseignants' },
    { icon: Award, value: '20+', label: 'Années d\'expérience' },
    { icon: Heart, value: '100%', label: 'Réussite' },
  ];


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero/>
      

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