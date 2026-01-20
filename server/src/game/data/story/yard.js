const { n, d, cond, eff, action, defineScene } = require('../../SceneBuilder');

const yardScenes = {
  ...defineScene("yard", {
    title: "운동장",
    location: "yard",
    description: [
      d("guard", "야, 변태 새끼. 뭘 빤히 쳐다봐? 눈깔 빼버릴까?"),
    ],
    actions: () => [
      action("\"당신이나 거울 좀 보시지.\"", "gameover_guard_murder"),
      action("고개를 숙이고 사과한다.", "yard_bow_guard"),
      action("조용히 메시아 쪽으로 피한다.", "yard_messiah"),
      action("소아성폭력범에게 다가간다.", "yard_pedophile"),
      action("혼자 운동장을 걷는다.", "yard_walk")
    ]
  }),

  ...defineScene("yard_walk", {
    title: "산책",
    location: "yard",
    description: [
      n("담벼락 아래 콘크리트 벽에 **금이 가 있다**."),
    ],
    actions: () => [
      action("균열을 자세히 살펴본다.", "yard_crack", [], [eff.flag("knowWallCrack")]),
      action("무시하고 계속 걷는다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("yard_crack", {
    title: "벽의 균열",
    location: "yard",
    description: [
      n("시간을 들여 파면 담벼락을 뚫을 수 있을지도 모른다."),
    ],
    actions: () => [
      action("자리를 뜬다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("day_three_afternoon", {
    title: "셋째 날 오후",
    location: "yard",
    description: [
      n("오후 운동 시간이다. 하늘에 먹구름이 끼어 있다."),
    ],
    actions: () => [
      action("메시아에게 열쇠를 전달한다.", "messiah_key_delivery", [cond.has("환기구 카드키")]),
      action("간수장의 약점을 이용해 협박한다.", "warden_blackmail", [cond.flag("knowWardenWeakness")]),
      action("담벼락의 균열을 다시 확인한다.", "wall_crack_plan", [cond.flag("knowWallCrack")]),
      action("오늘 밤을 위해 휴식을 취한다.", "day_three_evening")
    ]
  }),

  ...defineScene("warden_blackmail", {
    title: "협박",
    location: "yard",
    description: [
      d("warden", "...좋아. 새벽 3시에 지하 비상구."),
    ],
    effects: [eff.flag("wardenBlackmailed")],
    actions: () => [
      action("조용히 자리를 뜬다.", "day_three_evening")
    ]
  }),

  ...defineScene("wall_crack_plan", {
    title: "균열 확인",
    location: "yard",
    description: [
      n("비가 오면 콘크리트가 약해질 것이다. 오늘 밤 비가 올 것 같다."),
    ],
    actions: () => [
      action("밤에 균열을 파볼 계획을 세운다.", "day_three_evening", [], [eff.flag("wallEscapePlan")]),
      action("다른 방법을 생각한다.", "day_three_evening")
    ]
  })
};

module.exports = yardScenes;
