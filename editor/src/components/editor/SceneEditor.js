import React, { useState, useEffect } from 'react';
import ConditionBuilder from './ConditionBuilder';
import EffectBuilder from './EffectBuilder';
import { LOCATIONS } from '../../utils/constants';
import { summarizeEffect } from '../../utils/graphUtils';
import './SceneEditor.css';

export default function SceneEditor({
  sceneId,
  scene,
  sceneText,
  onUpdate,
  onDelete
}) {
  const [editedDescription, setEditedDescription] = useState('');
  const [editedLocation, setEditedLocation] = useState('');
  const [editedIsEnding, setEditedIsEnding] = useState(false);
  const [editedEffects, setEditedEffects] = useState([]);
  const [showEffectBuilder, setShowEffectBuilder] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // 씬 데이터 로드
  useEffect(() => {
    setEditedDescription(sceneText?.description || '');
    setEditedLocation(scene?.location || 'cell');
    setEditedIsEnding(scene?.isEnding || false);
    setEditedEffects(scene?.effects || []);
    setHasChanges(false);
  }, [sceneId, scene, sceneText]);

  // 변경 감지
  useEffect(() => {
    const descChanged = editedDescription !== (sceneText?.description || '');
    const locChanged = editedLocation !== (scene?.location || 'cell');
    const endingChanged = editedIsEnding !== (scene?.isEnding || false);
    const effectsChanged = JSON.stringify(editedEffects) !== JSON.stringify(scene?.effects || []);

    setHasChanges(descChanged || locChanged || endingChanged || effectsChanged);
  }, [editedDescription, editedLocation, editedIsEnding, editedEffects, scene, sceneText]);

  const handleSave = () => {
    onUpdate(sceneId, {
      logic: {
        location: editedLocation,
        isEnding: editedIsEnding,
        effects: editedEffects
      },
      text: {
        description: editedDescription
      }
    });
    setHasChanges(false);
  };

  const handleAddEffect = (effect) => {
    setEditedEffects([...editedEffects, effect]);
    setShowEffectBuilder(false);
  };

  const handleRemoveEffect = (index) => {
    setEditedEffects(editedEffects.filter((_, i) => i !== index));
  };

  return (
    <div className="scene-editor">
      <div className="scene-editor__header">
        <h3 className="scene-editor__title">{sceneId}</h3>
        <div className="scene-editor__actions">
          <button
            className="btn btn-danger btn-sm"
            onClick={onDelete}
            title="씬 삭제"
          >
            삭제
          </button>
        </div>
      </div>

      {/* 위치 선택 */}
      <div className="form-group">
        <label className="label">위치</label>
        <select
          className="select"
          value={editedLocation}
          onChange={(e) => setEditedLocation(e.target.value)}
        >
          {LOCATIONS.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.icon} {loc.name}
            </option>
          ))}
        </select>
      </div>

      {/* 엔딩 여부 */}
      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={editedIsEnding}
            onChange={(e) => setEditedIsEnding(e.target.checked)}
          />
          <span>엔딩 씬</span>
        </label>
      </div>

      {/* 설명 텍스트 */}
      <div className="form-group">
        <label className="label">설명</label>
        <textarea
          className="textarea"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          rows={6}
          placeholder="씬 설명을 입력하세요..."
        />
      </div>

      {/* 진입 효과 */}
      <div className="form-group">
        <label className="label">진입 효과</label>
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

      {/* 액션 목록 (읽기 전용 표시) */}
      <div className="form-group">
        <label className="label">액션 ({scene?.actions?.length || 0}개)</label>
        <div className="actions-preview">
          {scene?.actions?.map((action, index) => (
            <div key={index} className="action-preview-item">
              <span className="action-id">{action.id}</span>
              <span className="action-arrow">→</span>
              <span className="action-target">{action.nextScene}</span>
            </div>
          ))}
          {(!scene?.actions || scene.actions.length === 0) && (
            <p className="empty-message">액션 없음</p>
          )}
        </div>
        <p className="help-text">엣지를 클릭하여 액션을 편집하세요</p>
      </div>

      {/* 저장 버튼 */}
      {hasChanges && (
        <div className="scene-editor__footer">
          <button className="btn btn-primary" onClick={handleSave}>
            변경사항 저장
          </button>
        </div>
      )}
    </div>
  );
}
