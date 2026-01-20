const { n, d, cond, eff, action, defineScene } = require('../../../SceneBuilder');

const guardScenes = {
  ...defineScene("yard_bow_guard", {
    title: "굴복",
    location: "yard",
    description: [
      d("player", "죄송합니다..."),
      d("guard", "흥. 그래도 예의는 아는군."),
    ],
    actions: () => [
      action("운동장에서 시간을 보낸다.", "yard_walk")
    ]
  }),

  ...defineScene("cafeteria_guard_friendly", {
    title: "간수와의 접촉",
    location: "cafeteria",
    description: [
      d("guard", "저기 남은 거 있어. 한 그릇 더 받아. 내가 봐줄게."),
    ],
    effects: [eff.flag("extraMeal"), eff.rel("guard", 1)],
    actions: () => [
      action("감사히 추가 식사를 받는다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_observe_guards", {
    title: "간수 관찰",
    location: "cafeteria",
    description: [
      n("순찰하는 간수는 약 **5분마다** 식당을 한 바퀴 돈다."),
    ],
    effects: [eff.flag("knowCafeteriaGuards")],
    actions: () => [
      action("식사를 마친다.", "cafeteria_end")
    ]
  }),

  ...defineScene("guard_favor_workshop", {
    title: "간수의 배려",
    location: "workshop",
    description: [
      d("guard", "오늘 넌 창고 정리 담당이야. 그리고 이거... {{담배 한 갑}}."),
    ],
    effects: [eff.getItem("담배 한 갑"), eff.flag("easyWorkAssigned")],
    actions: () => [
      action("감사를 표하고 창고로 향한다.", "guard_favor_storage")
    ]
  }),

  ...defineScene("guard_favor_storage", {
    title: "창고 정리",
    location: "workshop",
    description: [
      n("창고 구석에서 {{녹슨 철사}}를 발견했다."),
    ],
    effects: [eff.getItem("녹슨 철사"), eff.flag("exploredStorage")],
    actions: () => [
      action("창고를 더 뒤진다.", "guard_favor_storage_search"),
      action("적당히 일하고 쉰다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("guard_favor_storage_search", {
    title: "창고 탐색",
    location: "workshop",
    description: [
      n("선반 뒤편에서 낡은 {{수용소 배치도}}를 발견했다."),
    ],
    effects: [eff.getItem("수용소 배치도"), eff.flag("knowFloorPlan")],
    actions: () => [
      action("배치도를 숨기고 작업을 마친다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("guard_night_friendly", {
    title: "간수와의 대화",
    location: "cell",
    description: [
      d("guard", "...이거. 밤에 배고프면 먹어. 튀려고 하지 말고."),
    ],
    effects: [eff.getItem("빵 조각"), eff.rel("guard", 1)],
    actions: () => [
      action("감사하다고 말하고 잠자리에 든다.", "day_three_morning"),
      action("간수에게 조심스럽게 정보를 물어본다.", "guard_night_info")
    ]
  }),

  ...defineScene("guard_night_info", {
    title: "간수의 귀띔",
    location: "cell",
    description: [
      d("guard", "간수장, **수요일 밤**마다 의무실에 가는데 그날은 신경질적이야. {{창고}} 근처에는 얼씬도 마."),
    ],
    effects: [eff.flag("knowWardenMedical"), eff.flag("knowStorageDeals"), eff.rel("guard", 1)],
    actions: () => [
      action("정보를 머릿속에 새기고 잠을 청한다.", "day_three_morning")
    ]
  }),

  ...defineScene("guard_night_hostile", {
    title: "간수의 적의",
    location: "cell",
    description: [
      d("guard", "뭘 쳐다봐, 이 변태 새끼야. 내일 작업장에서 눈여겨보고 있을 테니."),
    ],
    effects: [eff.rel("guard", 1)],
    actions: () => [
      action("불안한 마음으로 잠자리에 든다.", "day_three_morning")
    ]
  }),

  ...defineScene("gameover_guard_murder", {
    title: "본보기",
    location: "yard",
    description: [n("**[GAME OVER: 반항의 대가]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  })
};

module.exports = guardScenes;
