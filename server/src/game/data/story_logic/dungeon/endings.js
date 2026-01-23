const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

const scenes = {
  // 던전 탈출 성공 엔딩
  ...defineScene("ending_dungeon_escape", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  // 던전에서 길을 잃음 엔딩
  ...defineScene("ending_dungeon_lost", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  // 수호자에게 살해당함 엔딩
  ...defineScene("ending_guardian_death", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ])
};

module.exports = scenes;
