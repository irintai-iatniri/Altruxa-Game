# How to Run Altruxa Path Game

## Option 1: Development Server (Recommended)

### First Time Setup:
```bash
# Install dependencies
npm install
```

### Run the game:
```bash
# Start development server
npm run dev
```

Then open your browser to: **http://localhost:5173**

### Build for production:
```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

---

## Option 2: Simple Local File

If you don't want to install anything, you can use the old Electron method, but you'll need to:

1. Put all code back into a single `.jsx` file
2. Use the `docs/index.html` and `docs/main.js` 
3. Run: `./docs/run.sh`

---

## Keyboard Shortcuts

- **H** - Return to menu
- **←** - Go back
- **→** - Go forward  
- **Esc** - Close modals
- **Ctrl+S** - Save game
- **Ctrl+L** - Load game

---

## Project Structure

```
/
├── index.html          # Entry HTML
├── package.json        # Dependencies
├── vite.config.js      # Build config
├── src/
│   ├── App.jsx         # Main component
│   ├── index.js        # Entry point
│   ├── components/     # UI components
│   ├── modals/         # Modal dialogs
│   ├── scenarios/      # Game content
│   └── data/           # Assessment logic
└── public/             # Static assets
```
