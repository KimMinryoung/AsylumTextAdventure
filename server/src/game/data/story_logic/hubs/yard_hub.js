/**
 * 운동장 허브 장면
 *
 * 야외 운동장. 다양한 NPC와 만날 수 있고, 담장 탐색 등 탈출 관련 행동 가능.
 */

const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

module.exports = {
  ...defineScene("hub_yard", { location: "yard" }, () => [
    // NPC 상호작용 (해당 NPC가 운동장에 있을 때만 표시)
    action("interact_messiah", [cond.npcAt("messiah")]),
    action("interact_fraudster", [cond.npcAt("fraudster")]),
    action("interact_arsonist", [cond.npcAt("arsonist")]),
    action("interact_groper", [cond.npcAt("groper")]),
    action("interact_political", [cond.npcAt("political")]),

    // 운동장 고유 행동
    action("yard_hub_walk"),                    // 산책
    action("yard_hub_exercise"),                // 운동
    action("yard_hub_wall", [cond.flag("knowWallCrack")]),  // 담장 균열 조사

    // 시스템 행동
    action("location_select"),
    action("time_advance", [], [eff.advanceTime()])
  ]),

  // 산책
  ...defineScene("yard_hub_walk", {
    location: "yard",
    effects: [eff.rel("guard", 1)]
  }, () => [
    action("yard_hub_discover_crack", [cond.notFlag("knowWallCrack")]),
    action("hub_yard")
  ]),

  // 담장 균열 발견
  ...defineScene("yard_hub_discover_crack", {
    location: "yard",
    effects: [eff.flag("knowWallCrack")]
  }, () => [
    action("hub_yard")
  ]),

  // 운동
  ...defineScene("yard_hub_exercise", {
    location: "yard",
    effects: [eff.rel("guard", 1)]
  }, () => [
    action("hub_yard")
  ]),

  // 담장 균열 조사
  ...defineScene("yard_hub_wall", { location: "yard" }, () => [
    action("yard_hub_wall_dig", [cond.has("삽"), cond.time(3)]),  // 저녁에 삽이 있으면
    action("hub_yard")
  ]),

  // 담장 파기
  ...defineScene("yard_hub_wall_dig", {
    location: "yard",
    effects: [eff.flag("wallDigProgress")]
  }, () => [
    action("hub_yard", [], [eff.advanceTime()])
  ])
};
