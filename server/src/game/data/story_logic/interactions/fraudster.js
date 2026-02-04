/**
 * 사기꾼 통합 상호작용 모듈
 *
 * 정보 거래, 다른 수감자들의 비밀, 간수 매수 등
 */

const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

module.exports = {
  // ===== 메인 상호작용 진입점 =====
  ...defineScene("interact_fraudster", () => [
    // 무료 정보 (높은 호감도)
    action("fraudster_free_info", [cond.relMin("fraudster", 3)]),

    // 거래 제안 (아직 모를 때)
    action("fraudster_intro_deal", [cond.notFlag("knowFraudsterPlan")]),

    // 정보 구매
    action("fraudster_buy_info", [cond.flag("knowFraudsterPlan")]),

    // 과거 이야기
    action("fraudster_ask_past", [cond.relMin("fraudster", 2)]),

    // 빚 회수 상황
    action("fraudster_debt_scene", [cond.flag("owesFraudster")]),

    // 일반 대화
    action("fraudster_small_talk"),

    action("return_to_hub")
  ]),

  // ===== 거래 제안 소개 =====
  ...defineScene("fraudster_intro_deal", () => [
    action("fraudster_accept_deal", [], [eff.flag("knowFraudsterPlan"), eff.rel("fraudster", 1)]),
    action("fraudster_reject_deal"),
    action("fraudster_suspicious_deal"),
    action("interact_fraudster")
  ]),

  // 거래 수락
  ...defineScene("fraudster_accept_deal", () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // 거래 거부
  ...defineScene("fraudster_reject_deal", () => [
    action("return_to_hub")
  ]),

  // 의심
  ...defineScene("fraudster_suspicious_deal", () => [
    action("fraudster_accept_deal", [], [eff.flag("knowFraudsterPlan"), eff.rel("fraudster", 1)]),
    action("return_to_hub")
  ]),

  // ===== 무료 정보 (높은 호감도) =====
  ...defineScene("fraudster_free_info", {
    effects: [eff.rel("fraudster", 1)]
  }, () => [
    action("fraudster_free_escape", [cond.notFlag("knowDetailedEscape")]),
    action("fraudster_free_secrets"),
    action("fraudster_free_guard", [cond.notFlag("knowGuardWeakness")]),
    action("interact_fraudster")
  ]),

  // 탈출 루트 정보
  ...defineScene("fraudster_free_escape", {
    effects: [eff.flag("knowEscapeRoutes"), eff.flag("knowDetailedEscape")]
  }, () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // 다른 수감자 비밀
  ...defineScene("fraudster_free_secrets", () => [
    action("fraudster_secret_messiah", [cond.notFlag("knowMessiahSecret")]),
    action("fraudster_secret_wifekiller", [cond.notFlag("knowWifekillerSecret")]),
    action("fraudster_secret_political", [cond.notFlag("knowPoliticalSecret")]),
    action("interact_fraudster")
  ]),

  // 메시아의 비밀
  ...defineScene("fraudster_secret_messiah", {
    effects: [eff.flag("knowMessiahSecret")]
  }, () => [
    action("fraudster_free_secrets"),
    action("return_to_hub")
  ]),

  // 아내 살인범의 비밀
  ...defineScene("fraudster_secret_wifekiller", {
    effects: [eff.flag("knowWifekillerSecret")]
  }, () => [
    action("fraudster_free_secrets"),
    action("return_to_hub")
  ]),

  // 정치범의 비밀
  ...defineScene("fraudster_secret_political", {
    effects: [eff.flag("knowPoliticalSecret")]
  }, () => [
    action("fraudster_free_secrets"),
    action("return_to_hub")
  ]),

  // 간수 약점 정보
  ...defineScene("fraudster_free_guard", {
    effects: [eff.flag("knowGuardWeakness")]
  }, () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // ===== 정보 구매 =====
  ...defineScene("fraudster_buy_info", () => [
    action("fraudster_buy_escape", [cond.notFlag("knowEscapeRoutes")]),
    action("fraudster_buy_guard", [cond.notFlag("knowGuardSchedule")]),
    action("fraudster_buy_gossip"),
    action("interact_fraudster")
  ]),

  // 탈출 정보 구매
  ...defineScene("fraudster_buy_escape", {
    effects: [eff.flag("knowEscapeRoutes")]
  }, () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // 간수 정보 구매
  ...defineScene("fraudster_buy_guard", {
    effects: [eff.flag("knowGuardSchedule"), eff.rel("fraudster", 1)]
  }, () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // 소문 구매
  ...defineScene("fraudster_buy_gossip", () => [
    action("fraudster_gossip_pay", [cond.has("담배")], [eff.drop("담배"), eff.rel("fraudster", 1)]),
    action("fraudster_gossip_owe", [cond.notHas("담배")], [eff.flag("owesFraudster")]),
    action("interact_fraudster")
  ]),

  // 담배로 지불
  ...defineScene("fraudster_gossip_pay", () => [
    action("fraudster_gossip_messiah", [cond.notFlag("knowMessiahPlan")]),
    action("fraudster_gossip_guard", [cond.notFlag("knowGuardCorruption")]),
    action("return_to_hub")
  ]),

  // 빚으로 지불
  ...defineScene("fraudster_gossip_owe", () => [
    action("fraudster_gossip_messiah", [cond.notFlag("knowMessiahPlan")]),
    action("fraudster_gossip_guard", [cond.notFlag("knowGuardCorruption")]),
    action("return_to_hub")
  ]),

  // 메시아 소문
  ...defineScene("fraudster_gossip_messiah", {
    effects: [eff.flag("knowMessiahPlan")]
  }, () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // 간수 부패 소문
  ...defineScene("fraudster_gossip_guard", {
    effects: [eff.flag("knowGuardCorruption")]
  }, () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // ===== 과거 이야기 =====
  ...defineScene("fraudster_ask_past", () => [
    action("fraudster_past_continue"),
    action("interact_fraudster")
  ]),

  // 과거 이야기 계속
  ...defineScene("fraudster_past_continue", () => [
    action("hub_fraudster_guilt", [], [eff.rel("fraudster", 1)]),
    action("return_to_hub")
  ]),

  // 죄책감 표현
  ...defineScene("hub_fraudster_guilt", {
    effects: [eff.rel("fraudster", 1)]
  }, () => [
    action("hub_fraudster_comfort", [], [eff.rel("fraudster", 1)]),
    action("return_to_hub")
  ]),

  // 위로
  ...defineScene("hub_fraudster_comfort", {
    effects: [eff.rel("fraudster", 1)]
  }, () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // ===== 빚 회수 =====
  ...defineScene("fraudster_debt_scene", () => [
    action("fraudster_pay_debt", [], [eff.flag("didFraudsterFavor"), eff.unflag("owesFraudster")]),
    action("fraudster_refuse_debt", [], [eff.rel("fraudster", -2), eff.unflag("owesFraudster"), eff.flag("fraudsterEnemy")]),
    action("return_to_hub")
  ]),

  // 빚 갚기
  ...defineScene("fraudster_pay_debt", () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // 빚 거부
  ...defineScene("fraudster_refuse_debt", () => [
    action("return_to_hub")
  ]),

  // ===== 일반 대화 =====
  ...defineScene("fraudster_small_talk", {
    effects: [eff.rel("fraudster", 1)]
  }, () => [
    action("return_to_hub")
  ])
};
