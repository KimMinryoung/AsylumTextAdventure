const { n, d, cond, eff, action, defineScene } = require('../../../SceneBuilder');

const wifekillerScenes = {
  ...defineScene("talk_wifekiller_intro", {
    title: "아내 살인범",
    location: "cell",
    description: [
      n("당신은 돌아선 아내 살인범을 따라간다. 감방 구석 창문 앞에 선 그는 육체노동으로 단련된 건장한 몸을 갖고 있다."),
      d("player", "저기... 아까 왜 그렇게 말했어요?"),
      n("그가 천천히 돌아본다. 차가운 눈빛이지만, 그 안에 깊은 고통이 보인다."),
      d("wifekiller", "...넌 아이들을 망친 변태잖아. 내가 왜 너한테 친절해야 하지?"),
      n("그의 손이 주먹을 쥔다. 손등에 오래된 방어상 흉터가 보인다."),
      d("wifekiller", "난 내 아이를 지키다가 여기 왔어. 넌 남의 아이를 망쳤고. 우리가 같아 보여?"),
      d("wifekiller", "...가. 눈에 안 띄게 살아. 그게 여기서 살아남는 방법이야."),
    ],
    actions: () => [
      action("\"살인범한테 설교를 듣고 싶진 않았는데.\"", "gameover_wifekiller_rage"),
      action("\"당신 이야기를 듣고 싶어요.\"", "wifekiller_reject_story", [], [eff.rel("wifekiller")]),
      action("조용히 물러난다.", "first_night")
    ]
  }),

  ...defineScene("wifekiller_reject_story", {
    title: "거절",
    location: "cell",
    description: [
      n("아내 살인범이 잠시 멈칫한다. 그의 눈에 복잡한 감정이 스친다."),
      d("wifekiller", "...내 이야기?"),
      n("그가 고개를 돌린다."),
      d("wifekiller", "처음 보는 놈한테 할 이야기 아니야. 그리고 넌 아직 믿을 수 없고."),
      n("하지만 그의 목소리에서 적대감은 조금 누그러져 있다."),
      d("wifekiller", "...가서 자. 내일부터 바빠질 거야."),
    ],
    actions: () => [
      action("조용히 물러난다.", "first_night")
    ]
  }),

  ...defineScene("wifekiller_story", {
    title: "아내 살인범의 진실",
    location: "cell",
    description: [
      n("당신의 말에 아내 살인범이 잠시 멈칫한다."),
      d("wifekiller", "...내 이야기?"),
      n("그가 창문 밖을 바라본다. 눈에 머나먼 기억이 어린다."),
      d("wifekiller", "난 평범한 가장이었어. 작은 식당을 했지. 아내와 다섯 살 아들이 있었고."),
      d("wifekiller", "아내가... 변했어. 술을 마시기 시작했고, 날 때리기 시작했어. 나중엔 아들도."),
      n("그의 목소리가 떨린다."),
      d("wifekiller", "어느 날 밤... 아내가 칼을 들고 아들 방에 들어갔어. '네가 없으면 다 해결돼'라고 소리치면서."),
      d("wifekiller", "난... 뛰어들었어. 칼을 막다가 손을 베였고, 아내를 밀쳤어. 그녀가 넘어지면서... 머리를 부딪혔어. 그게 끝이었어."),
      n("그의 눈에 눈물이 맺힌다."),
      d("wifekiller", "정당방위였어. 분명히. 근데 아내 집안이 부자였고, 판사를 샀어. 난... 살인범이 됐지."),
      d("wifekiller", "아들은 지금 아내 부모 밑에서 자라고 있어. 날 살인자라고 배우면서. 면회도 못 오게 해."),
    ],
    actions: () => [
      action("그에게 진심으로 동정을 표한다.", "wifekiller_bond"),
      action("의심하는 눈길로 쳐다본다.", "first_night")
    ]
  }),

  ...defineScene("wifekiller_bond", {
    title: "유대",
    location: "cell",
    description: [
      n("당신의 진심 어린 반응에 아내 살인범의 표정이 조금 누그러진다."),
      d("wifekiller", "...너, 생각보다 나쁜 사람은 아닌 것 같군."),
      n("그가 한숨을 쉰다."),
      d("wifekiller", "네가 탈출하고 싶다면... 도와줄 수 있어. 난 여기서 나가도 갈 곳이 없지만, 네가 성공하는 건 보고 싶거든."),
      d("wifekiller", "필요하면 말해. **지하 구조도**를 그려줄 수 있어."),
    ],
    effects: [eff.rel("wifekiller", 2)],
    actions: () => [
      action("감사를 표하고 침대로 간다.", "first_night")
    ]
  }),

  ...defineScene("talk_wifekiller", {
    title: "아내 살인범과의 대화",
    location: "workshop",
    description: [
      d("wifekiller", "...뭐야. 또 왔어?"),
    ],
    actions: () => [
      action("\"그날 밤 무슨 일이 있었는지... 들어도 될까요?\"", "wifekiller_story_day2", [cond.relMin("wifekiller", 2)], [eff.rel("wifekiller")]),
      action("\"억울한 일을 당했다는 건 알겠어요.\"", "wifekiller_sympathy", [], [eff.rel("wifekiller")]),
      action("\"아무것도 아니에요.\" 자리를 피한다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("wifekiller_story_day2", {
    title: "아내 살인범의 진실",
    location: "workshop",
    description: [
      d("wifekiller", "난 내 아이를 지키려다 살인범이 됐어. 네가 성공하는 건 보고 싶거든. 필요하면 말해. **지하 구조도**를 그려줄 수 있어."),
    ],
    effects: [eff.rel("wifekiller", 2)],
    actions: () => [
      action("진심으로 감사를 표한다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("wifekiller_sympathy", {
    title: "동정",
    location: "workshop",
    description: [
      d("wifekiller", "네가 탈출을 계획하고 있다면... 도와줄 수 있어. 구조와 경비 패턴을 다 알고 있지."),
    ],
    actions: () => [
      action("감사를 표하고 작업을 계속한다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("wifekiller_final_help", {
    title: "아내 살인범의 마지막 도움",
    location: "workshop",
    description: [
      d("wifekiller", "**지하 창고 옆 비상구**를 기억해. 거긴 안에서 열 수 있어."),
    ],
    effects: [eff.flag("knowEmergencyExit")],
    actions: () => [
      action("약속한다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("gameover_wifekiller_rage", {
    title: "치명적 실수",
    location: "cell",
    description: [n("**[GAME OVER: 말을 함부로 하면 안 됩니다]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  })
};

module.exports = wifekillerScenes;
