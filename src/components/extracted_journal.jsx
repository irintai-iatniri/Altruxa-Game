import React from 'react';

// Extracted Journal Modal Component - memoized to prevent re-renders
export const JournalModalComponent = React.memo(({ 
  isOpen,
  journalEntry,
  onTextChange,
  onSave,
  onSkip,
  promptText,
  darkMode 
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6`}>
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>📝 Reflection Journal</h2>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>{promptText}</p>
        
        <textarea
          value={journalEntry}
          onChange={onTextChange}
          className={`w-full h-40 p-4 border-2 rounded-lg focus:outline-none resize-none ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-purple-500 placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500 placeholder-gray-500'
          }`}
          placeholder="Write your thoughts here... What values guided your choice? What concerns did you have? How might this decision affect others?"
          autoFocus
        />
        
        <div className="mt-4 flex gap-3 justify-end">
          <button
            onClick={onSkip}
            type="button"
            className={`px-4 py-2 rounded-lg transition-colors ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            Skip
          </button>
          <button
            onClick={onSave}
            type="button"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Save Reflection
          </button>
        </div>
      </div>
    </div>
  );
});