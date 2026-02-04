/**
 * 장소 선택 메뉴 시스템
 *
 * 각 시간대별로 이동 가능한 장소가 제한됩니다.
 * 장소 선택 후 해당 허브 장면으로 이동합니다.
 */

const { cond, eff, action, defineScene } = require('../../SceneBuilder');

// 시간 슬롯 상수 (GameEngine과 동일)
const TIME_SLOTS = {
  MORNING: 0,
  LUNCH: 1,
  AFTERNOON: 2,
  EVENING: 3,
  NIGHT: 4
};

/**
 * 시간대별 이동 가능한 장소
 *
 * MORNING(0): 아침 - 기상 후 제한적 이동
 * LUNCH(1): 점심 - 식당으로 이동 필수
 * AFTERNOON(2): 낮 - 자유 시간
 * EVENING(3): 저녁 - 제한적 이동
 * NIGHT(4): 밤 - 감방만 가능
 */
const AVAILABLE_LOCATIONS = {
  [TIME_SLOTS.MORNING]: ["cell", "corridor", "yard"],
  [TIME_SLOTS.LUNCH]: ["cafeteria"],
  [TIME_SLOTS.AFTERNOON]: ["workshop", "yard", "corridor", "cell"],
  [TIME_SLOTS.EVENING]: ["cell", "cafeteria", "corridor", "yard"],
  [TIME_SLOTS.NIGHT]: ["cell"]
};

module.exports = {
  // 장소 선택 메뉴 (각 시간대에서 호출)
  ...defineScene("location_select", () => [
    // 아침 시간대 장소
    action("hub_cell", [cond.time(TIME_SLOTS.MORNING)], [eff.moveTo("cell")]),
    action("hub_corridor", [cond.time(TIME_SLOTS.MORNING)], [eff.moveTo("corridor")]),
    action("hub_yard", [cond.time(TIME_SLOTS.MORNING)], [eff.moveTo("yard")]),

    // 점심 시간대 - 식당만 가능
    action("hub_cafeteria", [cond.time(TIME_SLOTS.LUNCH)], [eff.moveTo("cafeteria")]),

    // 낮 시간대 장소
    action("hub_workshop", [cond.time(TIME_SLOTS.AFTERNOON)], [eff.moveTo("workshop")]),
    action("hub_yard", [cond.time(TIME_SLOTS.AFTERNOON)], [eff.moveTo("yard")]),
    action("hub_corridor", [cond.time(TIME_SLOTS.AFTERNOON)], [eff.moveTo("corridor")]),
    action("hub_cell", [cond.time(TIME_SLOTS.AFTERNOON)], [eff.moveTo("cell")]),

    // 저녁 시간대 장소
    action("hub_cell", [cond.time(TIME_SLOTS.EVENING)], [eff.moveTo("cell")]),
    action("hub_cafeteria", [cond.time(TIME_SLOTS.EVENING)], [eff.moveTo("cafeteria")]),
    action("hub_corridor", [cond.time(TIME_SLOTS.EVENING)], [eff.moveTo("corridor")]),
    action("hub_yard", [cond.time(TIME_SLOTS.EVENING)], [eff.moveTo("yard")]),

    // 밤 시간대 - 감방만 가능
    action("hub_cell", [cond.time(TIME_SLOTS.NIGHT)], [eff.moveTo("cell")])
  ]),

  // 시간 진행 (현재 장소에서 시간만 진행)
  ...defineScene("time_advance", {
    effects: [eff.advanceTime()]
  }, () => [
    action("location_select")
  ])
};

// AVAILABLE_LOCATIONS export (다른 모듈에서 참조용)
module.exports.AVAILABLE_LOCATIONS = AVAILABLE_LOCATIONS;
module.exports.TIME_SLOTS = TIME_SLOTS;
