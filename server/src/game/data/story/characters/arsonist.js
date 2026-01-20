const { n, d, cond, eff, action, defineScene } = require('../../../SceneBuilder');

const arsonistScenes = {
  ...defineScene("talk_arsonist_day", {
    title: "방화범과의 대화",
    location: "cell",
    description: [
      d("arsonist", "...뭐야. 뭘 봐."),
      d("arsonist", "불... 좋아해? 난 좋아해. 세상에서 제일 아름다운 게 불이야."),
    ],
    actions: () => [
      action("얼굴 상처에 대해 묻는다.", "arsonist_reject_talk", [], [eff.rel("arsonist")]),
      action("무슨 죄로 들어왔는지 묻는다.", "arsonist_reject_talk", [], [eff.rel("arsonist")]),
      action("위험해 보인다. 자리를 뜬다.", "cell_observe")
    ]
  }),

  ...defineScene("arsonist_reject_talk", {
    title: "거부",
    location: "cell",
    description: [
      d("arsonist", "...처음 보는 년이 참 궁금한 게 많네. 세상에 공짜는 없어."),
    ],
    actions: () => [
      action("자리를 뜬다.", "cell_observe")
    ]
  }),

  ...defineScene("arsonist_scar", {
    title: "방화범의 상처",
    location: "workshop",
    description: [
      d("arsonist", "이거? 내 첫 번째 작품에서 받은 선물이야."),
      d("arsonist", "열일곱 살 때... 우리 집을 태웠어. 아버지가 잠든 밤에."),
      d("arsonist", "불이 붙는 순간... 처음으로 **힘**을 느꼈어. 아프지 않았어."),
    ],
    actions: () => [
      action("다른 불도 질렀는지 묻는다.", "arsonist_crime"),
      action("소름이 끼쳐 자리를 뜬다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("arsonist_crime", {
    title: "방화범의 죄",
    location: "workshop",
    description: [
      d("arsonist", "공장 세 개, 아파트 한 동, 그리고... 고아원 하나."),
      d("arsonist", "...아이들이 열두 명 죽었어. 그때부터 가끔 꿈을 꿔."),
      d("arsonist", "!!닥쳐!! 시끄럽다고... 시끄럽다고!!"),
    ],
    actions: () => [
      action("진정시키려 한다.", "arsonist_calm", [], [eff.rel("arsonist")]),
      action("조용히 물러난다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("arsonist_calm", {
    title: "진정",
    location: "workshop",
    description: [
      d("arsonist", "...미안. 가끔 이래. 너는 정말 괜찮은 녀석이야."),
    ],
    actions: () => [
      action("고개를 끄덕인다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("conflict_messiah_arsonist", {
    title: "대립",
    location: "cell",
    description: [
      d("messiah", "자매여, 네 안의 불꽃은 정화를 위해 있어야 해. 내 말을 들어."),
      d("arsonist", "닥쳐. 난 네 '자매'가 아니야. 너도 태워버릴 거야."),
    ],
    actions: () => [
      action("중재하려 한다.", "conflict_mediate"),
      action("지켜본다.", "conflict_watch")
    ]
  }),

  ...defineScene("conflict_mediate", {
    title: "중재",
    location: "cell",
    description: [
      d("player", "그만해요. 둘 다. 간수들한테 들리면 어쩌려고."),
      d("messiah", "평화의 사도로군. 네 말이 맞아, 자매여."),
      d("arsonist", "...다음에 보자. 둘 다."),
    ],
    effects: [eff.flag("conflictMediator")],
    actions: () => [
      action("상황을 지켜본다.", "first_night")
    ]
  }),

  ...defineScene("conflict_watch", {
    title: "관망",
    location: "cell",
    description: [
      d("political", "저 둘은 원래 저래. 언젠가 폭발할 거야. 그때 끼어들지 마."),
    ],
    actions: () => [
      action("침대로 돌아간다.", "first_night")
    ]
  }),

  ...defineScene("night_whisper", {
    title: "밤의 속삭임",
    location: "cell",
    description: [
      d("arsonist", "...자? 안 자지? 나... 이 수용소를 태울 거야. 나한테 **라이터 기름**이 필요해."),
    ],
    actions: () => [
      action("\"알겠어! 도와줄게.\"", "arsonist_agree", [], [eff.flag("knowArsonistPlan")]),
      action("\"미친 짓이야. 사람들이 죽어.\"", "arsonist_refuse"),
      action("자는 척한다.", "arsonist_ignore")
    ]
  }),

  ...defineScene("arsonist_agree", {
    title: "방화 계획",
    location: "cell",
    description: [
      d("arsonist", "작업장에 가면 기계에 쓰는 기름이 있어. 그거 좀 빼돌려 줘."),
    ],
    actions: () => [
      action("불안한 마음으로 잠을 청한다.", "day_two_morning")
    ]
  }),

  ...defineScene("arsonist_refuse", {
    title: "거부",
    location: "cell",
    description: [
      d("arsonist", "만약 방해하면 넌 통구이 일순위다."),
    ],
    effects: [eff.flag("arsonistEnemy")],
    actions: () => [
      action("뒤척이다 잠이 든다.", "day_two_morning")
    ]
  }),

  ...defineScene("arsonist_ignore", {
    title: "무시",
    location: "cell",
    description: [
      d("arsonist", "...쳇. 재미없는 년."),
    ],
    actions: () => [
      action("그제야 잠이 든다.", "day_two_morning")
    ]
  }),

  ...defineScene("cafeteria_arsonist", {
    title: "방화범의 테이블",
    location: "cafeteria",
    description: [
      d("arsonist", "...왜 여기 앉아?"),
    ],
    actions: () => [
      action("\"다른 자리가 불편해서.\"", "cafeteria_arsonist_honest", [], [eff.rel("arsonist")]),
      action("\"당신이 궁금해서.\"", "cafeteria_arsonist_curious"),
      action("아무 말 없이 식사를 시작한다.", "cafeteria_arsonist_silent", [], [eff.rel("arsonist")])
    ]
  }),

  ...defineScene("cafeteria_arsonist_honest", {
    title: "솔직함",
    location: "cafeteria",
    description: [
      d("arsonist", "...솔직하네. 마음에 들어. 불은... 모든 걸 정화해."),
    ],
    actions: () => [
      action("\"무슨 뜻인지 알 것 같아.\"", "cafeteria_arsonist_bond", [], [eff.rel("arsonist")]),
      action("\"여기서 오래 있었어?\"", "cafeteria_arsonist_time")
    ]
  }),

  ...defineScene("cafeteria_arsonist_curious", {
    title: "호기심",
    location: "cafeteria",
    description: [
      d("arsonist", "궁금해? 이 흉터가? 괴물 구경 왔나 보군."),
    ],
    actions: () => [
      action("\"미안해, 그런 뜻이 아니었어.\"", "cafeteria_arsonist_apologize"),
      action("자리를 뜬다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_arsonist_silent", {
    title: "침묵의 식사",
    location: "cafeteria",
    description: [
      d("arsonist", "...시끄럽지 않아서 좋군."),
    ],
    actions: () => [
      action("고개를 끄덕이고 자리를 뜬다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_arsonist_bond", {
    title: "교감",
    location: "cafeteria",
    description: [
      d("arsonist", "탈출할 생각이 있다면... 불이 필요할 때가 있을 거야. 그때 날 찾아와."),
    ],
    effects: [eff.flag("knowArsonistPlan"), eff.rel("arsonist")],
    actions: () => [
      action("고개를 끄덕인다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_arsonist_time", {
    title: "시간",
    location: "cafeteria",
    description: [
      d("arsonist", "5년. 하지만 시간은 의미없어. 불만 있으면 어디든 괜찮아."),
    ],
    actions: () => [
      action("식사를 마친다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_arsonist_apologize", {
    title: "사과",
    location: "cafeteria",
    description: [
      d("arsonist", "...됐어. 익숙해."),
    ],
    actions: () => [
      action("조용히 식사를 마친다.", "cafeteria_end")
    ]
  }),

  ...defineScene("mediator_arsonist_detail", {
    title: "방화범의 계획",
    location: "workshop",
    description: [
      d("arsonist", "불이 나면 혼란을 틈타 도망친다. 기름이 필요해."),
    ],
    effects: [eff.rel("arsonist")],
    actions: () => [
      action("기름을 구하러 간다.", "workshop_steal_oil_mediator"),
      action("피해를 줄이도록 설득한다.", "arsonist_reconsider"),
      action("다른 방법도 살펴본다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("workshop_steal_oil_mediator", {
    title: "기름 확보",
    location: "workshop",
    description: [
      n("라이터 기름을 얻었다."),
    ],
    effects: [eff.getItem("라이터 기름")],
    actions: () => [
      action("기름을 숨기고 자리로 돌아간다.", "day_three_arsonist_prep")
    ]
  }),

  ...defineScene("day_three_arsonist_prep", {
    title: "방화범의 준비",
    location: "workshop",
    description: [
      d("arsonist", "오늘 밤이야. 기름은 가져왔어?"),
    ],
    actions: () => [
      action("기름을 건네준다.", "arsonist_ready", [cond.has("라이터 기름")]),
      action("\"아직 구하지 못했어...\"", "arsonist_disappointed"),
      action("\"사람들이 다칠 수 있어. 다시 생각해봐.\"", "arsonist_reconsider", [cond.relMin("arsonist", 1)])
    ]
  }),

  ...defineScene("arsonist_ready", {
    title: "준비 완료",
    location: "workshop",
    description: [
      d("arsonist", "밤 자정쯤 시작할 거야. 불이 나면 동쪽 담벼락으로 와."),
    ],
    effects: [eff.flag("arsonistReady"), eff.rel("arsonist", 2)],
    actions: () => [
      action("\"그 상처... 어떻게 생긴 거야?\"", "arsonist_scar"),
      action("\"왜 여기 들어온 거야?\"", "arsonist_crime"),
      action("\"아무것도. 오늘 밤에 보자.\"", "day_three_afternoon")
    ]
  }),

  ...defineScene("arsonist_disappointed", {
    title: "실망",
    location: "workshop",
    description: [
      d("arsonist", "됐어, 내가 알아서 할게. 대신 네 몫은 없어."),
    ],
    effects: [eff.flag("arsonistAbandoned")],
    actions: () => [
      action("찜찜하지만 자리로 돌아간다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("arsonist_reconsider", {
    title: "재고",
    location: "workshop",
    description: [
      d("arsonist", "알았어. 불을 줄일게. 동쪽 창고만 태울 거야."),
    ],
    effects: [eff.flag("arsonistMinimized")],
    actions: () => [
      action("고맙다고 말하고 자리로 돌아간다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("ending_arsonist_safe", {
    title: "통제된 불꽃",
    description: [
      d("arsonist", "...네 말이 맞네. 이 정도로도 충분해."),
      n("**[엔딩 C+: 구원받은 불꽃]**"),
    ],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("ending_arsonist_route", {
    title: "불의 정화",
    description: [
      n("**[엔딩 C: 잿더미 위의 자유]**"),
    ],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("gameover_burned_alive", {
    title: "화염 속에서",
    location: "cell",
    description: [n("**[GAME OVER: 불타는 감방]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  })
};

module.exports = arsonistScenes;
