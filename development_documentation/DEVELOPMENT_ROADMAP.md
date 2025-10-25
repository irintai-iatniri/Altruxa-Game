# Altruxa Path Game - Development Roadmap & Technical Documentation

**Last Updated:** October 25, 2025  
**Version:** 1.5 (Stats Integration)  
**File:** `altruxa-path-game-enhanced.jsx`

---

## Table of Contents
1. [Incomplete Code & TODO Items](#incomplete-code--todo-items)
2. [Known Bugs](#known-bugs)
3. [Future Features (Planned)](#future-features-planned)
4. [Suggested Features (Ideas)](#suggested-features-ideas)
5. [Code Architecture Notes](#code-architecture-notes)
6. [Testing Checklist](#testing-checklist)

---

## Incomplete Code & TODO Items

### 🔴 HIGH PRIORITY

#### 1. **Disconnected Story Endings** 
**Location:** Lines 1900-1950 (approximate)
**Issue:** Some new story branches don't properly connect to endings
```javascript
// story_3_legal_pathway (line ~1836)
// story_3_recorded_conversation (line ~1844)
// story_4_long_game (line ~1852)
// story_3_public_advocate (line ~1859)
```
**Status:** These endings have `isStoryEnding: true` but no menu return or final reflection
**TODO:**
- [ ] Add "Return to Menu" button to all story endings
- [ ] Add final stat summary to each ending
- [ ] Connect endings to proper conclusion scene
- [ ] Test all story paths lead to complete endings

#### 2. **Missing End-Game Scenarios**
**Location:** Lines 1920-2400
**Issue:** Original "Final Scenarios" (scene1, scene2, etc.) might not connect properly to new branches
**TODO:**
- [ ] Verify all Maya's Journey endings properly transition
- [ ] Update transition text to acknowledge stat-gated paths
- [ ] Consider making final scenarios optional/bonus content

#### 3. **Stat Balance Needs Tuning**
**Location:** Lines 625-755 (new stat-gated choices)
**Issue:** Stat requirements might be too high for first playthrough
```javascript
// Current requirements:
requires: { wisdom: 7 }      // First gated choice
requires: { wisdom: 8, compassion: 6 }
requires: { wisdom: 9 }
requires: { wisdom: 10, empathy: 8 }
requires: { courage: 9, compassion: 8 }
```
**TODO:**
- [ ] Playtest to determine if stats reach these thresholds naturally
- [ ] Consider lowering initial requirements (5-6 range)
- [ ] Add more +2 and +3 stat gain choices earlier in story
- [ ] Create stat gain "cheat sheet" for testing

#### 4. **Assessment Score Conversion Formula**
**Location:** Lines 237-257
**Issue:** Conversion from -10/+10 assessment to 0-10 stats needs validation
```javascript
const initialStats = {
  empathy: Math.max(0, Math.round((normalized.goodEvil + normalized.selfishSelfless) / 2) + 5),
  wisdom: Math.max(0, Math.round((normalized.scrupulousUnscrupulous + normalized.goodEvil) / 2) + 5),
  compassion: Math.max(0, Math.round((normalized.selfishSelfless + normalized.goodEvil) / 2) + 5),
  courage: Math.max(0, Math.round((normalized.couragePrudence + normalized.scrupulousUnscrupulous) / 2) + 5)
};
```
**TODO:**
- [ ] Test edge cases (all negative assessment, all positive)
- [ ] Verify starting stats feel appropriate (currently 0-10 range)
- [ ] Consider adding assessment score display on compass view
- [ ] Document intended stat progression curve

### 🟡 MEDIUM PRIORITY

#### 5. **Incomplete Journal Integration**
**Location:** Lines 2657-2677 (journal trigger logic)
**Issue:** Journal prompts only trigger every 2 choices, might miss important moments
**TODO:**
- [ ] Add manual journal entry option at any time
- [ ] Create scene-specific journal prompts for major decisions
- [ ] Add journal reflection to final summary/endings
- [ ] Consider journal achievement badges

#### 6. **Stats Display Context-Awareness**
**Location:** Lines 164-185 (StatsDisplay component)
**Issue:** Stats display shows on all scenes, might be distracting during story moments
**TODO:**
- [ ] Add toggle to hide/show stats panel
- [ ] Consider condensed view during story scenes
- [ ] Highlight stats that just changed with glow effect
- [ ] Add tooltip explaining what each stat unlocks

#### 7. **Teaching Scenes Integration**
**Location:** Various `isTeaching: true` scenes
**Issue:** Teaching interludes exist but might not trigger at ideal moments
**TODO:**
- [ ] Review when teaching scenes appear in flow
- [ ] Add CRT teaching for stat-gated moments
- [ ] Create teaching scene about stat growth system
- [ ] Link teaching content to unlocked choices

#### 8. **Navigation History Edge Cases**
**Location:** Lines 62-85 (navigation functions)
**Issue:** Back/forward navigation with modal interrupts (journal) might break
**TODO:**
- [ ] Test navigation after journal entry
- [ ] Prevent navigation history pollution from modal opens
- [ ] Add navigation history size limit (prevent memory bloat)
- [ ] Consider adding "breadcrumb" navigation display

### 🟢 LOW PRIORITY

#### 9. **Moral Trajectory Chart Enhancements**
**Location:** Lines 2305-2400 (approximate - MoralTrajectoryChart component)
**Issue:** Chart is good but could show more insights
**TODO:**
- [ ] Add stat growth over time to chart
- [ ] Show locked choices missed due to low stats
- [ ] Compare player path to "optimal" paths
- [ ] Export chart as image

#### 10. **Accessibility Improvements**
**Location:** Throughout component
**TODO:**
- [ ] Add ARIA labels to all interactive elements
- [ ] Keyboard navigation for all choices
- [ ] Screen reader testing and optimization
- [ ] High contrast mode support
- [ ] Font size controls

---

## Known Bugs

### 🐛 CONFIRMED BUGS

#### Bug #1: Stat Change Notification Overlap
**Location:** Lines 186-207 (StatChangeNotification component)
**Description:** If multiple choices made rapidly, notifications can overlap
**Severity:** Low
**Reproduction:**
1. Make choice that changes stats
2. Quickly navigate back and make different choice
3. Notifications stack without clearing
**Fix Needed:** Add notification queue system or clear on navigation

#### Bug #2: LocalStorage Persistence After Reset
**Location:** Lines 50-60 (clearAssessment function)
**Description:** Clearing assessment sometimes doesn't clear all derived data
**Severity:** Medium
**Reproduction:**
1. Complete assessment
2. Play through story gaining stats
3. Retake assessment
4. Old stat gains might persist
**Fix Needed:** Clear score state when retaking assessment

#### Bug #3: Journal Modal Z-Index Issues
**Location:** Lines 2300-2400 (JournalModal component)
**Description:** Journal modal might appear behind notification in some browsers
**Severity:** Low
**Reproduction:** Browser-specific, mainly Safari
**Fix Needed:** Adjust z-index hierarchy, ensure modal is z-50+

#### Bug #4: Assessment Progress Not Updating
**Location:** Lines 2823-2850 (assessment rendering)
**Description:** Progress bar sometimes doesn't update until question is fully answered
**Severity:** Low
**Reproduction:** Click answer option quickly
**Fix Needed:** Ensure progress updates in handleAssessmentAnswer

### ⚠️ POTENTIAL BUGS (Needs Testing)

#### Potential Bug #1: Stats Overflow
**Description:** No maximum cap on stats - could grow indefinitely
**Location:** Lines 2680-2716 (makeChoice stat updates)
**Risk:** Medium
**TODO:** Add max stat value (15? 20?) and test

#### Potential Bug #2: Circular Navigation
**Description:** Some story branches might allow circular navigation creating infinite loops
**Location:** Various story scenes
**Risk:** Low
**TODO:** Map all story paths and verify no infinite loops

#### Potential Bug #3: Mobile Layout Breaking
**Description:** Stats panel might not render well on mobile (<375px width)
**Location:** Lines 164-185 (StatsDisplay)
**Risk:** Medium
**TODO:** Test on various mobile devices, add responsive breakpoints

#### Potential Bug #4: State Synchronization
**Description:** Multiple state updates in rapid succession might cause race conditions
**Location:** Lines 2645-2730 (makeChoice function)
**Risk:** Low
**TODO:** Consider using useReducer for complex state management

---

## Future Features (Planned)

### Phase 2: Enhanced Gameplay

#### Feature: Stat Decay System
**Priority:** High
**Description:** Stats decrease if you make choices contrary to that value
**Implementation Notes:**
- Add negative values to choice.values
- Show red downward arrows in stat notifications
- Cap minimum at 0 (or allow negative for "corruption" path?)
- Consider decay rate (lose 1 point per bad choice? Percentage?)

**Code Location:** Modify makeChoice function around line 2680
```javascript
// Proposed implementation
values: { 
  empathy: 2,    // gain
  wisdom: -1     // decay from unwise choice
}
```

#### Feature: Achievement System
**Priority:** Medium
**Description:** Award badges for various accomplishments
**Proposed Achievements:**
- "Altruxan Exemplar" - Complete story with all stats > 10
- "Wise Counsel" - Unlock all wisdom-gated choices
- "Courageous Heart" - Unlock all courage-gated choices
- "Perfect Balance" - All stats within 2 points of each other
- "The Long View" - Reach "Long Game" ending
- "Voice of Justice" - Reach "Public Advocate" ending
- "Inside Reformer" - Reach "Reformer" ending
- "Journal Keeper" - Write 10+ journal entries
- "Self Aware" - Retake assessment 3+ times
- "Every Path" - Complete all story branches

**Implementation:** Add achievements array to state, check on endings

#### Feature: Character Classes
**Priority:** Low
**Description:** Based on stat distribution, assign character class
**Proposed Classes:**
- "The Sage" - Wisdom dominant (Wis > 10, Wis > other stats by 3+)
- "The Empath" - Empathy dominant
- "The Champion" - Courage dominant
- "The Compassionate" - Compassion dominant
- "The Balanced" - All stats within 2 points
- "The Strategist" - Wisdom + Empathy high
- "The Warrior" - Courage + Compassion high

**Implementation:** Add class calculation function, display in summary

#### Feature: Multiple Story Arcs
**Priority:** Medium
**Description:** Add 2-3 more complete story scenarios beyond Maya's Journey
**Proposed Scenarios:**
1. "The Healer's Dilemma" - Medical ethics scenario
2. "The Teacher's Choice" - Education system challenges  
3. "The Activist's Path" - Community organizing scenario
4. "The Artist's Integrity" - Creative work vs. commercial pressure
5. "The Researcher's Ethics" - Scientific integrity scenario

**Implementation:** Add new story_arc_2, story_arc_3 scene trees

### Phase 3: Social & Persistence

#### Feature: Cloud Save System
**Priority:** High
**Description:** Save progress across devices
**Requirements:**
- User authentication (optional)
- Database backend (Firebase? Supabase?)
- Sync across devices
- Multiple save slots

**Technical Debt:** Currently only localStorage

#### Feature: Share Your Path
**Priority:** Medium
**Description:** Generate shareable character profile/summary
**Features:**
- Final stats visualization
- Key choices made
- Character class
- Unique URL to view (read-only)
- Twitter/social media share buttons
- Export as image

#### Feature: Compare Paths
**Priority:** Low
**Description:** See how others approached same scenarios
**Features:**
- Aggregate choice statistics ("85% chose to report")
- See friend's choices (opt-in)
- Explore alternate paths easily

### Phase 4: Educational Enhancement

#### Feature: Guided Tutorial Mode
**Priority:** Medium
**Description:** Optional walkthrough explaining mechanics
**Features:**
- Highlight UI elements on first run
- Explain stat system
- Show example of gated choice
- Can be skipped/disabled

#### Feature: CRT Deep Dives
**Priority:** Low  
**Description:** Expandable sections with deeper CRT theory
**Features:**
- Links from teaching scenes to full CRT explanations
- Glossary of terms
- Connection to published CRT materials
- Academic citations

#### Feature: Educator Mode
**Priority:** Low
**Description:** Tools for using game in educational settings
**Features:**
- Classroom discussion prompts
- Facilitator guide
- Student reflection questions
- Group comparison features

---

## Suggested Features (Ideas)

### Community-Requested Features

#### 1. Difficulty Settings
Adjust stat requirements for gated choices:
- **Beginner:** Requirements -2 (easier to unlock)
- **Normal:** Current requirements
- **Advanced:** Requirements +2 (emphasize mastery)
- **Altruxan Perfection:** Requirements +4 (very challenging)

#### 2. Time-Based Scenarios
Add urgency mechanic:
- Some choices have time limits
- Pressure affects decision-making
- Unlocks "Grace Under Pressure" achievements

#### 3. Relationship Tracking
Track relationships with story characters:
- Maya's coworkers
- Family members
- Legal team
- Journalists
- Relationship values affect available choices

#### 4. Moral Complexity Slider
Let player adjust how much moral nuance they want:
- **Simple:** Clear good/evil choices
- **Moderate:** Current system
- **Complex:** Add situational modifiers, trolley problems

#### 5. Custom Scenarios
Player-generated content:
- Scenario editor
- Community scenario sharing
- Voting on best scenarios
- Import/export scenario JSON

#### 6. Meditation/Reflection Modes
Brief mindfulness exercises between major decisions:
- Breathing prompts
- Value clarification questions
- Perspective-taking exercises

#### 7. Real-World Application
Connect to real ethical frameworks:
- Link choices to philosophical traditions
- Compare to religious ethical teachings
- Map to professional ethics codes

#### 8. Stats Forecast
Show potential stat gains before choosing:
- Hover over choice to see stat impact
- Optional feature (can disable for immersion)
- "Strategic mode" vs "Intuitive mode"

#### 9. Consequence Timeline
Visual map of how past choices affect current situation:
- Flow chart of decision tree
- Highlight critical decision points
- Show branching paths not taken

#### 10. Personal Ethics Statement
Generate custom ethics statement based on choices:
- AI-generated summary of your values
- Formatted as personal mission statement
- Can edit and save

---

## Code Architecture Notes

### Component Structure

```
AltruxaPathGame (Main Component)
├── State Management (Lines 5-20)
│   ├── Scene navigation
│   ├── Scores/stats
│   ├── Assessment data
│   ├── Journal entries
│   └── History tracking
│
├── Data Loading (Lines 22-37)
│   └── localStorage sync
│
├── Core Functions (Lines 39-258)
│   ├── Assessment handling
│   ├── Navigation logic
│   ├── Choice processing
│   └── Stats conversion
│
├── Sub-Components (Lines 92-207)
│   ├── NavigationBar
│   ├── StatsDisplay
│   ├── StatChangeNotification
│   ├── JournalModal
│   └── MoralTrajectoryChart
│
├── Scenarios Data (Lines 258-1900)
│   ├── Assessment questions
│   ├── Menu/navigation scenes
│   ├── Teaching scenes
│   ├── Story scenes (Maya's Journey)
│   └── Final scenarios
│
└── Render Logic (Lines 2500-3470)
    ├── Loading state
    ├── Special scene types
    ├── Standard choices
    └── Endings
```

### State Management Patterns

**Current Approach:** useState hooks (18 separate state variables)

**Considerations for Refactor:**
- Consider useReducer for complex state (scores, choices, history)
- Context API for deeply nested components (stats display)
- Consider state management library (Zustand, Redux) if expanding significantly

### Data Flow

```
Assessment → Scores → Stats → Story Choices → Updated Stats → Gated Choices → Endings
                                      ↓
                                Journal Entries
                                      ↓
                                Reflection
```

### Critical Functions

1. **submitAssessment()** (Line 215)
   - Processes all assessment answers
   - Normalizes scores to -10/+10
   - Converts to initial character stats
   - Sets up for story

2. **makeChoice()** (Line 2645)
   - Handles ALL player choices
   - Updates stats
   - Tracks story choices
   - Manages journal prompts
   - Navigates to next scene

3. **isChoiceAvailable()** (Line 2761)
   - Validates stat requirements
   - Determines which choices player can see
   - Critical for stat-gating system

### LocalStorage Schema

```javascript
// Current storage keys:
{
  "altruxaAssessment": {
    goodEvil: -10 to +10,
    selfishSelfless: -10 to +10,
    scrupulousUnscrupulous: -10 to +10,
    couragePrudence: -10 to +10
  },
  
  "altruxaJournal": {
    [sceneId]: "entry text",
    ...
  }
}

// Missing storage:
// - Current stats
// - Story progress
// - Unlocked achievements
// - Character class
```

### Performance Considerations

**Current:**
- All scenarios loaded in memory (~3500 lines)
- No code splitting
- No lazy loading

**If Expanding:**
- Consider lazy loading story arcs
- Split assessment/teaching/story into modules
- Implement virtual scrolling for long lists (journal view)

---

## Testing Checklist

### Functional Testing

#### Assessment Flow
- [ ] All 8 questions can be answered
- [ ] Progress bar updates correctly
- [ ] Can't submit until all answered
- [ ] Submit converts to proper starting stats
- [ ] Stats in expected range (0-10)
- [ ] Assessment saves to localStorage

#### Story Flow - Main Path
- [ ] Can navigate from intro → assessment → compass → story
- [ ] All story scenes have valid next scenes
- [ ] No dead ends in story tree
- [ ] Can reach at least one ending from any branch
- [ ] Back/forward navigation works
- [ ] Menu return works from any scene

#### Stats System
- [ ] Stats display shows correct values
- [ ] Stat changes trigger notifications
- [ ] Notifications display correct values
- [ ] Stats persist through navigation
- [ ] Stats affect choice availability correctly
- [ ] Locked choices show proper requirements

#### Gated Choices
- [ ] Cannot click locked choices
- [ ] Locked choices show requirements
- [ ] Requirements check all specified stats
- [ ] Can unlock choices by gaining stats
- [ ] High-stat playthrough reaches advanced endings

#### Journal System
- [ ] Journal prompts appear after 2 story choices
- [ ] Can write and save entries
- [ ] Entries persist in localStorage
- [ ] Can view journal from menu
- [ ] Journal entries show for correct scenes
- [ ] Can skip journal without breaking flow

### Edge Case Testing

- [ ] Rapid clicking doesn't break state
- [ ] Can retake assessment multiple times
- [ ] Clear assessment removes all data
- [ ] Browser refresh maintains state (where appropriate)
- [ ] Works with localStorage disabled (degrades gracefully?)
- [ ] Very long journal entries don't break layout

### Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Responsive Testing

- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Mobile Small (320x568)

### Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible
- [ ] No keyboard traps

---

## Development Priorities

### Immediate (Before Public Release)
1. Fix all disconnected story endings
2. Balance stat requirements
3. Test all story paths
4. Fix localStorage bugs
5. Basic mobile testing

### Short Term (v1.6)
1. Add stat decay system
2. Implement achievements
3. Add character classes
4. More comprehensive testing

### Medium Term (v2.0)
1. Second story arc
2. Cloud save system
3. Social sharing features
4. Tutorial mode

### Long Term (v3.0+)
1. Multiple story arcs
2. Community scenarios
3. Educator tools
4. Real-world applications

---

## Contributing Guidelines

### Code Style
- Use descriptive variable names
- Comment complex logic
- Group related functions
- Keep components under 100 lines where possible

### Adding New Choices
```javascript
{
  text: "Choice text",
  next: "next_scene_id",
  consequence: "What happens (for reflection)",
  alignment: "Moral classification",
  storyData: { 
    choice: "identifier", 
    moral: -3 to +3 
  },
  values: { 
    empathy: 0-3,
    wisdom: 0-3,
    compassion: 0-3,
    courage: 0-3
  },
  requires: {  // optional
    empathy: 5,
    wisdom: 7
  }
}
```

### Adding New Scenes
```javascript
scene_id: {
  title: "Scene Title",
  text: "Scene description",
  image: "🎭",
  isStoryChoice: true,  // or other scene type
  choices: [...]
}
```

### Testing New Features
1. Test happy path
2. Test edge cases
3. Test with localStorage disabled
4. Test on mobile
5. Test all navigation paths

---

## Contact & Support

**Developer:** Claude (Anthropic AI Assistant)  
**Original Concept:** Irintai (Cosmological Recursion Theory)  
**Framework:** Altruxa Philosophy

---

## Version History

**v1.5** (2025-10-25) - Stats Integration
- Added assessment → stats conversion
- Implemented stat-gated choices
- Added stat change notifications
- New story branches and endings
- Enhanced visual feedback

**v1.4** - Journal & Teachings
- Journal reflection system
- CRT teaching interludes
- Moral trajectory visualization

**v1.3** - Navigation Enhancement
- Back/forward navigation
- History tracking
- Menu system

**v1.2** - Maya's Journey Expansion
- Multiple story branches
- Consequence tracking
- Ending summaries

**v1.1** - Assessment System
- 8-question moral assessment
- Four-axis scoring
- Visual compass display

**v1.0** - Initial Release
- Basic scenario system
- Choice tracking
- Simple stat system

---

**Last Updated:** October 25, 2025
**Next Review Date:** November 1, 2025
