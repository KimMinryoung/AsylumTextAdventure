/**
 * 메시아 통합 상호작용 모듈
 *
 * 메시아와의 모든 상호작용을 한 곳에서 정의합니다.
 * 허브 장면에서 cond.npcAt("messiah") 조건으로 연결됩니다.
 */

const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

module.exports = {
  // ===== 메인 상호작용 진입점 =====
  // 허브에서 메시아에게 말을 걸 때 이 장면으로 이동
  ...defineScene("interact_messiah", () => [
    // 탈출 계획 관련 (아직 모를 때)
    action("messiah_intro_plan", [cond.notFlag("knowMessiahPlan")]),

    // 계획 세부사항 (계획을 알고 호감도가 있을 때)
    action("messiah_plan_discussion", [cond.flag("knowMessiahPlan"), cond.relMin("messiah", 2)]),

    // 카드키 전달 (미션 수락 후 카드키 보유 시)
    action("messiah_deliver_key", [cond.flag("messiahKeyMission"), cond.has("환기구 카드키")]),

    // 축복 요청 (높은 호감도)
    action("messiah_ask_blessing", [cond.relMin("messiah", 5), cond.notFlag("messiahBlessing")]),

    // 신상 이야기 (호감도 3 이상)
    action("messiah_ask_origin", [cond.relMin("messiah", 3), cond.notFlag("knowMessiahStory")]),

    // 일반 대화
    action("messiah_small_talk"),

    // 돌아가기
    action("return_to_hub")
  ]),

  // ===== 탈출 계획 소개 =====
  ...defineScene("messiah_intro_plan", () => [
    action("messiah_trust_plan", [], [eff.flag("knowMessiahPlan"), eff.rel("messiah", 1)]),
    action("messiah_doubt_plan"),
    action("interact_messiah")
  ]),

  // 계획을 믿기로 함
  ...defineScene("messiah_trust_plan", () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // 의심함
  ...defineScene("messiah_doubt_plan", () => [
    action("return_to_hub")
  ]),

  // ===== 계획 세부 논의 =====
  ...defineScene("messiah_plan_discussion", () => [
    // 미션 수락
    action("messiah_accept_mission", [cond.notFlag("messiahKeyMission")], [eff.flag("messiahKeyMission")]),
    // 미션 진행 상황 확인
    action("messiah_mission_status", [cond.flag("messiahKeyMission"), cond.notFlag("messiahKeyDelivered")]),
    action("interact_messiah")
  ]),

  // 미션 수락
  ...defineScene("messiah_accept_mission", {
    effects: [eff.rel("messiah", 1)]
  }, () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // 미션 상황 확인
  ...defineScene("messiah_mission_status", () => [
    action("interact_messiah")
  ]),

  // ===== 카드키 전달 =====
  ...defineScene("messiah_deliver_key", {
    effects: [eff.drop("환기구 카드키"), eff.flag("messiahKeyDelivered"), eff.rel("messiah", 2)]
  }, () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // ===== 축복 요청 =====
  ...defineScene("messiah_ask_blessing", {
    effects: [eff.flag("messiahBlessing"), eff.rel("messiah", 1)]
  }, () => [
    action("return_to_hub")
  ]),

  // ===== 신상 이야기 =====
  ...defineScene("messiah_ask_origin", {
    effects: [eff.flag("knowMessiahStory"), eff.rel("messiah", 1)]
  }, () => [
    action("messiah_origin_continue"),
    action("return_to_hub")
  ]),

  // 이야기 계속
  ...defineScene("messiah_origin_continue", () => [
    action("return_to_hub")
  ]),

  // ===== 일반 대화 =====
  ...defineScene("messiah_small_talk", {
    effects: [eff.rel("messiah", 1)]
  }, () => [
    action("return_to_hub")
  ])
};
