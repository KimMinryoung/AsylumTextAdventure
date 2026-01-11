const API_BASE = '/api/game';

export const gameApi = {
  async startGame(sessionId) {
    const response = await fetch(`${API_BASE}/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId })
    });
    return response.json();
  },

  async performAction(sessionId, actionId) {
    const response = await fetch(`${API_BASE}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, actionId })
    });
    return response.json();
  },

  async getState(sessionId) {
    const response = await fetch(`${API_BASE}/state/${sessionId}`);
    return response.json();
  },

  async saveGame(sessionId) {
    const response = await fetch(`${API_BASE}/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId })
    });
    return response.json();
  },

  async loadGame(sessionId, saveData) {
    const response = await fetch(`${API_BASE}/load`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, saveData })
    });
    return response.json();
  }
};
