import React, { useState } from 'react';
import SceneEditor from '../editor/SceneEditor';
import ActionEditor from '../editor/ActionEditor';
import './SidePanel.css';

export default function SidePanel({
  selectedNode,
  selectedEdge,
  scenes,
  textData,
  onSceneUpdate,
  onActionUpdate,
  onCreateScene,
  onDeleteScene,
  validationResults
}) {
  const [activeTab, setActiveTab] = useState('editor');
  const [showNewScene, setShowNewScene] = useState(false);
  const [newSceneId, setNewSceneId] = useState('');

  const selectedScene = selectedNode ? scenes[selectedNode.id] : null;
  const selectedSceneText = selectedNode ? textData?.scenes?.[selectedNode.id] : null;

  const handleCreateScene = async () => {
    if (!newSceneId.trim()) return;

    await onCreateScene(newSceneId, {
      logic: {
        location: 'cell',
        actions: []
      },
      text: {
        description: '새 장면 설명',
        actions: {}
      }
    });

    setNewSceneId('');
    setShowNewScene(false);
  };

  const handleDeleteScene = async () => {
    if (!selectedNode) return;

    const confirmed = window.confirm(
      `'${selectedNode.id}' 씬을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`
    );

    if (confirmed) {
      await onDeleteScene(selectedNode.id);
    }
  };

  return (
    <aside className="side-panel">
      {/* 탭 헤더 */}
      <div className="side-panel__tabs">
        <button
          className={`tab ${activeTab === 'editor' ? 'active' : ''}`}
          onClick={() => setActiveTab('editor')}
        >
          편집
        </button>
        <button
          className={`tab ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          정보
        </button>
      </div>

      {/* 탭 내용 */}
      <div className="side-panel__content">
        {activeTab === 'editor' && (
          <>
            {/* 새 씬 생성 버튼 */}
            <div className="side-panel__actions">
              {!showNewScene ? (
                <button
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => setShowNewScene(true)}
                >
                  + 새 씬 추가
                </button>
              ) : (
                <div className="new-scene-form">
                  <input
                    type="text"
                    className="input"
                    placeholder="씬 ID (영문, 밑줄 사용)"
                    value={newSceneId}
                    onChange={(e) => setNewSceneId(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreateScene()}
                  />
                  <div className="new-scene-form__buttons">
                    <button className="btn btn-success" onClick={handleCreateScene}>
                      생성
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setShowNewScene(false);
                        setNewSceneId('');
                      }}
                    >
                      취소
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 선택된 씬/엣지 편집 */}
            {selectedNode && selectedScene ? (
              <div className="side-panel__editor">
                <SceneEditor
                  sceneId={selectedNode.id}
                  scene={selectedScene}
                  sceneText={selectedSceneText}
                  onUpdate={onSceneUpdate}
                  onDelete={handleDeleteScene}
                />
              </div>
            ) : selectedEdge ? (
              <div className="side-panel__editor">
                <ActionEditor
                  sceneId={selectedEdge.source}
                  actionId={selectedEdge.data.actionId}
                  action={
                    scenes[selectedEdge.source]?.actions?.find(
                      (a) => a.id === selectedEdge.data.actionId
                    )
                  }
                  actionText={
                    textData?.scenes?.[selectedEdge.source]?.actions?.[
                      selectedEdge.data.actionId
                    ]
                  }
                  onUpdate={onActionUpdate}
                />
              </div>
            ) : (
              <div className="side-panel__placeholder">
                <p>노드나 엣지를 선택하여 편집하세요</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'info' && (
          <div className="side-panel__info">
            {/* 통계 정보 */}
            <div className="info-section">
              <h3>통계</h3>
              <div className="info-stats">
                <div className="stat-item">
                  <span className="stat-label">총 씬</span>
                  <span className="stat-value">{Object.keys(scenes).length}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">엔딩 씬</span>
                  <span className="stat-value">
                    {Object.values(scenes).filter((s) => s.isEnding).length}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">고아 씬</span>
                  <span className="stat-value stat-value--warning">
                    {validationResults?.warnings?.filter(
                      (w) => w.type === 'orphan'
                    ).length || 0}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">오류</span>
                  <span className="stat-value stat-value--error">
                    {validationResults?.errors?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* 검증 결과 */}
            {validationResults && (
              <div className="info-section">
                <h3>검증 결과</h3>
                {validationResults.errors?.length > 0 && (
                  <ul className="validation-list">
                    {validationResults.errors.map((error, idx) => (
                      <li key={idx} className="validation-item error">
                        {error.message}
                      </li>
                    ))}
                  </ul>
                )}
                {validationResults.warnings?.length > 0 && (
                  <ul className="validation-list">
                    {validationResults.warnings.map((warning, idx) => (
                      <li key={idx} className="validation-item warning">
                        {warning.message}
                      </li>
                    ))}
                  </ul>
                )}
                {validationResults.info?.length > 0 && (
                  <ul className="validation-list">
                    {validationResults.info.map((info, idx) => (
                      <li key={idx} className="validation-item success">
                        {info.message}
                      </li>
                    ))}
                  </ul>
                )}
                {!validationResults.errors?.length &&
                  !validationResults.warnings?.length && (
                    <p className="success-message">문제 없음</p>
                  )}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
