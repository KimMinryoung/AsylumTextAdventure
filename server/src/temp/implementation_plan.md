# Implementation Plan - Hub System Rework (Rich Text & Supabase)

The goal is to re-integrate the Hub and Schedule system without losing the original rich story text and interactions from the base game. We will ensure that the system prioritizes data from Supabase DB while falling back to local rich text.

## Core Strategy
Instead of replacing original scenes with simplified redirects, we will:
1.  Keep all original narrative scenes and logic.
2.  Inject Hub/NPC actions dynamically into scenes based on the player's current location and schedule.
3.  Update `SceneBuilder` to handle this dynamic injection and ensure Supabase data is correctly merged.

## Proposed Changes

### [Component] Game Logic & Text

#### [MODIFY] [server/src/game/SceneBuilder.js](file:///c:/Users/DESKTOP/Documents/AIToyProject/server/src/game/SceneBuilder.js)
- Enhance `internalBake` to support "Common Actions" based on location.
- Implement a way for scenes to "subscribe" to hub actions.
- Improve Supabase merging logic: if a scene exists in DB, its `script`, `actions` (text), and `location` should override local JSON data.

#### [MODIFY] [server/src/game/data/story_logic/index.js](file:///c:/Users/DESKTOP/Documents/AIToyProject/server/src/game/data/story_logic/index.js)
- Ensure the hub and interaction logic files are included but as *extensions* rather than *replacements*.
- Introduce the `npc_schedules` integration here as well.

#### [NEW] [server/src/game/data/story_logic/hubs/hub_controller.js](file:///c:/Users/DESKTOP/Documents/AIToyProject/server/src/game/data/story_logic/hubs/hub_controller.js)
- Create a central controller that generates NPC interaction actions and navigation actions for a given location.

### [Component] Client UI (Re-apply)
- Re-apply the Day/Time HUD display implemented in the previous task.

## Verification Plan

### Automated Tests
- Create a test script that checks if a scene (e.g., `yard`) contains BOTH the original narrative actions AND the dynamic NPC interaction actions when someone is scheduled to be there.

### Manual Verification
- Play through the intro and first day.
- Verify that the text for "Arriving at the Yard" is the full, rich narrative, not a simple redirect.
- Check if NPCs appear in the actions list as expected from the schedule.
