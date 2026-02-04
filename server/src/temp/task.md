# Task: Integrate Hub and Schedule System

- [x] Research and understand the new hub/schedule system <!-- id: 0 -->
    - [x] Analyze `server/src/game/data/schedules/npc_schedules.js` <!-- id: 1 -->
    - [x] Analyze `server/src/game/data/story_text/hubs/` and `server/src/game/data/story_text/interactions/` <!-- id: 2 -->
    - [x] Understand how `SceneBuilder.js` currently handles scene transitions <!-- id: 3 -->
- [x] Create Implementation Plan <!-- id: 4 -->
- [x] Integrate the new system into `SceneBuilder.js` <!-- id: 5 -->
    - [x] Update `SceneBuilder` to use `npc_schedules` for location-based NPCs <!-- id: 6 -->
    - [x] Implement hub logic to dynamically generate choices based on schedule <!-- id: 7 -->
    - [x] Connect interactions to the hub system <!-- id: 8 -->
- [x] Verify the integration <!-- id: 9 -->
    - [x] Test scene transitions with different game times <!-- id: 10 -->
    - [x] Ensure NPC presence matches schedule <!-- id: 11 -->
