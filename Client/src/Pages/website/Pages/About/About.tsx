import React from 'react';
import History from './History';
import Mission from './Mission';
import Pilier from './Pilier.tsx'
import Installation from './Installation.tsx'
const About: React.FC = () => {

    return (
        <div className="min-h-screen">
            <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                            À propos de notre école
                        </h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Découvrez notre histoire, notre mission et nos valeurs
                        </p>
                    </div>
                </div>
            </section>
            <History />
            <Mission />
            <Pilier />
            <Installation />

        </div>
    );
};

export default About;