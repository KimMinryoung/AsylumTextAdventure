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
        n("치한의 얼굴이 순간 일그러진다. 히죽거리던 웃음이 사라지고 싸늘한 눈빛이 드러난다."),
        d("groper", "...뭐라고?"),
        n("그가 천천히 일어선다. 생각보다 키가 크다."),
        d("groper", "너... 날 무시해? 별로 다를 것도 없는 주제에!"),
        n("화를 내려던 그는 주변의 눈치를 보고선 목소리를 낮춰 음침하게 중얼거린다."),
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
        n("치한이 음습하게 웃으며 과거를 회상한다."),
        d("groper", "나? 나는 지하철에서 일했어... 아니, '활동'했다고 해야 하나? 헤헤."),
        d("groper", "처음엔 그냥 스치는 정도였어. 근데 점점... 참을 수가 없었어. 그 느낌이..."),
        n("그의 눈이 흐릿해진다. 당신은 구역질이 올라온다."),
        d("groper", "50번도 넘게 했을 걸? 결국 한 여자애가... 소리를 질렀어. 사람들이 달려들었고..."),
        n("그가 잘린 귀를 쓸어내린다."),
        d("groper", "법정에 섰을 때 피해자들이 쭉 서 있었어. 스물세 명. 근데 나, 단 한 명도 얼굴을 못 알아보겠더라고. 헤헤... 미안하다고 해야 하나? 모르겠어."),
        n("그의 말에 진심 어린 반성은 찾아볼 수 없다. 오히려 자랑처럼 들린다.")
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
        n("치한이 주위를 두리번거린다."),
        d("groper", "정보? 헤헤... 그래, 좋아. 알려줄게."),
        d("groper", "난 밤에 잘 못 자거든. 그래서 많이 봐. 많이 들어."),
        n("그가 목소리를 낮춘다."),
        d("groper", "**간수들 중에 하나**가 있어. 새벽 2시에 혼자 순찰 도는 놈. 그 놈, 항상 **의무실**에서 한 시간씩 사라져."),
        d("groper", "거기서 뭘 하는지는 모르겠어. 근데 그 한 시간 동안은... 복도가 텅 비어. 알겠어?"),
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
      n("식당 한쪽에서 소란이 일어나고 있다. **치한**이 어떤 죄수에게 접근하고 있다."),
      d("groper", "야, 거기 신입. 우리 친해지자고. 히히..."),
      n("상대방 죄수가 불쾌한 표정으로 물러난다."),
      d("unknown", "꺼져, 이 변태 새끼야!"),
      n("치한이 불쾌한 웃음을 흘리며 물러난다. 하지만 그의 눈은 여전히 사냥감을 노리고 있다."),
      n("주변 죄수들이 그를 피해 흩어진다. 저 자는 조심해야 한다.")
    ],
    effects: [eff.flag("knowGroperDanger")],
    actions: () => [
      action("식사를 마치고 자리를 뜬다.", "cafeteria_end")
    ]
  }),
};

module.exports = groperScenes;
