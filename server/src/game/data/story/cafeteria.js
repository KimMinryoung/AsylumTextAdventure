const { n, d, cond, eff, action, defineScene } = require('../../SceneBuilder');

const cafeteriaScenes = {
  ...defineScene("cafeteria_arrival", {
    title: "식당",
    location: "cafeteria",
    description: [
        n("저녁 식사 시간을 알리는 종이 울린다. 죄수들이 일제히 **식당**으로 향한다."),
        n("식당은 회색 콘크리트 벽과 녹슨 철제 테이블로 가득하다. 천장의 형광등이 깜빡이며 창백한 빛을 내뿜는다."),
        n("배급구에서 {{묽은 죽}}과 {{딱딱한 빵}} 한 조각을 받아든다. 식욕을 돋우는 냄새와는 거리가 멀다."),
        n("식당 안을 둘러본다. 여러 무리가 각자의 영역을 차지하고 있다."),
        n("한쪽에는 **메시아**가 추종자들에 둘러싸여 앉아 있다. 반대편에는 **사기꾼**이 누군가와 귓속말을 나누고 있다."),
        n("구석에는 **방화범**이 혼자 앉아 허공을 응시한다. **정치범**은 책을 읽으며 조용히 식사 중이다.")
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
        n("당신은 구석의 빈 테이블에 혼자 앉는다."),
        n("묽은 죽을 떠먹으며 식당 안을 관찰한다."),
        n("죄수들 사이의 권력 관계, 간수들의 위치, 출입구의 구조..."),
        n("혼자 있으니 주변을 살피기가 더 쉽다.")
    ],
    actions: () => [
      action("간수에게 슬쩍 다가간다.", "cafeteria_guard_friendly", [cond.relMin("guard", 1)]),
      action("간수들을 관찰한다.", "cafeteria_observe_guards"),
      action("출입구를 살핀다.", "cafeteria_observe_exit"),
      action("소란이 일어나는 쪽을 본다.", "cafeteria_groper_event")
    ]
  }),

  ...defineScene("cafeteria_observe_guards", {
    title: "간수 관찰",
    location: "cafeteria",
    description: [
      n("식당에는 간수가 세 명 있다. 입구에 한 명, 배급구 옆에 한 명, 그리고 순찰하는 한 명."),
        n("순찰하는 간수는 약 **5분마다** 식당을 한 바퀴 돈다."),
        n("배급구 옆 간수는 계속 하품을 하고 있다. 야간 근무에 지친 것 같다."),
        n("유용한 정보를 얻었다.")
    ],
    effects: [eff.flag("knowCafeteriaGuards")],
    actions: () => [
      action("식사를 마친다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_observe_exit", {
    title: "출입구 관찰",
    location: "cafeteria",
    description: [
      n("식당의 출입구는 두 곳이다. 정문과 **주방으로 통하는 뒷문**."),
      n("뒷문은 잠겨 있지만, 식사 배급 시간에는 열린다."),
      n("주방 너머로 **하역장**이 보인다. 식자재 트럭이 드나드는 곳..."),
      n("혹시 탈출 루트가 될 수 있을까?")
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
      n("식사 시간 종료를 알리는 종이 울린다."),
      n("죄수들이 일제히 식기를 반납하고 감방으로 돌아간다."),
      n("당신도 빈 그릇을 들고 줄을 선다."),
      d("guard", "빨리 움직여! 소등까지 30분이다!")
    ],
    actions: () => [
      action("감방으로 돌아간다.", "day_two_evening")
    ]
  })
};

module.exports = cafeteriaScenes;
