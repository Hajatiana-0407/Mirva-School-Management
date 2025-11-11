import React, { useState } from 'react';
import { Plus, Calendar, Clock, Edit, Archive } from 'lucide-react';
import Modal from './Modal';

const Schedule: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState('2025-01-20');
  const [showModal, setShowModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState<any>(null);

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

  const schedule = {
    '6ème A': {
      'Lundi': { '08:00': 'Mathématiques', '09:00': 'Français', '10:00': 'Anglais', '14:00': 'Histoire', '15:00': 'SVT' },
      'Mardi': { '08:00': 'Français', '09:00': 'Mathématiques', '10:00': 'EPS', '14:00': 'Sciences', '15:00': 'Arts' },
      'Mercredi': { '08:00': 'Anglais', '09:00': 'Histoire', '10:00': 'Mathématiques' },
      'Jeudi': { '08:00': 'Sciences', '09:00': 'Français', '10:00': 'Géographie', '14:00': 'Anglais', '15:00': 'Musique' },
      'Vendredi': { '08:00': 'Mathématiques', '09:00': 'EPS', '10:00': 'Français', '14:00': 'Arts', '15:00': 'Étude' },
    }
  };

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      'Mathématiques': 'bg-blue-100 text-blue-800',
      'Français': 'bg-green-100 text-green-800',
      'Anglais': 'bg-yellow-100 text-yellow-800',
      'Histoire': 'bg-red-100 text-red-800',
      'Géographie': 'bg-red-100 text-red-800',
      'Sciences': 'bg-purple-100 text-purple-800',
      'SVT': 'bg-teal-100 text-teal-800',
      'EPS': 'bg-orange-100 text-orange-800',
      'Arts': 'bg-pink-100 text-pink-800',
      'Musique': 'bg-indigo-100 text-indigo-800',
      'Étude': 'bg-gray-100 text-gray-800',
    };
    return colors[subject] || 'bg-gray-100 text-gray-800';
  };

  const handleEditSlot = (day: string, time: string, subject: string) => {
    setEditingSlot({ day, time, subject });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSlot(null);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Emploi du temps</h1>
        <div className="flex items-center space-x-4">
          <select className="px-2 py-1 sm:px-4 sm:py-2 _classe border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="6ème A">6ème A</option>
            <option value="5ème B">5ème B</option>
            <option value="4ème C">4ème C</option>
          </select>
          <input
            type="week"
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="px-2 py-1 sm:px-4 sm:py-2 _classe border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white p-3 md:p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6 md:mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Semaine du {selectedWeek}</h2>
          <button className="bg-blue-600 text-white px-2 py-1 sm:px-4 sm:py-2 _classe rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Ajouter un cours</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-200 p-3 bg-gray-50 text-left font-medium text-gray-700">Heure</th>
                {days.map(day => (
                  <th key={day} className="border border-gray-200 p-3 bg-gray-50 text-center font-medium text-gray-700 min-w-[150px]">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(time => (
                <tr key={time} className="h-16">
                  <td className="border border-gray-200 p-3 font-medium text-gray-700 bg-gray-50">
                    {time}
                  </td>
                  {days.map(day => {
                    const subject = schedule['6ème A'][day]?.[time];
                    return (
                      <td key={`${day}-${time}`} className="border border-gray-200 p-1">
                        {subject ? (
                          <div
                            className={`p-2 rounded text-xs font-medium cursor-pointer hover:opacity-80 ${getSubjectColor(subject)}`}
                            onClick={() => handleEditSlot(day, time, subject)}
                          >
                            {subject}
                          </div>
                        ) : (
                          <div
                            className="p-2 rounded text-xs text-gray-400 hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleEditSlot(day, time, '')}
                          >
                            + Ajouter
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal pour ajouter/modifier un cours */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingSlot?.subject ? 'Modifier le cours' : 'Ajouter un cours'}
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jour</label>
              <input
                type="text"
                value={editingSlot?.day || ''}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
              <input
                type="text"
                value={editingSlot?.time || ''}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Matière</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Sélectionner une matière</option>
              <option value="Mathématiques">Mathématiques</option>
              <option value="Français">Français</option>
              <option value="Anglais">Anglais</option>
              <option value="Histoire">Histoire</option>
              <option value="Sciences">Sciences</option>
              <option value="EPS">EPS</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enseignant</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Sélectionner un enseignant</option>
              <option value="Mme Dupont">Mme Dupont</option>
              <option value="M. Leroy">M. Leroy</option>
              <option value="Mme Garcia">Mme Garcia</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salle</label>
            <input
              type="text"
              defaultValue=""
              placeholder="ex: A101"
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
              {editingSlot?.subject ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Schedule;