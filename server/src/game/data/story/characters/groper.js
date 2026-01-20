const { n, d, cond, eff, action, defineScene } = require('../../../SceneBuilder');

const groperScenes = {
  ...defineScene("talk_groper", {
    title: "치한과의 대화",
    location: "cell",
    description: [
      d("groper", "뭐야... 뭘 봐? 나한테 뭔 볼일이야?"),
      d("groper", "내 귀 말이야? 이건 밖에서 피해자 오빠가... 칼을 들고 찾아왔거든. 히히."),
    ],
    actions: () => [
      action("어떻게 잡히게 됐는지 묻는다.", "groper_past"),
      action("수용소에 대해 아는 게 있는지 묻는다.", "groper_info"),
      action("\"역겹네. 귀 하나로 끝난 게 다행이다.\"", "groper_threat"),
      action("말없이 자리를 뜬다.", "cell_observe")
    ]
  }),

  ...defineScene("groper_threat", {
    title: "위협",
    location: "cell",
    description: [
      d("groper", "...뭐라고? 너... 날 무시해?"),
      d("groper", "좋아... 좋아. 기억해주지. 히히히..."),
    ],
    effects: [eff.flag("groperEnemy")],
    actions: () => [
      action("불안한 마음으로 자리를 뜬다.", "cell_observe")
    ]
  }),

  ...defineScene("groper_past", {
    title: "치한의 과거",
    location: "cell",
    description: [
      d("groper", "나? 나는 지하철에서 '활동'했어. 헤헤."),
      d("groper", "50번도 넘게 했을 걸? 결국 한 여자애가 소리를 질렀어."),
    ],
    actions: () => [
      action("더 이상 듣고 싶지 않다. 자리를 뜬다.", "first_night"),
      action("억지로 참고 수용소에 대해 묻는다.", "groper_info")
    ]
  }),

  ...defineScene("groper_info", {
    title: "치한의 정보",
    location: "cell",
    description: [
      d("groper", "새벽 2시에 혼자 순찰 도는 놈. 그 놈, 항상 **의무실**에서 한 시간씩 사라져."),
      d("groper", "그 한 시간 동안은... 복도가 텅 비어. 알겠어?"),
    ],
    effects: [eff.flag("knowPatrolGap")],
    actions: () => [
      action("고맙다고 하고 자리를 뜬다.", "first_night")
    ]
  }),

  ...defineScene("cafeteria_groper_event", {
    title: "소란",
    location: "cafeteria",
    description: [
      d("groper", "야, 거기 신입. 우리 친해지자고. 히히..."),
    ],
    effects: [eff.flag("knowGroperDanger")],
    actions: () => [
      action("식사를 마치고 자리를 뜬다.", "cafeteria_end")
    ]
  }),

  ...defineScene("gameover_groper_trap", {
    title: "덫",
    location: "workshop",
    description: [n("**[GAME OVER: 산업재해]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  })
};

module.exports = groperScenes;
