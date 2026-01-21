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
    action("ending_solo_despair")
  ]),

  ...defineScene("solitary_discovery", () => [
    action("sewer_escape"),
    action("ending_solo_despair")
  ]),

  ...defineScene("sewer_escape", () => [
    action("ending_solo_redemption")
  ])
};

module.exports = scenes;
