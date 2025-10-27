import React from 'react';
import { Save, FolderOpen, Upload, Download, Trash2 } from 'lucide-react';

export const SaveLoadModal = ({
  showSaveLoad,
  darkMode,
  saveLoadMode,
  newSaveName,
  setNewSaveName,
  saveGame,
  importSave,
  saves,
  loadGame,
  exportSave,
  deleteSave,
  setShowSaveLoad
}) => {
  if (!showSaveLoad) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6`}>
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center gap-2`}>
          {saveLoadMode === 'save' ? <Save className="w-8 h-8" /> : <FolderOpen className="w-8 h-8" />}
          {saveLoadMode === 'save' ? 'Save Game' : 'Load Game'}
        </h2>

        {saveLoadMode === 'save' && (
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-3`}>Create New Save</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSaveName}
                onChange={(e) => setNewSaveName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && newSaveName.trim() && saveGame(newSaveName)}
                placeholder="Enter save name"
                className={`flex-1 px-4 py-2 border-2 rounded-lg focus:outline-none ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                }`}
              />
              <button
                onClick={() => newSaveName.trim() && saveGame(newSaveName)}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save
              </button>
            </div>
          </div>
        )}

        {saveLoadMode === 'load' && (
          <div className="mb-6">
            <label className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors">
              <Upload className="w-5 h-5 mr-2" />
              Import Save File
              <input
                type="file"
                accept=".json"
                onChange={importSave}
                className="hidden"
              />
            </label>
          </div>
        )}

        <div>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-3`}>
            {saveLoadMode === 'save' ? 'Existing Saves' : 'Available Saves'} ({saves.length})
          </h3>
          {saves.length === 0 ? (
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-center py-8`}>
              {saveLoadMode === 'save' ? 'No saves yet.' : 'No saves available to load.'}
            </p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {saves.sort((a, b) => b.timestamp - a.timestamp).map(save => (
                <div
                  key={save.id}
                  className={`p-4 rounded-lg border-2 ${
                    darkMode
                      ? 'border-gray-600 bg-gray-700'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {save.name}
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {new Date(save.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {saveLoadMode === 'load' && (
                        <button
                          onClick={() => loadGame(save)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                          Load
                        </button>
                      )}
                      <button
                        onClick={() => exportSave(save)}
                        className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                        title="Export save file"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete save "${save.name}"?`)) {
                            deleteSave(save.id);
                          }
                        }}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-600">
          <button
            onClick={() => setShowSaveLoad(false)}
            className={`w-full px-4 py-2 rounded-lg transition-colors ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
