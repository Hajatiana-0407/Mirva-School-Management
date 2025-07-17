import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Archive, Eye } from 'lucide-react';
import Table from './Table';
import Modal from './Modal';
import ConfirmDialog from './ConfirmDialog';

const Classes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [classToArchive, setClassToArchive] = useState<any>(null);

  const classes = [
    { id: 1, nom: '6ème A', niveau: '6ème', effectif: 28, enseignant: 'Mme Dupont', salle: 'A101' },
    { id: 2, nom: '5ème B', niveau: '5ème', effectif: 25, enseignant: 'M. Leroy', salle: 'B205' },
    { id: 3, nom: '4ème C', niveau: '4ème', effectif: 30, enseignant: 'Mme Garcia', salle: 'C301' },
    { id: 4, nom: '3ème A', niveau: '3ème', effectif: 22, enseignant: 'M. Rousseau', salle: 'A102' },
  ];

  const columns = [
    { key: 'nom', label: 'Nom de la classe' },
    { key: 'niveau', label: 'Niveau' },
    { key: 'effectif', label: 'Effectif' },
    { key: 'enseignant', label: 'Enseignant principal' },
    { key: 'salle', label: 'Salle' },
  ];

  const handleEdit = (classItem: any) => {
    setEditingClass(classItem);
    setShowModal(true);
  };

  const handleArchive = (classItem: any) => {
    setClassToArchive(classItem);
    setShowConfirmDialog(true);
  };

  const handleConfirmArchive = () => {
    console.log('Archivage de:', classToArchive);
    setShowConfirmDialog(false);
    setClassToArchive(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingClass(null);
  };

  const actions = [
    { icon: Eye, label: 'Voir', onClick: (item: any) => console.log('Voir', item), color: 'blue' },
    { icon: Edit, label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive, label: 'Archiver', onClick: handleArchive, color: 'red' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des classes</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle classe</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une classe..."
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
        </div>

        <Table
          data={classes}
          columns={columns}
          actions={actions}
          searchTerm={searchTerm}
        />
      </div>

      {/* Modal pour ajouter/modifier une classe */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingClass ? 'Modifier la classe' : 'Nouvelle classe'}
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la classe</label>
            <input
              type="text"
              defaultValue={editingClass?.nom || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Sélectionner un niveau</option>
              <option value="6ème">6ème</option>
              <option value="5ème">5ème</option>
              <option value="4ème">4ème</option>
              <option value="3ème">3ème</option>
              <option value="2nde">2nde</option>
              <option value="1ère">1ère</option>
              <option value="Terminale">Terminale</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Effectif maximum</label>
            <input
              type="number"
              defaultValue={editingClass?.effectif || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enseignant principal</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Sélectionner un enseignant</option>
              <option value="Mme Dupont">Mme Dupont</option>
              <option value="M. Leroy">M. Leroy</option>
              <option value="Mme Garcia">Mme Garcia</option>
              <option value="M. Rousseau">M. Rousseau</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salle</label>
            <input
              type="text"
              defaultValue={editingClass?.salle || ''}
              placeholder="ex: A101"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingClass ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Dialog de confirmation */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmArchive}
        title="Archiver la classe"
        message={`Êtes-vous sûr de vouloir archiver la classe ${classToArchive?.nom} ?`}
      />
    </div>
  );
};

export default Classes;