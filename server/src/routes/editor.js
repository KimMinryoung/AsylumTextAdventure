const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const STORY_TEXT_DIR = path.join(__dirname, '../game/data/story_text');

// Validate path to prevent directory traversal
function isValidPath(filePath) {
  const normalizedPath = path.normalize(filePath);
  const resolvedPath = path.resolve(STORY_TEXT_DIR, normalizedPath);
  return resolvedPath.startsWith(STORY_TEXT_DIR) && resolvedPath.endsWith('.json');
}

// GET /api/editor/files - List all JSON files grouped by directory
router.get('/files', (req, res) => {
  try {
    const files = {
      root: [],
      characters: [],
      dungeon: []
    };

    // Read root level files
    const rootFiles = fs.readdirSync(STORY_TEXT_DIR);
    rootFiles.forEach(file => {
      const filePath = path.join(STORY_TEXT_DIR, file);
      const stat = fs.statSync(filePath);

      if (stat.isFile() && file.endsWith('.json')) {
        files.root.push(file);
      }
    });

    // Read characters directory
    const charactersDir = path.join(STORY_TEXT_DIR, 'characters');
    if (fs.existsSync(charactersDir)) {
      const characterFiles = fs.readdirSync(charactersDir);
      characterFiles.forEach(file => {
        if (file.endsWith('.json')) {
          files.characters.push(file);
        }
      });
    }

    // Read dungeon directory
    const dungeonDir = path.join(STORY_TEXT_DIR, 'dungeon');
    if (fs.existsSync(dungeonDir)) {
      const dungeonFiles = fs.readdirSync(dungeonDir);
      dungeonFiles.forEach(file => {
        if (file.endsWith('.json')) {
          files.dungeon.push(file);
        }
      });
    }

    res.json({ success: true, files });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/editor/file/:path - Get contents of a specific file
router.get('/file/*', (req, res) => {
  try {
    const filePath = req.params[0];

    if (!isValidPath(filePath)) {
      return res.status(400).json({ success: false, error: 'Invalid file path' });
    }

    const fullPath = path.join(STORY_TEXT_DIR, filePath);

    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ success: false, error: 'File not found' });
    }

    const content = fs.readFileSync(fullPath, 'utf-8');
    const data = JSON.parse(content);

    res.json({ success: true, data, path: filePath });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/editor/scene/:path/:sceneId - Update a scene's content
router.put('/scene/*', (req, res) => {
  try {
    // Extract path and sceneId from params
    const fullParam = req.params[0];
    const lastSlashIndex = fullParam.lastIndexOf('/');

    if (lastSlashIndex === -1) {
      return res.status(400).json({ success: false, error: 'Invalid path format' });
    }

    const filePath = fullParam.substring(0, lastSlashIndex);
    const sceneId = fullParam.substring(lastSlashIndex + 1);

    if (!isValidPath(filePath)) {
      return res.status(400).json({ success: false, error: 'Invalid file path' });
    }

    const fullFilePath = path.join(STORY_TEXT_DIR, filePath);

    if (!fs.existsSync(fullFilePath)) {
      return res.status(404).json({ success: false, error: 'File not found' });
    }

    const content = fs.readFileSync(fullFilePath, 'utf-8');
    const data = JSON.parse(content);

    if (!data.scenes || !data.scenes[sceneId]) {
      return res.status(404).json({ success: false, error: 'Scene not found' });
    }

    const { script, actions, location } = req.body;

    // Validate script - remove empty lines but ensure at least one line
    if (script !== undefined) {
      const filteredScript = script.filter(line => line.trim() !== '');
      if (filteredScript.length === 0) {
        return res.status(400).json({ success: false, error: 'Script cannot be empty' });
      }
      data.scenes[sceneId].script = filteredScript;
    }

    // Validate actions - allow empty actions array but filter empty entries
    if (actions !== undefined) {
      const filteredActions = actions.filter(action => action.trim() !== '');
      data.scenes[sceneId].actions = filteredActions;
    }

    // Update location if provided
    if (location !== undefined) {
      data.scenes[sceneId].location = location;
    }

    // Write back to file with proper formatting
    fs.writeFileSync(fullFilePath, JSON.stringify(data, null, 2), 'utf-8');

    res.json({ success: true, scene: data.scenes[sceneId] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
