class GameEngine {
  constructor(gameData) {
    this.gameData = gameData;
    this.currentScene = null;
    this.inventory = [];
    this.flags = {};
    this.history = [];
  }

  start() {
    this.currentScene = this.gameData.startScene;
    this.inventory = [...(this.gameData.startInventory || [])];
    this.flags = { ...(this.gameData.startFlags || {}) };
    this.history = [];

    // Execute scene effects on start
    const scene = this.gameData.scenes[this.currentScene];
    if (scene && scene.effects) {
      this.executeEffects(scene.effects);
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
      title: scene.title,
      description: this.processText(scene.description),
      actions: availableActions,
      inventory: this.inventory,
      location: scene.location || null,
      isEnding: scene.isEnding || false
    };
  }

  getAvailableActions(scene) {
    if (!scene.actions) return [];

    return scene.actions
      .filter(action => this.checkConditions(action.conditions))
      .map(action => ({
        id: action.id,
        text: this.processText(action.text)
      }));
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

    const action = scene.actions?.find(a => a.id === actionId);
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
      this.currentScene = action.nextScene;

      // Execute scene effects when entering new scene
      const nextScene = this.gameData.scenes[this.currentScene];
      if (nextScene && nextScene.effects) {
        this.executeEffects(nextScene.effects);
      }
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
        case 'resetGame':
          this.inventory = [];
          this.flags = {};
          this.history = [];
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
      history: [...this.history],
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
    this.history = saveData.history || [];

    return { success: true };
  }
}

module.exports = GameEngine;
