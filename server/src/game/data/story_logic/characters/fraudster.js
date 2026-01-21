const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

const scenes = {
  ...defineScene("talk_fraudster", () => [
    action("fraudster_past"),
    action("fraudster_deal", [], [eff.flag("knowFraudsterPlan")]),
    action("fraudster_reject"),
    action("fraudster_suspicious")
  ]),

  ...defineScene("fraudster_past", () => [
    action("fraudster_past_2"),
    action("fraudster_deal_talk")
  ]),

  ...defineScene("fraudster_past_2", () => [
    action("fraudster_deal_talk"),
    action("fraudster_guilt")
  ]),

  ...defineScene("fraudster_guilt", () => [
    action("fraudster_deal_talk"),
    action("first_night")
  ]),

  ...defineScene("fraudster_deal_talk", () => [
    action("fraudster_deal", [], [eff.flag("knowFraudsterPlan")]),
    action("fraudster_reject")
  ]),

  ...defineScene("fraudster_deal", () => [
    action("first_night")
  ]),

  ...defineScene("fraudster_reject", () => [
    action("cell_introduction"),
    action("first_night")
  ]),

  ...defineScene("fraudster_suspicious", () => [
    action("fraudster_deal", [], [eff.flag("knowFraudsterPlan")]),
    action("first_night")
  ]),

  ...defineScene("cafeteria_fraudster", () => [
    action("cafeteria_fraudster_info"),
    action("cafeteria_fraudster_price"),
    action("cafeteria_fraudster_quiet", [], [eff.rel("fraudster")])
  ]),

  ...defineScene("cafeteria_fraudster_info", () => [
    action("cafeteria_fraudster_escape"),
    action("cafeteria_fraudster_guards", [], [eff.flag("knowGuardSchedule")])
  ]),

  ...defineScene("cafeteria_fraudster_escape", { effects: [eff.flag("knowEscapeRoutes")] }, () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_fraudster_guards", { effects: [eff.rel("fraudster")] }, () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_fraudster_price", () => [
    action("cafeteria_end", [], [eff.flag("fraudsterDeal")]),
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_fraudster_quiet", () => [
    action("cafeteria_end")
  ]),

  ...defineScene("day_three_fraudster_check", () => [
    action("fraudster_catch_revealed", [cond.flag("knowPrisoners")]),
    action("day_three_afternoon", [], [eff.rel("fraudster", 2)])
  ]),

  ...defineScene("fraudster_catch_revealed", () => [
    action("day_three_afternoon", [], [eff.rel("fraudster", 2)]),
    action("day_three_afternoon", [], [eff.flag("fraudsterRefused")])
  ])
};

module.exports = scenes;
