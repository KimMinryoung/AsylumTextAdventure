const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

const scenes = {
  ...defineScene("talk_messiah", () => [
    action("messiah_origin", [cond.relMin("messiah", 3)]),
    action("messiah_trust", [], [eff.flag("knowMessiahPlan")]),
    action("messiah_doubt"),
    action("messiah_reject")
  ]),

  ...defineScene("messiah_origin", () => [
    action("messiah_origin_2"),
    action("cell_observe")
  ]),

  ...defineScene("messiah_origin_2", () => [
    action("messiah_trust", [], [eff.flag("knowMessiahPlan")]),
    action("messiah_doubt")
  ]),

  ...defineScene("messiah_trust", () => [
    action("first_night")
  ]),

  ...defineScene("messiah_doubt", () => [
    action("cell_introduction"),
    action("first_night")
  ]),

  ...defineScene("messiah_reject", { effects: [eff.flag("messiahEnemy")] }, () => [
    action("talk_fraudster"),
    action("first_night")
  ]),

  ...defineScene("messiah_plan_detail", () => [
    action("messiah_mission_accept", [], [eff.flag("messiahKeyMission")]),
    action("cafeteria_arrival")
  ]),

  ...defineScene("messiah_mission_accept", () => [
    action("cafeteria_arrival")
  ]),

  ...defineScene("cafeteria_messiah", () => [
    action("cafeteria_messiah_hell", [], [eff.rel("messiah")]),
    action("cafeteria_messiah_tough"),
    action("cafeteria_messiah_question")
  ]),

  ...defineScene("cafeteria_messiah_hell", { effects: [eff.flag("messiahInvite")] }, () => [
    action("cafeteria_messiah_join", [], [eff.rel("messiah")]),
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_messiah_tough", () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_messiah_question", { effects: [eff.flag("knowMessiahStory")] }, () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_messiah_join", { effects: [eff.rel("messiah", 2)] }, () => [
    action("cafeteria_end")
  ]),

  ...defineScene("messiah_listen_to_plan_detail", { effects: [eff.flag("messiahKeyMission")] }, () => [
    action("messiah_key_delivery", [cond.has("환기구 카드키")]),
    action("day_three_key_heist", [cond.notHas("환기구 카드키")]),
    action("day_three_afternoon")
  ]),

  ...defineScene("messiah_key_delivery", { effects: [eff.drop("환기구 카드키"), eff.flag("messiahKeyDelivered"), eff.rel("messiah", 2)] }, () => [
    action("day_three_dinner")
  ])
};

module.exports = scenes;
