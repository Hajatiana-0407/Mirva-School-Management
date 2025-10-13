import React, { useState } from 'react';
import { Calendar, Check, X, Clock, Filter, Search } from 'lucide-react';

const Attendance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2025-01-20');
  const [selectedClass, setSelectedClass] = useState('6ème A');

  const students = [
    { id: 1, nom: 'Martin', prenom: 'Pierre', status: 'present' },
    { id: 2, nom: 'Dubois', prenom: 'Sophie', status: 'absent' },
    { id: 3, nom: 'Moreau', prenom: 'Lucas', status: 'present' },
    { id: 4, nom: 'Bernard', prenom: 'Emma', status: 'retard' },
    { id: 5, nom: 'Petit', prenom: 'Hugo', status: 'present' },
    { id: 6, nom: 'Roux', prenom: 'Léa', status: 'absent' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'retard':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <Check className="w-4 h-4" />;
      case 'absent':
        return <X className="w-4 h-4" />;
      case 'retard':
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'present':
        return 'Présent';
      case 'absent':
        return 'Absent';
      case 'retard':
        return 'Retard';
      default:
        return 'Non défini';
    }
  };

  const handleStatusChange = (studentId: number, newStatus: string) => {
    console.log(`Changement de statut pour l'élève ${studentId}: ${newStatus}`);
  };

  const attendanceStats = {
    total: students.length,
    present: students.filter(s => s.status === 'present').length,
    absent: students.filter(s => s.status === 'absent').length,
    retard: students.filter(s => s.status === 'retard').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des présences</h1>
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="6ème A">6ème A</option>
            <option value="5ème B">5ème B</option>
            <option value="4ème C">4ème C</option>
          </select>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">{attendanceStats.total}</div>
          <div className="text-sm text-gray-600">Total élèves</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-green-600">{attendanceStats.present}</div>
          <div className="text-sm text-gray-600">Présents</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-red-600">{attendanceStats.absent}</div>
          <div className="text-sm text-gray-600">Absents</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-yellow-600">{attendanceStats.retard}</div>
          <div className="text-sm text-gray-600">Retards</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Présences - {selectedClass} - {new Date(selectedDate).toLocaleDateString('fr-FR')}
          </h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Enregistrer les présences
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Nom</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Prénom</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Statut</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{student.nom}</td>
                  <td className="py-3 px-4 text-gray-700">{student.prenom}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                      {getStatusIcon(student.status)}
                      <span>{getStatusLabel(student.status)}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleStatusChange(student.id, 'present')}
                        className={`p-1 rounded ${student.status === 'present' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-green-600'}`}
                        title="Présent"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(student.id, 'absent')}
                        className={`p-1 rounded ${student.status === 'absent' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-red-600'}`}
                        title="Absent"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(student.id, 'retard')}
                        className={`p-1 rounded ${student.status === 'retard' ? 'bg-yellow-100 text-yellow-600' : 'text-gray-400 hover:text-yellow-600'}`}
                        title="Retard"
                      >
                        <Clock className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;