/**
 * 식당 허브 장면
 *
 * 점심/저녁 식사 시간에 방문. 많은 NPC와 만날 수 있는 장소.
 */

const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

module.exports = {
  ...defineScene("hub_cafeteria", { location: "cafeteria" }, () => [
    // NPC 상호작용 (해당 NPC가 식당에 있을 때만 표시)
    action("interact_messiah", [cond.npcAt("messiah")]),
    action("interact_fraudster", [cond.npcAt("fraudster")]),
    action("interact_wifekiller", [cond.npcAt("wifekiller")]),
    action("interact_groper", [cond.npcAt("groper")]),
    action("interact_arsonist", [cond.npcAt("arsonist")]),
    action("interact_pedophile", [cond.npcAt("pedophile")]),
    action("interact_political", [cond.npcAt("political")]),

    // 식당 고유 행동
    action("cafeteria_eat"),              // 식사
    action("cafeteria_listen"),           // 주변 대화 엿듣기
    action("cafeteria_kitchen", [cond.relMin("guard", 3)]),  // 주방 접근 (간수 호감도 필요)

    // 시스템 행동
    action("location_select"),
    action("time_advance", [], [eff.advanceTime()])
  ]),

  // 식사
  ...defineScene("cafeteria_eat", { location: "cafeteria" }, () => [
    action("hub_cafeteria")
  ]),

  // 대화 엿듣기
  ...defineScene("cafeteria_listen", { location: "cafeteria" }, () => [
    action("cafeteria_rumor_escape", [cond.notFlag("heardEscapeRumor")]),
    action("cafeteria_rumor_guard", [cond.flag("heardEscapeRumor"), cond.notFlag("heardGuardRumor")]),
    action("cafeteria_nothing_new")
  ]),

  // 탈출 소문 듣기
  ...defineScene("cafeteria_rumor_escape", {
    location: "cafeteria",
    effects: [eff.flag("heardEscapeRumor")]
  }, () => [
    action("hub_cafeteria")
  ]),

  // 간수 소문 듣기
  ...defineScene("cafeteria_rumor_guard", {
    location: "cafeteria",
    effects: [eff.flag("heardGuardRumor")]
  }, () => [
    action("hub_cafeteria")
  ]),

  // 새로운 소문 없음
  ...defineScene("cafeteria_nothing_new", { location: "cafeteria" }, () => [
    action("hub_cafeteria")
  ]),

  // 주방 접근
  ...defineScene("cafeteria_kitchen", { location: "cafeteria" }, () => [
    action("cafeteria_steal_knife", [cond.notHas("식칼")]),
    action("hub_cafeteria")
  ]),

  // 식칼 훔치기
  ...defineScene("cafeteria_steal_knife", {
    location: "cafeteria",
    effects: [eff.getItem("식칼"), eff.rel("guard", -2)]
  }, () => [
    action("hub_cafeteria")
  ])
};
