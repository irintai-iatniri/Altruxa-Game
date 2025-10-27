import React from 'react';

// Stat Change Notification Component
export const StatChangeNotification = ({ statChanges }) => {
  if (statChanges.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 animate-fade-in">
      {statChanges.map((change, index) => (
        <div
          key={index}
          className="bg-white border-2 border-purple-500 rounded-lg shadow-lg p-3 flex items-center gap-3 animate-slide-in"
        >
          <span className="text-2xl">{change.icon}</span>
          <div>
            <div className="font-bold text-gray-800">{change.stat}</div>
            <div className={`text-sm ${change.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change.change > 0 ? '+' : ''}{change.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
