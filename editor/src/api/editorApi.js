const API_BASE = '/api/visual-editor';

/**
 * API 요청 래퍼
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const response = await fetch(url, { ...defaultOptions, ...options });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * 모든 씬 데이터 조회
 */
export async function getScenes() {
  return request('/scenes');
}

/**
 * 새 씬 생성
 */
export async function createScene(sceneId, sceneData) {
  return request('/scene', {
    method: 'POST',
    body: JSON.stringify({ sceneId, ...sceneData })
  });
}

/**
 * 씬 수정
 */
export async function updateScene(sceneId, updates) {
  return request(`/scene/${encodeURIComponent(sceneId)}`, {
    method: 'PUT',
    body: JSON.stringify(updates)
  });
}

/**
 * 씬 삭제
 */
export async function deleteScene(sceneId) {
  return request(`/scene/${encodeURIComponent(sceneId)}`, {
    method: 'DELETE'
  });
}

/**
 * 액션 추가
 */
export async function createAction(sceneId, actionData) {
  return request('/action', {
    method: 'POST',
    body: JSON.stringify({ sceneId, ...actionData })
  });
}

/**
 * 액션 수정
 */
export async function updateAction(sceneId, actionId, updates) {
  return request(`/action/${encodeURIComponent(sceneId)}/${encodeURIComponent(actionId)}`, {
    method: 'PUT',
    body: JSON.stringify(updates)
  });
}

/**
 * 액션 삭제
 */
export async function deleteAction(sceneId, actionId) {
  return request(`/action/${encodeURIComponent(sceneId)}/${encodeURIComponent(actionId)}`, {
    method: 'DELETE'
  });
}

/**
 * 검증 실행
 */
export async function validate() {
  return request('/validate');
}

/**
 * 파일에 저장
 */
export async function saveToFiles() {
  return request('/save', {
    method: 'POST'
  });
}
