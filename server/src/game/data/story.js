const { n, d, cond, eff, action, defineScene } = require('../SceneBuilder');

const scenes = {
  // ===== 1장: 입소 =====
  ...defineScene("entrance", {
    title: "수용소 입소",
    location: "corridor",
    description: [
      n("무겁고 녹슨 **철문**이 비명 같은 쳇소리를 내며 열린다."),
      n("사방은 습기 찬 콘크리트 냄새와 정체 모를 **소독약** 냄새로 가득하다."),
      n("당신의 눈앞에는 검은 제복을 입고 {{가죽 채찍}}을 만지작거리는 간수가 서 있다. 그는 비릿한 웃음을 지으며 당신의 턱을 거칠게 들어 올린다."),
      d("guard", "어이, '예술가' 선생. 드디어 우리 공화국의 제일 깊은 곳까지 오셨군. 네가 10년 전 그 구역질 나는 소아성애적인 게임들을 세상에 뿌려댈 때만 해도, 이런 곳에서 노년을 보내게 될 줄은 꿈에도 몰랐겠지?"),
      n("간수가 당신의 뺨을 가볍게 툭툭 치며 말을 잇는다."),
      d("guard", "네 그 잘난 '창작욕' 덕분에 공화국의 고결한 성 문화가 아주 제대로 타락했어. 어린아이들을 네 추잡한 망상의 제물로 삼은 대가가 고작 이 수용소라니, 국가가 너무 자비로운 거 아닌가 싶어. 안 그래?"),
      d("guard", "걱정 마라. 여기선 네가 만들었던 그 역겨운 게임 속 캐릭터들보다 훨씬 더 비참한 꼴을 보게 될 테니까. 자, 입소 축하 선물이다."),
    ],
    actions: () => [
      action("고개를 숙이고 잘못했다고 빈다.", "entrance_beg"),
      action("아무 말 없이 간수의 눈을 노려본다.", "entrance_stare", [], [eff.flag("hurtLeg")]),
      action("간수의 허리춤에 달린 열쇠 꾸러미를 몰래 훔쳐본다.", "entrance_key", [], [eff.flag("knowKeyStructure")])
    ]
  }),

  ...defineScene("entrance_beg", {
    title: "굴욕",
    location: "corridor",
    description: [
      n("당신은 고개를 깊이 숙이며 용서를 구한다."),
      d("guard", "크하하! 이것 봐라. 밖에서 그렇게 잘난 척하더니 여기선 벌써 꼬리를 내리는군."),
      n("간수가 당신의 등을 발로 밟아 바닥에 엎드리게 한다. 굴욕적이지만, 그는 당신의 비굴한 태도에 흥미를 잃은 듯 코웃음을 치며 물러난다."),
      d("guard", "재미없는 년. 7번 감방으로 꺼져. 거기서 네 새 '가족'들을 만나봐라."),
      n("잔뜩 긴장했지만 다행히 신체적 피해는 피했다."),
      n("[간수가 당신의 순종적인 태도를 마음에 들어한다.]"),
    ],
    effects: [eff.rel("guard", 1)],
    actions: () => [
      action("7번 감방으로 향한다.", "cell_arrival")
    ]
  }),

  ...defineScene("entrance_stare", {
    title: "반항",
    location: "corridor",
    description: [
      n("당신은 아무 말 없이 간수의 눈을 똑바로 쏘아본다."),
      d("guard", "...이 새끼가 눈깔이 살아있네?"),
      n("간수의 표정이 차갑게 굳어진다. 그의 손에 들린 몽둥이가 번개처럼 날아와 당신의 무릎을 강타한다."),
      n("!!극심한 통증!!이 다리를 타고 퍼진다. 당신은 비명을 삼키며 바닥에 쓰러진다."),
      d("guard", "그 눈빛 잘 간직해둬. 일주일 안에 꺼질 테니까. 7번 감방으로 기어가."),
      n("다리가 저려 일부 행동에 제약이 생길 것 같다...."),
      n("!!간수가 당신을 요주의 인물로 찍었다.!!"),
    ],
    effects: [eff.rel("guard", 2)],
    actions: () => [
      action("절뚝거리며 7번 감방으로 향한다.", "cell_arrival")
    ]
  }),

  ...defineScene("entrance_key", {
    title: "관찰",
    location: "corridor",
    description: [
      n("간수가 당신의 죄목을 읊으며 훈계하는 동안, 당신은 고개를 숙인 척하며 그의 허리춤을 주시한다."),
      n("낡은 가죽 벨트에 {{열쇠 꾸러미}}가 달려 있다. 크고 녹슨 열쇠 하나, 작고 반짝이는 열쇠 둘, 그리고 특이한 형태의 **카드키** 하나."),
      d("guard", "뭘 봐, 이 변태 새끼야!"),
      n("간수가 당신의 시선을 알아채고 채찍 손잡이로 턱을 올려친다. 하지만 이미 중요한 정보는 머릿속에 새겨졌다."),
      d("guard", "7번 감방이다. 썩 꺼져."),
      n("[간수가 당신의 시선을 의심스럽게 여긴다.]"),
    ],
    effects: [eff.rel("guard", 1)],
    actions: () => [
      action("7번 감방으로 향한다.", "cell_arrival")
    ]
  }),

  ...defineScene("cell_arrival", {
    title: "7번 감방",
    location: "cell",
    description: [
      n("축축한 복도를 지나 **7번 감방** 앞에 도착한다. 녹슨 철창 너머로 여러 개의 시선이 느껴진다."),
      n("간수가 철창을 열고 당신을 안으로 밀어 넣는다. 쾅, 하는 소리와 함께 철창이 닫힌다."),
      d("guard", "새 식구다. 사이좋게 지내라, 쓰레기들아."),
      n("간수의 발소리가 멀어지자, 감방 안의 7명의 죄수들이 당신을 둘러싼다."),
      d("fraudster", "어이어이, 뉴페이스잖아. 뭘로 들어왔어? 여기 우리 모두 각자의 '사연'이 있거든."),
      d("political", "그냥 내버려둬. 첫날은 다들 멍하니까."),
      n("구석에서 누군가 당신을 유심히 바라보고 있다. 창백한 얼굴의 죄수가 알 수 없는 미소를 짓고 있다."),
    ],
    actions: () => [
      action("자기소개를 한다.", "cell_introduction"),
      action("아무 말 없이 빈 침대를 찾는다.", "cell_silent"),
      action("죄수들을 하나하나 관찰한다.", "cell_observe")
    ]
  }),

  ...defineScene("cell_introduction", {
    title: "자기소개",
    location: "cell",
    description: [
      n("당신은 목소리를 가다듬고 자신을 소개한다. 감방 안에 묘한 침묵이 흐른다."),
      d("arsonist", "아, 그 게임 만든 여자? 뉴스에서 봤어. 꽤 큰 뉴스였지. 아이들을... 그런 내용이었다며."),
      n("방화범이 손가락을 튕기며 당신을 훑어본다."),
      d("groper", "헤헤... 동류를 만나니 반갑네. 나도 뭐, 비슷한 취급 받고 있으니까. 히히."),
      d("wifekiller", "...역겹군."),
      n("아내 살인범이라 불리는 여자가 차갑게 내뱉고 돌아선다. 그의 눈에 깊은 슬픔과 혐오가 공존한다."),
      d("fraudster", "야야, 다들 그러지 마. 여기 천사 있어? 다들 각자 사연 있잖아."),
      n("사기꾼이 능글맞게 웃으며 분위기를 누그러뜨린다."),
      d("messiah", "심판하지 마라, 형제들이여. 우리 모두는 이 지옥에서 구원을 기다리는 죄인들이니."),
      n("창백한 얼굴의 죄수가 천천히 다가온다. 그의 눈빛이 묘하게 빛난다. 광기와 카리스마가 공존하는 눈."),
      d("messiah", "나는 이곳의 **메시아**라 불리지. 언젠가 우리 모두를 이끌고 이 지옥을 탈출할 자... 환영한다, 새로운 양이여."),
    ],
    actions: () => [
      action("메시아에게 더 물어본다.", "talk_messiah"),
      action("사기꾼에게 말을 건다.", "talk_fraudster"),
      action("돌아선 아내 살인범을 따라간다.", "talk_wifekiller_intro"),
      action("갑자기 긴장감이 흐른다...", "conflict_messiah_arsonist"),
      action("빈 침대를 찾아 눕는다.", "first_night")
    ]
  }),

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

  ...defineScene("cell_silent", {
    title: "침묵",
    location: "cell",
    description: [
      n("당신은 아무 말 없이 감방 구석의 빈 침대로 향한다."),
      d("groper", "야, 쟤 왜 저래? 잘난 척이야 뭐야?"),
      d("political", "내버려둬. 적응할 시간이 필요한 거야."),
      n("당신은 침대에 누워 천장을 바라본다. 금이 간 콘크리트 사이로 물이 새어나오고 있다."),
      d("messiah", "고요함 속에도 답이 있는 법... 현명한 선택일지도 모르지."),
    ],
    actions: () => [
      action("방금 지나간 죄수에게 말을 건다.", "talk_messiah"),
      action("눈을 감고 잠을 청한다.", "first_night")
    ]
  }),

  ...defineScene("cell_observe", {
    title: "관찰",
    location: "cell",
    description: [
      n("당신은 눈을 가늘게 뜨고 감방 안의 죄수들을 하나하나 살핀다."),
      n("**사기꾼** - 말쑥한 인상에 입술에는 항상 미소가 걸려 있다."),
      n("**방화범** - 얼굴 한편에 끔찍한 화상 자국이 있다."),
      n("**치한** - 구석에 쪼그려 앉아 음침한 눈빛으로 주위를 살핀다."),
      n("**정치범** - 지적이고 진지한 인상. 낡은 책을 읽고 있다."),
      n("**아내 살인범** - 과묵하고 벽만 바라보며 미동도 않는다."),
      n("**소아성폭력범** - 감방 구석에 웅크린 왜소한 안경잡이."),
      n("**메시아** - 창백한 얼굴에 광기 어린 눈빛."),
    ],
    actions: () => [
      action("책 읽는 정치범에게 다가간다.", "talk_political"),
      action("메시아라 불리는 자에게 다가간다.", "talk_messiah"),
      action("구석의 치한에게 다가간다.", "talk_groper", [cond.notFlag("groperEnemy")]),
      action("방화범에게 다가간다.", "talk_arsonist_day"),
      action("빈 침대를 찾아 눕는다.", "first_night")
    ]
  }),

  ...defineScene("talk_messiah", {
    title: "메시아와의 대화",
    location: "cell",
    description: [
      d("messiah", "나에게 관심이 있는가, 새로운 양이여?"),
      n("가까이서 보니 그의 눈동자가 묘하게 흔들리고 있다."),
      d("messiah", "나는 밖에서 **새로운 종교**를 만들었지. 《천상의 문》이라고..."),
      d("messiah", "함께할 자들만이 구원받을 것이다. 나를 믿겠나?"),
    ],
    actions: () => [
      action("\"당신은 어떻게 메시아가 됐나요?\"", "messiah_origin", [cond.relMin("messiah", 3)]),
      action("\"믿겠습니다.\"", "messiah_trust", [], [eff.flag("knowMessiahPlan")]),
      action("\"생각해 보겠습니다.\"", "messiah_doubt"),
      action("\"사이비 교주랑은 엮이기 싫군.\"", "messiah_reject")
    ]
  }),

  ...defineScene("messiah_origin", {
    title: "메시아의 기원",
    location: "cell",
    description: [
      n("메시아의 눈빛이 머나먼 곳을 바라본다."),
      d("messiah", "나는... 원래 평범한 의사였어. 작은 마을 병원의 외과의."),
      d("messiah", "어느 날 밤, 대형 사고가 났어. 환자가 수십 명 쏟아졌지."),
      d("messiah", "그때 **목소리**가 들렸어. '너는 선택받았다. 죽음을 결정하는 자.'"),
    ],
    actions: () => [
      action("\"그래서 어떻게 됐나요?\"", "messiah_origin_2"),
      action("무섭다. 물러난다.", "cell_observe")
    ]
  }),

  ...defineScene("messiah_origin_2", {
    title: "메시아의 탄생",
    location: "cell",
    description: [
      d("messiah", "어느 날, 한 아이가 찾아왔어. 암 말기였지. 의학으로는 가망이 없었어."),
      d("messiah", "근데... 내가 손을 얹으니까... 아이가 나았어. 진짜로."),
      d("messiah", "넌 믿음이 있는 자 같아. 함께하겠나, 형제여?"),
    ],
    actions: () => [
      action("\"...믿겠습니다.\"", "messiah_trust", [], [eff.flag("knowMessiahPlan")]),
      action("\"아직 잘 모르겠어요.\"", "messiah_doubt")
    ]
  }),

  ...defineScene("messiah_trust", {
    title: "메시아의 신뢰",
    location: "cell",
    description: [
      n("메시아의 얼굴에 환한 미소가 번진다."),
      d("messiah", "현명한 선택이야, 형제여. 너는 구원받을 자격이 있어."),
      d("messiah", "3일 후 새벽, **환기구**가 열리는 시간이 있어. 그때 움직인다."),
    ],
    actions: () => [
      action("고개를 끄덕이고 물러난다.", "first_night")
    ]
  }),

  ...defineScene("messiah_doubt", {
    title: "유보",
    location: "cell",
    description: [
      d("messiah", "의심은 지혜의 시작이지... 하지만 너무 오래 망설이면 기회는 사라진다."),
    ],
    actions: () => [
      action("다른 죄수들에게 말을 건다.", "cell_introduction"),
      action("침대로 가서 쉰다.", "first_night")
    ]
  }),

  ...defineScene("messiah_reject", {
    title: "거부",
    location: "cell",
    description: [
      n("메시아의 눈빛이 순간 얼어붙는다."),
      d("messiah", "...사이비... 교주...?"),
      d("messiah", "좋아... 좋아. 불신자는 스스로 지옥을 선택하는 법이지. 후회하게 될 거야."),
      n("사기꾼이 슬쩍 다가온다."),
      d("fraudster", "야... 너 진짜 대담하다. 저거 추종자가 꽤 있어."),
    ],
    effects: [eff.flag("messiahEnemy")],
    actions: () => [
      action("사기꾼의 말을 듣는다.", "talk_fraudster"),
      action("무시하고 침대로 간다.", "first_night")
    ]
  }),

  ...defineScene("talk_fraudster", {
    title: "사기꾼과의 대화",
    location: "cell",
    description: [
      n("사기꾼이 능글맞은 미소를 지으며 당신에게 다가온다."),
      d("fraudster", "오, 새 친구. 반가워. 여기선 '김 사장'이라고 불러."),
      d("fraudster", "근데 말이야, 여기 간수들 중에 **매수 가능한 놈**이 있어. 야간 근무 서는 '박' 간수라고."),
      d("fraudster", "혹시 밖에 연락할 사람 있어? 있으면 거래 좀 해보자고."),
    ],
    actions: () => [
      action("\"어떻게 사기를 치게 됐어요?\"", "fraudster_past"),
      action("\"연락할 사람이 있을지도...\"", "fraudster_deal", [], [eff.flag("knowFraudsterPlan")]),
      action("\"없어. 난 버려진 몸이야.\"", "fraudster_reject"),
      action("\"사기꾼 말을 어떻게 믿어?\"", "fraudster_suspicious")
    ]
  }),

  ...defineScene("fraudster_past", {
    title: "사기꾼의 과거",
    location: "cell",
    description: [
      d("fraudster", "...내가 왜 사기꾼이 됐는지 궁금해? 재밌는 이야기는 아닌데."),
      d("fraudster", "나도 원래는 **평범한 회사원**이었어. 근데 회사가 망했어. 대표가 도주한 거야."),
      d("fraudster", "그때 깨달았어. 정직하게 살아봤자 호구 되는 거더라고."),
    ],
    actions: () => [
      action("\"그러다 어떻게 커졌어요?\"", "fraudster_past_2"),
      action("\"...그래서, 탈출 얘기는?\"", "fraudster_deal_talk")
    ]
  }),

  ...defineScene("fraudster_past_2", {
    title: "사기꾼의 성장",
    location: "cell",
    description: [
      d("fraudster", "처음 100만 원 뜯었을 때... 손이 떨렸어. 근데 열 번째쯤 되니까... **아무렇지도 않았어**."),
      d("fraudster", "3년 만에 127억을 모았어. 근데 내 동업자 새끼가 배신했어."),
    ],
    actions: () => [
      action("\"어떻게 하는 건데?\"", "fraudster_deal_talk"),
      action("\"피해자들한테 미안하진 않아?\"", "fraudster_guilt")
    ]
  }),

  ...defineScene("fraudster_guilt", {
    title: "죄책감",
    location: "cell",
    description: [
      n("사기꾼이 잠시 멈칫한다."),
      d("fraudster", "한 할머니가 있었어. 전 재산 3천만 원을 맡기셨지. 나중에 들었는데... 한강에 뛰어들었대."),
      d("fraudster", "그래서 나가면... 그 아들한테 돈 좀 보내주려고. 찝찝하니까."),
    ],
    actions: () => [
      action("거래를 제안받는다.", "fraudster_deal_talk"),
      action("거절하고 물러난다.", "first_night")
    ]
  }),

  ...defineScene("fraudster_deal_talk", {
    title: "사기꾼의 제안",
    location: "cell",
    description: [
      d("fraudster", "박 간수는 돈에 약해. 5천만 원이면 넘어와."),
      d("fraudster", "문제는 밖에 있는 내 조직에 연락하는 거야. 면회 온 사람한테 메모를 전달하면 돼."),
    ],
    actions: () => [
      action("\"연락할 사람이 있을지도...\"", "fraudster_deal", [], [eff.flag("knowFraudsterPlan")]),
      action("\"없어. 난 버려진 몸이야.\"", "fraudster_reject")
    ]
  }),

  ...defineScene("fraudster_deal", {
    title: "거래",
    location: "cell",
    description: [
      d("fraudster", "오, 그래? 그럼 이야기가 되네."),
      d("fraudster", "내일 면회 시간에 방법을 알려줄게. 어때, 나쁘지 않지?"),
    ],
    actions: () => [
      action("일단 알겠다고 한다.", "first_night")
    ]
  }),

  ...defineScene("fraudster_reject", {
    title: "거절",
    location: "cell",
    description: [
      d("fraudster", "그래? 안됐네. 뭐, 다른 방법을 찾아봐야지."),
    ],
    actions: () => [
      action("다른 죄수와 이야기한다.", "cell_introduction"),
      action("침대로 가서 쉰다.", "first_night")
    ]
  }),

  ...defineScene("fraudster_suspicious", {
    title: "의심",
    location: "cell",
    description: [
      d("fraudster", "하하, 날카롭네. 그래, 내가 사기꾼인 건 맞아. 하지만 나는 **거래**에는 정직하거든."),
    ],
    actions: () => [
      action("\"...일리가 있네.\"", "fraudster_deal", [], [eff.flag("knowFraudsterPlan")]),
      action("\"그래도 됐어.\"", "first_night")
    ]
  }),

  ...defineScene("talk_political", {
    title: "정치범과의 대화",
    location: "cell",
    description: [
      n("책을 읽던 여자가 고개를 들어 당신을 바라본다."),
      d("political", "새로 왔군. 나는... 뭐, 정치범이라고 불러. 원래 기자였어."),
      d("political", "정부의 비리, 고위층의 범죄... 다 폭로했어. 그리고 대가를 치렀지."),
      d("political", "여기서 살아남으려면 **편 가르기**를 잘해야 해. 어느 쪽에 붙을지 잘 생각해."),
    ],
    actions: () => [
      action("\"가족이 어떻게 됐나요?\"", "political_family", [cond.relMin("political", 1)]),
      action("\"탈출 방법을 알고 있나요?\"", "political_advice"),
      action("\"다른 죄수들에 대해 알려주세요.\"", "political_info"),
      action("\"충고 감사합니다.\"", "first_night")
    ]
  }),

  ...defineScene("political_family", {
    title: "정치범의 가족",
    location: "cell",
    description: [
      d("political", "...내가 체포되던 날, 남편은 나를 숨기려다가 총을 맞았어. 눈앞에서."),
      d("political", "딸 민아는 지금 고모 집에 있어. 5년 동안 딸 얼굴을 못 봤어."),
      d("political", "내가 탈출하면... 민아가 위험해지니까. 하지만 네가 나가면... 부탁 하나만 해도 될까?"),
    ],
    actions: () => [
      action("\"무슨 부탁인데요?\"", "political_request"),
      action("\"약속은 못 해요.\"", "first_night")
    ]
  }),

  ...defineScene("political_request", {
    title: "정치범의 부탁",
    location: "cell",
    description: [
      d("political", "민아한테 쓴 편지야. 5년 동안 부치지 못했어."),
      d("political", "네가 나가면... 이거 좀 전해줄 수 있어? 부탁이야. 제발..."),
    ],
    effects: [eff.getItem("정치범의 편지"), eff.flag("politicalPromise")],
    actions: () => [
      action("반드시 전해주겠다고 약속한다.", "political_grateful")
    ]
  }),

  ...defineScene("political_grateful", {
    title: "약속",
    location: "cell",
    description: [
      d("political", "고마워... 정말 고마워. 네가 이 지옥에서 나갈 수 있도록 내가 아는 모든 걸 알려줄게."),
      d("political", "지하 3층에 하수도 통로가 있어. 그리고 간수장 정 대위... 수요일 밤에 **보안이 느슨해져**."),
    ],
    effects: [eff.flag("knowWednesdayGap"), eff.rel("political", 2)],
    actions: () => [
      action("진심으로 감사를 표한다.", "first_night")
    ]
  }),

  ...defineScene("political_advice", {
    title: "조언",
    location: "cell",
    description: [
      d("political", "지하 3층에 하수도로 연결되는 통로가 있다는 소문이 있어."),
      d("political", "문제는 지하 3층은 **독방 구역**이야. 거기 가려면 중징계를 받거나 해야 해."),
    ],
    effects: [eff.flag("knowSewerPath"), eff.rel("political")],
    actions: () => [
      action("\"가족이 어떻게 됐나요?\"", "political_family", [cond.relMin("political", 1)]),
      action("감사를 표하고 물러난다.", "first_night")
    ]
  }),

  ...defineScene("political_info", {
    title: "정보",
    location: "cell",
    description: [
      d("political", "**메시아** - 사이비 교주 출신. 그를 따르는 신도들이 밖에서 뭔가 준비 중이야."),
      d("political", "**사기꾼** - 영악한 사람이야. 간수들이랑 거래를 하고 있는 것 같더라."),
      d("political", "**아내 살인범** - 사실 정당방위였는데 판사가 매수당한 거래. 불쌍한 사람이지."),
    ],
    actions: () => [
      action("\"그런데... 가족은 어떻게 됐나요?\"", "political_family", [cond.relMin("political", 1)], [eff.flag("knowPrisoners"), eff.rel("political")]),
      action("정보를 머릿속에 새긴다.", "first_night", [], [eff.flag("knowPrisoners"), eff.rel("political")])
    ]
  }),

  ...defineScene("talk_groper", {
    title: "치한과의 대화",
    location: "cell",
    description: [
      d("groper", "뭐야... 뭘 봐? 나한테 뭔 볼일이야?"),
      d("groper", "내 귀 말이야? 이건 밖에서 피해자 오빠가... 칼을 들고 찾아왔거든. 히히."),
    ],
    actions: () => [
      action("어떻게 잡히게 됐는지 묻는다.", "groper_past"),
      action("수용소에 대해 아는 게 있는지 묻는다.", "groper_info"),
      action("\"역겹네. 귀 하나로 끝난 게 다행이다.\"", "groper_threat"),
      action("말없이 자리를 뜬다.", "cell_observe")
    ]
  }),

  ...defineScene("groper_threat", {
    title: "위협",
    location: "cell",
    description: [
      d("groper", "...뭐라고? 너... 날 무시해?"),
      d("groper", "좋아... 좋아. 기억해주지. 히히히..."),
    ],
    effects: [eff.flag("groperEnemy")],
    actions: () => [
      action("불안한 마음으로 자리를 뜬다.", "cell_observe")
    ]
  }),

  ...defineScene("groper_past", {
    title: "치한의 과거",
    location: "cell",
    description: [
      d("groper", "나? 나는 지하철에서 '활동'했어. 헤헤."),
      d("groper", "50번도 넘게 했을 걸? 결국 한 여자애가 소리를 질렀어."),
    ],
    actions: () => [
      action("더 이상 듣고 싶지 않다. 자리를 뜬다.", "first_night"),
      action("억지로 참고 수용소에 대해 묻는다.", "groper_info")
    ]
  }),

  ...defineScene("groper_info", {
    title: "치한의 정보",
    location: "cell",
    description: [
      d("groper", "새벽 2시에 혼자 순찰 도는 놈. 그 놈, 항상 **의무실**에서 한 시간씩 사라져."),
      d("groper", "그 한 시간 동안은... 복도가 텅 비어. 알겠어?"),
    ],
    effects: [eff.flag("knowPatrolGap")],
    actions: () => [
      action("고맙다고 하고 자리를 뜬다.", "first_night")
    ]
  }),

  ...defineScene("talk_arsonist_day", {
    title: "방화범과의 대화",
    location: "cell",
    description: [
      d("arsonist", "...뭐야. 뭘 봐."),
      d("arsonist", "불... 좋아해? 난 좋아해. 세상에서 제일 아름다운 게 불이야."),
    ],
    actions: () => [
      action("얼굴 상처에 대해 묻는다.", "arsonist_reject_talk", [], [eff.rel("arsonist")]),
      action("무슨 죄로 들어왔는지 묻는다.", "arsonist_reject_talk", [], [eff.rel("arsonist")]),
      action("위험해 보인다. 자리를 뜬다.", "cell_observe")
    ]
  }),

  ...defineScene("arsonist_reject_talk", {
    title: "거부",
    location: "cell",
    description: [
      d("arsonist", "...처음 보는 년이 참 궁금한 게 많네. 세상에 공짜는 없어."),
    ],
    actions: () => [
      action("자리를 뜬다.", "cell_observe")
    ]
  }),

  ...defineScene("arsonist_scar", {
    title: "방화범의 상처",
    location: "workshop",
    description: [
      d("arsonist", "이거? 내 첫 번째 작품에서 받은 선물이야."),
      d("arsonist", "열일곱 살 때... 우리 집을 태웠어. 아버지가 잠든 밤에."),
      d("arsonist", "불이 붙는 순간... 처음으로 **힘**을 느꼈어. 아프지 않았어."),
    ],
    actions: () => [
      action("다른 불도 질렀는지 묻는다.", "arsonist_crime"),
      action("소름이 끼쳐 자리를 뜬다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("arsonist_crime", {
    title: "방화범의 죄",
    location: "workshop",
    description: [
      d("arsonist", "공장 세 개, 아파트 한 동, 그리고... 고아원 하나."),
      d("arsonist", "...아이들이 열두 명 죽었어. 그때부터 가끔 꿈을 꿔."),
      d("arsonist", "!!닥쳐!! 시끄럽다고... 시끄럽다고!!"),
    ],
    actions: () => [
      action("진정시키려 한다.", "arsonist_calm", [], [eff.rel("arsonist")]),
      action("조용히 물러난다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("arsonist_calm", {
    title: "진정",
    location: "workshop",
    description: [
      d("arsonist", "...미안. 가끔 이래. 너는 정말 괜찮은 녀석이야."),
    ],
    actions: () => [
      action("고개를 끄덕인다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("conflict_messiah_arsonist", {
    title: "대립",
    location: "cell",
    description: [
      d("messiah", "자매여, 네 안의 불꽃은 정화를 위해 있어야 해. 내 말을 들어."),
      d("arsonist", "닥쳐. 난 네 '자매'가 아니야. 너도 태워버릴 거야."),
    ],
    actions: () => [
      action("중재하려 한다.", "conflict_mediate"),
      action("지켜본다.", "conflict_watch")
    ]
  }),

  ...defineScene("conflict_mediate", {
    title: "중재",
    location: "cell",
    description: [
      d("player", "그만해요. 둘 다. 간수들한테 들리면 어쩌려고."),
      d("messiah", "평화의 사도로군. 네 말이 맞아, 자매여."),
      d("arsonist", "...다음에 보자. 둘 다."),
    ],
    effects: [eff.flag("conflictMediator")],
    actions: () => [
      action("상황을 지켜본다.", "first_night")
    ]
  }),

  ...defineScene("conflict_watch", {
    title: "관망",
    location: "cell",
    description: [
      d("political", "저 둘은 원래 저래. 언젠가 폭발할 거야. 그때 끼어들지 마."),
    ],
    actions: () => [
      action("침대로 돌아간다.", "first_night")
    ]
  }),

  ...defineScene("first_night", {
    title: "첫째 날 밤",
    location: "cell",
    description: [
      n("소등 시간이 되자 감방이 어둠에 잠긴다. 당신은 생각한다. **어떻게 탈출할 것인가**."),
    ],
    actions: () => [
      action("귀를 귀울인다.", "night_whisper", [cond.relMin("arsonist", 1)]),
      action("잠을 청한다.", "day_two_morning")
    ]
  }),

  ...defineScene("night_whisper", {
    title: "밤의 속삭임",
    location: "cell",
    description: [
      d("arsonist", "...자? 안 자지? 나... 이 수용소를 태울 거야. 나한테 **라이터 기름**이 필요해."),
    ],
    actions: () => [
      action("\"알겠어! 도와줄게.\"", "arsonist_agree", [], [eff.flag("knowArsonistPlan")]),
      action("\"미친 짓이야. 사람들이 죽어.\"", "arsonist_refuse"),
      action("자는 척한다.", "arsonist_ignore")
    ]
  }),

  ...defineScene("arsonist_agree", {
    title: "방화 계획",
    location: "cell",
    description: [
      d("arsonist", "작업장에 가면 기계에 쓰는 기름이 있어. 그거 좀 빼돌려 줘."),
    ],
    actions: () => [
      action("불안한 마음으로 잠을 청한다.", "day_two_morning")
    ]
  }),

  ...defineScene("arsonist_refuse", {
    title: "거부",
    location: "cell",
    description: [
      d("arsonist", "만약 방해하면 넌 통구이 일순위다."),
    ],
    effects: [eff.flag("arsonistEnemy")],
    actions: () => [
      action("뒤척이다 잠이 든다.", "day_two_morning")
    ]
  }),

  ...defineScene("arsonist_ignore", {
    title: "무시",
    location: "cell",
    description: [
      d("arsonist", "...쳇. 재미없는 년."),
    ],
    actions: () => [
      action("그제야 잠이 든다.", "day_two_morning")
    ]
  }),

  ...defineScene("day_two_morning", {
    title: "둘째 날 아침",
    location: "cell",
    description: [
      d("guard", "기상! 5분 안에 점호다!"),
      d("fraudster", "작업장은 유용한 물건을 구할 수 있고, 운동장은 편하지만 눈이 많아."),
    ],
    actions: () => [
      action("작업장으로 간다.", "workshop"),
      action("운동장으로 간다.", "yard")
    ]
  }),

  ...defineScene("workshop", {
    title: "작업장",
    location: "workshop",
    description: [
      n("구석에 {{기름통}}이 쌓여 있고, 벽에는 **공구들**이 걸려 있다."),
    ],
    actions: () => [
      action("작업에 집중한다.", "gameover_groper_trap", [cond.flag("groperEnemy")]),
      action("기름을 몰래 빼돌린다.", "workshop_steal_oil", [cond.flag("knowArsonistPlan"), cond.notFlag("groperEnemy")], [eff.getItem("라이터 기름")]),
      action("작은 공구를 숨긴다.", "workshop_steal_tool", [cond.notFlag("groperEnemy")], [eff.getItem("작은 드라이버")]),
      action("묵묵히 작업만 한다.", "workshop_normal", [cond.notFlag("groperEnemy")])
    ]
  }),

  ...defineScene("workshop_steal_oil", {
    title: "기름 확보",
    location: "workshop",
    description: [
      n("라이터 기름을 획득했다. 멀리서 방화범이 당신을 보며 고개를 끄덕인다."),
    ],
    actions: () => [
      action("아무 일 없던 듯 작업을 계속한다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("workshop_steal_tool", {
    title: "공구 확보",
    location: "workshop",
    description: [
      n("소매 안에 작은 드라이버를 숨겼다."),
    ],
    actions: () => [
      action("작업을 계속한다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("workshop_normal", {
    title: "평범한 작업",
    location: "workshop",
    description: [
      d("wifekiller", "...현명한 선택이야. 여기선 조심해야 해."),
    ],
    actions: () => [
      action("그에게 말을 건다.", "talk_wifekiller"),
      action("고개만 끄덕이고 작업을 계속한다.", "cafeteria_arrival")
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

  ...defineScene("yard", {
    title: "운동장",
    location: "yard",
    description: [
      d("guard", "야, 변태 새끼. 뭘 빤히 쳐다봐? 눈깔 빼버릴까?"),
    ],
    actions: () => [
      action("\"당신이나 거울 좀 보시지.\"", "gameover_guard_murder"),
      action("고개를 숙이고 사과한다.", "yard_bow_guard"),
      action("조용히 메시아 쪽으로 피한다.", "yard_messiah"),
      action("소아성폭력범에게 다가간다.", "yard_pedophile"),
      action("혼자 운동장을 걷는다.", "yard_walk")
    ]
  }),

  ...defineScene("yard_bow_guard", {
    title: "굴복",
    location: "yard",
    description: [
      d("player", "죄송합니다..."),
      d("guard", "흥. 그래도 예의는 아는군."),
    ],
    actions: () => [
      action("운동장에서 시간을 보낸다.", "yard_walk")
    ]
  }),

  ...defineScene("yard_messiah", {
    title: "메시아의 설교",
    location: "yard",
    description: [
      d("messiah", "어서 와라, 자매여. 믿는 자들만이 새로운 세상을 맞이하리라."),
    ],
    actions: () => [
      action("계획에 대해 물어본다.", "messiah_plan_detail", [cond.flag("knowMessiahPlan")]),
      action("조용히 듣고만 있는다.", "cafeteria_arrival"),
      action("슬쩍 자리를 뜬다.", "yard")
    ]
  }),

  ...defineScene("messiah_plan_detail", {
    title: "계획의 상세",
    location: "yard",
    description: [
      d("messiah", "**내일 밤**, 환기구를 통해 탈출한다. 간수장의 특수 열쇠가 필요해."),
    ],
    actions: () => [
      action("열쇠를 구해보겠다고 한다.", "messiah_mission_accept", [], [eff.flag("messiahKeyMission")]),
      action("생각할 시간이 필요하다고 한다.", "cafeteria_arrival")
    ]
  }),

  ...defineScene("messiah_mission_accept", {
    title: "임무 수락",
    location: "yard",
    description: [
      d("messiah", "간수장은 저녁에 **의무실**에 들러. 그때가 기회야."),
    ],
    actions: () => [
      action("고개를 끄덕이고 물러난다.", "cafeteria_arrival")
    ]
  }),

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

  ...defineScene("yard_walk", {
    title: "산책",
    location: "yard",
    description: [
      n("담벼락 아래 콘크리트 벽에 **금이 가 있다**."),
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
      n("시간을 들여 파면 담벼락을 뚫을 수 있을지도 모른다."),
    ],
    actions: () => [
      action("자리를 뜬다.", "cafeteria_arrival")
    ]
  }),

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

  ...defineScene("cafeteria_messiah", {
    title: "메시아의 테이블",
    location: "cafeteria",
    description: [
      d("messiah", "앉아라, 길 잃은 영혼이여. 이곳의 삶이 어떻든?"),
    ],
    actions: () => [
      action("\"지옥 같아요.\"", "cafeteria_messiah_hell", [], [eff.rel("messiah")]),
      action("\"버틸 만합니다.\"", "cafeteria_messiah_tough"),
      action("\"당신은 왜 여기 있는 거죠?\"", "cafeteria_messiah_question")
    ]
  }),

  ...defineScene("cafeteria_messiah_hell", {
    title: "지옥",
    location: "cafeteria",
    description: [
      d("messiah", "지옥에도 구원은 있다. 마음의 평화를 원한다면 기도 모임에 오게."),
    ],
    effects: [eff.flag("messiahInvite")],
    actions: () => [
      action("\"관심 있어요.\"", "cafeteria_messiah_join", [], [eff.rel("messiah")]),
      action("\"생각해 볼게요.\"", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_messiah_tough", {
    title: "강함",
    location: "cafeteria",
    description: [
      d("messiah", "혼자서는 이곳을 버틸 수 없어. 언젠가 네게도 **의지할 곳**이 필요할 거야."),
    ],
    actions: () => [
      action("자리에서 일어난다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_messiah_question", {
    title: "질문",
    location: "cafeteria",
    description: [
      d("messiah", "나는 **진실**을 말했기 때문에 여기 있다. 진실을 말하는 자는 박해받는 법이지."),
    ],
    effects: [eff.flag("knowMessiahStory")],
    actions: () => [
      action("고개를 끄덕이고 식사를 계속한다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_messiah_join", {
    title: "환영",
    location: "cafeteria",
    description: [
      d("messiah", "오늘 밤 소등 후에 동쪽 복도 끝으로 와."),
    ],
    effects: [eff.rel("messiah", 2)],
    actions: () => [
      action("고개를 끄덕인다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_fraudster", {
    title: "사기꾼의 테이블",
    location: "cafeteria",
    description: [
      d("fraudster", "여긴 정보가 곧 생존이야. 물론 공짜는 없어."),
    ],
    actions: () => [
      action("\"무슨 정보를 갖고 있어?\"", "cafeteria_fraudster_info"),
      action("\"대가가 뭔데?\"", "cafeteria_fraudster_price"),
      action("\"그냥 조용히 먹고 싶어서 왔어.\"", "cafeteria_fraudster_quiet", [], [eff.rel("fraudster")])
    ]
  }),

  ...defineScene("cafeteria_fraudster_info", {
    title: "정보",
    location: "cafeteria",
    description: [
      d("fraudster", "**탈출 루트**? 다 알고 있어."),
    ],
    actions: () => [
      action("\"탈출 루트를 알려줘.\"", "cafeteria_fraudster_escape"),
      action("\"간수들 순찰 시간이나 알려줘.\"", "cafeteria_fraudster_guards", [], [eff.flag("knowGuardSchedule")])
    ]
  }),

  ...defineScene("cafeteria_fraudster_escape", {
    title: "탈출 루트",
    location: "cafeteria",
    description: [
      d("fraudster", "루트는 세 개야. **지하 하수도**, **옥상**, 그리고 **정문 돌파**."),
    ],
    effects: [eff.flag("knowEscapeRoutes")],
    actions: () => [
      action("고개를 끄덕인다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_fraudster_guards", {
    title: "순찰 정보",
    location: "cafeteria",
    description: [
      d("fraudster", "새벽 2시부터 3시 사이가 가장 느슨해. 그리고 수요일 밤은 간수장이 외출해."),
    ],
    effects: [eff.rel("fraudster")],
    actions: () => [
      action("\"고마워.\"", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_fraudster_price", {
    title: "대가",
    location: "cafeteria",
    description: [
      d("fraudster", "대가? 담배 한 보루 가져와. 없으면 부탁을 들어주거나."),
    ],
    actions: () => [
      action("\"생각해 볼게.\"", "cafeteria_end", [], [eff.flag("fraudsterDeal")]),
      action("\"됐어.\"", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_fraudster_quiet", {
    title: "조용한 식사",
    location: "cafeteria",
    description: [
      d("fraudster", "하, 그래? 의외네. 조용히 먹고 싶다는 거 이해해."),
    ],
    actions: () => [
      action("식사를 마친다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_arsonist", {
    title: "방화범의 테이블",
    location: "cafeteria",
    description: [
      d("arsonist", "...왜 여기 앉아?"),
    ],
    actions: () => [
      action("\"다른 자리가 불편해서.\"", "cafeteria_arsonist_honest", [], [eff.rel("arsonist")]),
      action("\"당신이 궁금해서.\"", "cafeteria_arsonist_curious"),
      action("아무 말 없이 식사를 시작한다.", "cafeteria_arsonist_silent", [], [eff.rel("arsonist")])
    ]
  }),

  ...defineScene("cafeteria_arsonist_honest", {
    title: "솔직함",
    location: "cafeteria",
    description: [
      d("arsonist", "...솔직하네. 마음에 들어. 불은... 모든 걸 정화해."),
    ],
    actions: () => [
      action("\"무슨 뜻인지 알 것 같아.\"", "cafeteria_arsonist_bond", [], [eff.rel("arsonist")]),
      action("\"여기서 오래 있었어?\"", "cafeteria_arsonist_time")
    ]
  }),

  ...defineScene("cafeteria_arsonist_curious", {
    title: "호기심",
    location: "cafeteria",
    description: [
      d("arsonist", "궁금해? 이 흉터가? 괴물 구경 왔나 보군."),
    ],
    actions: () => [
      action("\"미안해, 그런 뜻이 아니었어.\"", "cafeteria_arsonist_apologize"),
      action("자리를 뜬다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_arsonist_silent", {
    title: "침묵의 식사",
    location: "cafeteria",
    description: [
      d("arsonist", "...시끄럽지 않아서 좋군."),
    ],
    actions: () => [
      action("고개를 끄덕이고 자리를 뜬다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_arsonist_bond", {
    title: "교감",
    location: "cafeteria",
    description: [
      d("arsonist", "탈출할 생각이 있다면... 불이 필요할 때가 있을 거야. 그때 날 찾아와."),
    ],
    effects: [eff.flag("knowArsonistPlan"), eff.rel("arsonist")],
    actions: () => [
      action("고개를 끄덕인다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_arsonist_time", {
    title: "시간",
    location: "cafeteria",
    description: [
      d("arsonist", "5년. 하지만 시간은 의미없어. 불만 있으면 어디든 괜찮아."),
    ],
    actions: () => [
      action("식사를 마친다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_arsonist_apologize", {
    title: "사과",
    location: "cafeteria",
    description: [
      d("arsonist", "...됐어. 익숙해."),
    ],
    actions: () => [
      action("조용히 식사를 마친다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_political", {
    title: "정치범의 테이블",
    location: "cafeteria",
    description: [
      d("political", "앉아도 돼. 방해가 되진 않을 테니."),
    ],
    actions: () => [
      action("\"무슨 책이야?\"", "cafeteria_political_book"),
      action("\"정치범이라던데, 무슨 일로?\"", "cafeteria_political_crime", [], [eff.rel("political")]),
      action("조용히 앉아서 식사한다.", "cafeteria_political_quiet")
    ]
  }),

  ...defineScene("cafeteria_political_book", {
    title: "책",
    location: "cafeteria",
    description: [
      d("political", "**'인간의 자유에 대하여'**. 정신의 자유만큼은 빼앗을 수 없어."),
    ],
    effects: [eff.rel("political")],
    actions: () => [
      action("\"맞는 말이야.\"", "cafeteria_political_agree", [], [eff.rel("political")]),
      action("\"그래도 몸이 갇혀 있잖아.\"", "cafeteria_political_body")
    ]
  }),

  ...defineScene("cafeteria_political_crime", {
    title: "죄목",
    location: "cafeteria",
    description: [
      d("political", "기자였어. 진실을 썼더니 반역죄로 몰렸지. 후회는 없어."),
    ],
    effects: [eff.flag("knowPoliticalStory")],
    actions: () => [
      action("\"존경스러워.\"", "cafeteria_political_respect", [], [eff.rel("political", 2)]),
      action("\"여기서 나갈 방법은 없어?\"", "cafeteria_political_escape")
    ]
  }),

  ...defineScene("cafeteria_political_quiet", {
    title: "조용한 동석",
    location: "cafeteria",
    description: [
      n("고요하지만 불편하지 않은 시간이 흐른다."),
    ],
    actions: () => [
      action("식사를 마치고 자리를 뜬다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_political_agree", {
    title: "동의",
    location: "cafeteria",
    description: [
      d("political", "내가 아는 걸 알려줄게. **간수장의 비밀**에 대해서."),
    ],
    effects: [eff.rel("political", 2)],
    actions: () => [
      action("고개를 끄덕인다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_political_body", {
    title: "육체",
    location: "cafeteria",
    description: [
      d("political", "밖에 있어도 권력에 갇혀 사는 사람들... 그들이 나보다 자유로울까?"),
    ],
    actions: () => [
      action("식사를 마친다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_political_respect", {
    title: "존경",
    location: "cafeteria",
    description: [
      d("political", "도와줄 수 있어. **수요일 밤**에 기회가 있어."),
    ],
    effects: [eff.rel("political", 2)],
    actions: () => [
      action("감사를 표하고 자리를 뜬다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_political_escape", {
    title: "탈출",
    location: "cafeteria",
    description: [
      d("political", "**수요일 밤**, 간수장이 외출하는 시간이 유일한 틈이야."),
    ],
    effects: [eff.rel("political", 2), eff.flag("knowWednesday")],
    actions: () => [
      action("감사를 표한다.", "cafeteria_end")
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

  ...defineScene("cafeteria_guard_friendly", {
    title: "간수와의 접촉",
    location: "cafeteria",
    description: [
      d("guard", "저기 남은 거 있어. 한 그릇 더 받아. 내가 봐줄게."),
    ],
    effects: [eff.flag("extraMeal"), eff.rel("guard", 1)],
    actions: () => [
      action("감사히 추가 식사를 받는다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_observe_guards", {
    title: "간수 관찰",
    location: "cafeteria",
    description: [
      n("순찰하는 간수는 약 **5분마다** 식당을 한 바퀴 돈다."),
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
      n("식당 배급 시간에는 **주방 뒷문**이 열린다. 하역장이 보인다."),
    ],
    effects: [eff.flag("knowKitchenExit")],
    actions: () => [
      action("정보를 머릿속에 새긴다.", "cafeteria_end")
    ]
  }),

  ...defineScene("cafeteria_groper_event", {
    title: "소란",
    location: "cafeteria",
    description: [
      d("groper", "야, 거기 신입. 우리 친해지자고. 히히..."),
    ],
    effects: [eff.flag("knowGroperDanger")],
    actions: () => [
      action("식사를 마치고 자리를 뜬다.", "cafeteria_end")
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
  }),

  ...defineScene("day_two_evening", {
    title: "둘째 날 저녁",
    location: "cell",
    description: [
      n("당신은 오늘 모은 정보들을 정리한다. 탈출의 기회는 있어 보인다."),
    ],
    actions: () => [
      action("일찍 잠자리에 든다.", "day_three_morning"),
      action("밤에 감방을 살펴본다.", "day_two_night_explore")
    ]
  }),

  ...defineScene("day_two_night_explore", {
    title: "밤의 탐색",
    location: "cell",
    description: [
      n("순찰은 대략 **15분**마다 지나가는 것 같다."),
    ],
    actions: () => [
      action("아직 깨어있는 정치범에게 말을 건다.", "political_night_talk", [cond.relMin("political", 3)]),
      action("순찰하는 간수에게 조심스럽게 말을 건다.", "guard_night_friendly", [cond.relMin("guard", 1)]),
      action("순찰하는 간수에게 말을 건다.", "guard_night_hostile", [cond.relMax("guard", 0)]),
      action("정보를 머릿속에 새기고 잠을 청한다.", "day_three_morning")
    ]
  }),

  ...defineScene("political_night_talk", {
    title: "정치범과의 밤 대화",
    location: "cell",
    description: [
      d("political", "내일이 바로 수요일이야. 간수장이 의무실에 가는 시간... 그때가 유일한 틈이야."),
    ],
    effects: [eff.flag("wednesdayConfirmed")],
    actions: () => [
      action("감사를 표하고 잠자리에 든다.", "day_three_morning")
    ]
  }),

  ...defineScene("guard_night_friendly", {
    title: "간수와의 대화",
    location: "cell",
    description: [
      d("guard", "...이거. 밤에 배고프면 먹어. 튀려고 하지 말고."),
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
      d("guard", "간수장, **수요일 밤**마다 의무실에 가는데 그날은 신경질적이야. {{창고}} 근처에는 얼씬도 마."),
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
      d("guard", "뭘 쳐다봐, 이 변태 새끼야. 내일 작업장에서 눈여겨보고 있을 테니."),
    ],
    effects: [eff.rel("guard", 1)],
    actions: () => [
      action("불안한 마음으로 잠자리에 든다.", "day_three_morning")
    ]
  }),

  ...defineScene("day_three_morning", {
    title: "셋째 날 아침",
    location: "cell",
    description: [
      d("guard", "기상! 오늘은 전원 작업장이다!"),
      n("오늘은 **수요일**이다."),
    ],
    actions: () => [
      action("작업장으로 향한다.", "pedophile_attack", [cond.flag("helpedPedophile")]),
      action("작업장으로 향한다.", "day_three_workshop", [cond.notFlag("helpedPedophile")])
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
  }),

  ...defineScene("day_three_workshop", {
    title: "작업장 - 셋째 날",
    location: "workshop",
    description: [
      n("오늘따라 긴장감이 감돈다."),
    ],
    actions: () => [
      action("친해진 간수에게 접근한다.", "guard_favor_workshop", [cond.relMin("guard", 2)]),
      action("메시아와 방화범 양쪽에 접근한다.", "day_three_mediator", [cond.flag("conflictMediator")]),
      action("간수장의 열쇠를 노린다.", "day_three_key_heist", [cond.flag("messiahKeyMission")]),
      action("방화범에게 마지막 확인을 한다.", "day_three_arsonist_prep", [cond.flag("knowArsonistPlan")]),
      action("사기꾼의 계획 상황을 확인한다.", "day_three_fraudster_check", [cond.flag("knowFraudsterPlan")]),
      action("일하면서 주변을 관찰한다.", "day_three_observe")
    ]
  }),

  ...defineScene("guard_favor_workshop", {
    title: "간수의 배려",
    location: "workshop",
    description: [
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
      n("창고 구석에서 {{녹슨 철사}}를 발견했다."),
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
      n("선반 뒤편에서 낡은 {{수용소 배치도}}를 발견했다."),
    ],
    effects: [eff.getItem("수용소 배치도"), eff.flag("knowFloorPlan")],
    actions: () => [
      action("배치도를 숨기고 작업을 마친다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("day_three_mediator", {
    title: "중재자의 이점",
    location: "workshop",
    description: [
      n("두 가지 탈출 계획에 모두 접근할 수 있게 되었다."),
    ],
    effects: [eff.flag("knowMessiahPlan"), eff.flag("knowArsonistPlan")],
    actions: () => [
      action("메시아의 계획에 대해 더 듣는다.", "mediator_messiah_detail"),
      action("방화범의 계획에 대해 더 듣는다.", "mediator_arsonist_detail"),
      action("둘 다 열어두고 관찰한다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("mediator_messiah_detail", {
    title: "메시아의 계획",
    location: "workshop",
    description: [
      d("messiah", "정전 속에서 환기구로 탈출한다. 간수장의 카드키가 필요해."),
    ],
    effects: [eff.flag("messiahKeyMission")],
    actions: () => [
      action("열쇠를 구해보겠다고 한다.", "day_three_key_heist"),
      action("다른 방법도 살펴본다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("mediator_arsonist_detail", {
    title: "방화범의 계획",
    location: "workshop",
    description: [
      d("arsonist", "불이 나면 혼란을 틈타 도망친다. 기름이 필요해."),
    ],
    effects: [eff.rel("arsonist")],
    actions: () => [
      action("기름을 구하러 간다.", "workshop_steal_oil_mediator"),
      action("피해를 줄이도록 설득한다.", "arsonist_reconsider"),
      action("다른 방법도 살펴본다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("workshop_steal_oil_mediator", {
    title: "기름 확보",
    location: "workshop",
    description: [
      n("라이터 기름을 얻었다."),
    ],
    effects: [eff.getItem("라이터 기름")],
    actions: () => [
      action("기름을 숨기고 자리로 돌아간다.", "day_three_arsonist_prep")
    ]
  }),

  ...defineScene("day_three_key_heist", {
    title: "열쇠 작전",
    location: "workshop",
    description: [
      n("간수장의 카드키를 손에 넣어야 한다."),
    ],
    actions: () => [
      action("열쇠 구조 지식을 활용해 기회를 노린다.", "key_heist_success", [cond.flag("knowKeyStructure")]),
      action("직접 훔치려 한다.", "key_heist_risky"),
      action("소아성폭력범에게 주의를 끌어달라고 부탁한다.", "key_heist_distraction", [cond.flag("helpedPedophile")])
    ]
  }),

  ...defineScene("key_heist_success", {
    title: "완벽한 작전",
    location: "workshop",
    description: [
      n("능숙하게 카드키를 빼돌렸다. **환기구 카드키**를 획득했다."),
    ],
    effects: [eff.getItem("환기구 카드키")],
    actions: () => [
      action("태연하게 작업을 계속한다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("key_heist_risky", {
    title: "위험한 시도",
    location: "workshop",
    description: [
      d("warden", "뭐야, 이 새끼가?!"),
    ],
    actions: () => [
      action("\"다리가 아파서 넘어질 뻔했습니다...\"", "key_heist_excuse_success", [cond.flag("hurtLeg")]),
      action("변명을 시도한다.", "key_heist_caught")
    ]
  }),

  ...defineScene("key_heist_excuse_success", {
    title: "위기 모면",
    location: "workshop",
    description: [
      d("warden", "쳇, 병신 같은 년. 꺼져."),
    ],
    actions: () => [
      action("조용히 물러난다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("key_heist_caught", {
    title: "발각",
    location: "workshop",
    description: [
      d("warden", "이 새끼 탈옥 시도야. 독방행이다!"),
    ],
    actions: () => [
      action("독방으로 끌려간다.", "solitary_cell")
    ]
  }),

  ...defineScene("key_heist_distraction", {
    title: "주의 분산",
    location: "workshop",
    description: [
      n("소아성폭력범이 기계에 손을 넣어 비명을 지르는 동안 카드키를 집어 들었다."),
    ],
    effects: [eff.getItem("환기구 카드키")],
    actions: () => [
      action("자리로 돌아간다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("day_three_arsonist_prep", {
    title: "방화범의 준비",
    location: "workshop",
    description: [
      d("arsonist", "오늘 밤이야. 기름은 가져왔어?"),
    ],
    actions: () => [
      action("기름을 건네준다.", "arsonist_ready", [cond.has("라이터 기름")]),
      action("\"아직 구하지 못했어...\"", "arsonist_disappointed"),
      action("\"사람들이 다칠 수 있어. 다시 생각해봐.\"", "arsonist_reconsider", [cond.relMin("arsonist", 1)])
    ]
  }),

  ...defineScene("arsonist_ready", {
    title: "준비 완료",
    location: "workshop",
    description: [
      d("arsonist", "밤 자정쯤 시작할 거야. 불이 나면 동쪽 담벼락으로 와."),
    ],
    effects: [eff.flag("arsonistReady"), eff.rel("arsonist", 2)],
    actions: () => [
      action("\"그 상처... 어떻게 생긴 거야?\"", "arsonist_scar"),
      action("\"왜 여기 들어온 거야?\"", "arsonist_crime"),
      action("\"아무것도. 오늘 밤에 보자.\"", "day_three_afternoon")
    ]
  }),

  ...defineScene("arsonist_disappointed", {
    title: "실망",
    location: "workshop",
    description: [
      d("arsonist", "됐어, 내가 알아서 할게. 대신 네 몫은 없어."),
    ],
    effects: [eff.flag("arsonistAbandoned")],
    actions: () => [
      action("찜찜하지만 자리로 돌아간다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("arsonist_reconsider", {
    title: "재고",
    location: "workshop",
    description: [
      d("arsonist", "알았어. 불을 줄일게. 동쪽 창고만 태울 거야."),
    ],
    effects: [eff.flag("arsonistMinimized")],
    actions: () => [
      action("고맙다고 말하고 자리로 돌아간다.", "day_three_afternoon")
    ]
  }),

  ...defineScene("day_three_fraudster_check", {
    title: "사기꾼의 진행 상황",
    location: "workshop",
    description: [
      d("fraudster", "박 간수가 넘어왔어. 오늘 밤 11시에 뒷문을 열어주기로 했어."),
    ],
    actions: () => [
      action("\"대가가 뭔데?\"", "fraudster_catch_revealed", [cond.flag("knowPrisoners")]),
      action("\"좋아, 믿을게.\"", "day_three_afternoon", [], [eff.rel("fraudster", 2)])
    ]
  }),

  ...defineScene("fraudster_catch_revealed", {
    title: "숨겨진 조건",
    location: "workshop",
    description: [
      d("fraudster", "우리 조직에서 네 능력이 필요하대. 문서 위조랑 피싱 일 좀 해야겠어."),
    ],
    actions: () => [
      action("\"알았어. 일단 나가는 게 먼저야.\"", "day_three_afternoon", [], [eff.rel("fraudster", 2)]),
      action("\"사기는 더 이상 안 해.\"", "day_three_afternoon", [], [eff.flag("fraudsterRefused")])
    ]
  }),

  ...defineScene("day_three_observe", {
    title: "관찰",
    location: "workshop",
    description: [
      n("오늘 밤이 중요할 것 같다."),
    ],
    actions: () => [
      action("아내 살인범에게 다가간다.", "wifekiller_final_help", [cond.relMin("wifekiller", 3)]),
      action("계속 관찰하며 일한다.", "day_three_afternoon")
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

  ...defineScene("day_three_afternoon", {
    title: "셋째 날 오후",
    location: "yard",
    description: [
      n("오후 운동 시간이다. 하늘에 먹구름이 끼어 있다."),
    ],
    actions: () => [
      action("메시아에게 열쇠를 전달한다.", "messiah_key_delivery", [cond.has("환기구 카드키")]),
      action("간수장의 약점을 이용해 협박한다.", "warden_blackmail", [cond.flag("knowWardenWeakness")]),
      action("담벼락의 균열을 다시 확인한다.", "wall_crack_plan", [cond.flag("knowWallCrack")]),
      action("오늘 밤을 위해 휴식을 취한다.", "day_three_evening")
    ]
  }),

  ...defineScene("messiah_key_delivery", {
    title: "열쇠 전달",
    location: "yard",
    description: [
      d("messiah", "오늘 밤 2시, 환기구 앞에서 만나자."),
    ],
    effects: [eff.flag("messiahKeyDelivered"), eff.rel("messiah", 3)],
    actions: () => [
      action("고개를 끄덕이고 물러난다.", "day_three_evening")
    ]
  }),

  ...defineScene("warden_blackmail", {
    title: "협박",
    location: "yard",
    description: [
      d("warden", "...좋아. 새벽 3시에 지하 비상구."),
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
      n("비가 오면 콘크리트가 약해질 것이다. 오늘 밤 비가 올 것 같다."),
    ],
    actions: () => [
      action("밤에 균열을 파볼 계획을 세운다.", "day_three_evening", [], [eff.flag("wallEscapePlan")]),
      action("다른 방법을 생각한다.", "day_three_evening")
    ]
  }),

  ...defineScene("day_three_evening", {
    title: "셋째 날 저녁",
    location: "cell",
    description: [
      n("오늘 밤이 결정의 밤이다."),
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
      n("지금이 탈출의 순간이다. 어떤 길을 선택하시겠는가?"),
    ],
    actions: () => [
      action("메시아의 계획을 따른다. (열쇠 전달 완료)", "ending_messiah_enhanced", [cond.flag("messiahKeyDelivered")]),
      action("메시아의 계획을 따른다. (환기구 탈출)", "ending_messiah_route", [cond.flag("knowMessiahPlan"), cond.notFlag("messiahKeyDelivered")]),
      action("사기꾼과 함께 간수를 매수한다.", "ending_fraudster_route", [cond.relMin("fraudster", 2), cond.notFlag("fraudsterRefused")]),
      action("방화범의 계획에 참여한다. (피해 최소화)", "ending_arsonist_safe", [cond.flag("arsonistMinimized")]),
      action("방화범의 계획에 참여한다. (화재 혼란)", "ending_arsonist_route", [cond.flag("arsonistReady"), cond.notFlag("arsonistMinimized")]),
      action("간수장이 열어준 비상구로 탈출한다.", "ending_warden_route", [cond.flag("wardenBlackmailed")]),
      action("폭풍우를 틈타 담벼락 균열을 파고 나간다.", "ending_wall_route", [cond.flag("wallEscapePlan")]),
      action("아내 살인범이 알려준 비상구로 탈출한다.", "ending_emergency_route", [cond.flag("knowEmergencyExit")]),
      action("혼자서 탈출을 시도한다. (준비됨)", "solo_escape_prepared", [cond.flag("knowSewerPath"), cond.flag("knowPatrolGap")]),
      action("혼자서 탈출을 시도한다. (일부 정보)", "solo_escape_partial", [cond.relMin("wifekiller", 3)]),
      action("혼자서 탈출을 시도한다.", "solo_escape_unprepared"),
      action("탈출을 포기하고 형기를 채우기로 한다.", "ending_surrender")
    ]
  }),

  ...defineScene("ending_messiah_enhanced", {
    title: "완벽한 구원",
    description: [
      d("messiah", "형제여, 네 믿음이 우리 모두를 구원했다!"),
      n("**[엔딩 A+: 선택받은 자]**"),
    ],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("ending_arsonist_safe", {
    title: "통제된 불꽃",
    description: [
      d("arsonist", "...네 말이 맞네. 이 정도로도 충분해."),
      n("**[엔딩 C+: 구원받은 불꽃]**"),
    ],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("ending_warden_route", {
    title: "약점의 대가",
    description: [
      d("warden", "...꺼져. 다시는 내 앞에 나타나지 마."),
      n("**[엔딩 J: 어둠의 거래]**"),
    ],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("ending_wall_route", {
    title: "폭풍의 밤",
    description: [
      n("폭풍우의 밤, 오직 의지로 담벼락을 뚫고 탈출했다."),
      n("**[엔딩 K: 폭풍을 뚫고]**"),
    ],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("ending_emergency_route", {
    title: "친구의 선물",
    description: [
      n("친구의 도움으로 탈출했다. 이제 그 약속을 지켜야 한다."),
      n("**[엔딩 L: 약속의 무게]**"),
    ],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("ending_messiah_route", {
    title: "구원의 밤",
    description: [
      n("**[엔딩 A: 구원의 밤]**"),
    ],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("ending_fraudster_route", {
    title: "거래의 대가",
    description: [
      n("**[엔딩 B: 새로운 족쇄]**"),
    ],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("ending_arsonist_route", {
    title: "불의 정화",
    description: [
      n("**[엔딩 C: 잿더미 위의 자유]**"),
    ],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

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

  ...defineScene("ending_solo_success", {
    title: "고독한 자유",
    description: [n("**[엔딩 F: 고독한 자유]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
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

  ...defineScene("ending_solo_lucky", {
    title: "운 좋은 탈출",
    description: [n("**[엔딩 G: 행운의 탈출]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
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

  ...defineScene("ending_solo_daring", {
    title: "전설의 탈출",
    description: [n("**[엔딩 H: 전설의 탈출]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
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
  }),

  ...defineScene("ending_solo_redemption", {
    title: "구원",
    description: [n("**[엔딩 I: 불굴의 의지]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("ending_solo_despair", {
    title: "절망",
    location: "solitary",
    description: [n("**[엔딩 D: 어둠 속으로]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("ending_surrender", {
    title: "체념",
    location: "cell",
    description: [n("**[엔딩 E: 잃어버린 시간]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("gameover_wifekiller_rage", {
    title: "치명적 실수",
    location: "cell",
    description: [n("**[GAME OVER: 말을 함부로 하면 안 됩니다]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("gameover_burned_alive", {
    title: "화염 속에서",
    location: "cell",
    description: [n("**[GAME OVER: 불타는 감방]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("gameover_messiah_followers", {
    title: "이단자의 최후",
    location: "cell",
    description: [n("**[GAME OVER: 이단자 처형]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("gameover_guard_murder", {
    title: "본보기",
    location: "yard",
    description: [n("**[GAME OVER: 반항의 대가]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("gameover_groper_trap", {
    title: "덫",
    location: "workshop",
    description: [n("**[GAME OVER: 산업재해]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  }),

  ...defineScene("gameover_solitary_madness", {
    title: "독방의 끝",
    location: "solitary",
    description: [n("**[GAME OVER: 정신붕괴]**")],
    isEnding: true,
    actions: () => [action("다시 시작하기", "entrance", [], [eff.reset()])]
  })
};

const gameData = {
  title: "수용소 탈출기",
  startScene: "entrance",
  startInventory: [],
  startFlags: {},
  scenes: scenes
};

module.exports = gameData;