import React from 'react';
import { Users, UserCheck, School, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Élèves', value: '1,247', icon: Users, color: 'blue', trend: '+5.2%' },
    { label: 'Enseignants', value: '89', icon: UserCheck, color: 'green', trend: '+2.1%' },
    { label: 'Classes', value: '42', icon: School, color: 'purple', trend: '+8.3%' },
    { label: 'Événements', value: '15', icon: Calendar, color: 'orange', trend: '-1.2%' },
  ];

  const recentActivities = [
    { action: 'Nouvel élève inscrit', user: 'Pierre Martin', time: 'Il y a 2 minutes' },
    { action: 'Note ajoutée', user: 'Mme Dupont', time: 'Il y a 15 minutes' },
    { action: 'Absence signalée', user: 'Julie Moreau', time: 'Il y a 1 heure' },
    { action: 'Paiement reçu', user: 'M. Bernard', time: 'Il y a 2 heures' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <div className="text-sm text-gray-500">
          Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.trend.startsWith('+');
          
          return (
            <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {isPositive ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend}
                </span>
                <span className="text-sm text-gray-500 ml-2">ce mois</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activités récentes */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Activités récentes</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Événements à venir */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Événements à venir</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Réunion parents-professeurs</p>
                <p className="text-xs text-gray-500">25 janvier 2025</p>
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Important</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Examens trimestriels</p>
                <p className="text-xs text-gray-500">2-6 février 2025</p>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Examen</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Sortie scolaire</p>
                <p className="text-xs text-gray-500">12 février 2025</p>
              </div>
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Sortie</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;