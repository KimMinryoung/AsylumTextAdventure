const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

const scenes = {
  // 첫 만남 - 거래 제안
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

  // 죄책감 표현 - 관계 상승 기회
  ...defineScene("fraudster_guilt", { effects: [eff.rel("fraudster")] }, () => [
    action("fraudster_comfort", [], [eff.rel("fraudster")]),
    action("fraudster_deal_talk"),
    action("first_night")
  ]),

  // 위로하면 추가 관계 상승
  ...defineScene("fraudster_comfort", { effects: [eff.rel("fraudster")] }, () => [
    action("fraudster_deal_talk"),
    action("first_night")
  ]),

  ...defineScene("fraudster_deal_talk", () => [
    action("fraudster_deal", [], [eff.flag("knowFraudsterPlan")]),
    action("fraudster_reject")
  ]),

  ...defineScene("fraudster_deal", { effects: [eff.rel("fraudster")] }, () => [
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

  // 식당 - 관계에 따라 정보 가격 차등화
  ...defineScene("cafeteria_fraudster", () => [
    action("cafeteria_fraudster_free", [cond.relMin("fraudster", 3)]),
    action("cafeteria_fraudster_info"),
    action("cafeteria_fraudster_price"),
    action("cafeteria_fraudster_gossip"),
    action("cafeteria_fraudster_quiet", [], [eff.rel("fraudster")])
  ]),

  // 관계가 높을 때 무료 정보
  ...defineScene("cafeteria_fraudster_free", { effects: [eff.rel("fraudster")] }, () => [
    action("cafeteria_fraudster_free_escape"),
    action("cafeteria_fraudster_free_secrets"),
    action("cafeteria_fraudster_free_guard")
  ]),

  // 무료: 탈출 루트
  ...defineScene("cafeteria_fraudster_free_escape", { effects: [eff.flag("knowEscapeRoutes"), eff.flag("knowDetailedEscape")] }, () => [
    action("cafeteria_end")
  ]),

  // 무료: 다른 죄수들의 비밀
  ...defineScene("cafeteria_fraudster_free_secrets", () => [
    action("cafeteria_fraudster_secret_messiah"),
    action("cafeteria_fraudster_secret_wifekiller"),
    action("cafeteria_fraudster_secret_political"),
    action("cafeteria_end")
  ]),

  // 메시아의 비밀
  ...defineScene("cafeteria_fraudster_secret_messiah", { effects: [eff.flag("knowMessiahSecret")] }, () => [
    action("cafeteria_fraudster_secret_wifekiller"),
    action("cafeteria_fraudster_secret_political"),
    action("cafeteria_end")
  ]),

  // 아내 살인범의 비밀
  ...defineScene("cafeteria_fraudster_secret_wifekiller", { effects: [eff.flag("knowWifekillerSecret")] }, () => [
    action("cafeteria_fraudster_secret_messiah", [cond.notFlag("knowMessiahSecret")]),
    action("cafeteria_fraudster_secret_political"),
    action("cafeteria_end")
  ]),

  // 정치범의 비밀
  ...defineScene("cafeteria_fraudster_secret_political", { effects: [eff.flag("knowPoliticalSecret")] }, () => [
    action("cafeteria_fraudster_secret_messiah", [cond.notFlag("knowMessiahSecret")]),
    action("cafeteria_fraudster_secret_wifekiller", [cond.notFlag("knowWifekillerSecret")]),
    action("cafeteria_end")
  ]),

  // 무료: 간수 정보
  ...defineScene("cafeteria_fraudster_free_guard", { effects: [eff.flag("knowGuardWeakness")] }, () => [
    action("cafeteria_end")
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

  // 다른 죄수들의 소문
  ...defineScene("cafeteria_fraudster_gossip", () => [
    action("cafeteria_fraudster_gossip_pay", [cond.has("담배")], [eff.drop("담배")]),
    action("cafeteria_fraudster_gossip_owe"),
    action("cafeteria_end")
  ]),

  // 담배로 정보 구매
  ...defineScene("cafeteria_fraudster_gossip_pay", { effects: [eff.rel("fraudster")] }, () => [
    action("cafeteria_fraudster_gossip_messiah"),
    action("cafeteria_fraudster_gossip_guard"),
    action("cafeteria_end")
  ]),

  // 빚으로 정보 구매
  ...defineScene("cafeteria_fraudster_gossip_owe", { effects: [eff.flag("owesFraudster")] }, () => [
    action("cafeteria_fraudster_gossip_messiah"),
    action("cafeteria_fraudster_gossip_guard"),
    action("cafeteria_end")
  ]),

  // 메시아 소문
  ...defineScene("cafeteria_fraudster_gossip_messiah", { effects: [eff.flag("knowMessiahPlan")] }, () => [
    action("cafeteria_end")
  ]),

  // 간수 소문
  ...defineScene("cafeteria_fraudster_gossip_guard", { effects: [eff.flag("knowGuardCorruption")] }, () => [
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
  ]),

  // 높은 관계에서 실질적 도움
  ...defineScene("fraudster_bribe_guard", { effects: [eff.flag("guardBribed")] }, () => [
    action("escape_bribed_path")
  ]),

  // 빚 회수 - 나중에 대가 요구
  ...defineScene("fraudster_collect_debt", () => [
    action("fraudster_debt_favor"),
    action("fraudster_debt_refuse", [], [eff.rel("fraudster", -2)])
  ]),

  ...defineScene("fraudster_debt_favor", { effects: [eff.flag("didFraudsterFavor"), eff.unflag("owesFraudster")] }, () => [
    action("day_three_afternoon")
  ]),

  ...defineScene("fraudster_debt_refuse", { effects: [eff.unflag("owesFraudster"), eff.flag("fraudsterEnemy")] }, () => [
    action("day_three_afternoon")
  ])
};

module.exports = scenes;
