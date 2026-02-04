/**
 * 복도 허브 장면
 *
 * 이동 통로. 간수와 만날 확률이 높고, 다른 장소로 이동하기 좋은 위치.
 */

const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

module.exports = {
  ...defineScene("hub_corridor", { location: "corridor" }, () => [
    // NPC 상호작용 (해당 NPC가 복도에 있을 때만 표시)
    action("interact_fraudster", [cond.npcAt("fraudster")]),
    action("interact_groper", [cond.npcAt("groper")]),
    action("interact_pedophile", [cond.npcAt("pedophile")]),
    action("interact_guard", [cond.npcAt("guard")]),

    // 복도 고유 행동
    action("corridor_observe"),                 // 복도 관찰
    action("corridor_sneak", [cond.time(4), cond.flag("knowPatrolSchedule")]),  // 야간 이동 (밤 + 순찰 정보)

    // 시스템 행동
    action("location_select"),
    action("time_advance", [], [eff.advanceTime()])
  ]),

  // 복도 관찰
  ...defineScene("corridor_observe", { location: "corridor" }, () => [
    action("corridor_learn_patrol", [cond.notFlag("knowPatrolSchedule")]),
    action("corridor_nothing_new")
  ]),

  // 순찰 패턴 파악
  ...defineScene("corridor_learn_patrol", {
    location: "corridor",
    effects: [eff.flag("knowPatrolSchedule")]
  }, () => [
    action("hub_corridor")
  ]),

  // 새로운 정보 없음
  ...defineScene("corridor_nothing_new", { location: "corridor" }, () => [
    action("hub_corridor")
  ]),

  // 야간 이동
  ...defineScene("corridor_sneak", { location: "corridor" }, () => [
    action("corridor_to_basement", [cond.has("낡은 열쇠")]),
    action("corridor_to_roof", [cond.flag("knowRoofAccess")]),
    action("hub_corridor")
  ]),

  // 지하실로
  ...defineScene("corridor_to_basement", {
    location: "basement",
    effects: [eff.moveTo("basement")]
  }, () => [
    action("hub_corridor")  // 일단 복도로 돌아가는 옵션만
  ]),

  // 옥상으로
  ...defineScene("corridor_to_roof", {
    location: "roof",
    effects: [eff.moveTo("roof")]
  }, () => [
    action("hub_corridor")
  ])
};
