        {/* Journal Modal - renders on top of everything */}
        <JournalModalComponent
          isOpen={showJournal}
          journalEntry={tempJournalEntry}
          onTextChange={handleJournalTextChange}
          onSave={handleJournalSave}
          onSkip={handleJournalSkip}
          promptText={currentJournalPrompt}
          darkMode={darkMode}
        />