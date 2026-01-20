const { n, d, cond, eff, action, defineScene } = require('../../../SceneBuilder');

const pedophileScenes = {
  ...defineScene("yard_pedophile", {
    title: "소아성폭력범",
    location: "yard",
    description: [
      n("그의 눈에는 여전히 피어오르지 못한 불꽃이 일렁인다."),
    ],
    actions: () => [
      action("괜찮다며 옆에 앉는다.", "pedophile_kind"),
      action("역겹다는 듯 돌아선다.", "yard"),
      action("정보를 대가로 보호해주겠다고 제안한다.", "pedophile_deal")
    ]
  }),

  ...defineScene("pedophile_kind", {
    title: "연민",
    location: "yard",
    description: [
      d("pedophile", "뉴스에서 봤겠지? 운동선수 출신 교사. 난 내가 원하는 건 뭐든 가질 자격이 있다고 믿었어."),
    ],
    actions: () => [
      action("아무 말 없이 자리를 뜬다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("pedophile_deal", {
    title: "거래 제안",
    location: "yard",
    description: [
      d("pedophile", "**지하 2층 창고** 환기 덕트가 외부로 연결돼 있어."),
    ],
    effects: [eff.flag("helpedPedophile"), eff.rel("pedophile"), eff.flag("knowVentDuct")],
    actions: () => [
      action("정보에 감사하고 자리를 뜬다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("pedophile_attack", {
    title: "린치",
    location: "cell",
    description: [
      n("몇몇 죄수들이 소아성폭력범을 둘러싸고 짓밟는다."),
    ],
    actions: () => [
      action("말리려 한다.", "pedophile_help"),
      action("모른 척한다.", "pedophile_ignore")
    ]
  }),

  ...defineScene("pedophile_help", {
    title: "구출",
    location: "cell",
    description: [
      d("pedophile", "고마워. 보답으로... **간수장이 여자 문제**로 협박당하고 있다는 정보를 주지."),
    ],
    effects: [eff.rel("pedophile", 2), eff.flag("knowWardenWeakness"), eff.flag("defendedPedophile"), eff.rel("messiah", 3), eff.rel("wifekiller", 3), eff.rel("arsonist", 3)],
    actions: () => [
      action("작업장으로 향한다.", "day_three_workshop_contempt")
    ]
  }),

  ...defineScene("day_three_workshop_contempt", {
    title: "작업장 - 셋째 날",
    location: "workshop",
    description: [
      n("소아성폭력범을 감싼 대가는 컸다. 죄수들이 당신을 피한다."),
    ],
    actions: () => [
      action("묵묵히 일하면서 주변을 관찰한다.", "day_three_observe")
    ]
  }),

  ...defineScene("pedophile_ignore", {
    title: "외면",
    location: "cell",
    description: [
      n("비명이 점점 작아지다가, 결국 멈춘다."),
    ],
    effects: [eff.rel("pedophile", 4)],
    actions: () => [
      action("작업장으로 향한다.", "day_three_workshop")
    ]
  })
};

module.exports = pedophileScenes;
