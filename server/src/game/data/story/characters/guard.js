const { n, d, cond, eff, action, defineScene } = require('../../../SceneBuilder');

const guardScenes = {
  ...defineScene("yard_bow_guard", {
    title: "굴복",
    location: "yard",
    description: [
      n("당신은 재빨리 고개를 숙인다."),
      d("player", "죄송합니다..."),
      d("guard", "흥. 그래도 예의는 아는군. 다음엔 눈을 어디에 두는지 조심해."),
      n("간수가 코웃음을 치며 돌아선다. 등에서 식은땀이 흐른다."),
      n("굴욕적이지만, 목숨을 건졌다.")
    ],
    actions: () => [
      action("운동장에서 시간을 보낸다.", "yard_walk")
    ]
  }),

  ...defineScene("cafeteria_guard_friendly", {
    title: "간수와의 접촉",
    location: "cafeteria",
    description: [
      n("배식이 끝난 틈을 타 간수 근처로 다가간다."),
      n("간수가 당신을 알아보고 비웃는다."),
      d("guard", "뭐, 양이 부족하다고? 밥벌레가 식탐도 참 많네."),
      n("간수가 주변을 살피더니 배식구 쪽으로 눈짓한다."),
      d("guard", "저기 남은 거 있어. 한 그릇 더 받아. 내가 봐줄게."),
    ],
    effects: [eff.flag("extraMeal"), eff.rel("guard", 1)],
    actions: () => [
      action("감사히 추가 식사를 받는다.", "cafeteria_end")
    ]
  }),

  ...defineScene("guard_favor_workshop", {
    title: "간수의 배려",
    location: "workshop",
    description: [
      n("작업 배치 시간, 당신은 친해진 간수를 발견한다. 그가 눈짓으로 당신을 부른다."),
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
      n("창고는 프레스 작업장보다 훨씬 한산하다. 먼지 쌓인 선반들 사이로 낡은 물품들이 널려 있다."),
      n("간수 말대로 아무도 신경 쓰지 않는다. 이 시간을 활용할 수 있을 것 같다."),
      n("창고 구석에서 {{녹슨 철사}}를 발견한다. 자물쇠를 따는 데 쓸 수 있을지도 모른다.")
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
      n("당신은 조심스럽게 창고 깊숙이 들어간다."),
      n("선반 뒤편에서 낡은 {{수용소 배치도}}를 발견한다. 비상구와 환기구 위치가 표시되어 있다."),
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
        n("순찰하는 간수가 당신의 감방 앞에서 멈춘다."),
        d("guard", "...뭐야. 못 자?"),
        n("당신은 조심스럽게 고개를 끄덕인다. 간수가 주변을 살피더니 낮은 목소리로 말한다."),
        d("guard", "첫날부터 말 잘 듣더니... 여기서 오래 버티고 싶으면 그렇게 살아. 튀려고 하지 말고."),
        n("그가 잠시 망설이다가 주머니에서 무언가를 꺼낸다."),
        d("guard", "배고프면 먹어. 다른 놈들한테 말하면 죽는다."),
        n("간수가 창살 사이로 {{빵 조각}}을 밀어 넣는다."),
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
        n("당신이 조심스럽게 물어본다."),
        d("player", "...여기서 살아남으려면 뭘 조심해야 하나요?"),
        n("narration", "간수가 한숨을 쉬더니 주변을 다시 살핀다."),
        d("guard", "간수장 눈 밖에 나면 끝이야. 그 인간, **수요일 밤**마다 의무실에 가는데... 그날은 특히 신경질적이거든."),
        d("guard", "그리고 {{창고}} 근처엔 얼씬도 하지 말도록. 그쪽에서 뭔가 불법적인 거래가 있다는 소문이 있어. 걸리면..."),
        n("narration", "간수가 목을 긋는 시늉을 한다."),
        d("guard", "이만 가봐야겠다. 다음 순찰 돌아야 해.")
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
      n("순찰하는 간수가 당신의 감방 앞에서 멈춘다."),
      d("guard", "뭘 쳐다봐, 이 변태 새끼야. 아직도 버릇이 안 고쳐졌나?"),
      n("간수가 갑자기 창살을 몽둥이로 세게 내리친다. 귀가 찢어질 듯한 쇳소리가 울린다."),
      d("guard", "잠이나 자. 내일 작업장에서 널 특별히 눈여겨보고 있을 테니까."),
      n("간수가 비릿한 웃음을 지으며 사라진다. 다른 죄수들이 놀라서 뒤척인다."),
      n("!!간수의 적대감이 느껴진다.!!")
    ],
    effects: [eff.rel("guard", 1)],
    actions: () => [
      action("불안한 마음으로 잠자리에 든다.", "day_three_morning")
    ]
  })
};

module.exports = guardScenes;
