import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Archive, Eye } from 'lucide-react';
import Table from './Table';
import Modal from './Modal';
import ConfirmDialog from './ConfirmDialog';

const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [studentToArchive, setStudentToArchive] = useState<any>(null);

  const students = [
    { id: 1, nom: 'Martin', prenom: 'Pierre', classe: '6ème A', age: 11, email: 'p.martin@email.com', telephone: '06.12.34.56.78' },
    { id: 2, nom: 'Dubois', prenom: 'Sophie', classe: '5ème B', age: 12, email: 's.dubois@email.com', telephone: '06.23.45.67.89' },
    { id: 3, nom: 'Moreau', prenom: 'Lucas', classe: '4ème C', age: 13, email: 'l.moreau@email.com', telephone: '06.34.56.78.90' },
    { id: 4, nom: 'Bernard', prenom: 'Emma', classe: '3ème A', age: 14, email: 'e.bernard@email.com', telephone: '06.45.67.89.01' },
  ];

  const columns = [
    { key: 'nom', label: 'Nom' },
    { key: 'prenom', label: 'Prénom' },
    { key: 'classe', label: 'Classe' },
    { key: 'age', label: 'Âge' },
    { key: 'email', label: 'Email' },
    { key: 'telephone', label: 'Téléphone' },
  ];

  const handleEdit = (student: any) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  const handleArchive = (student: any) => {
    setStudentToArchive(student);
    setShowConfirmDialog(true);
  };

  const handleConfirmArchive = () => {
    console.log('Archivage de:', studentToArchive);
    setShowConfirmDialog(false);
    setStudentToArchive(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingStudent(null);
  };

  const actions = [
    { icon: Eye, label: 'Voir', onClick: (item: any) => console.log('Voir', item), color: 'blue' },
    { icon: Edit, type:'update', label: 'Modifier', onClick: handleEdit, color: 'green' },
    { icon: Archive,type:'delete', label: 'Archiver', onClick: handleArchive, color: 'red' },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des élèves</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-2 py-1 sm:px-4 sm:py-2 _classe rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvel élève</span>
        </button>
      </div>

      <div className="bg-white p-3 md:p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6 md:mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un élève..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-2 py-1 sm:px-4 sm:py-2 _classe border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filtres</span>
            </button>
          </div>
        </div>

        <Table
          data={students}
          columns={columns}
          actions={actions}
          searchTerm={searchTerm}
        />
      </div>

      {/* Modal pour ajouter/modifier un élève */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingStudent ? 'Modifier l\'élève' : 'Nouvel élève'}
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                type="text"
                defaultValue={editingStudent?.nom || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input
                type="text"
                defaultValue={editingStudent?.prenom || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Classe</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Sélectionner une classe</option>
                <option value="6ème A">6ème A</option>
                <option value="5ème B">5ème B</option>
                <option value="4ème C">4ème C</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Âge</label>
              <input
                type="number"
                defaultValue={editingStudent?.age || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              defaultValue={editingStudent?.email || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input
              type="tel"
              defaultValue={editingStudent?.telephone || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-2 py-1 sm:px-4 sm:py-2 _classe text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-2 py-1 sm:px-4 sm:py-2 _classe bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingStudent ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Dialog de confirmation */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmArchive}
        title="Archiver l'élève"
        message={`Êtes-vous sûr de vouloir archiver l'élève ${studentToArchive?.prenom} ${studentToArchive?.nom} ?`}
      />
    </div>
  );
};

export default Students;