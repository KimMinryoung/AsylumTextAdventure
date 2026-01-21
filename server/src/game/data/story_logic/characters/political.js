const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

const scenes = {
  ...defineScene("talk_political", () => [
    action("political_family", [cond.relMin("political", 1)]),
    action("political_advice"),
    action("political_info"),
    action("first_night")
  ]),

  ...defineScene("political_family", () => [
    action("political_request"),
    action("first_night")
  ]),

  ...defineScene("political_request", { effects: [eff.getItem("정치범의 편지"), eff.flag("politicalPromise")] }, () => [
    action("political_grateful")
  ]),

  ...defineScene("political_grateful", { effects: [eff.flag("knowWednesdayGap"), eff.rel("political", 2)] }, () => [
    action("first_night")
  ]),

  ...defineScene("political_advice", { effects: [eff.flag("knowSewerPath"), eff.rel("political")] }, () => [
    action("political_family", [cond.relMin("political", 1)]),
    action("first_night")
  ]),

  ...defineScene("political_info", () => [
    action("political_family", [cond.relMin("political", 1)], [eff.flag("knowPrisoners"), eff.rel("political")]),
    action("first_night", [], [eff.flag("knowPrisoners"), eff.rel("political")])
  ]),

  ...defineScene("cafeteria_political", () => [
    action("cafeteria_political_book"),
    action("cafeteria_political_crime", [], [eff.rel("political")]),
    action("cafeteria_political_quiet")
  ]),

  ...defineScene("cafeteria_political_book", { effects: [eff.rel("political")] }, () => [
    action("cafeteria_political_agree", [], [eff.rel("political")]),
    action("cafeteria_political_body")
  ]),

  ...defineScene("cafeteria_political_crime", { effects: [eff.flag("knowPoliticalStory")] }, () => [
    action("cafeteria_political_respect", [], [eff.rel("political", 2)]),
    action("cafeteria_political_escape")
  ]),

  ...defineScene("cafeteria_political_quiet", () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_political_agree", { effects: [eff.rel("political", 2)] }, () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_political_body", () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_political_respect", { effects: [eff.rel("political", 2)] }, () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_political_escape", { effects: [eff.rel("political", 2), eff.flag("knowWednesday")] }, () => [
    action("cafeteria_end")
  ]),

  ...defineScene("political_night_talk", { effects: [eff.flag("wednesdayConfirmed")] }, () => [
    action("day_three_morning")
  ])
};

module.exports = scenes;
