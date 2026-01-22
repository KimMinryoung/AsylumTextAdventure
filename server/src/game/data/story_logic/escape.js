const { cond, eff, action, defineScene } = require('../../SceneBuilder');

const scenes = {
  ...defineScene("solo_escape_prepared", () => [
    action("solo_escape_execution")
  ]),

  ...defineScene("solo_escape_execution", () => [
    action("solo_escape_sewer")
  ]),

  ...defineScene("solo_escape_sewer", () => [
    action("ending_solo_success")
  ]),

  ...defineScene("solo_escape_partial", () => [
    action("solo_partial_basement"),
    action("solo_partial_roof")
  ]),

  ...defineScene("solo_partial_basement", () => [
    action("solo_partial_duct", [cond.flag("knowVentDuct")]),
    action("solo_escape_caught")
  ]),

  ...defineScene("solo_partial_duct", () => [
    action("ending_solo_lucky")
  ]),

  ...defineScene("solo_partial_roof", () => [
    action("solo_roof_wire"),
    action("solo_escape_caught")
  ]),

  ...defineScene("solo_roof_wire", () => [
    action("solo_roof_gamble"),
    action("solo_escape_caught")
  ]),

  ...defineScene("solo_roof_gamble", () => [
    action("ending_solo_daring")
  ]),

  ...defineScene("solo_escape_unprepared", () => [
    action("solo_escape_caught")
  ]),

  ...defineScene("solo_escape_caught", () => [
    action("solitary_cell")
  ]),

  ...defineScene("solitary_cell", () => [
    action("solitary_discovery", [cond.flag("knowWallCrack")]),
    action("gameover_solitary_madness"),
    action("ending_solo_despair")
  ]),

  ...defineScene("solitary_discovery", () => [
    action("sewer_escape"),
    action("ending_solo_despair")
  ]),

  ...defineScene("sewer_escape", () => [
    action("ending_solo_redemption")
  ]),

  // 사기꾼이 매수한 간수 루트
  ...defineScene("escape_bribed_path", () => [
    action("escape_bribed_corridor")
  ]),

  ...defineScene("escape_bribed_corridor", () => [
    action("escape_bribed_exit"),
    action("escape_bribed_caught")
  ]),

  ...defineScene("escape_bribed_exit", () => [
    action("ending_bribed_escape")
  ]),

  ...defineScene("escape_bribed_caught", () => [
    action("solitary_cell")
  ]),

  // 정치범의 교란 작전 루트
  ...defineScene("escape_with_distraction", () => [
    action("escape_distraction_move")
  ]),

  ...defineScene("escape_distraction_move", () => [
    action("escape_distraction_basement"),
    action("escape_distraction_roof")
  ]),

  ...defineScene("escape_distraction_basement", () => [
    action("escape_distraction_sewer")
  ]),

  ...defineScene("escape_distraction_sewer", () => [
    action("ending_distraction_success")
  ]),

  ...defineScene("escape_distraction_roof", () => [
    action("ending_distraction_daring"),
    action("escape_distraction_caught")
  ]),

  ...defineScene("escape_distraction_caught", () => [
    action("solitary_cell")
  ])
};

module.exports = scenes;
