import React from 'react';
import { Home, ChevronLeft, ChevronRight, Download, Moon, Sun, Save, UserCircle, FolderOpen } from 'lucide-react';

// Navigation bar component
export const NavigationBar = ({
  currentScene,
  historyIndex,
  navigationHistory,
  goToMenu,
  goBack,
  goForward,
  currentProfile,
  switchProfile,
  setSaveLoadMode,
  setShowSaveLoad,
  journalEntries,
  exportJournal,
  darkMode,
  setDarkMode
}) => {
  if (currentScene === 'loading' || currentScene === 'intro' || currentScene === 'profile_select') return null;

  return (
    <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
      <div className="flex items-center gap-2">
        <button
          onClick={goToMenu}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Return to Main Menu (H key)"
        >
          <Home size={18} />
          <span className="hidden sm:inline">Menu</span>
        </button>

        <div className="flex gap-1">
          <button
            onClick={goBack}
            disabled={historyIndex <= 0}
            className="flex items-center gap-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Go Back (← key)"
          >
            <ChevronLeft size={18} />
            <span className="hidden sm:inline">Back</span>
          </button>

          <button
            onClick={goForward}
            disabled={historyIndex >= navigationHistory.length - 1}
            className="flex items-center gap-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Go Forward (→ key)"
          >
            <span className="hidden sm:inline">Forward</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {currentProfile && (
          <>
            <button
              onClick={switchProfile}
              className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              title="Switch Profile"
            >
              <UserCircle size={18} />
              <span className="text-sm font-medium hidden sm:inline">{currentProfile.name}</span>
            </button>

            <button
              onClick={() => { setSaveLoadMode('save'); setShowSaveLoad(true); }}
              className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              title="Save Game (Ctrl+S)"
            >
              <Save size={18} />
            </button>

            <button
              onClick={() => { setSaveLoadMode('load'); setShowSaveLoad(true); }}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              title="Load Game (Ctrl+L)"
            >
              <FolderOpen size={18} />
            </button>
          </>
        )}

        {Object.keys(journalEntries).length > 0 && (
          <button
            onClick={exportJournal}
            className="flex items-center gap-2 px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
            title="Export Journal"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Export</span>
          </button>
        )}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 ${darkMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-700 hover:bg-gray-800'} text-white rounded-lg transition-colors`}
          title="Toggle Dark Mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );
};
