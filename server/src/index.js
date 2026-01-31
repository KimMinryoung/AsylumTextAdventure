const express = require('express');
const cors = require('cors');
const path = require('path');
const gameRoutes = require('./routes/game');
const editorRoutes = require('./routes/editor');
const storyText = require('./game/data/story_text');
const storyData = require('./game/data/story_logic');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['https://asylumtextadventure.onrender.com', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT']
}));
app.use(express.json());

// Serve editor static files
app.use('/editor', express.static(path.join(__dirname, '../../editor')));

// Routes
app.use('/api/game', gameRoutes);
app.use('/api/editor', editorRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Text Adventure Server is running' });
});

// Initialize and start server
async function startServer() {
  try {
    await storyText.initialize();
    storyData.reinitialize();

    app.listen(PORT, () => {
      console.log(`✅ Text Adventure Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
