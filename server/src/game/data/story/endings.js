const { n, d, eff, action, defineScene } = require('../../SceneBuilder');

const endingScenes = {
  ...defineScene("ending_warden_route", {
    title: "약점의 대가",
    description: [
      d("warden", "...꺼져. 다시는 내 앞에 나타나지 마."),
      n("**[엔딩 J: 어둠의 거래]**"),
    ],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("ending_wall_route", {
    title: "폭풍의 밤",
    description: [
      n("폭풍우의 밤, 오직 의지로 담벼락을 뚫고 탈출했다."),
      n("**[엔딩 K: 폭풍을 뚫고]**"),
    ],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("ending_emergency_route", {
    title: "친구의 선물",
    description: [
      n("친구의 도움으로 탈출했다. 이제 그 약속을 지켜야 한다."),
      n("**[엔딩 L: 약속의 무게]**"),
    ],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("ending_solo_success", {
    title: "고독한 자유",
    description: [n("**[엔딩 F: 고독한 자유]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("ending_solo_lucky", {
    title: "운 좋은 탈출",
    description: [n("**[엔딩 G: 행운의 탈출]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("ending_solo_daring", {
    title: "전설의 탈출",
    description: [n("**[엔딩 H: 전설의 탈출]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("ending_solo_redemption", {
    title: "구원",
    description: [n("**[엔딩 I: 불굴의 의지]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("ending_solo_despair", {
    title: "절망",
    location: "solitary",
    description: [n("**[엔딩 D: 어둠 속으로]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("ending_surrender", {
    title: "체념",
    location: "cell",
    description: [n("**[엔딩 E: 잃어버린 시간]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("gameover_solitary_madness", {
    title: "독방의 끝",
    location: "solitary",
    description: [n("**[GAME OVER: 정신붕괴]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  })
};

module.exports = endingScenes;
