const { n, d, cond, eff, action, defineScene } = require('../../../SceneBuilder');

const messiahScenes = {
  ...defineScene("talk_messiah", {
    title: "메시아와의 대화",
    location: "cell",
    description: [
      d("messiah", "나에게 관심이 있는가, 새로운 양이여?"),
      n("가까이서 보니 그의 눈동자가 묘하게 흔들리고 있다."),
      d("messiah", "나는 밖에서 **새로운 종교**를 만들었지. 《천상의 문》이라고..."),
      d("messiah", "함께할 자들만이 구원받을 것이다. 나를 믿겠나?"),
    ],
    actions: () => [
      action("\"당신은 어떻게 메시아가 됐나요?\"", "messiah_origin", [cond.relMin("messiah", 3)]),
      action("\"믿겠습니다.\"", "messiah_trust", [], [eff.flag("knowMessiahPlan")]),
      action("\"생각해 보겠습니다.\"", "messiah_doubt"),
      action("\"사이비 교주랑은 엮이기 싫군.\"", "messiah_reject")
    ]
  }),

  ...defineScene("messiah_origin", {
    title: "메시아의 기원",
    location: "cell",
    description: [
      n("메시아의 눈빛이 머나먼 곳을 바라본다."),
      d("messiah", "나는... 원래 평범한 의사였어. 작은 마을 병원의 외과의."),
      d("messiah", "어느 날 밤, 대형 사고가 났어. 환자가 수십 명 쏟아졌지."),
      d("messiah", "그때 **목소리**가 들렸어. '너는 선택받았다. 죽음을 결정하는 자.'"),
    ],
    actions: () => [
      action("\"그래서 어떻게 됐나요?\"", "messiah_origin_2"),
      action("무섭다. 물러난다.", "cell_observe")
    ]
  }),

  ...defineScene("messiah_origin_2", {
    title: "메시아의 탄생",
    location: "cell",
    description: [
      d("messiah", "어느 날, 한 아이가 찾아왔어. 암 말기였지. 의학으로는 가망이 없었어."),
      d("messiah", "근데... 내가 손을 얹으니까... 아이가 나았어. 진짜로."),
      d("messiah", "넌 믿음이 있는 자 같아. 함께하겠나, 형제여?"),
    ],
    actions: () => [
      action("\"...믿겠습니다.\"", "messiah_trust", [], [eff.flag("knowMessiahPlan")]),
      action("\"아직 잘 모르겠어요.\"", "messiah_doubt")
    ]
  }),

  ...defineScene("messiah_trust", {
    title: "메시아의 신뢰",
    location: "cell",
    description: [
      n("메시아의 얼굴에 환한 미소가 번진다."),
      d("messiah", "현명한 선택이야, 형제여. 너는 구원받을 자격이 있어."),
      d("messiah", "3일 후 새벽, **환기구**가 열리는 시간이 있어. 그때 움직인다."),
    ],
    actions: () => [
      action("고개를 끄덕이고 물러난다.", "first_night")
    ]
  }),

  ...defineScene("messiah_doubt", {
    title: "유보",
    location: "cell",
    description: [
      d("messiah", "의심은 지혜의 시작이지... 하지만 너무 오래 망설이면 기회는 사라진다."),
    ],
    actions: () => [
      action("다른 죄수들에게 말을 건다.", "cell_introduction"),
      action("침대로 가서 쉰다.", "first_night")
    ]
  }),

  ...defineScene("messiah_reject", {
    title: "거부",
    location: "cell",
    description: [
      n("메시아의 눈빛이 순간 얼어붙는다."),
      d("messiah", "...사이비... 교주...?"),
      d("messiah", "좋아... 좋아. 불신자는 스스로 지옥을 선택하는 법이지. 후회하게 될 거야."),
      n("사기꾼이 슬쩍 다가온다."),
      d("fraudster", "야... 너 진짜 대담하다. 저거 추종자가 꽤 있어."),
    ],
    effects: [eff.flag("messiahEnemy")],
    actions: () => [
      action("사기꾼의 말을 듣는다.", "talk_fraudster"),
      action("무시하고 침대로 간다.", "first_night")
    ]
  }),

  ...defineScene("yard_messiah", {
    title: "메시아의 설교",
    location: "yard",
    description: [
      d("messiah", "어서 와라, 자매여. 믿는 자들만이 새로운 세상을 맞이하리라."),
    ],
    actions: () => [
      action("계획에 대해 물어본다.", "messiah_plan_detail", [cond.flag("knowMessiahPlan")]),
      action("조용히 듣고만 있는다.", "cafeteria_arrival"),
      action("슬쩍 자리를 뜬다.", "yard")
    ]
  }),

  ...defineScene("messiah_plan_detail", {
    title: "계획의 상세",
    location: "yard",
    description: [
      d("messiah", "**내일 밤**, 환기구를 통해 탈출한다. 간수장의 특수 열쇠가 필요해."),
    ],
    actions: () => [
      action("열쇠를 구해보겠다고 한다.", "messiah_mission_accept", [], [eff.flag("messiahKeyMission")]),
      action("생각할 시간이 필요하다고 한다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("messiah_mission_accept", {
    title: "임무 수락",
    location: "yard",
    description: [
      d("messiah", "간수장은 저녁에 **의무실**에 들러. 그때가 기회야."),
    ],
    actions: () => [
      action("고개를 끄덕이고 물러난다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("cafeteria_messiah", {
    title: "메시아의 테이블",
    location: "cafeteria",
    description: [
      d("messiah", "앉아라, 길 잃은 영혼이여. 이곳의 삶이 어떻든?"),
    ],
    actions: () => [
      action("\"지옥 같아요.\"", "cafeteria_messiah_hell", [], [eff.rel("messiah")]),
      action("\"버틸 만합니다.\"", "cafeteria_messiah_tough"),
      action("\"당신은 왜 여기 있는 거죠?\"", "cafeteria_messiah_question")
    ]
  }),

  ...defineScene("cafeteria_messiah_hell", {
    title: "지옥",
    location: "cafeteria",
    description: [
      d("messiah", "지옥에도 구원은 있다. 마음의 평화를 원한다면 기도 모임에 오게."),
    ],
    effects: [eff.flag("messiahInvite")],
    actions: () => [
      action("\"관심 있어요.\"", "cafeteria_messiah_join", [], [eff.rel("messiah")]),
      action("\"생각해 볼게요.\"", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_messiah_tough", {
    title: "강함",
    location: "cafeteria",
    description: [
      d("messiah", "혼자서는 이곳을 버틸 수 없어. 언젠가 네게도 **의지할 곳**이 필요할 거야."),
    ],
    actions: () => [
      action("자리에서 일어난다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_messiah_question", {
    title: "질문",
    location: "cafeteria",
    description: [
      d("messiah", "나는 **진실**을 말했기 때문에 여기 있다. 진실을 말하는 자는 박해받는 법이지."),
    ],
    effects: [eff.flag("knowMessiahStory")],
    actions: () => [
      action("고개를 끄덕이고 식사를 계속한다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_messiah_join", {
    title: "환영",
    location: "cafeteria",
    description: [
      d("messiah", "오늘 밤 소등 후에 동쪽 복도 끝으로 와."),
    ],
    effects: [eff.rel("messiah", 2)],
    actions: () => [
      action("고개를 끄덕인다.", "cafeteria_end")
    ]
  }),

  ...defineScene("mediator_messiah_detail", {
    title: "메시아의 계획",
    location: "workshop",
    description: [
      d("messiah", "정전 속에서 환기구로 탈출한다. 간수장의 카드키가 필요해."),
    ],
    effects: [eff.flag("messiahKeyMission")],
    actions: () => [
      action("열쇠를 구해보겠다고 한다.", "day_three_key_heist"),
      action("다른 방법도 살펴본다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("messiah_key_delivery", {
    title: "열쇠 전달",
    location: "yard",
    description: [
      d("messiah", "오늘 밤 2시, 환기구 앞에서 만나자."),
    ],
    effects: [eff.flag("messiahKeyDelivered"), eff.rel("messiah", 3)],
    actions: () => [
      action("고개를 끄덕이고 물러난다.", "day_three_evening")
    ]
  }),

  ...defineScene("ending_messiah_enhanced", {
    title: "완벽한 구원",
    description: [
      d("messiah", "형제여, 네 믿음이 우리 모두를 구원했다!"),
      n("**[엔딩 A+: 선택받은 자]**"),
    ],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("ending_messiah_route", {
    title: "구원의 밤",
    description: [
      n("**[엔딩 A: 구원의 밤]**"),
    ],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("gameover_messiah_followers", {
    title: "이단자의 최후",
    location: "cell",
    description: [n("**[GAME OVER: 이단자 처형]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  })
};

module.exports = messiahScenes;
