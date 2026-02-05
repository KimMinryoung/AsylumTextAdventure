const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

const scenes = {
  ...defineScene("talk_wifekiller_intro", () => [
    action("gameover_wifekiller_rage"),
    action("wifekiller_story", [cond.relMin("wifekiller", 1)]),
    action("wifekiller_reject_story", [], [eff.rel("wifekiller")]),
    action("cell_hub", [], [eff.advanceTime()])
  ]),

  ...defineScene("wifekiller_reject_story", () => [
    action("cell_hub", [], [eff.advanceTime()])
  ]),

  ...defineScene("wifekiller_story", () => [
    action("wifekiller_bond"),
    action("cell_hub", [], [eff.advanceTime()])
  ]),

  ...defineScene("wifekiller_bond", { effects: [eff.rel("wifekiller", 2)] }, () => [
    action("cell_hub", [], [eff.advanceTime()])
  ]),

  ...defineScene("talk_wifekiller", () => [
    action("wifekiller_story_day2", [cond.relMin("wifekiller", 2)], [eff.rel("wifekiller")]),
    action("wifekiller_sympathy", [], [eff.rel("wifekiller")]),
    action("workshop", [], [eff.advanceTime()])
  ]),

  ...defineScene("wifekiller_story_day2", { effects: [eff.rel("wifekiller", 2)] }, () => [
    action("workshop", [], [eff.advanceTime()])
  ]),

  ...defineScene("wifekiller_sympathy", () => [
    action("workshop", [], [eff.advanceTime()])
  ]),

  ...defineScene("wifekiller_final_help", { effects: [eff.flag("knowEmergencyExit")] }, () => [
    action("cell_hub", [], [eff.advanceTime()])
  ])
};

module.exports = scenes;
