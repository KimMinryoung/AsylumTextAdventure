const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

const scenes = {
  ...defineScene("yard_bow_guard", () => [
    action("yard_walk")
  ]),

  ...defineScene("cafeteria_guard_friendly", { effects: [eff.flag("extraMeal"), eff.rel("guard", 1)] }, () => [
    action("cafeteria_end")
  ]),

  ...defineScene("guard_favor_workshop", { effects: [eff.getItem("담배 한 갑"), eff.flag("easyWorkAssigned")] }, () => [
    action("guard_favor_storage")
  ]),

  ...defineScene("guard_favor_storage", { effects: [eff.getItem("녹슨 철사"), eff.flag("exploredStorage")] }, () => [
    action("guard_favor_storage_search"),
    action("day_three_afternoon")
  ]),

  ...defineScene("guard_favor_storage_search", { effects: [eff.getItem("수용소 배치도"), eff.flag("knowFloorPlan")] }, () => [
    action("day_three_afternoon")
  ]),

  ...defineScene("guard_night_friendly", { effects: [eff.getItem("빵 조각"), eff.rel("guard", 1)] }, () => [
    action("day_three_morning"),
    action("guard_night_info")
  ]),

  ...defineScene("guard_night_info", { effects: [eff.flag("knowWardenMedical"), eff.flag("knowStorageDeals"), eff.rel("guard", 1)] }, () => [
    action("day_three_morning")
  ]),

  ...defineScene("guard_night_hostile", { effects: [eff.rel("guard", 1)] }, () => [
    action("day_three_morning")
  ])
};

module.exports = scenes;
