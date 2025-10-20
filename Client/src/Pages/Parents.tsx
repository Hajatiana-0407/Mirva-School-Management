import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Archive, Eye, Users } from 'lucide-react';
import Table from './Table';
import Modal from './Modal';
import ConfirmDialog from './ConfirmDialog';

const Parents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingParent, setEditingParent] = useState<any>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [parentToArchive, setParentToArchive] = useState<any>(null);

  const parents = [
    { id: 1, nom: 'Martin', prenom: 'Jean', email: 'jean.martin@email.com', telephone: '06.12.34.56.78', enfants: 'Pierre Martin (6ème A)', relation: 'Père' },
    { id: 2, nom: 'Dubois', prenom: 'Anne', email: 'anne.dubois@email.com', telephone: '06.23.45.67.89', enfants: 'Sophie Dubois (5ème B)', relation: 'Mère' },
    { id: 3, nom: 'Moreau', prenom: 'Paul', email: 'paul.moreau@email.com', telephone: '06.34.56.78.90', enfants: 'Lucas Moreau (4ème C)', relation: 'Père' },
    { id: 4, nom: 'Bernard', prenom: 'Marie', email: 'marie.bernard@email.com', telephone: '06.45.67.89.01', enfants: 'Emma Bernard (3ème A)', relation: 'Mère' },
  ];

  const columns = [
    { key: 'nom', label: 'Nom' },
    { key: 'prenom', label: 'Prénom' },
    { key: 'email', label: 'Email' },
    { key: 'telephone', label: 'Téléphone' },
    { key: 'enfants', label: 'Enfants' },
    { key: 'relation', label: 'Relation' },
  ];

  const handleEdit = (parent: any) => {
    setEditingParent(parent);
    setShowModal(true);
  };

  const handleArchive = (parent: any) => {
    setParentToArchive(parent);
    setShowConfirmDialog(true);
  };

  const handleConfirmArchive = () => {
    console.log('Archivage de:', parentToArchive);
    setShowConfirmDialog(false);
    setParentToArchive(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingParent(null);
  };

  const actions = [
    { icon: Eye, label: 'Voir', onClick: (item: any) => console.log('Voir', item), color: 'blue' },
    { icon: Edit, type:'update', label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive,type:'delete', label: 'Archiver', onClick: handleArchive, color: 'red' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des parents</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau parent</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un parent..."
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
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{parents.length} parent(s)</span>
          </div>
        </div>

        <Table
          data={parents}
          columns={columns}
          actions={actions}
          searchTerm={searchTerm}
        />
      </div>

      {/* Modal pour ajouter/modifier un parent */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingParent ? 'Modifier le parent' : 'Nouveau parent'}
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                type="text"
                defaultValue={editingParent?.nom || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input
                type="text"
                defaultValue={editingParent?.prenom || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              defaultValue={editingParent?.email || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input
              type="tel"
              defaultValue={editingParent?.telephone || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Sélectionner la relation</option>
              <option value="Père">Père</option>
              <option value="Mère">Mère</option>
              <option value="Tuteur">Tuteur</option>
              <option value="Tutrice">Tutrice</option>
              <option value="Grand-parent">Grand-parent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enfants</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Sélectionner un enfant</option>
              <option value="Pierre Martin">Pierre Martin (6ème A)</option>
              <option value="Sophie Dubois">Sophie Dubois (5ème B)</option>
              <option value="Lucas Moreau">Lucas Moreau (4ème C)</option>
              <option value="Emma Bernard">Emma Bernard (3ème A)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Adresse complète"
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
              {editingParent ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Dialog de confirmation */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmArchive}
        title="Archiver le parent"
        message={`Êtes-vous sûr de vouloir archiver le parent ${parentToArchive?.prenom} ${parentToArchive?.nom} ?`}
      />
    </div>
  );
};

export default Parents;