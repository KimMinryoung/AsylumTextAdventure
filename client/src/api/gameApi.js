const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://asylumtextadventureserver.onrender.com';

export const gameApi = {
  async startGame(sessionId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/game/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: 'Failed to connect to server.'
      };
    }
  },

  async performAction(sessionId, actionId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/game/action`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, actionId }),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: 'Failed to connect to server.'
      };
    }
  },

  async getState(sessionId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/game/state/${sessionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: 'Failed to connect to server.'
      };
    }
  },

  async saveGame(sessionId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/game/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: 'Failed to connect to server.'
      };
    }
  },

  async loadGame(sessionId, saveData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/game/load`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, saveData }),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: 'Failed to connect to server.'
      };
    }
  }
};
