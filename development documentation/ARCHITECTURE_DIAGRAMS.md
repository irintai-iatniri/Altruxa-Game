# Altruxa Path Game - Architecture & Flow Diagrams

---

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     AltruxaPathGame Component                    │
│                                                                   │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────────┐  │
│  │   State     │  │  Components  │  │  Scenarios Data        │  │
│  │ Management  │  │              │  │                        │  │
│  │             │  │ - NavBar     │  │ - Assessment Q's       │  │
│  │ 18 useState │  │ - StatsPanel │  │ - Menu scenes          │  │
│  │ hooks       │  │ - Journal    │  │ - Teaching scenes      │  │
│  │             │  │ - Charts     │  │ - Story scenes (500+)  │  │
│  │             │  │ - Notifs     │  │ - Final scenarios      │  │
│  └─────────────┘  └──────────────┘  └────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Core Functions                         │   │
│  │                                                           │   │
│  │  • submitAssessment()     • makeChoice()                 │   │
│  │  • navigateToScene()      • isChoiceAvailable()          │   │
│  │  • convertToStats()       • saveJournal()                │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                  LocalStorage Layer                       │   │
│  │                                                           │   │
│  │  • altruxaAssessment (axis scores)                       │   │
│  │  • altruxaJournal (scene entries)                        │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Player Journey Flow

```
┌──────────────┐
│   Landing    │
│   (Intro)    │
└──────┬───────┘
       │
       ↓
┌──────────────────┐
│   Assessment     │ ← Can retake anytime from menu
│   (8 questions)  │
└──────┬───────────┘
       │
       ↓
  Convert Axes    
  to Initial     ────→  Empathy, Wisdom,
  Stats               Compassion, Courage
       │                (Range: 0-10)
       ↓
┌──────────────────┐
│   Main Menu      │ ←─────────┐
│                  │           │
│  • View Compass  │           │
│  • View Journal  │           │
│  • Learn Altruxa │           │
│  • Retake Test   │           │
│  • Start Story   │           │
└──────┬───────────┘           │
       │                       │
       ↓                       │
┌──────────────────┐           │
│  Maya's Journey  │           │
│   (Story Arcs)   │           │
└──────┬───────────┘           │
       │                       │
       ↓                       │
  Make Choices ────→ Stats Grow ────→ Unlock Gated Choices
       │                       
       │ (Every 2 choices)     
       ↓                       
  Journal Prompt              
       │                       
       ↓                       
  Continue Story              
       │                       
       ↓                       
   Reach Ending               
       │                       
       └───────────────────────┘
```

---

## Data Flow: Assessment to Stats

```
Assessment Questions (8)
          ↓
Each Answer = Option (0-3)
          ↓
Each Option has scores:
  {
    goodEvil: -3 to +3,
    selfishSelfless: -3 to +3,
    scrupulousUnscrupulous: -3 to +3,
    couragePrudence: -3 to +3
  }
          ↓
Sum all scores per axis
          ↓
Normalize to -10 to +10 range
  (divide by maxPossible * 10)
          ↓
╔══════════════════════════════╗
║   Conversion to Stats        ║
╠══════════════════════════════╣
║ Empathy = (GoodEvil +        ║
║            Selfless) / 2 + 5 ║
║                              ║
║ Wisdom = (Scrupulous +       ║
║           GoodEvil) / 2 + 5  ║
║                              ║
║ Compassion = (Selfless +     ║
║               GoodEvil) / 2+5║
║                              ║
║ Courage = (CouragePrudence + ║
║            Scrupulous) / 2+5 ║
╚══════════════════════════════╝
          ↓
Initial Character Stats (0-10)
          ↓
   Saved to state
   (NOT to localStorage yet!)
```

---

## Story Choice Flow

```
┌──────────────────────────┐
│  Player Views Scene      │
└─────────┬────────────────┘
          │
          ↓
    ╔═══════════════╗
    ║ Filter Choices║
    ║ by Requirements║
    ╚═══════════════╝
          │
    ┌─────┴─────────────────┐
    │                       │
    ↓                       ↓
Available           Locked (show 🔒)
Choices             with requirements
    │                       
    │                       
    ↓                       
Player Clicks Choice        
    │                       
    ↓                       
┌──────────────────────────┐
│   makeChoice()           │
│                          │
│  1. Track choice         │
│  2. Check for storyData  │
│  3. Update stats         │
│  4. Show notifications   │
│  5. Journal check?       │
│  6. Navigate to next     │
└──────────────────────────┘
    │
    ├─── Stats Change? ────→ Show Notification (3s)
    │
    ├─── Journal Time? ────→ Open Modal ────→ Save Entry
    │                             │
    │                             ↓
    └─────────────────────→ Navigate to Next Scene
```

---

## Stat-Gating System

```
Story Choice Definition:
{
  text: "Option text",
  next: "next_scene",
  values: {                    ← Stats gained if chosen
    wisdom: +2,
    empathy: +1
  },
  requires: {                  ← Stats needed to see/choose
    wisdom: 7,
    compassion: 5
  }
}
          │
          ↓
    ╔═══════════════════════╗
    ║ isChoiceAvailable()   ║
    ╠═══════════════════════╣
    ║ For each requirement: ║
    ║   if player stat <    ║
    ║      required stat    ║
    ║   → return false      ║
    ║                       ║
    ║ All checks pass?      ║
    ║   → return true       ║
    ╚═══════════════════════╝
          │
    ┌─────┴──────┐
    ↓            ↓
Available    Locked
Show as      Show with 🔒
clickable    and requirements
```

---

## Current Stat Gates in Story

```
Maya's Journey Story Tree:

story_intro
     ↓
story_1 (Day 1: The Discovery)
     ↓
[4 paths based on initial choice]
     ↓
story_1d (Day 8: Preparing for Battle)
     ↓
     ├─→ Standard choice (no gate)
     ├─→ Standard choice (no gate)  
     ├─→ Standard choice (no gate)
     └─→ GATED: "Seek mentor" ───→ Requires Wisdom ≥ 7
              ↓
         story_1e_mentor (Day 9)
              ↓
              ├─→ "Accept coalition help"
              ├─→ "Proceed alone"
              └─→ GATED: "Use mentor's network anonymously"
                   └─→ Requires Wisdom ≥ 8 AND Compassion ≥ 6
                        ↓
                   story_2_path_g_anonymous_network
                        ↓
                        ├─→ "Transition to ethical company"
                        ├─→ GATED: "Stay embedded long-term"
                        │    └─→ Requires Wisdom ≥ 10 AND Empathy ≥ 8
                        └─→ GATED: "Become public advocate"
                             └─→ Requires Courage ≥ 9 AND Compassion ≥ 8

story_2_path_f_strategic
     ↓
     ├─→ "Answer CEO call"
     ├─→ "Let lawyer handle"
     └─→ GATED: "Record conversation"
          └─→ Requires Wisdom ≥ 9
```

---

## Component Hierarchy

```
AltruxaPathGame
│
├─── <style> (CSS animations)
│
├─── JournalModal
│    └─── Textarea & Save/Cancel buttons
│
├─── StatChangeNotification (fixed position)
│    └─── Array of change notifications
│
├─── Container (max-w-4xl)
     │
     ├─── Header Card
     │    ├─── Title
     │    ├─── NavigationBar
     │    │    ├─── Menu Button
     │    │    └─── Back/Forward Buttons
     │    │
     │    └─── StatsDisplay
     │         └─── 4 Stat Cards (grid)
     │              ├─── Icon
     │              ├─── Name
     │              ├─── Value
     │              └─── Progress Bar
     │
     └─── Scene Content Card
          │
          ├─── Scene Icon (emoji)
          ├─── Scene Title
          │
          ├─── [Conditional Rendering]
          │    ├─── Assessment View
          │    ├─── Assessment Results View
          │    ├─── Values/Teaching View
          │    ├─── Story Choice View
          │    ├─── Story Ending View
          │    ├─── Journal View
          │    └─── Standard Scene View
          │
          └─── Choice Buttons
               └─── [Filtered by isChoiceAvailable()]
```

---

## State Management Map

```
STATE VARIABLES (18 total):

Navigation State:
├─── currentScene: string          (current scene ID)
├─── navigationHistory: string[]   (scene history for back/forward)
└─── historyIndex: number          (position in history)

Score/Stats State:
├─── score: object                 (empathy, wisdom, compassion, courage)
├─── assessmentScores: object      (goodEvil, selfishSelfless, etc.)
└─── assessmentAnswers: object     (questionId → optionIndex)

Progress State:
├─── choices: array                (all choices made)
├─── storyChoices: array           (story-specific choices with data)
└─── hasCompletedAssessment: bool  (flags first-time user)

Journal State:
├─── journalEntries: object        (sceneId → entry text)
├─── showJournal: bool             (modal visibility)
├─── currentJournalPrompt: string  (prompt text)
├─── tempJournalEntry: string      (working entry)
└─── pendingNavigation: string     (where to go after journal)

UI State:
├─── showReflection: bool          (reflection modal)
└─── statChanges: array            (recent changes for notifications)

LocalStorage Keys:
├─── altruxaAssessment             (stores assessmentScores)
└─── altruxaJournal                (stores journalEntries)
```

---

## Critical Functions Call Flow

### makeChoice() Execution Flow

```
makeChoice(choice)
     │
     ├─→ [1] Handle retake assessment special case
     │        if (choice.isRetake) → clearAssessment()
     │
     ├─→ [2] Track choice in history
     │        choices.push({ scene, choice })
     │
     ├─→ [3] Handle story data
     │        if (choice.storyData)
     │          └─→ storyChoices.push(...)
     │          └─→ Check if journal time (every 2 choices)
     │               └─→ if yes:
     │                    - setShowJournal(true)
     │                    - setPendingNavigation()
     │                    - return (wait for journal)
     │
     ├─→ [4] Update stats
     │        if (choice.values)
     │          ├─→ Build changes array
     │          ├─→ setStatChanges(changes) → triggers notification
     │          └─→ setScore(newScores)
     │
     ├─→ [5] Handle reflection
     │        if (choice.analysis)
     │          └─→ showReflection for 6s, then navigate
     │
     └─→ [6] Navigate to next scene
              navigateToScene(choice.next)
```

### Assessment Submission Flow

```
submitAssessment()
     │
     ├─→ [1] Initialize score totals
     │        { goodEvil: 0, selfishSelfless: 0, ... }
     │
     ├─→ [2] Loop through all answers
     │        For each questionId → optionIndex:
     │          └─→ Get question and selected option
     │          └─→ Add option.scores to totals
     │
     ├─→ [3] Normalize to -10/+10 scale
     │        normalized = (total / maxPossible) * 10
     │
     ├─→ [4] Convert axes to character stats
     │        empathy = (goodEvil + selfishSelfless) / 2 + 5
     │        wisdom = (scrupulous + goodEvil) / 2 + 5
     │        compassion = (selfishSelfless + goodEvil) / 2 + 5
     │        courage = (couragePrudence + scrupulous) / 2 + 5
     │
     ├─→ [5] Update state
     │        setScore(characterStats)
     │        setAssessmentScores(normalizedAxes)
     │
     ├─→ [6] Persist to localStorage
     │        localStorage.set('altruxaAssessment', normalizedAxes)
     │
     └─→ [7] Navigate to results
              setCurrentScene('assessment_results')
```

---

## Scene Type Rendering Logic

```
if (showReflection)
  └─→ Render reflection modal (6s auto-close)

else if (showJournal)
  └─→ Render journal modal (stays until saved/canceled)

else
  └─→ Render main scene based on type:
      
      if (scene.isAssessment)
        └─→ Show 8 questions with progress bar
        
      else if (scene.isAssessmentResults)
        └─→ Show 4 axis sliders + explanations
        
      else if (scene.isValuesPage)
        └─→ Show Altruxan philosophy teaching
        
      else if (scene.isMenu)
        └─→ Show menu options
        
      else if (scene.isStoryChoice)
        └─→ Show filtered choices (gated by stats)
        
      else if (scene.isStoryEnding)
        └─→ Show choice summary + moral analysis
        
      else if (scene.isTeaching)
        └─→ Show CRT teaching content
        
      else if (scene.isJournalView)
        └─→ Show all saved journal entries
        
      else
        └─→ Show standard scene with choices
```

---

## File Structure Breakdown

```
altruxa-path-game-enhanced.jsx (3,470 lines)

├─── Lines 1-20:      Imports & State Setup
├─── Lines 22-60:     localStorage & Persistence
├─── Lines 62-90:     Navigation Functions
├─── Lines 92-258:    Component Definitions
│    ├─── NavigationBar (Lines 92-129)
│    ├─── StatsDisplay (Lines 164-185)
│    └─── StatChangeNotification (Lines 186-207)
│
├─── Lines 258-1900:  Scenarios Data
│    ├─── Assessment Questions (Lines 131-215)
│    ├─── Menu Scenes (Lines 272-370)
│    ├─── Assessment Results (Lines 390-397)
│    ├─── Values/Teaching (Lines 399-405)
│    ├─── Maya's Journey (Lines 407-1900)
│    │    ├─── Intro & Day 1 (Lines 407-456)
│    │    ├─── Mid-story branches (Lines 457-800)
│    │    ├─── NEW stat-gated paths (Lines 625-755)
│    │    └─── Endings (Lines 1800-1900)
│    │
│    └─── Final Scenarios (Lines 1920-2400)
│
├─── Lines 2500-2800: Core Game Logic
│    ├─── submitAssessment() (Line 215)
│    ├─── makeChoice() (Line 2645)
│    ├─── isChoiceAvailable() (Line 2761)
│    └─── Helper functions
│
└─── Lines 2800-3470: Render Logic
     ├─── Style definitions (Lines 2758-2780)
     ├─── Scene rendering (Lines 2800-3400)
     └─── Choice rendering (Lines 3100-3300)
```

---

## LocalStorage Data Structure

```javascript
// altruxaAssessment
{
  "goodEvil": -5,              // -10 to +10
  "selfishSelfless": 3,        // -10 to +10
  "scrupulousUnscrupulous": 7, // -10 to +10
  "couragePrudence": 2         // -10 to +10
}

// altruxaJournal
{
  "story_1": "I chose to document everything because...",
  "story_1c": "Standing firm was hard but necessary because...",
  "story_2_path_f": "The coalition approach felt wise..."
}

// NOT YET STORED (but could be):
{
  "currentStats": {
    "empathy": 8,
    "wisdom": 10,
    "compassion": 7,
    "courage": 6
  },
  "currentProgress": {
    "currentScene": "story_2_path_f_strategic",
    "choiceCount": 12,
    "storyBranch": "mentor_coalition"
  },
  "achievements": [
    "first_gated_choice",
    "wisdom_seeker",
    "journal_keeper"
  ]
}
```

---

## Performance Considerations

### Current Performance Characteristics:

```
Initial Load:
├─── Parse full component (~3500 lines)    → ~50-100ms
├─── Initialize 18 state variables          → ~10ms
├─── Read from localStorage (2 keys)        → ~5ms
└─── First render                           → ~50ms
     TOTAL: ~100-150ms

Per Choice/Navigation:
├─── makeChoice() execution                 → ~5ms
├─── State updates (3-5 setState calls)     → ~10ms
├─── Re-render triggered                    → ~20-40ms
├─── Optional: Show notification            → ~5ms
└─── Optional: Open journal modal           → ~30ms
     TOTAL: ~40-90ms per interaction

Memory Usage:
├─── Component code in memory               → ~500KB
├─── Scenarios data object                  → ~200KB
├─── State variables                        → ~10KB
├─── DOM nodes                              → ~50KB
└─── Event listeners                        → ~5KB
     TOTAL: ~750KB-1MB
```

### Bottlenecks (if scaling up):

1. **All scenarios in memory** - Currently fine, but 10x content = issues
2. **No code splitting** - Full load upfront
3. **Multiple re-renders** - Several setState calls per choice
4. **No memoization** - Components re-render unnecessarily

---

## Testing Decision Tree

```
                     New Feature/Fix
                           │
                           ↓
                Does it affect stats?
                    ╱          ╲
                  YES          NO
                  ↓             ↓
         Test all gated    Test standard
         choices work      navigation
                  ↓             ↓
         Test stat         Test scene
         requirements      transitions
         still reachable        │
                  ↓             ↓
              Does it change scenes?
                    ╱          ╲
                  YES          NO
                  ↓             ↓
         Test all paths    Test UI
         to endings        only
                  ↓             ↓
         Test back/        Test
         forward nav       responsiveness
                  ↓             ↓
              Does it use localStorage?
                    ╱          ╲
                  YES          NO
                  ↓             ↓
         Test save/        Skip
         load cycle        persistence
         Clear cache       tests
                  ↓             ↓
         Test mobile   →  Test mobile
                  ↓             ↓
         ┌─────────────────────┐
         │    Ship it! 🚀      │
         └─────────────────────┘
```

---

This architecture documentation should help understand how all the pieces fit together!
