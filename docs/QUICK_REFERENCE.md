# 🚨 IMMEDIATE ACTION ITEMS - Quick Reference

## Critical Issues to Fix Before Next Playthrough

### 1. ⚠️ INCOMPLETE STORY ENDINGS (HIGH PRIORITY)
**Problem:** 5 new endings don't have proper closure
**Files:** Lines 1836-1870 in altruxa-path-game-enhanced.jsx

**Endings Missing Components:**
- `story_3_legal_pathway`
- `story_3_recorded_conversation`  
- `story_4_long_game`
- `story_3_public_advocate`
- `story_ending_reformer`

**What They Need:**
```javascript
choices: [
  { 
    text: "Return to Main Menu", 
    next: "menu", 
    values: {} 
  },
  {
    text: "View Your Journey",
    next: "story_ending",  // Or create new reflection scene
    values: {}
  }
]
```

**Quick Fix (10 minutes):**
Add this to each ending scene that has `choices: []`

---

### 2. ⚠️ STAT REQUIREMENTS TOO HIGH (HIGH PRIORITY)
**Problem:** Players may never unlock gated content on first playthrough

**Current Requirements:**
- Wisdom 7: First gate (probably OK)
- Wisdom 8 + Compassion 6: Might be too high
- Wisdom 9: Definitely too high
- Wisdom 10 + Empathy 8: Unreachable?
- Courage 9 + Compassion 8: Unreachable?

**Testing Needed:**
1. Run through story making ALL good choices
2. Track final stats
3. See which gates open

**Suggested Adjustments:**
```javascript
// Current
requires: { wisdom: 10, empathy: 8 }

// Suggested  
requires: { wisdom: 7, empathy: 6 }
```

**Or:** Add more +2 and +3 value choices early in story

---

### 3. 🐛 ASSESSMENT RESET BUG (MEDIUM PRIORITY)
**Location:** Lines 50-60 (clearAssessment function)

**Problem:** Stats from gameplay might persist after retaking assessment

**Current Code:**
```javascript
const clearAssessment = () => {
  localStorage.removeItem('altruxaAssessment');
  setAssessmentScores(null);
  setAssessmentAnswers({});
  setHasCompletedAssessment(false);
};
```

**Missing:** Reset score state!

**Fix:**
```javascript
const clearAssessment = () => {
  localStorage.removeItem('altruxaAssessment');
  setAssessmentScores(null);
  setAssessmentAnswers({});
  setHasCompletedAssessment(false);
  setScore({ empathy: 0, wisdom: 0, compassion: 0, courage: 0 }); // ADD THIS
  setChoices([]);  // ADD THIS
  setStoryChoices([]); // ADD THIS
};
```

---

### 4. 🐛 NOTIFICATION OVERLAP (LOW PRIORITY)
**Location:** Lines 186-207 (StatChangeNotification component)

**Problem:** Multiple notifications can stack/overlap

**Current Behavior:**
- Notifications appear for 3 seconds
- New navigation doesn't clear old notifications
- Rapid choices cause stacking

**Quick Fix:**
```javascript
// In makeChoice function, before navigation:
setStatChanges([]); // Clear any existing notifications

// Then set new ones:
if (changes.length > 0) {
  setStatChanges(changes);
  setTimeout(() => setStatChanges([]), 3000);
}
```

---

## Testing Priority Checklist

### Before Sharing With Anyone:
- [ ] Play through entire Maya's Journey 
- [ ] Verify all branches reach endings
- [ ] Test that all endings return to menu
- [ ] Confirm at least some gated choices are reachable
- [ ] Test retake assessment doesn't break game

### Before Public Release:
- [ ] Full playthrough with all-good choices
- [ ] Full playthrough with all-bad choices
- [ ] Full playthrough with mixed choices
- [ ] Test all navigation (back/forward/menu)
- [ ] Mobile device testing
- [ ] Clear localStorage and test first-run

### Nice to Have:
- [ ] Balance all stat requirements based on actual playthrough data
- [ ] Add tooltips explaining locked choices
- [ ] Add visual feedback when requirements are almost met
- [ ] Add "new path unlocked!" celebration for first gated choice

---

## Quick Stat Balance Reference

### Current Assessment → Stats Conversion
```
Assessment axis (-10 to +10) → Character stat (0 to 10)

Formula: (axis1 + axis2) / 2 + 5

Examples:
- All answers best = ~+8 assessment = ~9 starting stat
- All answers worst = ~-8 assessment = ~1 starting stat  
- Mixed answers = ~0 assessment = ~5 starting stat
```

### Typical Stat Progression (estimated)
```
Starting: 3-7 per stat (from assessment)
After 5 choices: +3 to +6 depending on path
After 10 choices: +6 to +12
End of Maya's Journey: +8 to +15

Therefore:
- Wisdom 7 gate: Reachable by most players
- Wisdom 8-9 gates: Reachable by focused players
- Wisdom 10+ gates: Only perfectly aligned players
```

**Recommendation:** Lower high gates to 7-8 range, or add more early stat gains

---

## File Locations Quick Reference

```
Main Component: altruxa-path-game-enhanced.jsx

Key Sections:
Lines 1-20:     State declarations
Lines 22-37:    localStorage loading
Lines 39-85:    Navigation functions
Lines 92-207:   Sub-components (Nav, Stats, Notifications)
Lines 215-257:  Assessment processing
Lines 258-1900: All scenarios/scenes
Lines 2645-2730: makeChoice function (critical!)
Lines 2760-2780: isChoiceAvailable (gating logic)
Lines 2758-3470: Main render
```

---

## Most Likely Sources of Bugs

1. **Navigation after modal interrupts** (journal)
   - Test: Make choice → Journal opens → Save → Navigate back
   
2. **Rapid clicking during state updates**
   - Test: Click choice → Immediately click back → Click forward
   
3. **LocalStorage edge cases**
   - Test: Disable localStorage in browser settings
   - Test: Private/incognito mode
   
4. **Stats calculations with edge values**
   - Test: All assessment answers = option 0 (most negative)
   - Test: All assessment answers = option 3 (most positive)
   
5. **Mobile layout breakpoints**
   - Test: Width = 320px, 375px, 414px
   - Test: Landscape mobile orientation

---

## Emergency Fixes

### If Game Breaks During Demo:

**"Stats not updating"**
→ Check browser console for errors
→ Clear localStorage and refresh
→ Retake assessment

**"Can't navigate"**
→ Use Menu button (top left)
→ Refresh page (progress saved in localStorage)

**"Locked choices never unlock"**
→ Requirements too high, need to adjust in code
→ Or playtest needs better choices earlier

**"Story ends abruptly"**  
→ Hit one of the incomplete endings
→ Use Menu to return
→ Try different story path

---

## Next Steps After Fixes

1. Playtest thoroughly (all paths)
2. Adjust stat requirements based on playtesting
3. Add achievement system (fun motivator)
4. Create second story arc
5. Consider cloud save for cross-device play

---

**Remember:** The core mechanic (assessment → stats → gated choices) is solid. These are polish issues, not fundamental problems. The game is playable and interesting right now!
