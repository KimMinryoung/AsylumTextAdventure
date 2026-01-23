const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

const scenes = {
  // 폐허가 된 예배당
  ...defineScene("tunnels_chapel", () => [
    action("tunnels_chapel_key", [cond.notFlag("gotChapelKey")], [eff.getItem("오래된 열쇠"), eff.flag("gotChapelKey")]),
    action("tunnels_chapel_bible", [cond.notFlag("gotBible")], [eff.getItem("성경책"), eff.flag("gotBible")]),
    action("tunnels_altar"),
    action("tunnels_main")
  ]),

  // 예배당에서 열쇠 발견
  ...defineScene("tunnels_chapel_key", () => [
    action("tunnels_chapel")
  ]),

  // 예배당에서 성경책 발견
  ...defineScene("tunnels_chapel_bible", () => [
    action("tunnels_chapel")
  ]),

  // 제단 - 수호자 조우
  ...defineScene("tunnels_altar", () => [
    action("guardian_encounter")
  ]),

  // 수호자 조우 - 다양한 생존 경로
  ...defineScene("guardian_encounter", { effects: [eff.flag("metGuardian")] }, () => [
    action("guardian_cross_protection", [cond.has("십자가 목걸이")]),
    action("guardian_prayer", [cond.has("성경책"), cond.flag("messiahBlessing")]),
    action("guardian_knowledge", [cond.flag("readMonkDiary"), cond.flag("knowGuardianSecret")]),
    action("guardian_flee"),
    action("ending_guardian_death")
  ]),

  // 십자가로 수호자 물리침
  ...defineScene("guardian_cross_protection", { effects: [eff.flag("passedGuardian")] }, () => [
    action("tunnels_collapse_dig", [cond.has("녹슨 곡괭이")]),
    action("tunnels_deep")
  ]),

  // 기도로 수호자 물리침
  ...defineScene("guardian_prayer", { effects: [eff.flag("passedGuardian"), eff.rel("messiah", 2)] }, () => [
    action("tunnels_collapse_dig", [cond.has("녹슨 곡괭이")]),
    action("tunnels_deep")
  ]),

  // 지식으로 수호자 회피
  ...defineScene("guardian_knowledge", { effects: [eff.flag("passedGuardian")] }, () => [
    action("guardian_secret_path", [], [eff.flag("foundSecretPath")]),
    action("tunnels_deep")
  ]),

  // 비밀 통로 발견
  ...defineScene("guardian_secret_path", () => [
    action("tunnels_exit")
  ]),

  // 도망 - 공포 증가
  ...defineScene("guardian_flee", { effects: [eff.flag("dungeon_fear_2")] }, () => [
    action("tunnels_deep"),
    action("ending_dungeon_lost", [cond.flag("dungeon_fear_1"), cond.flag("dungeon_fear_2")])
  ])
};

module.exports = scenes;
