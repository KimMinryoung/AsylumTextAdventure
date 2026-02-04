/**
 * 치한 통합 상호작용 모듈
 *
 * 불쾌한 성격, 순찰 정보를 알고 있음
 */

const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

module.exports = {
  // ===== 메인 상호작용 진입점 =====
  ...defineScene("interact_groper", () => [
    // 과거 이야기
    action("groper_past_talk"),

    // 정보 얻기
    action("groper_get_info", [cond.notFlag("knowPatrolGap")]),

    // 위협
    action("groper_threaten", [], [eff.flag("groperEnemy")]),

    // 무시
    action("groper_ignore"),

    action("return_to_hub")
  ]),

  // ===== 과거 이야기 =====
  ...defineScene("groper_past_talk", () => [
    action("groper_get_info"),
    action("return_to_hub")
  ]),

  // ===== 정보 얻기 =====
  ...defineScene("groper_get_info", {
    effects: [eff.flag("knowPatrolGap")]
  }, () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // ===== 위협 =====
  ...defineScene("groper_threaten", () => [
    action("return_to_hub")
  ]),

  // ===== 무시 =====
  ...defineScene("groper_ignore", () => [
    action("return_to_hub")
  ]),

  // ===== 위험 이벤트 (식당에서) =====
  ...defineScene("groper_danger_event", {
    effects: [eff.flag("knowGroperDanger")]
  }, () => [
    action("return_to_hub")
  ])
};
