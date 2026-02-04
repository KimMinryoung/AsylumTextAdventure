/**
 * 방화범 통합 상호작용 모듈
 *
 * 불안정한 성격, 화재 계획, 갈등 중재 등
 */

const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

module.exports = {
  // ===== 메인 상호작용 진입점 =====
  ...defineScene("interact_arsonist", () => [
    // 화재 계획 (알고 있을 때)
    action("arsonist_plan_discuss", [cond.flag("knowArsonistPlan")]),

    // 화재 계획 제안 (아직 모를 때)
    action("arsonist_intro_plan", [cond.notFlag("knowArsonistPlan"), cond.relMin("arsonist", 1)]),

    // 흉터에 대해 묻기 (호감도 필요)
    action("arsonist_ask_scar", [cond.relMin("arsonist", 2)]),

    // 접근 시도
    action("arsonist_approach"),

    // 조용히 관찰
    action("arsonist_observe"),

    action("return_to_hub")
  ]),

  // ===== 접근 시도 =====
  ...defineScene("arsonist_approach", () => [
    action("arsonist_approach_kind", [], [eff.rel("arsonist", 1)]),
    action("arsonist_approach_direct", [], [eff.rel("arsonist", 1)]),
    action("interact_arsonist")
  ]),

  // 친절하게 접근
  ...defineScene("arsonist_approach_kind", () => [
    action("return_to_hub")
  ]),

  // 직접적으로 접근
  ...defineScene("arsonist_approach_direct", () => [
    action("return_to_hub")
  ]),

  // ===== 조용히 관찰 =====
  ...defineScene("arsonist_observe", () => [
    action("return_to_hub")
  ]),

  // ===== 화재 계획 제안 =====
  ...defineScene("arsonist_intro_plan", () => [
    action("arsonist_agree_plan", [], [eff.flag("knowArsonistPlan"), eff.rel("arsonist", 1)]),
    action("arsonist_refuse_plan", [], [eff.flag("arsonistEnemy")]),
    action("arsonist_ignore_plan"),
    action("interact_arsonist")
  ]),

  // 계획 동의
  ...defineScene("arsonist_agree_plan", () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // 계획 거부
  ...defineScene("arsonist_refuse_plan", () => [
    action("return_to_hub")
  ]),

  // 무시
  ...defineScene("arsonist_ignore_plan", () => [
    action("return_to_hub")
  ]),

  // ===== 화재 계획 논의 =====
  ...defineScene("arsonist_plan_discuss", {
    effects: [eff.rel("arsonist", 1)]
  }, () => [
    // 라이터 기름 전달
    action("arsonist_give_oil", [cond.has("라이터 기름")]),
    // 중재자로서 설득 (갈등 중재 플래그)
    action("arsonist_reconsider", [cond.flag("conflictMediator")]),
    // 준비 상태 확인
    action("arsonist_check_ready", [cond.flag("arsonistReady")]),
    action("interact_arsonist")
  ]),

  // 라이터 기름 전달
  ...defineScene("arsonist_give_oil", {
    effects: [eff.drop("라이터 기름"), eff.flag("arsonistReady"), eff.rel("arsonist", 2)]
  }, () => [
    action("arsonist_talk_scar"),
    action("arsonist_talk_crime"),
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // 흉터 이야기
  ...defineScene("arsonist_talk_scar", () => [
    action("arsonist_talk_crime"),
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // 범죄 이야기
  ...defineScene("arsonist_talk_crime", () => [
    action("arsonist_calm_response", [], [eff.rel("arsonist", 1)]),
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // 진정시키는 반응
  ...defineScene("arsonist_calm_response", () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // 재고 요청 (중재자)
  ...defineScene("arsonist_reconsider", {
    effects: [eff.flag("arsonistMinimized")]
  }, () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // 준비 상태 확인
  ...defineScene("arsonist_check_ready", () => [
    action("return_to_hub")
  ]),

  // ===== 흉터에 대해 묻기 =====
  ...defineScene("arsonist_ask_scar", () => [
    action("arsonist_scar_story"),
    action("interact_arsonist")
  ]),

  // 흉터 이야기
  ...defineScene("arsonist_scar_story", {
    effects: [eff.rel("arsonist", 1)]
  }, () => [
    action("arsonist_scar_continue"),
    action("return_to_hub")
  ]),

  // 이야기 계속
  ...defineScene("arsonist_scar_continue", () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // ===== 갈등 중재 (메시아와 방화범) =====
  ...defineScene("arsonist_conflict_event", () => [
    action("arsonist_mediate", [], [eff.flag("conflictMediator")]),
    action("arsonist_watch")
  ]),

  // 중재
  ...defineScene("arsonist_mediate", {
    effects: [eff.rel("arsonist", 1), eff.rel("messiah", 1)]
  }, () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // 관망
  ...defineScene("arsonist_watch", () => [
    action("return_to_hub")
  ])
};
