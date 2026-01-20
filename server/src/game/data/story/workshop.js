const { n, d, cond, eff, action, defineScene } = require('../../SceneBuilder');

const workshopScenes = {
  ...defineScene("workshop", {
    title: "작업장",
    location: "workshop",
    description: [
      n("구석에 {{기름통}}이 쌓여 있고, 벽에는 **공구들**이 걸려 있다."),
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
      n("라이터 기름을 획득했다. 멀리서 방화범이 당신을 보며 고개를 끄덕인다."),
    ],
    actions: () => [
      action("아무 일 없던 듯 작업을 계속한다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("workshop_steal_tool", {
    title: "공구 확보",
    location: "workshop",
    description: [
      n("소매 안에 작은 드라이버를 숨겼다."),
    ],
    actions: () => [
      action("작업을 계속한다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("workshop_normal", {
    title: "평범한 작업",
    location: "workshop",
    description: [
      d("wifekiller", "...현명한 선택이야. 여기선 조심해야 해."),
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
      n("두 가지 탈출 계획에 모두 접근할 수 있게 되었다."),
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
      n("간수장의 카드키를 손에 넣어야 한다."),
    ],
    actions: () => [
      action("열쇠 구조 지식을 활용해 기회를 노린다.", "key_heist_success", [cond.flag("knowKeyStructure")]),
      action("직접 훔치려 한다.", "key_heist_risky"),
      action("소아성폭력범에게 주의를 끌어달라고 부탁한다.", "key_heist_distraction", [cond.flag("helpedPedophile")])
    ]
  }),

  ...defineScene("key_heist_success", {
    title: "완벽한 작전",
    location: "workshop",
    description: [
      n("능숙하게 카드키를 빼돌렸다. **환기구 카드키**를 획득했다."),
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
      d("warden", "뭐야, 이 새끼가?!"),
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
      d("warden", "쳇, 병신 같은 년. 꺼져."),
    ],
    actions: () => [
      action("조용히 물러난다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("key_heist_caught", {
    title: "발각",
    location: "workshop",
    description: [
      d("warden", "이 새끼 탈옥 시도야. 독방행이다!"),
    ],
    actions: () => [
      action("독방으로 끌려간다.", "solitary_cell")
    ]
  }),

  ...defineScene("key_heist_distraction", {
    title: "주의 분산",
    location: "workshop",
    description: [
      n("소아성폭력범이 기계에 손을 넣어 비명을 지르는 동안 카드키를 집어 들었다."),
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
      n("오늘 밤이 중요할 것 같다."),
    ],
    actions: () => [
      action("아내 살인범에게 다가간다.", "wifekiller_final_help", [cond.relMin("wifekiller", 3)]),
      action("계속 관찰하며 일한다.", "day_three_afternoon")
    ]
  })
};

module.exports = workshopScenes;
