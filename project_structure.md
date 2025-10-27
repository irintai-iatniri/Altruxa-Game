# Altruxa Game Project Structure

This document describes the folder and file organization for the Altruxa Game project as of October 2025.

## Top-Level Folders

- `src/` — Main source code for the game
  - `components/` — Reusable React components
  - `modals/` — Modal components (profile manager, save/load, etc.)
  - `scenarios/` — Scenario logic and components
  - `data/` — Game data (assessment questions, scenarios, etc.)
  - `assets/` — Images, audio, and other static assets
  - `utils/` — Utility/helper functions
  - `styles/` — CSS/SCSS files
  - `App.jsx` — Main app component
  - `index.js` — Entry point
- `public/` — Static files (index.html, images, etc.)
- `docs/` — Documentation, changelogs, old versions, and project notes
  - `old_versions/` — Archived previous versions of game files
- `tests/` — Unit and integration tests

## Key Files

- `.gitignore` — Git ignore rules
- `README.md` — Project overview (now in `docs/`)
- `package.json` — Project metadata and dependencies

## Example Structure

```
Altruxa Game/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── modals/
│   ├── scenarios/
│   ├── data/
│   ├── assets/
│   ├── utils/
│   ├── styles/
│   ├── App.jsx
│   └── index.js
├── docs/
│   ├── README.md
│   └── ...
├── old_versions/
├── tests/
├── .gitignore
├── package.json
└── ...
```

## Notes
- All main game logic, components, and data files are now under `src/`.
- Documentation, changelogs, and old versions are under `docs/`.
- Static assets and entry HTML are in `public/`.
- Tests should be placed in `tests/`.
