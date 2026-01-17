const express = require('express');
const cors = require('cors');
const gameRoutes = require('./routes/game');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['https://asylumtextadventure.onrender.com', 'http://localhost:3000'],
  methods: ['GET', 'POST']
}));
app.use(express.json());

// Routes
app.use('/api/game', gameRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Text Adventure Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
