# Altruxa Path Game - Changelog

## Version 0.0.7 - Modular Refactor (October 26, 2025)

### 🎯 Overview
Major architectural refactoring from monolithic single-file structure to modular component-based architecture. Migrated from Electron to Vite build system for better development experience and modern tooling.

---

## 🏗️ Architecture Changes

### Project Structure Reorganization
**Before:** Single monolithic JSX file (~3,500+ lines)
**After:** Modular component-based structure

```
src/
├── App.jsx                          # Main game orchestrator (1,374 lines)
├── index.jsx                        # React entry point
├── components/                      # Reusable UI components
│   ├── assesment_history.jsx       # Assessment history display
│   ├── character_stats_display.jsx # Character stats UI
│   ├── extracted_journal.jsx       # Journal modal component
│   ├── moral_trajectory.jsx        # Moral trajectory chart
│   ├── navigation_bar.jsx          # Navigation controls
│   ├── stata_change_notify.jsx     # Stat change notifications
│   └── view_journal.jsx            # Journal viewer
├── modals/                          # Modal dialogs
│   ├── profile_manager.jsx         # Profile management
│   └── save_load.jsx               # Save/load system
├── scenarios/                       # Game content
│   ├── core.jsx                    # Core UI scenes (menu, assessment, etc.)
│   ├── mayas_journey.jsx           # Maya's story scenarios
│   └── bridge.jsx                  # Bridge Choice story
└── data/
    └── assesments.jsx              # Assessment questions & handlers
```

### Component Extraction
**Components Converted (9 files):**
- StatChangeNotification
- NavigationBar
- StatsDisplay
- MoralTrajectoryChart
- AssessmentHistory
- ViewJournal
- JournalModalComponent
- ProfileManagerModal
- SaveLoadModal

**All components now:**
- Accept props instead of referencing parent scope
- Properly export using ES6 module syntax
- Include React imports
- Return null when not visible (conditional rendering)

### Scenario Organization
**Separated into logical modules:**
1. **core.jsx** - Core UI/menu scenes:
   - loading, profile_select, intro, menu
   - assessment, assessment_results
   - assessment_history_view, journal_view, retake_assessment
   - values_intro

2. **mayas_journey.jsx** - Maya's story content (106KB)
   - story_intro → full Maya storyline

3. **bridge.jsx** - Hard difficulty story (21KB)
   - story_bridge_intro → Bridge Choice storyline

### Data Module
**assesments.jsx:**
- Exports `assessmentQuestions` array (8 questions)
- Exports `createAssessmentHandlers` factory function
- Uses closure pattern to create assessment handlers with proper scope

---

## 🛠️ Build System Migration

### From Electron to Vite
**Removed:**
- Electron dependencies
- Electron main/renderer process files
- Complex build configuration

**Added:**
- Vite dev server (HMR support)
- React Fast Refresh
- Modern ES module support
- Optimized production builds

### New Configuration Files

**package.json:**
```json
{
  "name": "altruxa-path-game",
  "version": "0.0.7",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.3",
    "vite": "^4.4.5"
  }
}
```

**vite.config.js:**
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',
  publicDir: 'public',
  build: { outDir: 'dist' },
  resolve: { alias: { '@': '/src' } }
});
```

**index.html:**
- Root HTML file with Tailwind CSS CDN
- React root mount point
- Module script loading

**start.sh:**
- Simple bash script for `npm run dev`

---

## 🐛 Bug Fixes

### Fix #1: JSX Extension Error
**Error:** `The JSX syntax extension is not currently enabled`
**Cause:** File was named `index.js` but contained JSX
**Fix:** Renamed to `index.jsx`, updated index.html reference
**Status:** ✅ RESOLVED

### Fix #2: Duplicate Story IDs
**Error:** `Duplicate key "story_1d" in object literal`
**Location:** scenarios.jsx:312 and mayas_journey.jsx:220
**Cause:** Two scenes with same ID ("Day 1: The Discovery" and "Day 8: Preparing for Battle")
**Fix:** Renamed second occurrence from `story_1d` to `story_1h`
**Status:** ✅ RESOLVED

### Fix #3: Missing Export in extracted_journal.jsx
**Error:** `The requested module does not provide an export named 'JournalModalComponent'`
**Cause:** Component defined but not exported, React not imported
**Fix:**
- Added `import React from 'react';`
- Changed `const JournalModalComponent` to `export const JournalModalComponent`
**Status:** ✅ RESOLVED

### Fix #4: Function Called Before Initialization
**Error:** `Cannot access 'saveAssessmentToStorage' before initialization`
**Cause:** `createAssessmentHandlers` called on line 63, but `saveAssessmentToStorage` defined at line 359
**Fix:** Moved `saveAssessmentToStorage` definition to line 58 (before usage), removed duplicate at line 373
**Status:** ✅ RESOLVED

---

## 📝 Code Quality Improvements

### Export Pattern Standardization
**All scenario files now follow:**
```javascript
const sceneName = {
  scene_id: { /* ... */ }
};

export default sceneName;
```

### Component Pattern Standardization
**All components now follow:**
```javascript
import React from 'react';
import { Icon1, Icon2 } from 'lucide-react';

export const ComponentName = ({ prop1, prop2, ... }) => {
  if (!shouldRender) return null;

  return ( /* JSX */ );
};
```

### Import Organization
**App.jsx imports organized into sections:**
1. React & external libraries
2. Scenarios
3. Assessment data & handlers
4. Components
5. Modals

---

## 🔄 Migration Notes

### Breaking Changes
**File Structure:**
- Game is no longer a single file
- Must use build system (Vite) to run
- Cannot run directly in browser without build step

**Runtime:**
- Electron no longer supported (use Vite dev server)
- Must run `npm install` before first use
- Must run `npm run dev` to start development server

### Data Compatibility
✅ **localStorage data fully compatible**
- Assessment history preserved
- Profile data preserved
- Save data preserved
- Journal entries preserved

### Migration Steps
1. Extract all files to project directory
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start development server
4. Navigate to http://localhost:5173

---

## 📊 Performance & Bundle Size

### File Size Changes
**Before:** 1 file × 3,558 lines = ~250KB
**After:** 16 files × ~200 lines avg = ~300KB total (source)

**Bundle Size (production build):**
- Not yet measured (run `npm run build` to generate)
- Vite tree-shaking will remove unused code
- Minification will reduce size significantly

### Development Experience
**Improvements:**
✅ Hot Module Replacement (instant updates)
✅ Fast startup (<1 second)
✅ Better error messages
✅ React Fast Refresh
✅ Source maps for debugging

### Code Maintainability
**Before:** Find/edit in 3,500+ line file
**After:** Navigate to specific component/scenario file

---

## 🧪 Testing Performed

### Manual Testing Completed
✅ App loads without errors
✅ Profile selection works
✅ Assessment loads and functions
✅ Maya's story accessible from menu
✅ Bridge Choice accessible from menu
✅ All components render properly
✅ Dark mode toggle works
✅ Stats display correctly
✅ Navigation history works

### Build System Testing
✅ `npm install` completes successfully
✅ `npm run dev` starts server
✅ Hot reload works on file changes
✅ No console errors on load
✅ All imports resolve correctly

### Edge Cases Tested
✅ Empty journal (export button hidden)
✅ First-time user (profile creation)
✅ Returning user (data persistence)
✅ Page refresh (state preserved in localStorage)

---

## ⚠️ Known Issues

### Production Build Not Tested
- `npm run build` not yet run
- Production bundle size unknown
- No production deployment tested

### Tailwind CSS via CDN
**Warning:** Using CDN version of Tailwind
**Recommendation:** Install as PostCSS plugin for production
**Impact:** Larger bundle, slower initial load
**Status:** Acceptable for development, should be fixed before production

### No TypeScript
- Project uses plain JavaScript
- No type checking
- No IDE autocomplete for props
- Consider TypeScript migration in future

---

## 🚀 Future Enhancements

### Recommended Next Steps
1. **Add TypeScript** - Type safety for components
2. **Install Tailwind properly** - PostCSS plugin instead of CDN
3. **Add tests** - Jest + React Testing Library
4. **Add linting** - ESLint + Prettier
5. **Production build** - Optimize and deploy
6. **Code splitting** - Lazy load scenarios
7. **Service worker** - Offline support

### Architectural Improvements
1. **Context API** - Reduce prop drilling
2. **Custom hooks** - Extract common logic
3. **Error boundaries** - Graceful error handling
4. **Loading states** - Better UX during transitions
5. **Route-based navigation** - React Router integration

---

## 📁 File Changes Summary

### New Files Created (16)
- src/App.jsx
- src/index.jsx
- src/components/ (7 files)
- src/modals/ (2 files)
- src/scenarios/ (3 files)
- src/data/assesments.jsx
- vite.config.js
- package.json
- index.html
- start.sh

### Files Moved to Archive
- old_versions/altruxa-path-game-v.0.0.4.jsx
- old_versions/altruxa-path-game-v0.0.5.jsx
- old_versions/altruxa-path-game-v0_0_6.jsx

### Files Updated
- .gitignore (organized, removed build files)

---

## 🎓 Development Patterns Used

### Factory Pattern
**createAssessmentHandlers:**
- Creates functions with closures
- Encapsulates assessment logic
- Accepts dependencies as parameters
- Returns object with handler methods

### Conditional Rendering
**All components:**
```javascript
if (!isVisible) return null;
```
- Early return pattern
- Reduces nesting
- Improves performance

### Props Destructuring
**All components:**
```javascript
export const Component = ({ prop1, prop2 }) => { ... }
```
- Clear prop requirements
- Better readability
- Easier to refactor

---

## 👥 Credits

### Development
- **Refactoring**: Claude (Anthropic AI)
- **Original Code**: Versions 0.0.3-0.0.6
- **Philosophy**: Irintai (CRT & Altruxa)

### Tools & Frameworks
- **React 18**: UI library
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **Lucide React**: Icons

---

## 📞 Support

### Common Issues

**"npm: command not found"**
→ Install Node.js from nodejs.org

**"Port 5173 already in use"**
→ Kill existing Vite process or use different port

**"Module not found" errors**
→ Run `npm install` again

**Blank white screen**
→ Check browser console for errors
→ Ensure all files are in correct locations
→ Verify imports match exports

**Changes not reflecting**
→ Check if Vite HMR is working
→ Hard refresh browser (Ctrl+Shift+R)
→ Restart dev server

---

## 📈 Version History

### v0.0.1 - v0.0.2
- Initial development
- Basic assessment and story framework

### v0.0.3 (Stable)
- Last known fully working version
- Assessment functioning correctly
- All core features operational

### v0.0.4 (Bug Fixes)
- Fixed incomplete story endings
- Fixed assessment reset bug
- Fixed stat notification overlap

### v0.0.5 (Features)
- Dark mode
- Keyboard navigation
- Journal export
- Keyboard shortcuts help

### v0.0.6 (Unknown)
- No changelog available

### v0.0.7 (Current - Modular Refactor)
- **Complete architectural refactoring**
- Modular component structure
- Vite build system
- Proper ES6 modules
- Better maintainability
- **Status:** ✅ Stable - Development Ready

---

## 🎯 Quick Start Guide

### For Developers (New Setup)
```bash
# 1. Navigate to project
cd "/home/irintai/Desktop/Experiments/Altruxa Game"

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Navigate to http://localhost:5173
```

### For Users (Playing the Game)
1. Wait for developer to run the server
2. Navigate to http://localhost:5173
3. Create profile or select existing
4. Complete assessment
5. Choose your story path
6. Make meaningful choices

---

## ✨ Conclusion

Version 0.0.7 represents a complete architectural transformation from monolithic to modular structure. The game functionality remains identical, but the codebase is now:

✅ **Modular** - Easy to find and edit specific features
✅ **Maintainable** - Clear separation of concerns
✅ **Scalable** - Easy to add new components/stories
✅ **Modern** - Using current best practices and tools
✅ **Developer-Friendly** - Hot reload, better errors, organized structure

This refactoring sets a solid foundation for future enhancements and makes the codebase significantly easier to work with for ongoing development.

---

**Version:** 0.0.7
**Status:** ✅ Stable - Development Ready
**Build System:** Vite
**Architecture:** Modular Components
**Last Updated:** October 26, 2025

---

*"Each choice matters. Each moment is an opportunity to reduce suffering."*

---

## Previous Versions (Archive)

For historical changelog entries from versions 0.0.4 and 0.0.5, see:
- `change_logs/CHANGELOG_v.0.0.4.md`
- `change_logs/Changelogv0.0.6.md`
