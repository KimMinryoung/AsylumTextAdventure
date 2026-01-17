import React, { useState, useCallback } from 'react';
import GameScreen from './components/GameScreen';
import StartScreen from './components/StartScreen';
import { gameApi } from './api/gameApi';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [sessionId] = useState(() => crypto.randomUUID());

  const startGame = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await gameApi.startGame(sessionId);
      if (result.success) {
        setGameState(result.state);
        setMessage(null);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to start game. Is the server running?' });
    }
    setIsLoading(false);
  }, [sessionId]);

  const performAction = useCallback(async (actionId) => {
    setIsLoading(true);
    try {
      const result = await gameApi.performAction(sessionId, actionId);
      if (result.success) {
        if (result.message) {
          setMessage({ type: 'info', text: result.message });
        } else {
          setMessage(null);
        }
        setGameState(result.state);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Action failed. Please try again.' });
    }
    setIsLoading(false);
  }, [sessionId]);

  const saveGame = useCallback(async () => {
    try {
      const result = await gameApi.saveGame(sessionId);
      if (result.success) {
        localStorage.setItem('textAdventureSave', JSON.stringify(result.saveData));
        setMessage({ type: 'success', text: 'Game saved!' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save game.' });
    }
  }, [sessionId]);

  const loadGame = useCallback(async () => {
    const saveData = localStorage.getItem('textAdventureSave');
    if (!saveData) {
      setMessage({ type: 'error', text: 'No save data found.' });
      return;
    }

    setIsLoading(true);
    try {
      const result = await gameApi.loadGame(sessionId, JSON.parse(saveData));
      if (result.success) {
        setGameState(result.state);
        setMessage({ type: 'success', text: 'Game loaded!' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load game.' });
    }
    setIsLoading(false);
  }, [sessionId]);

  return (
    <div className="app">
      {!gameState ? (
        <StartScreen
          onStartGame={startGame}
          onLoadGame={loadGame}
          isLoading={isLoading}
          message={message}
        />
      ) : (
        <GameScreen
          gameState={gameState}
          onAction={performAction}
          onSave={saveGame}
          onLoad={loadGame}
          onRestart={startGame}
          isLoading={isLoading}
          message={message}
        />
      )}
    </div>
  );
}

export default App;
