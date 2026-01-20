import React, { useState, useCallback, useEffect } from 'react';
import GameScreen from './components/GameScreen';
import StartScreen from './components/StartScreen';
import { gameApi } from './api/gameApi';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [sessionId] = useState(() => crypto.randomUUID());

  const [endingCollection, setEndingCollection] = useState([]);
  useEffect(() => {
    const fetchEndings = async () => {
      const result = await gameApi.getEndings();
      if (result.success) {
        setEndingCollection(result.endings);
      } else {
        console.error("Failed to load endings:", result.error);
      }
    };

    fetchEndings();
  }, []);

  const startGame = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await gameApi.startGame(sessionId);
      if (result.success) {
        setGameState(result.state);
        setMessage(null);
      }
    } catch (error) {
      setMessage({ type: 'error', text: '게임 시작 실패. 서버 접속 오류' });
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
      setMessage({ type: 'error', text: '게임 진행 실패. 오류 발생' });
    }
    setIsLoading(false);
  }, [sessionId]);

  const saveGame = useCallback(async () => {
    try {
      const result = await gameApi.saveGame(sessionId);
      if (result.success) {
        localStorage.setItem('textAdventureSave', JSON.stringify(result.saveData));
        setMessage({ type: 'success', text: '게임 저장됨!' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '저장을 실패했다.' });
    }
  }, [sessionId]);

  const loadGame = useCallback(async () => {
    const saveData = localStorage.getItem('textAdventureSave');
    if (!saveData) {
      setMessage({ type: 'error', text: '저장된 데이터가 없다.' });
      return;
    }

    setIsLoading(true);
    try {
      const result = await gameApi.loadGame(sessionId, JSON.parse(saveData));
      if (result.success) {
        setGameState(result.state);
        setMessage({ type: 'success', text: '게임을 불러왔다!' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '불러오기 실패.' });
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
          endingCollection={endingCollection}
        />
      )}
    </div>
  );
}

export default App;
