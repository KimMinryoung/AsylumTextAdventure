const express = require('express');
const router = express.Router();
const GameEngine = require('../game/GameEngine');
const gameData = require('../game/data/story');
const supabase = require('../config/supabase');

// Store active game sessions
const sessions = new Map();

// Start a new game
router.post('/start', (req, res) => {
  const { sessionId } = req.body;
  const engine = new GameEngine(gameData);
  const initialState = engine.start();

  sessions.set(sessionId, engine);

  res.json({
    success: true,
    state: initialState
  });
});

// Make a choice / perform an action
router.post('/action', (req, res) => {
  const { sessionId, actionId } = req.body;

  const engine = sessions.get(sessionId);
  if (!engine) {
    return res.status(404).json({
      success: false,
      error: 'Game session not found. Please start a new game.'
    });
  }

  const result = engine.performAction(actionId);

  if (!result.success) {
    return res.status(400).json(result);
  }

  res.json(result);
});

// Get current game state
router.get('/state/:sessionId', (req, res) => {
  const { sessionId } = req.params;

  const engine = sessions.get(sessionId);
  if (!engine) {
    return res.status(404).json({
      success: false,
      error: 'Game session not found.'
    });
  }

  res.json({
    success: true,
    state: engine.getState()
  });
});

// Save game
router.post('/save', (req, res) => {
  const { sessionId } = req.body;

  const engine = sessions.get(sessionId);
  if (!engine) {
    return res.status(404).json({
      success: false,
      error: 'Game session not found.'
    });
  }

  const saveData = engine.save();
  res.json({
    success: true,
    saveData
  });
});

// Load game
router.post('/load', (req, res) => {
  const { sessionId, saveData } = req.body;

  const engine = new GameEngine(gameData);
  const loadResult = engine.load(saveData);

  if (!loadResult.success) {
    return res.status(400).json(loadResult);
  }

  sessions.set(sessionId, engine);

  res.json({
    success: true,
    state: engine.getState()
  });
});

// Cloud save - DB에 저장
router.post('/cloud-save', async (req, res) => {
  const { sessionId, playerId } = req.body;

  if (!playerId) {
    return res.status(400).json({ success: false, error: 'playerId is required' });
  }

  const engine = sessions.get(sessionId);
  if (!engine) {
    return res.status(404).json({ success: false, error: 'Game session not found.' });
  }

  if (!supabase) {
    return res.status(503).json({ success: false, error: 'Database not configured' });
  }

  try {
    const saveData = engine.save();

    const { error } = await supabase
      .from('game_saves')
      .upsert({
        player_id: playerId,
        save_data: saveData,
        updated_at: new Date().toISOString()
      }, { onConflict: 'player_id' });

    if (error) throw error;

    res.json({ success: true, message: 'Saved to cloud' });
  } catch (error) {
    console.error('Cloud save error:', error);
    res.status(500).json({ success: false, error: 'Failed to save to cloud' });
  }
});

// Cloud load - DB에서 불러오기
router.post('/cloud-load', async (req, res) => {
  const { sessionId, playerId } = req.body;

  if (!playerId) {
    return res.status(400).json({ success: false, error: 'playerId is required' });
  }

  if (!supabase) {
    return res.status(503).json({ success: false, error: 'Database not configured' });
  }

  try {
    const { data, error } = await supabase
      .from('game_saves')
      .select('save_data')
      .eq('player_id', playerId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No save found
        return res.json({ success: false, error: 'No saved game found' });
      }
      throw error;
    }

    const engine = new GameEngine(gameData);
    const loadResult = engine.load(data.save_data);

    if (!loadResult.success) {
      return res.status(400).json(loadResult);
    }

    sessions.set(sessionId, engine);

    res.json({ success: true, state: engine.getState() });
  } catch (error) {
    console.error('Cloud load error:', error);
    res.status(500).json({ success: false, error: 'Failed to load from cloud' });
  }
});

router.get('/endings', (req, res) => {
  try {
    const endings = Object.entries(gameData.scenes)
      .filter(([id, scene]) => scene.isEnding)
      .map(([id, scene]) => ({
        id: id,
        title: scene.title,
        description: scene.description,
        isEnding: true
      }));

    res.json({ success: true, endings });
  } catch (error) {
    console.error('Error fetching endings:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch endings' });
  }
});

module.exports = router;
