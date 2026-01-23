const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

const scenes = {
  // 지하실에서 던전 입구 발견
  ...defineScene("dungeon_discover", { effects: [eff.flag("foundTunnels")] }, () => [
    action("tunnels_entrance", [cond.has("방수 손전등")]),
    action("dungeon_too_dark", [cond.notHas("방수 손전등")]),
    action("solo_partial_basement")
  ]),

  // 손전등 없이 들어가려 할 때
  ...defineScene("dungeon_too_dark", () => [
    action("solo_partial_basement")
  ]),

  // 터널 입구
  ...defineScene("tunnels_entrance", { effects: [eff.flag("enteredDungeon")] }, () => [
    action("tunnels_entrance_search", [], [eff.getItem("수도사 일기")]),
    action("tunnels_main"),
    action("solo_partial_basement")
  ]),

  // 터널 입구 수색 - 수도사 일기 획득
  ...defineScene("tunnels_entrance_search", { effects: [eff.flag("readMonkDiary")] }, () => [
    action("tunnels_main"),
    action("solo_partial_basement")
  ])
};

module.exports = scenes;
