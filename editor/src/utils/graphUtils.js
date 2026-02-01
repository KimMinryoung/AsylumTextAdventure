import dagre from 'dagre';
import { GRAPH_CONFIG, LOCATIONS } from './constants';

/**
 * Scene 데이터를 React Flow 노드로 변환
 */
export function scenesToNodes(scenes, textData, orphanScenes = new Set()) {
  const nodes = [];

  Object.entries(scenes).forEach(([sceneId, scene]) => {
    const sceneText = textData?.scenes?.[sceneId] || {};
    const location = scene.location || 'unknown';
    const locationInfo = LOCATIONS.find(l => l.id === location);

    // 노드 타입 결정
    let nodeType = 'normal';
    if (sceneId === 'entrance' || sceneId.includes('intro')) {
      nodeType = 'entrance';
    } else if (scene.isEnding) {
      nodeType = 'ending';
    } else if (orphanScenes.has(sceneId)) {
      nodeType = 'orphan';
    }

    nodes.push({
      id: sceneId,
      type: 'sceneNode',
      position: { x: 0, y: 0 }, // dagre가 계산
      data: {
        sceneId,
        location,
        locationIcon: locationInfo?.icon || '📍',
        locationName: locationInfo?.name || location,
        description: sceneText.description || '',
        nodeType,
        isEnding: scene.isEnding || false,
        effects: scene.effects || [],
        actionsCount: scene.actions?.length || 0
      }
    });
  });

  return nodes;
}

/**
 * Scene 액션을 React Flow 엣지로 변환
 */
export function scenesToEdges(scenes, textData) {
  const edges = [];

  Object.entries(scenes).forEach(([sceneId, scene]) => {
    if (!scene.actions) return;

    const sceneText = textData?.scenes?.[sceneId] || {};
    const actionTexts = sceneText.actions || {};

    scene.actions.forEach((action, index) => {
      if (!action.nextScene) return;

      const edgeId = `${sceneId}-${action.id || index}-${action.nextScene}`;
      const actionText = actionTexts[action.id] || action.id || `Action ${index + 1}`;

      edges.push({
        id: edgeId,
        source: sceneId,
        target: action.nextScene,
        type: 'actionEdge',
        animated: action.conditions?.length > 0,
        data: {
          actionId: action.id || index,
          actionText: truncateText(actionText, 30),
          conditions: action.conditions || [],
          effects: action.effects || [],
          hasCondition: action.conditions?.length > 0,
          hasEffect: action.effects?.length > 0
        }
      });
    });
  });

  return edges;
}

/**
 * Dagre를 사용한 자동 레이아웃 계산
 */
export function calculateLayout(nodes, edges) {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({
    rankdir: GRAPH_CONFIG.rankDir,
    ranksep: GRAPH_CONFIG.rankSep,
    nodesep: GRAPH_CONFIG.nodeSep
  });

  // 노드 추가
  nodes.forEach(node => {
    dagreGraph.setNode(node.id, {
      width: GRAPH_CONFIG.nodeWidth,
      height: GRAPH_CONFIG.nodeHeight
    });
  });

  // 엣지 추가
  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // 레이아웃 계산
  dagre.layout(dagreGraph);

  // 계산된 위치를 노드에 적용
  const layoutedNodes = nodes.map(node => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - GRAPH_CONFIG.nodeWidth / 2,
        y: nodeWithPosition.y - GRAPH_CONFIG.nodeHeight / 2
      }
    };
  });

  return { nodes: layoutedNodes, edges };
}

/**
 * 텍스트 truncate 유틸리티
 */
export function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Scene에서 모든 연결된 Scene ID 추출
 */
export function getConnectedSceneIds(scenes) {
  const connected = new Set();

  // entrance에서 시작하여 BFS로 탐색
  const queue = ['entrance'];
  const visited = new Set();

  while (queue.length > 0) {
    const current = queue.shift();
    if (visited.has(current)) continue;
    visited.add(current);
    connected.add(current);

    const scene = scenes[current];
    if (!scene?.actions) continue;

    scene.actions.forEach(action => {
      if (action.nextScene && !visited.has(action.nextScene)) {
        queue.push(action.nextScene);
      }
    });
  }

  return connected;
}

/**
 * 고아 씬 탐지 (entrance에서 도달 불가능한 씬)
 */
export function findOrphanScenes(scenes) {
  const allSceneIds = new Set(Object.keys(scenes));
  const connectedSceneIds = getConnectedSceneIds(scenes);

  const orphans = new Set();
  allSceneIds.forEach(id => {
    if (!connectedSceneIds.has(id)) {
      orphans.add(id);
    }
  });

  return orphans;
}

/**
 * 끊어진 링크 탐지 (존재하지 않는 씬을 가리키는 액션)
 */
export function findBrokenLinks(scenes) {
  const allSceneIds = new Set(Object.keys(scenes));
  const brokenLinks = [];

  Object.entries(scenes).forEach(([sceneId, scene]) => {
    if (!scene.actions) return;

    scene.actions.forEach(action => {
      if (action.nextScene && !allSceneIds.has(action.nextScene)) {
        brokenLinks.push({
          fromScene: sceneId,
          actionId: action.id,
          missingScene: action.nextScene
        });
      }
    });
  });

  return brokenLinks;
}

/**
 * 씬 필터링 유틸리티
 */
export function filterScenes(scenes, filter) {
  if (!filter) return scenes;

  const { location, hasEnding, search } = filter;

  return Object.fromEntries(
    Object.entries(scenes).filter(([sceneId, scene]) => {
      // 위치 필터
      if (location && scene.location !== location) return false;

      // 엔딩 필터
      if (hasEnding !== undefined && scene.isEnding !== hasEnding) return false;

      // 검색어 필터
      if (search) {
        const searchLower = search.toLowerCase();
        if (!sceneId.toLowerCase().includes(searchLower)) return false;
      }

      return true;
    })
  );
}

/**
 * 조건 요약 텍스트 생성
 * 서버 형식: { type, item, flag, target, value, ... }
 * 에디터 형식: { type, params: [...] }
 */
export function summarizeCondition(condition) {
  if (!condition) return '?';

  const { type } = condition;
  // params 배열 또는 개별 속성 지원
  const p = condition.params;

  switch (type) {
    // 서버 형식
    case 'hasItem':
      return `📦 ${condition.item || p?.[0] || '?'} 보유`;
    case 'notHasItem':
      return `📦 ${condition.item || p?.[0] || '?'} 없음`;
    case 'flagSet':
      return `🚩 ${condition.flag || p?.[0] || '?'}`;
    case 'flagNotSet':
      return `🚩 !${condition.flag || p?.[0] || '?'}`;
    case 'relationMin':
      return `👤 ${condition.target || '?'} >= ${condition.value || '?'}`;
    case 'relationMax':
      return `👤 ${condition.target || '?'} <= ${condition.value || '?'}`;
    case 'workScoreMin':
      return `🔧 작업 >= ${condition.value || '?'}`;
    case 'educationScoreMin':
      return `📚 교육 >= ${condition.value || '?'}`;
    // 에디터 형식 (params 배열)
    case 'noItem':
      return `📦 ${p?.[0] || '?'} 없음`;
    case 'hasFlag':
      return `🚩 ${p?.[0] || '?'}`;
    case 'noFlag':
      return `🚩 !${p?.[0] || '?'}`;
    case 'rel':
      return `👤 ${p?.[0] || '?'} ${p?.[1] || ''} ${p?.[2] || ''}`;
    case 'visited':
      return `📍 ${p?.[0] || '?'} 방문`;
    case 'day':
      return `📅 day ${p?.[0] || ''} ${p?.[1] || ''}`;
    case 'random':
      return `🎲 ${(p?.[0] || 0) * 100}%`;
    default:
      return type || '?';
  }
}

/**
 * 효과 요약 텍스트 생성
 * 서버 형식: { type, item, flag, target, amount, ... }
 * 에디터 형식: { type, params: [...] }
 */
export function summarizeEffect(effect) {
  if (!effect) return '?';

  const { type } = effect;
  // params 배열 또는 개별 속성 지원
  const p = effect.params;

  switch (type) {
    // 서버 형식
    case 'addItem':
      return `+📦 ${effect.item || p?.[0] || '?'}`;
    case 'removeItem':
      return `-📦 ${effect.item || p?.[0] || '?'}`;
    case 'setFlag':
      return `+🚩 ${effect.flag || p?.[0] || '?'}`;
    case 'clearFlag':
      return `-🚩 ${effect.flag || p?.[0] || '?'}`;
    case 'increaseRelation':
      const amt = effect.amount || 0;
      const sign = amt >= 0 ? '+' : '';
      return `👤 ${effect.target || '?'} ${sign}${amt}`;
    case 'increaseWorkScore':
      return `🔧 작업 +${effect.amount || 1}`;
    case 'increaseEducationScore':
      return `📚 교육 +${effect.amount || 1}`;
    case 'resetGame':
      return `🔄 리셋`;
    // 에디터 형식 (params 배열)
    case 'rel':
      const delta = p?.[1] || 0;
      const s = delta >= 0 ? '+' : '';
      return `👤 ${p?.[0] || '?'} ${s}${delta}`;
    case 'setLocation':
      return `📍→ ${p?.[0] || '?'}`;
    case 'unlockEnding':
      return `🏆 ${p?.[0] || '?'}`;
    default:
      return type || '?';
  }
}
