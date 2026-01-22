const { cond, eff, action, defineScene } = require('../../SceneBuilder');

const scenes = {
  ...defineScene("yard", () => [
    action("gameover_guard_murder"),
    action("yard_bow_guard"),
    action("yard_messiah"),
    action("yard_pedophile"),
    action("yard_walk")
  ]),

  ...defineScene("yard_bow_guard", { effects: [eff.rel("guard", 1)] }, () => [
    action("yard_walk"),
    action("yard_pedophile")
  ]),

  ...defineScene("yard_walk", () => [
    action("yard_crack", [], [eff.flag("knowWallCrack")]),
    action("yard_strange_sound"),
    action("cafeteria_arrival")
  ]),

  ...defineScene("yard_strange_sound", { effects: [eff.flag("knowBeeNest")] }, () => [
    action("yard_crack", [], [eff.flag("knowWallCrack")]),
    action("yard_political_talk"),
    action("cafeteria_arrival")
  ]),

  ...defineScene("yard_political_talk", { effects: [eff.flag("knowOutsideForce"), eff.rel("political", 1)] }, () => [
    action("cafeteria_arrival")
  ]),

  ...defineScene("yard_crack", () => [
    action("cafeteria_arrival")
  ]),

  ...defineScene("yard_messiah", { effects: [eff.rel("messiah", 1)] }, () => [
    action("messiah_plan_detail", [cond.flag("knowMessiahPlan")]),
    action("yard_join_messiah"),
    action("yard_decline_messiah"),
    action("yard_listen_messiah")
  ]),

  ...defineScene("yard_join_messiah", { effects: [eff.rel("messiah", 2), eff.flag("joinedMessiah")] }, () => [
    action("yard_messiah_plan"),
    action("cafeteria_arrival")
  ]),

  ...defineScene("yard_messiah_plan", { effects: [eff.flag("knowMessiahTiming")] }, () => [
    action("cafeteria_arrival")
  ]),

  ...defineScene("yard_decline_messiah", () => [
    action("yard_walk"),
    action("cafeteria_arrival")
  ]),

  ...defineScene("yard_listen_messiah", { effects: [eff.flag("heardMessiahPlan")] }, () => [
    action("cafeteria_arrival")
  ]),

  ...defineScene("yard_pedophile", () => [
    action("pedophile_kind"),
    action("pedophile_deal"),
    action("yard_pedophile_bond"),
    action("yard_pedophile_info"),
    action("yard_walk")
  ]),

  ...defineScene("yard_pedophile_bond", { effects: [eff.rel("pedophile", 2)] }, () => [
    action("yard_pedophile_info"),
    action("cafeteria_arrival")
  ]),

  ...defineScene("yard_pedophile_info", { effects: [eff.flag("knowWardenWeakness"), eff.rel("pedophile", 1)] }, () => [
    action("yard_pedophile_thanks"),
    action("cafeteria_arrival")
  ]),

  ...defineScene("yard_pedophile_thanks", { effects: [eff.flag("helpedPedophile")] }, () => [
    action("cafeteria_arrival")
  ]),

  ...defineScene("day_three_yard", () => [
    action("messiah_key_delivery", [cond.has("환기구 카드키")]),
    action("warden_blackmail", [cond.flag("knowWardenWeakness")]),
    action("wall_crack_plan", [cond.flag("knowWallCrack")]),
    action("day_three_dinner")
  ]),

  ...defineScene("warden_blackmail", { effects: [eff.flag("wardenBlackmailed")] }, () => [
    action("day_three_dinner")
  ]),

  ...defineScene("wall_crack_plan", () => [
    action("wall_plan_set", [], [eff.flag("wallEscapePlan")]),
    action("day_three_dinner")
  ]),

  ...defineScene("wall_plan_set", () => [
    action("day_three_dinner")
  ])
};

module.exports = scenes;
