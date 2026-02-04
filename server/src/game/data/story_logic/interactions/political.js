/**
 * 정치범 통합 상호작용 모듈
 *
 * 지식인, 정보 제공, 가족 편지 부탁 등
 */

const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

module.exports = {
  // ===== 메인 상호작용 진입점 =====
  ...defineScene("interact_political", () => [
    // 깊은 대화 (높은 호감도)
    action("political_deep_talk", [cond.relMin("political", 3)]),

    // 가족 이야기 (호감도 2 이상)
    action("political_family_talk", [cond.relMin("political", 2)]),

    // 조언 요청 (호감도 1 이상)
    action("political_ask_advice", [cond.relMin("political", 1)]),

    // 다른 수감자 정보
    action("political_prisoner_info"),

    // 신뢰 증명 (호감도 낮을 때)
    action("political_prove_trust", [cond.relMax("political", 0)]),

    // 일반 대화
    action("political_small_talk"),

    action("return_to_hub")
  ]),

  // ===== 신뢰 증명 =====
  ...defineScene("political_prove_trust", {
    effects: [eff.rel("political", 1)]
  }, () => [
    action("political_prisoner_info"),
    action("return_to_hub")
  ]),

  // ===== 다른 수감자 정보 =====
  ...defineScene("political_prisoner_info", () => [
    action("hub_political_info_fraudster", [cond.notFlag("politicalWarnFraudster")]),
    action("hub_political_info_wifekiller", [cond.notFlag("politicalKnowWifekiller")]),
    action("hub_political_info_messiah", [cond.notFlag("politicalKnowMessiah")]),
    action("interact_political", [], [eff.flag("knowPrisoners"), eff.rel("political", 1)])
  ]),

  // 사기꾼 정보
  ...defineScene("hub_political_info_fraudster", {
    effects: [eff.flag("politicalWarnFraudster")]
  }, () => [
    action("political_prisoner_info"),
    action("return_to_hub", [], [eff.rel("political", 1)])
  ]),

  // 아내살해범 정보
  ...defineScene("hub_political_info_wifekiller", {
    effects: [eff.flag("politicalKnowWifekiller")]
  }, () => [
    action("political_prisoner_info"),
    action("return_to_hub", [], [eff.rel("political", 1)])
  ]),

  // 메시아 정보
  ...defineScene("hub_political_info_messiah", {
    effects: [eff.flag("politicalKnowMessiah")]
  }, () => [
    action("political_prisoner_info"),
    action("return_to_hub", [], [eff.rel("political", 1)])
  ]),

  // ===== 조언 요청 =====
  ...defineScene("political_ask_advice", {
    effects: [eff.flag("knowSewerPath"), eff.rel("political", 1)]
  }, () => [
    action("political_family_talk", [cond.relMin("political", 2)]),
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // ===== 가족 이야기 =====
  ...defineScene("political_family_talk", () => [
    action("political_letter_request"),
    action("return_to_hub")
  ]),

  // 편지 부탁
  ...defineScene("political_letter_request", {
    effects: [eff.getItem("정치범의 편지"), eff.flag("politicalPromise")]
  }, () => [
    action("political_grateful")
  ]),

  // 감사
  ...defineScene("political_grateful", {
    effects: [eff.flag("knowWednesdayGap"), eff.rel("political", 2)]
  }, () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // ===== 깊은 대화 =====
  ...defineScene("political_deep_talk", {
    effects: [eff.rel("political", 1)]
  }, () => [
    action("political_deep_guard", [cond.notFlag("knowGuardSecret")]),
    action("political_deep_tunnels", [cond.notFlag("knowTunnels")]),
    action("political_deep_fraudster", [cond.relMin("fraudster", 1)]),
    action("interact_political")
  ]),

  // 간수장 비밀
  ...defineScene("political_deep_guard", {
    effects: [eff.flag("knowGuardSecret")]
  }, () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // 지하 터널 정보
  ...defineScene("political_deep_tunnels", {
    effects: [eff.flag("knowTunnels")]
  }, () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // 사기꾼 경고
  ...defineScene("political_deep_fraudster", () => [
    action("political_ignore_warning"),
    action("political_heed_warning", [], [eff.flag("warnedAboutFraudster"), eff.rel("political", 1)])
  ]),

  // 경고 무시
  ...defineScene("political_ignore_warning", () => [
    action("return_to_hub")
  ]),

  // 경고 수용
  ...defineScene("political_heed_warning", () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // ===== 일반 대화 =====
  ...defineScene("political_small_talk", () => [
    action("political_book_talk", [], [eff.rel("political", 1)]),
    action("political_crime_talk", [], [eff.rel("political", 1)]),
    action("political_quiet")
  ]),

  // 책 이야기
  ...defineScene("political_book_talk", {
    effects: [eff.rel("political", 1)]
  }, () => [
    action("political_agree_book", [], [eff.rel("political", 1)]),
    action("return_to_hub")
  ]),

  // 동의
  ...defineScene("political_agree_book", {
    effects: [eff.rel("political", 1)]
  }, () => [
    action("return_to_hub")
  ]),

  // 범죄 이야기
  ...defineScene("political_crime_talk", {
    effects: [eff.flag("knowPoliticalStory")]
  }, () => [
    action("political_respect", [], [eff.rel("political", 2)]),
    action("political_escape_info", [], [eff.rel("political", 2), eff.flag("knowWednesday")])
  ]),

  // 존경
  ...defineScene("political_respect", {
    effects: [eff.rel("political", 1)]
  }, () => [
    action("return_to_hub")
  ]),

  // 탈출 정보
  ...defineScene("political_escape_info", () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // 조용히
  ...defineScene("political_quiet", () => [
    action("return_to_hub")
  ])
};
