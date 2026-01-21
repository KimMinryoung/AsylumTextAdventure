# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Text adventure game ("수용소 탈출기" / Asylum Escape Story) - a branching narrative web game with Node.js/Express backend and React frontend. Korean language content.

## Commands

### Development
```bash
npm run dev              # Run both server and client concurrently
npm run server           # Run backend only (port 3001)
npm run client           # Run frontend only (port 3000)
npm run install:all      # Install deps for root, server, and client
```

### Server (from /server)
```bash
npm run dev              # Nodemon with auto-reload
npm run lint             # ESLint checking
```

### Client (from /client)
```bash
npm start                # Development server
npm run build            # Production build
```

## Architecture

### Backend (`/server`)
- **Entry**: `src/index.js` - Express server on port 3001 with CORS
- **Routes**: `src/routes/game.js` - API endpoints for game state management
- **Game Engine**: `src/game/GameEngine.js` - Core logic for state, conditions, effects, save/load
- **SceneBuilder**: `src/game/SceneBuilder.js` - Helper for defining scenes with auto-generated action IDs

### Story Data (Logic/Text Separation)
Story is split into logic and text for maintainability:

**`/server/src/game/data/story_logic/`** - Scene logic (conditions, effects, actions)
- `intro.js`, `daily.js`, `workshop.js`, `yard.js`, `cafeteria.js`, `sleep.js` - Daily activities
- `escape.js` - Escape sequences
- `endings.js` - All ending scenarios
- `characters/` - NPC-specific logic (messiah, fraudster, wifekiller, groper, arsonist, pedophile, political, guard)
- `index.js` - **Main entry point**, initializes text data and exports all scenes

**`/server/src/game/data/story_text/`** - Text content (JSON)
- Matching JSON files for each logic module (e.g., `intro.json`, `characters/messiah.json`)
- `index.js` - Merges all text JSON files

**`/server/src/game/data/story/`** - Legacy (deprecated)

### Frontend (`/client`)
- **App.js**: Main container with game state logic
- **Components**: StartScreen (menu), GameScreen (gameplay UI), Minimap (3x5 location grid)
- **API Client**: `src/api/gameApi.js`

## Game Systems

### State Management
- **8 NPCs** with relationship tracking: messiah, fraudster, wifekiller, groper, arsonist, pedophile, political, guard
- **9 Locations**: roof, yard, corridor, workshop, cell, cafeteria, solitary, basement, sewer
- **Inventory, flags, visited locations, unlocked endings**

### Scene Definition Pattern
Use SceneBuilder's `defineScene` for logic, with text stored separately in JSON:

**Logic file (`story_logic/*.js`):**
```javascript
const { cond, eff, action, defineScene } = require('../../SceneBuilder');

module.exports = {
  ...defineScene("scene_id", { effects: [eff.rel("guard", 1)] }, () => [
    action("next_scene"),
    action("conditional_scene", [cond.hasItem("key")], [eff.flag("unlocked")])
  ])
};
```

**Text file (`story_text/*.json`):**
```json
{
  "scenes": {
    "scene_id": {
      "description": "장면 설명",
      "actions": {
        "next_scene": "선택지 텍스트",
        "conditional_scene": "조건부 선택"
      }
    }
  }
}
```

### Text Formatting (Client-side)
- `[status]text[/status]` - Status messages
- `{{item}}` - Item highlights
- `**text**` - Bold
- `!!text!!` - Danger/warning

## API Endpoints
- `POST /api/game/start` - New game session
- `POST /api/game/action` - Perform action
- `GET /api/game/state/:sessionId` - Get current state
- `POST /api/game/save` / `POST /api/game/load` - Persistence
- `GET /api/game/endings` - Fetch endings

## Deployment
- Backend: Render (asylumtextadventureserver.onrender.com)
- Frontend: Render (asylumtextadventure.onrender.com)
- Sessions are in-memory (Map) - reset on server restart
