const { cond, eff, action, defineScene } = require('../../SceneBuilder');

const scenes = {
  ...defineScene("entrance", () => [
    action("entrance_beg"),
    action("entrance_stare", [], [eff.flag("hurtLeg")]),
    action("entrance_key", [], [eff.flag("knowKeyStructure")]),
    action("entrance_candy")
  ]),

  ...defineScene("entrance_candy", { effects: [eff.flag("weirdFirst")] }, () => [
    action("cell_arrival")
  ]),

  ...defineScene("entrance_beg", { effects: [eff.rel("guard", 1)] }, () => [
    action("cell_arrival")
  ]),

  ...defineScene("entrance_stare", { effects: [eff.rel("guard", -1)] }, () => [
    action("cell_arrival")
  ]),

  ...defineScene("entrance_key", { effects: [eff.rel("guard", -1)] }, () => [
    action("cell_arrival")
  ]),

  ...defineScene("cell_arrival", () => [
    action("cell_introduction"),
    action("cell_silent"),
    action("cell_observe"),
    action("cell_examine_structure")
  ]),

  ...defineScene("cell_examine_structure", { effects: [eff.flag("knowCellStructure")] }, () => [
    action("cell_introduction_dev"),
    action("cell_silent")
  ]),

  ...defineScene("cell_introduction_dev", () => [
    action("talk_messiah"),
    action("cell_arsonist_lighter"),
    action("talk_wifekiller_intro"),
    action("first_night")
  ]),

  ...defineScene("cell_arsonist_lighter", { effects: [eff.rel("arsonist", 1)] }, () => [
    action("talk_messiah"),
    action("first_night")
  ]),

  ...defineScene("cell_introduction", () => [
    action("talk_messiah"),
    action("talk_fraudster"),
    action("talk_wifekiller_intro"),
    action("conflict_messiah_arsonist"),
    action("first_night")
  ]),

  ...defineScene("cell_silent", { effects: [eff.flag("foundNote")] }, () => [
    action("cell_ask_note"),
    action("first_night")
  ]),

  ...defineScene("cell_ask_note", { effects: [eff.flag("knowPreviousInmate")] }, () => [
    action("cell_ask_solitary"),
    action("first_night")
  ]),

  ...defineScene("cell_ask_solitary", { effects: [eff.flag("knowSolitaryRumor")] }, () => [
    action("first_night")
  ]),

  ...defineScene("cell_observe", () => [
    action("talk_political"),
    action("talk_messiah"),
    action("talk_groper", [cond.notFlag("groperEnemy")]),
    action("talk_arsonist_day"),
    action("first_night")
  ])
};

module.exports = scenes;
