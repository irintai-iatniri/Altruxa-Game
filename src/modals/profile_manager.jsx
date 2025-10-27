import React from 'react';
import { UserCircle, Plus, Trash2 } from 'lucide-react';

export const ProfileManagerModal = ({
  showProfileManager,
  darkMode,
  newProfileName,
  setNewProfileName,
  createProfile,
  profiles,
  currentProfile,
  loadProfile,
  deleteProfile,
  setShowProfileManager
}) => {
  if (!showProfileManager) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6`}>
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center gap-2`}>
          <UserCircle className="w-8 h-8" />
          Profile Management
        </h2>

        <div className="mb-6">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-3`}>Create New Profile</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && newProfileName.trim() && createProfile(newProfileName)}
              placeholder="Enter profile name"
              className={`flex-1 px-4 py-2 border-2 rounded-lg focus:outline-none ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-purple-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
              }`}
            />
            <button
              onClick={() => newProfileName.trim() && createProfile(newProfileName)}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create
            </button>
          </div>
        </div>

        <div>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-3`}>
            Existing Profiles ({profiles.length})
          </h3>
          {profiles.length === 0 ? (
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-center py-8`}>
              No profiles yet. Create one to get started!
            </p>
          ) : (
            <div className="space-y-3">
              {profiles.map(profile => (
                <div
                  key={profile.id}
                  className={`p-4 rounded-lg border-2 ${
                    currentProfile?.id === profile.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : darkMode
                      ? 'border-gray-600 bg-gray-700'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {profile.name}
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Created: {new Date(profile.created).toLocaleDateString()}
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Last played: {new Date(profile.lastPlayed).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => loadProfile(profile)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete profile "${profile.name}"? This cannot be undone.`)) {
                            deleteProfile(profile.id);
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

        {currentProfile && (
          <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-600">
            <button
              onClick={() => setShowProfileManager(false)}
              className={`w-full px-4 py-2 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
