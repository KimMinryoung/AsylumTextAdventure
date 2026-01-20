const { n, d, cond, eff, action, defineScene } = require('../../../SceneBuilder');

const fraudsterScenes = {
  ...defineScene("talk_fraudster", {
    title: "사기꾼과의 대화",
    location: "cell",
    description: [
      n("사기꾼이 능글맞은 미소를 지으며 당신에게 다가온다."),
      d("fraudster", "오, 새 친구. 반가워. 여기선 '김 사장'이라고 불러."),
      d("fraudster", "근데 말이야, 여기 간수들 중에 **매수 가능한 놈**이 있어. 야간 근무 서는 '박' 간수라고."),
      d("fraudster", "혹시 밖에 연락할 사람 있어? 있으면 거래 좀 해보자고."),
    ],
    actions: () => [
      action("\"어떻게 사기를 치게 됐어요?\"", "fraudster_past"),
      action("\"연락할 사람이 있을지도...\"", "fraudster_deal", [], [eff.flag("knowFraudsterPlan")]),
      action("\"없어. 난 버려진 몸이야.\"", "fraudster_reject"),
      action("\"사기꾼 말을 어떻게 믿어?\"", "fraudster_suspicious")
    ]
  }),

  ...defineScene("fraudster_past", {
    title: "사기꾼의 과거",
    location: "cell",
    description: [
      d("fraudster", "...내가 왜 사기꾼이 됐는지 궁금해? 재밌는 이야기는 아닌데."),
      d("fraudster", "나도 원래는 **평범한 회사원**이었어. 근데 회사가 망했어. 대표가 도주한 거야."),
      d("fraudster", "그때 깨달았어. 정직하게 살아봤자 호구 되는 거더라고."),
    ],
    actions: () => [
      action("\"그러다 어떻게 커졌어요?\"", "fraudster_past_2"),
      action("\"...그래서, 탈출 얘기는?\"", "fraudster_deal_talk")
    ]
  }),

  ...defineScene("fraudster_past_2", {
    title: "사기꾼의 성장",
    location: "cell",
    description: [
      d("fraudster", "처음 100만 원 뜯었을 때... 손이 떨렸어. 근데 열 번째쯤 되니까... **아무렇지도 않았어**."),
      d("fraudster", "3년 만에 127억을 모았어. 근데 내 동업자 새끼가 배신했어."),
    ],
    actions: () => [
      action("\"어떻게 하는 건데?\"", "fraudster_deal_talk"),
      action("\"피해자들한테 미안하진 않아?\"", "fraudster_guilt")
    ]
  }),

  ...defineScene("fraudster_guilt", {
    title: "죄책감",
    location: "cell",
    description: [
      n("사기꾼이 잠시 멈칫한다."),
      d("fraudster", "한 할머니가 있었어. 전 재산 3천만 원을 맡기셨지. 나중에 들었는데... 한강에 뛰어들었대."),
      d("fraudster", "그래서 나가면... 그 아들한테 돈 좀 보내주려고. 찝찝하니까."),
    ],
    actions: () => [
      action("거래를 제안받는다.", "fraudster_deal_talk"),
      action("거절하고 물러난다.", "first_night")
    ]
  }),

  ...defineScene("fraudster_deal_talk", {
    title: "사기꾼의 제안",
    location: "cell",
    description: [
      d("fraudster", "박 간수는 돈에 약해. 5천만 원이면 넘어와."),
      d("fraudster", "문제는 밖에 있는 내 조직에 연락하는 거야. 면회 온 사람한테 메모를 전달하면 돼."),
    ],
    actions: () => [
      action("\"연락할 사람이 있을지도...\"", "fraudster_deal", [], [eff.flag("knowFraudsterPlan")]),
      action("\"없어. 난 버려진 몸이야.\"", "fraudster_reject")
    ]
  }),

  ...defineScene("fraudster_deal", {
    title: "거래",
    location: "cell",
    description: [
      d("fraudster", "오, 그래? 그럼 이야기가 되네."),
      d("fraudster", "내일 면회 시간에 방법을 알려줄게. 어때, 나쁘지 않지?"),
    ],
    actions: () => [
      action("일단 알겠다고 한다.", "first_night")
    ]
  }),

  ...defineScene("fraudster_reject", {
    title: "거절",
    location: "cell",
    description: [
      d("fraudster", "그래? 안됐네. 뭐, 다른 방법을 찾아봐야지."),
    ],
    actions: () => [
      action("다른 죄수와 이야기한다.", "cell_introduction"),
      action("침대로 가서 쉰다.", "first_night")
    ]
  }),

  ...defineScene("fraudster_suspicious", {
    title: "의심",
    location: "cell",
    description: [
      d("fraudster", "하하, 날카롭네. 그래, 내가 사기꾼인 건 맞아. 하지만 나는 **거래**에는 정직하거든."),
    ],
    actions: () => [
      action("\"...일리가 있네.\"", "fraudster_deal", [], [eff.flag("knowFraudsterPlan")]),
      action("\"그래도 됐어.\"", "first_night")
    ]
  }),

  ...defineScene("cafeteria_fraudster", {
    title: "사기꾼의 테이블",
    location: "cafeteria",
    description: [
      d("fraudster", "여긴 정보가 곧 생존이야. 물론 공짜는 없어."),
    ],
    actions: () => [
      action("\"무슨 정보를 갖고 있어?\"", "cafeteria_fraudster_info"),
      action("\"대가가 뭔데?\"", "cafeteria_fraudster_price"),
      action("\"그냥 조용히 먹고 싶어서 왔어.\"", "cafeteria_fraudster_quiet", [], [eff.rel("fraudster")])
    ]
  }),

  ...defineScene("cafeteria_fraudster_info", {
    title: "정보",
    location: "cafeteria",
    description: [
      d("fraudster", "**탈출 루트**? 다 알고 있어."),
    ],
    actions: () => [
      action("\"탈출 루트를 알려줘.\"", "cafeteria_fraudster_escape"),
      action("\"간수들 순찰 시간이나 알려줘.\"", "cafeteria_fraudster_guards", [], [eff.flag("knowGuardSchedule")])
    ]
  }),

  ...defineScene("cafeteria_fraudster_escape", {
    title: "탈출 루트",
    location: "cafeteria",
    description: [
      d("fraudster", "루트는 세 개야. **지하 하수도**, **옥상**, 그리고 **정문 돌파**."),
    ],
    effects: [eff.flag("knowEscapeRoutes")],
    actions: () => [
      action("고개를 끄덕인다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_fraudster_guards", {
    title: "순찰 정보",
    location: "cafeteria",
    description: [
      d("fraudster", "새벽 2시부터 3시 사이가 가장 느슨해. 그리고 수요일 밤은 간수장이 외출해."),
    ],
    effects: [eff.rel("fraudster")],
    actions: () => [
      action("\"고마워.\"", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_fraudster_price", {
    title: "대가",
    location: "cafeteria",
    description: [
      d("fraudster", "대가? 담배 한 보루 가져와. 없으면 부탁을 들어주거나."),
    ],
    actions: () => [
      action("\"생각해 볼게.\"", "cafeteria_end", [], [eff.flag("fraudsterDeal")]),
      action("\"됐어.\"", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_fraudster_quiet", {
    title: "조용한 식사",
    location: "cafeteria",
    description: [
      d("fraudster", "하, 그래? 의외네. 조용히 먹고 싶다는 거 이해해."),
    ],
    actions: () => [
      action("식사를 마친다.", "cafeteria_end")
    ]
  }),

  ...defineScene("day_three_fraudster_check", {
    title: "사기꾼의 진행 상황",
    location: "workshop",
    description: [
        { type: "narration", text: "사기꾼이 눈짓으로 당신을 구석으로 부른다." },
        { type: "dialogue", speaker: "fraudster", text: "좋은 소식이야. 박 간수가 넘어왔어. 오늘 밤 11시에 뒷문을 열어주기로 했어." },
        { type: "narration", text: "그가 능글맞게 웃는다." },
        { type: "dialogue", speaker: "fraudster", text: "내 조직에서 차를 보내기로 했어. 우리 둘 다 태워갈 거야. 완벽하지?" }
    ],
    actions: () => [
      action("\"대가가 뭔데?\"", "fraudster_catch_revealed", [cond.flag("knowPrisoners")]),
      action("\"좋아, 믿을게.\"", "day_three_afternoon", [], [eff.rel("fraudster", 2)])
    ]
  }),

  ...defineScene("fraudster_catch_revealed", {
    title: "숨겨진 조건",
    location: "workshop",
    description: [
        { type: "narration", text: "정치범이 알려준 정보가 떠오른다. '영악한 년이야. 말은 못 믿지만...'" },
        { type: "narration", text: "사기꾼의 미소가 살짝 굳어진다." },
        { type: "dialogue", speaker: "fraudster", text: "...영리하네. 그래, 조건이 있어. 우리 조직에서 네 능력이 필요하대." },
        { type: "dialogue", speaker: "fraudster", text: "게임 만들던 친구잖아. 우리 조직에서 **문서 위조**랑 **온라인 피싱** 쪽 일을 시키려고 해." },
        { type: "dialogue", speaker: "fraudster", text: "싫으면... 뭐, 혼자 알아서 나가든가. 어때?" }
    ],
    actions: () => [
      action("\"알았어. 일단 나가는 게 먼저야.\"", "day_three_afternoon", [], [eff.rel("fraudster", 2)]),
      action("\"사기는 더 이상 안 해.\"", "day_three_afternoon", [], [eff.flag("fraudsterRefused")])
    ]
  })
};

module.exports = fraudsterScenes;
