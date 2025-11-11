import React, { useState } from 'react';
import { Plus, Search, Send, Paperclip, MoreVertical, Reply, Forward, Archive } from 'lucide-react';
import Modal from './Modal';

const Messages: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const messages = [
    {
      id: 1,
      expediteur: 'Marie Dupont',
      destinataire: 'Direction',
      sujet: 'Absence élève Pierre Martin',
      contenu: 'Bonjour, je vous informe que Pierre Martin sera absent demain pour raison médicale.',
      date: '2025-01-20 14:30',
      statut: 'Lu',
      type: 'Reçu'
    },
    {
      id: 2,
      expediteur: 'Direction',
      destinataire: 'Jean Leroy',
      sujet: 'Réunion pédagogique',
      contenu: 'Rappel : réunion pédagogique prévue vendredi 25 janvier à 16h en salle des professeurs.',
      date: '2025-01-20 10:15',
      statut: 'Envoyé',
      type: 'Envoyé'
    },
    {
      id: 3,
      expediteur: 'Carmen Garcia',
      destinataire: 'Direction',
      sujet: 'Demande de matériel',
      contenu: 'Bonjour, j\'aurais besoin de nouveaux manuels d\'anglais pour la classe de 4ème.',
      date: '2025-01-19 16:45',
      statut: 'Non lu',
      type: 'Reçu'
    },
  ];

  const handleMessageClick = (message: any) => {
    setSelectedMessage(message);
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'Lu':
        return 'bg-green-100 text-green-800';
      case 'Non lu':
        return 'bg-red-100 text-red-800';
      case 'Envoyé':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Messagerie</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-2 py-1 sm:px-4 smpy-2 _classe rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau message</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Liste des messages */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => handleMessageClick(message)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedMessage?.id === message.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900 text-sm">
                      {message.type === 'Reçu' ? message.expediteur : message.destinataire}
                    </div>
                    <div className="text-xs text-gray-500">
                      {message.date.split(' ')[1]}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    {message.sujet}
                  </div>
                  <div className="text-xs text-gray-500 mb-2 truncate">
                    {message.contenu}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(message.statut)}`}>
                      {message.statut}
                    </span>
                    <span className="text-xs text-gray-500">
                      {message.date.split(' ')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Détail du message */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border">
            {selectedMessage ? (
              <div>
                <div className="p-3 md:p-6 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedMessage.sujet}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Reply className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Forward className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Archive className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div>
                      <span className="font-medium">De:</span> {selectedMessage.expediteur}
                    </div>
                    <div>
                      {selectedMessage.date}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <span className="font-medium">À:</span> {selectedMessage.destinataire}
                  </div>
                </div>
                <div className="p-3 md:p-6">
                  <div className="text-gray-700 whitespace-pre-wrap">
                    {selectedMessage.contenu}
                  </div>
                </div>
                <div className="p-3 md:p-6 border-t bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <button className="bg-blue-600 text-white px-2 py-1 sm:px-4 smpy-2 _classe rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
                      <Reply className="w-4 h-4" />
                      <span>Répondre</span>
                    </button>
                    <button className="bg-gray-600 text-white px-2 py-1 sm:px-4 smpy-2 _classe rounded-lg flex items-center space-x-2 hover:bg-gray-700 transition-colors">
                      <Forward className="w-4 h-4" />
                      <span>Transférer</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-gray-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Send className="w-8 h-8 text-gray-400" />
                </div>
                <p>Sélectionnez un message pour le lire</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal pour nouveau message */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Nouveau message"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destinataire</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Sélectionner un destinataire</option>
              <optgroup label="Enseignants">
                <option value="marie.dupont">Marie Dupont</option>
                <option value="jean.leroy">Jean Leroy</option>
                <option value="carmen.garcia">Carmen Garcia</option>
              </optgroup>
              <optgroup label="Parents">
                <option value="jean.martin">Jean Martin</option>
                <option value="anne.dubois">Anne Dubois</option>
              </optgroup>
              <optgroup label="Administration">
                <option value="direction">Direction</option>
                <option value="secretariat">Secrétariat</option>
              </optgroup>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Sujet du message"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tapez votre message ici..."
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="flex items-center space-x-2 px-2 py-1 sm:px-4 smpy-2 _classe border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Paperclip className="w-4 h-4" />
              <span>Joindre un fichier</span>
            </button>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-2 py-1 sm:px-4 smpy-2 _classe text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-2 py-1 sm:px-4 smpy-2 _classe bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Envoyer</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Messages;