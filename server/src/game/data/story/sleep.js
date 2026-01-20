const { n, d, cond, eff, action, defineScene } = require('../../SceneBuilder');

const sleepScenes = {
  ...defineScene("first_night", {
    title: "첫째 날 밤",
    location: "cell",
    description: [
      n("소등 시간이 되자 감방이 어둠에 잠긴다. 당신은 생각한다. **어떻게 탈출할 것인가**."),
    ],
    actions: () => [
      action("귀를 귀울인다.", "night_whisper", [cond.relMin("arsonist", 1)]),
      action("잠을 청한다.", "day_two_morning")
    ]
  }),

  ...defineScene("day_two_morning", {
    title: "둘째 날 아침",
    location: "cell",
    description: [
      d("guard", "기상! 5분 안에 점호다!"),
      d("fraudster", "작업장은 유용한 물건을 구할 수 있고, 운동장은 편하지만 눈이 많아."),
    ],
    actions: () => [
      action("작업장으로 간다.", "workshop"),
      action("운동장으로 간다.", "yard")
    ]
  }),

  ...defineScene("day_two_evening", {
    title: "둘째 날 저녁",
    location: "cell",
    description: [
      n("당신은 오늘 모은 정보들을 정리한다. 탈출의 기회는 있어 보인다."),
    ],
    actions: () => [
      action("일찍 잠자리에 든다.", "day_three_morning"),
      action("밤에 감방을 살펴본다.", "day_two_night_explore")
    ]
  }),

  ...defineScene("day_two_night_explore", {
    title: "밤의 탐색",
    location: "cell",
    description: [
      n("순찰은 대략 **15분**마다 지나가는 것 같다."),
    ],
    actions: () => [
      action("아직 깨어있는 정치범에게 말을 건다.", "political_night_talk", [cond.relMin("political", 3)]),
      action("순찰하는 간수에게 조심스럽게 말을 건다.", "guard_night_friendly", [cond.relMin("guard", 1)]),
      action("순찰하는 간수에게 말을 건다.", "guard_night_hostile", [cond.relMax("guard", 0)]),
      action("정보를 머릿속에 새기고 잠을 청한다.", "day_three_morning")
    ]
  }),

  ...defineScene("day_three_morning", {
    title: "셋째 날 아침",
    location: "cell",
    description: [
      d("guard", "기상! 오늘은 전원 작업장이다!"),
      n("오늘은 **수요일**이다."),
    ],
    actions: () => [
      action("작업장으로 향한다.", "pedophile_attack", [cond.flag("helpedPedophile")]),
      action("작업장으로 향한다.", "day_three_workshop", [cond.notFlag("helpedPedophile")])
    ]
  }),

  ...defineScene("day_three_evening", {
    title: "셋째 날 저녁",
    location: "cell",
    description: [
      n("오늘 밤이 결정의 밤이다."),
    ],
    actions: () => [
      action("곤히 잠든다.", "gameover_messiah_followers", [cond.flag("messiahEnemy"), cond.relMax("fraudster", 1), cond.notFlag("knowArsonistPlan"), cond.relMax("wifekiller", 2)]),
      action("곤히 잠든다.", "gameover_burned_alive", [cond.flag("arsonistEnemy"), cond.notFlag("knowMessiahPlan"), cond.relMax("fraudster", 1), cond.relMax("wifekiller", 2), cond.notFlag("knowEmergencyExit")]),
      action("잠시 눈을 붙인다.", "day_four_final")
    ]
  }),

  ...defineScene("day_four_final", {
    title: "넷째 날 새벽",
    location: "cell",
    description: [
      n("지금이 탈출의 순간이다. 어떤 길을 선택하시겠는가?"),
    ],
    actions: () => [
      action("메시아의 계획을 따른다. (열쇠 전달 완료)", "ending_messiah_enhanced", [cond.flag("messiahKeyDelivered")]),
      action("메시아의 계획을 따른다. (환기구 탈출)", "ending_messiah_route", [cond.flag("knowMessiahPlan"), cond.notFlag("messiahKeyDelivered")]),
      action("사기꾼과 함께 간수를 매수한다.", "ending_fraudster_route", [cond.relMin("fraudster", 2), cond.notFlag("fraudsterRefused")]),
      action("방화범의 계획에 참여한다. (피해 최소화)", "ending_arsonist_safe", [cond.flag("arsonistMinimized")]),
      action("방화범의 계획에 참여한다. (화재 혼란)", "ending_arsonist_route", [cond.flag("arsonistReady"), cond.notFlag("arsonistMinimized")]),
      action("간수장이 열어준 비상구로 탈출한다.", "ending_warden_route", [cond.flag("wardenBlackmailed")]),
      action("폭풍우를 틈타 담벼락 균열을 파고 나간다.", "ending_wall_route", [cond.flag("wallEscapePlan")]),
      action("아내 살인범이 알려준 비상구로 탈출한다.", "ending_emergency_route", [cond.flag("knowEmergencyExit")]),
      action("혼자서 탈출을 시도한다. (준비됨)", "solo_escape_prepared", [cond.flag("knowSewerPath"), cond.flag("knowPatrolGap")]),
      action("혼자서 탈출을 시도한다. (일부 정보)", "solo_escape_partial", [cond.relMin("wifekiller", 3)]),
      action("혼자서 탈출을 시도한다.", "solo_escape_unprepared"),
      action("탈출을 포기하고 형기를 채우기로 한다.", "ending_surrender")
    ]
  })
};

module.exports = sleepScenes;
