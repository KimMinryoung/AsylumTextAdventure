import React from 'react';

function StartScreen({ onStartGame, onLoadGame, isLoading, message }) {
  return (
    <div className="start-screen">
      <h1>수용소 탈출기</h1>
      <p>미친 수용소에서 자유를 되찾을 길을 찾자</p>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="button-group">
        <button
          className="btn btn-primary"
          onClick={onStartGame}
          disabled={isLoading}
        >
          {isLoading ? '로딩...' : '새 게임'}
        </button>
        <button
          className="btn btn-secondary"
          onClick={onLoadGame}
          disabled={isLoading}
        >
          {isLoading ? '로딩...' : '불러오기'}
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
