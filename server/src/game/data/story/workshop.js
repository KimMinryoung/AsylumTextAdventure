const { n, d, cond, eff, action, defineScene } = require('../../SceneBuilder');

const workshopScenes = {
  ...defineScene("workshop", {
    title: "작업장",
    location: "workshop",
    description: [
        n("작업장은 기름 냄새와 금속 소리로 가득하다. 죄수들이 기계 앞에서 단순 작업을 반복하고 있다."),
        n("당신은 프레스 기계 앞에 배치된다. 단조로운 작업이지만, 주변을 살펴볼 기회가 있다."),
        n("구석에 {{기름통}}이 쌓여 있고, 벽에는 **공구들**이 걸려 있다. 감시하는 간수는 졸고 있다.")
    ],
    actions: () => [
      action("작업에 집중한다.", "gameover_groper_trap", [cond.flag("groperEnemy")]),
      action("기름을 몰래 빼돌린다.", "workshop_steal_oil", [cond.flag("knowArsonistPlan"), cond.notFlag("groperEnemy")], [eff.getItem("라이터 기름")]),
      action("작은 공구를 숨긴다.", "workshop_steal_tool", [cond.notFlag("groperEnemy")], [eff.getItem("작은 드라이버")]),
      action("묵묵히 작업만 한다.", "workshop_normal", [cond.notFlag("groperEnemy")])
    ]
  }),

  ...defineScene("workshop_steal_oil", {
    title: "기름 확보",
    location: "workshop",
    description: [
        n("간수가 졸고 있는 틈을 타 기름통에 다가간다."),
        n("주머니에 숨겨온 작은 병에 기름을 조금씩 옮겨 담는다. 심장이 터질 것 같다."),
        n("다행히 아무도 눈치채지 못했다. 라이터 기름을 획득했다."),
        d("arsonist", "..."),
        n("멀리서 방화범이 당신을 보며 고개를 끄덕인다.")
    ],
    actions: () => [
      action("아무 일 없던 듯 작업을 계속한다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("workshop_steal_tool", {
    title: "공구 확보",
    location: "workshop",
    description: [
        n("공구 벽 앞을 지나가는 척하며 작은 드라이버 하나를 소매 안에 숨긴다."),
        n("심장이 빠르게 뛴다. 하지만 아무도 눈치채지 못한 것 같다."),
        n("이 드라이버로 나사를 풀거나 간단한 자물쇠를 딸 수 있을지도 모른다.")
    ],
    actions: () => [
      action("작업을 계속한다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("workshop_normal", {
    title: "평범한 작업",
    location: "workshop",
    description: [
        n("당신은 위험을 감수하지 않기로 한다. 묵묵히 기계를 작동시키며 시간을 보낸다."),
        n("옆에서 일하던 아내 살인범이 말없이 당신을 힐끗 본다."),
        d("wifekiller", "...현명한 선택이야. 여기선 조심해야 해."),
        n("그것이 그가 당신에게 건넨 첫 마디였다.")
    ],
    actions: () => [
      action("그에게 말을 건다.", "talk_wifekiller"),
      action("고개만 끄덕이고 작업을 계속한다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("day_three_workshop", {
    title: "작업장 - 셋째 날",
    location: "workshop",
    description: [
      n("오늘따라 긴장감이 감돈다."),
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
    title: "중재자의 이점",
    location: "workshop",
    description: [
        n("당신이 첫날 메시아와 방화범 사이의 갈등을 중재한 것을 양쪽 모두 기억하고 있다."),
        n("메시아가 먼저 다가온다."),
        d("messiah", "평화의 사도여, 네가 우리 사이를 중재해준 것... 잊지 않았다."),
        d("messiah", "오늘 밤 우리의 탈출 계획에 함께해도 좋다. 원한다면."),
        n("방화범도 멀리서 당신을 바라보며 고개를 끄덕인다. 그도 당신을 인정하는 것 같다."),
        n("두 가지 계획에 모두 접근할 수 있게 되었다.")
    ],
    effects: [eff.flag("knowMessiahPlan"), eff.flag("knowArsonistPlan")],
    actions: () => [
      action("메시아의 계획에 대해 더 듣는다.", "mediator_messiah_detail"),
      action("방화범의 계획에 대해 더 듣는다.", "mediator_arsonist_detail"),
      action("둘 다 열어두고 관찰한다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("day_three_key_heist", {
    title: "열쇠 작전",
    location: "workshop",
    description: [
        n("메시아의 임무를 수행할 때이다. 간수장의 열쇠를 손에 넣어야 한다."),
        n("점심시간, 간수장이 작업장을 순시한다. 허리춤에 열쇠 꾸러미가 달랑거린다.")
    ],
    actions: () => [
      action("열쇠 구조 지식을 활용해 기회를 노린다.", "key_heist_success", [cond.flag("knowKeyStructure")]),
      action("직접 훔치려 한다.", "key_heist_risky"),
      action("소아성폭력범에게 주의를 끌어달라고 부탁한다.", "key_heist_distraction", [cond.flag("defendedPedophile")])
    ]
  }),

  ...defineScene("key_heist_success", {
    title: "완벽한 작전",
    location: "workshop",
    description: [
        n("입소 첫날 관찰한 정보가 떠오른다. 큰 녹슨 열쇠, 작고 반짝이는 열쇠 둘, 그리고 카드키."),
        n("환기구를 여는 건 **카드키**일 것이다."),
        n("간수장이 기계를 점검하러 허리를 숙인 순간, 당신은 능숙하게 카드키만 빼돌린다."),
        n("열쇠 꾸러미 전체가 아니라 하나만 빠졌으니 금방 눈치채지 못할 것이다."),
        n("**환기구 카드키**를 획득했다.")

    ],
    effects: [eff.getItem("환기구 카드키")],
    actions: () => [
      action("태연하게 작업을 계속한다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("key_heist_risky", {
    title: "위험한 시도",
    location: "workshop",
    description: [
        n("간수장이 다른 곳을 볼 때, 열쇠 꾸러미에 손을 뻗는다."),
        n("손가락이 열쇠에 닿는 순간—"),
        d("warden", "뭐야, 이 새끼가?!"),
        n("간수장이 당신의 손목을 낚아챈다. 들켰다!")
    ],
    actions: () => [
      action("\"다리가 아파서 넘어질 뻔했습니다...\"", "key_heist_excuse_success", [cond.flag("hurtLeg")]),
      action("변명을 시도한다.", "key_heist_caught")
    ]
  }),

  ...defineScene("key_heist_excuse_success", {
    title: "위기 모면",
    location: "workshop",
    description: [
        n("당신은 다리를 절뚝거리며 고통스러운 표정을 짓는다."),
        d("player", "죄송합니다... 첫날 맞은 다리가 아직도..."),
        n("간수장이 당신의 절뚝거리는 모습을 보며 코웃음을 친다."),
        d("warden", "쳇, 병신 같은 년. 꺼져."),
        n("위기를 넘겼다. 하지만 열쇠는 구하지 못했다.")
    ],
    actions: () => [
      action("조용히 물러난다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("key_heist_caught", {
    title: "발각",
    location: "workshop",
    description: [
        n("간수장의 눈이 차갑게 빛난다."),
        d("warden", "열쇠를 노렸어? 이 새끼 탈옥 시도야. 독방행이다!"),
        n("간수들이 달려와 당신을 제압한다. 계획이 무너졌다.")
    ],
    actions: () => [
      action("독방으로 끌려간다.", "solitary_cell")
    ]
  }),

  ...defineScene("key_heist_distraction", {
    title: "주의 분산",
    location: "workshop",
    description: [
        n("당신이 눈짓을 보내자, 소아성폭력범이 알아챈다."),
        n("그가 고개를 끄덕이고는 갑자기 기계에 손을 넣는다."),
        d("pedophile", "으아아악!!"),
        n("비명소리에 모든 시선이 그에게로 쏠린다. 간수장도 달려간다."),
        n("그 틈에 당신은 간수장의 책상에서 **여분의 카드키**를 발견하고 집어 든다."),
        d("pedophile", "(먼 곳에서) 괜찮아... 그냥 스친 거야..."),
        n("그가 당신을 힐끗 보며 미소 짓는다. 빚을 갚은 것이다."),
        n("**환기구 카드키**를 획득했다.")
    ],
    effects: [eff.getItem("환기구 카드키")],
    actions: () => [
      action("자리로 돌아간다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("day_three_observe", {
    title: "관찰",
    location: "workshop",
    description: [
        n("당신은 묵묵히 일하면서 주변을 살핀다."),
        n("간수들의 움직임, 죄수들 사이의 긴장감, 그리고 탈출 루트가 될 수 있는 곳들..."),
        n("오늘 밤이 중요할 것 같다. 여러 계획들이 동시에 진행되고 있는 것 같다.")
    ],
    actions: () => [
      action("아내 살인범에게 다가간다.", "wifekiller_final_help", [cond.relMin("wifekiller", 3)]),
      action("계속 관찰하며 일한다.", "day_three_afternoon")
    ]
  })
};

module.exports = workshopScenes;
