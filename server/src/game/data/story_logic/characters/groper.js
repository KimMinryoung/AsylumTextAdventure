const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

const scenes = {
  ...defineScene("talk_groper", () => [
    action("groper_past"),
    action("groper_info"),
    action("groper_threat"),
    action("cell_arrival", [], [eff.advanceTime()])
  ]),

  ...defineScene("groper_threat", { effects: [eff.flag("groperEnemy")] }, () => [
    action("cell_arrival", [], [eff.advanceTime()])
  ]),

  ...defineScene("groper_past", () => [
    action("first_night"),
    action("groper_info")
  ]),

  ...defineScene("groper_info", { effects: [eff.flag("knowPatrolGap")] }, () => [
    action("cell_arrival", [], [eff.advanceTime()])
  ]),

  ...defineScene("cafeteria_groper_event", { effects: [eff.flag("knowGroperDanger")] }, () => [
    action("workshop", [], [eff.advanceTime()])
  ])
};

module.exports = scenes;
