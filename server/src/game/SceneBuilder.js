const SB = {
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
  action: (id, text, nextScene, conditions = [], effects = []) => ({
    id,
    text,
    nextScene,
    conditions,
    effects
  })
};

module.exports = SB;