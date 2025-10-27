import React from 'react';

// Character Stats Display Component
export const StatsDisplay = ({ score, darkMode, hasCompletedAssessment, currentScene }) => {
  // Only show stats during story scenes or after assessment
  if (!hasCompletedAssessment || currentScene === 'loading' || currentScene === 'intro' || currentScene === 'assessment') return null;

  const stats = [
    { name: 'Empathy', value: score.empathy, icon: '❤️', color: 'text-pink-600' },
    { name: 'Wisdom', value: score.wisdom, icon: '🧠', color: 'text-blue-600' },
    { name: 'Compassion', value: score.compassion, icon: '🤝', color: 'text-green-600' },
    { name: 'Courage', value: score.courage, icon: '⚡', color: 'text-yellow-600' }
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-xl shadow-lg p-4 mb-4`}>
      <h3 className={`text-sm font-bold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-3 text-center`}>Your Character Development</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{stat.name}</div>
            <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className={`w-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2 mt-1`}>
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  stat.name === 'Empathy' ? 'bg-pink-600' :
                  stat.name === 'Wisdom' ? 'bg-blue-600' :
                  stat.name === 'Compassion' ? 'bg-green-600' :
                  'bg-yellow-600'
                }`}
                style={{ width: `${Math.min((stat.value / 15) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
