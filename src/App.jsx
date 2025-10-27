import React, { useState, useEffect } from 'react';
import { Heart, Brain, Users, Sparkles, RotateCcw, Check, Home, ChevronLeft, ChevronRight, Download, Moon, Sun, Save, Upload, UserCircle, Plus, Trash2, FolderOpen } from 'lucide-react';

// Import scenarios
import coreScenes from './scenarios/core';
import mayasJourneyScenes from './scenarios/mayas_journey';
import bridgeScenes from './scenarios/bridge';

// Import assessment data and handlers
import { assessmentQuestions, createAssessmentHandlers } from './data/assesments';

// Import components
import { StatChangeNotification } from './components/stata_change_notify';
import { NavigationBar } from './components/navigation_bar';
import { StatsDisplay } from './components/character_stats_display';
import { MoralTrajectoryChart } from './components/moral_trajectory';
import { AssessmentHistory } from './components/assesment_history';
import { ViewJournal } from './components/view_journal';
import { JournalModalComponent } from './components/extracted_journal';

// Import modals
import { ProfileManagerModal } from './modals/profile_manager';
import { SaveLoadModal } from './modals/save_load';

const AltruxaPathGame = () => {
  const [currentScene, setCurrentScene] = useState('loading');
  const [score, setScore] = useState({ empathy: 0, wisdom: 0, compassion: 0, courage: 0 });
  const [choices, setChoices] = useState([]);
  const [showReflection, setShowReflection] = useState(false);
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [assessmentScores, setAssessmentScores] = useState(null);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);
  const [assessmentHistory, setAssessmentHistory] = useState([]);
  const [storyChoices, setStoryChoices] = useState([]);
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [journalEntries, setJournalEntries] = useState({});
  const [showJournal, setShowJournal] = useState(false);
  const [currentJournalPrompt, setCurrentJournalPrompt] = useState('');
  const [tempJournalEntry, setTempJournalEntry] = useState('');
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [statChanges, setStatChanges] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  
  // Profile system state
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [showProfileManager, setShowProfileManager] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  
  // Save/Load system state
  const [saves, setSaves] = useState([]);
  const [showSaveLoad, setShowSaveLoad] = useState(false);
  const [saveLoadMode, setSaveLoadMode] = useState('save');
  const [newSaveName, setNewSaveName] = useState('');

  // Define saveAssessmentToStorage before using it
  const saveAssessmentToStorage = (scores) => {
    const newEntry = {
      timestamp: Date.now(),
      scores: scores,
      answers: assessmentAnswers
    };

    const updatedHistory = [...assessmentHistory, newEntry];
    setAssessmentHistory(updatedHistory);
    localStorage.setItem('altruxaAssessmentHistory', JSON.stringify(updatedHistory));
    setHasCompletedAssessment(true);
  };

  // Load profiles and initialize
  // Combine all scenarios
  const allScenarios = { ...coreScenes, ...mayasJourneyScenes, ...bridgeScenes };
  const scene = allScenarios[currentScene];

  // Create assessment handlers
  const { handleAssessmentAnswer, calculateAssessment } = createAssessmentHandlers(
    assessmentAnswers,
    setAssessmentAnswers,
    setScore,
    setAssessmentScores,
    saveAssessmentToStorage,
    setCurrentScene
  );

  React.useEffect(() => {
    const storedProfiles = localStorage.getItem('altruxaProfiles');
    const storedCurrentProfile = localStorage.getItem('altruxaCurrentProfile');
    
    if (storedProfiles) {
      const profileList = JSON.parse(storedProfiles);
      setProfiles(profileList);
      
      if (storedCurrentProfile) {
        const profile = profileList.find(p => p.id === storedCurrentProfile);
        if (profile) {
          loadProfile(profile);
          return;
        }
      }
    }
    
    setShowProfileManager(true);
    setCurrentScene('profile_select');
  }, []);

  // Load stored data on mount
  React.useEffect(() => {
    const storedHistory = localStorage.getItem('altruxaAssessmentHistory');
    const storedJournal = localStorage.getItem('altruxaJournal');
    
    if (storedHistory) {
      const history = JSON.parse(storedHistory);
      setAssessmentHistory(history);
      if (history.length > 0) {
        // Set current scores to most recent assessment
        setAssessmentScores(history[history.length - 1].scores);
        setHasCompletedAssessment(true);
        setCurrentScene('menu');
      } else {
        setCurrentScene('intro');
      }
    } else {
      // Migrate old single assessment to history format
      const oldAssessment = localStorage.getItem('altruxaAssessment');
      if (oldAssessment) {
        const scores = JSON.parse(oldAssessment);
        const historyEntry = {
          timestamp: Date.now(),
          scores: scores,
          answers: {}
        };
        setAssessmentHistory([historyEntry]);
        setAssessmentScores(scores);
        setHasCompletedAssessment(true);
        localStorage.setItem('altruxaAssessmentHistory', JSON.stringify([historyEntry]));
        localStorage.removeItem('altruxaAssessment');
        setCurrentScene('menu');
      } else {
        setCurrentScene('intro');
      }
    }
    
    if (storedJournal) {
      setJournalEntries(JSON.parse(storedJournal));
    }
  }, []);

  // Keyboard Navigation
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      if (e.key === 'ArrowLeft' && historyIndex > 0) goBack();
      if (e.key === 'ArrowRight' && historyIndex < navigationHistory.length - 1) goForward();
      if (e.key === 'Escape') {
        if (showJournal) setShowJournal(false);
        if (showSaveLoad) setShowSaveLoad(false);
        if (showProfileManager && currentProfile) setShowProfileManager(false);
      }
      if ((e.key === 'h' || e.key === 'H') && currentScene !== 'loading' && currentScene !== 'intro' && currentScene !== 'profile_select') goToMenu();
      if ((e.key === 's' || e.key === 'S') && e.ctrlKey && currentProfile) {
        e.preventDefault();
        setSaveLoadMode('save');
        setShowSaveLoad(true);
      }
      if ((e.key === 'l' || e.key === 'L') && e.ctrlKey && currentProfile) {
        e.preventDefault();
        setSaveLoadMode('load');
        setShowSaveLoad(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [historyIndex, navigationHistory.length, showJournal, currentScene, showSaveLoad, showProfileManager, currentProfile]);

  // Profile Management Functions
  const saveToProfile = () => {
    if (!currentProfile) return;
    
    const gameState = {
      currentScene, score, choices, assessmentAnswers, assessmentScores,
      hasCompletedAssessment, assessmentHistory, storyChoices, journalEntries, darkMode
    };
    
    const updatedProfile = { ...currentProfile, lastPlayed: Date.now(), gameState };
    const updatedProfiles = profiles.map(p => p.id === currentProfile.id ? updatedProfile : p);
    
    setProfiles(updatedProfiles);
    setCurrentProfile(updatedProfile);
    localStorage.setItem('altruxaProfiles', JSON.stringify(updatedProfiles));
  };

  React.useEffect(() => {
    if (currentProfile && currentScene !== 'loading' && currentScene !== 'profile_select') {
      const timer = setTimeout(saveToProfile, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScene, score, storyChoices, journalEntries]);

  const createProfile = (name) => {
    const newProfile = {
      id: Date.now().toString(), name: name.trim(),
      created: Date.now(), lastPlayed: Date.now(), gameState: null
    };
    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    localStorage.setItem('altruxaProfiles', JSON.stringify(updatedProfiles));
    localStorage.setItem('altruxaCurrentProfile', newProfile.id);
    setCurrentProfile(newProfile);
    setShowProfileManager(false);
    setNewProfileName('');
    setCurrentScene('intro');
  };

  const loadProfile = (profile) => {
    setCurrentProfile(profile);
    localStorage.setItem('altruxaCurrentProfile', profile.id);
    if (profile.gameState) {
      const gs = profile.gameState;
      setCurrentScene(gs.currentScene);
      setScore(gs.score);
      setChoices(gs.choices);
      setAssessmentAnswers(gs.assessmentAnswers);
      setAssessmentScores(gs.assessmentScores);
      setHasCompletedAssessment(gs.hasCompletedAssessment);
      setAssessmentHistory(gs.assessmentHistory);
      setStoryChoices(gs.storyChoices);
      setJournalEntries(gs.journalEntries);
      setDarkMode(gs.darkMode || false);
    } else {
      setCurrentScene('intro');
    }
    setShowProfileManager(false);
    loadSavesForProfile(profile.id);
  };

  const deleteProfile = (profileId) => {
    const updatedProfiles = profiles.filter(p => p.id !== profileId);
    setProfiles(updatedProfiles);
    localStorage.setItem('altruxaProfiles', JSON.stringify(updatedProfiles));
    const allSaves = JSON.parse(localStorage.getItem('altruxaSaves') || '[]');
    localStorage.setItem('altruxaSaves', JSON.stringify(allSaves.filter(s => s.profileId !== profileId)));
    if (currentProfile && currentProfile.id === profileId) {
      setCurrentProfile(null);
      localStorage.removeItem('altruxaCurrentProfile');
      setShowProfileManager(true);
      setCurrentScene('profile_select');
    }
  };

  const switchProfile = () => { saveToProfile(); setShowProfileManager(true); };

  const loadSavesForProfile = (profileId) => {
    const allSaves = JSON.parse(localStorage.getItem('altruxaSaves') || '[]');
    setSaves(allSaves.filter(s => s.profileId === profileId));
  };

  const saveGame = (saveName) => {
    if (!currentProfile || !saveName.trim()) return;
    const saveData = {
      id: Date.now().toString(), profileId: currentProfile.id,
      name: saveName.trim(), timestamp: Date.now(),
      gameState: { currentScene, score, choices, assessmentAnswers, assessmentScores,
                   hasCompletedAssessment, assessmentHistory, storyChoices, journalEntries, darkMode }
    };
    const allSaves = JSON.parse(localStorage.getItem('altruxaSaves') || '[]');
    localStorage.setItem('altruxaSaves', JSON.stringify([...allSaves, saveData]));
    loadSavesForProfile(currentProfile.id);
    setNewSaveName('');
    setShowSaveLoad(false);
  };

  const loadGame = (saveData) => {
    const gs = saveData.gameState;
    setCurrentScene(gs.currentScene); setScore(gs.score); setChoices(gs.choices);
    setAssessmentAnswers(gs.assessmentAnswers); setAssessmentScores(gs.assessmentScores);
    setHasCompletedAssessment(gs.hasCompletedAssessment); setAssessmentHistory(gs.assessmentHistory);
    setStoryChoices(gs.storyChoices); setJournalEntries(gs.journalEntries);
    setDarkMode(gs.darkMode || false); setShowSaveLoad(false);
    setNavigationHistory([gs.currentScene]); setHistoryIndex(0);
  };

  const deleteSave = (saveId) => {
    const allSaves = JSON.parse(localStorage.getItem('altruxaSaves') || '[]');
    localStorage.setItem('altruxaSaves', JSON.stringify(allSaves.filter(s => s.id !== saveId)));
    if (currentProfile) loadSavesForProfile(currentProfile.id);
  };

  const exportSave = (saveData) => {
    const blob = new Blob([JSON.stringify(saveData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `altruxa-save-${saveData.name.replace(/\s+/g, '-')}-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importSave = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const saveData = JSON.parse(e.target.result);
        if (!saveData.gameState || !saveData.name) { alert('Invalid save file format'); return; }
        if (!currentProfile) { alert('Please select or create a profile first'); return; }
        const importedSave = {
          ...saveData, id: Date.now().toString(), profileId: currentProfile.id,
          name: `${saveData.name} (Imported)`, timestamp: Date.now()
        };
        const allSaves = JSON.parse(localStorage.getItem('altruxaSaves') || '[]');
        localStorage.setItem('altruxaSaves', JSON.stringify([...allSaves, importedSave]));
        loadSavesForProfile(currentProfile.id);
        alert('Save imported successfully!');
      } catch (error) { alert('Error importing save file: ' + error.message); }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const saveJournalEntry = (sceneId, entry) => {
    const newEntries = { ...journalEntries, [sceneId]: entry };
    setJournalEntries(newEntries);
    localStorage.setItem('altruxaJournal', JSON.stringify(newEntries));
  };

  const clearJournal = () => {
    localStorage.removeItem('altruxaJournal');
    setJournalEntries({});
  };

  const exportJournal = () => {
    const totalMoral = storyChoices.reduce((sum, c) => sum + (c.moral || 0), 0);
    let alignment = 'Exploring';
    if (totalMoral >= 4) alignment = 'Exemplary Altruxan';
    else if (totalMoral >= 2) alignment = 'Strong Altruxan';
    else if (totalMoral >= 0) alignment = 'Mixed Path';
    else if (totalMoral >= -2) alignment = 'Self-Oriented';
    else alignment = 'Malidoxian';

    const content = Object.entries(journalEntries)
      .map(([scene, entry]) => `=== ${scene} ===\n${entry}\n\n`)
      .join('---\n\n');
    
    const fullContent = `Altruxa Path - Personal Journal
Date: ${new Date().toLocaleDateString()}
Moral Alignment: ${alignment}
Total Moral Score: ${totalMoral > 0 ? '+' : ''}${totalMoral}

${'='.repeat(50)}

${content}

${'='.repeat(50)}

Based on Cosmological Recursion Theory and Altruxan Philosophy
Each choice matters. Each moment is an opportunity to reduce suffering.`;
    
    const blob = new Blob([fullContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `altruxa-journal-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAssessment = () => {
    // Don't clear history, just reset current assessment answers
    setAssessmentAnswers({});
  };

  const navigateToScene = (sceneName, addToHistory = true) => {
    if (addToHistory) {
      // Add current scene to history if moving forward
      const newHistory = navigationHistory.slice(0, historyIndex + 1);
      newHistory.push(currentScene);
      setNavigationHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
    setCurrentScene(sceneName);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentScene(navigationHistory[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < navigationHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentScene(navigationHistory[historyIndex + 1]);
    }
  };

  const goToMenu = () => {
    navigateToScene('menu', true);
  };

  // Redirect to menu if user has completed assessment and is at intro
  if (currentScene === 'intro' && hasCompletedAssessment) {
    setCurrentScene('menu');
    return null;
  }

  const makeChoice = (choice) => {
    // Handle retaking assessment
    if (choice.isRetake) {
      clearAssessment();
    }

    // Always track the choice
    setChoices([...choices, { scene: currentScene, choice: choice.text }]);
    
    // Track story choices with consequences
    if (choice.storyData) {
      const newChoice = {
        scene: currentScene,
        text: choice.text,
        consequence: choice.consequence,
        alignment: choice.alignment,
        moral: choice.storyData.moral
      };
      setStoryChoices([...storyChoices, newChoice]);
      
      // Prompt for journal entry after major decisions (every 2-3 choices)
      if (storyChoices.length > 0 && storyChoices.length % 2 === 0) {
        setCurrentJournalPrompt(`Reflect on your choice: "${choice.text}". What led you to this decision? How do you feel about it?`);
        setPendingNavigation(choice.next);
        setShowJournal(true);
        
        // Update scores before showing journal
        if (choice.values) {
          setScore({
            empathy: score.empathy + (choice.values.empathy || 0),
            wisdom: score.wisdom + (choice.values.wisdom || 0),
            compassion: score.compassion + (choice.values.compassion || 0),
            courage: score.courage + (choice.values.courage || 0)
          });
        }
        
        // Don't navigate yet - wait for journal to close
        return;
      }
    }
    
    if (choice.values) {
      // Track which stats are changing
      const changes = [];
      if (choice.values.empathy) changes.push({ stat: 'Empathy', change: choice.values.empathy, icon: '❤️' });
      if (choice.values.wisdom) changes.push({ stat: 'Wisdom', change: choice.values.wisdom, icon: '🧠' });
      if (choice.values.compassion) changes.push({ stat: 'Compassion', change: choice.values.compassion, icon: '🤝' });
      if (choice.values.courage) changes.push({ stat: 'Courage', change: choice.values.courage, icon: '⚡' });
      
      // Show stat changes briefly
      if (changes.length > 0) {
        setStatChanges(changes);
        setTimeout(() => setStatChanges([]), 3000);
      }
      
      setScore({
        empathy: score.empathy + (choice.values.empathy || 0),
        wisdom: score.wisdom + (choice.values.wisdom || 0),
        compassion: score.compassion + (choice.values.compassion || 0),
        courage: score.courage + (choice.values.courage || 0)
      });
    }

    if (choice.analysis) {
      setShowReflection(true);
      setTimeout(() => {
        setShowReflection(false);
        navigateToScene(choice.next);
      }, 6000);
    } else {
      navigateToScene(choice.next);
    }
  };

  const resetGame = () => {
    setCurrentScene(hasCompletedAssessment ? 'menu' : 'intro');
    setScore({ empathy: 0, wisdom: 0, compassion: 0, courage: 0 });
    setChoices([]);
    setStoryChoices([]);
    setShowReflection(false);
    // Keep assessment data when resetting the journey
  };

  // Check if a choice is available based on stat requirements
  const isChoiceAvailable = (choice) => {
    if (!choice.requires) return true;
    
    // Check all stat requirements
    if (choice.requires.empathy && score.empathy < choice.requires.empathy) return false;
    if (choice.requires.wisdom && score.wisdom < choice.requires.wisdom) return false;
    if (choice.requires.compassion && score.compassion < choice.requires.compassion) return false;
    if (choice.requires.courage && score.courage < choice.requires.courage) return false;
    
    return true;
  };

  const getScoreColor = (value) => {
    if (value >= 4) return 'text-green-600';
    if (value >= 2) return 'text-yellow-600';
    return 'text-gray-600';
  };

  if (showReflection) {
    const currentChoice = scene.choices.find(c => choices[choices.length - 1]?.choice === c.text);
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-purple-50 to-blue-50'}`}>
        <div className={`max-w-2xl w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-8`}>
          <div className="text-center">
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-500" />
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Reflection</h2>
            <p className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-700'} leading-relaxed`}>
              {currentChoice?.analysis}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in {
          from { 
            transform: translateX(100%);
            opacity: 0;
          }
          to { 
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
        
        {/* Stat Change Notifications */}
        <StatChangeNotification statChanges={statChanges} />
        
        <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 mb-6 transition-colors`}>
          <div className="flex items-center justify-between mb-4">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>The Altruxan Path</h1>
          </div>

          {/* Navigation Bar */}
          <NavigationBar
            currentScene={currentScene}
            historyIndex={historyIndex}
            navigationHistory={navigationHistory}
            goToMenu={goToMenu}
            goBack={goBack}
            goForward={goForward}
            currentProfile={currentProfile}
            switchProfile={switchProfile}
            setSaveLoadMode={setSaveLoadMode}
            setShowSaveLoad={setShowSaveLoad}
            journalEntries={journalEntries}
            exportJournal={exportJournal}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          {/* Character Stats Display */}
          <StatsDisplay score={score} darkMode={darkMode} hasCompletedAssessment={hasCompletedAssessment} currentScene={currentScene} />
        </div>

        {/* Scene Content */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8 transition-colors`}>
          <div className="text-6xl text-center mb-6">{scene.image}</div>
          
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4 text-center`}>
            {scene.title}
          </h2>
          
          {scene.isAssessment ? (
            <div className="space-y-6 max-w-3xl mx-auto">
              <p className={`text-center ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-6`}>{scene.text}</p>
              
              {/* Progress Indicator */}
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-white'} p-4 rounded-xl shadow-sm`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Progress</span>
                  <span className="text-sm font-semibold text-purple-600">
                    {Object.keys(assessmentAnswers).length} / {assessmentQuestions.length}
                  </span>
                </div>
                <div className={`w-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-3`}>
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(Object.keys(assessmentAnswers).length / assessmentQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {assessmentQuestions.map((q, idx) => {
                const selectedIndex = assessmentAnswers[q.id];
                const isAnswered = selectedIndex !== undefined;
                return (
                  <div key={q.id} className={`${darkMode ? 'bg-gradient-to-r from-gray-700 to-gray-600' : 'bg-gradient-to-r from-purple-50 to-blue-50'} p-6 rounded-xl transition-all ${
                    isAnswered ? 'ring-2 ring-green-400' : ''
                  }`}>
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        isAnswered 
                          ? 'bg-green-500 text-white' 
                          : `${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} border-2 border-gray-300`
                      }`}>
                        {isAnswered ? <Check className="w-5 h-5" /> : idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {q.question}
                        </div>
                        {isAnswered && (
                          <div className="mt-2 inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                            <Check className="w-4 h-4" />
                            Selected: Option {selectedIndex + 1}
                          </div>
                        )}
                      </div>
                    </div>
                  <div className="space-y-3">
                    {q.options.map((option, optIdx) => {
                      const isSelected = selectedIndex === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleAssessmentAnswer(q.id, optIdx)}
                          className={`w-full text-left p-4 rounded-lg transition-all relative ${
                            isSelected
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-2 border-purple-700 shadow-xl ring-2 ring-purple-300'
                              : darkMode 
                                ? 'bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 hover:border-purple-400 hover:shadow-md text-gray-200'
                                : 'bg-white hover:bg-purple-50 border-2 border-gray-200 hover:border-purple-300 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${
                              isSelected 
                                ? 'bg-white border-white text-purple-600' 
                                : darkMode
                                  ? 'border-gray-500 text-gray-400'
                                  : 'border-gray-400 text-gray-500'
                            }`}>
                              {isSelected ? <Check className="w-5 h-5" /> : optIdx + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-3">
                                <span className={`block ${isSelected ? 'font-bold text-lg' : ''}`}>
                                  {option.text}
                                </span>
                                {isSelected && (
                                  <span className="flex-shrink-0 bg-white text-purple-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                    ✓ Selected
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
              })}

              <div className="text-center mt-8">
                <button
                  onClick={calculateAssessment}
                  disabled={Object.keys(assessmentAnswers).length < assessmentQuestions.length}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                    Object.keys(assessmentAnswers).length < assessmentQuestions.length
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {Object.keys(assessmentAnswers).length < assessmentQuestions.length
                    ? `Answer All Questions (${Object.keys(assessmentAnswers).length}/${assessmentQuestions.length})`
                    : `See My Results ✨`
                  }
                </button>
                {Object.keys(assessmentAnswers).length === assessmentQuestions.length && (
                  <p className="text-sm text-green-600 mt-3 font-semibold animate-pulse">
                    All questions answered! Ready to see your moral compass.
                  </p>
                )}
              </div>
            </div>
          ) : scene.isTeaching ? (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-r from-purple-900/40 to-blue-900/40' : 'bg-gradient-to-r from-purple-100 to-blue-100'}`}>
                <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>{scene.teaching.principle}</h3>
                <p className={`leading-relaxed whitespace-pre-line ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{scene.teaching.explanation}</p>
              </div>
              
              <div className={`border-l-4 border-yellow-500 p-6 rounded-xl ${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
                <h4 className={`text-lg font-bold mb-2 ${darkMode ? 'text-yellow-300' : 'text-gray-800'}`}>💭 Reflection Questions</h4>
                <p className={`italic ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{scene.teaching.reflection}</p>
              </div>

              <div className={`p-5 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>
                <p className={`text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  These teachings are based on Cosmological Recursion Theory (CRT) and Altruxan philosophy. Each principle helps us understand how to reduce suffering and increase wellbeing across all dimensions of existence.
                </p>
              </div>
            </div>
          ) : scene.isJournalView ? (
            <div className="space-y-6 max-w-4xl mx-auto">
              <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                Your personal reflections on the moral choices you've made:
              </p>
              <ViewJournal journalEntries={journalEntries} darkMode={darkMode} />
            </div>
          ) : scene.isHistoryView ? (
            <div className="space-y-6 max-w-4xl mx-auto">
              <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                Track your moral development across all assessments:
              </p>
              <AssessmentHistory assessmentHistory={assessmentHistory} darkMode={darkMode} />
            </div>
          ) : scene.isMenu ? (
            <div className="space-y-4 max-w-2xl mx-auto">
              <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-8 text-lg`}>{scene.text}</p>
              {scene.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => makeChoice(choice)}
                  className={`w-full p-6 rounded-xl transition-all transform hover:scale-[1.02] border-2 text-left ${
                    darkMode
                      ? 'bg-gradient-to-r from-purple-900/40 to-blue-900/40 hover:from-purple-800/50 hover:to-blue-800/50 border-transparent hover:border-purple-500'
                      : 'bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 border-transparent hover:border-purple-200'
                  }`}
                >
                  <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} block mb-2`}>
                    {choice.text}
                  </span>
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                    {choice.text === "View My Moral Compass" && assessmentScores && "See your current position on the four moral dimensions"}
                    {choice.text === "View Progress History" && assessmentHistory.length > 0 && `Track your moral development across ${assessmentHistory.length} assessment${assessmentHistory.length > 1 ? 's' : ''}`}
                    {choice.text === "View Reflection Journal" && "Read your personal reflections on moral choices"}
                    {choice.text === "Learn Altruxan Philosophy" && "Review the Five Pillars, core values, and moral framework"}
                    {choice.text === "Retake Assessment" && "Update your moral profile with a fresh assessment"}
                    {choice.text === "Begin Maya's Story" && "Experience moral scenarios through a branching narrative"}
                  </span>
                </button>
              ))}
            </div>
          ) : scene.isRetakeConfirm ? (
            <div className="space-y-6 max-w-2xl mx-auto">
              <p className={`text-center ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-6 text-lg`}>{scene.text}</p>
              <div className={`border-l-4 border-green-500 p-4 rounded ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                <p className={darkMode ? 'text-gray-200' : 'text-gray-700'}>
                  <strong>Good to know:</strong> Your previous assessments will be saved in your Progress History, allowing you to track your moral development over time. Each new assessment adds to your journey record.
                </p>
              </div>
            </div>
          ) : scene.isAssessmentResults ? (
            <div className="space-y-6 max-w-3xl mx-auto">
              <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                Here's where you currently stand on the four dimensions of moral character:
              </p>

              {/* Good vs Evil Axis */}
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-r from-red-900/20 to-green-900/20' : 'bg-gradient-to-r from-red-50 to-green-50'}`}>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4 text-center`}>Evil ↔ Good</h3>
                <div className="relative h-12 bg-gradient-to-r from-red-500 via-gray-300 to-green-500 rounded-full">
                  <div 
                    className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 border-4 rounded-full shadow-lg ${darkMode ? 'bg-gray-700 border-white' : 'bg-white border-gray-800'}`}
                    style={{ left: `${5 + ((assessmentScores?.goodEvil || 0) + 10) * 4.5}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-red-700 font-semibold">Evil (-10)</span>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Neutral (0)</span>
                  <span className="text-green-700 font-semibold">Good (+10)</span>
                </div>
                <p className={`text-center mt-3 font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Your score: {assessmentScores?.goodEvil || 0}
                </p>
                <p className={`text-center mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {assessmentScores?.goodEvil >= 5 ? "You consistently choose actions that benefit others and reduce harm." :
                   assessmentScores?.goodEvil >= 0 ? "You balance personal needs with concern for others." :
                   "Consider how your choices impact others' wellbeing."}
                </p>
              </div>

              {/* Selfless vs Selfish Axis */}
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-r from-orange-900/20 to-blue-900/20' : 'bg-gradient-to-r from-orange-50 to-blue-50'}`}>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4 text-center`}>Selfish ↔ Selfless</h3>
                <div className="relative h-12 bg-gradient-to-r from-orange-500 via-gray-300 to-blue-500 rounded-full">
                  <div 
                    className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 border-4 rounded-full shadow-lg ${darkMode ? 'bg-gray-700 border-white' : 'bg-white border-gray-800'}`}
                    style={{ left: `${5 + ((assessmentScores?.selfishSelfless || 0) + 10) * 4.5}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-orange-700 font-semibold">Selfish (-10)</span>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Balanced (0)</span>
                  <span className="text-blue-700 font-semibold">Selfless (+10)</span>
                </div>
                <p className={`text-center mt-3 font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Your score: {assessmentScores?.selfishSelfless || 0}
                </p>
                <p className={`text-center mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {assessmentScores?.selfishSelfless >= 5 ? "You prioritize others' needs and act with genuine selflessness." :
                   assessmentScores?.selfishSelfless >= 0 ? "You balance self-care with consideration for others." :
                   "Remember: when we do for the other, it is the most good."}
                </p>
              </div>

              {/* Scrupulous vs Unscrupulous Axis */}
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-r from-purple-900/20 to-yellow-900/20' : 'bg-gradient-to-r from-purple-50 to-yellow-50'}`}>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4 text-center`}>Unscrupulous ↔ Scrupulous</h3>
                <div className="relative h-12 bg-gradient-to-r from-purple-500 via-gray-300 to-yellow-500 rounded-full">
                  <div 
                    className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 border-4 rounded-full shadow-lg ${darkMode ? 'bg-gray-700 border-white' : 'bg-white border-gray-800'}`}
                    style={{ left: `${5 + ((assessmentScores?.scrupulousUnscrupulous || 0) + 10) * 4.5}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-purple-700 font-semibold">Unscrupulous (-10)</span>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Flexible (0)</span>
                  <span className="text-yellow-700 font-semibold">Scrupulous (+10)</span>
                </div>
                <p className={`text-center mt-3 font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Your score: {assessmentScores?.scrupulousUnscrupulous || 0}
                </p>
                <p className={`text-center mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {assessmentScores?.scrupulousUnscrupulous >= 5 ? "You maintain strong ethical principles even when difficult." :
                   assessmentScores?.scrupulousUnscrupulous >= 0 ? "You generally follow ethical principles with some flexibility." :
                   "Integrity means aligning actions with values, even when costly."}
                </p>
              </div>

              {/* Courage vs Prudence Axis */}
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-r from-teal-900/20 to-rose-900/20' : 'bg-gradient-to-r from-teal-50 to-rose-50'}`}>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4 text-center`}>Prudent ↔ Courageous</h3>
                <div className="relative h-12 bg-gradient-to-r from-teal-500 via-gray-300 to-rose-500 rounded-full">
                  <div 
                    className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 border-4 rounded-full shadow-lg ${darkMode ? 'bg-gray-700 border-white' : 'bg-white border-gray-800'}`}
                    style={{ left: `${5 + ((assessmentScores?.couragePrudence || 0) + 10) * 4.5}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-teal-700 font-semibold">Prudent (-10)</span>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Balanced (0)</span>
                  <span className="text-rose-700 font-semibold">Courageous (+10)</span>
                </div>
                <p className={`text-center mt-3 font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Your score: {assessmentScores?.couragePrudence || 0}
                </p>
                <p className={`text-center mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {assessmentScores?.couragePrudence >= 5 ? "You take meaningful risks to reduce suffering and stand for what's right." :
                   assessmentScores?.couragePrudence >= 0 ? "You balance thoughtful caution with willingness to act." :
                   "Sometimes reducing suffering requires accepting personal risk."}
                </p>
              </div>

              <div className={`p-6 rounded-xl mt-6 ${darkMode ? 'bg-gradient-to-r from-purple-900/40 to-blue-900/40' : 'bg-gradient-to-r from-purple-100 to-blue-100'}`}>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-3 text-center`}>Understanding Your Profile</h3>
                <p className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} leading-relaxed`}>
                  This assessment shows your current moral tendencies, not your fixed identity. The Altruxan path is about growth—moving toward actions that benefit all and harm none, choosing the other over the self, maintaining integrity even when difficult, and finding the courage to reduce suffering even at personal cost.
                </p>
                <p className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} leading-relaxed mt-3`}>
                  {scene.isFirstTime 
                    ? "As you journey through the scenarios ahead, reflect on how your choices align with these dimensions. Each moment is an opportunity to practice moving up the moral spectrum."
                    : "You can return to view your compass at any time from the menu. Consider how your choices in the journey reflect these dimensions."}
                </p>
              </div>
            </div>
          ) : scene.isValuesPage ? (
            <div className="space-y-6 max-w-3xl mx-auto">
              {/* Five Pillars */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>🏛️</span> The Five Pillars of Altruxa
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <strong>1. Empathy:</strong> The capacity to understand and feel the experiences of others across all dimensions of consciousness.
                  </div>
                  <div>
                    <strong>2. Wisdom:</strong> Strategic understanding of how to reduce suffering effectively, considering consequences across time and systems.
                  </div>
                  <div>
                    <strong>3. Compassion:</strong> Active care for the wellbeing of all conscious beings, manifested through concrete action.
                  </div>
                  <div>
                    <strong>4. Courage:</strong> Willingness to accept risk and discomfort to reduce suffering, even when it costs us personally.
                  </div>
                  <div>
                    <strong>5. Integrity:</strong> Alignment between values and actions; living in accordance with what reduces suffering rather than what serves ego.
                  </div>
                </div>
              </div>

              {/* Core Values */}
              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>💎</span> Core Altruxan Values
                </h3>
                <div className="space-y-2 text-gray-700">
                  <div>• <strong>Harm Reduction:</strong> The primary metric of morality is reduction of suffering</div>
                  <div>• <strong>Dimensional Awareness:</strong> See beyond surface appearances to root causes</div>
                  <div>• <strong>Temporal Responsibility:</strong> Consider consequences across past, present, and future</div>
                  <div>• <strong>Universal Consideration:</strong> All conscious beings matter in moral calculation</div>
                  <div>• <strong>Systemic Thinking:</strong> Address patterns and structures, not just individual acts</div>
                  <div>• <strong>Honest Compassion:</strong> Truth-telling in service of wellbeing, not comfort</div>
                </div>
              </div>

              {/* Definitions of Good, Neutral, Evil */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>⚖️</span> Objective Moral Spectrum
                </h3>
                
                {/* Intent Section */}
                <div className="mb-4 p-4 bg-white rounded-lg border-l-4 border-yellow-500">
                  <div className="font-bold text-gray-800 mb-2">The Role of Intent:</div>
                  <div className="text-gray-700 space-y-2">
                    <div>Intent is a defining variable in moral action. <strong>When we do for the other, it is the most good.</strong> When we do for ourselves, it is the least good.</div>
                    <div className="italic">Optimal Altruxa: We do for the other, and through the help they receive, they lift both those who helped and those who need help—creating an upward spiral of mutual aid.</div>
                  </div>
                </div>

                {/* Moral Spectrum */}
                <div className="space-y-3 text-gray-700">
                  <div>
                    <div className="font-bold text-green-700 flex items-center gap-2">
                      <span className="text-2xl">✨</span> Good
                    </div>
                    <div className="ml-4 mt-1 bg-green-50 p-3 rounded">
                      <strong>Benefit all, harm none.</strong> Actions that create universal wellbeing without causing suffering to any conscious being. The highest moral achievement.
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-bold text-green-600 flex items-center gap-2">
                      <span className="text-2xl">🌟</span> Neutral Good
                    </div>
                    <div className="ml-4 mt-1 bg-green-50 p-3 rounded">
                      <strong>Benefit most, harm none.</strong> Actions that create widespread wellbeing without causing harm, though not everyone may benefit.
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-bold text-gray-600 flex items-center gap-2">
                      <span className="text-2xl">⚖️</span> Neutral
                    </div>
                    <div className="ml-4 mt-1 bg-gray-50 p-3 rounded">
                      <strong>Benefit some and harm some.</strong> Actions with mixed outcomes where benefits and harms are balanced. The midpoint where good and evil are in equilibrium.
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-bold text-orange-600 flex items-center gap-2">
                      <span className="text-2xl">⚠️</span> Neutral Evil
                    </div>
                    <div className="ml-4 mt-1 bg-orange-50 p-3 rounded">
                      <strong>Benefit some or one and harm some.</strong> Actions where the harm begins to outweigh benefits, or where narrow benefits come at the cost of others' suffering.
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-bold text-red-700 flex items-center gap-2">
                      <span className="text-2xl">💀</span> Evil (Malidox)
                    </div>
                    <div className="ml-4 mt-1 bg-red-50 p-3 rounded">
                      <strong>Benefit few or one and harm all others.</strong> Actions that serve narrow self-interest while causing widespread suffering. The concentration of benefit paired with distributed harm is the essence of Malidox.
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-purple-500">
                  <div className="font-semibold text-gray-800">Critical Understanding:</div>
                  <div className="mt-2 text-gray-700">Any action that does not benefit all and harm none is <strong>at best neutral</strong>. The Altruxan path constantly seeks to move actions up this spectrum—from evil toward neutral, from neutral toward good—by expanding the circle of who benefits and reducing the harm caused.</div>
                </div>
              </div>

              {/* Temporal Scales of Harm Mitigation */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>⏳</span> Harm Mitigation Across Temporal Scales
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <div className="font-semibold text-purple-700">Immediate (Present Moment):</div>
                    <div className="ml-4 mt-1">Address urgent suffering that requires immediate intervention. Sometimes immediate action prevents cascading harm.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-purple-700">Short-term (Days to Months):</div>
                    <div className="ml-4 mt-1">Consider how choices create patterns and habits that compound over weeks and months. Quick fixes may enable long-term harm.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-purple-700">Medium-term (Months to Years):</div>
                    <div className="ml-4 mt-1">Evaluate systemic impacts and relationship dynamics. Changes to structures and systems prevent recurring suffering.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-purple-700">Long-term (Years to Generations):</div>
                    <div className="ml-4 mt-1">Consider ripple effects across communities and time. Cultural and institutional changes affect countless future beings.</div>
                  </div>
                  <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-purple-500">
                    <div className="font-semibold">The Altruxan Challenge:</div>
                    <div className="mt-2">True wisdom requires holding all temporal scales simultaneously—acting with urgency when needed while considering long-term consequences. Sometimes the most compassionate immediate action differs from long-term harm reduction. Our task is to find paths that reduce suffering across all scales.</div>
                  </div>
                </div>
              </div>

              {/* Core Teaching */}
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span>🌟</span> Remember
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Altruxa is not about perfection—it's about practice. Every moment offers an opportunity to reduce suffering. Some situations have no perfect answer, only better and worse choices. The path forward emerges through empathy (understanding), wisdom (strategy), compassion (care), courage (action), and integrity (alignment).
                </p>
              </div>
            </div>
          ) : scene.isStoryChoice ? (
            <div className="space-y-6 max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {scene.text}
              </p>
              
              <div className="space-y-4">
                {scene.choices.map((choice, index) => {
                  const available = isChoiceAvailable(choice);
                  return (
                    <div key={index} className="relative">
                      <button
                        onClick={() => available && makeChoice(choice)}
                        disabled={!available}
                        className={`w-full text-left p-5 rounded-xl transition-all border-2 ${
                          available
                            ? 'bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transform hover:scale-[1.01] border-transparent hover:border-purple-300 shadow-sm hover:shadow-md cursor-pointer'
                            : 'bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`font-semibold ${available ? 'text-gray-800' : 'text-gray-500'}`}>
                            {choice.text}
                          </div>
                          {!available && choice.requires && (
                            <div className="ml-auto flex-shrink-0">
                              <span className="text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded-full whitespace-nowrap">
                                🔒 Locked
                              </span>
                            </div>
                          )}
                        </div>
                        {!available && choice.requires && (
                          <div className="mt-2 text-xs text-gray-600">
                            Requires: {
                              Object.entries(choice.requires)
                                .map(([stat, val]) => `${stat.charAt(0).toUpperCase() + stat.slice(1)} ${val}`)
                                .join(', ')
                            }
                          </div>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
              
              {storyChoices.length > 0 && (
                <div className="mt-8 p-4 bg-white rounded-xl border-2 border-gray-200">
                  <div className="text-sm font-semibold text-gray-700 mb-2">
                    Your choices so far: {storyChoices.length}
                  </div>
                  <div className="text-xs text-gray-500">
                    Each decision shapes Maya's path and the consequences that follow.
                  </div>
                </div>
              )}
            </div>
          ) : scene.isStoryEnding ? (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Maya's Journey: A Reflection</h3>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Here are the choices you made and their consequences. Each decision revealed your values in action.
                </p>
              </div>

              {/* Moral Trajectory Chart */}
              <MoralTrajectoryChart storyChoices={storyChoices} darkMode={darkMode} />

              {/* Story Choices Summary */}
              <div className="space-y-4">
                {storyChoices.map((choice, index) => {
                  const moralValue = choice.moral;
                  let bgClass, borderClass, textClass, badgeClass;
                  
                  if (darkMode) {
                    if (moralValue >= 2) {
                      bgClass = 'bg-green-900/30';
                      borderClass = 'border-green-500';
                      textClass = 'text-green-400';
                      badgeClass = 'bg-green-900/50 text-green-300';
                    } else if (moralValue >= 1) {
                      bgClass = 'bg-blue-900/30';
                      borderClass = 'border-blue-500';
                      textClass = 'text-blue-400';
                      badgeClass = 'bg-blue-900/50 text-blue-300';
                    } else if (moralValue === 0) {
                      bgClass = 'bg-gray-800/50';
                      borderClass = 'border-gray-500';
                      textClass = 'text-gray-400';
                      badgeClass = 'bg-gray-700 text-gray-300';
                    } else if (moralValue >= -1) {
                      bgClass = 'bg-orange-900/30';
                      borderClass = 'border-orange-500';
                      textClass = 'text-orange-400';
                      badgeClass = 'bg-orange-900/50 text-orange-300';
                    } else {
                      bgClass = 'bg-red-900/30';
                      borderClass = 'border-red-500';
                      textClass = 'text-red-400';
                      badgeClass = 'bg-red-900/50 text-red-300';
                    }
                  } else {
                    if (moralValue >= 2) {
                      bgClass = 'bg-gradient-to-r from-green-50 to-green-100';
                      borderClass = 'border-green-500';
                      textClass = 'text-green-700';
                      badgeClass = 'bg-green-200 text-green-800';
                    } else if (moralValue >= 1) {
                      bgClass = 'bg-gradient-to-r from-blue-50 to-blue-100';
                      borderClass = 'border-blue-500';
                      textClass = 'text-blue-700';
                      badgeClass = 'bg-blue-200 text-blue-800';
                    } else if (moralValue === 0) {
                      bgClass = 'bg-gradient-to-r from-gray-50 to-gray-100';
                      borderClass = 'border-gray-500';
                      textClass = 'text-gray-700';
                      badgeClass = 'bg-gray-200 text-gray-800';
                    } else if (moralValue >= -1) {
                      bgClass = 'bg-gradient-to-r from-orange-50 to-orange-100';
                      borderClass = 'border-orange-500';
                      textClass = 'text-orange-700';
                      badgeClass = 'bg-orange-200 text-orange-800';
                    } else {
                      bgClass = 'bg-gradient-to-r from-red-50 to-red-100';
                      borderClass = 'border-red-500';
                      textClass = 'text-red-700';
                      badgeClass = 'bg-red-200 text-red-800';
                    }
                  }
                  
                  return (
                    <div key={index} className={`${bgClass} p-5 rounded-xl border-l-4 ${borderClass}`}>
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${borderClass.replace('border', 'bg')} text-white flex items-center justify-center font-bold`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className={`font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
                            {choice.text}
                          </div>
                          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                            <strong>Consequence:</strong> {choice.consequence}
                          </div>
                          <div className="flex items-center gap-4 text-xs">
                            <span className={`font-semibold ${textClass}`}>
                              {choice.alignment}
                            </span>
                            <span className={`px-3 py-1 rounded-full ${badgeClass} font-medium`}>
                              Moral Score: {moralValue > 0 ? '+' : ''}{moralValue}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Overall Analysis */}
              <div className={`p-6 rounded-xl mt-8 ${darkMode ? 'bg-gradient-to-r from-purple-900/40 to-blue-900/40' : 'bg-gradient-to-r from-purple-100 to-blue-100'}`}>
                <h4 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Overall Moral Trajectory</h4>
                <div className="space-y-3">
                  <div>
                    <strong>Total Moral Score:</strong>{' '}
                    <span className={`text-2xl font-bold ${
                      storyChoices.reduce((sum, c) => sum + c.moral, 0) >= 4 ? 'text-green-600' :
                      storyChoices.reduce((sum, c) => sum + c.moral, 0) >= 0 ? 'text-blue-600' :
                      'text-red-600'
                    }`}>
                      {storyChoices.reduce((sum, c) => sum + c.moral, 0) > 0 ? '+' : ''}
                      {storyChoices.reduce((sum, c) => sum + c.moral, 0)}
                    </span>
                  </div>
                  <div className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} leading-relaxed`}>
                    {storyChoices.reduce((sum, c) => sum + c.moral, 0) >= 4 
                      ? "You demonstrated exceptional Altruxan practice. You consistently chose to reduce suffering even at personal cost, showing that true good requires both courage and wisdom."
                      : storyChoices.reduce((sum, c) => sum + c.moral, 0) >= 2
                      ? "You made several strong Altruxan choices. You showed willingness to act on your values, though there were moments where fear or expedience influenced your decisions."
                      : storyChoices.reduce((sum, c) => sum + c.moral, 0) >= 0
                      ? "Your path was mixed. You faced difficult choices and sometimes chose self-protection over harm reduction. Altruxa recognizes that courage is difficult to sustain."
                      : storyChoices.reduce((sum, c) => sum + c.moral, 0) >= -2
                      ? "Many of your choices prioritized self-interest over others' wellbeing. Consider: what would it take to choose differently? What fears held you back?"
                      : "Your path aligned more with Malidox than Altruxa. You chose complicity and self-preservation over justice. Reflection: Is this who you want to be?"}
                  </div>
                </div>
              </div>

              {/* Key Lessons */}
              <div className={`p-6 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>
                <h4 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Key Altruxan Lessons</h4>
                <div className={`space-y-3 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  <div>• <strong>Benefit All, Harm None:</strong> The highest good requires creative solutions that don't sacrifice anyone.</div>
                  <div>• <strong>Temporal Responsibility:</strong> Delay in action is itself a choice with consequences.</div>
                  <div>• <strong>Systemic Thinking:</strong> Individual integrity must confront systemic harm.</div>
                  <div>• <strong>Courage Over Comfort:</strong> The Altruxan path often requires personal risk.</div>
                  <div>• <strong>Intent Matters:</strong> Doing for others elevates the moral weight of our actions.</div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <p className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-700'} leading-relaxed mb-6 text-center max-w-2xl mx-auto`}>
                {scene.text}
              </p>

              {scene.reflection && (
                <div className={`${darkMode ? 'bg-purple-900/30 border-purple-400' : 'bg-purple-50 border-purple-500'} border-l-4 p-4 mb-6 rounded`}>
                  <p className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} italic`}>{scene.reflection}</p>
                </div>
              )}
            </>
          )}

          {/* Choices */}
          {!scene.isMenu && !scene.isAssessmentResults && !scene.isValuesPage && !scene.isStoryChoice && !scene.isStoryEnding && !scene.isTeaching && !scene.isJournalView && !scene.isHistoryView && scene.choices.length > 0 && (
            <div className="space-y-3">
              {scene.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => makeChoice(choice)}
                  className={`w-full text-left p-4 rounded-xl transition-all transform hover:scale-[1.02] border-2 ${
                    darkMode
                      ? 'bg-gradient-to-r from-purple-900/40 to-blue-900/40 hover:from-purple-800/50 hover:to-blue-800/50 border-transparent hover:border-purple-500'
                      : 'bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 border-transparent hover:border-purple-200'
                  }`}
                >
                  <span className={`${darkMode ? 'text-gray-200' : 'text-gray-800'} font-medium`}>{choice.text}</span>
                </button>
              ))}
            </div>
          )}

          {/* Ending Summary */}
          {scene.isEnding && (
            <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-gradient-to-r from-purple-900/40 to-blue-900/40' : 'bg-gradient-to-r from-purple-100 to-blue-100'}`}>
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Your Altruxan Development</h3>
              <div className={`space-y-3 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                <p>
                  <strong>Empathy ({score.empathy}):</strong> {score.empathy >= 3 ? "You consistently sought to understand deeper dimensions of each situation." : "Growing your ability to see beyond surface appearances will strengthen your practice."}
                </p>
                <p>
                  <strong>Wisdom ({score.wisdom}):</strong> {score.wisdom >= 3 ? "You demonstrated strategic thinking about how to reduce suffering effectively." : "Consider not just what feels right, but what actually reduces harm."}
                </p>
                <p>
                  <strong>Compassion ({score.compassion}):</strong> {score.compassion >= 2 ? "Your care for others' wellbeing guided your choices." : "Remember: Altruxa asks us to care deeply about reducing suffering."}
                </p>
                <p>
                  <strong>Courage ({score.courage}):</strong> {score.courage >= 2 ? "You showed willingness to take meaningful risks to reduce suffering." : "Sometimes Altruxan practice requires standing in difficult spaces between what's easy and what's right."}
                </p>
              </div>
              <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <p className={`${darkMode ? 'text-gray-200' : 'text-gray-800'} font-medium`}>Core Teaching:</p>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mt-2`}>
                  Objective Morality isn't about following rules—it's about developing the capacity to see situations dimensionally, understand root causes of suffering, and act with both empathy and wisdom to reduce harm. Each moment is practice.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className={`mt-6 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm space-y-1`}>
          <p>Based on Cosmological Recursion Theory and Altruxan Philosophy</p>
          <p>Each choice matters. Each moment is an opportunity to reduce suffering.</p>
          {currentProfile && (
            <p className="text-xs">Profile: {currentProfile.name} • Auto-save enabled</p>
          )}
          <p className="text-xs">
            Keyboard: H=Menu, ←=Back, →=Forward, Esc=Close, Ctrl+S=Save, Ctrl+L=Load
          </p>
        </div>
      </div>

    {/* Modals */}
    <ProfileManagerModal
        showProfileManager={showProfileManager}
        darkMode={darkMode}
        newProfileName={newProfileName}
        setNewProfileName={setNewProfileName}
        createProfile={createProfile}
        profiles={profiles}
        currentProfile={currentProfile}
        loadProfile={loadProfile}
        deleteProfile={deleteProfile}
        setShowProfileManager={setShowProfileManager}
    />

    <SaveLoadModal
        showSaveLoad={showSaveLoad}
        darkMode={darkMode}
        saveLoadMode={saveLoadMode}
        newSaveName={newSaveName}
        setNewSaveName={setNewSaveName}
        saveGame={saveGame}
        importSave={importSave}
        saves={saves}
        loadGame={loadGame}
        exportSave={exportSave}
        deleteSave={deleteSave}
        setShowSaveLoad={setShowSaveLoad}
    />

    <JournalModalComponent
        isOpen={showJournal}
        journalEntry={tempJournalEntry}
        onTextChange={setTempJournalEntry}
        onSave={() => {
          if (pendingNavigation) {
            saveJournalEntry(currentScene, tempJournalEntry);
            setTempJournalEntry('');
            setShowJournal(false);
            navigateToScene(pendingNavigation);
            setPendingNavigation(null);
          }
        }}
        onSkip={() => {
          if (pendingNavigation) {
            setTempJournalEntry('');
            setShowJournal(false);
            navigateToScene(pendingNavigation);
            setPendingNavigation(null);
          }
        }}
        promptText={currentJournalPrompt}
        darkMode={darkMode}
    />
    </>
  );
};

export default AltruxaPathGame;
