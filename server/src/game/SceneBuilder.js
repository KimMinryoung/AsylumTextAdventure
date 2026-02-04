/**
 * SceneBuilder - 텍스트/로직 분리 버전
 *
 * 텍스트 데이터는 JSON 파일(locales/ko.json)에서 로드
 * 로직 데이터는 JS 파일에서 정의
 */

let textData = null;
let actionCounter = 0;
let currentSceneId = "";

const sceneDefinitions = new Map();
const legacyDefinitions = new Map();

/**
 * 스크립트 라인을 파싱하여 narration/dialogue 객체로 변환
 */
const parseScript = (lines) => {
  if (!lines || !Array.isArray(lines)) return [];

  return lines.map(line => {
    if (typeof line !== 'string') return line;

    // "speaker: text" 패턴 감지
    const colonIdx = line.indexOf(': ');
    if (colonIdx > 0 && colonIdx < 20) {
      const potentialSpeaker = line.substring(0, colonIdx);
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

const internalBake = (sceneId, options, actionsGenerator) => {
  SB.beginScene(sceneId);

  // JSON에서 텍스트 데이터 가져오기
  const sceneText = textData?.scenes?.[sceneId];
  if (!sceneText && textData) {
    console.warn(`[SceneBuilder] Missing text data for scene: ${sceneId}`);
  }

  // 스크립트 파싱
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
  const mergedActions = logicActions.map((act, index) => {
    // 1. 만약 act에 이미 전용 텍스트가 있다면 그대로 사용
    if (act.text) return act;

    // 2. JSON에서 해당 인덱스의 텍스트 가져오기
    let text = jsonActions[index];

    // 3. 특별 처리: npcAt 조건이 있는 액션은 해당 NPC 이름을 텍스트로 사용 (폴백)
    if (!text && act.conditions) {
      const npcAtCond = act.conditions.find(c => c.type === 'npcAt');
      if (npcAtCond) {
        text = `${npcAtCond.npc}에게 다가간다`;
      }
    }

    return {
      ...act,
      text: text || "[텍스트 없음]"
    };
  });

  // 장면 객체 생성
  const scene = {
    location: sceneText?.location || options.location || "unknown",
    description,
    actions: mergedActions
  };

  if (options.effects) scene.effects = options.effects;
  if (options.isEnding) scene.isEnding = true;

  return { [sceneId]: scene };
};

const internalBakeLegacy = (sceneId, data) => {
  SB.beginScene(sceneId);
  return {
    [sceneId]: {
      ...data,
      actions: typeof data.actions === 'function' ? data.actions() : data.actions
    }
  };
};

const SB = {
  initTextData: (data) => {
    textData = data;
  },

  beginScene: (sceneId) => {
    currentSceneId = sceneId;
    actionCounter = 0;
  },

  // ===== 레거시 호환용 =====
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
    npcAt: (npc, location) => ({ type: 'npcAt', npc, location }),
    time: (slot) => ({ type: 'time', slot }),
    playerAt: (location) => ({ type: 'playerAt', location })
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
    advanceTime: () => ({ type: 'advanceTime' }),
    moveTo: (location) => ({ type: 'moveTo', location }),
    reset: () => ({ type: 'resetGame' }),
  },

  action: (nextScene, conditions = [], effects = []) => {
    actionCounter++;
    return {
      id: `${currentSceneId}_act_${actionCounter}`,
      text: null,
      nextScene,
      conditions,
      effects
    };
  },

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

  defineScene: (sceneId, optionsOrActions, actionsFn) => {
    let options = {};
    let actionsGenerator;

    if (typeof optionsOrActions === 'function') {
      actionsGenerator = optionsOrActions;
    } else {
      options = optionsOrActions || {};
      actionsGenerator = actionsFn;
    }

    // Save definition for later re-baking
    sceneDefinitions.set(sceneId, { options, actionsGenerator });

    return internalBake(sceneId, options, actionsGenerator);
  },

  defineSceneLegacy: (sceneId, data) => {
    legacyDefinitions.set(sceneId, data);
    return internalBakeLegacy(sceneId, data);
  },

  rebuildAll: () => {
    const allScenes = {};

    // Re-bake modern scenes
    for (const [id, def] of sceneDefinitions.entries()) {
      Object.assign(allScenes, internalBake(id, def.options, def.actionsGenerator));
    }

    // Re-bake legacy scenes
    for (const [id, data] of legacyDefinitions.entries()) {
      Object.assign(allScenes, internalBakeLegacy(id, data));
    }

    return allScenes;
  }
};

module.exports = SB;
