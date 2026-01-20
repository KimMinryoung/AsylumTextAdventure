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
        n("메시아가 당신을 옆으로 데려가 낮은 목소리로 속삭인다."),
        d("messiah", "네가 나를 믿기로 했으니 알려주지."),
        d("messiah", "**내일 밤**, 밖에서 우리 신도들이 움직인다. 정전을 일으키고, 그 혼란 속에서 **환기구**를 통해 탈출하는 거야."),
        d("messiah", "문제는 환기구 잠금장치야. 내부에서 열어야 하는데... {{특수 열쇠}}가 필요해. 간수장이 가지고 있지."),
        d("messiah", "그 열쇠를 구할 방법을 찾아야 해. 도울 수 있겠나, 자매여?")
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
        n("당신이 다가가자 메시아의 추종자들이 경계의 눈빛을 보낸다. 하지만 메시아가 손을 들어 그들을 제지한다."),
        d("messiah", "앉아라, 길 잃은 영혼이여. 이 테이블엔 자리가 있다."),
        n("당신이 앉자 메시아가 부드러운 미소를 짓는다. 그의 눈동자는 형광등 빛 아래서도 이상하게 빛난다."),
        d("messiah", "너는 며칠 전에 들어왔지? 이곳의 삶이 어떻든?"),
        n("주변의 추종자들이 당신의 대답을 기다린다.")
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
              d("messiah", "그렇지. 이곳은 지옥이다. 육체의 지옥이자 영혼의 지옥."),
        n("메시아가 죽 그릇을 내려다보며 말을 잇는다."),
        d("messiah", "하지만 지옥에도 구원은 있다. 나는 그것을 보았고, 너에게도 보여줄 수 있어."),
        d("messiah", "매일 밤 우리는 기도 모임을 연다. 마음의 평화를 원한다면... 언제든 환영이야."),
        n("추종자들이 고개를 끄덕인다. 그들의 눈빛에는 광신적인 믿음이 서려 있다."),
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
        n("메시아의 눈이 가늘어진다. 탐구하듯 당신을 바라본다."),
        d("messiah", "강한 척하는 거야, 아니면 진짜 강한 거야?"),
        n("잠시 침묵이 흐른다."),
        d("messiah", "어느 쪽이든 상관없어. 이곳에선 둘 다 필요하니까."),
        d("messiah", "하지만 기억해. 혼자서는 이곳을 버틸 수 없어. 언젠가 네게도 **의지할 곳**이 필요할 거야."),
        n("메시아가 다시 식사에 집중한다. 대화가 끝났다는 신호다.")
    ],
    actions: () => [
      action("자리에서 일어난다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_messiah_question", {
    title: "질문",
    location: "cafeteria",
    description: [
        n("메시아의 미소가 살짝 굳는다. 추종자들 사이에 긴장감이 흐른다."),
        d("messiah", "...대담하군. 아무도 그런 질문은 하지 않는데."),
        n("그가 천천히 숟가락을 내려놓는다."),
        d("messiah", "나는 **진실**을 말했기 때문에 여기 있다. 정부가 숨기고 싶어하는 진실을."),
        d("messiah", "사람들은 내 말을 따랐고, 그들은 그것을 '사이비'라고 불렀지. 진실을 말하는 자는 언제나 박해받는 법이야."),
        n("그의 목소리에는 확신이 가득하다. 믿거나 말거나, 그 자신은 완전히 믿고 있다.")
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
        d("messiah", "현명한 선택이야."),
        n("메시아가 당신의 손을 잡는다. 의외로 따뜻한 손이다."),
        d("messiah", "오늘 밤 소등 후에 동쪽 복도 끝으로 와. 간수들은 그 시간에 순찰을 돌지 않아."),
        n("추종자들이 은밀한 미소를 교환한다."),
        d("messiah", "그리고... 혹시 **탈출**에 관심이 있다면, 우리가 알고 있는 것들이 있어. 나중에 이야기하지.")
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
        n("메시아가 당신을 구석으로 데려간다."),
        d("messiah", "오늘 밤 정전이 일어날 거야. 밖에 있는 내 신도들이 준비했지."),
        d("messiah", "문제는 환기구 잠금장치야. 간수장의 카드키가 필요해."),
        d("messiah", "네가 그걸 구해줄 수 있다면... 우리의 구원은 확실해진다."),
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
        n("메시아에게 다가가 몰래 카드키를 전달한다."),
        n("메시아의 눈이 환하게 빛난다."),
        d("messiah", "해냈구나, 형제여... 이것으로 구원의 문이 열릴 것이다."),
        d("messiah", "오늘 밤 2시, 환기구 앞에서 만나자. 구원이 가까워졌다..."),
    ],
    effects: [eff.flag("messiahKeyDelivered"), eff.rel("messiah", 3)],
    actions: () => [
      action("고개를 끄덕이고 물러난다.", "day_three_evening")
    ]
  }),

};

module.exports = messiahScenes;
