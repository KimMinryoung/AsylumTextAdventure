const { n, d, cond, eff, action, defineScene } = require('../../SceneBuilder');

const escapeScenes = {
  ...defineScene("solo_escape_prepared", {
    title: "완벽한 계획",
    location: "cell",
    description: [
        n("당신은 혼자 탈출을 시도하기로 한다. 하지만 이번엔 **준비가 되어 있다**."),
        n("치한에게서 들은 정보가 떠오른다. 새벽 2시, 간수가 의무실에서 한 시간 동안 사라진다."),
        n("정치범에게서 들은 정보도 있다. 지하 3층에 하수도로 연결되는 통로가 있다."),
        n("깊은 밤, 새벽 2시를 기다린다. 심장이 빠르게 뛴다."),
        n("...발소리가 멀어진다. 지금이다.")
    ],
    actions: () => [action("계획을 실행한다.", "solo_escape_execution")]
  }),

  ...defineScene("solo_escape_execution", {
    title: "탈출 실행",
    location: "corridor",
    description: [
        n("작은 드라이버로 감방 자물쇠를 딴다. 손이 떨리지만, 침착하게."),
        n("째깍... 철컥. 자물쇠가 열린다."),
        n("복도는 텅 비어 있다. 예상대로 간수가 없다."),
        n("발소리를 죽이며 계단을 내려간다. 지하 1층... 지하 2층... 그리고 **지하 3층**."),
        n("정치범이 말한 대로, 창고 구석에 낡은 {{하수도 맨홀}}이 있다."),
        n("뚜껑을 열자 악취가 코를 찌른다. 하지만 **자유의 냄새**이기도 하다.")
    ],
    actions: () => [action("하수도로 들어간다.", "solo_escape_sewer")]
  }),

  ...defineScene("solo_escape_sewer", {
    title: "하수도",
    location: "sewer",
    description: [
        n("악취 나는 하수도를 기어간다. 어둠 속에서 손으로 벽을 더듬으며 나아간다."),
        n("얼마나 갔을까. 한 시간? 두 시간? 시간 감각이 사라진다."),
        n("갑자기 머리 위에서 **바람**이 느껴진다. 출구다!"),
        n("녹슨 사다리를 타고 올라간다. 맨홀 뚜껑을 밀어 올린다."),
        n("...별이 보인다. 차가운 밤공기가 폐를 가득 채운다."),
        n("뒤를 돌아보니, 수용소의 불빛이 저 멀리 보인다. 아무도 당신의 탈출을 눈치채지 못했다.")
    ],
    actions: () => [action("자유를 향해 걷는다.", "ending_solo_success")]
  }),

  ...defineScene("solo_escape_partial", {
    title: "불완전한 계획",
    location: "cell",
    description: [
        n("당신은 혼자 탈출을 시도하기로 한다."),
        n("아내 살인범이 알려준 정보가 있다. 수용소의 구조와 순찰 패턴."),
        n("하지만 확실한 탈출 경로는 모른다. 위험하지만... 시도해볼 가치는 있다."),
        n("깊은 밤, 감방 자물쇠를 따고 복도로 나선다.")
    ],
    actions: () => [
      action("지하로 내려간다.", "solo_partial_basement"),
      action("옥상으로 올라간다.", "solo_partial_roof")
    ]
  }),

  ...defineScene("solo_partial_basement", {
    title: "지하 탐색",
    location: "basement",
    description: [
        n("아내 살인범이 말한 대로, 지하로 내려간다."),
        n("지하 1층... 창고가 있다. 지하 2층... 보일러실이다."),
        n("지하 3층으로 내려가려 하지만... **철문이 잠겨 있다**."),
        n("드라이버로는 열 수 없는 전자 잠금장치이다."),
        d("player", "젠장... 다른 방법을 찾아야 해."),
    ],
    actions: () => [
      action("환기 덕트를 찾는다.", "solo_partial_duct", [cond.flag("knowVentDuct")]),
      action("생각이 나지 않는다. 돌아간다.", "solo_escape_caught")
    ]
  }),

  ...defineScene("solo_partial_duct", {
    title: "환기 덕트",
    location: "basement",
    description: [
        n("소아성폭력범이 지하 2층에 있다고 말한 {{환기 덕트}}가 생각난다."),
        n("보일러실을 뒤지니 말해준대로 그것이 있다. 좁지만 들어갈 수 있을 것 같다."),
        n("좁은 환기 덕트를 기어간다. 금속 벽이 삐걱거린다."),
        n("앞이 보이지 않는다. 그저 앞으로, 앞으로..."),
        n("갑자기 덕트가 아래로 꺾인다. 미끄러진다!"),
        n("쿵! 어딘가에 떨어진다. 충격에 정신이 아득해진다.")
    ],
    actions: () => [action("눈을 뜬다.", "ending_solo_lucky")]
  }),

  ...defineScene("solo_partial_roof", {
    title: "옥상",
    location: "roof",
    description: [
        n("계단을 올라 옥상으로 향한다."),
        n("옥상 문이 잠겨 있지만, 드라이버로 경첩을 풀어낸다."),
        n("밤하늘이 펼쳐진다. 차가운 바람이 불어온다."),
        n("옥상 가장자리에서 아래를 내려다본다. **높다**. 뛰어내리면 죽는다."),
        n("하지만 옆 건물로 이어지는 **전선**이 보인다. 위험하지만...")
    ],
    actions: () => [
      action("전선을 타고 건너간다.", "solo_roof_wire"),
      action("너무 위험하다. 돌아간다.", "solo_escape_caught")
    ]
  }),

  ...defineScene("solo_roof_wire", {
    title: "위험한 도박",
    location: "roof",
    description: [
        n("전선을 양손으로 잡고 건너간다. 아래는 까마득한 어둠이다."),
        n("팔이 떨린다. 전선이 흔들린다. 한 발, 한 발..."),
        n("절반쯤 왔을 때, 갑자기 탐조등이 켜진다!"),
        d("guard", "거기 멈춰! 움직이면 쏜다!"),
        n("선택의 순간이다.")
    ],
    actions: () => [
      action("무시하고 계속 간다!", "solo_roof_gamble"),
      action("포기하고 돌아간다.", "solo_escape_caught")
    ]
  }),

  ...defineScene("solo_roof_gamble", {
    title: "도박",
    location: "roof",
    description: [
        n("당신은 전선을 미친 듯이 타고 간다. 총성이 들린다!"),
        n("탕! 탕! 총알이 옆을 스쳐간다."),
        n("마지막 힘을 짜내어 옆 건물 옥상에 뛰어내린다."),
        n("쿵! 착지에 성공한다. 발목이 삐끗했지만 뼈는 멀쩡하다."),
        n("건물 아래로 뛰어내려 어둠 속으로 사라진다. 뒤에서 사이렌 소리가 울리지만, 이미 늦었다.")
    ],
    actions: () => [action("자유를 향해 달린다.", "ending_solo_daring")]
  }),

  ...defineScene("solo_escape_unprepared", {
    title: "무모한 시도",
    location: "cell",
    description: [
        n("당신은 혼자 탈출을 시도하기로 한다. 아무도 믿을 수 없으니까."),
        n("하지만... 탈출 경로도 모르고, 간수들의 순찰 패턴도 모른다."),
        n("그래도 시도한다. 기회는 지금뿐이니까."),
        n("깊은 밤, 작은 드라이버로 감방 자물쇠를 따기 시작한다."),
        n("째깍... 째깍... 시간이 흐른다. 식은땀이 흐른다."),
        n("철컥. 자물쇠가 열린다.")
    ],
    actions: () => [action("복도로 나선다.", "solo_escape_caught")]
  }),

  ...defineScene("solo_escape_caught", {
    title: "발각",
    location: "corridor",
    description: [
        n("복도에 발을 내딛는 순간, 손전등 불빛이 당신을 비춘다."),
        d("guard", "이 새끼가 지금 미쳤나.... "),
        n("잡혔다. 간수가 달려와 당신을 제압한다."),
        n("당신은 곧 끌려가고 간수들의 심문을 받는다."),
        n("아무 계획도 준비도 없는 탈옥의 어설픈 진상이 밝혀지자 간수들이 포복절도한다."),
        d("guard", "탈옥 시도? 좋아, 독방에서 썩어봐라."),
        n("당신은 끌려간다. 지하 깊숙한 곳으로...")
    ],
    actions: () => [action("독방으로 끌려간다.", "solitary_cell")]
  }),

  ...defineScene("solitary_cell", {
    title: "독방",
    location: "solitary",
    description: [
        n("캄캄한 독방에 던져진다. 문이 닫히고 완전한 어둠이 찾아온다."),
        n("시간이 흐른다. 하루? 이틀? 알 수 없다."),
        n("배가 고프고, 목이 마르다. 하지만 그보다 **절망**이 더 크다."),
        n("바닥에서는 물이 흐르는 듯한 이상한 소리가 들린다. ")
    ],
    actions: () => [
      action("금을 파본다.", "solitary_discovery", [cond.flag("knowWallCrack")]),
      action("포기하고 벽에 기댄다.", "ending_solo_despair")
    ]
  }),

  ...defineScene("solitary_discovery", {
    title: "발견",
    location: "solitary",
    description: [
        n("손으로 바닥을 더듬어본다. 구석에 **금이 간 콘크리트**가 있다."),
        n("손톱으로 콘크리트를 긁어낸다. 손가락에서 피가 나지만 멈출 수 없다."),
        n("조금씩, 조금씩... 구멍이 커진다."),
        n("마침내, 손이 빠질 만큼의 구멍이 뚫렸다. 아래에서 **물 냄새**가 올라온다.")
    ],
    actions: () => [
      action("구멍을 더 넓힌다.", "sewer_escape"),
      action("포기하고 쉰다.", "ending_solo_despair")
    ]
  }),

  ...defineScene("sewer_escape", {
    title: "하수도",
    location: "sewer",
    description: [
        n("며칠에 걸쳐 구멍을 넓힌다. 손은 피투성이가 되고, 손톱은 빠지지만..."),
        n("마침내 사람이 빠져나갈 수 있는 크기가 된다."),
        n("당신은 하수도를 기어간다. 악취와 어둠 속에서 몇 시간을..."),
        n("그리고 마침내, **빛**이 보인다.")
    ],
    actions: () => [action("밖으로 나선다.", "ending_solo_redemption")]
  })
};

module.exports = escapeScenes;
