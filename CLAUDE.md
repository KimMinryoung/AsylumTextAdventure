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
node scripts/validate_story_logic.js  # Validate story structure, find orphan scenes
node scripts/migrate_to_supabase.js   # Migrate local JSON to Supabase DB
```

### Scene Tool (DB-based story_text management)
```bash
# From /server directory
node scripts/scene_tool.js read <scene_id>           # View scene details
node scripts/scene_tool.js list [pattern]            # List scenes (filter by pattern)
node scripts/scene_tool.js create <id> <json_file>   # Create new scene
node scripts/scene_tool.js update <id> <json_file>   # Update existing scene
node scripts/scene_tool.js delete <scene_id>         # Delete scene
node scripts/scene_tool.js export <id> [file]        # Export to JSON
node scripts/scene_tool.js export-all [dir]          # Backup all scenes
```

**JSON file format for create/update:**
```json
{
  "script": ["대사1", "speaker: 대사2"],
  "actions": ["선택지1", "선택지2"],
  "location": "cell"
}
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
- `location_menu.js` - Hub system location selection
- `index.js` - **Main entry point**, initializes text data and exports all scenes

**`/server/src/game/data/story_text/`** - Text content (Supabase DB)
- **DB is the single source of truth** - no local JSON files
- `index.js` - Loads text from Supabase `story_scenes` table

**`/server/src/game/data/schedules/`** - NPC schedule system
- `npc_schedules.js` - NPC locations by day/time slot

### Frontend (`/client`)
- **App.js**: Main container with game state logic
- **Components**: StartScreen (menu), GameScreen (gameplay UI), Minimap (3x5 location grid)
- **API Client**: `src/api/gameApi.js`

## Game Systems

### State Management
- **8 NPCs** with relationship tracking: messiah, fraudster, wifekiller, groper, arsonist, pedophile, political, guard
- **9 Locations**: roof, yard, corridor, workshop, cell, cafeteria, solitary, basement, sewer
- **Inventory, flags, visited locations, unlocked endings**
- **Time system**: currentDay (1-4), currentTimeSlot (0-4: 아침/점심/낮/저녁/밤)

### Hub System (Day 2+)
From day 2 onwards, hub scenes (`yard`, `cafeteria_arrival`, `workshop`, `cell_arrival`) dynamically inject:
- NPC interaction actions based on `npc_schedules.js` (who is at current location/time)
- "다른 장소로 이동한다" action → `location_select` scene

**Key effects for day transitions:**
- `eff.setDay(n)` - Set current day
- `eff.setTimeSlot(n)` - Set time slot (0-4)
- `eff.advanceTime()` - Advance time (increments day when night→morning)

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
- `POST /api/game/start` - New game session (loads previous unlocked endings only)
- `POST /api/game/action` - Perform action
- `GET /api/game/state/:sessionId` - Get current state
- `POST /api/game/save` / `POST /api/game/load` - Local persistence
- `POST /api/game/cloud-save` - Cloud save (full game state, manual save)
- `POST /api/game/cloud-save-endings` - Cloud save endings only (auto-save on new ending)
- `POST /api/game/cloud-load` - Cloud load (full game state, manual load)
- `GET /api/game/endings` - Fetch endings

### Save/Load System
The save system separates **unlocked endings** from **game state** to prevent auto-saves from overwriting manual save points:

| Trigger | What's Saved | Endpoint |
|---------|--------------|----------|
| New ending reached (auto) | `unlockedEndings` only | `cloud-save-endings` |
| Save button (manual) | Full game state | `cloud-save` |
| Load button (manual) | Full game state | `cloud-load` |
| New game start | Loads `unlockedEndings` only | `start` |

This ensures that viewing an ending doesn't overwrite the player's manually saved checkpoint.

## Deployment
- Backend: Render (asylumtextadventureserver.onrender.com)
- Frontend: Render (asylumtextadventure.onrender.com)
- Sessions are in-memory (Map) - reset on server restart

## Caution
- When running bash commands on Windows, use /dev/null for output redirection, not nul.