/**
 * 아내살해범 통합 상호작용 모듈
 *
 * 조용하고 내성적, 이야기를 들어주면 호감도 상승
 */

const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

module.exports = {
  // ===== 메인 상호작용 진입점 =====
  ...defineScene("interact_wifekiller", () => [
    // 비상구 정보 (높은 호감도)
    action("wifekiller_emergency_info", [cond.relMin("wifekiller", 4), cond.notFlag("knowEmergencyExit")]),

    // 깊은 이야기 (호감도 2 이상)
    action("wifekiller_deep_story", [cond.relMin("wifekiller", 2)]),

    // 이야기 듣기 (호감도 1 이상)
    action("wifekiller_listen_story", [cond.relMin("wifekiller", 1)]),

    // 처음 접근
    action("wifekiller_first_approach", [cond.relMax("wifekiller", 0)]),

    // 동정심 표현
    action("wifekiller_sympathy", [], [eff.rel("wifekiller", 1)]),

    action("return_to_hub")
  ]),

  // ===== 처음 접근 =====
  ...defineScene("wifekiller_first_approach", () => [
    action("wifekiller_provoke", [], []),  // 위험한 선택
    action("wifekiller_gentle", [cond.relMin("wifekiller", 1)], [eff.rel("wifekiller", 1)]),
    action("wifekiller_reject", [], [eff.rel("wifekiller", 1)]),
    action("return_to_hub")
  ]),

  // 도발 (위험)
  ...defineScene("wifekiller_provoke", () => [
    action("gameover_wifekiller_rage")  // 기존 게임오버 연결
  ]),

  // 부드럽게 접근
  ...defineScene("wifekiller_gentle", () => [
    action("wifekiller_listen_story"),
    action("return_to_hub")
  ]),

  // 거리 두기
  ...defineScene("wifekiller_reject", () => [
    action("return_to_hub")
  ]),

  // ===== 이야기 듣기 =====
  ...defineScene("wifekiller_listen_story", () => [
    action("wifekiller_bond", [], [eff.rel("wifekiller", 2)]),
    action("return_to_hub")
  ]),

  // 유대감 형성
  ...defineScene("wifekiller_bond", {
    effects: [eff.rel("wifekiller", 1)]
  }, () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // ===== 깊은 이야기 =====
  ...defineScene("wifekiller_deep_story", {
    effects: [eff.rel("wifekiller", 2)]
  }, () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // ===== 동정심 표현 =====
  ...defineScene("wifekiller_sympathy", () => [
    action("return_to_hub")
  ]),

  // ===== 비상구 정보 =====
  ...defineScene("wifekiller_emergency_info", {
    effects: [eff.flag("knowEmergencyExit"), eff.rel("wifekiller", 1)]
  }, () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ])
};
