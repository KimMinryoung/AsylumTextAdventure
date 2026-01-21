const { cond, eff, action, defineScene } = require('../../SceneBuilder');

const scenes = {
  ...defineScene("ending_messiah_enhanced", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  ...defineScene("ending_messiah_route", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  ...defineScene("ending_fraudster_route", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  ...defineScene("ending_arsonist_safe", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  ...defineScene("ending_arsonist_route", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  ...defineScene("ending_warden_route", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  ...defineScene("ending_wall_route", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  ...defineScene("ending_emergency_route", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  ...defineScene("ending_solo_success", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  ...defineScene("ending_solo_lucky", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  ...defineScene("ending_solo_daring", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  ...defineScene("ending_solo_redemption", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  ...defineScene("ending_solo_despair", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  ...defineScene("ending_surrender", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  ...defineScene("gameover_solitary_madness", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  ...defineScene("gameover_messiah_followers", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  ...defineScene("gameover_burned_alive", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  ...defineScene("gameover_groper_trap", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  ...defineScene("gameover_guard_murder", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  ...defineScene("gameover_wifekiller_rage", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ])
};

module.exports = scenes;
