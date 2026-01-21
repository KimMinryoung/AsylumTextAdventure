const { n, d, cond, eff, action, defineScene } = require('../../SceneBuilder');

const cafeteriaScenes = {
  ...defineScene("cafeteria_arrival", {
    location: "cafeteria",
    description: [
      n("저녁 식사 시간을 알리는 종이 울린다. 죄수들이 일제히 **식당**으로 향한다."),
      n("식당은 회색 콘크리트 벽과 녹슨 철제 테이블로 가득하다."),
      n("천장의 형광등이 깜빡이며 창백한 빛을 내뿜는다. 한 개는 완전히 나가 있다."),
      n("저 깜빡이는 형광등, 호러게임에서 수백 번은 본 연출이다. 현실에서 보니까 그냥 눈 아프다."),
      n("배급구에서 {{묽은 죽}}과 {{딱딱한 빵}} 한 조각을 받아든다."),
      n("...이게 뭐야. 죽에서 뭔가 검은 게 떠다니는데."),
      n("후추인가? 아니면 벌레인가? 확인하기가 무섭다."),
      n("그냥 안 보고 먹자. 단백질이라고 생각하면 돼."),
      n("식당 안을 둘러본다. 여러 무리가 각자의 영역을 차지하고 있다."),
      n("한쪽에는 **메시아**가 추종자들에 둘러싸여 앉아 있다. 반대편에는 **사기꾼**이 누군가와 귓속말을 나누고 있다."),
      n("구석에는 **방화범**이 혼자 앉아 허공을 응시한다. **정치범**은 책을 읽으며 조용히 식사 중이다."),
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
    location: "cafeteria",
    description: [
      n("당신은 구석의 빈 테이블에 혼자 앉는다."),
      n("솔로 플레이어의 본능이다. 일단 상황 파악부터."),
      n("묽은 죽을 떠먹는다. 맛은... 없다. 그냥 미지근한 물에 뭔가가 풀어져 있는 느낌."),
      n("게임 개발할 때 '감옥 식사' 리서치했던 적 있는데, 실제로는 이것보다 나았다고 했는데."),
      n("여기가 특별히 열악한 건가, 아니면 그 자료가 거짓말이었나."),
      n("죄수들 사이의 권력 관계, 간수들의 위치, 출입구의 구조..."),
      n("혼자 있으니 주변을 살피기가 더 쉽다."),
    ],
    actions: () => [
      action("간수에게 슬쩍 다가간다.", "cafeteria_guard_friendly", [cond.relMin("guard", 1)]),
      action("간수들을 관찰한다.", "cafeteria_observe_guards"),
      action("출입구를 살핀다.", "cafeteria_observe_exit"),
      action("갑자기 소란이 일어난다.", "cafeteria_commotion"),
      action("이상한 냄새가 난다...", "cafeteria_smell")
    ]
  }),

  ...defineScene("cafeteria_smell", {
    location: "cafeteria",
    description: [
      n("죽을 먹다가 뭔가 이상한 냄새를 맡는다."),
      n("음식 냄새가 아니다. 이건... 썩는 냄새?"),
      n("주변을 둘러본다. 다들 아무렇지 않게 먹고 있다."),
      n("냄새가 점점 강해진다. 어디서 오는 거지?"),
      n("테이블 밑을 본다."),
      n("...쥐다. 죽은 쥐가 굴러다닌다. 꽤 오래된 것 같은데 아무도 치우지 않았다."),
      d("guard", "야! 거기 뭐해!"),
      d("player", "쥐가 있어요, 죽은 쥐..."),
      d("guard", "아 그거? 알아. 내일 치울 거야. 먹어."),
      n("...내일?"),
      n("식욕이 완전히 사라졌다."),
      d("political", "(옆 테이블에서) 익숙해질 거야. 여기 위생 관념이 좀... 그래."),
      n("정치범이 무표정하게 말한다. 본인 죽은 다 먹은 상태다."),
      n("...대단하다 진짜."),
    ],
    actions: () => [
      action("억지로 먹는다.", "cafeteria_eat_anyway"),
      action("안 먹고 테이블을 옮긴다.", "cafeteria_move_table")
    ]
  }),

  ...defineScene("cafeteria_eat_anyway", {
    location: "cafeteria",
    description: [
      n("눈 딱 감고 죽을 입에 넣는다."),
      n("씹지 말자. 그냥 삼키자."),
      n("꿀꺽."),
      n("...살았다."),
      n("게임 개발 크런치 때 유통기한 2주 지난 편의점 도시락도 먹어본 사람이다."),
      n("이 정도는 괜찮아. 아마도."),
      n("근데 밤에 배탈 나면 어떡하지? 화장실 가면 안 된다는 쪽지 내용이 떠오른다."),
      n("...일단 생각하지 말자."),
    ],
    effects: [eff.flag("ateFood")],
    actions: () => [
      action("식사를 마친다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_move_table", {
    location: "cafeteria",
    description: [
      n("쥐 시체 옆에서 밥 먹긴 싫다. 테이블을 옮긴다."),
      n("새로 앉은 자리는 정치범 근처다."),
      d("political", "왜 옮겼어?"),
      d("player", "쥐가 있어서..."),
      d("political", "아. 그 쥐. 3일째 거기 있더라."),
      n("3일?!"),
      d("political", "여기 그래. 죄수가 죽어도 하루 이틀은 방치하는 곳이야."),
      n("...죄수도?"),
      d("political", "비유야. 아마도."),
      n("그 '아마도'가 무섭다."),
    ],
    actions: () => [
      action("더 물어본다.", "cafeteria_political_morbid"),
      action("식사를 마친다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_political_morbid", {
    location: "cafeteria",
    description: [
      d("player", "여기서... 사람이 많이 죽어요?"),
      n("정치범이 책에서 눈을 떼지 않고 대답한다."),
      d("political", "공식적으로는 '자연사'가 많아."),
      d("player", "자연사요?"),
      d("political", "'자연스럽게' 죽는 거지. 자연스럽게 구타당하고, 자연스럽게 굶고, 자연스럽게 추위에 얼어서."),
      n("블랙유머인지 진담인지 모르겠다."),
      d("political", "작년에 이 식당에서 한 명 죽었어. 밥 먹다가. 갑자기 쓰러졌대."),
      d("player", "..."),
      d("political", "공식 사인은 '심장마비'. 근데 그 사람 20대였어."),
      n("정치범이 책장을 넘긴다."),
      d("political", "그 뒤로 그 자리엔 아무도 안 앉아."),
      d("player", "어느 자리인데요?"),
      n("정치범이 고개를 돌려 어딘가를 가리킨다."),
      n("...내가 아까 앉았던 자리다."),
      n("소름이 돋는다."),
      d("political", "농담이야. 긴장 풀어."),
      n("정치범이 피식 웃는다."),
      n("농담이었어?! 진짜?!"),
      n("...아니, 그래도 그 자리 다신 안 앉을 거다."),
    ],
    effects: [eff.flag("heardDeathStory")],
    actions: () => [
      action("식사를 마친다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_commotion", {
    location: "cafeteria",
    description: [
      n("갑자기 식당 한쪽에서 고함 소리가 터진다."),
      d("unknown", "야 이 새끼야!! 내 밥에 뭐 넣었어?!"),
      n("덩치 큰 죄수가 다른 죄수의 멱살을 잡고 흔들고 있다."),
      d("unknown2", "아 아무것도 안 넣었다고! 진짜야!"),
      n("주변 죄수들이 빙 둘러싼다. 간수들은... 그냥 구경하고 있다."),
      n("구경이야?! 말리지 않고?!"),
      d("guard", "(다른 간수에게) 5천 원 건다. 덩치 큰 놈."),
      d("guard2", "에이, 그쪽 뻔하잖아. 난 작은 놈. 의외로 빠를 것 같아."),
      n("...도박하고 있어. 진짜 말리지 않네."),
      n("쾅!"),
      n("덩치 큰 놈이 작은 놈을 테이블에 내리찍는다. 피가 튄다."),
      n("역겹다. 근데 눈을 뗄 수가 없다."),
      n("인간의 본능인가? 아니면 내가 이상한 건가?"),
      d("guard", "야 야, 그만해! 죽이면 서류 작업 귀찮아지잖아!"),
      n("...서류 작업 때문에 말리는 거야?"),
      n("간수들이 느릿느릿 다가가 둘을 떼어놓는다."),
      n("작은 놈은 코피를 쏟으며 질질 끌려간다."),
      n("덩치 큰 놈은 독방행."),
      n("5분 만에 모든 게 정리된다. 다들 아무 일 없던 듯 밥을 먹는다."),
      n("...이게 일상이구나 여기."),
    ],
    effects: [eff.flag("witnessedFight")],
    actions: () => [
      action("식사를 마친다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_observe_guards", {
    location: "cafeteria",
    description: [
      n("식당에는 간수가 세 명 있다. 입구에 한 명, 배급구 옆에 한 명, 그리고 순찰하는 한 명."),
      n("자연스럽게 패턴을 분석한다. 게임 개발자 버릇."),
      n("순찰하는 간수는 약 **5분마다** 식당을 한 바퀴 돈다."),
      n("근데 이동 루트가 일정하다. 왼쪽부터 시계방향. 오른쪽 구석은 사각지대."),
      n("배급구 옆 간수는 계속 하품을 하고 있다. 야간 근무에 지친 것 같다."),
      n("입구 간수는 폰을 보고 있다. 여기 폰 돼?"),
      n("...아, 간수들만 되는 거구나. 불공평하네."),
      n("유용한 정보를 얻었다."),
      n("[간수들의 순찰 패턴을 파악했다.]"),
    ],
    effects: [eff.flag("knowCafeteriaGuards")],
    actions: () => [
      action("식사를 마친다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_observe_exit", {
    location: "cafeteria",
    description: [
      n("식당의 출입구는 두 곳이다. 정문과 **주방으로 통하는 뒷문**."),
      n("레벨 디자인 관점에서 분석한다."),
      n("정문: 간수 상주. 통과 불가."),
      n("뒷문: 잠겨 있지만, 식사 배급 시간에는 열린다. 잠깐이지만 틈이 있다."),
      n("주방 너머로 **하역장**이 보인다. 식자재 트럭이 드나드는 곳..."),
      n("트럭에 숨어서 나갈 수 있을까?"),
      n("근데 트럭 일정을 알아야 하고, 주방 통과해야 하고, 하역장 감시도 피해야 하고..."),
      n("변수가 너무 많다. 실패 확률 90%는 넘을 것 같은데."),
      n("그래도 기억해두자. 언젠가 쓸모있을지도."),
      n("[주방 탈출 루트 가능성을 파악했다.]"),
    ],
    effects: [eff.flag("knowKitchenExit")],
    actions: () => [
      action("정보를 머릿속에 새긴다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_ghost_story", {
    location: "cafeteria",
    description: [
      n("혼자 앉아 있으니 옆 테이블 대화가 들린다."),
      d("unknown", "야, 그거 알아? 식당 냉동실 귀신 얘기."),
      d("unknown2", "에이, 그거 다 아는 얘기잖아."),
      n("귀신? 여기 귀신 이야기도 있어?"),
      d("unknown", "아니, 진짜야. 내 친구가 밤에 주방 청소 당번이었는데..."),
      d("unknown", "냉동실 문이 혼자 열렸대. 안에 아무도 없는데."),
      d("unknown2", "그냥 고장이겠지."),
      d("unknown", "근데 그 안에서 소리가 났대. '도와줘'라고."),
      n("...뭐?"),
      d("unknown2", "헛소리지. 냉동실에서 어떻게 소리가 들려."),
      d("unknown", "아니, 진짜래. 그래서 그 친구 다음 날 자청해서 독방 갔어."),
      d("unknown", "냉동실 청소보다 독방이 낫다고."),
      n("...독방이 더 나은 수준이면 대체 뭘 본 거야?"),
      n("게임이었으면 '냉동실 조사' 선택지가 떴을 텐데."),
      n("현실에서는 절대 안 갈 거다. 미쳤다고."),
    ],
    effects: [eff.flag("heardFreezerGhost")],
    actions: () => [
      action("더 듣는다.", "cafeteria_ghost_detail"),
      action("무시한다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_ghost_detail", {
    location: "cafeteria",
    description: [
      n("대화하던 죄수들에게 슬쩍 다가간다."),
      d("player", "저기... 그 냉동실 얘기, 더 들을 수 있어요?"),
      n("둘이 당신을 쳐다본다."),
      d("unknown", "아, 새로 온 여자? 그 게임 만든?"),
      d("player", "...네."),
      d("unknown", "호러 게임도 만들었어?"),
      d("player", "아뇨, 제 게임은..."),
      d("unknown", "아 그래? 근데 왜 관심 있어? 여기 귀신 얘기 무서워."),
      n("솔직히 무서운 게 아니라 흥미로운 건데. 직업병이다."),
      d("unknown2", "그 냉동실 말이야, 원래 시체 보관소였대."),
      d("player", "...시체?"),
      d("unknown2", "여기 죽는 사람 많잖아. 근데 바로 못 치우니까 일단 거기 넣어두는 거지."),
      d("unknown2", "냉동실이니까 안 썩으니까."),
      n("합리적이다. 끔찍하지만."),
      d("unknown", "근데 가끔 그 시체들이 움직인다는 소문이..."),
      d("guard", "거기! 뭐 해! 밥 먹어!"),
      n("간수가 소리친다. 대화가 끊긴다."),
      n("시체가 움직인다고? 그건 좀 오버 아닌가."),
      n("...근데 왜 이렇게 등이 서늘하지?"),
    ],
    effects: [eff.flag("knowFreezerHistory")],
    actions: () => [
      action("식사를 마친다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_food_mystery", {
    location: "cafeteria",
    description: [
      n("죽을 먹다가 문득 의문이 든다."),
      n("이 고기... 뭐지?"),
      n("분명 '고기'라고 했는데 식감이 이상하다. 너무 질기고 냄새가 좀..."),
      d("fraudster", "(옆에서) 아, 그거? 깊이 생각 안 하는 게 좋아."),
      n("사기꾼이 끼어든다. 언제 옆에 왔지?"),
      d("player", "...뭔데요?"),
      d("fraudster", "공식적으로는 '닭고기'야. 근데 여기 양계장 없거든?"),
      d("player", "..."),
      d("fraudster", "농담이야. 아마 오래된 통조림이겠지. 긴장 풀어."),
      n("사기꾼이 킥킥거린다."),
      n("농담인지 진담인지 모르겠다. 이 인간 표정 읽기가 어렵다."),
      d("fraudster", "근데 냉동실 얘기 들었어? 재밌지 않아?"),
      n("이 사람도 그 얘기를 알고 있네."),
      d("fraudster", "여기 다들 그 냉동실 무서워해. 나도 좀 그렇고."),
      d("fraudster", "근데 말이야, 무서운 건 귀신이 아니야."),
      d("player", "그럼 뭔데요?"),
      d("fraudster", "사람이지. 항상 그렇듯이."),
      n("사기꾼이 의미심장하게 웃는다."),
      n("...무슨 뜻이지?"),
    ],
    effects: [eff.flag("foodMystery")],
    actions: () => [
      action("더 물어본다.", "cafeteria_fraudster_hint"),
      action("식사를 마친다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_fraudster_hint", {
    location: "cafeteria",
    description: [
      d("player", "그게 무슨 뜻이에요?"),
      n("사기꾼이 주변을 살피며 목소리를 낮춘다."),
      d("fraudster", "여기 비밀 많아. 간수들도 모르는 것들."),
      d("fraudster", "예를 들어... 지하실이 몇 층인지 알아?"),
      d("player", "지하 1층 아니에요?"),
      d("fraudster", "공식적으로는. 근데 난 3층까지 있다고 들었어."),
      d("player", "3층?"),
      d("fraudster", "거기 뭐가 있는지는 아무도 몰라. 들어간 사람이 없거든."),
      d("fraudster", "아니, 들어간 사람은 있어. 나온 사람이 없는 거지."),
      n("등이 서늘해진다."),
      d("fraudster", "궁금하면 나중에 더 얘기해줄게. 대신 그에 맞는 '대가'가 필요하지만."),
      n("사기꾼이 윙크한다."),
      n("이 인간, 정보를 가지고 거래하려는 건가."),
      n("근데 솔직히 궁금하긴 하다. 지하 3층이라니."),
    ],
    effects: [eff.flag("knewBasementHint"), eff.rel("fraudster", 1)],
    actions: () => [
      action("식사를 마친다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_end", {
    location: "cafeteria",
    description: [
      n("식사 시간 종료를 알리는 종이 울린다."),
      n("땡땡땡. 파블로프의 개처럼 죄수들이 일제히 움직인다."),
      n("나도 조건반사적으로 식기를 들고 일어난다. 이미 적응되고 있다."),
      n("...이게 좋은 건지 나쁜 건지 모르겠다."),
      n("빈 그릇을 들고 줄을 선다."),
      d("guard", "빨리 움직여! 소등까지 30분이다!"),
      n("30분. 감방에 돌아가면 뭘 할 수 있을까."),
      n("오늘 알게 된 것들을 정리해야겠다. 머릿속으로."),
      n("노트 앱이 그립다."),
    ],
    actions: () => [
      action("감방으로 돌아간다.", "day_two_evening")
    ]
  }),

  ...defineScene("cafeteria_messiah", {
    location: "cafeteria",
    description: [
      n("메시아의 테이블로 다가간다. 추종자들의 시선이 집중된다."),
      n("뭐야, 왜 다들 쳐다봐. 자리 없나?"),
      d("messiah", "오라, 길 잃은 양이여. 자리가 있다."),
      n("메시아가 손짓한다. 추종자들이 슬쩍 자리를 만들어준다."),
      n("분위기가 묘하다. 종교 집회 같달까."),
      d("messiah", "새로운 얼굴과 함께하니 기쁘구나. 음식은 어떠냐?"),
      d("player", "...맛없어요."),
      d("messiah", "하하, 솔직하군."),
      n("추종자들이 웅성거린다. 메시아 앞에서 불평을 하다니, 같은 분위기."),
      d("messiah", "괜찮다. 솔직함은 미덕이니."),
      d("messiah", "여기 음식은 몸을 위한 것이 아니다. 영혼을 시험하는 것이지."),
      n("...뭔 소리야."),
      n("근데 추종자들은 다들 고개를 끄덕이고 있다. 진지하게."),
      n("이 사람, 카리스마는 확실히 있다. 무슨 말을 해도 그럴듯하게 들리게 만드는 능력."),
    ],
    effects: [eff.rel("messiah", 1)],
    actions: () => [
      action("구원에 대해 물어본다.", "cafeteria_messiah_salvation"),
      action("식사를 마친다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_messiah_salvation", {
    location: "cafeteria",
    description: [
      d("player", "구원이 뭔데요? 여기서 어떻게 구원받는다는 거예요?"),
      n("메시아가 미소 짓는다. 질문을 기다렸다는 듯이."),
      d("messiah", "구원은 바깥에 있지 않다. 안에 있다."),
      d("messiah", "하지만 때로는... 바깥으로 나가야 안을 찾을 수 있지."),
      n("비유인가? 아니면 탈출 얘기인가?"),
      d("messiah", "곧 때가 온다. 어둠이 빛으로 바뀌는 날이."),
      d("messiah", "그날, 믿는 자는 구원받을 것이다."),
      n("추종자들이 황홀한 표정으로 듣고 있다."),
      n("...이 사람들, 진짜 믿는 거야?"),
      n("근데 이상하게 나도 빠져들 것 같은 느낌이 든다."),
      n("위험하다. 정신 차리자."),
      d("messiah", "너도 그날이 오면 선택해야 할 것이다. 빛을 따를 것인지, 어둠에 남을 것인지."),
      n("메시아의 눈이 빛난다. 광기인가 확신인가."),
      n("둘 다인 것 같다."),
    ],
    effects: [eff.flag("heardMessiahProphecy")],
    actions: () => [
      action("식사를 마친다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_arsonist", {
    location: "cafeteria",
    description: [
      n("방화범 옆에 앉는다. 그가 고개를 돌려 당신을 본다."),
      d("arsonist", "왜 여기 앉아?"),
      d("player", "자리가 비어있길래..."),
      d("arsonist", "다들 피하는 자리인데."),
      n("그가 씁쓸하게 웃는다. 얼굴의 화상 자국이 형광등 빛에 드러난다."),
      d("arsonist", "뭐, 상관없어. 앉아."),
      n("잠시 침묵이 흐른다. 그가 먼저 입을 연다."),
      d("arsonist", "너, 게임 만들 때 불 표현 어떻게 해?"),
      d("player", "...네?"),
      d("arsonist", "불 말이야. 그래픽으로."),
      n("갑자기 웬 불 이야기?"),
      d("player", "음... 파티클 시스템이랑 셰이더로요. 요즘은 리얼타임 시뮬레이션도..."),
      d("arsonist", "현실 불이랑 비슷해?"),
      d("player", "비슷하게 보이려고 노력하죠."),
      d("arsonist", "근데 게임 불은 안 따뜻하잖아. 안 뜨겁잖아."),
      n("그의 눈이 어딘가 먼 곳을 보고 있다."),
      d("arsonist", "진짜 불은... 살아있어. 숨을 쉬고, 먹고, 자라고."),
      d("arsonist", "파괴하면서 동시에 정화하지."),
      n("...이 사람, 불에 대한 애착이 보통이 아니다."),
    ],
    effects: [eff.rel("arsonist", 1)],
    actions: () => [
      action("\"왜 불을 질렀어요?\"", "cafeteria_arsonist_past"),
      action("식사를 마친다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_arsonist_past", {
    location: "cafeteria",
    description: [
      d("player", "...왜 불을 질렀어요?"),
      n("위험한 질문이라는 걸 안다. 근데 물어보고 싶었다."),
      n("방화범이 잠시 침묵한다. 대답 안 할 줄 알았는데."),
      d("arsonist", "...처음엔 아버지 집이었어."),
      d("player", "아버지요?"),
      d("arsonist", "그 새끼가 날 지하실에 가뒀거든. 몇 년 동안."),
      n("그가 팔을 걷는다. 화상 자국 사이로 담뱃불 자국들이 보인다."),
      d("arsonist", "이건 그때 받은 거야."),
      n("...뭐라고 해야 할지 모르겠다."),
      d("arsonist", "17살 때 탈출했어. 그리고 그 집에 불을 질렀지."),
      d("arsonist", "그 새끼가 타는 거 봤어. 근데 이상하게..."),
      n("그가 피식 웃는다. 웃음이 슬프다."),
      d("arsonist", "시원하지 않더라. 그냥 허무했어."),
      d("arsonist", "그래서 더 태웠어. 뭔가 느껴질 때까지."),
      n("그가 멀리 메시아 쪽을 본다."),
      d("arsonist", "저 새끼는 '구원'을 얘기하지. 근데 난 몰라."),
      d("arsonist", "내가 구원받을 수 있는지."),
      n("무거운 침묵이 흐른다."),
    ],
    effects: [eff.flag("knowArsonistPast"), eff.rel("arsonist", 2)],
    actions: () => [
      action("식사를 마친다.", "cafeteria_end")
    ]
  })
};

module.exports = cafeteriaScenes;
