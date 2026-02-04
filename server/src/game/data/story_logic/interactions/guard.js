/**
 * 간수 통합 상호작용 모듈
 *
 * 감시자, 호감도에 따라 도움이나 정보 제공
 */

const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

module.exports = {
  // ===== 메인 상호작용 진입점 =====
  ...defineScene("interact_guard", () => [
    // 친근한 대화 (높은 호감도)
    action("guard_friendly_talk", [cond.relMin("guard", 3)]),

    // 호의 요청 (호감도 2 이상)
    action("guard_ask_favor", [cond.relMin("guard", 2)]),

    // 일반 대화
    action("guard_normal_talk"),

    // 무시
    action("guard_ignore"),

    action("return_to_hub")
  ]),

  // ===== 일반 대화 =====
  ...defineScene("guard_normal_talk", () => [
    action("guard_compliment", [], [eff.rel("guard", 1)]),
    action("return_to_hub")
  ]),

  // 칭찬
  ...defineScene("guard_compliment", () => [
    action("return_to_hub")
  ]),

  // ===== 친근한 대화 =====
  ...defineScene("guard_friendly_talk", {
    effects: [eff.flag("extraMeal"), eff.rel("guard", 1)]
  }, () => [
    action("return_to_hub")
  ]),

  // ===== 호의 요청 =====
  ...defineScene("guard_ask_favor", () => [
    action("hub_guard_favor_workshop"),
    action("return_to_hub")
  ]),

  // 작업장 호의
  ...defineScene("hub_guard_favor_workshop", {
    effects: [eff.getItem("담배 한 갑"), eff.flag("easyWorkAssigned")]
  }, () => [
    action("hub_guard_favor_storage"),
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // 창고 접근
  ...defineScene("hub_guard_favor_storage", {
    effects: [eff.getItem("녹슨 철사"), eff.flag("exploredStorage")]
  }, () => [
    action("guard_storage_search", [cond.notFlag("knowFloorPlan")]),
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // 창고 수색
  ...defineScene("guard_storage_search", {
    effects: [eff.getItem("수용소 배치도"), eff.flag("knowFloorPlan")]
  }, () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // ===== 무시 =====
  ...defineScene("guard_ignore", () => [
    action("return_to_hub")
  ]),

  // ===== 야간 이벤트 (호감도에 따라) =====
  ...defineScene("guard_night_event", () => [
    action("hub_guard_night_friendly", [cond.relMin("guard", 2)]),
    action("hub_guard_night_hostile")
  ]),

  // 우호적 야간
  ...defineScene("hub_guard_night_friendly", {
    effects: [eff.getItem("빵 조각"), eff.rel("guard", 1)]
  }, () => [
    action("hub_guard_night_info"),
    action("return_to_hub")
  ]),

  // 정보 얻기
  ...defineScene("hub_guard_night_info", {
    effects: [eff.flag("knowWardenMedical"), eff.flag("knowStorageDeals"), eff.rel("guard", 1)]
  }, () => [
    action("return_to_hub")
  ]),

  // 적대적 야간
  ...defineScene("hub_guard_night_hostile", {
    effects: [eff.rel("guard", 1)]
  }, () => [
    action("return_to_hub")
  ])
};
