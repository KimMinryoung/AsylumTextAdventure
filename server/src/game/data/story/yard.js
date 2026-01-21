const { n, d, cond, eff, action, defineScene } = require('../../SceneBuilder');

const yardScenes = {
  ...defineScene("yard", {
    location: "yard",
    description: [
      n("운동장은 높은 담벼락으로 둘러싸여 있다. 하늘이 보이는 유일한 장소이다."),
      n("...하늘이다. 며칠 만에 처음 보는 하늘."),
      n("감옥에 갇히기 전에는 하늘을 올려다볼 일이 거의 없었다."),
      n("게임 개발에 쫓겨서 모니터만 봤으니까."),
      n("아이러니하게도 감옥에 와서야 하늘의 소중함을 알았다."),
      n("여기저기서 죄수들이 운동을 하거나 무리 지어 이야기를 나누고 있다."),
      n("구석에서 **메시아**가 몇몇 추종자들에게 무언가를 설교하고 있다."),
      n("반대편에서는 **소아성폭력범**이 혼자 웅크리고 앉아 있다. 다른 죄수들이 대놓고 피하는 게 보인다."),
      n("...저 사람, 불쌍하다고 해야 하나? 아니, 저지른 짓을 생각하면 당연한 건가?"),
      n("간수 한 명이 당신을 유독 노려보며 다가온다."),
      d("guard", "야, 변태 새끼. 뭘 빤히 쳐다봐? 눈깔 빼버릴까?"),
      n("...이 간수, 왜 나한테만 이래?"),
    ],
    actions: () => [
      action("\"당신이나 거울 좀 보시지.\"", "gameover_guard_murder"),
      action("고개를 숙이고 사과한다.", "yard_bow_guard"),
      action("조용히 메시아 쪽으로 피한다.", "yard_messiah"),
      action("소아성폭력범에게 다가간다.", "yard_pedophile"),
      action("혼자 운동장을 걷는다.", "yard_walk")
    ]
  }),

  ...defineScene("yard_bow_guard", {
    location: "yard",
    description: [
      n("고개를 숙인다. 지금 대들어봤자 손해다."),
      d("player", "죄송합니다..."),
      d("guard", "뭐? 안 들려. 더 크게!"),
      d("player", "죄송합니다!"),
      n("간수가 코웃음 친다."),
      d("guard", "치사한 년. 그래도 깝치는 것보단 낫다."),
      n("그가 툭 건드리고 지나간다. 어깨가 쓰리다."),
      n("주변에서 다른 죄수들이 힐끗 본다. 동정인지 조롱인지 모르겠다."),
      n("...자존심 상하지만, 어쩔 수 없다."),
      n("여기서 자존심 부리다간 뼈가 부러진다."),
    ],
    effects: [eff.rel("guard", 1)],
    actions: () => [
      action("운동장을 걷는다.", "yard_walk"),
      action("소아성폭력범에게 다가간다.", "yard_pedophile")
    ]
  }),

  ...defineScene("yard_walk", {
    location: "yard",
    description: [
      n("당신은 혼자 운동장 가장자리를 걷는다."),
      n("높은 담벼락 위로 철조망이 보인다. 감시탑에서 간수가 망원경으로 이쪽을 보고 있다."),
      n("레벨 디자인 관점에서 분석한다. 습관이다."),
      n("담벼락 높이: 약 5미터. 철조망: 예리한 칼날형. 감시탑: 2개, 교차 시야."),
      n("정면 돌파는 자살행위다. 다른 루트를 찾아야 해."),
      n("담벼락 아래를 걷다가 이상한 것을 발견한다."),
      n("콘크리트 벽에 **금이 가 있다**. 오래된 균열인 것 같은데..."),
      n("오, 이건 좀 쓸모있을 수도?"),
    ],
    actions: () => [
      action("균열을 자세히 살펴본다.", "yard_crack", [], [eff.flag("knowWallCrack")]),
      action("뭔가 이상한 소리가 들린다.", "yard_strange_sound"),
      action("무시하고 계속 걷는다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("yard_strange_sound", {
    location: "yard",
    description: [
      n("담벼락 너머에서 뭔가 들린다."),
      n("'웅웅웅...'"),
      n("기계 소리? 아니, 이건..."),
      n("벌 소리다. 엄청나게 많은 벌 소리."),
      n("담 너머를 올려다본다. 담벼락 위, 철조망 사이에 뭔가 검은 덩어리가 있다."),
      n("...벌집이다. 거대한 벌집."),
      d("unknown", "저거 건드리면 안 돼."),
      n("옆에서 목소리가 들린다. 정치범이다."),
      d("political", "작년에 한 놈이 탈출한다고 철조망 올라갔다가 저거 건드렸어."),
      d("player", "어떻게 됐어요?"),
      d("political", "쏘여서 떨어졌지. 떨어지면서 목이 부러졌고."),
      n("...끔찍하다."),
      d("political", "간수들이 일부러 안 치워. 자연 경비 시스템이라고."),
      n("자연 경비 시스템이라니. 블랙유머인가."),
      d("political", "근데 이상해. 벌들이 가끔 이상하게 행동해."),
      d("player", "이상하게요?"),
      d("political", "밤에 벌집 쪽에서 빛이 나. 벌이 빛나진 않잖아?"),
      n("...뭐?"),
      n("그녀가 어깨를 으쓱한다."),
      d("political", "그냥 이상하다고. 여기 이상한 게 한두 개가 아니니까."),
      n("[운동장의 이상한 현상을 알게 되었다.]"),
    ],
    effects: [eff.flag("knowBeeNest")],
    actions: () => [
      action("균열을 살펴본다.", "yard_crack", [], [eff.flag("knowWallCrack")]),
      action("정치범과 더 이야기한다.", "yard_political_talk"),
      action("식당으로 간다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("yard_political_talk", {
    location: "yard",
    description: [
      n("정치범과 함께 운동장을 걷는다."),
      d("player", "여기 이상한 게 뭐가 더 있어요?"),
      n("그녀가 잠시 생각한다."),
      d("political", "음... 동쪽 담 너머에 숲이 있는 거 알아?"),
      d("player", "네."),
      d("political", "그 숲에서 가끔 불빛이 보여. 횃불 같은 거."),
      d("player", "사람이 있나요?"),
      d("political", "몰라. 근데 이 시설 주변 10킬로는 출입 금지 구역이야."),
      d("political", "공식적으로는 아무도 없어야 해."),
      n("그녀가 담 너머 숲을 바라본다."),
      d("political", "메시아가 말하더라. 바깥에 '형제들'이 있다고."),
      d("political", "처음엔 헛소리인 줄 알았는데... 그 불빛 보면 모르겠어."),
      n("메시아의 형제들? 컬트 멤버들이 바깥에 있다는 건가?"),
      n("...탈출에 이용할 수 있을까?"),
      n("[메시아의 외부 세력에 대한 힌트를 얻었다.]"),
    ],
    effects: [eff.flag("knowOutsideForce"), eff.rel("political", 1)],
    actions: () => [
      action("식당으로 간다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("yard_crack", {
    location: "yard",
    description: [
      n("몸을 숙여 스트레칭하는 척하며 균열을 살펴본다."),
      n("연기력이 필요하다. 자연스럽게, 자연스럽게."),
      n("균열은 생각보다 깊다. 손가락을 넣으면 콘크리트 조각이 부서져 나온다."),
      n("오래된 균열이다. 수십 년 된 것 같은데."),
      n("게임 레벨이었으면 이건 분명 '히든 루트'의 신호다."),
      n("시간을 들여 파면... 어쩌면 담벼락을 뚫을 수 있을지도 모른다."),
      n("근데 문제가 있다."),
      n("감시탑에서 잘 보이는 위치다. 낮에는 불가능하고."),
      n("밤에는... 여기 올 수 있나? 소등 후엔 감방에 갇히는데."),
      n("비가 오면 콘크리트가 약해질 것 같다. 그때를 노려야 할까?"),
      n("[담벼락의 취약점을 발견했다.]"),
    ],
    actions: () => [
      action("나중을 위해 기억해둔다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("yard_messiah", {
    location: "yard",
    description: [
      n("메시아 쪽으로 피한다. 추종자들 사이에 섞여 들어간다."),
      n("메시아가 무언가를 말하고 있다."),
      d("messiah", "...그리고 그날이 오면, 우리는 다시 태어날 것이다."),
      d("messiah", "이 감옥의 벽은 무너지고, 우리는 빛 속으로 걸어 나갈 것이다."),
      n("추종자들이 황홀한 표정으로 듣고 있다."),
      n("...설교 내용은 뻔한데, 왜 이렇게 빨려들 것 같지?"),
      n("이 사람 목소리에 뭔가 있다. 최면 같은 거?"),
      n("메시아가 당신을 발견한다."),
      d("messiah", "오, 새로운 양이 왔구나. 환영한다."),
      n("추종자들의 시선이 집중된다. 뭔가 대답해야 할 것 같은 압박감."),
    ],
    effects: [eff.rel("messiah", 1)],
    actions: () => [
      action("\"저도 끼워주세요.\"", "yard_join_messiah"),
      action("\"그냥 지나가는 길이에요.\"", "yard_decline_messiah"),
      action("조용히 듣기만 한다.", "yard_listen_messiah")
    ]
  }),

  ...defineScene("yard_join_messiah", {
    location: "yard",
    description: [
      n("일단 어울리는 게 좋을 것 같다. 정보도 얻을 수 있고."),
      d("player", "저도... 끼워주세요."),
      n("메시아가 환하게 웃는다."),
      d("messiah", "좋다! 새로운 가족이 늘었구나."),
      n("추종자들이 환영의 표시로 당신의 어깨를 두드린다."),
      n("...컬트 분위기인데. 괜찮겠지?"),
      d("messiah", "걱정 마라. 우리는 서로를 지키는 가족이야."),
      d("messiah", "곧 너도 알게 될 거야. 구원의 날이 가까워지고 있다는 걸."),
      n("구원의 날? 뭔가 계획이 있는 건가?"),
      n("더 알아봐야겠다."),
      n("[메시아의 무리에 합류했다.]"),
    ],
    effects: [eff.rel("messiah", 2), eff.flag("joinedMessiah")],
    actions: () => [
      action("더 듣는다.", "yard_messiah_plan"),
      action("식당으로 간다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("yard_messiah_plan", {
    location: "yard",
    description: [
      n("설교가 끝난 후, 메시아가 당신에게 다가온다."),
      d("messiah", "너, 게임을 만들었다고?"),
      d("player", "...네."),
      d("messiah", "게임엔 규칙이 있지. 이 감옥에도 규칙이 있어."),
      d("messiah", "근데 규칙을 만드는 자는 규칙 위에 있어."),
      n("무슨 말을 하려는 거지?"),
      d("messiah", "난 이 감옥의 규칙을 바꿀 거야. 곧."),
      d("messiah", "원한다면 넌 그 새로운 규칙의 일부가 될 수 있어."),
      n("탈출 계획인가?"),
      n("눈빛을 읽으려 하지만 알 수 없다. 광기인지 확신인지."),
      d("messiah", "수요일 밤. 기억해둬."),
      n("그가 의미심장하게 웃고 떠난다."),
      n("[메시아가 수요일 밤에 뭔가를 계획하고 있다.]"),
    ],
    effects: [eff.flag("knowMessiahTiming")],
    actions: () => [
      action("식당으로 간다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("yard_decline_messiah", {
    location: "yard",
    description: [
      d("player", "아, 그냥 지나가는 길이에요. 운동하러요."),
      n("메시아의 눈이 가늘어진다. 뭔가 읽는 것 같은 느낌."),
      d("messiah", "그래? 운동도 좋지."),
      d("messiah", "하지만 기억해. 혼자서는 이곳을 나갈 수 없어."),
      d("messiah", "언젠가 나를 찾게 될 거야."),
      n("예언인가 협박인가."),
      n("추종자들의 시선이 따갑다. 빨리 벗어나는 게 좋겠다."),
    ],
    actions: () => [
      action("운동장을 걷는다.", "yard_walk"),
      action("식당으로 간다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("yard_listen_messiah", {
    location: "yard",
    description: [
      n("아무 말 없이 듣기만 한다. 정보 수집이 먼저다."),
      n("메시아의 설교가 계속된다."),
      d("messiah", "이 벽들은 우리를 가두기 위해 세워졌지만, 곧 무너질 것이다."),
      d("messiah", "바깥에 우리를 기다리는 형제들이 있다. 그들이 신호를 보내면..."),
      n("바깥에 사람들이 있다고?"),
      d("messiah", "정전이 일어날 것이다. 그리고 어둠 속에서 빛이 열릴 것이다."),
      n("정전... 탈출 계획이구나."),
      n("바깥 사람들이 정전을 일으키고, 그 틈에 탈출한다?"),
      n("미친 소리 같지만... 계획이 있긴 있는 것 같다."),
      n("[메시아의 탈출 계획 개요를 알게 되었다.]"),
    ],
    effects: [eff.flag("heardMessiahPlan")],
    actions: () => [
      action("식당으로 간다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("yard_pedophile", {
    location: "yard",
    description: [
      n("소아성폭력범에게 다가간다."),
      n("...왜? 나도 모르겠다. 동질감? 호기심?"),
      n("아니, 그냥 저 사람도 나처럼 여기서 아웃사이더니까."),
      n("그가 당신이 다가오는 걸 보고 움츠러든다."),
      d("pedophile", "왜, 왜 왔어? 나 때리러 온 거야?"),
      n("목소리가 떨린다. 트라우마가 있나 보다."),
      d("player", "아니, 그냥..."),
      d("pedophile", "다들 나 때려. 맨날. 씻을 때도, 밥 먹을 때도..."),
      n("그가 소매를 걷는다. 온몸에 멍이 들어 있다."),
      d("pedophile", "근데 왜 안 때려? 이상하네."),
      n("...뭐라고 해야 하지?"),
    ],
    actions: () => [
      action("\"나도 비슷한 취급 받으니까.\"", "yard_pedophile_bond"),
      action("\"정보가 좀 필요해서.\"", "yard_pedophile_info"),
      action("말없이 떠난다.", "yard_walk")
    ]
  }),

  ...defineScene("yard_pedophile_bond", {
    location: "yard",
    description: [
      d("player", "나도 비슷한 취급 받으니까. 여기서 '변태' 소리 듣는 거."),
      n("그가 고개를 든다. 눈이 충혈되어 있다."),
      d("pedophile", "...진짜? 너도?"),
      d("player", "게임 때문에. 뉴스 봤을 거야."),
      d("pedophile", "아... 그 사람. 알아."),
      n("잠시 침묵."),
      d("pedophile", "근데... 넌 진짜로 아이들을 건드린 건 아니잖아. 그냥 게임인데."),
      n("...복잡하다. 이 사람한테 위로를 받을 줄이야."),
      d("pedophile", "난 진짜야. 난 진짜로 그랬어. 나쁜 놈이지."),
      n("그가 무릎에 얼굴을 묻는다."),
      d("pedophile", "근데 맞는다고 나아지는 것도 아닌데... 왜 맨날 맞아야 해?"),
      n("대답할 수 없다. 정의인지 폭력인지."),
      n("[소아성폭력범과 묘한 유대가 생겼다.]"),
    ],
    effects: [eff.rel("pedophile", 2)],
    actions: () => [
      action("더 이야기한다.", "yard_pedophile_info"),
      action("자리를 뜬다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("yard_pedophile_info", {
    location: "yard",
    description: [
      d("player", "여기 오래 있었어? 뭔가 아는 거 있어?"),
      n("그가 주변을 살피며 목소리를 낮춘다."),
      d("pedophile", "...3년. 여기서 3년 있었어."),
      d("pedophile", "많이 봤어. 많이 들었고."),
      d("player", "뭘 알아?"),
      d("pedophile", "간수장 있잖아. 정 대위."),
      d("player", "응."),
      d("pedophile", "그 사람 새벽에 의무실 가. 2시에서 3시 사이에."),
      d("player", "왜?"),
      d("pedophile", "여자야. 간호사. 둘이 그래."),
      n("간수장이 불륜을? 그것도 근무 중에?"),
      d("pedophile", "근데 그 사람 아내가 상부 사람이야. 들키면 끝이지."),
      n("이건... 쓸모있는 정보다."),
      n("[간수장의 약점을 알게 되었다.]"),
    ],
    effects: [eff.flag("knowWardenWeakness"), eff.rel("pedophile", 1)],
    actions: () => [
      action("\"고마워.\"", "yard_pedophile_thanks"),
      action("자리를 뜬다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("yard_pedophile_thanks", {
    location: "yard",
    description: [
      d("player", "고마워. 유용한 정보야."),
      n("그가 어색하게 웃는다. 처음 보는 표정이다."),
      d("pedophile", "고맙다고 한 거... 여기 와서 처음 들어."),
      d("pedophile", "원래 다들 나한테 욕만 하거든."),
      n("...뭐라고 해야 할지 모르겠다."),
      d("pedophile", "나중에 뭐 필요하면 말해. 내가 할 수 있는 게 있으면 도와줄게."),
      n("이 사람이 도움이 될까? 모르겠다."),
      n("근데 적보다는 아군이 낫긴 하다."),
      n("[소아성폭력범이 당신에게 호의적이다.]"),
    ],
    effects: [eff.flag("helpedPedophile")],
    actions: () => [
      action("식당으로 간다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("day_three_yard", {
    location: "yard",
    description: [
      n("오후 운동 시간이다. 하늘에 먹구름이 끼어 있다."),
      n("폭풍 전야 같은 분위기. 공기가 무겁다."),
      n("운동장에서 죄수들이 삼삼오오 모여 있다. 긴장감이 느껴진다."),
      n("메시아가 추종자들과 무언가를 속삭이고 있고, 방화범은 혼자 벽을 바라보며 중얼거리고 있다."),
      n("다들 뭔가를 준비하고 있다."),
      n("오늘 밤이 그날인가?"),
    ],
    actions: () => [
      action("메시아에게 열쇠를 전달한다.", "messiah_key_delivery", [cond.has("환기구 카드키")]),
      action("간수장의 약점을 이용해 협박한다.", "warden_blackmail", [cond.flag("knowWardenWeakness")]),
      action("담벼락의 균열을 다시 확인한다.", "wall_crack_plan", [cond.flag("knowWallCrack")]),
      action("저녁을 먹으러 간다.", "day_three_dinner")
    ]
  }),

  ...defineScene("warden_blackmail", {
    location: "yard",
    description: [
      n("운동 시간이 끝날 무렵, 간수장이 혼자 있는 틈을 노린다."),
      n("심장이 미친 듯이 뛴다. 이건 위험한 도박이다."),
      n("당신은 그에게 조용히 다가가 속삭인다."),
      d("player", "정 대위... 의무실에서 뭘 하시는지 알고 있습니다. 여자 문제라고요?"),
      n("간수장의 얼굴이 창백해진다."),
      d("warden", "뭐, 뭔 소리야 이 새끼가...!"),
      d("player", "새벽 2시에서 3시 사이요. 간호사분이랑."),
      n("그의 눈이 흔들린다. 맞았다."),
      d("player", "오늘 밤, 지하 비상구를 열어주시면 아무 말 안 하겠습니다. 아니면..."),
      n("간수장이 이를 악문다. 주먹이 떨리고 있다. 때릴 것 같다."),
      n("하지만 그는 주변을 살핀다. 다른 간수들이 보고 있다."),
      d("warden", "(이를 악물며) ...좋아. 새벽 3시에 지하 비상구. 한 번뿐이야."),
      d("warden", "그 후엔 니가 어떻게 되든 난 몰라."),
      n("됐다. 루트 하나 확보."),
      n("[간수장을 협박해 비상구 탈출 루트를 확보했다.]"),
    ],
    effects: [eff.flag("wardenBlackmailed")],
    actions: () => [
      action("조용히 자리를 뜬다.", "day_three_dinner")
    ]
  }),

  ...defineScene("wall_crack_plan", {
    location: "yard",
    description: [
      n("담벼락 구석의 균열을 다시 살펴본다."),
      n("어제보다 더 벌어진 것 같다."),
      n("손가락을 넣어본다. 콘크리트가 부스러진다."),
      n("비가 오면 더 약해질 것 같다."),
      n("하늘을 올려다본다. 먹구름이 잔뜩 끼어 있다. 오늘 밤 비가 올 것 같다."),
      n("비가 오면 감시도 느슨해지겠지. 시야도 안 좋아지고."),
      n("밤에 여기 올 수 있을까?"),
      n("...아니, 방법을 찾아야 해. 이 루트가 제일 안전해 보인다."),
    ],
    actions: () => [
      action("밤에 균열을 파볼 계획을 세운다.", "wall_plan_set", [], [eff.flag("wallEscapePlan")]),
      action("다른 방법을 생각한다.", "day_three_dinner")
    ]
  }),

  ...defineScene("wall_plan_set", {
    location: "yard",
    description: [
      n("오늘 밤, 비가 오면 균열을 파보자."),
      n("드라이버가 있으면 좋을 텐데. 아니면 뾰족한 거라도."),
      n("혼자서 뚫을 수 있을까? 시간이 얼마나 걸릴까?"),
      n("변수가 많다. 근데 다른 루트도 다 위험하긴 마찬가지다."),
      n("적어도 이건 다른 사람에게 의존하지 않아도 된다."),
      n("메시아도, 사기꾼도, 방화범도 믿을 수 없으니까."),
      n("[담벼락 탈출 계획을 세웠다.]"),
    ],
    actions: () => [
      action("저녁을 먹으러 간다.", "day_three_dinner")
    ]
  })
};

module.exports = yardScenes;
