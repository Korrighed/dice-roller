# Dice Roller - Project CLAUDE.md

## Overview

**Dice Roller** — React application with 3D dice visualization using Three.js.

Users roll polyhedral dice (D4, D6, D8, D10, D12, D20, D100) with real-time 3D animation and persistent roll history. Built for D&D / TTRPG campaigns.

## Stack

- **Frontend**: React 19, TypeScript
- **Bundler**: Vite
- **3D**: Three.js, React Three Fiber (@react-three/fiber), Drei (@react-three/drei)
- **State**: Custom hooks (useRolls, useDiceRotation)
- **Storage**: localStorage via `utils/storage.ts`
- **Deployment**: Netlify

## Project Structure

```
src/
├── App.tsx                      // Main layout + state wiring
├── App.css                      // Global reset + layout styles
├── vite-env.d.ts               // Vite type declarations
├── component/                   // UI components (TODO: align naming with components/)
│   ├── DicesCard.tsx           // Roll interface + 3D canvas
│   ├── DiceTableCard.tsx       // Roll history table
│   ├── Dice3DCanvas.tsx        // Three.js canvas wrapper
│   ├── DiceButton.tsx          // Dice selection button
│   └── DiceSelector.tsx        // Dice type picker
├── components/
│   └── Dice/
│       ├── Dice.tsx            // 3D dice mesh + animation (useFrame)
│       ├── index.ts
│       └── configs/
│           ├── d4.ts, d6.ts, ... // Geometry + texture URLs per die type
│           └── index.ts         // DICE_CONFIGS registry
├── hooks/
│   ├── useRolls.tsx            // Roll state + history management
│   └── useDiceRotation.ts      // Animation speed ref
└── utils/
    ├── storage.ts              // localStorage persistence
    ├── dice.ts                 // Core dice logic
    └── faceUp.ts              // Face-up rotation matrices per die
```

## Key Behaviors

### Roll Workflow
1. User selects dice type via DiceButton.
2. Dice added to pendingDice array (D100 creates paired D10/D100).
3. "Roll" button triggers rollAllPending → animates 3D dice + calculates results.
4. Results stored in diceResults map + added to rolls history.
5. Notation string auto-generated (e.g. "2d20+5").

### D100 Special Handling
- D100 is always rolled as a **pair** (D100 tens + D10 units).
- Tens result 100 → treated as 0 for combination.
- Result: tens (0–90) + units (0–9) = 1–100.

### 3D Animation
- `useFrame` (React Three Fiber) drives rotation — synchronized with the Three.js render loop.
- After roll finishes, rotates to face-up orientation via `faceUp` config.
- Textures lazy-loaded; fallback gray if load fails.

### Persistence
- Roll history saved to localStorage after each roll.
- Loaded on mount via useRolls hook.
- "Clear All" wipes both state and storage.

## Dev Workflow

- **Dev**: `npm run dev` → HMR on http://localhost:5173 (Vite default).
- **Before push**: `npm run build` to validate production build.
- **Preview build**: `npm run preview`.

## Deployment

- **Build output**: `dist/` folder.
- **Hosted**: Netlify (`netlify.toml` at root).
- **CI/CD**: Netlify auto-deploys on push to main.

## Common Tasks

### Add a New Die Type
1. Create `src/components/Dice/configs/d<N>.ts` with geometry, textures, faceUp.
2. Export in `configs/index.ts` and add to DICE_CONFIGS.
3. Add button in DiceSelector.tsx.

### Fix Rotation on Roll Completion
1. Check `faceUp[result]` in the die's config file.
2. Verify rotation angles are [rx, ry, rz] in radians.

### Change Styling
- Global reset + layout: `src/App.css`.
- Per-component: `src/styles/*.css` or inline styles.

---

## Git Flow

- `main` — production only, tagged releases
- `develop` — integration branch, base for features
- `feature/<name>` — new features, branched from develop
- `hotfix/<name>` — urgent prod fixes, branched from main
- `release/<version>` — release prep, branched from develop

**Commit convention**: `type(scope): summary`
Types: `feat`, `fix`, `refactor`, `docs`, `chore`, `style`, `test`
