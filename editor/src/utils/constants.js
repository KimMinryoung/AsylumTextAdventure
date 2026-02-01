// NPC 목록
export const NPCS = [
  { id: 'messiah', name: '구세주', description: '자신을 구세주라 믿는 환자' },
  { id: 'fraudster', name: '사기꾼', description: '말재주가 좋은 사기꾼' },
  { id: 'wifekiller', name: '아내살해범', description: '아내를 살해한 남자' },
  { id: 'groper', name: '치한', description: '성범죄자' },
  { id: 'arsonist', name: '방화범', description: '불을 좋아하는 방화범' },
  { id: 'pedophile', name: '소아성애자', description: '아동 성범죄자' },
  { id: 'political', name: '정치범', description: '정치적 이유로 수감된 자' },
  { id: 'guard', name: '간수', description: '수용소 간수' }
];

// 위치 목록
export const LOCATIONS = [
  { id: 'roof', name: '옥상', icon: '🏢' },
  { id: 'yard', name: '운동장', icon: '🌳' },
  { id: 'corridor', name: '복도', icon: '🚪' },
  { id: 'workshop', name: '작업실', icon: '🔧' },
  { id: 'cell', name: '감방', icon: '🛏️' },
  { id: 'cafeteria', name: '식당', icon: '🍽️' },
  { id: 'solitary', name: '독방', icon: '⛓️' },
  { id: 'basement', name: '지하실', icon: '🔦' },
  { id: 'sewer', name: '하수도', icon: '🕳️' }
];

// 조건 타입
export const CONDITION_TYPES = [
  { id: 'hasItem', label: '아이템 보유', params: ['itemId'] },
  { id: 'noItem', label: '아이템 미보유', params: ['itemId'] },
  { id: 'hasFlag', label: '플래그 설정됨', params: ['flagName'] },
  { id: 'noFlag', label: '플래그 미설정', params: ['flagName'] },
  { id: 'rel', label: '관계도 조건', params: ['npcId', 'operator', 'value'] },
  { id: 'visited', label: '장소 방문함', params: ['locationId'] },
  { id: 'day', label: '날짜 조건', params: ['operator', 'value'] },
  { id: 'random', label: '랜덤 확률', params: ['probability'] }
];

// 효과 타입
export const EFFECT_TYPES = [
  { id: 'addItem', label: '아이템 획득', params: ['itemId'] },
  { id: 'removeItem', label: '아이템 제거', params: ['itemId'] },
  { id: 'setFlag', label: '플래그 설정', params: ['flagName'] },
  { id: 'clearFlag', label: '플래그 해제', params: ['flagName'] },
  { id: 'rel', label: '관계도 변경', params: ['npcId', 'delta'] },
  { id: 'setLocation', label: '위치 이동', params: ['locationId'] },
  { id: 'unlockEnding', label: '엔딩 해금', params: ['endingId'] }
];

// 비교 연산자
export const OPERATORS = [
  { id: '>=', label: '>=' },
  { id: '>', label: '>' },
  { id: '<=', label: '<=' },
  { id: '<', label: '<' },
  { id: '==', label: '==' },
  { id: '!=', label: '!=' }
];

// 알려진 아이템 목록 (스토리에서 추출)
export const KNOWN_ITEMS = [
  'key', 'rope', 'knife', 'flashlight', 'map', 'tool',
  'wire', 'medicine', 'food', 'water', 'disguise',
  'guard_uniform', 'basement_key', 'sewer_map'
];

// 알려진 플래그 목록
export const KNOWN_FLAGS = [
  'intro_complete', 'met_messiah', 'met_fraudster', 'met_wifekiller',
  'met_groper', 'met_arsonist', 'met_pedophile', 'met_political',
  'escape_route_known', 'basement_unlocked', 'sewer_access',
  'trusted_by_guard', 'found_secret', 'riot_started'
];

// 노드 색상 설정
export const NODE_COLORS = {
  entrance: {
    border: '#4ade80',
    background: 'linear-gradient(135deg, #0f3460, rgba(74, 222, 128, 0.2))'
  },
  ending: {
    border: '#ef4444',
    background: 'linear-gradient(135deg, #0f3460, rgba(239, 68, 68, 0.2))'
  },
  orphan: {
    border: '#fbbf24',
    background: 'linear-gradient(135deg, #0f3460, rgba(251, 191, 36, 0.2))'
  },
  normal: {
    border: '#2a2a4a',
    background: '#0f3460'
  }
};

// 그래프 레이아웃 설정
export const GRAPH_CONFIG = {
  nodeWidth: 180,
  nodeHeight: 80,
  rankSep: 100,
  nodeSep: 50,
  rankDir: 'TB' // Top to Bottom
};
