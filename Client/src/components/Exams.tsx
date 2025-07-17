import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Archive, Eye, FileText } from 'lucide-react';
import Table from './Table';
import Modal from './Modal';

const Exams: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('exams');

  const exams = [
    { id: 1, nom: 'Contrôle Mathématiques', matiere: 'Mathématiques', classe: '6ème A', date: '2025-01-25', type: 'Contrôle', coefficient: 2 },
    { id: 2, nom: 'Devoir Français', matiere: 'Français', classe: '5ème B', date: '2025-01-28', type: 'Devoir', coefficient: 1 },
    { id: 3, nom: 'Examen Anglais', matiere: 'Anglais', classe: '4ème C', date: '2025-02-02', type: 'Examen', coefficient: 3 },
  ];

  const notes = [
    { id: 1, eleve: 'Martin Pierre', matiere: 'Mathématiques', note: 15, sur: 20, coefficient: 2, date: '2025-01-20' },
    { id: 2, eleve: 'Dubois Sophie', matiere: 'Français', note: 17, sur: 20, coefficient: 1, date: '2025-01-18' },
    { id: 3, eleve: 'Moreau Lucas', matiere: 'Anglais', note: 12, sur: 20, coefficient: 3, date: '2025-01-22' },
  ];

  const examColumns = [
    { key: 'nom', label: 'Nom de l\'examen' },
    { key: 'matiere', label: 'Matière' },
    { key: 'classe', label: 'Classe' },
    { key: 'date', label: 'Date' },
    { key: 'type', label: 'Type' },
    { key: 'coefficient', label: 'Coefficient' },
  ];

  const noteColumns = [
    { key: 'eleve', label: 'Élève' },
    { key: 'matiere', label: 'Matière' },
    { key: 'note', label: 'Note', render: (value: number, item: any) => `${value}/${item.sur}` },
    { key: 'coefficient', label: 'Coefficient' },
    { key: 'date', label: 'Date' },
  ];

  const examActions = [
    { icon: Eye, label: 'Voir', onClick: (item: any) => console.log('Voir', item), color: 'blue' },
    { icon: Edit, label: 'Modifier', onClick: (item: any) => console.log('Modifier', item), color: 'green' },
    { icon: Archive, label: 'Archiver', onClick: (item: any) => console.log('Archiver', item), color: 'red' },
  ];

  const noteActions = [
    { icon: Edit, label: 'Modifier', onClick: (item: any) => console.log('Modifier', item), color: 'green' },
    { icon: Archive, label: 'Supprimer', onClick: (item: any) => console.log('Supprimer', item), color: 'red' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Examens et Notes</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{activeTab === 'exams' ? 'Nouvel examen' : 'Nouvelle note'}</span>
        </button>
      </div>

      {/* Onglets */}
      <div className="border-b">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('exams')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'exams'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Examens
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'notes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Notes
          </button>
          <button
            onClick={() => setActiveTab('bulletins')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'bulletins'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Bulletins
          </button>
        </nav>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Rechercher ${activeTab === 'exams' ? 'un examen' : 'une note'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filtres</span>
            </button>
          </div>
          {activeTab === 'bulletins' && (
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors">
              <FileText className="w-4 h-4" />
              <span>Générer bulletins</span>
            </button>
          )}
        </div>

        {activeTab === 'exams' && (
          <Table
            data={exams}
            columns={examColumns}
            actions={examActions}
            searchTerm={searchTerm}
          />
        )}

        {activeTab === 'notes' && (
          <Table
            data={notes}
            columns={noteColumns}
            actions={noteActions}
            searchTerm={searchTerm}
          />
        )}

        {activeTab === 'bulletins' && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Bulletins scolaires</h3>
            <p className="text-gray-600 mb-4">Générez et consultez les bulletins de notes des élèves</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Commencer la génération
            </button>
          </div>
        )}
      </div>

      {/* Modal pour ajouter/modifier */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={activeTab === 'exams' ? 'Nouvel examen' : 'Nouvelle note'}
      >
        {activeTab === 'exams' ? (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'examen</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Matière</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Sélectionner une matière</option>
                  <option value="Mathématiques">Mathématiques</option>
                  <option value="Français">Français</option>
                  <option value="Anglais">Anglais</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Classe</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Sélectionner une classe</option>
                  <option value="6ème A">6ème A</option>
                  <option value="5ème B">5ème B</option>
                  <option value="4ème C">4ème C</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Coefficient</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Créer
              </button>
            </div>
          </form>
        ) : (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Élève</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Sélectionner un élève</option>
                <option value="Martin Pierre">Martin Pierre</option>
                <option value="Dubois Sophie">Dubois Sophie</option>
                <option value="Moreau Lucas">Moreau Lucas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Matière</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Sélectionner une matière</option>
                <option value="Mathématiques">Mathématiques</option>
                <option value="Français">Français</option>
                <option value="Anglais">Anglais</option>
              </select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sur</label>
                <input
                  type="number"
                  defaultValue="20"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Coefficient</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Ajouter
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Exams;