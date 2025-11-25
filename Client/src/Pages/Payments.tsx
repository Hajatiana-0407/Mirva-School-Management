import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Archive, Eye, CreditCard, CheckCircle, XCircle, Clock } from 'lucide-react';
import Table from './Table';
import Modal from './Modal';

const Payments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('payments');

  const payments = [
    { id: 1, eleve: 'Martin Pierre', montant: 450, statut: 'Payé', dateEcheance: '2025-01-15', datePaiement: '2025-01-10', type: 'Scolarité' },
    { id: 2, eleve: 'Dubois Sophie', montant: 450, statut: 'En attente', dateEcheance: '2025-01-15', datePaiement: null, type: 'Scolarité' },
    { id: 3, eleve: 'Moreau Lucas', montant: 85, statut: 'Payé', dateEcheance: '2025-01-20', datePaiement: '2025-01-18', type: 'Cantine' },
    { id: 4, eleve: 'Bernard Emma', montant: 450, statut: 'En retard', dateEcheance: '2025-01-15', datePaiement: null, type: 'Scolarité' },
  ];

  const columns = [
    { key: 'eleve', label: 'Élève' },
    { key: 'type', label: 'Type' },
    { key: 'montant', label: 'Montant', render: (value: number) => `${value} €` },
    { key: 'dateEcheance', label: 'Échéance' },
    { key: 'datePaiement', label: 'Date paiement', render: (value: string) => value || 'Non payé' },
    { key: 'statut', label: 'Statut', render: (value: string) => {
      const colors = {
        'Payé': 'bg-green-100 text-green-800',
        'En attente': 'bg-yellow-100 text-yellow-800',
        'En retard': 'bg-red-100 text-red-800'
      };
      const icons = {
        'Payé': <CheckCircle className="w-4 h-4" />,
        'En attente': <Clock className="w-4 h-4" />,
        'En retard': <XCircle className="w-4 h-4" />
      };
      return (
        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${colors[value as keyof typeof colors]}`}>
          {icons[value as keyof typeof icons]}
          <span>{value}</span>
        </span>
      );
    }},
  ];

  const paymentStats = {
    total: payments.reduce((sum, p) => sum + p.montant, 0),
    paye: payments.filter(p => p.statut === 'Payé').reduce((sum, p) => sum + p.montant, 0),
    enAttente: payments.filter(p => p.statut === 'En attente').reduce((sum, p) => sum + p.montant, 0),
    enRetard: payments.filter(p => p.statut === 'En retard').reduce((sum, p) => sum + p.montant, 0),
  };

  const actions = [
    { icon: Eye, label: "Voir les détails", onClick: (item: any) => console.log("Voir les détails", item), color: 'primary' },
    { icon: Edit, type:'update', label: 'Modifier', onClick: (item: any) => console.log('Modifier', item), color: 'green' },
    { icon: Archive,type:'delete', label: "Supprimer", onClick: (item: any) => console.log("Supprimer", item), color: 'red' },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary-900">Gestion des paiements</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary-600 text-light px-2 py-1 sm:px-4 sm:py-2 _classe rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau paiement</span>
        </button>
      </div>

      {/* Statistiques des paiements */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-light p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Total facturé</p>
              <p className="text-2xl font-bold text-secondary-900">{paymentStats.total} €</p>
            </div>
            <CreditCard className="w-8 h-8 text-secondary-400" />
          </div>
        </div>
        <div className="bg-light p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Payé</p>
              <p className="text-2xl font-bold text-green-600">{paymentStats.paye} €</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-light p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">En attente</p>
              <p className="text-2xl font-bold text-yellow-600">{paymentStats.enAttente} €</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-light p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">En retard</p>
              <p className="text-2xl font-bold text-red-600">{paymentStats.enRetard} €</p>
            </div>
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="border-b">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('payments')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'payments'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Paiements
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'invoices'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Factures
          </button>
          <button
            onClick={() => setActiveTab('reminders')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'reminders'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Rappels
          </button>
        </nav>
      </div>

      <div className="bg-light p-3 md:p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6 md:mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
              <input
                type="text"
                placeholder="Rechercher un paiement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-2 py-1 sm:px-4 sm:py-2 _classe border border-secondary-300 rounded-lg hover:bg-secondary-50">
              <Filter className="w-4 h-4" />
              <span>Filtres</span>
            </button>
          </div>
        </div>

        <Table
          data={payments}
          columns={columns}
          actions={actions}
          searchTerm={searchTerm}
        />
      </div>

      {/* Modal pour ajouter/modifier un paiement */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Nouveau paiement"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Élève</label>
            <select className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="">Sélectionner un élève</option>
              <option value="Martin Pierre">Martin Pierre</option>
              <option value="Dubois Sophie">Dubois Sophie</option>
              <option value="Moreau Lucas">Moreau Lucas</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Type</label>
              <select className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Sélectionner un type</option>
                <option value="Scolarité">Scolarité</option>
                <option value="Cantine">Cantine</option>
                <option value="Transport">Transport</option>
                <option value="Activités">Activités</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Montant (€)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Date d'échéance</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Statut</label>
              <select className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="En attente">En attente</option>
                <option value="Payé">Payé</option>
                <option value="En retard">En retard</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Description</label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Description du paiement"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-2 py-1 sm:px-4 sm:py-2 _classe text-secondary-600 border border-secondary-300 rounded-lg hover:bg-secondary-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-2 py-1 sm:px-4 sm:py-2 _classe bg-primary-600 text-light rounded-lg hover:bg-primary-700"
            >
              Créer
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Payments;