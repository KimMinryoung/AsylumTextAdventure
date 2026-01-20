const { n, d, cond, eff, action, defineScene } = require('../../SceneBuilder');

const sleepScenes = {
  ...defineScene("first_night", {
    title: "첫째 날 밤",
    location: "cell",
    description: [
      n("소등 시간이 되자 감방이 어둠에 잠긴다."),
      n("형광등이 꺼지는 소리. 칙. 그리고 완전한 암흑."),
      n("...진짜 아무것도 안 보인다. 이렇게 어두운 건 처음이다."),
      n("도시에서는 불가능한 어둠. 가로등도, 네온사인도, 스마트폰 불빛도 없는."),
      n("침대에 누워 천장을 올려다본다. 천장이 보이지 않는다."),
      n("어둠 속에서 생각한다. **어떻게 탈출할 것인가**."),
      n("근데 그 전에... 여기서 살아남는 게 먼저다."),
      n("어딘가에서 코 고는 소리가 들린다. 누군가의 잠꼬대."),
      n("그리고..."),
      n("'사각사각.'"),
      n("뭔가 긁는 소리. 벽에서? 아니, 천장에서?"),
      n("...쥐겠지. 쥐일 거야."),
    ],
    actions: () => [
      action("소리의 정체를 확인한다.", "first_night_investigate"),
      action("귀를 기울인다.", "night_whisper", [cond.relMin("arsonist", 1)]),
      action("무시하고 잠을 청한다.", "first_night_sleep")
    ]
  }),

  ...defineScene("first_night_investigate", {
    title: "밤의 소리",
    location: "cell",
    description: [
      n("침대에서 천천히 일어난다. 어둠에 눈이 조금 적응됐다."),
      n("'사각사각.'"),
      n("소리가 천장 쪽에서 난다. 환기구 근처인 것 같은데."),
      n("발끝으로 조용히 다가간다. 심장이 빠르게 뛴다."),
      n("환기구 앞에 선다. 귀를 기울인다."),
      n("..."),
      n("소리가 멈췄다."),
      n("뭐지? 내가 다가오는 걸 알았나?"),
      n("한참을 기다린다. 아무 소리도 안 난다."),
      n("그냥 쥐였겠지. 아니면 배관 소리거나."),
      n("돌아서려는 순간—"),
      n("'탁.'"),
      n("환기구 철망이 흔들렸다. 분명히."),
      n("심장이 멎는 줄 알았다."),
      n("뒤도 안 돌아보고 침대로 뛰어들었다."),
      n("이불을 뒤집어쓴다. 바보 같지만 안심이 된다."),
      n("...뭐였지 지금?"),
    ],
    effects: [eff.flag("heardVentNoise")],
    actions: () => [
      action("잠을 청한다.", "first_night_sleep")
    ]
  }),

  ...defineScene("first_night_sleep", {
    title: "첫 번째 꿈",
    location: "cell",
    description: [
      n("눈을 감는다. 피곤해서 금방 잠들 줄 알았는데."),
      n("온갖 생각이 머리를 스친다. 내 게임. 재판. 감옥. 탈출."),
      n("언제 잠들었는지 모르겠다."),
      n(""),
      n("꿈을 꾼다."),
      n(""),
      n("내 작업실이다. 익숙한 모니터 세 대. 키보드. 그래픽 타블렛."),
      n("모니터에 뭔가가 떠 있다. 내 게임이다."),
      n("근데 이상하다. 내가 만든 장면이 아닌데."),
      n("화면 속에 감옥이 보인다. 이 감옥."),
      n("화면 속 주인공이 움직인다. 복도를 걷는다. 문을 연다."),
      n("문 뒤에 뭔가 있다. 어둠. 그리고—"),
      n(""),
      n("화면이 깨진다. 노이즈가 가득 찬다."),
      n("모니터에서 손이 나온다."),
      n(""),
      n("비명을 지르려는데 목소리가 안 나온다."),
      n("손이 내 목을 잡는다. 차갑다. 너무 차가워서 화상을 입는 것 같다."),
      n(""),
      n("'왜 우리를 만들었어?'"),
      n(""),
      n("목소리가 들린다. 남자도 여자도 아닌. 아이도 어른도 아닌."),
      n(""),
      n("'왜 우리를 그렇게 만들었어?'"),
    ],
    actions: () => [
      action("...", "first_night_wake")
    ]
  }),

  ...defineScene("first_night_wake", {
    title: "기상",
    location: "cell",
    description: [
      n("눈을 번쩍 뜬다."),
      n("숨이 가쁘다. 온몸이 땀에 젖었다."),
      n("꿈이었다. 그냥 꿈."),
      n("근데 목이 아프다. 왜지?"),
      n("손으로 목을 만져본다. 괜찮다. 아무것도 없다."),
      n("...그냥 자세가 불편해서 그런 거겠지."),
      n("창밖이 희끄무레하다. 거의 새벽인 모양이다."),
      n("다른 죄수들은 아직 자고 있다."),
      n("한 명만 빼고."),
      n("메시아가 자기 침대에 앉아 당신을 바라보고 있다."),
      n("어둠 속에서도 눈이 빛난다. 얼마나 오래 보고 있었던 거지?"),
      d("messiah", "악몽을 꿨구나."),
      n("...대답하고 싶지 않다."),
      d("messiah", "이 곳은 악몽의 땅이지. 하지만 괜찮아."),
      d("messiah", "곧 깨어날 테니까. 우리 모두."),
      n("그가 미소 짓는다. 위안인지 위협인지 모르겠다."),
    ],
    actions: () => [
      action("\"무슨 뜻이에요?\"", "messiah_cryptic"),
      action("대답하지 않는다.", "day_two_morning")
    ]
  }),

  ...defineScene("messiah_cryptic", {
    title: "메시아의 예언",
    location: "cell",
    description: [
      d("messiah", "넌 창조자잖아. 세계를 만드는 자."),
      d("messiah", "그런 네가 왜 여기 있는지 생각해봤어?"),
      n("...내가 죄를 지어서?"),
      d("messiah", "아니. 네가 여기 있는 건 이유가 있어."),
      d("messiah", "이 감옥 자체가... 하나의 게임이니까."),
      n("뭔 소리야."),
      d("messiah", "곧 알게 될 거야. 규칙도, 엔딩도."),
      d("messiah", "중요한 건 네가 어떤 선택을 하느냐지."),
      n("그가 침대에 눕는다."),
      d("messiah", "잘 자. 아, 이미 아침이구나. 좋은 하루."),
      n("...미친 사람인가, 뭔가 아는 사람인가."),
      n("판단이 안 선다."),
      n("[메시아가 의미심장한 말을 남겼다.]"),
    ],
    effects: [eff.flag("messiahCryptic")],
    actions: () => [
      action("아침을 맞이한다.", "day_two_morning")
    ]
  }),

  ...defineScene("day_two_morning", {
    title: "둘째 날 아침",
    location: "cell",
    description: [
      n("새벽을 알리는 사이렌 소리에 눈을 뜬다."),
      n("삐이이이—"),
      n("이 소리 진짜 싫다. 알람보다 100배는 거슬린다."),
      d("guard", "기상! 5분 안에 점호다!"),
      n("죄수들이 하나둘 침대에서 일어난다."),
      n("피곤하다. 간밤에 너무 얕게 잤다. 악몽 때문에."),
      n("근데 이상하게 머리는 맑다. 긴장 상태가 유지되고 있어서인가."),
      n("게임 개발 크런치 때 3일 밤샘하던 시절이 떠오른다."),
      n("그때도 이랬다. 몸은 망가지는데 정신은 이상하게 또렷한 느낌."),
      n("오늘의 일과가 시작된다."),
      n("**작업장**에서 노동을 하거나, **운동장**에서 바깥 공기를 마실 수 있다."),
      n("어디로 가면 더 유용한 정보를 얻을 수 있을까?"),
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
      n("감방으로 돌아왔다. 긴 하루였다."),
      n("오늘 알게 된 것들을 머릿속으로 정리한다."),
      n("노트가 없으니까 기억력으로 버텨야 한다."),
      n("탈출 루트 후보: 환기구, 하수구, 담벼락, 비상구..."),
      n("각각 장단점이 있다. 근데 어떤 루트든 혼자는 힘들 것 같다."),
      n("동맹이 필요하다."),
      n("메시아? 카리스마는 있지만 광기도 있어. 신뢰하기 어렵다."),
      n("사기꾼? 정보는 많지만 뒤통수 칠 것 같아."),
      n("방화범? 불안정하지만 의외로 진실될 수도."),
      n("정치범? 가장 이성적이지만 탈출 의지가 있는지 모르겠다."),
      n("...복잡하다."),
    ],
    actions: () => [
      action("일찍 잠자리에 든다.", "day_two_early_sleep"),
      action("밤에 감방을 살펴본다.", "day_two_night_explore"),
      action("화장실에 간다.", "day_two_bathroom", [cond.flag("foundNote")])
    ]
  }),

  ...defineScene("day_two_bathroom", {
    title: "밤의 화장실",
    location: "cell",
    description: [
      n("'밤에 화장실 가지 마라.'"),
      n("쪽지 내용이 떠오른다. 근데 배가 아프다. 식당 음식 때문인가."),
      n("참을까? 아니, 못 참겠다."),
      n("감방 구석의 변기로 향한다. 다들 자고 있다."),
      n("볼일을 보려는데—"),
      n("'스윽.'"),
      n("뭔가 변기 아래에서 움직이는 소리."),
      n("...하수구에서?"),
      n("귀를 기울인다."),
      n("'...도와줘...'"),
      n("뭐?!"),
      n("분명히 들렸다. 사람 목소리. 변기 아래에서."),
      n("심장이 멎는 것 같다."),
      d("political", "(속삭임) 들었어?"),
      n("정치범이 침대에서 속삭인다. 안 자고 있었네."),
      d("political", "가끔 들려. 무시해."),
      d("player", "저거 뭐예요...?"),
      d("political", "몰라. 알고 싶지도 않고."),
      n("그녀가 이불을 뒤집어쓴다."),
      n("나도 침대로 돌아간다. 볼일은... 아침에 보자."),
      n("[하수구에서 이상한 소리가 들렸다.]"),
    ],
    effects: [eff.flag("heardSewerVoice")],
    actions: () => [
      action("잠을 청한다.", "day_two_nightmare")
    ]
  }),

  ...defineScene("day_two_early_sleep", {
    title: "이른 취침",
    location: "cell",
    description: [
      n("피곤하다. 내일을 위해 일찍 자자."),
      n("침대에 눕는다. 매트리스가 울퉁불퉁하지만 어젯밤보다는 익숙하다."),
      n("눈을 감는다."),
      n(""),
      n("..."),
      n(""),
      n("잠들기 직전, 이상한 느낌이 든다."),
      n("누군가 보고 있는 것 같은."),
      n("눈을 살짝 뜬다. 어둠 속에서 아무것도 안 보인다."),
      n("근데 느낌은 사라지지 않는다."),
      n("몸을 뒤척인다. 다른 쪽으로 눕는다."),
      n("..."),
      n("자자. 그냥 자."),
    ],
    actions: () => [
      action("잠든다.", "day_two_nightmare")
    ]
  }),

  ...defineScene("day_two_nightmare", {
    title: "둘째 밤의 악몽",
    location: "cell",
    description: [
      n("꿈을 꾼다."),
      n(""),
      n("불이다. 사방이 불."),
      n("연기가 목을 조른다. 숨을 쉴 수 없다."),
      n("불길 사이로 사람들이 보인다. 아이들."),
      n("내 게임 속 캐릭터들. 픽셀로 만든 아이들."),
      n("근데 지금은 픽셀이 아니다. 살아있다."),
      n("불에 타고 있다."),
      n(""),
      n("'왜 우리를 이렇게 만들었어?'"),
      n(""),
      n("같은 질문. 어젯밤과 같은."),
      n("대답하려는데 입에서 연기가 나온다. 내 몸도 타고 있다."),
      n(""),
      n("뒤에서 누군가 웃는다."),
      n("방화범이다. 불 속에서 웃고 있다. 타지 않고."),
      n(""),
      d("arsonist", "아름답지?"),
      n(""),
      n("불이 모든 걸 삼킨다."),
    ],
    actions: () => [
      action("...", "day_three_morning")
    ]
  }),

  ...defineScene("day_two_night_explore", {
    title: "밤의 탐색",
    location: "cell",
    description: [
      n("다른 죄수들이 잠든 틈을 타 감방 안을 조용히 살펴본다."),
      n("어둠에 눈이 적응됐다. 희미하게 윤곽이 보인다."),
      n("창살 사이로 복도를 내다본다. 간수의 발소리가 규칙적으로 들린다."),
      n("'탁, 탁, 탁, 탁...'"),
      n("순찰 간격을 세어본다. 대략 **15분**마다 지나가는 것 같다."),
      n("이건 중요한 정보다. 탈출할 때 이 타이밍을 노려야 해."),
      n("15분이면 꽤 긴 시간이다. 뭔가 할 수 있어."),
      n("[순찰 패턴을 파악했다.]"),
    ],
    effects: [eff.flag("knowPatrolGap")],
    actions: () => [
      action("아직 깨어있는 정치범에게 말을 건다.", "political_night_talk", [cond.relMin("political", 3)]),
      action("순찰하는 간수에게 조심스럽게 말을 건다.", "guard_night_friendly", [cond.relMin("guard", 1)]),
      action("순찰하는 간수에게 말을 건다.", "guard_night_hostile", [cond.relMax("guard", 0)]),
      action("정보를 머릿속에 새기고 잠을 청한다.", "day_two_nightmare")
    ]
  }),

  ...defineScene("day_three_morning", {
    title: "셋째 날 아침",
    location: "cell",
    description: [
      n("새벽을 찢는 사이렌 소리에 눈을 뜬다."),
      n("또 악몽을 꿨다. 이틀 연속이다."),
      n("매일 밤 이러면 정신이 버틸 수 있을까?"),
      n("'밤에 화장실 가지 마라'... 그 쪽지 쓴 사람도 이런 걸 겪었을까?"),
      n("오늘은 **수요일**이다."),
      n("습한 공기가 피부에 들러붙는다. 창밖 하늘이 흐리다."),
      n("폭풍우가 올 것 같은 날씨."),
      d("guard", "기상! 오늘은 전원 작업장이다! 낙오자는 국물도 없을 줄 알아!"),
      n("간수들의 고함과 함께 죄수들이 좀비처럼 몸을 일으킨다."),
      n("메시아가 지나가며 속삭인다."),
      d("messiah", "오늘 밤이야. 준비해."),
      n("심장이 뛴다. 오늘 밤? 무슨 일이 있는 거지?"),
    ],
    actions: () => [
      action("작업장으로 향한다.", "pedophile_attack", [cond.flag("helpedPedophile")]),
      action("작업장으로 향한다.", "day_three_workshop", [cond.notFlag("helpedPedophile")])
    ]
  }),

  ...defineScene("day_three_afternoon", {
    title: "셋째 날 오후",
    location: "cell",
    description: [
      n("작업을 마치고 감방으로 돌아왔다."),
      n("오늘따라 분위기가 이상하다. 긴장감이 감돈다."),
      n("메시아 무리가 뭔가 속삭이고 있다. 방화범은 혼자 라이터를 만지작거린다."),
      n("사기꾼은 어딘가에 없다. 뭔가 준비 중인가."),
      n("정치범만 평소처럼 책을 읽고 있다."),
      n("...아니, 책을 읽는 척하면서 주변을 살피고 있다."),
      n("다들 뭔가 알고 있는 것 같다. 나만 모르는 건가?"),
      n("곧 저녁 식사 시간이다."),
    ],
    actions: () => [
      action("메시아에게 다가간다.", "day_three_messiah_confirm", [cond.flag("knowMessiahPlan")]),
      action("방화범에게 다가간다.", "day_three_arsonist_confirm", [cond.flag("knowArsonistPlan")]),
      action("저녁을 먹으러 간다.", "day_three_dinner")
    ]
  }),

  ...defineScene("day_three_dinner", {
    title: "마지막 만찬",
    location: "cafeteria",
    description: [
      n("식당으로 간다. 오늘따라 음식이 더 맛없게 느껴진다."),
      n("아니, 음식 맛이 문제가 아니다. 긴장해서 목으로 안 넘어간다."),
      n("주변을 본다."),
      n("메시아가 추종자들에게 뭔가 말하고 있다. 다들 진지한 표정."),
      n("사기꾼이 간수 한 명과 눈빛을 교환한다. 저 간수가 매수된 건가?"),
      n("방화범은 밥도 안 먹고 손가락만 튕기고 있다. 초조해 보인다."),
      n("오늘 밤 뭔가 일어난다. 확실하다."),
      n("나는 어떤 선택을 해야 할까."),
    ],
    actions: () => [
      action("감방으로 돌아간다.", "day_three_evening")
    ]
  }),

  ...defineScene("day_three_evening", {
    title: "셋째 날 저녁",
    location: "cell",
    description: [
      n("감방으로 돌아왔다. 소등까지 1시간."),
      n("오늘 밤이 결정의 밤이다."),
      n("준비한 게 있다면 확인할 시간이다."),
      n("게임이었으면 '최종 확인' 팝업이 뜨는 타이밍이다."),
      n("'정말로 이 루트를 선택하시겠습니까? 이후 되돌릴 수 없습니다.'"),
      n("...현실엔 그런 친절한 안내가 없다."),
      n("한 번 선택하면 끝이다. 세이브 포인트 없이."),
      n("심호흡을 한다."),
      n("자, 어떻게 할까."),
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
      n("새벽 2시. 눈을 뜬다."),
      n("계획대로라면 지금이 타이밍이다."),
      n("심장이 미친 듯이 뛴다. 손이 떨린다."),
      n("이게 마지막 기회다. 실패하면 끝이야."),
      n("게임이었으면 F5 누르고 로드할 수 있었을 텐데."),
      n("현실은 그런 거 없다."),
      n("자, 어떤 길을 선택할까."),
      n("10년 형이 남았다. 여기서 버틸 수 있을까?"),
      n("아니면 모든 걸 걸고 탈출할까?"),
      n("선택의 시간이다."),
    ],
    actions: () => [
      action("메시아의 계획을 따른다. (열쇠 전달 완료)", "ending_messiah_enhanced", [cond.flag("messiahKeyDelivered")]),
      action("메시아의 계획을 따른다. (환기구 탈출)", "ending_messiah_route", [cond.flag("knowMessiahPlan"), cond.notFlag("messiahKeyDelivered")]),
      action("사기꾼과 함께 간수를 매수한다.", "ending_fraudster_route", [cond.relMin("fraudster", 2), cond.notFlag("fraudsterRefused")]),
      action("방화범의 계획에 참여한다. (피해 최소화)", "ending_arsonist_safe", [cond.flag("arsonistMinimized")]),
      action("방화범의 계획에 참여한다. (화재 혼란)", "ending_arsonist_route", [cond.flag("arsonistReady"), cond.notFlag("arsonistMinimized")]),
      action("간수장을 협박해 비상구로 탈출한다.", "ending_warden_route", [cond.flag("wardenBlackmailed")]),
      action("폭풍우를 틈타 담벼락 균열을 뚫는다.", "ending_wall_route", [cond.flag("wallEscapePlan")]),
      action("아내 살인범이 알려준 비상구로 탈출한다.", "ending_emergency_route", [cond.flag("knowEmergencyExit")]),
      action("혼자서 탈출을 시도한다. (준비됨)", "solo_escape_prepared", [cond.flag("knowSewerPath"), cond.flag("knowPatrolGap")]),
      action("혼자서 탈출을 시도한다. (일부 정보)", "solo_escape_partial", [cond.relMin("wifekiller", 3)]),
      action("혼자서 탈출을 시도한다.", "solo_escape_unprepared"),
      action("탈출을 포기하고 형기를 채우기로 한다.", "ending_surrender")
    ]
  }),

  ...defineScene("night_whisper", {
    title: "밤의 속삭임",
    location: "cell",
    description: [
      n("잠이 안 온다. 뒤척이다 보니 속삭이는 소리가 들린다."),
      n("방화범이 누군가와 얘기하고 있다. 누구지?"),
      n("귀를 기울인다."),
      d("arsonist", "(속삭임) ...수요일 밤이야. 정전되면 그때 움직여."),
      d("unknown", "(속삭임) 알겠어. 근데 그 새로 온 여자는?"),
      d("arsonist", "(속삭임) ...모르겠어. 아직은."),
      n("내 얘기다. 나를 계획에 넣을지 고민하고 있나."),
      n("숨을 죽인다. 들킨 것 같진 않다."),
      d("arsonist", "(속삭임) 일단 지켜보자. 쓸모있을 수도 있어."),
      n("'쓸모있다'라. 기분이 묘하다."),
      n("[방화범의 탈출 계획 일부를 엿들었다.]"),
    ],
    effects: [eff.flag("overheardArsonist")],
    actions: () => [
      action("계속 듣는다.", "night_whisper_more"),
      action("자는 척한다.", "day_two_morning")
    ]
  }),

  ...defineScene("night_whisper_more", {
    title: "더 많은 정보",
    location: "cell",
    description: [
      n("조금 더 듣는다."),
      d("arsonist", "(속삭임) 동쪽 창고부터 시작해. 거기 기름통 많아."),
      d("unknown", "(속삭임) 화재 경보 울리면?"),
      d("arsonist", "(속삭임) 당연히 울리지. 그게 중요해. 혼란이 필요하니까."),
      n("불을 지를 거다. 탈출을 위해."),
      n("위험하다. 근데... 효과적일 수도 있다."),
      n("더 듣고 싶지만, 방화범이 몸을 돌린다. 대화가 끝난 것 같다."),
      n("내일 방화범에게 접근해볼까. 계획에 끼워달라고."),
      n("아니면 이 정보를 다른 데 써먹을 수도 있겠다."),
      n("[방화범의 탈출 계획을 알게 되었다.]"),
    ],
    effects: [eff.flag("knowArsonistPlan")],
    actions: () => [
      action("잠을 청한다.", "day_two_morning")
    ]
  })
};

module.exports = sleepScenes;
