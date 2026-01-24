/**
 * SceneBuilder - 텍스트/로직 분리 버전
 *
 * 텍스트 데이터는 JSON 파일(locales/ko.json)에서 로드
 * 로직 데이터는 JS 파일에서 정의
 */

let textData = null;
let actionCounter = 0;
let currentSceneId = "";

/**
 * 스크립트 라인을 파싱하여 narration/dialogue 객체로 변환
 * "speaker: text" → { type: "dialogue", speaker, text }
 * "text" → { type: "narration", text }
 */
const parseScript = (lines) => {
  if (!lines || !Array.isArray(lines)) return [];

  return lines.map(line => {
    if (typeof line !== 'string') return line;

    // "speaker: text" 패턴 감지 (첫 번째 ": " 기준으로 분리)
    const colonIdx = line.indexOf(': ');
    if (colonIdx > 0 && colonIdx < 20) { // speaker는 보통 짧은 이름
      const potentialSpeaker = line.substring(0, colonIdx);
      // speaker에 공백이나 특수문자가 없어야 함
      if (/^[a-z_]+$/i.test(potentialSpeaker)) {
        return {
          type: "dialogue",
          speaker: potentialSpeaker,
          text: line.substring(colonIdx + 2)
        };
      }
    }
    return { type: "narration", text: line };
  });
};

const SB = {
  /**
   * 텍스트 데이터 초기화 (앱 시작 시 한 번 호출)
   * @param {Object} data - JSON에서 로드한 텍스트 데이터
   */
  initTextData: (data) => {
    textData = data;
  },

  /**
   * 현재 장면 ID 설정 (내부용)
   */
  beginScene: (sceneId) => {
    currentSceneId = sceneId;
    actionCounter = 0;
  },

  // ===== 레거시 호환용 (기존 코드와의 호환성) =====
  n: (text) => ({ type: "narration", text }),
  d: (speaker, text) => ({ type: "dialogue", speaker, text }),

  // ===== 조건(Condition) =====
  cond: {
    has: (item) => ({ type: 'hasItem', item }),
    notHas: (item) => ({ type: 'notHasItem', item }),
    flag: (flag) => ({ type: 'flagSet', flag }),
    notFlag: (flag) => ({ type: 'flagNotSet', flag }),
    relMin: (target, value) => ({ type: 'relationMin', target, value }),
    relMax: (target, value) => ({ type: 'relationMax', target, value }),
    workMin: (value) => ({ type: 'workScoreMin', value }),
    eduMin: (value) => ({ type: 'educationScoreMin', value }),
  },

  // ===== 효과(Effect) =====
  eff: {
    getItem: (item) => ({ type: 'addItem', item }),
    drop: (item) => ({ type: 'removeItem', item }),
    flag: (flag) => ({ type: 'setFlag', flag }),
    unflag: (flag) => ({ type: 'clearFlag', flag }),
    rel: (target, amount = 1) => ({ type: 'increaseRelation', target, amount }),
    work: (amount = 1) => ({ type: 'increaseWorkScore', amount }),
    edu: (amount = 1) => ({ type: 'increaseEducationScore', amount }),
    reset: () => ({ type: 'resetGame' }),
  },

  // ===== Action 생성 (새 형식: 텍스트 없음) =====
  /**
   * 새 형식: action(nextScene, conditions?, effects?)
   * 텍스트는 defineScene에서 JSON 데이터로 주입됨
   */
  action: (nextScene, conditions = [], effects = []) => {
    actionCounter++;
    return {
      id: `${currentSceneId}_act_${actionCounter}`,
      text: null, // defineScene에서 주입
      nextScene,
      conditions,
      effects
    };
  },

  // ===== 레거시 Action 생성 (기존 형식: 텍스트 포함) =====
  /**
   * 기존 형식: actionWithText(text, nextScene, conditions?, effects?)
   * 마이그레이션 완료 전까지 기존 코드 호환용
   */
  actionWithText: (text, nextScene, conditions = [], effects = []) => {
    actionCounter++;
    return {
      id: `${currentSceneId}_act_${actionCounter}`,
      text,
      nextScene,
      conditions,
      effects
    };
  },

  // ===== Scene 정의 (새 형식) =====
  /**
   * 새 형식: defineScene(sceneId, options?, actionsFn)
   * @param {string} sceneId - 장면 ID
   * @param {Object|Function} optionsOrActions - 옵션 객체 또는 액션 함수
   * @param {Function} actionsFn - 액션 함수 (옵션이 있을 경우)
   *
   * 사용 예:
   *   defineScene("scene_id", () => [...])
   *   defineScene("scene_id", { effects: [...], isEnding: true }, () => [...])
   */
  defineScene: (sceneId, optionsOrActions, actionsFn) => {
    SB.beginScene(sceneId);

    // 인자 파싱
    let options = {};
    let actionsGenerator;

    if (typeof optionsOrActions === 'function') {
      // defineScene("id", () => [...]) 형태
      actionsGenerator = optionsOrActions;
    } else {
      // defineScene("id", { options }, () => [...]) 형태
      options = optionsOrActions || {};
      actionsGenerator = actionsFn;
    }

    // JSON에서 텍스트 데이터 가져오기
    const sceneText = textData?.scenes?.[sceneId];
    if (!sceneText && textData) {
      console.warn(`[SceneBuilder] Missing text data for scene: ${sceneId}`);
    }

    // 스크립트 파싱 (JSON → description 배열)
    const description = parseScript(sceneText?.script || []);

    // 액션 로직 생성
    const logicActions = actionsGenerator ? actionsGenerator() : [];

    // JSON의 액션 텍스트
    const jsonActions = sceneText?.actions || [];

    // 개수 불일치 경고
    if (textData && logicActions.length !== jsonActions.length) {
      console.warn(
        `[SceneBuilder] Action count mismatch for "${sceneId}": ` +
        `JSON has ${jsonActions.length}, JS has ${logicActions.length}`
      );
    }

    // 액션에 텍스트 주입
    const mergedActions = logicActions.map((act, index) => ({
      ...act,
      text: jsonActions[index] || act.text || "[텍스트 없음]"
    }));

    // 장면 객체 생성
    const scene = {
      location: sceneText?.location || options.location || "unknown",
      description,
      actions: mergedActions
    };

    // 선택적 속성 추가
    if (options.effects) {
      scene.effects = options.effects;
    }
    if (options.isEnding) {
      scene.isEnding = true;
    }

    return { [sceneId]: scene };
  },

  // ===== 레거시 Scene 정의 (기존 형식) =====
  /**
   * 기존 형식: defineSceneLegacy(sceneId, data)
   * 마이그레이션 완료 전까지 기존 코드 호환용
   */
  defineSceneLegacy: (sceneId, data) => {
    SB.beginScene(sceneId);
    return {
      [sceneId]: {
        ...data,
        actions: typeof data.actions === 'function' ? data.actions() : data.actions
      }
    };
  }
};

module.exports = SB;