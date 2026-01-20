const { n, d, cond, eff, action, defineScene } = require('../../SceneBuilder');

const yardScenes = {
  ...defineScene("yard", {
    title: "운동장",
    location: "yard",
    description: [
        n("운동장은 높은 담벼락으로 둘러싸여 있다. 하늘이 보이는 유일한 장소이다."),
        n("여기저기서 죄수들이 운동을 하거나 무리 지어 이야기를 나누고 있다."),
        n("구석에서 **메시아**가 몇몇 추종자들에게 무언가를 설교하고 있다."),
        n("반대편에서는 **소아성폭력범**이 혼자 웅크리고 앉아 있다. 다른 죄수들이 그를 피하는 게 보인다."),
        n("간수 한 명이 당신을 유독 노려보며 다가온다."),
        d("guard", "야, 변태 새끼. 뭘 빤히 쳐다봐? 눈깔 빼버릴까?")
    ],
    actions: () => [
      action("\"당신이나 거울 좀 보시지.\"", "gameover_guard_murder"),
      action("고개를 숙이고 사과한다.", "yard_bow_guard"),
      action("조용히 메시아 쪽으로 피한다.", "yard_messiah"),
      action("소아성폭력범에게 다가간다.", "yard_pedophile"),
      action("혼자 운동장을 걷는다.", "yard_walk")
    ]
  }),

  ...defineScene("yard_walk", {
    title: "산책",
    location: "yard",
    description: [

        n("당신은 혼자 운동장 가장자리를 걷는다. 높은 담벼락 위로 철조망이 보인다."),
        n("감시탑에서 간수가 망원경으로 이쪽을 보고 있다. 도망칠 틈은 없어 보인다."),
        n("담벼락 아래에서 이상한 것을 발견한다. 콘크리트 벽에 **금이 가 있다**. 오래된 균열인 것 같다.")
    ],
    actions: () => [
      action("균열을 자세히 살펴본다.", "yard_crack", [], [eff.flag("knowWallCrack")]),
      action("무시하고 계속 걷는다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("yard_crack", {
    title: "벽의 균열",
    location: "yard",
    description: [

        n("몸을 숙여 스트레칭하는 척하며 균열을 살펴본다."),
        n("균열은 생각보다 깊다. 손가락을 넣으면 콘크리트 조각이 부서져 나온다."),
        n("시간을 들여 파면... 어쩌면 담벼락을 뚫을 수 있을지도 모른다. 하지만 혼자서는 무리이다."),
    ],
    actions: () => [
      action("자리를 뜬다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("day_three_afternoon", {
    title: "셋째 날 오후",
    location: "yard",
    description: [
        n("오후 운동 시간이다. 하늘에 먹구름이 끼어 있다."),
        n("운동장에서 죄수들이 삼삼오오 모여 있다. 긴장감이 느껴진다."),
        n("메시아가 추종자들과 무언가를 속삭이고 있고, 방화범은 혼자 벽을 바라보며 중얼거리고 있다.")
    ],
    actions: () => [
      action("메시아에게 열쇠를 전달한다.", "messiah_key_delivery", [cond.has("환기구 카드키")]),
      action("간수장의 약점을 이용해 협박한다.", "warden_blackmail", [cond.flag("knowWardenWeakness")]),
      action("담벼락의 균열을 다시 확인한다.", "wall_crack_plan", [cond.flag("knowWallCrack")]),
      action("오늘 밤을 위해 휴식을 취한다.", "day_three_evening")
    ]
  }),

  ...defineScene("warden_blackmail", {
    title: "협박",
    location: "yard",
    description: [
        n("운동 시간이 끝날 무렵, 간수장이 혼자 있는 틈을 노린다."),
        n("당신은 그에게 조용히 다가가 속삭인다."),
        d("player", "정 대위... 의무실에서 뭘 하시는지 알고 있습니다. 여자 문제라고요?"),
        n("간수장의 얼굴이 창백해진다."),
        d("warden", "뭐, 뭔 소리야 이 새끼가...!"),
        d("player", "오늘 밤, 지하 비상구를 열어주시면 아무 말 안 하겠습니다. 아니면..."),
        n("간수장이 이를 악문다. 한참을 노려보다가..."),
        d("warden", "...좋아. 새벽 3시에 지하 비상구. 한 번뿐이야. 그 후엔 니가 어떻게 되든 난 몰라."),
    ],
    effects: [eff.flag("wardenBlackmailed")],
    actions: () => [
      action("조용히 자리를 뜬다.", "day_three_evening")
    ]
  }),

  ...defineScene("wall_crack_plan", {
    title: "균열 확인",
    location: "yard",
    description: [
        n("담벼락 구석의 균열을 다시 살펴본다."),
        n("어제보다 더 벌어진 것 같다. 비가 오면 더 약해질지도 모른다."),
        n("하늘을 올려다본다. 먹구름이 잔뜩 끼어 있다. 오늘 밤 비가 올 것 같다.")
    ],
    actions: () => [
      action("밤에 균열을 파볼 계획을 세운다.", "day_three_evening", [], [eff.flag("wallEscapePlan")]),
      action("다른 방법을 생각한다.", "day_three_evening")
    ]
  })
};

module.exports = yardScenes;
