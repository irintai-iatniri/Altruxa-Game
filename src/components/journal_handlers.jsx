  // Handlers for journal modal
  const handleJournalTextChange = React.useCallback((e) => {
    setTempJournalEntry(e.target.value);
  }, []);

  const handleJournalSave = React.useCallback(() => {
    if (tempJournalEntry.trim()) {
      saveJournalEntry(currentScene, tempJournalEntry);
    }
    setShowJournal(false);
    setTempJournalEntry('');
    
    if (pendingNavigation) {
      navigateToScene(pendingNavigation);
      setPendingNavigation(null);
    }
  }, [tempJournalEntry, currentScene, pendingNavigation]);

  const handleJournalSkip = React.useCallback(() => {
    setShowJournal(false);
    setTempJournalEntry('');
    
    if (pendingNavigation) {
      navigateToScene(pendingNavigation);
      setPendingNavigation(null);
    }
  }, [pendingNavigation]);