import React from 'react';

// View Journal Entries Component
export const ViewJournal = ({ journalEntries, darkMode }) => {
  const entries = Object.entries(journalEntries);
  if (entries.length === 0) {
    return (
      <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-8 rounded-xl text-center`}>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>No journal entries yet. Reflections will appear here as you make choices in Maya's Journey.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map(([sceneId, entry], index) => (
        <div key={sceneId} className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} p-5 rounded-xl border-2 shadow-sm`}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
              {index + 1}
            </div>
            <div className="flex-1">
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>Decision Point</div>
              <p className={`${darkMode ? 'text-gray-200' : 'text-gray-800'} leading-relaxed whitespace-pre-wrap`}>{entry}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
