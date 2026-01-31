const express = require('express');
const cors = require('cors');
const path = require('path');
const gameRoutes = require('./routes/game');
const editorRoutes = require('./routes/editor');

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
