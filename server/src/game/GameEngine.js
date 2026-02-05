// 시간 슬롯 상수
const TIME_SLOTS = {
  MORNING: 0,    // 아침 (기상, 준비)
  LUNCH: 1,      // 점심식사
  AFTERNOON: 2,  // 낮 (작업/운동)
  EVENING: 3,    // 저녁 (자유시간/교육)
  NIGHT: 4       // 밤 (취침)
};

const TIME_SLOT_NAMES = ['아침', '점심', '낮', '저녁', '밤'];

class GameEngine {
  constructor(gameData) {
    this.gameData = gameData;
    this.currentScene = null;
    this.inventory = [];
    this.flags = {};
    this.relations = {};
    this.history = [];
    this.visitedLocations = [];
    this.unlockedEndings = this.gameData.unlockedEndings || [];
    // 작업 성과 및 교육 점수
    this.workScore = 0;
    this.educationScore = 0;
    // 시간/일정 시스템
    this.currentDay = 1;
    this.currentTimeSlot = TIME_SLOTS.MORNING;
    this.currentLocation = "cell";
  }

  start() {
    this.currentScene = this.gameData.startScene;
    this.inventory = [...(this.gameData.startInventory || [])];
    this.flags = { ...(this.gameData.startFlags || {}) };
    this.relations = {
      ...(this.gameData.startRelations || {
        messiah: 0,
        fraudster: 0,
        wifekiller: 0,
        groper: 0,
        arsonist: 0,
        pedophile: 0,
        political: 0,
        guard: 0
      })
    };
    this.history = [];
    this.visitedLocations = [];
    this.workScore = 0;
    this.educationScore = 0;
    // 시간/일정 시스템 초기화
    this.currentDay = 1;
    this.currentTimeSlot = TIME_SLOTS.MORNING;
    this.currentLocation = "cell";

    // Execute scene effects on start
    const scene = this.gameData.scenes[this.currentScene];
    if (scene && scene.effects) {
      this.executeEffects(scene.effects);
    }

    // Mark starting location as visited
    if (scene && scene.location && !this.visitedLocations.includes(scene.location)) {
      this.visitedLocations.push(scene.location);
    }

    return this.getState();
  }

  getState() {
    const scene = this.gameData.scenes[this.currentScene];
    if (!scene) {
      return {
        error: true,
        message: 'Scene not found'
      };
    }

    const availableActions = this.getAvailableActions(scene);

    return {
      sceneId: this.currentScene,
      description: this.processText(scene.description),
      // 클라이언트에게는 ID와 텍스트만 전달
      actions: availableActions.map(a => ({
        id: a.id,
        text: this.processText(a.text)
      })),
      inventory: this.inventory,
      relations: this.relations,
      location: scene.location || null,
      visitedLocations: [...this.visitedLocations],
      isEnding: scene.isEnding || false,
      unlockedEndings: [...this.unlockedEndings],
      workScore: this.workScore,
      educationScore: this.educationScore,
      // 시간/일정 시스템 상태
      currentDay: this.currentDay,
      currentTimeSlot: this.currentTimeSlot,
      currentTimeSlotName: TIME_SLOT_NAMES[this.currentTimeSlot],
      currentLocation: this.currentLocation,
      npcsAtLocation: this.getNpcsAtCurrentLocation()
    };
  }

  getAvailableActions(scene) {
    if (!scene.actions) return [];

    // 조건에 맞는 액션들을 가져옴 (nextScene 등 전체 데이터 유지)
    let actions = scene.actions
      .filter(action => this.checkConditions(action.conditions))
      .map(action => ({ ...action })); // 원본 훼손 방지를 위해 복사

    // 허브 액션 주입: 메인 허브 장면이거나 특정 진입 장면에서만 주입 (2일차부터)
    const hubTriggerScenes = ['yard', 'cafeteria_arrival', 'workshop', 'cell_hub'];
    const isHubEntrance = scene.isHub || hubTriggerScenes.includes(this.currentScene);

    if (scene.location && isHubEntrance) {
      // 1. NPC 상호작용 추가
      const npcs = this.getNpcsAtCurrentLocation();
      const { getNpcInteraction } = require('./data/schedules/npc_schedules');

      npcs.forEach(npcId => {
        // 이미 해당 NPC와 대화하는 액션이 있는지 확인 (중복 방지)
        const alreadyHasNpc = actions.find(a =>
          a.id.includes(npcId) ||
          (typeof a.text === 'string' && a.text.includes(npcId))
        );

        if (!alreadyHasNpc) {
          const interaction = getNpcInteraction(npcId, this.currentLocation);

          if (interaction) {
            // 1일차에는 허브 상호작용을 차단하여 서사 진행 (예외 가능하게 구조 유지)
            // 단, 상호작용 데이터가 있고 특정 플래그가 있다면 허용하도록 확장 가능
            if (this.currentDay === 1) return;

            actions.push({
              id: `hub_interact_${npcId}`,
              text: `${interaction.name}에게 다가간다`,
              nextScene: interaction.scene
            });
          }
        }
      });

      // 2. 다른 장소로 이동 메뉴 추가
      if (!actions.find(a => a.id.includes('location_select') || a.nextScene === 'location_select')) {
        actions.push({
          id: 'hub_location_move',
          text: "다른 장소로 이동한다",
          nextScene: 'location_select'
        });
      }
    }

    return actions;
  }

  checkConditions(conditions) {
    if (!conditions) return true;

    for (const condition of conditions) {
      switch (condition.type) {
        case 'hasItem':
          if (!this.inventory.includes(condition.item)) return false;
          break;
        case 'notHasItem':
          if (this.inventory.includes(condition.item)) return false;
          break;
        case 'flagSet':
          if (!this.flags[condition.flag]) return false;
          break;
        case 'flagNotSet':
          if (this.flags[condition.flag]) return false;
          break;
        case 'relationMin':
          if ((this.relations[condition.target] || 0) < condition.value) return false;
          break;
        case 'relationMax':
          if ((this.relations[condition.target] || 0) > condition.value) return false;
          break;
        case 'workScoreMin':
          if (this.workScore < condition.value) return false;
          break;
        case 'educationScoreMin':
          if (this.educationScore < condition.value) return false;
          break;
        case 'npcAt':
          if (!this.isNpcAtLocation(condition.npc, condition.location || this.currentLocation)) return false;
          break;
        case 'time':
          if (this.currentTimeSlot !== condition.slot) return false;
          break;
        case 'playerAt':
          if (this.currentLocation !== condition.location) return false;
          break;
        default:
          break;
      }
    }
    return true;
  }

  performAction(actionId) {
    const scene = this.gameData.scenes[this.currentScene];
    if (!scene) {
      return { success: false, error: 'Current scene not found' };
    }

    // 중요: 정적 scene.actions가 아닌 getAvailableActions()를 통해 
    // 동적으로 주입된 액션까지 포함하여 찾습니다.
    const availableActions = this.getAvailableActions(scene);
    const action = availableActions.find(a => a.id === actionId);

    if (!action) {
      return { success: false, error: 'Action not found' };
    }

    if (!this.checkConditions(action.conditions)) {
      return { success: false, error: 'Action conditions not met' };
    }

    // Execute action effects
    if (action.effects) {
      this.executeEffects(action.effects);
    }

    // Save to history
    this.history.push({
      scene: this.currentScene,
      action: actionId,
      timestamp: Date.now()
    });

    // Move to next scene
    if (action.nextScene) {
      const nextSceneData = this.gameData.scenes[action.nextScene];
      this.currentScene = action.nextScene;

      // Update location based on next scene's location if defined
      if (nextSceneData && nextSceneData.location) {
        this.currentLocation = nextSceneData.location;
      }

      // Execute scene effects when entering new scene
      if (nextSceneData && nextSceneData.effects) {
        this.executeEffects(nextSceneData.effects);
      }

      // 엔딩 장면 도달 시 해금 목록에 추가
      if (nextSceneData && nextSceneData.isEnding) {
        if (!this.unlockedEndings.includes(this.currentScene)) {
          this.unlockedEndings.push(this.currentScene);
        }
      }

      // Mark new location as visited
      if (nextSceneData && nextSceneData.location && !this.visitedLocations.includes(nextSceneData.location)) {
        this.visitedLocations.push(nextSceneData.location);
      }

      console.log(`Transitioned to scene: ${this.currentScene} (Location: ${this.currentLocation})`);
    }

    return {
      success: true,
      message: action.resultText || null,
      state: this.getState()
    };
  }

  executeEffects(effects) {
    for (const effect of effects) {
      switch (effect.type) {
        case 'addItem':
          if (!this.inventory.includes(effect.item)) {
            this.inventory.push(effect.item);
          }
          break;
        case 'removeItem':
          this.inventory = this.inventory.filter(item => item !== effect.item);
          break;
        case 'setFlag':
          this.flags[effect.flag] = true;
          break;
        case 'clearFlag':
          this.flags[effect.flag] = false;
          break;
        case 'increaseRelation':
          this.relations[effect.target] += (effect.amount || 1);
          break;
        case 'decreaseRelation':
          this.relations[effect.target] -= (effect.amount || 1);
          break;
        case 'increaseWorkScore':
          this.workScore += (effect.amount || 1);
          break;
        case 'increaseEducationScore':
          this.educationScore += (effect.amount || 1);
          break;
        case 'advanceTime':
          this.currentTimeSlot = (this.currentTimeSlot + 1) % 5;
          if (this.currentTimeSlot === 0) {
            this.currentDay += 1;
          }
          break;
        case 'moveTo':
          this.currentLocation = effect.location;
          break;
        case 'resetGame':
          this.inventory = [];
          this.flags = {};
          this.relations = {
            ...(this.gameData.startRelations || {
              messiah: 0,
              fraudster: 0,
              wifekiller: 0,
              groper: 0,
              arsonist: 0,
              pedophile: 0,
              political: 0,
              guard: 0
            })
          };
          this.history = [];
          this.visitedLocations = [];
          this.workScore = 0;
          this.educationScore = 0;
          break;
        case 'setDay':
          this.currentDay = effect.day;
          break;
        case 'setTimeSlot':
          this.currentTimeSlot = effect.slot;
          break;
        default:
          break;
      }
    }
  }

  processText(text) {
    if (!text) return '';

    // Handle arrays recursively
    if (Array.isArray(text)) {
      return text.map(item => this.processText(item));
    }

    // Handle objects with text property
    if (typeof text === 'object' && text !== null) {
      return {
        ...text,
        text: this.processText(text.text)
      };
    }

    // Handle non-strings
    if (typeof text !== 'string') return text;

    // Replace placeholders with actual values
    let processed = text;

    // Replace {item} placeholders (escape special regex characters in item name)
    for (const item of this.inventory) {
      const escapedItem = item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      processed = processed.replace(new RegExp(`\\{${escapedItem}\\}`, 'g'), item);
    }

    return processed;
  }

  save() {
    return {
      currentScene: this.currentScene,
      inventory: [...this.inventory],
      flags: { ...this.flags },
      relations: { ...this.relations },
      history: [...this.history],
      visitedLocations: [...this.visitedLocations],
      unlockedEndings: [...this.unlockedEndings],
      workScore: this.workScore,
      educationScore: this.educationScore,
      currentDay: this.currentDay,
      currentTimeSlot: this.currentTimeSlot,
      currentLocation: this.currentLocation,
      savedAt: Date.now()
    };
  }

  load(saveData) {
    if (!saveData || !saveData.currentScene) {
      return { success: false, error: 'Invalid save data' };
    }

    if (!this.gameData.scenes[saveData.currentScene]) {
      return { success: false, error: 'Save data references unknown scene' };
    }

    this.currentScene = saveData.currentScene;
    this.inventory = saveData.inventory || [];
    this.flags = saveData.flags || {};
    this.relations = saveData.relations || {
      ...(this.gameData.startRelations || {
        messiah: 0,
        fraudster: 0,
        wifekiller: 0,
        groper: 0,
        arsonist: 0,
        pedophile: 0,
        political: 0,
        guard: 0
      })
    };
    this.history = saveData.history || [];
    this.visitedLocations = saveData.visitedLocations || [];
    this.workScore = saveData.workScore || 0;
    this.educationScore = saveData.educationScore || 0;
    this.currentDay = saveData.currentDay || 1;
    this.currentTimeSlot = saveData.currentTimeSlot || 0;
    this.currentLocation = saveData.currentLocation || "cell";
    // 현재의 엔딩 해금 목록과, 세이브 파일에 있던 해금 목록을 병합
    const savedEndings = saveData.unlockedEndings || [];
    const currentEndings = this.unlockedEndings || [];
    this.unlockedEndings = [...new Set([...currentEndings, ...savedEndings])];

    return { success: true };
  }

  // NPC 위치 관리 (npc_schedules 사용)
  getNpcsAtCurrentLocation() {
    const { getNpcsAtLocation } = require('./data/schedules/npc_schedules');
    return getNpcsAtLocation(this.currentLocation, this.currentDay, this.currentTimeSlot);
  }

  isNpcAtLocation(npcId, location) {
    const { getNpcLocation } = require('./data/schedules/npc_schedules');
    const npcLocation = getNpcLocation(npcId, this.currentDay, this.currentTimeSlot);
    return npcLocation === location;
  }
}

module.exports = GameEngine;
