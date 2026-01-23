const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

const scenes = {
  // 중앙 통로 - 탐험의 허브
  ...defineScene("tunnels_main", () => [
    action("tunnels_east"),
    action("tunnels_chapel"),
    action("tunnels_entrance")
  ]),

  // 동쪽 통로 - 창고와 침수 구역으로 연결
  ...defineScene("tunnels_east", () => [
    action("tunnels_storage", [cond.has("오래된 열쇠")]),
    action("tunnels_storage_locked", [cond.notHas("오래된 열쇠")]),
    action("tunnels_flooded"),
    action("tunnels_main")
  ]),

  // 창고 문이 잠겨있음
  ...defineScene("tunnels_storage_locked", () => [
    action("tunnels_east")
  ]),

  // 창고 - 아이템 획득
  ...defineScene("tunnels_storage", { effects: [eff.flag("foundStorage")] }, () => [
    action("tunnels_storage_search_flashlight", [cond.notHas("방수 손전등")], [eff.getItem("방수 손전등")]),
    action("tunnels_storage_search_rope", [cond.notFlag("gotRope")], [eff.getItem("밧줄"), eff.flag("gotRope")]),
    action("tunnels_storage_search_pickaxe", [cond.notFlag("gotPickaxe")], [eff.getItem("녹슨 곡괭이"), eff.flag("gotPickaxe")]),
    action("tunnels_east")
  ]),

  // 창고 아이템 획득 후 복귀
  ...defineScene("tunnels_storage_search_flashlight", () => [
    action("tunnels_storage"),
    action("tunnels_east")
  ]),

  ...defineScene("tunnels_storage_search_rope", () => [
    action("tunnels_storage"),
    action("tunnels_east")
  ]),

  ...defineScene("tunnels_storage_search_pickaxe", () => [
    action("tunnels_storage"),
    action("tunnels_east")
  ]),

  // 침수된 통로
  ...defineScene("tunnels_flooded", () => [
    action("tunnels_flooded_cross", [cond.has("밧줄")]),
    action("tunnels_flooded_fail", [cond.notHas("밧줄")]),
    action("tunnels_east")
  ]),

  // 침수 통로 실패
  ...defineScene("tunnels_flooded_fail", { effects: [eff.flag("dungeon_fear_1")] }, () => [
    action("tunnels_east")
  ]),

  // 침수 통로 통과 성공
  ...defineScene("tunnels_flooded_cross", { effects: [eff.flag("crossedFlood")] }, () => [
    action("tunnels_deep"),
    action("tunnels_east")
  ]),

  // 깊은 지하 - 붕괴 지점과 지하 감옥으로 연결
  ...defineScene("tunnels_deep", () => [
    action("tunnels_collapse"),
    action("tunnels_prison"),
    action("tunnels_flooded_cross")
  ]),

  // 붕괴 지점 - 곡괭이 필요
  ...defineScene("tunnels_collapse", () => [
    action("tunnels_collapse_dig", [cond.has("녹슨 곡괭이")], [eff.flag("dugThrough"), eff.drop("녹슨 곡괭이")]),
    action("tunnels_collapse_blocked", [cond.notHas("녹슨 곡괭이")]),
    action("tunnels_deep")
  ]),

  // 붕괴 지점 - 곡괭이 없음
  ...defineScene("tunnels_collapse_blocked", () => [
    action("tunnels_deep")
  ]),

  // 붕괴 지점 - 곡괭이로 뚫기 성공
  ...defineScene("tunnels_collapse_dig", { effects: [eff.flag("dungeon_noise")] }, () => [
    action("tunnels_exit")
  ]),

  // 지하 감옥 - 고문서 발견
  ...defineScene("tunnels_prison", () => [
    action("tunnels_prison_search", [], [eff.getItem("고문서"), eff.flag("foundDocument")]),
    action("catacombs_tomb"),
    action("tunnels_deep")
  ]),

  // 지하 감옥 수색
  ...defineScene("tunnels_prison_search", { effects: [eff.flag("knowGuardianSecret")] }, () => [
    action("catacombs_tomb"),
    action("tunnels_deep")
  ]),

  // 무명 무덤 - 십자가 목걸이 발견
  ...defineScene("catacombs_tomb", () => [
    action("catacombs_tomb_search", [cond.notFlag("gotCross")], [eff.getItem("십자가 목걸이"), eff.flag("gotCross")]),
    action("tunnels_prison")
  ]),

  // 무덤 수색
  ...defineScene("catacombs_tomb_search", () => [
    action("tunnels_prison")
  ]),

  // 탈출구 - 탈출 성공 엔딩으로
  ...defineScene("tunnels_exit", () => [
    action("ending_dungeon_escape", [cond.flag("passedGuardian")]),
    action("tunnels_exit_blocked", [cond.notFlag("passedGuardian")])
  ]),

  // 탈출구가 막힘 - 예배당을 통해 가야 함
  ...defineScene("tunnels_exit_blocked", () => [
    action("tunnels_deep")
  ])
};

module.exports = scenes;
