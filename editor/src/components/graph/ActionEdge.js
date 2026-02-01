import React, { memo } from 'react';
import { getBezierPath, EdgeLabelRenderer } from 'reactflow';
import './ActionEdge.css';

function ActionEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
  markerEnd
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  const { actionText, hasCondition, hasEffect } = data || {};

  // 엣지 색상 결정
  let strokeColor = '#6b7280'; // 기본 회색
  if (selected) {
    strokeColor = '#e94560'; // 선택됨: 빨강
  } else if (hasCondition) {
    strokeColor = '#60a5fa'; // 조건 있음: 파랑
  } else if (hasEffect) {
    strokeColor = '#4ade80'; // 효과 있음: 초록
  }

  return (
    <>
      <path
        id={id}
        className={`react-flow__edge-path ${selected ? 'selected' : ''}`}
        d={edgePath}
        style={{ stroke: strokeColor }}
        markerEnd={markerEnd}
      />

      {/* 엣지 라벨 */}
      <EdgeLabelRenderer>
        <div
          className={`edge-label ${hasCondition ? 'has-condition' : ''} ${hasEffect ? 'has-effect' : ''}`}
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all'
          }}
        >
          {/* 아이콘 표시 */}
          {hasCondition && <span className="edge-icon condition" title="조건 있음">🔒</span>}
          {hasEffect && <span className="edge-icon effect" title="효과 있음">⚡</span>}

          {/* 액션 텍스트 (짧게) */}
          {actionText && (
            <span className="edge-text" title={actionText}>
              {actionText}
            </span>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default memo(ActionEdge);
