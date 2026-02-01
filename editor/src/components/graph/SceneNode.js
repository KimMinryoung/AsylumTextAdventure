import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import './SceneNode.css';

function SceneNode({ data, selected }) {
  const {
    sceneId,
    locationIcon,
    locationName,
    nodeType,
    isEnding,
    actionsCount
  } = data;

  // 노드 클래스 결정
  const nodeClass = `scene-node ${nodeType} ${selected ? 'selected' : ''}`;

  return (
    <div className={nodeClass}>
      {/* 입력 핸들 */}
      <Handle
        type="target"
        position={Position.Top}
        className="scene-node__handle"
      />

      {/* 노드 내용 */}
      <div className="scene-node__content">
        <div className="scene-node__header" title={sceneId}>
          {sceneId}
        </div>

        <div className="scene-node__location">
          <span>{locationIcon}</span>
          <span>{locationName}</span>
        </div>

        {/* 뱃지 */}
        <div className="scene-node__badges">
          {nodeType === 'entrance' && (
            <span className="scene-node__badge entrance">시작</span>
          )}
          {isEnding && (
            <span className="scene-node__badge ending">엔딩</span>
          )}
          {nodeType === 'orphan' && (
            <span className="scene-node__badge orphan">고아</span>
          )}
        </div>

        {/* 액션 수 */}
        {actionsCount > 0 && (
          <div className="scene-node__actions-count">
            {actionsCount}개 선택지
          </div>
        )}
      </div>

      {/* 출력 핸들 */}
      {!isEnding && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="scene-node__handle"
        />
      )}
    </div>
  );
}

export default memo(SceneNode);
