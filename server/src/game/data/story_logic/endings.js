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
  ]),

  // 사기꾼 매수 탈출 엔딩
  ...defineScene("ending_bribed_escape", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  // 정치범 교란 탈출 엔딩들
  ...defineScene("ending_distraction_success", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  ...defineScene("ending_distraction_daring", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  // === TRUE ADMIN 신규 엔딩들 ===
  // 엔딩 N: 대해방
  ...defineScene("ending_mass_liberation", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  // 엔딩 O: 유령 프로토콜
  ...defineScene("ending_ghost_protocol", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  // 엔딩 P: 디지털 복수
  ...defineScene("ending_vengeance", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  // 엔딩 T: 폭로자
  ...defineScene("ending_whistleblower", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ])
};

module.exports = scenes;
