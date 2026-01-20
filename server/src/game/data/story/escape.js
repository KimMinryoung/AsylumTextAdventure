const { n, d, cond, eff, action, defineScene } = require('../../SceneBuilder');

const escapeScenes = {
  ...defineScene("solo_escape_prepared", {
    title: "완벽한 계획",
    location: "cell",
    description: [n("준비가 되어 있다. 지금이다.")],
    actions: () => [action("계획을 실행한다.", "solo_escape_execution")]
  }),

  ...defineScene("solo_escape_execution", {
    title: "탈출 실행",
    location: "corridor",
    description: [n("창고 구석에 낡은 {{하수도 맨홀}}이 있다.")],
    actions: () => [action("하수도로 들어간다.", "solo_escape_sewer")]
  }),

  ...defineScene("solo_escape_sewer", {
    title: "하수도",
    location: "sewer",
    description: [n("악취 나는 하수도를 기어간다. 출구다!")],
    actions: () => [action("자유를 향해 걷는다.", "ending_solo_success")]
  }),

  ...defineScene("solo_escape_partial", {
    title: "불완전한 계획",
    location: "cell",
    description: [n("위험하지만 시도해볼 가치는 있다.")],
    actions: () => [
      action("지하로 내려간다.", "solo_partial_basement"),
      action("옥상으로 올라간다.", "solo_partial_roof")
    ]
  }),

  ...defineScene("solo_partial_basement", {
    title: "지하 탐색",
    location: "basement",
    description: [n("지하 3층 철문이 잠겨 있다.")],
    actions: () => [
      action("환기 덕트를 찾는다.", "solo_partial_duct", [cond.flag("knowVentDuct")]),
      action("생각이 나지 않는다. 돌아간다.", "solo_escape_caught")
    ]
  }),

  ...defineScene("solo_partial_duct", {
    title: "환기 덕트",
    location: "basement",
    description: [n("소아성폭력범이 말해준 대로 환기 덕트가 있다.")],
    actions: () => [action("눈을 뜬다.", "ending_solo_lucky")]
  }),

  ...defineScene("solo_partial_roof", {
    title: "옥상",
    location: "roof",
    description: [n("옆 건물로 이어지는 **전선**이 보인다.")],
    actions: () => [
      action("전선을 타고 건너간다.", "solo_roof_wire"),
      action("너무 위험하다. 돌아간다.", "solo_escape_caught")
    ]
  }),

  ...defineScene("solo_roof_wire", {
    title: "위험한 도박",
    location: "roof",
    description: [d("guard", "거기 멈춰! 움직이면 쏜다!")],
    actions: () => [
      action("무시하고 계속 간다!", "solo_roof_gamble"),
      action("포기하고 돌아간다.", "solo_escape_caught")
    ]
  }),

  ...defineScene("solo_roof_gamble", {
    title: "도박",
    location: "roof",
    description: [n("옆 건물 옥상에 뛰어내려 어둠 속으로 사라진다.")],
    actions: () => [action("자유를 향해 달린다.", "ending_solo_daring")]
  }),

  ...defineScene("solo_escape_unprepared", {
    title: "무모한 시도",
    location: "cell",
    description: [n("탈출 경로도 모르지만 시도한다.")],
    actions: () => [action("복도로 나선다.", "solo_escape_caught")]
  }),

  ...defineScene("solo_escape_caught", {
    title: "발각",
    location: "corridor",
    description: [d("guard", "이 새끼가... 어디 가려고?")],
    actions: () => [action("독방으로 끌려간다.", "solitary_cell")]
  }),

  ...defineScene("solitary_cell", {
    title: "독방",
    location: "solitary",
    description: [n("캄캄한 독방에 던져진다.")],
    actions: () => [
      action("금을 파본다.", "solitary_discovery", [cond.flag("knowWallCrack")]),
      action("포기하고 벽에 기댄다.", "ending_solo_despair")
    ]
  }),

  ...defineScene("solitary_discovery", {
    title: "발견",
    location: "solitary",
    description: [n("아래에서 **물 냄새**가 올라온다.")],
    actions: () => [
      action("구멍을 더 넓힌다.", "sewer_escape"),
      action("포기하고 쉰다.", "ending_solo_despair")
    ]
  }),

  ...defineScene("sewer_escape", {
    title: "하수도",
    location: "sewer",
    description: [n("하수도 출구다. **빛**이 보인다.")],
    actions: () => [action("밖으로 나선다.", "ending_solo_redemption")]
  })
};

module.exports = escapeScenes;
