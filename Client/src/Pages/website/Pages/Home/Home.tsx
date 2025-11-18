import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from './Hero';
import Presentaion from './Presentaion';
import Value from './Value';

const Home: React.FC = () => {

  return (
    <div className="min-h-screen">
      <section data-section='hero'>
        <Hero />
      </section>
      <section data-section='presentation'>
        <Presentaion />
      </section>
      <section data-section='value'>
        <Value />
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-800 text-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Rejoignez notre communauté
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Découvrez comment nous pouvons accompagner votre enfant vers la réussite
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-light px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
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