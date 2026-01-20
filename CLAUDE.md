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

### Story Data (`/server/src/game/data/story/`)
Modular story structure organized by game section:
- `intro.js` - Day 1 opening
- `workshop.js`, `yard.js`, `cafeteria.js`, `sleep.js` - Daily activities
- `escape.js` - Escape sequences
- `endings.js` - All ending scenarios
- `characters/` - Individual NPC dialogue files (messiah, fraudster, wifekiller, groper, arsonist, pedophile, political)

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
Use SceneBuilder for new scenes - action IDs are auto-generated as `{sceneId}_act_{index}`:
```javascript
const { scene, action } = require('../SceneBuilder');

module.exports = {
  ...scene('scene_id', '장면 설명')
    .action(action('선택지 텍스트').next('next_scene'))
    .action(action('조건부 선택').condition({ hasItem: 'key' }).next('secret_scene'))
    .build()
};
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
