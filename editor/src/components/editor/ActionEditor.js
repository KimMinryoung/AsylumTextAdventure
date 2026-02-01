import React, { useState, useEffect } from 'react';
import ConditionBuilder from './ConditionBuilder';
import EffectBuilder from './EffectBuilder';
import { summarizeCondition, summarizeEffect } from '../../utils/graphUtils';
import './ActionEditor.css';

export default function ActionEditor({
  sceneId,
  actionId,
  action,
  actionText,
  onUpdate
}) {
  const [editedText, setEditedText] = useState('');
  const [editedNextScene, setEditedNextScene] = useState('');
  const [editedConditions, setEditedConditions] = useState([]);
  const [editedEffects, setEditedEffects] = useState([]);
  const [showConditionBuilder, setShowConditionBuilder] = useState(false);
  const [showEffectBuilder, setShowEffectBuilder] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // 액션 데이터 로드
  useEffect(() => {
    setEditedText(actionText || actionId || '');
    setEditedNextScene(action?.nextScene || '');
    setEditedConditions(action?.conditions || []);
    setEditedEffects(action?.effects || []);
    setHasChanges(false);
  }, [sceneId, actionId, action, actionText]);

  // 변경 감지
  useEffect(() => {
    const textChanged = editedText !== (actionText || actionId || '');
    const nextSceneChanged = editedNextScene !== (action?.nextScene || '');
    const conditionsChanged = JSON.stringify(editedConditions) !== JSON.stringify(action?.conditions || []);
    const effectsChanged = JSON.stringify(editedEffects) !== JSON.stringify(action?.effects || []);

    setHasChanges(textChanged || nextSceneChanged || conditionsChanged || effectsChanged);
  }, [editedText, editedNextScene, editedConditions, editedEffects, action, actionText, actionId]);

  const handleSave = () => {
    onUpdate(sceneId, actionId, {
      logic: {
        nextScene: editedNextScene,
        conditions: editedConditions,
        effects: editedEffects
      },
      text: editedText
    });
    setHasChanges(false);
  };

  // 조건 관리
  const handleAddCondition = (condition) => {
    setEditedConditions([...editedConditions, condition]);
    setShowConditionBuilder(false);
  };

  const handleRemoveCondition = (index) => {
    setEditedConditions(editedConditions.filter((_, i) => i !== index));
  };

  // 효과 관리
  const handleAddEffect = (effect) => {
    setEditedEffects([...editedEffects, effect]);
    setShowEffectBuilder(false);
  };

  const handleRemoveEffect = (index) => {
    setEditedEffects(editedEffects.filter((_, i) => i !== index));
  };

  if (!action) {
    return (
      <div className="action-editor">
        <p className="empty-message">액션을 찾을 수 없습니다</p>
      </div>
    );
  }

  return (
    <div className="action-editor">
      <div className="action-editor__header">
        <h3 className="action-editor__title">액션 편집</h3>
        <div className="action-editor__subtitle">
          {sceneId} → {action.nextScene}
        </div>
      </div>

      {/* 액션 ID */}
      <div className="form-group">
        <label className="label">액션 ID</label>
        <input
          type="text"
          className="input"
          value={actionId}
          disabled
        />
      </div>

      {/* 액션 텍스트 */}
      <div className="form-group">
        <label className="label">선택지 텍스트</label>
        <textarea
          className="textarea"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          rows={3}
          placeholder="플레이어에게 표시될 선택지 텍스트..."
        />
      </div>

      {/* 다음 씬 */}
      <div className="form-group">
        <label className="label">다음 씬</label>
        <input
          type="text"
          className="input"
          value={editedNextScene}
          onChange={(e) => setEditedNextScene(e.target.value)}
          placeholder="다음 씬 ID..."
        />
      </div>

      {/* 조건 */}
      <div className="form-group">
        <label className="label">표시 조건</label>
        <div className="conditions-list">
          {editedConditions.map((condition, index) => (
            <div key={index} className="condition-item">
              <span className="chip condition">{summarizeCondition(condition)}</span>
              <button
                className="remove-btn"
                onClick={() => handleRemoveCondition(index)}
              >
                ×
              </button>
            </div>
          ))}
          {editedConditions.length === 0 && (
            <p className="empty-message">조건 없음 (항상 표시)</p>
          )}
        </div>

        {showConditionBuilder ? (
          <ConditionBuilder
            onAdd={handleAddCondition}
            onCancel={() => setShowConditionBuilder(false)}
          />
        ) : (
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowConditionBuilder(true)}
          >
            + 조건 추가
          </button>
        )}
      </div>

      {/* 효과 */}
      <div className="form-group">
        <label className="label">실행 효과</label>
        <div className="effects-list">
          {editedEffects.map((effect, index) => (
            <div key={index} className="effect-item">
              <span className="chip effect">{summarizeEffect(effect)}</span>
              <button
                className="remove-btn"
                onClick={() => handleRemoveEffect(index)}
              >
                ×
              </button>
            </div>
          ))}
          {editedEffects.length === 0 && (
            <p className="empty-message">효과 없음</p>
          )}
        </div>

        {showEffectBuilder ? (
          <EffectBuilder
            onAdd={handleAddEffect}
            onCancel={() => setShowEffectBuilder(false)}
          />
        ) : (
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowEffectBuilder(true)}
          >
            + 효과 추가
          </button>
        )}
      </div>

      {/* 저장 버튼 */}
      {hasChanges && (
        <div className="action-editor__footer">
          <button className="btn btn-primary" onClick={handleSave}>
            변경사항 저장
          </button>
        </div>
      )}
    </div>
  );
}
