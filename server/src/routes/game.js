const express = require('express');
const router = express.Router();
const GameEngine = require('../game/GameEngine');
const gameData = require('../game/data/story');

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
