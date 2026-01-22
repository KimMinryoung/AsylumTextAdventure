const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

const scenes = {
  ...defineScene("talk_wifekiller_intro", () => [
    action("gameover_wifekiller_rage"),
    action("wifekiller_story", [cond.relMin("wifekiller", 1)]),
    action("wifekiller_reject_story", [], [eff.rel("wifekiller")]),
    action("first_night")
  ]),

  ...defineScene("wifekiller_reject_story", () => [
    action("first_night")
  ]),

  ...defineScene("wifekiller_story", () => [
    action("wifekiller_bond"),
    action("first_night")
  ]),

  ...defineScene("wifekiller_bond", { effects: [eff.rel("wifekiller", 2)] }, () => [
    action("first_night")
  ]),

  ...defineScene("talk_wifekiller", () => [
    action("wifekiller_story_day2", [cond.relMin("wifekiller", 2)], [eff.rel("wifekiller")]),
    action("wifekiller_sympathy", [], [eff.rel("wifekiller")]),
    action("cafeteria_arrival")
  ]),

  ...defineScene("wifekiller_story_day2", { effects: [eff.rel("wifekiller", 2)] }, () => [
    action("cafeteria_arrival")
  ]),

  ...defineScene("wifekiller_sympathy", () => [
    action("cafeteria_arrival")
  ]),

  ...defineScene("wifekiller_final_help", { effects: [eff.flag("knowEmergencyExit")] }, () => [
    action("day_three_afternoon")
  ])
};

module.exports = scenes;
