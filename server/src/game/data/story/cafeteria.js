const { n, d, cond, eff, action, defineScene } = require('../../SceneBuilder');

const cafeteriaScenes = {
  ...defineScene("cafeteria_arrival", {
    title: "식당",
    location: "cafeteria",
    description: [
      n("배급구에서 {{묽은 죽}}과 {{딱딱한 빵}} 한 조각을 받아든다."),
    ],
    actions: () => [
      action("메시아의 테이블로 간다.", "cafeteria_messiah"),
      action("사기꾼 옆에 앉는다.", "cafeteria_fraudster"),
      action("방화범 옆에 앉는다.", "cafeteria_arsonist"),
      action("정치범 옆에 앉는다.", "cafeteria_political"),
      action("빈 테이블에 혼자 앉는다.", "cafeteria_alone")
    ]
  }),

  ...defineScene("cafeteria_alone", {
    title: "혼자 앉기",
    location: "cafeteria",
    description: [
      n("혼자 있으니 주변을 살피기가 더 쉽다."),
    ],
    actions: () => [
      action("친해진 간수에게 슬쩍 다가간다.", "cafeteria_guard_friendly", [cond.relMin("guard", 1)]),
      action("간수들을 관찰한다.", "cafeteria_observe_guards"),
      action("출입구를 살핀다.", "cafeteria_observe_exit"),
      action("소란이 일어나는 쪽을 본다.", "cafeteria_groper_event")
    ]
  }),

  ...defineScene("cafeteria_observe_exit", {
    title: "출입구 관찰",
    location: "cafeteria",
    description: [
      n("식당 배급 시간에는 **주방 뒷문**이 열린다. 하역장이 보인다."),
    ],
    effects: [eff.flag("knowKitchenExit")],
    actions: () => [
      action("정보를 머릿속에 새긴다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_end", {
    title: "식사 종료",
    location: "cafeteria",
    description: [
      d("guard", "빨리 움직여! 소등까지 30분이다!"),
    ],
    actions: () => [
      action("감방으로 돌아간다.", "day_two_evening")
    ]
  })
};

module.exports = cafeteriaScenes;
