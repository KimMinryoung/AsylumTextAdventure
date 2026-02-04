/**
 * 감방 허브 장면
 *
 * 플레이어의 기본 위치. 휴식, 수면, 일부 NPC와의 대화 가능.
 */

const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

module.exports = {
  ...defineScene("hub_cell", { location: "cell" }, () => [
    // NPC 상호작용 (해당 NPC가 감방에 있을 때만 표시)
    action("interact_messiah", [cond.npcAt("messiah")]),
    action("interact_political", [cond.npcAt("political")]),
    action("interact_wifekiller", [cond.npcAt("wifekiller")]),

    // 감방 고유 행동
    action("cell_rest"),           // 휴식
    action("cell_search", [cond.notFlag("cellSearched")]),  // 감방 수색 (1회)
    action("cell_sleep", [cond.time(4)]),  // 수면 (밤에만)

    // 시스템 행동
    action("location_select"),     // 다른 장소로 이동
    action("time_advance", [], [eff.advanceTime()])  // 시간 진행
  ]),

  // 감방 휴식
  ...defineScene("cell_rest", { location: "cell" }, () => [
    action("hub_cell")
  ]),

  // 감방 수색
  ...defineScene("cell_search", {
    location: "cell",
    effects: [eff.flag("cellSearched")]
  }, () => [
    action("cell_search_found", [cond.dayMin(2)]),
    action("cell_search_nothing")
  ]),

  // 수색 결과 - 발견
  ...defineScene("cell_search_found", {
    location: "cell",
    effects: [eff.getItem("낡은 열쇠")]
  }, () => [
    action("hub_cell")
  ]),

  // 수색 결과 - 아무것도 없음
  ...defineScene("cell_search_nothing", { location: "cell" }, () => [
    action("hub_cell")
  ]),

  // 수면 (밤에만, 다음 날로 진행)
  ...defineScene("cell_sleep", {
    location: "cell",
    effects: [eff.nextDay()]
  }, () => [
    action("hub_cell")
  ])
};
