/**
 * 작업장 허브 장면
 *
 * 낮 시간대에 방문 가능. 작업 점수를 얻을 수 있고, 도구를 얻을 수 있음.
 */

const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

module.exports = {
  ...defineScene("hub_workshop", { location: "workshop" }, () => [
    // NPC 상호작용 (해당 NPC가 작업장에 있을 때만 표시)
    action("interact_messiah", [cond.npcAt("messiah")]),
    action("interact_wifekiller", [cond.npcAt("wifekiller")]),
    action("interact_arsonist", [cond.npcAt("arsonist")]),

    // 작업장 고유 행동
    action("workshop_work"),                    // 작업하기 (작업 점수)
    action("workshop_search", [cond.notFlag("workshopSearched")]),  // 작업장 수색 (1회)
    action("workshop_tools", [cond.relMin("guard", 2)]),  // 도구 접근 (간수 호감도 필요)

    // 시스템 행동
    action("location_select"),
    action("time_advance", [], [eff.advanceTime()])
  ]),

  // 작업하기
  ...defineScene("workshop_work", {
    location: "workshop",
    effects: [eff.work(1), eff.rel("guard", 1)]
  }, () => [
    action("hub_workshop")
  ]),

  // 작업장 수색
  ...defineScene("workshop_search", {
    location: "workshop",
    effects: [eff.flag("workshopSearched")]
  }, () => [
    action("workshop_find_wire"),
    action("workshop_find_nothing")
  ]),

  // 철사 발견
  ...defineScene("workshop_find_wire", {
    location: "workshop",
    effects: [eff.getItem("철사")]
  }, () => [
    action("hub_workshop")
  ]),

  // 아무것도 없음
  ...defineScene("workshop_find_nothing", { location: "workshop" }, () => [
    action("hub_workshop")
  ]),

  // 도구 접근
  ...defineScene("workshop_tools", { location: "workshop" }, () => [
    action("workshop_get_shovel", [cond.notHas("삽")]),
    action("workshop_get_hammer", [cond.notHas("망치")]),
    action("hub_workshop")
  ]),

  // 삽 얻기
  ...defineScene("workshop_get_shovel", {
    location: "workshop",
    effects: [eff.getItem("삽")]
  }, () => [
    action("hub_workshop")
  ]),

  // 망치 얻기
  ...defineScene("workshop_get_hammer", {
    location: "workshop",
    effects: [eff.getItem("망치")]
  }, () => [
    action("hub_workshop")
  ])
};
