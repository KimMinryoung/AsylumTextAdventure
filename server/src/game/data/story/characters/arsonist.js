const { n, d, cond, eff, action, defineScene } = require('../../../SceneBuilder');

const arsonistScenes = {
  ...defineScene("talk_arsonist_day", {
    title: "방화범과의 대화",
    location: "cell",
    description: [
        n("방화범이 멍하니 허공을 바라보고 있다. 가까이 다가가자 그가 천천히 고개를 돌린다."),
        n("얼굴 왼편의 화상 자국이 처참하다. 녹아내린 것처럼 일그러진 피부가 눈 아래까지 퍼져 있다."),
        d("arsonist", "...뭐야. 뭘 봐."),
        n("그의 눈빛이 순간 날카롭게 빛나다가, 이내 흐릿해진다."),
        d("arsonist", "아... 새로 온 녀석이구나. 이상한 게임 만든."),
        n("그가 손가락을 튕긴다. 마치 성냥에 불을 붙이는 동작처럼."),
        d("arsonist", "불... 좋아해? 난 좋아해. 세상에서 제일 아름다운 게 불이야.")
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
        n("방화범의 눈빛이 차갑게 변한다."),
        d("arsonist", "...처음 보는 년이 참 궁금한 게 많네."),
        n("그가 손가락으로 당신을 가리킨다."),
        d("arsonist", "내 얘기가 듣고 싶어? 그럼 뭔가 줘. 세상에 공짜는 없어."),
        n("그가 다시 허공을 바라본다. 하지만 당신에게 관심을 갖긴 한 모양이다.")
    ],
    actions: () => [
      action("자리를 뜬다.", "cell_observe")
    ]
  }),

  ...defineScene("arsonist_scar", {
    title: "방화범의 상처",
    location: "workshop",
    description: [
        n("방화범이 일그러진 얼굴을 손으로 쓸어내린다. 눈빛이 묘하게 그리워하는 듯하다."),
        d("arsonist", "이거? 내 첫 번째 작품에서 받은 선물이야."),
        d("arsonist", "열일곱 살 때... 우리 집을 태웠어. 아버지가 잠든 밤에."),
        n("그가 눈을 감고 회상한다."),
        d("arsonist", "그 인간은... 매일 나를 때렸거든. 엄마는 도망갔고, 나만 남았어. 지하실에 가둬놓고... 담배불로 지지고..."),
        n("그의 손이 떨린다."),
        d("arsonist", "근데 불이 붙는 순간... 처음으로 **힘**을 느꼈어. 내가 통제하는 거잖아. 그 인간이 비명을 지르면서 타들어가는 걸 봤을 때..."),
        d("arsonist", "눈을 뗄 수가 없었어. 너무 아름다웠거든. 근데 들보가 무너지면서 나도 맞았어. 헤헤..."),
        n("그가 상처를 쓰다듬으며 광기 어린 미소를 짓는다."),
        d("arsonist", "아프지 않았어. 불은... 날 정화해준 거야.")
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
        n("방화범의 눈이 반짝인다. 마치 가장 자랑스러운 이야기를 꺼내는 것처럼."),
        d("arsonist", "내가 왜 여기 있는지 알아? 공장 세 개, 아파트 한 동, 그리고... 고아원 하나."),
        n("고아원이라는 단어에 당신의 등골이 서늘해진다."),
        d("arsonist", "고아원은... 계획에 없었어. 근데 바로 옆에 있었거든. 불이 번졌어. 내 잘못이 아니야."),
        n("그가 잠시 멈칫한다. 눈빛에 찰나의 고통이 스친다."),
        d("arsonist", "...아이들이 열두 명 죽었어. 검사가 사진을 보여줬는데... 다 까맣게 타 있었어."),
        d("arsonist", "그때부터 가끔 꿈을 꿔. 아이들이 불타면서... 나를 부르는 꿈."),
        n("그가 머리를 세게 흔든다."),
        d("arsonist", "!!닥쳐!! 시끄럽다고... 시끄럽다고!!"),
        n("그가 갑자기 소리를 지르며 머리를 쥐어뜯는다.")
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
        n("당신이 조심스럽게 어깨를 터치하자, 방화범이 멈칫한다."),
        d("arsonist", "...미안. 가끔 이래. 목소리가... 들려서."),
        n("그가 숨을 고르며 진정한다."),
        d("arsonist", "너는 정말 괜찮은 녀석이야. 다른 것들은 다 도망가거든.")
    ],
    actions: () => [
      action("고개를 끄덕인다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("conflict_messiah_arsonist", {
    title: "대립",
    location: "cell",
    description: [
        n("갑자기 감방 안에 긴장감이 흐른다. 메시아가 방화범 앞에 서 있다."),
        d("messiah", "자매여, 네 안의 불꽃은 파괴가 아니라 정화를 위해 있어야 해. 내 말을 들어."),
        d("arsonist", "닥쳐. 난 네 '자매'가 아니야. 네 사이비 개소리 듣기 싫어."),
        n("방화범의 눈에 위험한 빛이 번쩍인다."),
        d("arsonist", "너도 태워버릴 거야. 언젠가. 네 그 거짓 예언자 같은 얼굴이 녹아내리는 걸 볼 거야."),
        d("messiah", "...불쌍한 영혼. 구원받지 못할 자는 스스로 불길 속에 뛰어들게 되어 있지."),
        n("둘 사이의 공기가 얼어붙는다. 다른 죄수들이 긴장하며 지켜본다.")
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
        n("당신이 둘 사이에 끼어든다."),
        d("player", "그만해요. 둘 다. 간수들한테 들리면 어쩌려고."),
        n("메시아가 미소를 짓는다."),
        d("messiah", "평화의 사도로군. 네 말이 맞아, 자매여. 지금은 때가 아니지."),
        n("방화범이 코웃음을 치며 물러난다."),
        d("arsonist", "...다음에 보자. 둘 다."),
        n("갈등을 중재해서 두 사람 모두에게 인상을 남겼다.")
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
        n("당신은 한 발 뒤로 물러서서 상황을 지켜본다."),
        d("political", "..."),
        n("정치범이 당신 옆으로 와서 조용히 속삭인다."),
        d("political", "저 둘은 원래 저래. 메시아가 방화범을 '구원'하겠다고 집착하거든. 방화범은 그게 싫고."),
        d("political", "언젠가 폭발할 거야. 그때 끼어들지 마. 다칠 뿐이니까."),
        n("결국 간수의 호루라기 소리에 둘은 물러난다.")
    ],
    actions: () => [
      action("침대로 돌아간다.", "first_night")
    ]
  }),

  ...defineScene("night_whisper", {
    title: "밤의 속삭임",
    location: "cell",
    description: [
        n("갑자기 옆 침대에서 속삭이는 소리가 들린다."),
        n("어둠 속에서 누군가 당신의 침대 옆으로 다가온다."),
        d("arsonist", "...자? 안 자지?"),
        n("방화범이다. 그의 눈이 어둠 속에서 이상하게 빛난다."),
        d("arsonist", "나... 이 수용소를 태울 거야. 조만간. 근데 네가 필요해."),
        d("arsonist", "불이 나면 혼란이 생기잖아. 그 틈에 도망치는 거야. 단, 나한테 **라이터 기름**이 필요해. 구할 수 있어?")
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
        n("방화범의 얼굴에 광기 어린 미소가 번진다."),
        d("arsonist", "좋아, 좋아... 역시 넌 말을 잘 알아먹을 것 같았어."),
        d("arsonist", "작업장에 가면 기계에 쓰는 기름이 있어. 그거 좀 빼돌려 줘. 나머지는 내가 할게."),
        d("arsonist", "아름다울 거야... 이 썩은 곳이 불타는 모습. 히히..."),
        n("그가 어둠 속으로 사라진다.")
    ],
    actions: () => [
      action("불안한 마음으로 잠을 청한다.", "day_two_morning")
    ]
  }),

  ...defineScene("arsonist_refuse", {
    title: "거부",
    location: "cell",
    description: [
        d("arsonist", "죽어? 하하... 그게 뭐가 문제야? 여기 있는 년들 다 죽어 마땅한 쓰레기들인데."),
        n("방화범의 눈빛이 차갑게 변한다."),
        d("arsonist", "넌 모르는 거야. 불의 정화를... 뭐, 싫으면 가만히 있으라고."),
        d("arsonist", "만약 방해하면 넌 통구이 일순위다."),
        n("그가 자신의 침대로 돌아간다. 등골이 서늘해진다."),
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
        n("당신은 눈을 꼭 감고 자는 척한다."),
        d("arsonist", "...쳇. 재미없는 년."),
        n("방화범이 투덜거리며 돌아간다. 한참이 지나서야 심장 박동이 가라앉는다.")
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
        n("방화범이 기계 뒤로 당신을 부른다."),
        d("arsonist", "넌 내가 무섭다고 도망가지 않았어. 그래서 믿을 수 있어."),
        d("arsonist", "오늘 밤 이 곳을 태울 거야. 불이 나면 혼란이 생기고, 그 틈에 도망치는 거지."),
        d("arsonist", "기름이 필요해. 작업장에 있잖아. 구해줄 수 있어?"),
        n("당신이 그를 중재했기에 그도 당신의 의견을 들을 것 같다.")
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
        n("간수가 졸고 있는 틈을 타 기름통에 다가간다."),
        n("작은 병에 기름을 조금씩 옮겨 담는다. 심장이 터질 것 같다."),
        n("다행히 아무도 눈치채지 못했다. 라이터 기름을 얻었다.")
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
        n("방화범이 기계 뒤에서 당신을 기다리고 있다."),
        d("arsonist", "기름은 가져왔어? 오늘 밤이야. 오늘 밤 이 지옥을 태울 거야."),
        n("그의 눈이 광기로 빛난다.")
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
        n("방화범이 기름을 받아들고 환하게 웃는다."),
        d("arsonist", "완벽해... 오늘 밤, 자정쯤에 시작할 거야. 불이 나면 동쪽 담벼락으로 와. 거기서 만나자."),
        n("그의 손이 기름병을 쓰다듬는다. 광기 어린 애정으로."),
        d("arsonist", "아름다울 거야..."),
        n("그가 당신을 빤히 바라본다. 평소와 다른, 기묘하게 맑은 눈빛이다."),
        d("arsonist", "...넌 날 도와줬어. 그러니까 이제 동료야. 뭐 궁금한 거 있어?")
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
        d("arsonist", "...뭐? 왜 못 구해? 도와준다면서?"),
        n("방화범의 얼굴이 일그러진다."),
        d("arsonist", "쓸모없는 년... 됐어, 내가 알아서 할게. 대신 네 몫은 없어."),
        n("그가 돌아선다.")
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
        n("당신의 말에 방화범이 짜증을 낸다."),
        d("arsonist", "다친다고? 그게 뭔 상관이야? 원래 불은 어떻게 번질지 모르니까 재밌는 거야."),
        n("그러나 당신은 단호한 표정을 유지한다."),
        n("그가 머리를 감싸쥔다."),
        d("arsonist", "고아원 아이들... 그때는 건물만 태우려 했었는데... 죽을 줄은 몰랐지...."),
        n("방화범은 한참 고민하다가 마음을 돌린다."),
        d("arsonist", "...알았어. 불을 줄일게. 동쪽 창고만 태울 거야. 거긴 사람이 없으니까."),
    ],
    effects: [eff.flag("arsonistMinimized")],
    actions: () => [
      action("고맙다고 말하고 자리로 돌아간다.", "day_three_afternoon")
    ]
  }),


};

module.exports = arsonistScenes;
