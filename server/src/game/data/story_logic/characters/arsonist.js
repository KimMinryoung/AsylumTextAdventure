const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

const scenes = {
  ...defineScene("talk_arsonist_day", () => [
    action("arsonist_reject_talk", [], [eff.rel("arsonist")]),
    action("arsonist_reject_talk", [], [eff.rel("arsonist")]),
    action("cell_observe")
  ]),

  ...defineScene("arsonist_reject_talk", () => [
    action("cell_observe")
  ]),

  ...defineScene("arsonist_scar", () => [
    action("arsonist_crime"),
    action("day_three_afternoon")
  ]),

  ...defineScene("arsonist_crime", () => [
    action("arsonist_calm", [], [eff.rel("arsonist")]),
    action("day_three_afternoon")
  ]),

  ...defineScene("arsonist_calm", () => [
    action("day_three_afternoon")
  ]),

  ...defineScene("conflict_messiah_arsonist", () => [
    action("conflict_mediate"),
    action("conflict_watch")
  ]),

  ...defineScene("conflict_mediate", { effects: [eff.flag("conflictMediator")] }, () => [
    action("first_night")
  ]),

  ...defineScene("conflict_watch", () => [
    action("first_night")
  ]),

  ...defineScene("arsonist_night_whisper", () => [
    action("arsonist_agree", [], [eff.flag("knowArsonistPlan")]),
    action("arsonist_refuse"),
    action("arsonist_ignore")
  ]),

  ...defineScene("arsonist_agree", () => [
    action("day_two_morning")
  ]),

  ...defineScene("arsonist_refuse", { effects: [eff.flag("arsonistEnemy")] }, () => [
    action("day_two_morning")
  ]),

  ...defineScene("arsonist_ignore", () => [
    action("day_two_morning")
  ]),

  ...defineScene("cafeteria_arsonist", () => [
    action("cafeteria_arsonist_honest", [], [eff.rel("arsonist")]),
    action("cafeteria_arsonist_curious"),
    action("cafeteria_arsonist_silent", [], [eff.rel("arsonist")])
  ]),

  ...defineScene("cafeteria_arsonist_honest", () => [
    action("cafeteria_arsonist_bond", [], [eff.rel("arsonist")]),
    action("cafeteria_arsonist_time")
  ]),

  ...defineScene("cafeteria_arsonist_curious", () => [
    action("cafeteria_arsonist_apologize"),
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_arsonist_silent", () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_arsonist_bond", { effects: [eff.flag("knowArsonistPlan"), eff.rel("arsonist")] }, () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_arsonist_time", () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_arsonist_apologize", () => [
    action("cafeteria_end")
  ]),

  ...defineScene("arsonist_listen_to_plan_detail", { effects: [eff.rel("arsonist")] }, () => [
    action("arsonist_ready", [cond.has("라이터 기름")]),
    action("workshop_steal_oil_mediator", [cond.notHas("라이터 기름")]),
    action("arsonist_reconsider", [cond.flag("conflictMediator")]),
    action("day_three_afternoon")
  ]),

  ...defineScene("workshop_steal_oil_mediator", { effects: [eff.getItem("라이터 기름")] }, () => [
    action("day_three_arsonist_prep")
  ]),

  ...defineScene("day_three_arsonist_prep", () => [
    action("arsonist_ready", [cond.has("라이터 기름")]),
    action("arsonist_disappointed"),
    action("arsonist_reconsider", [cond.relMin("arsonist", 2)])
  ]),

  ...defineScene("arsonist_ready", { effects: [eff.drop("라이터 기름"), eff.flag("arsonistReady"), eff.rel("arsonist", 2)] }, () => [
    action("arsonist_scar"),
    action("arsonist_crime"),
    action("day_three_afternoon")
  ]),

  ...defineScene("arsonist_disappointed", { effects: [eff.flag("arsonistAbandoned")] }, () => [
    action("day_three_afternoon")
  ]),

  ...defineScene("arsonist_reconsider", { effects: [eff.flag("arsonistMinimized")] }, () => [
    action("day_three_afternoon")
  ])
};

module.exports = scenes;
