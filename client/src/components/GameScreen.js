import React from 'react';

const speakerInfo = {
  guard: { name: "간수", image: "/images/characters/guard.png" },
  messiah: { name: "메시아 죄수", image: "/images/characters/messiah.png" },
  arsonist: { name: "방화범 죄수", image: "/images/characters/arsonist.png" },
  groper: { name: "치한 죄수", image: "/images/characters/groper.png" },
  fraudster: { name: "사기꾼 죄수", image: "/images/characters/fraudster.png" },
  political: { name: "정치범 죄수", image: "/images/characters/political.png" },
  wifekiller: { name: "아내 살인범 죄수", image: "/images/characters/wifekiller.png" },
  pedophile: { name: "소아성폭력범 죄수", image: "/images/characters/pedophile.png" }
};

function parseFormattedText(text) {
  // 복합 패턴을 먼저 처리, 그 다음 단일 패턴 처리
  const patterns = [
    // 복합 패턴: **[...]**, **{{...}}**, **!!...!!**
    { regex: /\*\*\[([^\]]+)\]\*\*/g, className: "text-status text-emphasis" },
    { regex: /\*\*\{\{([^}]+)\}\}\*\*/g, className: "text-item text-emphasis" },
    { regex: /\*\*!!([^!]+)!!\*\*/g, className: "text-danger text-emphasis" },
    // 단일 패턴
    { regex: /\[([^\]]+)\]/g, className: "text-status" },      // 하늘색 - 상태/플래그
    { regex: /\*\*([^*]+)\*\*/g, className: "text-emphasis" }, // 볼드 - 강조
    { regex: /\{\{([^}]+)\}\}/g, className: "text-item" },     // 금색 - 아이템
    { regex: /!!([^!]+)!!/g, className: "text-danger" },       // 빨간색 - 위험/경고
  ];

  let result = [{ text, formatted: false }];

  patterns.forEach(({ regex, className }) => {
    const newResult = [];
    result.forEach((segment) => {
      if (segment.formatted) {
        newResult.push(segment);
        return;
      }

      const str = segment.text;
      let lastIndex = 0;
      let match;
      regex.lastIndex = 0;

      while ((match = regex.exec(str)) !== null) {
        if (match.index > lastIndex) {
          newResult.push({ text: str.slice(lastIndex, match.index), formatted: false });
        }
        newResult.push({ text: match[1], formatted: true, className, key: `${className}-${match.index}` });
        lastIndex = regex.lastIndex;
      }

      if (lastIndex < str.length) {
        newResult.push({ text: str.slice(lastIndex), formatted: false });
      }
    });
    result = newResult;
  });

  return result.map((segment, index) =>
    segment.formatted
      ? <span key={segment.key || index} className={segment.className}>{segment.text}</span>
      : segment.text
  );
}

function renderDescription(description) {
  if (typeof description === 'string') {
    return <p>{parseFormattedText(description)}</p>;
  }

  if (Array.isArray(description)) {
    return description.map((item, index) => {
      if (item.type === 'narration') {
        return (
          <p key={index} className="narration">
            {parseFormattedText(item.text)}
          </p>
        );
      } else if (item.type === 'dialogue') {
        const speaker = speakerInfo[item.speaker] || { name: item.speaker, image: null };
        return (
          <div key={index} className="dialogue">
            <div className="dialogue-icon">
              {speaker.image ? (
                <img src={speaker.image} alt={speaker.name} className="speaker-image" />
              ) : (
                <span className="speaker-default">💬</span>
              )}
            </div>
            <div className="dialogue-content">
              <span className="dialogue-speaker">{speaker.name}</span>
              <p className="dialogue-text">"{parseFormattedText(item.text)}"</p>
            </div>
          </div>
        );
      }
      return null;
    });
  }

  return null;
}

function GameScreen({ gameState, onAction, onSave, onRestart, isLoading, message }) {
  const { title, description, actions, inventory, isEnding } = gameState;

  return (
    <div className="game-screen">
      <div className="game-header">
        <h2>{title}</h2>
        <div className="header-buttons">
          <button className="btn btn-secondary" onClick={onSave} disabled={isLoading}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={onRestart} disabled={isLoading}>
            Restart
          </button>
        </div>
      </div>

      <div className="game-content">
        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        {isEnding && (
          <div className="ending-badge">
            THE END
          </div>
        )}

        <div className="scene-description">
          {renderDescription(description)}
        </div>

        {isLoading ? (
          <div className="loading">Processing...</div>
        ) : (
          <div className="actions">
            {actions.map((action) => (
              <button
                key={action.id}
                className="action-btn"
                onClick={() => onAction(action.id)}
                disabled={isLoading}
              >
                {action.text}
              </button>
            ))}
          </div>
        )}

        <div className="inventory">
          <h3>Inventory</h3>
          {inventory.length > 0 ? (
            <div className="inventory-items">
              {inventory.map((item, index) => (
                <span key={index} className="inventory-item">
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p className="inventory-empty">Your inventory is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameScreen;
