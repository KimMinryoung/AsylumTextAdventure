let actionCounter = 0;
let currentSceneId = "";

const SB = {
  // 현재 작업 중인 장면의 ID를 설정 (ID 자동 생성을 위한 기준점)
  // 각 장면을 정의할 때 호출하거나, Scene 팩토리 함수 내부에서 처리
  beginScene: (sceneId) => {
    currentSceneId = sceneId;
    actionCounter = 0;
  },

  // --- Description  ---
  n: (text) => ({ type: "narration", text }),
  d: (speaker, text) => ({ type: "dialogue", speaker, text }),

  // ---  Condition  ---
  cond: {
    has: (item) => ({ type: 'hasItem', item }),
    notHas: (item) => ({ type: 'notHasItem', item }),
    flag: (flag) => ({ type: 'flagSet', flag }),
    notFlag: (flag) => ({ type: 'flagNotSet', flag }),
    relMin: (target, value) => ({ type: 'relationMin', target, value }),
    relMax: (target, value) => ({ type: 'relationMax', target, value }),
  },

  // ---  Effect ---
  eff: {
    getItem: (item) => ({ type: 'addItem', item }),
    drop: (item) => ({ type: 'removeItem', item }),
    flag: (flag) => ({ type: 'setFlag', flag }),
    unflag: (flag) => ({ type: 'clearFlag', flag }),
    rel: (target, amount = 1) => ({ type: 'increaseRelation', target, amount }),
    reset: () => ({ type: 'resetGame' }),
  },

  // --- Action ---
  /**
   * Action 생성 함수
   * @param {string} text - 선택지 텍스트
   * @param {string} nextScene - 이동할 장면 ID
   */
  action: (text, nextScene, conditions = [], effects = []) => {
    actionCounter++;
    // id는 자동 생성 (예: entrance_act_1)
    const generatedId = `${currentSceneId}_act_${actionCounter}`;
    
    return {
      id: generatedId,
      text,
      nextScene,
      conditions,
      effects
    };
  }
};

SB.defineScene = (sceneId, data) => {
  SB.beginScene(sceneId);
  return {
    [sceneId]: {
      ...data,
      // data.actions가 함수라면 실행하여 자동으로 ID 부여
      actions: typeof data.actions === 'function' ? data.actions() : data.actions
    }
  };
};

module.exports = SB;