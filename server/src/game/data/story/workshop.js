const { n, d, cond, eff, action, defineScene } = require('../../SceneBuilder');

const workshopScenes = {
  ...defineScene("workshop", {
    location: "workshop",
    description: [
      n("작업장은 기름 냄새와 금속 소리로 가득하다. 죄수들이 기계 앞에서 단순 작업을 반복하고 있다."),
      n("쿵. 쿵. 쿵. 프레스 기계가 철판을 찍어내는 소리가 심장 박동처럼 울린다."),
      n("당신은 프레스 기계 앞에 배치된다."),
      n("...잠깐, 이 기계 안전장치 있는 거 맞아? 비상 정지 버튼이 어딨지?"),
      n("게임 개발할 때 공장 스테이지 만들면서 산업재해 자료 많이 봤는데, 이 기계 구조가 영 불안하다."),
      n("구석에 {{기름통}}이 쌓여 있고, 벽에는 **공구들**이 걸려 있다."),
      n("감시하는 간수는... 졸고 있다. 완전 꿀잠이다. 저러다 잘리는 거 아냐?"),
      n("아, 여기선 노동법 같은 거 없겠지."),
    ],
    actions: () => [
      action("작업에 집중한다.", "gameover_groper_trap", [cond.flag("groperEnemy")]),
      action("기름을 몰래 빼돌린다.", "workshop_steal_oil", [cond.flag("knowArsonistPlan"), cond.notFlag("groperEnemy")], [eff.getItem("라이터 기름")]),
      action("작은 공구를 숨긴다.", "workshop_steal_tool", [cond.notFlag("groperEnemy")], [eff.getItem("작은 드라이버")]),
      action("묵묵히 작업만 한다.", "workshop_normal", [cond.notFlag("groperEnemy")]),
      action("프레스 기계를 자세히 살핀다.", "workshop_examine_press")
    ]
  }),

  ...defineScene("workshop_examine_press", {
    location: "workshop",
    description: [
      n("직업병이 또 도졌다. 기계 구조를 분석하기 시작한다."),
      n("유압식 프레스. 압력은 대충 10톤 정도? 손가락은 물론이고 손목까지 한 방에 갈 수 있겠다."),
      n("안전 센서가... 없다. 비상 정지도 수동이다. 이게 70년대 기계야?"),
      n("발판 아래를 보니 **핏자국**이 있다. 오래된 건 아닌 것 같은데."),
      d("wifekiller", "...거기 자세히 안 보는 게 좋아."),
      n("아내 살인범이 옆에서 낮게 말한다."),
      d("wifekiller", "한 달 전에 사고가 났어. 손이 끼어서..."),
      n("그녀가 말을 멈춘다. 더 이상 듣고 싶지 않다."),
      d("wifekiller", "근데 이상한 건 그게 정말 '사고'였는지..."),
      n("그녀의 시선이 감방 구석의 치한에게로 향한다."),
      n("...뭐?"),
      n("[작업장의 위험 요소를 파악했다.]"),
    ],
    effects: [eff.flag("knowWorkshopDanger")],
    actions: () => [
      action("\"무슨 뜻이에요?\"", "workshop_accident_truth"),
      action("더 이상 묻지 않는다.", "workshop_normal")
    ]
  }),

  ...defineScene("workshop_accident_truth", {
    location: "workshop",
    description: [
      n("아내 살인범이 주변을 살피며 목소리를 낮춘다."),
      d("wifekiller", "그 사고 당한 사람... 치한을 감방에서 팼거든."),
      d("wifekiller", "다음 날 작업장에서 '사고'가 났어. 기계가 갑자기 오작동했다고."),
      n("그녀가 손가락으로 프레스 밑을 가리킨다."),
      d("wifekiller", "치한이 그 옆에 있었어. 아무도 못 봤지만... 나는 봤어."),
      d("wifekiller", "그놈이 웃고 있었거든. 피가 튀는데 웃고 있었어."),
      n("소름이 돋는다."),
      d("wifekiller", "여기선 조심해. 적을 만들면 안 돼."),
      n("그녀가 다시 작업에 집중한다."),
      n("치한 쪽을 힐끗 본다. 저 구석에서 뭔가 만지작거리고 있다."),
      n("눈이 마주쳤다. 히죽 웃는다."),
      n("...개소름."),
      n("[치한의 위험성을 알게 되었다.]"),
    ],
    effects: [eff.flag("knowGroperDanger")],
    actions: () => [
      action("작업을 계속한다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("workshop_steal_oil", {
    location: "workshop",
    description: [
      n("간수가 졸고 있는 틈을 타 기름통에 다가간다."),
      n("심장이 터질 것 같다. 현실에는 스텔스 게이지가 없어서 발각률을 알 수가 없다."),
      n("주머니에 숨겨온 작은 병에 기름을 조금씩 옮겨 담는다."),
      n("손이 떨린다. 병 입구에 기름이 튄다. 씨발, 냄새 나면 어떡해."),
      n("'틱.'"),
      n("뒤에서 소리가 났다. 심장이 멈추는 줄 알았다."),
      n("돌아보니 방화범이 라이터를 튕기고 있다. 웃고 있다."),
      d("arsonist", "..."),
      n("멀리서 고개를 끄덕인다. 알겠다는 뜻인 것 같다."),
      n("후. 다행히 아무도 눈치채지 못했다."),
      n("{{라이터 기름}}을 획득했다."),
      n("손에서 아직도 기름 냄새가 난다. 씻어야겠다."),
    ],
    actions: () => [
      action("아무 일 없던 듯 작업을 계속한다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("workshop_steal_tool", {
    location: "workshop",
    description: [
      n("공구 벽 앞을 지나가는 척하며 작은 드라이버 하나를 소매 안에 숨긴다."),
      n("게임에서는 이런 거 그냥 'E키로 획득'하면 끝인데, 현실은 손이 벌벌 떨린다."),
      n("소매 안에서 드라이버가 피부를 긁는다. 아프지만 참는다."),
      d("guard", "거기! 뭐해!"),
      n("심장이 쿵 떨어진다."),
      d("guard", "...어, 너 말고. 거기 대머리!"),
      n("간수가 다른 죄수에게 소리친다. 휴, 나 아니었다."),
      n("드라이버로 나사를 풀거나 간단한 자물쇠를 딸 수 있을지도 모른다."),
      n("근데 들키면 끝이다. 소지품 검사라도 하면..."),
    ],
    actions: () => [
      action("작업을 계속한다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("workshop_normal", {
    location: "workshop",
    description: [
      n("당신은 위험을 감수하지 않기로 한다. 묵묵히 기계를 작동시키며 시간을 보낸다."),
      n("쿵. 쿵. 쿵. 같은 동작의 반복. 현실판 쿠키 클리커다."),
      n("근데 이상하게 이 단순 노동이 마음을 진정시킨다. 생각할 틈이 없어서 오히려 편하달까."),
      n("게임 개발할 때 밤샘 크런치도 비슷했다. 미친 듯이 일하면 다른 생각이 안 났다."),
      n("옆에서 일하던 아내 살인범이 말없이 당신을 힐끗 본다."),
      d("wifekiller", "...현명한 선택이야. 여기선 조심해야 해."),
      n("그것이 그가 당신에게 건넨 첫 마디였다."),
      n("표정이 없어서 무슨 생각인지 모르겠다. 진심인가?"),
    ],
    actions: () => [
      action("그에게 말을 건다.", "talk_wifekiller"),
      action("고개만 끄덕이고 작업을 계속한다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("workshop_strange_noise", {
    location: "workshop",
    description: [
      n("작업 중 갑자기 기계들이 일제히 멈춘다. 정전인가?"),
      n("아니다. 천장 형광등은 켜져 있다."),
      n("고요 속에서 뭔가 들린다."),
      n("'끼이이이...'"),
      n("금속이 긁히는 소리. 어디서 나는 거지?"),
      n("소리가 점점 커진다. 방향을 알 수 없다. 사방에서 동시에 나는 것 같다."),
      d("political", "...또야."),
      n("정치범이 한숨을 쉬며 중얼거린다."),
      d("player", "뭐가 '또'예요?"),
      d("political", "가끔 이래. 기계가 멈추고 저 소리가 나. 원인을 아는 사람이 없어."),
      n("'끼이이이이...'"),
      n("소리가 더 가까워진다. 아니, 이건 위쪽에서—"),
      n("쾅!"),
      n("천장에서 뭔가 떨어졌다. 죽은 쥐다. 아니, 잠깐—"),
      n("쥐 몸에 이빨 자국이 있다. 뭔가에 물어뜯긴 것 같은데, 쥐를 물어뜯을 만한 게 여기 뭐가 있지?"),
      d("guard", "에이 씨발, 또 쥐야? 치워!"),
      n("간수가 짜증을 내며 쥐를 걷어찬다."),
      n("기계가 다시 돌아간다. 모두 아무 일 없던 듯 작업을 재개한다."),
      n("...나만 이상하게 느끼는 건가?"),
    ],
    effects: [eff.flag("heardStrangeNoise")],
    actions: () => [
      action("정치범에게 더 물어본다.", "workshop_ask_noise"),
      action("무시하고 작업한다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("workshop_ask_noise", {
    location: "workshop",
    description: [
      d("player", "저 소리 대체 뭐예요? 기계 고장?"),
      n("정치범이 고개를 젓는다."),
      d("political", "아무도 몰라. 점검해도 이상 없대."),
      d("political", "근데 말이지... 저 소리가 나기 시작한 게 3년 전이야."),
      d("player", "3년 전에 뭐가 있었는데요?"),
      n("정치범이 잠시 침묵한다."),
      d("political", "...폭동이 있었어. 죄수들이 들고일어났지. 많이 죽었대."),
      d("political", "이 작업장이 진압 과정에서 제일 참혹했다고 들었어."),
      n("그녀가 바닥을 가리킨다."),
      d("political", "저 콘크리트 아래... 뭐가 있을지도 몰라."),
      n("바닥을 본다. 평범한 콘크리트인데."),
      n("근데 자세히 보니 색이 다른 부분이 있다. 나중에 덧씌운 것 같은..."),
      n("...생각하지 말자. 괜히 무서워지잖아."),
    ],
    effects: [eff.flag("knowWorkshopHistory")],
    actions: () => [
      action("작업을 계속한다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("day_three_workshop", {
    location: "workshop",
    description: [
      n("셋째 날 아침. 오늘따라 공기가 무겁다."),
      n("죄수들 사이에 긴장감이 감돈다. 뭔가 일어날 것 같은 느낌."),
      n("게임이었으면 '중요 이벤트 발생 예정' 알림이 떴을 타이밍이다."),
      n("문제는 현실엔 그런 친절한 안내가 없다는 거지."),
    ],
    actions: () => [
      action("친해진 간수에게 접근한다.", "guard_favor_workshop", [cond.relMin("guard", 2)]),
      action("메시아와 방화범 양쪽에 접근한다.", "day_three_mediator", [cond.flag("conflictMediator")]),
      action("간수장의 열쇠를 노린다.", "day_three_key_heist", [cond.flag("messiahKeyMission")]),
      action("방화범에게 마지막 확인을 한다.", "day_three_arsonist_prep", [cond.flag("knowArsonistPlan")]),
      action("사기꾼의 계획 상황을 확인한다.", "day_three_fraudster_check", [cond.flag("knowFraudsterPlan")]),
      action("일하면서 주변을 관찰한다.", "day_three_observe")
    ]
  }),

  ...defineScene("day_three_mediator", {
    location: "workshop",
    description: [
      n("당신이 첫날 메시아와 방화범 사이의 갈등을 중재한 것을 양쪽 모두 기억하고 있다."),
      n("정치 게임에서 양다리 걸치기의 달인이 되어버렸다. 이게 내 특기였나?"),
      n("메시아가 먼저 다가온다."),
      d("messiah", "평화의 사도여, 네가 우리 사이를 중재해준 것... 잊지 않았다."),
      d("messiah", "오늘 밤 우리의 탈출 계획에 함께해도 좋다. 원한다면."),
      n("방화범도 멀리서 당신을 바라보며 고개를 끄덕인다. 그도 당신을 인정하는 것 같다."),
      n("두 가지 계획에 모두 접근할 수 있게 되었다."),
      n("근데 이거 둘 다 실패하면 어떡하지? 백업 플랜의 백업 플랜이 필요한 거 아냐?"),
    ],
    effects: [eff.flag("knowMessiahPlan"), eff.flag("knowArsonistPlan")],
    actions: () => [
      action("메시아의 계획에 대해 더 듣는다.", "messiah_listen_to_plan_detail"),
      action("방화범의 계획에 대해 더 듣는다.", "arsonist_listen_to_plan_detail"),
      action("둘 다 열어두고 관찰한다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("day_three_key_heist", {
    location: "workshop",
    description: [
      n("메시아의 임무를 수행할 때이다. 간수장의 열쇠를 손에 넣어야 한다."),
      n("이게 진짜 내 인생인가? 감옥에서 열쇠 훔치는 퀘스트라니."),
      n("내가 만든 게임 중에 비슷한 스테이지가 있었는데, 유저들이 '너무 어렵다'고 욕했었지."),
      n("그때 난 '현실은 더 어려움ㅋ'이라고 답글 달았다. 지금 생각하면 플래그였네."),
      n("점심시간, 간수장이 작업장을 순시한다. 허리춤에 열쇠 꾸러미가 달랑거린다."),
    ],
    actions: () => [
      action("열쇠 구조 지식을 활용해 기회를 노린다.", "key_heist_success", [cond.flag("knowKeyStructure")]),
      action("직접 훔치려 한다.", "key_heist_risky"),
      action("소아성폭력범에게 주의를 끌어달라고 부탁한다.", "key_heist_distraction", [cond.flag("defendedPedophile")])
    ]
  }),

  ...defineScene("key_heist_success", {
    location: "workshop",
    description: [
      n("입소 첫날 관찰한 정보가 떠오른다. 큰 녹슨 열쇠, 작고 반짝이는 열쇠 둘, 그리고 카드키."),
      n("환기구를 여는 건 **카드키**일 것이다. 현대식 보안이면 카드키지."),
      n("간수장이 기계를 점검하러 허리를 숙인 순간—"),
      n("시간이 느려지는 것 같다. 슬로우 모션 연출이 아니라 진짜 긴장해서 그런 거다."),
      n("손을 뻗는다. 손가락이 카드키에 닿는다. 가볍게 잡아당긴다."),
      n("'찰칵.'"),
      n("빠졌다."),
      n("간수장이 일어선다. 열쇠 꾸러미를 한 번 툭툭 친다."),
      n("하나 빠진 걸 모른다. 무게 차이를 못 느끼나 보다."),
      n("심장이 터질 것 같다. 근데 해냈다."),
      n("**환기구 카드키**를 획득했다."),
    ],
    effects: [eff.getItem("환기구 카드키")],
    actions: () => [
      action("태연하게 작업을 계속한다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("key_heist_risky", {
    location: "workshop",
    description: [
      n("간수장이 다른 곳을 볼 때, 열쇠 꾸러미에 손을 뻗는다."),
      n("이건 미친 짓이다. 근데 다른 방법이 없다."),
      n("손가락이 열쇠에 닿는 순간—"),
      d("warden", "뭐야, 이 새끼가?!"),
      n("간수장이 당신의 손목을 낚아챈다."),
      n("끝났다."),
    ],
    actions: () => [
      action("\"다리가 아파서 넘어질 뻔했습니다...\"", "key_heist_excuse_success", [cond.flag("hurtLeg")]),
      action("변명을 시도한다.", "key_heist_caught")
    ]
  }),

  ...defineScene("key_heist_excuse_success", {
    location: "workshop",
    description: [
      n("당신은 다리를 절뚝거리며 고통스러운 표정을 짓는다."),
      n("연기다. 다리는 거의 나았는데 일부러 아픈 척하는 거다."),
      d("player", "죄송합니다... 첫날 맞은 다리가 아직도..."),
      n("간수장이 당신의 절뚝거리는 모습을 보며 코웃음을 친다."),
      d("warden", "쳇, 병신 같은 년. 꺼져."),
      n("믿었다. 휴."),
      n("첫날 맞은 게 지금 와서 도움이 될 줄이야."),
      n("인생은 정말 알 수 없다. 아니, 이건 게임이었으면 '페널티가 나중에 이점이 됨' 설계인데."),
      n("위기를 넘겼다. 하지만 열쇠는 구하지 못했다."),
    ],
    actions: () => [
      action("조용히 물러난다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("key_heist_caught", {
    location: "workshop",
    description: [
      n("간수장의 눈이 차갑게 빛난다."),
      d("warden", "열쇠를 노렸어? 이 새끼 탈옥 시도야. 독방행이다!"),
      n("변명할 틈도 없다. 간수들이 달려와 당신을 제압한다."),
      n("바닥에 얼굴이 눌린다. 콘크리트 냄새. 피 맛."),
      n("계획이 무너졌다. 아니, 계획 자체가 너무 무모했다."),
      n("현실은 게임이 아니야. 세이브 포인트가 없다고."),
    ],
    actions: () => [
      action("독방으로 끌려간다.", "solitary_cell")
    ]
  }),

  ...defineScene("key_heist_distraction", {
    location: "workshop",
    description: [
      n("당신이 눈짓을 보내자, 소아성폭력범이 알아챈다."),
      n("저 사람을 구해준 게 여기서 쓸모가 있을 줄이야."),
      n("그가 고개를 끄덕이고는 갑자기 기계에 손을 넣는다."),
      d("pedophile", "으아아악!!"),
      n("...뭐?! 진짜 넣었어?!"),
      n("비명소리에 모든 시선이 그에게로 쏠린다. 간수장도 달려간다."),
      n("그 틈에 당신은 간수장의 책상에서 **여분의 카드키**를 발견하고 집어 든다."),
      n("손이 떨린다. 저 사람 손 괜찮은 거야?"),
      d("pedophile", "(먼 곳에서) 괜찮아... 그냥 스친 거야..."),
      n("그가 당신을 힐끗 보며 미소 짓는다. 연기였다."),
      n("...연기치고 너무 리얼했는데. 진짜 프로다."),
      n("**환기구 카드키**를 획득했다."),
    ],
    effects: [eff.getItem("환기구 카드키")],
    actions: () => [
      action("자리로 돌아간다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("day_three_observe", {
    location: "workshop",
    description: [
      n("당신은 묵묵히 일하면서 주변을 살핀다."),
      n("게임 개발자의 습관. 환경 스캔. 인터랙션 가능 오브젝트 탐색."),
      n("간수들의 움직임에 패턴이 있다. 15분마다 순찰. 구석은 사각지대."),
      n("죄수들 사이의 긴장감도 느껴진다. 뭔가 계획들이 동시에 진행되고 있는 것 같다."),
      n("오늘 밤이 중요할 것 같다."),
      n("문제는 내가 어떤 계획에 올라타야 하는지 아직 모른다는 거다."),
      n("아니, 애초에 탈출하는 게 맞는 건지도 모르겠다."),
      n("실패하면 독방이다. 성공해도 바깥에서 살 수 있을까?"),
    ],
    actions: () => [
      action("아내 살인범에게 다가간다.", "wifekiller_final_help", [cond.relMin("wifekiller", 3)]),
      action("계속 관찰하며 일한다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("workshop_glitch", {
    location: "workshop",
    description: [
      n("작업 중 갑자기 당신 앞의 프레스 기계가 오작동한다."),
      n("손을 뺄 새도 없이 철판이 내려온다—"),
      n("근데 멈췄다. 손 위 1센티 정도에서."),
      n("심장이 멎는 줄 알았다."),
      d("guard", "야! 괜찮아?!"),
      n("간수가 달려온다. 처음으로 걱정하는 표정을 본다."),
      d("guard", "씨발, 이 기계 또 고장이야? 지난달에도 이랬잖아!"),
      n("'지난달에도'?"),
      n("아까 아내 살인범이 말한 사고가 떠오른다."),
      n("우연의 일치인가? 아니면..."),
      n("치한 쪽을 본다. 저 구석에서 빤히 쳐다보고 있다."),
      n("웃고 있다."),
      n("...우연이 아닌 것 같다."),
      n("[누군가 당신을 노리고 있을 수 있다.]"),
    ],
    effects: [eff.flag("machineGlitch")],
    actions: () => [
      action("치한을 추궁한다.", "confront_groper_workshop"),
      action("모른 척한다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("confront_groper_workshop", {
    location: "workshop",
    description: [
      n("쉬는 시간에 치한에게 다가간다."),
      d("player", "방금 그거 네가 한 거지?"),
      n("치한이 히죽거린다. 썩은 이빨이 보인다."),
      d("groper", "히히... 뭘 말하는 건지 모르겠는데?"),
      d("player", "기계. 오작동. 너 뭔가 한 거잖아."),
      d("groper", "증거 있어? 히히."),
      n("없다. 아무것도 못 봤다."),
      d("groper", "조심해, 언니. 여기선 사고가 자주 나거든."),
      n("그가 당신의 귀에 속삭인다."),
      d("groper", "특히 나한테 재수없게 구는 년들한테."),
      n("역겹다. 하지만 섣불리 적으로 만들면 안 된다."),
      d("groper", "아, 근데 언니 그 게임 만들었다며? 나 팬이었어. 히히히."),
      n("...최악이다."),
      n("[치한과의 관계가 악화되었다.]"),
    ],
    effects: [eff.rel("groper", -2), eff.flag("groperTension")],
    actions: () => [
      action("자리를 피한다.", "cafeteria_arrival")
    ]
  })
};

module.exports = workshopScenes;
