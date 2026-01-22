const { cond, eff, action, defineScene } = require('../../SceneBuilder');

const scenes = {
  ...defineScene("cafeteria_arrival", () => [
    action("cafeteria_messiah"),
    action("cafeteria_fraudster"),
    action("cafeteria_arsonist"),
    action("cafeteria_political"),
    action("cafeteria_alone")
  ]),

  ...defineScene("cafeteria_alone", () => [
    action("cafeteria_guard_friendly", [cond.relMin("guard", 1)]),
    action("cafeteria_observe_guards"),
    action("cafeteria_observe_exit"),
    action("cafeteria_commotion"),
    action("cafeteria_smell"),
    action("cafeteria_ghost_story"),
    action("cafeteria_food_mystery"),
    action("cafeteria_groper_event", [cond.relMin("groper", 1)])
  ]),

  ...defineScene("cafeteria_smell", () => [
    action("cafeteria_eat_anyway"),
    action("cafeteria_move_table")
  ]),

  ...defineScene("cafeteria_eat_anyway", { effects: [eff.flag("ateFood")] }, () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_move_table", () => [
    action("cafeteria_political_morbid"),
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_political_morbid", { effects: [eff.flag("heardDeathStory")] }, () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_commotion", { effects: [eff.flag("witnessedFight")] }, () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_observe_guards", { effects: [eff.flag("knowCafeteriaGuards")] }, () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_observe_exit", { effects: [eff.flag("knowKitchenExit")] }, () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_ghost_story", { effects: [eff.flag("heardFreezerGhost")] }, () => [
    action("cafeteria_ghost_detail"),
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_ghost_detail", { effects: [eff.flag("knowFreezerHistory")] }, () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_food_mystery", { effects: [eff.flag("foodMystery")] }, () => [
    action("cafeteria_fraudster_hint"),
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_fraudster_hint", { effects: [eff.flag("knewBasementHint"), eff.rel("fraudster", 1)] }, () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_end", () => [
    action("day_two_evening")
  ]),

};

module.exports = scenes;
