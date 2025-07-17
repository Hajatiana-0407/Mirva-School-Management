import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Archive, Eye } from 'lucide-react';
import Table from './Table';
import Modal from './Modal';
import ConfirmDialog from './ConfirmDialog';

const Subjects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [subjectToArchive, setSubjectToArchive] = useState<any>(null);

  const subjects = [
    { id: 1, nom: 'Mathématiques', coefficient: 4, heuresParSemaine: 4, couleur: '#3B82F6' },
    { id: 2, nom: 'Français', coefficient: 4, heuresParSemaine: 4, couleur: '#10B981' },
    { id: 3, nom: 'Anglais', coefficient: 3, heuresParSemaine: 3, couleur: '#F59E0B' },
    { id: 4, nom: 'Histoire-Géographie', coefficient: 3, heuresParSemaine: 3, couleur: '#EF4444' },
    { id: 5, nom: 'Sciences Physiques', coefficient: 3, heuresParSemaine: 2, couleur: '#8B5CF6' },
    { id: 6, nom: 'SVT', coefficient: 2, heuresParSemaine: 2, couleur: '#06B6D4' },
    { id: 7, nom: 'EPS', coefficient: 1, heuresParSemaine: 2, couleur: '#84CC16' },
  ];

  const columns = [
    { key: 'nom', label: 'Matière' },
    { key: 'coefficient', label: 'Coefficient' },
    { key: 'heuresParSemaine', label: 'Heures/semaine' },
    { key: 'couleur', label: 'Couleur', render: (value: string) => (
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: value }}></div>
        <span>{value}</span>
      </div>
    ) },
  ];

  const handleEdit = (subject: any) => {
    setEditingSubject(subject);
    setShowModal(true);
  };

  const handleArchive = (subject: any) => {
    setSubjectToArchive(subject);
    setShowConfirmDialog(true);
  };

  const handleConfirmArchive = () => {
    console.log('Archivage de:', subjectToArchive);
    setShowConfirmDialog(false);
    setSubjectToArchive(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSubject(null);
  };

  const actions = [
    { icon: Eye, label: 'Voir', onClick: (item: any) => console.log('Voir', item), color: 'blue' },
    { icon: Edit, label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive, label: 'Archiver', onClick: handleArchive, color: 'red' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des matières</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle matière</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
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
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filtres</span>
            </button>
          </div>
        </div>

        <Table
          data={subjects}
          columns={columns}
          actions={actions}
          searchTerm={searchTerm}
        />
      </div>

      {/* Modal pour ajouter/modifier une matière */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingSubject ? 'Modifier la matière' : 'Nouvelle matière'}
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la matière</label>
            <input
              type="text"
              defaultValue={editingSubject?.nom || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Coefficient</label>
              <input
                type="number"
                defaultValue={editingSubject?.coefficient || ''}
                min="1"
                max="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heures par semaine</label>
              <input
                type="number"
                defaultValue={editingSubject?.heuresParSemaine || ''}
                min="1"
                max="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Couleur</label>
            <input
              type="color"
              defaultValue={editingSubject?.couleur || '#3B82F6'}
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              {editingSubject ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Dialog de confirmation */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmArchive}
        title="Archiver la matière"
        message={`Êtes-vous sûr de vouloir archiver la matière ${subjectToArchive?.nom} ?`}
      />
    </div>
  );
};

export default Subjects;