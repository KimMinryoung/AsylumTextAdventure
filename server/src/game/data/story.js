const gameData = {
  title: "수용소 탈출기",
  startScene: "entrance",
  startInventory: [],
  startFlags: {},

  scenes: {
    // ===== 1장: 입소 =====
    entrance: {
      title: "수용소 입소",
      location: "corridor",
      description: [
        { type: "narration", text: "무겁고 녹슨 **철문**이 비명 같은 쇳소리를 내며 열린다." },
        { type: "narration", text: "사방은 습기 찬 콘크리트 냄새와 정체 모를 **소독약** 냄새로 가득하다." },
        { type: "narration", text: "당신의 눈앞에는 검은 제복을 입고 {{가죽 채찍}}을 만지작거리는 간수가 서 있다. 그는 비릿한 웃음을 지으며 당신의 턱을 거칠게 들어 올린다." },
        { type: "dialogue", speaker: "guard", text: "어이, '예술가' 선생. 드디어 우리 공화국의 제일 깊은 곳까지 오셨군. 네가 10년 전 그 구역질 나는 소아성애적인 게임들을 세상에 뿌려댈 때만 해도, 이런 곳에서 노년을 보내게 될 줄은 꿈에도 몰랐겠지?" },
        { type: "narration", text: "간수가 당신의 뺨을 가볍게 툭툭 치며 말을 잇는다." },
        { type: "dialogue", speaker: "guard", text: "네 그 잘난 '창작욕' 덕분에 공화국의 고결한 성 문화가 아주 제대로 타락했어. 어린아이들을 네 추잡한 망상의 제물로 삼은 대가가 고작 이 수용소라니, 국가가 너무 자비로운 거 아닌가 싶어. 안 그래?" },
        { type: "dialogue", speaker: "guard", text: "걱정 마라. 여기선 네가 만들었던 그 역겨운 게임 속 캐릭터들보다 훨씬 더 비참한 꼴을 보게 될 테니까. 자, 입소 축하 선물이다." }
      ],
      actions: [
        {
          id: "entrance_1",
          text: "고개를 숙이고 잘못했다고 빈다.",
          nextScene: "entrance_beg"
        },
        {
          id: "entrance_2",
          text: "아무 말 없이 간수의 눈을 노려본다.",
          nextScene: "entrance_stare",
          effects: [{ type: "setFlag", flag: "hurtLeg" }]
        },
        {
          id: "entrance_3",
          text: "간수의 허리춤에 달린 열쇠 꾸러미를 몰래 훔쳐본다.",
          nextScene: "entrance_key",
          effects: [{ type: "setFlag", flag: "knowKeyStructure" }]
        }
      ]
    },

    entrance_beg: {
      title: "굴욕",
      location: "corridor",
      description: [
        { type: "narration", text: "당신은 고개를 깊이 숙이며 용서를 구한다." },
        { type: "dialogue", speaker: "guard", text: "크하하! 이것 봐라. 밖에서 그렇게 잘난 척하더니 여기선 벌써 꼬리를 내리는군." },
        { type: "narration", text: "간수가 당신의 등을 발로 밟아 바닥에 엎드리게 한다. 굴욕적이지만, 그는 당신의 비굴한 태도에 흥미를 잃은 듯 코웃음을 치며 물러난다." },
        { type: "dialogue", speaker: "guard", text: "재미없는 년. 7번 감방으로 꺼져. 거기서 네 새 '가족'들을 만나봐라." },
        { type: "narration", text: "잔뜩 긴장했지만 다행히 신체적 피해는 피했다." }
      ],
      actions: [
        {
          id: "go_to_cell",
          text: "7번 감방으로 향한다.",
          nextScene: "cell_arrival"
        }
      ]
    },

    entrance_stare: {
      title: "반항",
      location: "corridor",
      description: [
        { type: "narration", text: "당신은 아무 말 없이 간수의 눈을 똑바로 쏘아본다." },
        { type: "dialogue", speaker: "guard", text: "...이 새끼가 눈깔이 살아있네?" },
        { type: "narration", text: "간수의 표정이 차갑게 굳어진다. 그의 손에 들린 몽둥이가 번개처럼 날아와 당신의 무릎을 강타한다." },
        { type: "narration", text: "!!극심한 통증!!이 다리를 타고 퍼진다. 당신은 비명을 삼키며 바닥에 쓰러진다." },
        { type: "dialogue", speaker: "guard", text: "그 눈빛 잘 간직해둬. 일주일 안에 꺼질 테니까. 7번 감방으로 기어가." },
        { type: "narration", text: "다리가 저려 일부 행동에 제약이 생길 것 같다...." }
      ],
      actions: [
        {
          id: "go_to_cell",
          text: "절뚝거리며 7번 감방으로 향한다.",
          nextScene: "cell_arrival"
        }
      ]
    },

    entrance_key: {
      title: "관찰",
      location: "corridor",
      description: [
        { type: "narration", text: "간수가 당신의 죄목을 읊으며 훈계하는 동안, 당신은 고개를 숙인 척하며 그의 허리춤을 주시한다." },
        { type: "narration", text: "낡은 가죽 벨트에 {{열쇠 꾸러미}}가 달려 있다. 크고 녹슨 열쇠 하나, 작고 반짝이는 열쇠 둘, 그리고 특이한 형태의 **카드키** 하나." },
        { type: "dialogue", speaker: "guard", text: "뭘 봐, 이 변태 새끼야!" },
        { type: "narration", text: "간수가 당신의 시선을 알아채고 채찍 손잡이로 턱을 올려친다. 하지만 이미 중요한 정보는 머릿속에 새겨졌다." },
        { type: "dialogue", speaker: "guard", text: "7번 감방이다. 썩 꺼져." },
      ],
      actions: [
        {
          id: "go_to_cell",
          text: "7번 감방으로 향한다.",
          nextScene: "cell_arrival"
        }
      ]
    },

    cell_arrival: {
      title: "7번 감방",
      location: "cell",
      description: [
        { type: "narration", text: "축축한 복도를 지나 **7번 감방** 앞에 도착한다. 녹슨 철창 너머로 여러 개의 시선이 느껴진다." },
        { type: "narration", text: "간수가 철창을 열고 당신을 안으로 밀어 넣는다. 쾅, 하는 소리와 함께 철창이 닫힌다." },
        { type: "dialogue", speaker: "guard", text: "새 식구다. 사이좋게 지내라, 쓰레기들아." },
        { type: "narration", text: "간수의 발소리가 멀어지자, 감방 안의 7명의 죄수들이 당신을 둘러싼다." },
        { type: "dialogue", speaker: "fraudster", text: "어이어이, 뉴페이스잖아. 뭘로 들어왔어? 여기 우리 모두 각자의 '사연'이 있거든." },
        { type: "dialogue", speaker: "political", text: "그냥 내버려둬. 첫날은 다들 멍하니까." },
        { type: "narration", text: "구석에서 누군가 당신을 유심히 바라보고 있다. 창백한 얼굴의 죄수가 알 수 없는 미소를 짓고 있다." }
      ],
      actions: [
        {
          id: "introduce_self",
          text: "자기소개를 한다.",
          nextScene: "cell_introduction"
        },
        {
          id: "stay_silent",
          text: "아무 말 없이 빈 침대를 찾는다.",
          nextScene: "cell_silent"
        },
        {
          id: "observe_prisoners",
          text: "죄수들을 하나하나 관찰한다.",
          nextScene: "cell_observe"
        }
      ]
    },

    cell_introduction: {
      title: "자기소개",
      location: "cell",
      description: [
        { type: "narration", text: "당신은 목소리를 가다듬고 자신을 소개한다. 감방 안에 묘한 침묵이 흐른다." },
        { type: "dialogue", speaker: "arsonist", text: "아, 그 게임 만든 여자? 뉴스에서 봤어. 꽤 큰 뉴스였지. 아이들을... 그런 내용이었다며." },
        { type: "narration", text: "방화범이 손가락을 튕기며 당신을 훑어본다." },
        { type: "dialogue", speaker: "groper", text: "헤헤... 동류를 만나니 반갑네. 나도 뭐, 비슷한 취급 받고 있으니까. 히히." },
        { type: "dialogue", speaker: "wifekiller", text: "...역겹군." },
        { type: "narration", text: "아내 살인범이라 불리는 여자가 차갑게 내뱉고 돌아선다. 그의 눈에 깊은 슬픔과 혐오가 공존한다." },
        { type: "dialogue", speaker: "fraudster", text: "야야, 다들 그러지 마. 여기 천사 있어? 다들 각자 사연 있잖아." },
        { type: "narration", text: "사기꾼이 능글맞게 웃으며 분위기를 누그러뜨린다." },
        { type: "dialogue", speaker: "messiah", text: "심판하지 마라, 형제들이여. 우리 모두는 이 지옥에서 구원을 기다리는 죄인들이니." },
        { type: "narration", text: "창백한 얼굴의 죄수가 천천히 다가온다. 그의 눈빛이 묘하게 빛난다. 광기와 카리스마가 공존하는 눈." },
        { type: "dialogue", speaker: "messiah", text: "나는 이곳의 **메시아**라 불리지. 언젠가 우리 모두를 이끌고 이 지옥을 탈출할 자... 환영한다, 새로운 양이여." }
      ],
      actions: [
        {
          id: "talk_messiah",
          text: "메시아에게 더 물어본다.",
          nextScene: "talk_messiah"
        },
        {
          id: "talk_fraudster",
          text: "사기꾼에게 말을 건다.",
          nextScene: "talk_fraudster"
        },
        {
          id: "talk_wifekiller_intro",
          text: "돌아선 아내 살인범을 따라간다.",
          nextScene: "talk_wifekiller_intro"
        },
        {
          id: "observe_conflict",
          text: "갑자기 긴장감이 흐른다...",
          nextScene: "conflict_messiah_arsonist"
        },
        {
          id: "find_bed",
          text: "빈 침대를 찾아 눕는다.",
          nextScene: "first_night"
        }
      ]
    },

    talk_wifekiller_intro: {
      title: "아내 살인범",
      location: "cell",
      description: [
        { type: "narration", text: "당신은 돌아선 아내 살인범을 따라간다. 감방 구석 창문 앞에 선 그는 육체노동으로 단련된 건장한 몸을 갖고 있다." },
        { type: "dialogue", speaker: "player", text: "저기... 아까 왜 그렇게 말했어요?" },
        { type: "narration", text: "그가 천천히 돌아본다. 차가운 눈빛이지만, 그 안에 깊은 고통이 보인다." },
        { type: "dialogue", speaker: "wifekiller", text: "...넌 아이들을 망친 변태잖아. 내가 왜 너한테 친절해야 하지?" },
        { type: "narration", text: "그의 손이 주먹을 쥔다. 손등에 오래된 방어상 흉터가 보인다." },
        { type: "dialogue", speaker: "wifekiller", text: "난 내 아이를 지키다가 여기 왔어. 넌 남의 아이를 망쳤고. 우리가 같아 보여?" },
        { type: "dialogue", speaker: "wifekiller", text: "...가. 눈에 안 띄게 살아. 그게 여기서 살아남는 방법이야." }
      ],
      actions: [
        {
          id: "insult",
          text: "\"살인범한테 설교를 듣고 싶진 않았는데.\"",
          nextScene: "gameover_wifekiller_rage"
        },
        {
          id: "ask_his_story",
          text: "\"당신 이야기를 듣고 싶어요.\"",
          nextScene: "wifekiller_reject_story",
          effects: [{ type: "increaseRelation", target: "wifekiller" }]
        },
        {
          id: "leave_quietly",
          text: "조용히 물러난다.",
          nextScene: "first_night"
        }
      ]
    },

    wifekiller_reject_story: {
      title: "거절",
      location: "cell",
      description: [
        { type: "narration", text: "아내 살인범이 잠시 멈칫한다. 그의 눈에 복잡한 감정이 스친다." },
        { type: "dialogue", speaker: "wifekiller", text: "...내 이야기?" },
        { type: "narration", text: "그가 고개를 돌린다." },
        { type: "dialogue", speaker: "wifekiller", text: "처음 보는 놈한테 할 이야기 아니야. 그리고 넌 아직 믿을 수 없고." },
        { type: "narration", text: "하지만 그의 목소리에서 적대감은 조금 누그러져 있다." },
        { type: "dialogue", speaker: "wifekiller", text: "...가서 자. 내일부터 바빠질 거야." }
      ],
      actions: [
        {
          id: "leave_quietly",
          text: "조용히 물러난다.",
          nextScene: "first_night"
        }
      ]
    },

    wifekiller_story: {
      title: "아내 살인범의 진실",
      location: "cell",
      description: [
        { type: "narration", text: "당신의 말에 아내 살인범이 잠시 멈칫한다." },
        { type: "dialogue", speaker: "wifekiller", text: "...내 이야기?" },
        { type: "narration", text: "그가 창문 밖을 바라본다. 눈에 머나먼 기억이 어린다." },
        { type: "dialogue", speaker: "wifekiller", text: "난 평범한 가장이었어. 작은 식당을 했지. 아내와 다섯 살 아들이 있었고." },
        { type: "dialogue", speaker: "wifekiller", text: "아내가... 변했어. 술을 마시기 시작했고, 날 때리기 시작했어. 나중엔 아들도." },
        { type: "narration", text: "그의 목소리가 떨린다." },
        { type: "dialogue", speaker: "wifekiller", text: "어느 날 밤... 아내가 칼을 들고 아들 방에 들어갔어. '네가 없으면 다 해결돼'라고 소리치면서." },
        { type: "dialogue", speaker: "wifekiller", text: "난... 뛰어들었어. 칼을 막다가 손을 베였고, 아내를 밀쳤어. 그녀가 넘어지면서... 머리를 부딪혔어. 그게 끝이었어." },
        { type: "narration", text: "그의 눈에 눈물이 맺힌다." },
        { type: "dialogue", speaker: "wifekiller", text: "정당방위였어. 분명히. 근데 아내 집안이 부자였고, 판사를 샀어. 난... 살인범이 됐지." },
        { type: "dialogue", speaker: "wifekiller", text: "아들은 지금 아내 부모 밑에서 자라고 있어. 날 살인자라고 배우면서. 면회도 못 오게 해." }
      ],
      actions: [
        {
          id: "sympathize_wife",
          text: "그에게 진심으로 동정을 표한다.",
          nextScene: "wifekiller_bond"
        },
        {
          id: "silent_respect",
          text: "의심하는 눈길로 쳐다본다.",
          nextScene: "first_night"
        }
      ]
    },

    wifekiller_bond: {
      title: "유대",
      location: "cell",
      description: [
        { type: "narration", text: "당신의 진심 어린 반응에 아내 살인범의 표정이 조금 누그러진다." },
        { type: "dialogue", speaker: "wifekiller", text: "...너, 생각보다 나쁜 사람은 아닌 것 같군." },
        { type: "narration", text: "그가 한숨을 쉰다." },
        { type: "dialogue", speaker: "wifekiller", text: "네 죄가 뭔진 모르겠어. 근데 여기선 다들 나름의 이유가 있어. 변명이든 진짜든." },
        { type: "dialogue", speaker: "wifekiller", text: "난... 여기서 10년을 보냈어. 이 수용소를 손바닥처럼 알지. 구조도, 간수들 순찰 시간도, 숨겨진 통로도." },
        { type: "narration", text: "그가 당신을 빤히 바라본다." },
        { type: "dialogue", speaker: "wifekiller", text: "네가 탈출하고 싶다면... 도와줄 수 있어. 난 여기서 나가도 갈 곳이 없지만, 네가 성공하는 건 보고 싶거든." },
        { type: "dialogue", speaker: "wifekiller", text: "필요하면 말해. **지하 구조도**를 그려줄 수 있어." },
      ],
      effects: [{ type: "setFlag", flag: "wifekillerFriend" }],
      actions: [
        {
          id: "accept_help",
          text: "감사를 표하고 침대로 간다.",
          nextScene: "first_night"
        }
      ]
    },

    cell_silent: {
      title: "침묵",
      location: "cell",
      description: [
        { type: "narration", text: "당신은 아무 말 없이 감방 구석의 빈 침대로 향한다." },
        { type: "dialogue", speaker: "groper", text: "야, 쟤 왜 저래? 잘난 척이야 뭐야?" },
        { type: "dialogue", speaker: "political", text: "내버려둬. 적응할 시간이 필요한 거야." },
        { type: "narration", text: "당신은 침대에 누워 천장을 바라본다. 금이 간 콘크리트 사이로 물이 새어나오고 있다." },
        { type: "dialogue", speaker: "messiah", text: "고요함 속에도 답이 있는 법... 현명한 선택일지도 모르지." },
        { type: "narration", text: "창백한 얼굴의 죄수가 당신의 침대 옆을 지나가며 중얼거린다." }
      ],
      actions: [
        {
          id: "ask_messiah",
          text: "방금 지나간 죄수에게 말을 건다.",
          nextScene: "talk_messiah"
        },
        {
          id: "sleep",
          text: "눈을 감고 잠을 청한다.",
          nextScene: "first_night"
        }
      ]
    },

    cell_observe: {
      title: "관찰",
      location: "cell",
      description: [
        { type: "narration", text: "당신은 눈을 가늘게 뜨고 감방 안의 죄수들을 하나하나 살핀다." },
        { type: "narration", text: "**사기꾼** - 말쑥한 인상에 입술에는 항상 미소가 걸려 있다." },
        { type: "narration", text: "**방화범** - 얼굴 한편에 끔찍한 화상 자국이 있다. 멍하니 허공을 바라보다 가끔 혼잣말을 중얼거린다." },
        { type: "narration", text: "**치한** - 구석에 쪼그려 앉아 음침한 눈빛으로 주위를 살핀다. 연신 입술을 핥으며 히죽거린다. 오른쪽 귀가 반쯤 잘려나간 것이 보인다." },
        { type: "narration", text: "**정치범** - 지적이고 진지한 인상. 낡은 책을 읽고 있고 눈빛은 예리하다. 왼손 약지에 결혼반지 자국이 희미하게 남아 있다." },
        { type: "narration", text: "**아내 살인범** - 과묵하고 벽만 바라보며 미동도 않는다. 손등에 방어상 같은 오래된 흉터가 여럿 보인다." },
        { type: "narration", text: "**소아성폭력범** - 감방 구석에 웅크린 왜소한 안경잡이. 가끔 눈이 마주칠 때면 살기 어린 독기가 스치지만, 이내 고개를 떨구며 숨을 죽인다." },
        { type: "narration", text: "**메시아** - 창백한 얼굴에 광기 어린 눈빛. 하지만 그 광기 속에 묘한 카리스마가 있다. 당신과 눈이 마주치자 알 수 없는 미소를 짓는다." }
      ],
      actions: [
        {
          id: "approach_political",
          text: "책 읽는 정치범에게 다가간다.",
          nextScene: "talk_political"
        },
        {
          id: "approach_messiah",
          text: "메시아라 불리는 자에게 다가간다.",
          nextScene: "talk_messiah"
        },
        {
          id: "approach_groper",
          text: "구석의 치한에게 다가간다.",
          conditions: [{ type: "flagNotSet", flag: "groperEnemy" }],
          nextScene: "talk_groper"
        },
        {
          id: "approach_arsonist",
          text: "방화범에게 다가간다.",
          nextScene: "talk_arsonist_day"
        },
        {
          id: "find_bed",
          text: "빈 침대를 찾아 눕는다.",
          nextScene: "first_night"
        }
      ]
    },

    // ===== 3장: 개별 죄수들과의 대화 =====
    talk_messiah: {
      title: "메시아와의 대화",
      location: "cell",
      description: [
        { type: "dialogue", speaker: "messiah", text: "나에게 관심이 있는가, 새로운 양이여?" },
        { type: "narration", text: "가까이서 보니 그의 눈동자가 묘하게 흔들리고 있다. 광신도의 눈빛이지만, 그 안에 묘한 카리스마가 있다." },
        { type: "dialogue", speaker: "messiah", text: "나는 밖에서 **새로운 종교**를 만들었지. 《천상의 문》이라고... 수천 명의 신도가 나를 따랐어." },
        { type: "narration", text: "그가 창백한 손으로 허공에 원을 그린다." },
        { type: "dialogue", speaker: "messiah", text: "정부는 그것을 두려워했고... 나를 이곳에 가뒀지. 하지만 걱정 마라. 나는 이미 **탈출 계획**을 세워두었으니까." },
        { type: "narration", text: "그가 당신의 귀에 대고 속삭인다." },
        { type: "dialogue", speaker: "messiah", text: "함께할 자들만이 구원받을 것이다. 나를 믿겠나?" }
      ],
      actions: [
        {
          id: "ask_messiah_past",
          text: "\"당신은 어떻게 메시아가 됐나요?\"",
          conditions: [{ type: "relationMin", target: "messiah", value: 3 }],
          nextScene: "messiah_origin"
        },
        {
          id: "trust_messiah",
          text: "\"믿겠습니다.\"",
          nextScene: "messiah_trust",
          effects: [{ type: "setFlag", flag: "messiahRoute" }]
        },
        {
          id: "doubt_messiah",
          text: "\"생각해 보겠습니다.\"",
          nextScene: "messiah_doubt"
        },
        {
          id: "reject_messiah",
          text: "\"사이비 교주랑은 엮이기 싫군.\"",
          nextScene: "messiah_reject"
        }
      ]
    },

    messiah_origin: {
      title: "메시아의 기원",
      location: "cell",
      description: [
        { type: "narration", text: "메시아의 눈빛이 머나먼 곳을 바라본다. 광기 속에 찰나의 슬픔이 스친다." },
        { type: "dialogue", speaker: "messiah", text: "나는... 원래 평범한 의사였어. 작은 마을 병원의 외과의." },
        { type: "narration", text: "그의 손이 무의식적으로 움직인다. 메스를 쥔 것처럼." },
        { type: "dialogue", speaker: "messiah", text: "어느 날 밤, 대형 사고가 났어. 버스가 절벽 아래로... 환자가 수십 명 쏟아졌지." },
        { type: "dialogue", speaker: "messiah", text: "나 혼자였어. 간호사들도 도망갔고. 그날 밤... 내 손으로 열일곱 명을 수술했어. 밤새도록." },
        { type: "narration", text: "그의 눈이 촉촉해진다." },
        { type: "dialogue", speaker: "messiah", text: "열세 명은 살았어. 네 명은... 죽었고. 내 손 안에서. 피가 멈추지 않았어..." },
        { type: "dialogue", speaker: "messiah", text: "그때 **목소리**가 들렸어. '너는 선택받았다. 죽음을 결정하는 자.' 처음엔 미친 소리라고 생각했지." }
      ],
      actions: [
        {
          id: "ask_more",
          text: "\"그래서 어떻게 됐나요?\"",
          nextScene: "messiah_origin_2"
        },
        {
          id: "leave_messiah",
          text: "무섭다. 물러난다.",
          nextScene: "cell_observe"
        }
      ]
    },

    messiah_origin_2: {
      title: "메시아의 탄생",
      location: "cell",
      description: [
        { type: "dialogue", speaker: "messiah", text: "그 후로... 매일 밤 목소리가 들렸어. 잠을 잘 수가 없었지." },
        { type: "dialogue", speaker: "messiah", text: "병원을 그만뒀어. 환자를 볼 때마다... 누가 살고 누가 죽을지 '보이기' 시작했거든." },
        { type: "narration", text: "그가 당신의 눈을 똑바로 바라본다." },
        { type: "dialogue", speaker: "messiah", text: "어느 날, 한 아이가 찾아왔어. 암 말기였지. 의학으로는 가망이 없었어." },
        { type: "dialogue", speaker: "messiah", text: "근데... 내가 손을 얹으니까... 아이가 나았어. 진짜로. 의사들도 설명할 수 없었지." },
        { type: "narration", text: "광기 어린 확신이 그의 눈에서 빛난다." },
        { type: "dialogue", speaker: "messiah", text: "그때 깨달았어. 나는 진짜 **선택받은 자**야. 수천 명이 나를 따르기 시작했고... 정부는 두려워했지." },
        { type: "dialogue", speaker: "messiah", text: "날 가두면 신도들이 잠잠해질 줄 알았겠지. 하지만 오산이야. 밖에서... 준비하고 있거든." },
        { type: "dialogue", speaker: "messiah", text: "넌 믿음이 있는 자 같아. 함께하겠나, 형제여?" }
      ],
      actions: [
        {
          id: "believe_now",
          text: "\"...믿겠습니다.\"",
          nextScene: "messiah_trust",
          effects: [{ type: "setFlag", flag: "messiahRoute" }]
        },
        {
          id: "still_doubt",
          text: "\"아직 잘 모르겠어요.\"",
          nextScene: "messiah_doubt"
        }
      ]
    },

    messiah_trust: {
      title: "메시아의 신뢰",
      location: "cell",
      description: [
        { type: "narration", text: "메시아의 얼굴에 환한 미소가 번진다." },
        { type: "dialogue", speaker: "messiah", text: "현명한 선택이야, 형제여. 너는 구원받을 자격이 있어." },
        { type: "narration", text: "그가 당신의 손을 꼭 잡는다. 차가운 손이다." },
        { type: "dialogue", speaker: "messiah", text: "3일 후 새벽, **환기구**가 열리는 시간이 있어. 그때 움직인다. 그 전까지 아무에게도 말하지 마라." },
      ],
      actions: [
        {
          id: "continue",
          text: "고개를 끄덕이고 물러난다.",
          nextScene: "first_night"
        }
      ]
    },

    messiah_doubt: {
      title: "유보",
      location: "cell",
      description: [
        { type: "dialogue", speaker: "messiah", text: "의심은 지혜의 시작이지... 하지만 너무 오래 망설이면 기회는 사라진다." },
        { type: "narration", text: "메시아가 어깨를 으쓱하며 물러난다." },
        { type: "dialogue", speaker: "messiah", text: "마음이 바뀌면 언제든 찾아오게. 구원의 문은 아직 열려 있으니까." }
      ],
      actions: [
        {
          id: "talk_others",
          text: "다른 죄수들에게 말을 건다.",
          nextScene: "cell_introduction"
        },
        {
          id: "rest",
          text: "침대로 가서 쉰다.",
          nextScene: "first_night"
        }
      ]
    },

    messiah_reject: {
      title: "거부",
      location: "cell",
      description: [
        { type: "narration", text: "메시아의 눈빛이 순간 얼어붙는다. 그의 얼굴에 광기 어린 분노가 스친다." },
        { type: "dialogue", speaker: "messiah", text: "...사이비... 교주...?" },
        { type: "narration", text: "그가 한 발짝 다가온다. 주변의 공기가 차갑게 변한다." },
        { type: "dialogue", speaker: "messiah", text: "나는 수천 명을 구원한 자다. 네가 감히... 날 모욕해?" },
        { type: "narration", text: "잠시 후, 그의 표정이 다시 차분해진다. 하지만 그 눈 속의 광기는 사라지지 않았다." },
        { type: "dialogue", speaker: "messiah", text: "좋아... 좋아. 불신자는 스스로 지옥을 선택하는 법이지. 후회하게 될 거야." },
        { type: "narration", text: "그가 돌아서며 추종자들에게 무언가를 속삭인다. 불길한 예감이 든다." },
        { type: "narration", text: "사기꾼이 슬쩍 다가온다." },
        { type: "dialogue", speaker: "fraudster", text: "야... 너 진짜 대담하다. 저 미친년한테 그런 말을 하다니. 조심해. 저거 추종자가 꽤 있어." }
      ],
      effects: [{ type: "setFlag", flag: "messiahEnemy" }],
      actions: [
        {
          id: "listen_fraudster",
          text: "사기꾼의 말을 듣는다.",
          nextScene: "talk_fraudster"
        },
        {
          id: "ignore",
          text: "무시하고 침대로 간다.",
          nextScene: "first_night"
        }
      ]
    },

    talk_fraudster: {
      title: "사기꾼과의 대화",
      location: "cell",
      description: [
        { type: "narration", text: "사기꾼이 능글맞은 미소를 지으며 당신에게 다가온다. 말쑥한 인상에 눈빛은 날카롭다." },
        { type: "dialogue", speaker: "fraudster", text: "오, 새 친구. 반가워. 여기선 '김 사장'이라고 불러. 밖에서도 그렇게 불렸거든." },
        { type: "narration", text: "그가 손가락으로 보이지 않는 동전을 돌리는 시늉을 한다." },
        { type: "dialogue", speaker: "fraudster", text: "나? 나는 투자 사기로 들어왔지. 수백 명한테서 수십억을 긁어모았는데... 뭐, 걸렸으니까 여기 있는 거고." },
        { type: "dialogue", speaker: "fraudster", text: "근데 말이야, 여기 간수들 중에 **매수 가능한 놈**이 있어. 야간 근무 서는 '박' 간수라고." },
        { type: "dialogue", speaker: "fraudster", text: "문제는 돈이지. 밖에 있는 내 조직에서 자금을 빼돌릴 수만 있다면... 근데 연락할 방법이 없어." },
        { type: "narration", text: "그가 당신을 유심히 바라본다." },
        { type: "dialogue", speaker: "fraudster", text: "혹시 밖에 연락할 사람 있어? 있으면 거래 좀 해보자고." }
      ],
      actions: [
        {
          id: "ask_fraudster_past",
          text: "\"어떻게 사기를 치게 됐어요?\"",
          nextScene: "fraudster_past"
        },
        {
          id: "have_contact",
          text: "\"연락할 사람이 있을지도...\"",
          nextScene: "fraudster_deal",
          effects: [{ type: "setFlag", flag: "fraudsterRoute" }]
        },
        {
          id: "no_contact",
          text: "\"없어. 난 버려진 몸이야.\"",
          nextScene: "fraudster_reject"
        },
        {
          id: "suspicious",
          text: "\"사기꾼 말을 어떻게 믿어?\"",
          nextScene: "fraudster_suspicious"
        }
      ]
    },

    fraudster_past: {
      title: "사기꾼의 과거",
      location: "cell",
      description: [
        { type: "narration", text: "사기꾼의 미소가 잠시 굳어진다. 눈빛에 찰나의 어둠이 스친다." },
        { type: "dialogue", speaker: "fraudster", text: "...내가 왜 사기꾼이 됐는지 궁금해? 재밌는 이야기는 아닌데." },
        { type: "narration", text: "그가 한숨을 쉬며 벽에 기댄다." },
        { type: "dialogue", speaker: "fraudster", text: "나도 원래는 **평범한 회사원**이었어. 중소기업 영업 사원. 월급 300만 원 받으면서 열심히 살았지." },
        { type: "dialogue", speaker: "fraudster", text: "근데 회사가 망했어. 대표가 자금 빼돌리고 도주한 거야. 나 같은 직원들한테 밀린 월급 석 달치 떼먹고." },
        { type: "narration", text: "그의 손이 주먹을 쥔다." },
        { type: "dialogue", speaker: "fraudster", text: "그때 깨달았어. 정직하게 살아봤자 호구 되는 거더라고. 남을 속이는 놈이 먹는 세상이야." },
        { type: "dialogue", speaker: "fraudster", text: "그래서 내가 먼저 속이는 쪽이 되기로 했어. 처음엔 작게 시작했지. 고금리 대출 상품 팔고..." }
      ],
      actions: [
        {
          id: "ask_more_fraud",
          text: "\"그러다 어떻게 커졌어요?\"",
          nextScene: "fraudster_past_2"
        },
        {
          id: "back_to_deal",
          text: "\"...그래서, 탈출 얘기는?\"",
          nextScene: "fraudster_deal_talk"
        }
      ]
    },

    fraudster_past_2: {
      title: "사기꾼의 성장",
      location: "cell",
      description: [
        { type: "dialogue", speaker: "fraudster", text: "처음 100만 원 뜯었을 때... 손이 떨렸어. 죄책감에 잠을 못 잤고." },
        { type: "dialogue", speaker: "fraudster", text: "근데 두 번째는 괜찮더라. 세 번째는 쉬웠고. 열 번째쯤 되니까... **아무렇지도 않았어**." },
        { type: "narration", text: "그가 씁쓸하게 웃는다." },
        { type: "dialogue", speaker: "fraudster", text: "《황금알 투자》라는 회사를 차렸어. 원금 보장에 월 10% 수익이라고 광고했지. 물론 다 거짓말이었고." },
        { type: "dialogue", speaker: "fraudster", text: "3년 만에 127억을 모았어. 피해자가 400명 넘더라. 노인들 퇴직금, 젊은이들 전세금... 다 먹었지." },
        { type: "narration", text: "그의 눈빛이 차가워진다." },
        { type: "dialogue", speaker: "fraudster", text: "근데 내 동업자 새끼가 배신했어. 돈 절반 들고 경찰에 날 팔아넘긴 거야. 그래서 여기 왔지." },
        { type: "dialogue", speaker: "fraudster", text: "피해자들? 뭐... 미안하긴 해. 근데 그놈들도 욕심 때문에 걸린 거잖아. **세상에 공짜는 없어**." },
        { type: "narration", text: "그가 능글맞은 미소를 되찾는다." },
        { type: "dialogue", speaker: "fraudster", text: "어쨌든, 나한테 남은 돈은 아직 있어. 밖에. 그걸로 여기서 나갈 수 있어. 관심 있어?" }
      ],
      actions: [
        {
          id: "interested",
          text: "\"어떻게 하는 건데?\"",
          nextScene: "fraudster_deal_talk"
        },
        {
          id: "disgusted",
          text: "\"피해자들한테 미안하진 않아?\"",
          nextScene: "fraudster_guilt"
        }
      ]
    },

    fraudster_guilt: {
      title: "죄책감",
      location: "cell",
      description: [
        { type: "narration", text: "사기꾼이 잠시 멈칫한다. 미소가 살짝 흔들린다." },
        { type: "dialogue", speaker: "fraudster", text: "...미안하냐고?" },
        { type: "narration", text: "그가 먼 곳을 바라본다." },
        { type: "dialogue", speaker: "fraudster", text: "한 할머니가 있었어. 전 재산 3천만 원을 맡기셨지. 아들 병원비로 모은 돈이라면서." },
        { type: "dialogue", speaker: "fraudster", text: "나중에 들었는데... 그 할머니, 돈 날리고 나서 한강에 뛰어들었대. 구조됐는데 뇌사 상태로." },
        { type: "narration", text: "그의 손이 떨린다." },
        { type: "dialogue", speaker: "fraudster", text: "...가끔 꿈에 나와. 그 할머니 얼굴이. 근데 어쩔 거야. 이미 벌어진 일인데." },
        { type: "narration", text: "그가 억지로 미소를 짓는다." },
        { type: "dialogue", speaker: "fraudster", text: "그래서 나가면... 그 아들한테 돈 좀 보내주려고. 속죄는 아니고, 그냥... 뭐랄까. 찝찝하니까." },
        { type: "dialogue", speaker: "fraudster", text: "어쨌든, 거래 안 할 거야? 서로 도움 되는 건데." }
      ],
      actions: [
        {
          id: "deal",
          text: "거래를 제안받는다.",
          nextScene: "fraudster_deal_talk"
        },
        {
          id: "refuse",
          text: "거절하고 물러난다.",
          nextScene: "first_night"
        }
      ]
    },

    fraudster_deal_talk: {
      title: "사기꾼의 제안",
      location: "cell",
      description: [
        { type: "dialogue", speaker: "fraudster", text: "좋아, 핵심만 말해줄게." },
        { type: "narration", text: "그가 주위를 살피며 목소리를 낮춘다." },
        { type: "dialogue", speaker: "fraudster", text: "박 간수는 돈에 약해. 자식 대학 등록금 때문에 허덕이고 있거든. 5천만 원이면 넘어와." },
        { type: "dialogue", speaker: "fraudster", text: "문제는 밖에 있는 내 조직에 연락하는 거야. 면회 온 사람한테 메모를 전달하면 돼. 근데 난 면회 오는 사람이 없어." },
        { type: "narration", text: "그가 당신을 빤히 바라본다." },
        { type: "dialogue", speaker: "fraudster", text: "넌 어때? 밖에 누구 있어? 가족이든 뭐든." }
      ],
      actions: [
        {
          id: "have_contact",
          text: "\"연락할 사람이 있을지도...\"",
          nextScene: "fraudster_deal",
          effects: [{ type: "setFlag", flag: "fraudsterRoute" }]
        },
        {
          id: "no_contact",
          text: "\"없어. 난 버려진 몸이야.\"",
          nextScene: "fraudster_reject"
        }
      ]
    },

    fraudster_deal: {
      title: "거래",
      location: "cell",
      description: [
        { type: "dialogue", speaker: "fraudster", text: "오, 그래? 그럼 이야기가 되네." },
        { type: "narration", text: "사기꾼이 주위를 살피며 목소리를 낮춘다." },
        { type: "dialogue", speaker: "fraudster", text: "내일 면회 시간에 방법을 알려줄게. 일단 네 사람한테 연락만 닿으면 돼. 나머지는 내가 알아서 할 테니까." },
        { type: "dialogue", speaker: "fraudster", text: "성공하면 우리 둘 다 여기서 나갈 수 있어. 어때, 나쁘지 않지?" },
      ],
      actions: [
        {
          id: "continue",
          text: "일단 알겠다고 한다.",
          nextScene: "first_night"
        }
      ]
    },

    fraudster_reject: {
      title: "거절",
      location: "cell",
      description: [
        { type: "dialogue", speaker: "fraudster", text: "그래? 안됐네. 뭐, 다른 방법을 찾아봐야지." },
        { type: "narration", text: "사기꾼이 아쉬운 표정을 짓다가 곧 다시 능글맞은 미소를 띤다." },
        { type: "dialogue", speaker: "fraudster", text: "근데 기회가 생기면 말해. 여기서 나가는 길은 항상 열어둬야 하니까." }
      ],
      actions: [
        {
          id: "talk_others",
          text: "다른 죄수와 이야기한다.",
          nextScene: "cell_introduction"
        },
        {
          id: "rest",
          text: "침대로 가서 쉰다.",
          nextScene: "first_night"
        }
      ]
    },

    fraudster_suspicious: {
      title: "의심",
      location: "cell",
      description: [
        { type: "narration", text: "사기꾼이 킥킥 웃는다." },
        { type: "dialogue", speaker: "fraudster", text: "하하, 날카롭네. 그래, 내가 사기꾼인 건 맞아. 근데 말이야..." },
        { type: "narration", text: "그가 진지한 표정으로 바뀐다." },
        { type: "dialogue", speaker: "fraudster", text: "여기서 나가고 싶은 마음은 진심이야. 그리고 나는 **거래**에는 정직하거든. 사기는 호구한테나 치는 거지, 파트너한테 치는 게 아니니까." },
        { type: "dialogue", speaker: "fraudster", text: "생각해봐. 여기서 믿을 년이 누가 있겠어? 서로 이용하는 게 가장 솔직한 관계 아니야?" }
      ],
      actions: [
        {
          id: "agree",
          text: "\"...일리가 있네.\"",
          nextScene: "fraudster_deal",
          effects: [{ type: "setFlag", flag: "fraudsterRoute" }]
        },
        {
          id: "decline",
          text: "\"그래도 됐어.\"",
          nextScene: "first_night"
        }
      ]
    },

    talk_political: {
      title: "정치범과의 대화",
      location: "cell",
      description: [
        { type: "narration", text: "책을 읽던 여자가 고개를 들어 당신을 바라본다. 지적이고 차분한 눈빛이지만, 그 안에 깊은 피로가 서려 있다." },
        { type: "dialogue", speaker: "political", text: "새로 왔군. 나는... 뭐, 정치범이라고 불러. 원래 기자였어. 《진실의 목소리》라는 지하 신문을 만들었지." },
        { type: "narration", text: "그가 왼손 약지의 희미한 반지 자국을 무의식적으로 만진다." },
        { type: "dialogue", speaker: "political", text: "정부의 비리, 고위층의 범죄... 다 폭로했어. 그리고 대가를 치렀지. 내 남편과 딸은..." },
        { type: "narration", text: "그가 잠시 말을 멈춘다. 눈빛이 흔들린다." },
        { type: "dialogue", speaker: "political", text: "...미안. 네 죄목은 들었어. 뭐, 여기선 다들 각자의 사연이 있으니까 판단은 안 하겠어." },
        { type: "narration", text: "그가 책을 내려놓고 한숨을 쉰다." },
        { type: "dialogue", speaker: "political", text: "충고 하나 해주지. 여기서 살아남으려면 **편 가르기**를 잘해야 해. 메시아 패거리, 아니면 나머지. 어느 쪽에 붙을지 잘 생각해." },
        { type: "dialogue", speaker: "political", text: "난 어느 쪽에도 안 끼어. 조용히 형기 채우고 나갈 생각이거든. 가족을 다시 볼 수 있다면..." }
      ],
      actions: [
        {
          id: "ask_family",
          text: "\"가족이 어떻게 됐나요?\"",
          conditions: [{ type: "relationMin", target: "political", value: 1 }],
          nextScene: "political_family"
        },
        {
          id: "ask_advice",
          text: "\"탈출 방법을 알고 있나요?\"",
          nextScene: "political_advice"
        },
        {
          id: "ask_others",
          text: "\"다른 죄수들에 대해 알려주세요.\"",
          nextScene: "political_info"
        },
        {
          id: "leave",
          text: "\"충고 감사합니다.\"",
          nextScene: "first_night"
        }
      ]
    },

    political_family: {
      title: "정치범의 가족",
      location: "cell",
      description: [
        { type: "narration", text: "정치범의 얼굴에 고통스러운 그림자가 드리운다." },
        { type: "dialogue", speaker: "political", text: "...내가 체포되던 날, 비밀경찰이 새벽에 집에 들이닥쳤어." },
        { type: "dialogue", speaker: "political", text: "남편 현수는... 나를 숨기려다가 총을 맞았어. 눈앞에서. 내 딸 아이 앞에서." },
        { type: "narration", text: "그의 손이 떨린다." },
        { type: "dialogue", speaker: "political", text: "딸 민아는... 열두 살이었어. 그 애가 엄마 피를 보면서 비명을 지르던 것이... 아직도 매일 밤 꿈에 나와." },
        { type: "dialogue", speaker: "political", text: "민아는 지금 고모 집에 있어. 나를 면회 오려고 했대. 근데 정부가 막았어. 5년 동안 딸 얼굴을 못 봤어." },
        { type: "narration", text: "그가 고개를 숙인다. 눈물이 볼을 타고 흐른다." },
        { type: "dialogue", speaker: "political", text: "그래서 탈출은 안 해. 내가 탈출하면... 민아가 위험해지니까. 하지만 네가 나가면... 부탁 하나만 해도 될까?" }
      ],
      actions: [
        {
          id: "listen_request",
          text: "\"무슨 부탁인데요?\"",
          nextScene: "political_request"
        },
        {
          id: "decline",
          text: "\"약속은 못 해요.\"",
          nextScene: "first_night"
        }
      ]
    },

    political_request: {
      title: "정치범의 부탁",
      location: "cell",
      description: [
        { type: "narration", text: "정치범이 주머니에서 낡은 종이를 꺼낸다. 접고 또 접어 닳아버린 편지이다." },
        { type: "dialogue", speaker: "political", text: "이건... 민아한테 쓴 편지야. 5년 동안 부치지 못했어. 면회도 안 되고, 편지도 검열당하니까." },
        { type: "dialogue", speaker: "political", text: "네가 나가면... 이거 좀 전해줄 수 있어? 주소는 외우고 있어. **서문구 행복로 127번지, 김정희 씨 댁**." },
        { type: "narration", text: "그의 눈에 간절함이 어린다." },
        { type: "dialogue", speaker: "political", text: "이 편지에... 내 모든 마음이 담겨 있어. 엄마가 왜 이런 일을 했는지, 왜 가족을 지키지 못했는지... 미안하다고..." },
        { type: "dialogue", speaker: "political", text: "부탁이야. 제발..." },
        { type: "narration", text: "당신은 정치범의 편지를 받는다." }
      ],
      effects: [
        { type: "addItem", item: "정치범의 편지" },
        { type: "setFlag", flag: "politicalPromise" }
      ],
      actions: [
        {
          id: "promise",
          text: "반드시 전해주겠다고 약속한다.",
          nextScene: "political_grateful"
        }
      ]
    },

    political_grateful: {
      title: "약속",
      location: "cell",
      description: [
        { type: "narration", text: "정치범의 눈에서 눈물이 흐른다. 그가 당신의 손을 꽉 잡는다." },
        { type: "dialogue", speaker: "political", text: "고마워... 정말 고마워. 네가 이 지옥에서 나갈 수 있도록 내가 아는 모든 걸 알려줄게." },
        { type: "narration", text: "그가 눈물을 닦고 진지한 표정으로 돌아온다." },
        { type: "dialogue", speaker: "political", text: "여기서 10년을 보내면서 많이 봤어. **지하 3층에 하수도 통로**가 있다는 건 알려줬지?" },
        { type: "dialogue", speaker: "political", text: "그리고 하나 더. **간수장 정 대위**... 그 놈은 매주 수요일 밤에 {{의무실}}에서 뭔가를 한다. 뒷거래인 것 같은데, 그때 **보안이 느슨해져**." },
        { type: "dialogue", speaker: "political", text: "그 정보가 도움이 되길 바라. 그리고... 부디 살아서 나가." },
      ],
      effects: [
        { type: "setFlag", flag: "knowWednesdayGap" },
        { type: "setFlag", flag: "politicalFriend" }
      ],
      actions: [
        {
          id: "continue",
          text: "진심으로 감사를 표한다.",
          nextScene: "first_night"
        }
      ]
    },

    political_advice: {
      title: "조언",
      location: "cell",
      description: [
        { type: "narration", text: "정치범이 목소리를 낮춘다." },
        { type: "dialogue", speaker: "political", text: "직접 도와줄 수는 없어. 난 여기서 튀면 가족이 위험해지거든." },
        { type: "dialogue", speaker: "political", text: "하지만 정보는 줄 수 있지. 이 수용소는 **지하 3층**까지 있어. 지하 3층에 하수도로 연결되는 통로가 있다는 소문이 있어." },
        { type: "dialogue", speaker: "political", text: "문제는 지하 3층은 **독방 구역**이야. 거기 가려면 중징계를 받거나... 아니면 다른 방법을 찾아야 해." },
      ],
      effects: [
        { type: "setFlag", flag: "knowSewerPath" },
        { type: "increaseRelation", target: "political" }
      ],
      actions: [
        {
          id: "ask_more",
          text: "\"가족이 어떻게 됐나요?\"",
          conditions: [{ type: "relationMin", target: "political", value: 1 }],
          nextScene: "political_family"
        },
        {
          id: "thank",
          text: "감사를 표하고 물러난다.",
          nextScene: "first_night"
        }
      ]
    },

    political_info: {
      title: "정보",
      location: "cell",
      description: [
        { type: "narration", text: "정치범이 다른 죄수들을 힐끗 바라본다." },
        { type: "dialogue", speaker: "political", text: "좋아, 알려줄게." },
        { type: "dialogue", speaker: "political", text: "**메시아** - 사이비 교주 출신. 카리스마는 있는데 머리가 좀 돌았어. 그를 따르는 신도들이 밖에서 뭔가 준비 중이라는 소문이 있어." },
        { type: "dialogue", speaker: "political", text: "**사기꾼** - 영악한 사람이야. 말은 못 믿지만, 간수들이랑 뭔가 거래를 하고 있는 것 같더라." },
        { type: "dialogue", speaker: "political", text: "**방화범** - 불에 미친 여자. 언젠가 이 수용소를 불태울 거라고 혼잣말하더라. 위험해." },
        { type: "dialogue", speaker: "political", text: "**아내 살인범** - 사실 그 여자, 아내를 죽인 게 아니야. 정당방위였는데 판사가 매수당한 거래. 불쌍한 사람이지." },
        { type: "dialogue", speaker: "political", text: "나머지는... 굳이 알 필요 없을 거야. 가까이 하지 마." }
      ],
      actions: [
        {
          id: "ask_family",
          text: "\"그런데... 가족은 어떻게 됐나요?\"",
          conditions: [{ type: "relationMin", target: "political", value: 1 }],
          nextScene: "political_family",
          effects: [
            { type: "setFlag", flag: "knowPrisoners" },
            { type: "increaseRelation", target: "political" }
          ]
        },
        {
          id: "remember",
          text: "정보를 머릿속에 새긴다.",
          nextScene: "first_night",
          effects: [
            { type: "setFlag", flag: "knowPrisoners" },
            { type: "increaseRelation", target: "political" }
          ]
        }
      ]
    },

    // ===== 치한과의 대화 =====
    talk_groper: {
      title: "치한과의 대화",
      location: "cell",
      description: [
        { type: "narration", text: "당신이 다가가자, 치한이 경계하는 눈빛으로 올려다본다. 반쯤 잘린 오른쪽 귀가 눈에 들어온다." },
        { type: "dialogue", speaker: "groper", text: "뭐야... 뭘 봐? 나한테 뭔 볼일이야?" },
        { type: "narration", text: "그의 목소리는 찢어진 듯 쉬어 있다. 가까이서 보니 목에도 희미한 교살 자국이 보인다." },
        { type: "dialogue", speaker: "groper", text: "헤헤... 내 귀 말이야? 이건 밖에서 당한 거야. 피해자 오빠가... 칼을 들고 찾아왔거든." },
        { type: "narration", text: "그가 귀를 만지작거리며 히죽거린다." },
        { type: "dialogue", speaker: "groper", text: "근데 있잖아, 그 오빠도 결국 여기 들어왔어. 나를 죽이려다가. 재밌지 않아? 히히히..." }
      ],
      actions: [
        {
          id: "ask_groper_past",
          text: "어떻게 잡히게 됐는지 묻는다.",
          nextScene: "groper_past"
        },
        {
          id: "ask_groper_info",
          text: "수용소에 대해 아는 게 있는지 묻는다.",
          nextScene: "groper_info"
        },
        {
          id: "insult_groper",
          text: "\"역겹네. 귀 하나로 끝난 게 다행이다.\"",
          nextScene: "groper_threat"
        },
        {
          id: "leave_groper",
          text: "말없이 자리를 뜬다.",
          nextScene: "cell_observe"
        }
      ]
    },

    groper_threat: {
      title: "위협",
      location: "cell",
      description: [
        { type: "narration", text: "치한의 얼굴이 순간 일그러진다. 히죽거리던 웃음이 사라지고 싸늘한 눈빛이 드러난다." },
        { type: "dialogue", speaker: "groper", text: "...뭐라고?" },
        { type: "narration", text: "그가 천천히 일어선다. 생각보다 키가 크다." },
        { type: "dialogue", speaker: "groper", text: "너... 날 무시해? 별로 다를 것도 없는 주제에!" },
        { type: "narration", text: "화를 내려던 그는 주변의 눈치를 보고선 목소리를 낮춰 음침하게 중얼거린다." },
        { type: "dialogue", speaker: "groper", text: "좋아... 좋아. 기억해주지. 히히히..." },
      ],
      effects: [{ type: "setFlag", flag: "groperEnemy" }],
      actions: [
        {
          id: "leave_scared",
          text: "불안한 마음으로 자리를 뜬다.",
          nextScene: "cell_observe"
        }
      ]
    },

    groper_past: {
      title: "치한의 과거",
      location: "cell",
      description: [
        { type: "narration", text: "치한이 음습하게 웃으며 과거를 회상한다." },
        { type: "dialogue", speaker: "groper", text: "나? 나는 지하철에서 일했어... 아니, '활동'했다고 해야 하나? 헤헤." },
        { type: "dialogue", speaker: "groper", text: "처음엔 그냥 스치는 정도였어. 근데 점점... 참을 수가 없었어. 그 느낌이..." },
        { type: "narration", text: "그의 눈이 흐릿해진다. 당신은 구역질이 올라온다." },
        { type: "dialogue", speaker: "groper", text: "50번도 넘게 했을 걸? 결국 한 여자애가... 소리를 질렀어. 사람들이 달려들었고..." },
        { type: "narration", text: "그가 잘린 귀를 쓸어내린다." },
        { type: "dialogue", speaker: "groper", text: "법정에 섰을 때 피해자들이 쭉 서 있었어. 스물세 명. 근데 나, 단 한 명도 얼굴을 못 알아보겠더라고. 헤헤... 미안하다고 해야 하나? 모르겠어." },
        { type: "narration", text: "그의 말에 진심 어린 반성은 찾아볼 수 없다. 오히려 자랑처럼 들린다." }
      ],
      actions: [
        {
          id: "leave_disgust",
          text: "더 이상 듣고 싶지 않다. 자리를 뜬다.",
          nextScene: "first_night"
        },
        {
          id: "ask_groper_info",
          text: "억지로 참고 수용소에 대해 묻는다.",
          nextScene: "groper_info"
        }
      ]
    },

    groper_info: {
      title: "치한의 정보",
      location: "cell",
      description: [
        { type: "narration", text: "치한이 주위를 두리번거린다." },
        { type: "dialogue", speaker: "groper", text: "정보? 헤헤... 그래, 좋아. 알려줄게." },
        { type: "dialogue", speaker: "groper", text: "난 밤에 잘 못 자거든. 그래서 많이 봐. 많이 들어." },
        { type: "narration", text: "그가 목소리를 낮춘다." },
        { type: "dialogue", speaker: "groper", text: "**간수들 중에 하나**가 있어. 새벽 2시에 혼자 순찰 도는 놈. 그 놈, 항상 **의무실**에서 한 시간씩 사라져." },
        { type: "dialogue", speaker: "groper", text: "거기서 뭘 하는지는 모르겠어. 근데 그 한 시간 동안은... 복도가 텅 비어. 알겠어?" },
      ],
      effects: [{ type: "setFlag", flag: "knowPatrolGap" }],
      actions: [
        {
          id: "thank_leave",
          text: "고맙다고 하고 자리를 뜬다.",
          nextScene: "first_night"
        }
      ]
    },

    // ===== 방화범과의 낮 대화 =====
    talk_arsonist_day: {
      title: "방화범과의 대화",
      location: "cell",
      description: [
        { type: "narration", text: "방화범이 멍하니 허공을 바라보고 있다. 가까이 다가가자 그가 천천히 고개를 돌린다." },
        { type: "narration", text: "얼굴 왼편의 화상 자국이 처참하다. 녹아내린 것처럼 일그러진 피부가 눈 아래까지 퍼져 있다." },
        { type: "dialogue", speaker: "arsonist", text: "...뭐야. 뭘 봐." },
        { type: "narration", text: "그의 눈빛이 순간 날카롭게 빛나다가, 이내 흐릿해진다." },
        { type: "dialogue", speaker: "arsonist", text: "아... 새로 온 녀석이구나. 이상한 게임 만든." },
        { type: "narration", text: "그가 손가락을 튕긴다. 마치 성냥에 불을 붙이는 동작처럼." },
        { type: "dialogue", speaker: "arsonist", text: "불... 좋아해? 난 좋아해. 세상에서 제일 아름다운 게 불이야." }
      ],
      actions: [
        {
          id: "ask_arsonist_face",
          text: "얼굴 상처에 대해 묻는다.",
          nextScene: "arsonist_reject_talk",
          effects: [{ type: "increaseRelation", target: "arsonist" }]
        },
        {
          id: "ask_arsonist_crime",
          text: "무슨 죄로 들어왔는지 묻는다.",
          nextScene: "arsonist_reject_talk",
          effects: [{ type: "increaseRelation", target: "arsonist" }]
        },
        {
          id: "leave_arsonist",
          text: "위험해 보인다. 자리를 뜬다.",
          nextScene: "cell_observe"
        }
      ]
    },

    arsonist_reject_talk: {
      title: "거부",
      location: "cell",
      description: [
        { type: "narration", text: "방화범의 눈빛이 차갑게 변한다." },
        { type: "dialogue", speaker: "arsonist", text: "...처음 보는 년이 참 궁금한 게 많네." },
        { type: "narration", text: "그가 손가락으로 당신을 가리킨다." },
        { type: "dialogue", speaker: "arsonist", text: "내 얘기가 듣고 싶어? 그럼 뭔가 줘. 세상에 공짜는 없어." },
        { type: "narration", text: "그가 다시 허공을 바라본다. 하지만 당신에게 관심을 갖긴 한 모양이다." }
      ],
      actions: [
        {
          id: "leave",
          text: "자리를 뜬다.",
          nextScene: "cell_observe"
        }
      ]
    },

    // 기름 전달 후에만 접근 가능한 방화범 이야기 장면들
    arsonist_scar: {
      title: "방화범의 상처",
      location: "workshop",
      description: [
        { type: "narration", text: "방화범이 일그러진 얼굴을 손으로 쓸어내린다. 눈빛이 묘하게 그리워하는 듯하다." },
        { type: "dialogue", speaker: "arsonist", text: "이거? 내 첫 번째 작품에서 받은 선물이야." },
        { type: "dialogue", speaker: "arsonist", text: "열일곱 살 때... 우리 집을 태웠어. 아버지가 잠든 밤에." },
        { type: "narration", text: "그가 눈을 감고 회상한다." },
        { type: "dialogue", speaker: "arsonist", text: "그 인간은... 매일 나를 때렸거든. 엄마는 도망갔고, 나만 남았어. 지하실에 가둬놓고... 담배불로 지지고..." },
        { type: "narration", text: "그의 손이 떨린다." },
        { type: "dialogue", speaker: "arsonist", text: "근데 불이 붙는 순간... 처음으로 **힘**을 느꼈어. 내가 통제하는 거잖아. 그 인간이 비명을 지르면서 타들어가는 걸 봤을 때..." },
        { type: "dialogue", speaker: "arsonist", text: "눈을 뗄 수가 없었어. 너무 아름다웠거든. 근데 들보가 무너지면서 나도 맞았어. 헤헤..." },
        { type: "narration", text: "그가 상처를 쓰다듬으며 광기 어린 미소를 짓는다." },
        { type: "dialogue", speaker: "arsonist", text: "아프지 않았어. 불은... 날 정화해준 거야." }
      ],
      actions: [
        {
          id: "ask_more_fires",
          text: "다른 불도 질렀는지 묻는다.",
          nextScene: "arsonist_crime"
        },
        {
          id: "leave_scared",
          text: "소름이 끼쳐 자리를 뜬다.",
          nextScene: "day_three_afternoon"
        }
      ]
    },

    arsonist_crime: {
      title: "방화범의 죄",
      location: "workshop",
      description: [
        { type: "narration", text: "방화범의 눈이 반짝인다. 마치 가장 자랑스러운 이야기를 꺼내는 것처럼." },
        { type: "dialogue", speaker: "arsonist", text: "내가 왜 여기 있는지 알아? 공장 세 개, 아파트 한 동, 그리고... 고아원 하나." },
        { type: "narration", text: "고아원이라는 단어에 당신의 등골이 서늘해진다." },
        { type: "dialogue", speaker: "arsonist", text: "고아원은... 계획에 없었어. 근데 바로 옆에 있었거든. 불이 번졌어. 내 잘못이 아니야." },
        { type: "narration", text: "그가 잠시 멈칫한다. 눈빛에 찰나의 고통이 스친다." },
        { type: "dialogue", speaker: "arsonist", text: "...아이들이 열두 명 죽었어. 검사가 사진을 보여줬는데... 다 까맣게 타 있었어." },
        { type: "dialogue", speaker: "arsonist", text: "그때부터 가끔 꿈을 꿔. 아이들이 불타면서... 나를 부르는 꿈." },
        { type: "narration", text: "그가 머리를 세게 흔든다." },
        { type: "dialogue", speaker: "arsonist", text: "!!닥쳐!! 시끄럽다고... 시끄럽다고!!" },
        { type: "narration", text: "그가 갑자기 소리를 지르며 머리를 쥐어뜯는다." }
      ],
      actions: [
        {
          id: "calm_down",
          text: "진정시키려 한다.",
          effects: [{ type: "increaseRelation", target: "arsonist" }],
          nextScene: "arsonist_calm"
        },
        {
          id: "back_away",
          text: "조용히 물러난다.",
          nextScene: "day_three_afternoon"
        }
      ]
    },

    arsonist_calm: {
      title: "진정",
      location: "workshop",
      description: [
        { type: "narration", text: "당신이 조심스럽게 어깨를 터치하자, 방화범이 멈칫한다." },
        { type: "dialogue", speaker: "arsonist", text: "...미안. 가끔 이래. 목소리가... 들려서." },
        { type: "narration", text: "그가 숨을 고르며 진정한다." },
        { type: "dialogue", speaker: "arsonist", text: "너는 정말 괜찮은 녀석이야. 다른 것들은 다 도망가거든." }
      ],
      actions: [
        {
          id: "continue",
          text: "고개를 끄덕인다.",
          nextScene: "day_three_afternoon"
        }
      ]
    },

    // ===== 캐릭터 갈등 씬 =====
    conflict_messiah_arsonist: {
      title: "대립",
      location: "cell",
      description: [
        { type: "narration", text: "갑자기 감방 안에 긴장감이 흐른다. 메시아가 방화범 앞에 서 있다." },
        { type: "dialogue", speaker: "messiah", text: "자매여, 네 안의 불꽃은 파괴가 아니라 정화를 위해 있어야 해. 내 말을 들어." },
        { type: "dialogue", speaker: "arsonist", text: "닥쳐. 난 네 '자매'가 아니야. 네 사이비 개소리 듣기 싫어." },
        { type: "narration", text: "방화범의 눈에 위험한 빛이 번쩍인다." },
        { type: "dialogue", speaker: "arsonist", text: "너도 태워버릴 거야. 언젠가. 네 그 거짓 예언자 같은 얼굴이 녹아내리는 걸 볼 거야." },
        { type: "dialogue", speaker: "messiah", text: "...불쌍한 영혼. 구원받지 못할 자는 스스로 불길 속에 뛰어들게 되어 있지." },
        { type: "narration", text: "둘 사이의 공기가 얼어붙는다. 다른 죄수들이 긴장하며 지켜본다." }
      ],
      actions: [
        {
          id: "intervene",
          text: "중재하려 한다.",
          nextScene: "conflict_mediate"
        },
        {
          id: "watch",
          text: "지켜본다.",
          nextScene: "conflict_watch"
        }
      ]
    },

    conflict_mediate: {
      title: "중재",
      location: "cell",
      description: [
        { type: "narration", text: "당신이 둘 사이에 끼어든다." },
        { type: "dialogue", speaker: "player", text: "그만해요. 둘 다. 간수들한테 들리면 어쩌려고." },
        { type: "narration", text: "메시아가 미소를 짓는다." },
        { type: "dialogue", speaker: "messiah", text: "평화의 사도로군. 네 말이 맞아, 자매여. 지금은 때가 아니지." },
        { type: "narration", text: "방화범이 코웃음을 치며 물러난다." },
        { type: "dialogue", speaker: "arsonist", text: "...다음에 보자. 둘 다." },
        { type: "narration", text: "갈등을 중재해서 두 사람 모두에게 인상을 남겼다." }
      ],
      effects: [{ type: "setFlag", flag: "conflictMediator" }],
      actions: [
        {
          id: "continue",
          text: "상황을 지켜본다.",
          nextScene: "first_night"
        }
      ]
    },

    conflict_watch: {
      title: "관망",
      location: "cell",
      description: [
        { type: "narration", text: "당신은 한 발 뒤로 물러서서 상황을 지켜본다." },
        { type: "dialogue", speaker: "political", text: "..." },
        { type: "narration", text: "정치범이 당신 옆으로 와서 조용히 속삭인다." },
        { type: "dialogue", speaker: "political", text: "저 둘은 원래 저래. 메시아가 방화범을 '구원'하겠다고 집착하거든. 방화범은 그게 싫고." },
        { type: "dialogue", speaker: "political", text: "언젠가 폭발할 거야. 그때 끼어들지 마. 다칠 뿐이니까." },
        { type: "narration", text: "결국 간수의 호루라기 소리에 둘은 물러난다." }
      ],
      actions: [
        {
          id: "continue",
          text: "침대로 돌아간다.",
          nextScene: "first_night"
        }
      ]
    },

    // ===== 4장: 첫째 날 밤 =====
    first_night: {
      title: "첫째 날 밤",
      location: "cell",
      description: [
        { type: "narration", text: "소등 시간이 되자 감방이 어둠에 잠긴다. 차가운 침대에 누워 천장을 바라본다." },
        { type: "narration", text: "여기저기서 코 고는 소리, 잠꼬대, 그리고 가끔씩 들리는 누군가의 흐느낌..." },
        { type: "narration", text: "오늘 만난 죄수들의 얼굴이 떠오른다. 광기 어린 메시아, 능글맞은 사기꾼, 불에 미친 방화범, 슬픔을 안은 정치범과 아내 살인범..." },
        { type: "narration", text: "당신은 생각한다. 이곳에서 **어떻게 살아남을 것인가**. 아니, 어떻게 **탈출할 것인가**." },
      ],
      actions: [
        {
          id: "listen",
          text: "귀를 귀울인다.",
          conditions: [{ type: "relationMin", target: "arsonist", value: 1 }],
          nextScene: "night_whisper"
        },
        {
          id: "ignore_sleep",
          text: "잠을 청한다.",
          nextScene: "day_two_morning"
        }
      ]
    },

    night_whisper: {
      title: "밤의 속삭임",
      location: "cell",
      description: [
        { type: "narration", text: "갑자기 옆 침대에서 속삭이는 소리가 들린다." },
        { type: "narration", text: "어둠 속에서 누군가 당신의 침대 옆으로 다가온다." },
        { type: "dialogue", speaker: "arsonist", text: "...자? 안 자지?" },
        { type: "narration", text: "방화범이다. 그의 눈이 어둠 속에서 이상하게 빛난다." },
        { type: "dialogue", speaker: "arsonist", text: "나... 이 수용소를 태울 거야. 조만간. 근데 네가 필요해." },
        { type: "dialogue", speaker: "arsonist", text: "불이 나면 혼란이 생기잖아. 그 틈에 도망치는 거야. 단, 나한테 **라이터 기름**이 필요해. 구할 수 있어?" }
      ],
      actions: [
        {
          id: "agree_arsonist",
          text: "\"알겠어! 도와줄게.\"",
          nextScene: "arsonist_agree",
          effects: [{ type: "setFlag", flag: "arsonistRoute" }]
        },
        {
          id: "refuse_arsonist",
          text: "\"미친 짓이야. 사람들이 죽어.\"",
          nextScene: "arsonist_refuse"
        },
        {
          id: "pretend_sleep",
          text: "자는 척한다.",
          nextScene: "arsonist_ignore"
        }
      ]
    },

    arsonist_agree: {
      title: "방화 계획",
      location: "cell",
      description: [
        { type: "narration", text: "방화범의 얼굴에 광기 어린 미소가 번진다." },
        { type: "dialogue", speaker: "arsonist", text: "좋아, 좋아... 역시 넌 말을 잘 알아먹을 것 같았어." },
        { type: "dialogue", speaker: "arsonist", text: "작업장에 가면 기계에 쓰는 기름이 있어. 그거 좀 빼돌려 줘. 나머지는 내가 할게." },
        { type: "dialogue", speaker: "arsonist", text: "아름다울 거야... 이 썩은 곳이 불타는 모습. 히히..." },
        { type: "narration", text: "그가 어둠 속으로 사라진다." }
      ],
      actions: [
        {
          id: "sleep",
          text: "불안한 마음으로 잠을 청한다.",
          nextScene: "day_two_morning"
        }
      ]
    },

    arsonist_refuse: {
      title: "거부",
      location: "cell",
      description: [
        { type: "dialogue", speaker: "arsonist", text: "죽어? 하하... 그게 뭐가 문제야? 여기 있는 년들 다 죽어 마땅한 쓰레기들인데." },
        { type: "narration", text: "방화범의 눈빛이 차갑게 변한다." },
        { type: "dialogue", speaker: "arsonist", text: "넌 모르는 거야. 불의 정화를... 뭐, 싫으면 가만히 있으라고."},
        { type: "dialogue", speaker: "arsonist", text: "만약 방해하면 넌 통구이 일순위다." },
        { type: "narration", text: "그가 자신의 침대로 돌아간다. 등골이 서늘해진다." },
      ],
      effects: [{ type: "setFlag", flag: "arsonistEnemy" }],
      actions: [
        {
          id: "sleep",
          text: "뒤척이다 잠이 든다.",
          nextScene: "day_two_morning"
        }
      ]
    },

    arsonist_ignore: {
      title: "무시",
      location: "cell",
      description: [
        { type: "narration", text: "당신은 눈을 꼭 감고 자는 척한다." },
        { type: "dialogue", speaker: "arsonist", text: "...쳇. 재미없는 년." },
        { type: "narration", text: "방화범이 투덜거리며 돌아간다. 한참이 지나서야 심장 박동이 가라앉는다." }
      ],
      actions: [
        {
          id: "sleep",
          text: "그제야 잠이 든다.",
          nextScene: "day_two_morning"
        }
      ]
    },

    // ===== 5장: 둘째 날 =====
    day_two_morning: {
      title: "둘째 날 아침",
      location: "cell",
      description: [
        { type: "narration", text: "새벽을 알리는 사이렌 소리에 눈을 뜬다." },
        { type: "dialogue", speaker: "guard", text: "기상! 5분 안에 점호다!" },
        { type: "narration", text: "죄수들이 하나둘 침대에서 일어난다. 피곤한 첫날밤이었다." },
        { type: "narration", text: "오늘의 일과가 시작된다. **작업장**으로 갈지, **운동장**으로 갈지 선택해야 한다." },
        { type: "dialogue", speaker: "fraudster", text: "작업장은 힘들지만 유용한 물건을 구할 수 있어. 운동장은 편하지만 간수들 눈이 많아." }
      ],
      actions: [
        {
          id: "workshop",
          text: "작업장으로 간다.",
          nextScene: "workshop"
        },
        {
          id: "yard",
          text: "운동장으로 간다.",
          nextScene: "yard"
        }
      ]
    },

    workshop: {
      title: "작업장",
      location: "workshop",
      description: [
        { type: "narration", text: "작업장은 기름 냄새와 금속 소리로 가득하다. 죄수들이 기계 앞에서 단순 작업을 반복하고 있다." },
        { type: "narration", text: "당신은 프레스 기계 앞에 배치된다. 단조로운 작업이지만, 주변을 살펴볼 기회가 있다." },
        { type: "narration", text: "구석에 {{기름통}}이 쌓여 있고, 벽에는 **공구들**이 걸려 있다. 감시하는 간수는 졸고 있다." }
      ],
      actions: [
        {
          id: "groper_revenge",
          text: "작업에 집중한다.",
          conditions: [{ type: "flagSet", flag: "groperEnemy" }],
          nextScene: "gameover_groper_trap"
        },
        {
          id: "steal_oil",
          text: "기름을 몰래 빼돌린다.",
          conditions: [
            { type: "flagSet", flag: "arsonistRoute" },
            { type: "flagNotSet", flag: "groperEnemy" }
          ],
          nextScene: "workshop_steal_oil",
          effects: [{ type: "addItem", item: "라이터 기름" }]
        },
        {
          id: "steal_tool",
          text: "작은 공구를 숨긴다.",
          conditions: [{ type: "flagNotSet", flag: "groperEnemy" }],
          nextScene: "workshop_steal_tool",
          effects: [{ type: "addItem", item: "작은 드라이버" }]
        },
        {
          id: "work_normally",
          text: "묵묵히 작업만 한다.",
          conditions: [{ type: "flagNotSet", flag: "groperEnemy" }],
          nextScene: "workshop_normal"
        }
      ]
    },

    workshop_steal_oil: {
      title: "기름 확보",
      location: "workshop",
      description: [
        { type: "narration", text: "간수가 졸고 있는 틈을 타 기름통에 다가간다." },
        { type: "narration", text: "주머니에 숨겨온 작은 병에 기름을 조금씩 옮겨 담는다. 심장이 터질 것 같다." },
        { type: "narration", text: "다행히 아무도 눈치채지 못했다. 라이터 기름을 획득했다." },
        { type: "dialogue", speaker: "arsonist", text: "..." },
        { type: "narration", text: "멀리서 방화범이 당신을 보며 고개를 끄덕인다." }
      ],
      actions: [
        {
          id: "continue",
          text: "아무 일 없던 듯 작업을 계속한다.",
          nextScene: "day_two_evening"
        }
      ]
    },

    workshop_steal_tool: {
      title: "공구 확보",
      location: "workshop",
      description: [
        { type: "narration", text: "공구 벽 앞을 지나가는 척하며 작은 드라이버 하나를 소매 안에 숨긴다." },
        { type: "narration", text: "심장이 빠르게 뛴다. 하지만 아무도 눈치채지 못한 것 같다." },
        { type: "narration", text: "이 드라이버로 나사를 풀거나 간단한 자물쇠를 딸 수 있을지도 모른다." }
      ],
      actions: [
        {
          id: "continue",
          text: "작업을 계속한다.",
          nextScene: "day_two_evening"
        }
      ]
    },

    workshop_normal: {
      title: "평범한 작업",
      location: "workshop",
      description: [
        { type: "narration", text: "당신은 위험을 감수하지 않기로 한다. 묵묵히 기계를 작동시키며 시간을 보낸다." },
        { type: "narration", text: "옆에서 일하던 아내 살인범이 말없이 당신을 힐끗 본다." },
        { type: "dialogue", speaker: "wifekiller", text: "...현명한 선택이야. 여기선 조심해야 해." },
        { type: "narration", text: "그것이 그가 당신에게 건넨 첫 마디였다." }
      ],
      actions: [
        {
          id: "talk_wifekiller",
          text: "그에게 말을 건다.",
          nextScene: "talk_wifekiller"
        },
        {
          id: "continue",
          text: "고개만 끄덕이고 작업을 계속한다.",
          nextScene: "day_two_evening"
        }
      ]
    },

    talk_wifekiller: {
      title: "아내 살인범과의 대화",
      location: "workshop",
      description: [
        { type: "narration", text: "당신이 말을 걸자, 그가 잠시 손을 멈추고 당신을 본다." },
        { type: "dialogue", speaker: "wifekiller", text: "...뭐야. 또 왔어?" },
        { type: "narration", text: "말투는 퉁명스럽지만, 어제보다 경계심이 덜하다." }
      ],
      actions: [
        {
          id: "ask_story_deep",
          text: "\"그날 밤 무슨 일이 있었는지... 들어도 될까요?\"",
          nextScene: "wifekiller_story_day2",
          conditions: [{ type: "relationMin", target: "wifekiller", value: 2 }],
          effects: [{ type: "increaseRelation", target: "wifekiller" }]
        },
        {
          id: "sympathize",
          text: "\"억울한 일을 당했다는 건 알겠어요.\"",
          nextScene: "wifekiller_sympathy",
          effects: [
            { type: "setFlag", flag: "wifekillerFriend" },
            { type: "increaseRelation", target: "wifekiller" }
          ]
        },
        {
          id: "leave",
          text: "\"아무것도 아니에요.\" 자리를 피한다.",
          nextScene: "day_two_evening"
        }
      ]
    },

    wifekiller_story_day2: {
      title: "아내 살인범의 진실",
      location: "workshop",
      description: [
        { type: "narration", text: "그가 잠시 주위를 살핀다. 아무도 듣고 있지 않다는 걸 확인한 후, 낮은 목소리로 말하기 시작한다." },
        { type: "dialogue", speaker: "wifekiller", text: "...왜 알고 싶어?" },
        { type: "narration", text: "당신이 대답하기 전에, 그가 먼저 입을 연다." },
        { type: "dialogue", speaker: "wifekiller", text: "난 평범한 가장이었어. 작은 식당을 했지. 아내와 다섯 살 아들이 있었고." },
        { type: "dialogue", speaker: "wifekiller", text: "아내가... 변했어. 술을 마시기 시작했고, 날 때리기 시작했어. 나중엔 아들도." },
        { type: "narration", text: "그의 손이 떨린다." },
        { type: "dialogue", speaker: "wifekiller", text: "어느 날 밤... 아내가 칼을 들고 아들 방에 들어갔어. '네가 없으면 다 해결돼'라고 소리치면서." },
        { type: "dialogue", speaker: "wifekiller", text: "난... 뛰어들었어. 칼을 막다가 손을 베였고, 아내를 밀쳤어. 그녀가 넘어지면서... 머리를 부딪혔어." },
        { type: "narration", text: "그가 손등의 오래된 흉터를 내려다본다." },
        { type: "dialogue", speaker: "wifekiller", text: "정당방위였어. 분명히. 근데 아내 집안이 부자였고, 판사를 샀어. 난... 살인범이 됐지." },
        { type: "dialogue", speaker: "wifekiller", text: "아들은 지금 아내 부모 밑에서 자라고 있어. 날 살인자라고 배우면서. 면회도 못 오게 해." },
        { type: "narration", text: "긴 침묵이 흐른다." },
        { type: "dialogue", speaker: "wifekiller", text: "...왜 네한테 이런 얘기를 했는지 모르겠군. 네가 물어봐서? 아니면..." },
        { type: "narration", text: "그가 당신을 빤히 바라본다." },
        { type: "dialogue", speaker: "wifekiller", text: "넌 다른 놈들과 달라. 여기서 10년을 보내면 사람 보는 눈이 생겨." },
        { type: "dialogue", speaker: "wifekiller", text: "네가 탈출하고 싶다면... 도와줄 수 있어. 난 여기서 나가도 갈 곳이 없지만, 네가 성공하는 건 보고 싶거든." },
        { type: "dialogue", speaker: "wifekiller", text: "필요하면 말해. **지하 구조도**를 그려줄 수 있어." }
      ],
      effects: [{ type: "setFlag", flag: "wifekillerFriend" }],
      actions: [
        {
          id: "thank",
          text: "진심으로 감사를 표한다.",
          nextScene: "day_two_evening"
        }
      ]
    },

    wifekiller_sympathy: {
      title: "동정",
      location: "workshop",
      description: [
        { type: "narration", text: "당신의 말에 그가 잠시 멈춘다." },
        { type: "dialogue", speaker: "wifekiller", text: "...억울하다고? 그래, 억울하지." },
        { type: "narration", text: "그가 주위를 살피며 목소리를 낮춘다." },
        { type: "dialogue", speaker: "wifekiller", text: "네가 탈출을 계획하고 있다면... 도와줄 수 있어. 난 밖에 나가도 의미없지만, 네가 성공하는 건 보고 싶거든." },
        { type: "dialogue", speaker: "wifekiller", text: "난 이 수용소에서 10년을 보냈어. **구조와 경비 패턴**을 다 알고 있지. 필요하면 말해." },
      ],
      actions: [
        {
          id: "continue",
          text: "감사를 표하고 작업을 계속한다.",
          nextScene: "day_two_evening"
        }
      ]
    },

    yard: {
      title: "운동장",
      location: "yard",
      description: [
        { type: "narration", text: "운동장은 높은 담벼락으로 둘러싸여 있다. 하늘이 보이는 유일한 장소이다." },
        { type: "narration", text: "여기저기서 죄수들이 운동을 하거나 무리 지어 이야기를 나누고 있다." },
        { type: "narration", text: "구석에서 **메시아**가 몇몇 추종자들에게 무언가를 설교하고 있다." },
        { type: "narration", text: "반대편에서는 **소아성폭력범**이 혼자 웅크리고 앉아 있다. 다른 죄수들이 그를 피하는 게 보인다." },
        { type: "narration", text: "간수 한 명이 당신을 유독 노려보며 다가온다." },
        { type: "dialogue", speaker: "guard", text: "야, 변태 새끼. 뭘 빤히 쳐다봐? 눈깔 빼버릴까?" }
      ],
      actions: [
        {
          id: "insult_guard",
          text: "\"당신이나 거울 좀 보시지.\"",
          nextScene: "gameover_guard_murder"
        },
        {
          id: "bow_guard",
          text: "고개를 숙이고 사과한다.",
          nextScene: "yard_bow_guard"
        },
        {
          id: "join_messiah",
          text: "조용히 메시아 쪽으로 피한다.",
          nextScene: "yard_messiah"
        },
        {
          id: "approach_pedophile",
          text: "소아성폭력범에게 다가간다.",
          nextScene: "yard_pedophile"
        },
        {
          id: "walk_alone",
          text: "혼자 운동장을 걷는다.",
          nextScene: "yard_walk"
        }
      ]
    },

    yard_bow_guard: {
      title: "굴복",
      location: "yard",
      description: [
        { type: "narration", text: "당신은 재빨리 고개를 숙인다." },
        { type: "dialogue", speaker: "player", text: "죄송합니다..." },
        { type: "dialogue", speaker: "guard", text: "흥. 그래도 예의는 아는군. 다음엔 눈을 어디에 두는지 조심해." },
        { type: "narration", text: "간수가 코웃음을 치며 돌아선다. 등에서 식은땀이 흐른다." },
        { type: "narration", text: "굴욕적이지만, 목숨을 건졌다." }
      ],
      actions: [
        {
          id: "continue_yard",
          text: "운동장에서 시간을 보낸다.",
          nextScene: "yard_walk"
        }
      ]
    },

    yard_messiah: {
      title: "메시아의 설교",
      location: "yard",
      description: [
        { type: "narration", text: "메시아가 당신이 다가오는 것을 보고 미소 짓는다." },
        { type: "dialogue", speaker: "messiah", text: "새로운 양이 왔군. 어서 와라, 자매여." },
        { type: "narration", text: "그의 주변에는 다섯 명 정도의 죄수들이 경건한 표정으로 앉아 있다." },
        { type: "dialogue", speaker: "messiah", text: "우리는 곧 이 지옥에서 벗어날 것이다. 밖에 있는 우리 형제자매들이 준비를 마치면... 구원의 날이 올 것이니." },
        { type: "dialogue", speaker: "messiah", text: "불신자들은 이곳에 남겨질 것이고, 믿는 자들만이 새로운 세상을 맞이하리라." },
        { type: "narration", text: "광기일까, 아니면 정말 무언가를 알고 있는 걸까?" }
      ],
      actions: [
        {
          id: "ask_plan",
          text: "계획에 대해 물어본다.",
          conditions: [{ type: "flagSet", flag: "messiahRoute" }],
          nextScene: "messiah_plan_detail"
        },
        {
          id: "listen_more",
          text: "조용히 듣고만 있는다.",
          nextScene: "day_two_evening"
        },
        {
          id: "leave_sermon",
          text: "슬쩍 자리를 뜬다.",
          nextScene: "yard"
        }
      ]
    },

    messiah_plan_detail: {
      title: "계획의 상세",
      location: "yard",
      description: [
        { type: "narration", text: "메시아가 당신을 옆으로 데려가 낮은 목소리로 속삭인다." },
        { type: "dialogue", speaker: "messiah", text: "네가 나를 믿기로 했으니 알려주지." },
        { type: "dialogue", speaker: "messiah", text: "**내일 밤**, 밖에서 우리 신도들이 움직인다. 정전을 일으키고, 그 혼란 속에서 **환기구**를 통해 탈출하는 거야." },
        { type: "dialogue", speaker: "messiah", text: "문제는 환기구 잠금장치야. 내부에서 열어야 하는데... {{특수 열쇠}}가 필요해. 간수장이 가지고 있지." },
        { type: "dialogue", speaker: "messiah", text: "그 열쇠를 구할 방법을 찾아야 해. 도울 수 있겠나, 자매여?" }
      ],
      actions: [
        {
          id: "accept_mission",
          text: "열쇠를 구해보겠다고 한다.",
          nextScene: "messiah_mission_accept",
          effects: [{ type: "setFlag", flag: "messiahKeyMission" }]
        },
        {
          id: "need_time",
          text: "생각할 시간이 필요하다고 한다.",
          nextScene: "day_two_evening"
        }
      ]
    },

    messiah_mission_accept: {
      title: "임무 수락",
      location: "yard",
      description: [
        { type: "dialogue", speaker: "messiah", text: "훌륭해, 자매여. 네 믿음은 반드시 보상받을 것이다." },
        { type: "dialogue", speaker: "messiah", text: "간수장은 매일 저녁 **의무실**에 들른다고 해. 그때가 기회일 거야." },
        { type: "narration", text: "메시아가 당신의 어깨를 두드린다." },
        { type: "dialogue", speaker: "messiah", text: "내일 저녁까지 열쇠를 구해와. 구원은 가까워졌다..." }
      ],
      actions: [
        {
          id: "continue",
          text: "고개를 끄덕이고 물러난다.",
          nextScene: "day_two_evening"
        }
      ]
    },

    yard_pedophile: {
      title: "소아성폭력범",
      location: "yard",
      description: [
        { type: "narration", text: "당신이 다가가자, 왜소한 안경잡이가 웅크린 몸을 일으키며 위협적인 자세를 취한다. 하지만 이내 주변 간수들의 눈치를 보며 어깨를 움츠린다." },
        { type: "dialogue", speaker: "pedophile", text: "뭐야, 또 시비 걸러 왔어? 나도 참는 데 한계가 있다고." },
        { type: "narration", text: "그의 눈에는 여전히 피어오르지 못한 불꽃이 일렁인다. 린치로 인해 억눌려 있지만, 기회만 있다면 누구든 물어뜯을 기세다." }
      ],
      actions: [
        { id: "show_kindness", text: "괜찮다며 옆에 앉는다.", nextScene: "pedophile_kind" },
        { id: "leave_disgust", text: "역겹다는 듯 돌아선다.", nextScene: "yard" },
        { id: "ask_info", text: "정보를 대가로 보호해주겠다고 제안한다.", nextScene: "pedophile_deal" }
      ]
    },

    pedophile_kind: {
      title: "연민",
      location: "yard",
      description: [
        { type: "narration", text: "당신이 옆에 앉자, 그의 어깨 근육이 눈에 띄게 경직된다. 몸은 본능적으로 타격에 대비하듯 웅크려지지만, 눈빛만은 짐승처럼 날카롭게 당신을 훑는다." },
        { type: "dialogue", speaker: "pedophile", text: "어이, 적당히 해. 나도 언제까지고 처맞고만 있을 생각 없으니까. 용건 없으면 꺼져." },
        { type: "narration", text: "그는 침을 뱉으며 주먹을 꽉 쥔다." },
        { type: "dialogue", speaker: "pedophile", text: "...나? 그래, 뉴스에서 봤겠지.  내 앞길은 창창했고, 난 내가 원하는 건 뭐든 가질 자격이 있다고 믿었어. 그게 아이들이었을 뿐이지." },
        { type: "dialogue", speaker: "pedophile", text: "괴물? 하, 밖에서는 다들 내 앞에서 고개를 조아렸어. 여기 들어오자마자 이 꼴이 됐지만... 젠장, 이 빚은 언젠가 반드시 이 수용소 놈들 목구멍에 돌려줄 거야." },
        { type: "narration", text: "그의 눈에는 후회 대신 억눌린 분노와 뒤틀린 자부심이 일렁인다." }
      ],
      actions: [
        {
          id: "leave_silent",
          text: "아무 말 없이 자리를 뜬다.",
          nextScene: "day_two_evening"
        }
      ]
    },

    pedophile_deal: {
      title: "거래 제안",
      location: "yard",
      description: [
        { type: "narration", text: "당신의 제안에 그가 코웃음을 친다. 하지만 눈빛은 예리하게 빛난다." },
        { type: "dialogue", speaker: "pedophile", text: "보호? 웃기지 마. 여긴 누구도 믿을 수 없어. 하지만... 네가 쓸모 있는 놈이라면 이야기는 달라지지." },
        { type: "dialogue", speaker: "pedophile", text: "좋아, 비즈니스라고 치지. 내가 본 게 꽤 많거든. 아무도 나를 사람 취급 안 하니까 오히려 편하더라고." },
        { type: "narration", text: "그는 낮고 거친 목소리로 수용소의 비밀을 털어놓기 시작한다." },
        { type: "dialogue", speaker: "pedophile", text: "**지하 2층 창고**... 거기 환기 덕트가 외부로 연결돼 있어. 작은 사람은 빠져나갈 수 있을지도 몰라." }
      ],
      effects: [
        { type: "setFlag", flag: "helpedPedophile" },
        { type: "increaseRelation", target: "pedophile" },
        { type: "setFlag", flag: "knowVentDuct" },
      ],
      actions: [
        {
          id: "thank_leave",
          text: "정보에 감사하고 자리를 뜬다.",
          nextScene: "day_two_evening"
        }
      ]
    },

    yard_walk: {
      title: "산책",
      location: "yard",
      description: [
        { type: "narration", text: "당신은 혼자 운동장 가장자리를 걷는다. 높은 담벼락 위로 철조망이 보인다." },
        { type: "narration", text: "감시탑에서 간수가 망원경으로 이쪽을 보고 있다. 도망칠 틈은 없어 보인다." },
        { type: "narration", text: "담벼락 아래에서 이상한 것을 발견한다. 콘크리트 벽에 **금이 가 있다**. 오래된 균열인 것 같다." }
      ],
      actions: [
        {
          id: "examine_crack",
          text: "균열을 자세히 살펴본다.",
          nextScene: "yard_crack",
          effects: [{ type: "setFlag", flag: "knowWallCrack" }]
        },
        {
          id: "ignore_crack",
          text: "무시하고 계속 걷는다.",
          nextScene: "day_two_evening"
        }
      ]
    },

    yard_crack: {
      title: "벽의 균열",
      location: "yard",
      description: [
        { type: "narration", text: "몸을 숙여 스트레칭하는 척하며 균열을 살펴본다." },
        { type: "narration", text: "균열은 생각보다 깊다. 손가락을 넣으면 콘크리트 조각이 부서져 나온다." },
        { type: "narration", text: "시간을 들여 파면... 어쩌면 담벼락을 뚫을 수 있을지도 모른다. 하지만 혼자서는 무리이다." },
      ],
      actions: [
        {
          id: "continue",
          text: "자리를 뜬다.",
          nextScene: "day_two_evening"
        }
      ]
    },

    // ===== 6장: 둘째 날 저녁 =====
    day_two_evening: {
      title: "둘째 날 저녁",
      location: "cell",
      description: [
        { type: "narration", text: "저녁 식사 시간이다. 맛없는 죽과 딱딱한 빵이 배급된다." },
        { type: "narration", text: "당신은 지금까지 모은 정보들을 정리한다. 탈출의 기회는 있어 보인다." },
        { type: "narration", text: "하지만 아직 시간이 있다. 내일 더 많은 정보를 모을 수 있을지도 모른다." }
      ],
      actions: [
        {
          id: "sleep_early",
          text: "일찍 잠자리에 든다.",
          nextScene: "day_three_morning"
        },
        {
          id: "night_activity",
          text: "밤에 감방을 살펴본다.",
          nextScene: "day_two_night_explore"
        }
      ]
    },

    day_two_night_explore: {
      title: "밤의 탐색",
      location: "cell",
      description: [
        { type: "narration", text: "다른 죄수들이 잠든 틈을 타 감방 안을 조용히 살펴본다." },
        { type: "narration", text: "창살 사이로 복도를 내다본다. 간수의 발소리가 규칙적으로 들린다." },
        { type: "narration", text: "순찰 간격을 세어본다. 대략 **15분**마다 지나가는 것 같다." }
      ],
      actions: [
        {
          id: "talk_political_night",
          text: "아직 깨어있는 정치범에게 말을 건다.",
          conditions: [{ type: "flagSet", flag: "politicalFriend" }],
          nextScene: "political_night_talk"
        },
        {
          id: "sleep",
          text: "정보를 머릿속에 새기고 잠을 청한다.",
          nextScene: "day_three_morning"
        }
      ]
    },

    political_night_talk: {
      title: "정치범과의 밤 대화",
      location: "cell",
      description: [
        { type: "narration", text: "정치범이 책을 읽다 말고 당신을 바라본다." },
        { type: "dialogue", speaker: "political", text: "잠이 안 와? 나도 그래. 이곳에서 처음 몇 년은 매일 밤 악몽을 꿨지." },
        { type: "narration", text: "그가 책을 내려놓고 속삭인다." },
        { type: "dialogue", speaker: "political", text: "내가 알려준 정보... 쓸모가 있을 거야. 특히 **수요일 밤**을 기억해. 내일이 바로 수요일이야." },
        { type: "dialogue", speaker: "political", text: "간수장이 의무실에 가는 시간... 그때가 유일한 틈이야." },
      ],
      effects: [{ type: "setFlag", flag: "wednesdayConfirmed" }],
      actions: [
        {
          id: "thank_sleep",
          text: "감사를 표하고 잠자리에 든다.",
          nextScene: "day_three_morning"
        }
      ]
    },

    // ===== 7장: 셋째 날 - 결정의 날 =====
    day_three_morning: {
      title: "셋째 날 아침",
      location: "cell",
      description: [
        { type: "narration", text: "새벽을 찢는 사이렌 소리에 눈을 뜬다." },
        { type: "narration", text: "오늘은 **수요일**이다. 폭풍우의 전조인지 습한 공기가 피부에 들러붙는다." },
        { type: "dialogue", speaker: "guard", text: "기상! 오늘은 전원 작업장이다! 낙오자는 국물도 없을 줄 알아!" },
        { type: "narration", text: "간수들의 고함과 함께 죄수들이 좀비처럼 몸을 일으킨다." }
      ],
      actions: [
        {
          id: "go_workshop_event",
          text: "작업장으로 향한다.",
          conditions: [{ type: "flagSet", flag: "helpedPedophile" }],
          nextScene: "pedophile_attack"
        },
        {
          id: "go_workshop_normal",
          text: "작업장으로 향한다.",
          conditions: [{ type: "flagNotSet", flag: "helpedPedophile" }],
          nextScene: "day_three_workshop"
        }
      ]
    },

    pedophile_attack: {
      title: "린치",
      location: "cell",
      description: [
        { type: "narration", text: "갑자기 감방 구석에서 소란이 일어난다. 몇몇 죄수들이 소아성폭력범을 둘러싸고 있다." },
        { type: "dialogue", speaker: "unknown", text: "이 새끼, 아직도 눈깔 안 깔아? 확 뽑아버려!" },
        { type: "narration", text: "주먹과 발길이 날아온다. 그는 짐승 같은 신음 소리를 내며 악착같이 버티려 하지만, 숫자에 밀려 바닥으로 고꾸라진다." },
        { type: "dialogue", speaker: "pedophile", text: "죽여봐... 죽여보라고! 이 비겁한 새끼들아!" },
        { type: "narration", text: "그의 반항에 분노한 죄수들이 더 거세게 짓밟는다. 피가 콘크리트 바닥에 번진다." }
      ],
      actions: [
        { id: "help_pedophile", text: "말리려 한다.", nextScene: "pedophile_help" },
        { id: "ignore_attack", text: "모른 척한다.", nextScene: "pedophile_ignore" }
      ]
    },

    pedophile_help: {
      title: "구출",
      location: "cell",
      description: [
        { type: "narration", text: "당신이 끼어들어 소아성폭력범을 가린다." },
        { type: "dialogue", speaker: "player", text: "그만해! 진짜 죽일 셈이야?!" },
        { type: "narration", text: "죄수들이 당신을 노려보다 간수의 발소리에 흩어진다." },
        { type: "narration", text: "흩어지던 죄수 중 하나가 침을 뱉는다." },
        { type: "dialogue", speaker: "unknown", text: "아이들한테 그 짓을 한 놈을 감싸? 쓰레기끼리 잘 어울리네." },
        { type: "narration", text: "메시아가 멀리서 경멸 어린 눈으로 당신을 바라본다. 방화범과 아내 살인범도 고개를 돌린다." },
        { type: "narration", text: "소아성폭력범이 입가에 고인 피를 닦으며 당신을 올려다본다." },
        { type: "dialogue", speaker: "pedophile", text: "약속은 잘 지키는 친구네. 고마워." },
        { type: "narration", text: "그는 말을 잇는다." },
        { type: "dialogue", speaker: "pedophile", text: "보답으로 정보를 하나 더 주지." },
        { type: "dialogue", speaker: "pedophile", text: "**간수장이 여자 문제**로 협박당하고 있어. 누가 그 증거를 갖고 있는지는 모르겠지만...." },
      ],
      effects: [
        { type: "increaseRelation", target: "pedophile", amount: 2 },
        { type: "setFlag", flag: "knowWardenWeakness" },
        { type: "setFlag", flag: "defendedPedophile" },
        { type: "decreaseRelation", target: "messiah", amount: 3 },
        { type: "decreaseRelation", target: "wifekiller", amount: 3 },
        { type: "decreaseRelation", target: "arsonist", amount: 3 },
      ],
      actions: [
        { id: "continue", text: "작업장으로 향한다.", nextScene: "day_three_workshop_contempt" }
      ]
    },

    day_three_workshop_contempt: {
      title: "작업장 - 셋째 날",
      location: "workshop",
      description: [
        { type: "narration", text: "작업장의 기름 냄새가 익숙해졌다. 당신은 프레스 기계 앞에 선다." },
        { type: "narration", text: "당신이 지나가자 죄수들이 노골적으로 피한다. 몇몇은 침을 뱉는 시늉을 한다." },
        { type: "dialogue", speaker: "unknown", text: "저 새끼, 어린애한테 그 짓을 한 놈이랑 어울리더라." },
        { type: "narration", text: "메시아가 당신을 보자 고개를 돌린다. 방화범은 혐오스럽다는 듯 눈을 피한다." },
        { type: "narration", text: "아내 살인범마저 말없이 거리를 둔다. 이곳에서 소아성폭력범을 감싼 대가는 컸다." }
      ],
      actions: [
        {
          id: "work_observe",
          text: "묵묵히 일하면서 주변을 관찰한다.",
          nextScene: "day_three_observe"
        }
      ]
    },

    pedophile_ignore: {
      title: "외면",
      location: "cell",
      description: [
        { type: "narration", text: "당신은 눈을 돌린다. 이 지옥에서 남을 도울 여유 따위는 없다." },
        { type: "dialogue", speaker: "pedophile", text: "너, 지켜주겠다고 했잖아. 이 비겁한 새끼야! 으아악!" },
        { type: "narration", text: "비명이 점점 작아지다가, 결국 멈춘다." },
        { type: "narration", text: "한참 후, 간수가 와서 축 늘어진 소아성폭력범을 끌고 나간다." },
        { type: "dialogue", speaker: "guard", text: "또 자해냐... 귀찮게스리." },
        { type: "narration", text: "의무실로 끌려가는 그의 얼굴은 피투성이이다. 숨은 붙어 있는 것 같다." },
        { type: "narration", text: "다른 죄수들이 아무 일 없다는 듯 침대로 돌아간다." },
        { type: "dialogue", speaker: "political", text: "...이곳의 일상이야. 익숙해져." }
      ],
      effects: [{ type: "decreaseRelation", target: "pedophile", amount: 4 }],
      actions: [
        {
          id: "continue",
          text: "작업장으로 향한다.",
          nextScene: "day_three_workshop"
        }
      ]
    },

    day_three_workshop: {
      title: "작업장 - 셋째 날",
      location: "workshop",
      description: [
        { type: "narration", text: "작업장의 기름 냄새가 익숙해졌다. 당신은 프레스 기계 앞에 선다." },
        { type: "narration", text: "오늘따라 긴장감이 감돈다. 여러 죄수들이 당신을 힐끗힐끗 바라본다." }
      ],
      actions: [
        {
          id: "mediator_advantage",
          text: "메시아와 방화범 양쪽에 접근한다. (중재자의 이점)",
          conditions: [{ type: "flagSet", flag: "conflictMediator" }],
          nextScene: "day_three_mediator"
        },
        {
          id: "messiah_key_mission",
          text: "간수장의 열쇠를 노린다. (메시아 임무)",
          conditions: [{ type: "flagSet", flag: "messiahKeyMission" }],
          nextScene: "day_three_key_heist"
        },
        {
          id: "arsonist_final_prep",
          text: "방화범에게 마지막 확인을 한다.",
          conditions: [{ type: "flagSet", flag: "arsonistRoute" }],
          nextScene: "day_three_arsonist_prep"
        },
        {
          id: "fraudster_check",
          text: "사기꾼의 계획 진행 상황을 확인한다.",
          conditions: [{ type: "flagSet", flag: "fraudsterRoute" }],
          nextScene: "day_three_fraudster_check"
        },
        {
          id: "work_observe",
          text: "일하면서 주변을 관찰한다.",
          nextScene: "day_three_observe"
        }
      ]
    },

    day_three_mediator: {
      title: "중재자의 이점",
      location: "workshop",
      description: [
        { type: "narration", text: "당신이 첫날 메시아와 방화범 사이의 갈등을 중재한 것을 양쪽 모두 기억하고 있다." },
        { type: "narration", text: "메시아가 먼저 다가온다." },
        { type: "dialogue", speaker: "messiah", text: "평화의 사도여, 네가 우리 사이를 중재해준 것... 잊지 않았다." },
        { type: "dialogue", speaker: "messiah", text: "오늘 밤 우리의 탈출 계획에 함께해도 좋다. 원한다면." },
        { type: "narration", text: "방화범도 멀리서 당신을 바라보며 고개를 끄덕인다. 그도 당신을 인정하는 것 같다." },
        { type: "narration", text: "두 가지 계획에 모두 접근할 수 있게 되었다." }
      ],
      effects: [
        { type: "setFlag", flag: "messiahRoute" },
        { type: "setFlag", flag: "arsonistRoute" }
      ],
      actions: [
        {
          id: "choose_messiah",
          text: "메시아의 계획에 대해 더 듣는다.",
          nextScene: "mediator_messiah_detail"
        },
        {
          id: "choose_arsonist",
          text: "방화범의 계획에 대해 더 듣는다.",
          nextScene: "mediator_arsonist_detail"
        },
        {
          id: "keep_options",
          text: "둘 다 열어두고 관찰한다.",
          nextScene: "day_three_afternoon"
        }
      ]
    },

    mediator_messiah_detail: {
      title: "메시아의 계획",
      location: "workshop",
      description: [
        { type: "narration", text: "메시아가 당신을 구석으로 데려간다." },
        { type: "dialogue", speaker: "messiah", text: "오늘 밤 정전이 일어날 거야. 밖에 있는 내 신도들이 준비했지." },
        { type: "dialogue", speaker: "messiah", text: "문제는 환기구 잠금장치야. 간수장의 카드키가 필요해." },
        { type: "dialogue", speaker: "messiah", text: "네가 그걸 구해줄 수 있다면... 우리의 구원은 확실해진다." },
        { type: "narration", text: "[메시아 열쇠 임무 활성화]" }
      ],
      effects: [{ type: "setFlag", flag: "messiahKeyMission" }],
      actions: [
        {
          id: "accept",
          text: "열쇠를 구해보겠다고 한다.",
          nextScene: "day_three_key_heist"
        },
        {
          id: "consider",
          text: "다른 방법도 살펴본다.",
          nextScene: "day_three_afternoon"
        }
      ]
    },

    mediator_arsonist_detail: {
      title: "방화범의 계획",
      location: "workshop",
      description: [
        { type: "narration", text: "방화범이 기계 뒤로 당신을 부른다." },
        { type: "dialogue", speaker: "arsonist", text: "넌 날 무섭다고 도망가지 않았어. 그래서 믿을 수 있어." },
        { type: "dialogue", speaker: "arsonist", text: "오늘 밤 이 곳을 태울 거야. 불이 나면 혼란이 생기고, 그 틈에 도망치는 거지." },
        { type: "dialogue", speaker: "arsonist", text: "기름이 필요해. 작업장에 있잖아. 구해줄 수 있어?" },
        { type: "narration", text: "당신이 그를 중재했기에 그도 당신의 의견을 들을 것 같다." }
      ],
      effects: [{ type: "increaseRelation", target: "arsonist" }],
      actions: [
        {
          id: "get_oil",
          text: "기름을 구하러 간다.",
          nextScene: "workshop_steal_oil_mediator"
        },
        {
          id: "convince_safe",
          text: "피해를 줄이도록 설득한다.",
          nextScene: "arsonist_reconsider"
        },
        {
          id: "consider",
          text: "다른 방법도 살펴본다.",
          nextScene: "day_three_afternoon"
        }
      ]
    },

    workshop_steal_oil_mediator: {
      title: "기름 확보",
      location: "workshop",
      description: [
        { type: "narration", text: "간수가 졸고 있는 틈을 타 기름통에 다가간다." },
        { type: "narration", text: "작은 병에 기름을 조금씩 옮겨 담는다. 심장이 터질 것 같다." },
        { type: "narration", text: "다행히 아무도 눈치채지 못했다. 라이터 기름을 얻었다." }
      ],
      effects: [{ type: "addItem", item: "라이터 기름" }],
      actions: [
        {
          id: "continue",
          text: "기름을 숨기고 자리로 돌아간다.",
          nextScene: "day_three_arsonist_prep"
        }
      ]
    },

    day_three_key_heist: {
      title: "열쇠 작전",
      location: "workshop",
      description: [
        { type: "narration", text: "메시아의 임무를 수행할 때이다. 간수장의 열쇠를 손에 넣어야 한다." },
        { type: "narration", text: "점심시간, 간수장이 작업장을 순시한다. 허리춤에 열쇠 꾸러미가 달랑거린다." }
      ],
      actions: [
        {
          id: "use_key_knowledge",
          text: "열쇠 구조 지식을 활용해 기회를 노린다.",
          conditions: [{ type: "flagSet", flag: "knowKeyStructure" }],
          nextScene: "key_heist_success"
        },
        {
          id: "direct_steal",
          text: "직접 훔치려 한다.",
          nextScene: "key_heist_risky"
        },
        {
          id: "ask_help_pedophile",
          text: "소아성폭력범에게 주의를 끌어달라고 부탁한다.",
          conditions: [{ type: "flagSet", flag: "helpedPedophile" }],
          nextScene: "key_heist_distraction"
        }
      ]
    },

    key_heist_success: {
      title: "완벽한 작전",
      location: "workshop",
      description: [
        { type: "narration", text: "입소 첫날 관찰한 정보가 떠오른다. 큰 녹슨 열쇠, 작고 반짝이는 열쇠 둘, 그리고 카드키." },
        { type: "narration", text: "환기구를 여는 건 **카드키**일 것이다." },
        { type: "narration", text: "간수장이 기계를 점검하러 허리를 숙인 순간, 당신은 능숙하게 카드키만 빼돌린다." },
        { type: "narration", text: "열쇠 꾸러미 전체가 아니라 하나만 빠졌으니 금방 눈치채지 못할 것이다." },
        { type: "narration", text: "**환기구 카드키**를 획득했다." }
      ],
      effects: [
        { type: "addItem", item: "환기구 카드키" },
        { type: "setFlag", flag: "hasVentKey" }
      ],
      actions: [
        {
          id: "continue",
          text: "태연하게 작업을 계속한다.",
          nextScene: "day_three_afternoon"
        }
      ]
    },

    key_heist_risky: {
      title: "위험한 시도",
      location: "workshop",
      description: [
        { type: "narration", text: "간수장이 다른 곳을 볼 때, 열쇠 꾸러미에 손을 뻗는다." },
        { type: "narration", text: "손가락이 열쇠에 닿는 순간—" },
        { type: "dialogue", speaker: "warden", text: "뭐야, 이 새끼가?!" },
        { type: "narration", text: "간수장이 당신의 손목을 낚아챈다. 들켰다!" }
      ],
      actions: [
        {
          id: "excuse_leg",
          text: "\"다리가 아파서 넘어질 뻔했습니다...\"",
          conditions: [{ type: "flagSet", flag: "hurtLeg" }],
          nextScene: "key_heist_excuse_success"
        },
        {
          id: "excuse_normal",
          text: "변명을 시도한다.",
          nextScene: "key_heist_caught"
        }
      ]
    },

    key_heist_excuse_success: {
      title: "위기 모면",
      location: "workshop",
      description: [
        { type: "narration", text: "당신은 다리를 절뚝거리며 고통스러운 표정을 짓는다." },
        { type: "dialogue", speaker: "player", text: "죄송합니다... 첫날 맞은 다리가 아직도..." },
        { type: "narration", text: "간수장이 당신의 절뚝거리는 모습을 보며 코웃음을 친다." },
        { type: "dialogue", speaker: "warden", text: "쳇, 병신 같은 년. 꺼져." },
        { type: "narration", text: "위기를 넘겼다. 하지만 열쇠는 구하지 못했다." }
      ],
      actions: [
        {
          id: "continue",
          text: "조용히 물러난다.",
          nextScene: "day_three_afternoon"
        }
      ]
    },

    key_heist_caught: {
      title: "발각",
      location: "workshop",
      description: [
        { type: "narration", text: "간수장의 눈이 차갑게 빛난다." },
        { type: "dialogue", speaker: "warden", text: "열쇠를 노렸어? 이 새끼 탈옥 시도야. 독방행이다!" },
        { type: "narration", text: "간수들이 달려와 당신을 제압한다. 계획이 무너졌다." }
      ],
      actions: [
        {
          id: "to_solitary",
          text: "독방으로 끌려간다.",
          nextScene: "solitary_cell"
        }
      ]
    },

    key_heist_distraction: {
      title: "주의 분산",
      location: "workshop",
      description: [
        { type: "narration", text: "당신이 눈짓을 보내자, 소아성폭력범이 알아챈다." },
        { type: "narration", text: "그가 고개를 끄덕이고는 갑자기 기계에 손을 넣는다." },
        { type: "dialogue", speaker: "pedophile", text: "으아아악!!" },
        { type: "narration", text: "비명소리에 모든 시선이 그에게로 쏠린다. 간수장도 달려간다." },
        { type: "narration", text: "그 틈에 당신은 간수장의 책상에서 **여분의 카드키**를 발견하고 집어 든다." },
        { type: "dialogue", speaker: "pedophile", text: "(먼 곳에서) 괜찮아... 그냥 스친 거야..." },
        { type: "narration", text: "그가 당신을 힐끗 보며 미소 짓는다. 빚을 갚은 것이다." },
        { type: "narration", text: "**환기구 카드키**를 획득했다." }
      ],
      effects: [
        { type: "addItem", item: "환기구 카드키" },
        { type: "setFlag", flag: "hasVentKey" }
      ],
      actions: [
        {
          id: "continue",
          text: "소아성폭력범에게 감사의 눈빛을 보내고 자리로 돌아간다.",
          nextScene: "day_three_afternoon"
        }
      ]
    },

    day_three_arsonist_prep: {
      title: "방화범의 준비",
      location: "workshop",
      description: [
        { type: "narration", text: "방화범이 기계 뒤에서 당신을 기다리고 있다." },
        { type: "dialogue", speaker: "arsonist", text: "기름은 가져왔어? 오늘 밤이야. 오늘 밤 이 지옥을 태울 거야." },
        { type: "narration", text: "그의 눈이 광기로 빛난다." }
      ],
      actions: [
        {
          id: "give_oil",
          text: "기름을 건네준다.",
          conditions: [{ type: "hasItem", item: "라이터 기름" }],
          nextScene: "arsonist_ready"
        },
        {
          id: "no_oil",
          text: "\"아직 구하지 못했어...\"",
          nextScene: "arsonist_disappointed"
        },
        {
          id: "warn_arsonist",
          text: "\"사람들이 다칠 수 있어. 다시 생각해봐.\"",
          conditions: [{ type: "relationMin", target: "arsonist", value: 1 }],
          nextScene: "arsonist_reconsider"
        }
      ]
    },

    arsonist_ready: {
      title: "준비 완료",
      location: "workshop",
      description: [
        { type: "narration", text: "방화범이 기름을 받아들고 환하게 웃는다." },
        { type: "dialogue", speaker: "arsonist", text: "완벽해... 오늘 밤, 자정쯤에 시작할 거야. 불이 나면 동쪽 담벼락으로 와. 거기서 만나자." },
        { type: "narration", text: "그의 손이 기름병을 쓰다듬는다. 광기 어린 애정으로." },
        { type: "dialogue", speaker: "arsonist", text: "아름다울 거야..." },
        { type: "narration", text: "그가 당신을 빤히 바라본다. 평소와 다른, 기묘하게 맑은 눈빛이다." },
        { type: "dialogue", speaker: "arsonist", text: "...넌 날 도와줬어. 그러니까 이제 동료야. 뭐 궁금한 거 있어?" }
      ],
      effects: [{ type: "setFlag", flag: "arsonistReady"} , { type: "increaseRelation", target: "arsonist", amount: 2 }],
      actions: [
        {
          id: "ask_scar",
          text: "\"그 상처... 어떻게 생긴 거야?\"",
          nextScene: "arsonist_scar"
        },
        {
          id: "ask_crime",
          text: "\"왜 여기 들어온 거야?\"",
          nextScene: "arsonist_crime"
        },
        {
          id: "continue",
          text: "\"아무것도. 오늘 밤에 보자.\"",
          nextScene: "day_three_afternoon"
        }
      ]
    },

    arsonist_disappointed: {
      title: "실망",
      location: "workshop",
      description: [
        { type: "dialogue", speaker: "arsonist", text: "...뭐? 왜 못 구해? 도와준다면서?" },
        { type: "narration", text: "방화범의 얼굴이 일그러진다." },
        { type: "dialogue", speaker: "arsonist", text: "쓸모없는 년... 됐어, 내가 알아서 할게. 대신 네 몫은 없어." },
        { type: "narration", text: "그가 돌아선다." }
      ],
      effects: [{ type: "setFlag", flag: "arsonistAbandoned" }],
      actions: [
        {
          id: "continue",
          text: "찜찜하지만 자리로 돌아간다.",
          nextScene: "day_three_afternoon"
        }
      ]
    },

    arsonist_reconsider: {
      title: "재고",
      location: "workshop",
      description: [
        { type: "narration", text: "당신의 말에 방화범이 멈칫한다. 눈빛이 흔들린다." },
        { type: "dialogue", speaker: "arsonist", text: "...다치라고? 난 그냥 이 곳을 태우고 싶은 건데..." },
        { type: "narration", text: "그가 머리를 감싸쥔다." },
        { type: "dialogue", speaker: "arsonist", text: "고아원 아이들... 그때도 그냥 건물을 태우고 싶었을 뿐인데... 죽을 줄은..." },
        { type: "narration", text: "방화범이 당신을 신뢰하기에 귀를 기울인다." },
        { type: "dialogue", speaker: "arsonist", text: "...알았어. 불을 줄일게. 동쪽 창고만 태울 거야. 거긴 사람이 없으니까." },
      ],
      effects: [{ type: "setFlag", flag: "arsonistMinimized" }],
      actions: [
        {
          id: "continue",
          text: "고맙다고 말하고 자리로 돌아간다.",
          nextScene: "day_three_afternoon"
        }
      ]
    },

    day_three_fraudster_check: {
      title: "사기꾼의 진행 상황",
      location: "workshop",
      description: [
        { type: "narration", text: "사기꾼이 눈짓으로 당신을 구석으로 부른다." },
        { type: "dialogue", speaker: "fraudster", text: "좋은 소식이야. 박 간수가 넘어왔어. 오늘 밤 11시에 뒷문을 열어주기로 했어." },
        { type: "narration", text: "그가 능글맞게 웃는다." },
        { type: "dialogue", speaker: "fraudster", text: "내 조직에서 차를 보내기로 했어. 우리 둘 다 태워갈 거야. 완벽하지?" }
      ],
      actions: [
        {
          id: "ask_catch",
          text: "\"대가가 뭔데? 공짜는 없잖아.\"",
          conditions: [{ type: "flagSet", flag: "knowPrisoners" }],
          nextScene: "fraudster_catch_revealed"
        },
        {
          id: "accept",
          text: "\"좋아, 믿을게.\"",
          nextScene: "day_three_afternoon",
          effects: [{ type: "setFlag", flag: "fraudsterTrusted" }]
        }
      ]
    },

    fraudster_catch_revealed: {
      title: "숨겨진 조건",
      location: "workshop",
      description: [
        { type: "narration", text: "정치범이 알려준 정보가 떠오른다. '영악한 년이야. 말은 못 믿지만...'" },
        { type: "narration", text: "사기꾼의 미소가 살짝 굳어진다." },
        { type: "dialogue", speaker: "fraudster", text: "...영리하네. 그래, 조건이 있어. 우리 조직에서 네 능력이 필요하대." },
        { type: "dialogue", speaker: "fraudster", text: "게임 만들던 년이잖아. 우리 조직에서 **문서 위조**랑 **온라인 피싱** 쪽 일을 시키려고 해." },
        { type: "dialogue", speaker: "fraudster", text: "싫으면... 뭐, 혼자 알아서 나가든가. 어때?" }
      ],
      actions: [
        {
          id: "accept_anyway",
          text: "\"...알았어. 일단 나가는 게 먼저야.\"",
          nextScene: "day_three_afternoon",
          effects: [{ type: "setFlag", flag: "fraudsterTrusted" }]
        },
        {
          id: "refuse_fraud",
          text: "\"사기는 더 이상 안 해. 다른 방법을 찾을게.\"",
          nextScene: "day_three_afternoon",
          effects: [{ type: "setFlag", flag: "fraudsterRefused" }]
        }
      ]
    },

    day_three_observe: {
      title: "관찰",
      location: "workshop",
      description: [
        { type: "narration", text: "당신은 묵묵히 일하면서 주변을 살핀다." },
        { type: "narration", text: "간수들의 움직임, 죄수들 사이의 긴장감, 그리고 탈출 루트가 될 수 있는 곳들..." },
        { type: "narration", text: "오늘 밤이 중요할 것 같다. 여러 계획들이 동시에 진행되고 있는 것 같다." }
      ],
      actions: [
        {
          id: "talk_wifekiller_day3",
          text: "아내 살인범에게 다가간다.",
          conditions: [{ type: "flagSet", flag: "wifekillerFriend" }],
          nextScene: "wifekiller_final_help"
        },
        {
          id: "continue_work",
          text: "계속 관찰하며 일한다.",
          nextScene: "day_three_afternoon"
        }
      ]
    },

    wifekiller_final_help: {
      title: "아내 살인범의 마지막 도움",
      location: "workshop",
      description: [
        { type: "narration", text: "아내 살인범이 당신 옆에서 일하며 낮은 목소리로 말한다." },
        { type: "dialogue", speaker: "wifekiller", text: "오늘 밤 뭔가 일어날 것 같아. 공기가 이상해." },
        { type: "dialogue", speaker: "wifekiller", text: "네가 움직일 거라면... **지하 창고 옆 비상구**를 기억해. 거긴 열쇠가 없어도 안에서 열 수 있어." },
        { type: "dialogue", speaker: "wifekiller", text: "난 여기 남을 거야. 하지만 네가 성공하면... 언젠가 내 아들한테 편지 좀 전해줘." },
      ],
      effects: [{ type: "setFlag", flag: "knowEmergencyExit" }],
      actions: [
        {
          id: "promise",
          text: "약속한다.",
          nextScene: "day_three_afternoon"
        }
      ]
    },

    day_three_afternoon: {
      title: "셋째 날 오후",
      location: "yard",
      description: [
        { type: "narration", text: "오후 운동 시간이다. 하늘에 먹구름이 끼어 있다." },
        { type: "narration", text: "운동장에서 죄수들이 삼삼오오 모여 있다. 긴장감이 느껴진다." },
        { type: "narration", text: "메시아가 추종자들과 무언가를 속삭이고 있고, 방화범은 혼자 벽을 바라보며 중얼거리고 있다." }
      ],
      actions: [
        {
          id: "meet_messiah",
          text: "메시아에게 열쇠를 전달한다.",
          conditions: [{ type: "flagSet", flag: "hasVentKey" }],
          nextScene: "messiah_key_delivery"
        },
        {
          id: "use_warden_weakness",
          text: "간수장의 약점을 이용해 협박한다.",
          conditions: [{ type: "flagSet", flag: "knowWardenWeakness" }],
          nextScene: "warden_blackmail"
        },
        {
          id: "check_wall",
          text: "담벼락의 균열을 다시 확인한다.",
          conditions: [{ type: "flagSet", flag: "knowWallCrack" }],
          nextScene: "wall_crack_plan"
        },
        {
          id: "rest_prepare",
          text: "오늘 밤을 위해 휴식을 취한다.",
          nextScene: "day_three_evening"
        }
      ]
    },

    messiah_key_delivery: {
      title: "열쇠 전달",
      location: "yard",
      description: [
        { type: "narration", text: "메시아에게 다가가 몰래 카드키를 전달한다." },
        { type: "narration", text: "메시아의 눈이 환하게 빛난다." },
        { type: "dialogue", speaker: "messiah", text: "해냈구나, 형제여... 이것으로 구원의 문이 열릴 것이다." },
        { type: "dialogue", speaker: "messiah", text: "오늘 밤 2시, 환기구 앞에서 만나자. 구원이 가까워졌다..." },
      ],
      effects: [
        { type: "setFlag", flag: "messiahKeyDelivered" },
        { type: "increaseRelation", target: "messiah", amount: 3 }
      ],
      actions: [
        {
          id: "continue",
          text: "고개를 끄덕이고 물러난다.",
          nextScene: "day_three_evening"
        }
      ]
    },

    warden_blackmail: {
      title: "협박",
      location: "yard",
      description: [
        { type: "narration", text: "운동 시간이 끝날 무렵, 간수장이 혼자 있는 틈을 노린다." },
        { type: "narration", text: "당신은 그에게 조용히 다가가 속삭인다." },
        { type: "dialogue", speaker: "player", text: "정 대위... 의무실에서 뭘 하시는지 알고 있습니다. 여자 문제라고요?" },
        { type: "narration", text: "간수장의 얼굴이 창백해진다." },
        { type: "dialogue", speaker: "warden", text: "뭐, 뭔 소리야 이 새끼가...!" },
        { type: "dialogue", speaker: "player", text: "오늘 밤, 지하 비상구를 열어주시면 아무 말 안 하겠습니다. 아니면..." },
        { type: "narration", text: "간수장이 이를 악문다. 한참을 노려보다가..." },
        { type: "dialogue", speaker: "warden", text: "...좋아. 새벽 3시에 지하 비상구. 한 번뿐이야. 그 후엔 니가 어떻게 되든 난 몰라." },
      ],
      effects: [{ type: "setFlag", flag: "wardenBlackmailed" }],
      actions: [
        {
          id: "continue",
          text: "조용히 자리를 뜬다.",
          nextScene: "day_three_evening"
        }
      ]
    },

    wall_crack_plan: {
      title: "균열 확인",
      location: "yard",
      description: [
        { type: "narration", text: "담벼락 구석의 균열을 다시 살펴본다." },
        { type: "narration", text: "어제보다 더 벌어진 것 같다. 비가 오면 더 약해질지도 모른다." },
        { type: "narration", text: "하늘을 올려다본다. 먹구름이 잔뜩 끼어 있다. 오늘 밤 비가 올 것 같다." }
      ],
      actions: [
        {
          id: "plan_wall",
          text: "밤에 균열을 파볼 계획을 세운다.",
          nextScene: "day_three_evening",
          effects: [{ type: "setFlag", flag: "wallEscapePlan" }]
        },
        {
          id: "continue",
          text: "다른 방법을 생각한다.",
          nextScene: "day_three_evening"
        }
      ]
    },

    day_three_evening: {
      title: "셋째 날 저녁",
      location: "cell",
      description: [
        { type: "narration", text: "저녁 식사 시간이다. 밖에서 천둥소리가 들려온다." },
        { type: "narration", text: "비가 내리기 시작한다. 창밖으로 번개가 번쩍인다." },
        { type: "narration", text: "오늘 밤이 결정의 밤이다. 여러 계획들이 교차하고 있다." }
      ],
      actions: [
        {
          id: "wait_night_messiah_enemy",
          text: "곤히 잠든다.",
          conditions: [
            { type: "flagSet", flag: "messiahEnemy" },
            { type: "flagNotSet", flag: "fraudsterTrusted" },
            { type: "flagNotSet", flag: "arsonistRoute" },
            { type: "flagNotSet", flag: "wifekillerFriend" }
          ],
          nextScene: "gameover_messiah_followers"
        },
        {
          id: "wait_night_arsonist_enemy",
          text: "곤히 잠든다.",
          conditions: [
            { type: "flagSet", flag: "arsonistEnemy" },
            { type: "flagNotSet", flag: "messiahRoute" },
            { type: "flagNotSet", flag: "fraudsterTrusted" },
            { type: "flagNotSet", flag: "wifekillerFriend" },
            { type: "flagNotSet", flag: "knowEmergencyExit" }
          ],
          nextScene: "gameover_burned_alive"
        },
        {
          id: "wait_night",
          text: "잠시 눈을 붙인다.",
          nextScene: "day_four_final"
        }
      ]
    },

    // ===== 8장: 넷째 날 새벽 - 최종 결정 =====
    day_four_final: {
      title: "넷째 날 새벽",
      location: "cell",
      description: [
        { type: "narration", text: "깊은 밤, 폭풍우가 몰아친다. 번개가 하늘을 가른다." },
        { type: "narration", text: "감방 안은 긴장감으로 가득하다. 모두가 깨어 있는 것 같다." },
        { type: "narration", text: "지금이 탈출의 순간이다. 어떤 길을 선택하시겠는가?" }
      ],
      actions: [
        {
          id: "messiah_path_enhanced",
          text: "메시아의 계획을 따른다. (열쇠 전달 완료)",
          conditions: [{ type: "flagSet", flag: "messiahKeyDelivered" }],
          nextScene: "ending_messiah_enhanced"
        },
        {
          id: "messiah_path",
          text: "메시아의 계획을 따른다. (환기구 탈출)",
          conditions: [
            { type: "flagSet", flag: "messiahRoute" },
            { type: "flagNotSet", flag: "messiahKeyDelivered" }
          ],
          nextScene: "ending_messiah_route"
        },
        {
          id: "fraudster_path",
          text: "사기꾼과 함께 간수를 매수한다.",
          conditions: [
            { type: "flagSet", flag: "fraudsterTrusted" },
            { type: "flagNotSet", flag: "fraudsterRefused" }
          ],
          nextScene: "ending_fraudster_route"
        },
        {
          id: "arsonist_path_safe",
          text: "방화범의 계획에 참여한다. (피해 최소화)",
          conditions: [{ type: "flagSet", flag: "arsonistMinimized" }],
          nextScene: "ending_arsonist_safe"
        },
        {
          id: "arsonist_path",
          text: "방화범의 계획에 참여한다. (화재 혼란)",
          conditions: [
            { type: "flagSet", flag: "arsonistReady" },
            { type: "flagNotSet", flag: "arsonistMinimized" }
          ],
          nextScene: "ending_arsonist_route"
        },
        {
          id: "warden_path",
          text: "간수장이 열어준 비상구로 탈출한다.",
          conditions: [{ type: "flagSet", flag: "wardenBlackmailed" }],
          nextScene: "ending_warden_route"
        },
        {
          id: "wall_path",
          text: "폭풍우를 틈타 담벼락 균열을 파고 나간다.",
          conditions: [{ type: "flagSet", flag: "wallEscapePlan" }],
          nextScene: "ending_wall_route"
        },
        {
          id: "emergency_exit_path",
          text: "아내 살인범이 알려준 비상구로 탈출한다.",
          conditions: [{ type: "flagSet", flag: "knowEmergencyExit" }],
          nextScene: "ending_emergency_route"
        },
        {
          id: "solo_path_prepared",
          text: "혼자서 탈출을 시도한다. (준비됨)",
          conditions: [
            { type: "flagSet", flag: "knowSewerPath" },
            { type: "flagSet", flag: "knowPatrolGap" }
          ],
          nextScene: "solo_escape_prepared"
        },
        {
          id: "solo_path_partial",
          text: "혼자서 탈출을 시도한다. (일부 정보)",
          conditions: [{ type: "flagSet", flag: "wifekillerFriend" }],
          nextScene: "solo_escape_partial"
        },
        {
          id: "solo_path",
          text: "혼자서 탈출을 시도한다.",
          nextScene: "solo_escape_unprepared"
        },
        {
          id: "give_up",
          text: "탈출을 포기하고 형기를 채우기로 한다.",
          nextScene: "ending_surrender"
        }
      ]
    },

    // ===== 새로운 엔딩들 =====
    ending_messiah_enhanced: {
      title: "완벽한 구원",
      description: [
        { type: "narration", text: "당신이 전달한 카드키로 메시아가 환기구를 연다." },
        { type: "dialogue", speaker: "messiah", text: "형제여, 네 믿음이 우리 모두를 구원했다!" },
        { type: "narration", text: "정전과 폭풍우의 혼란 속에서, 당신과 메시아, 그리고 추종자들이 환기구로 빠져나간다." },
        { type: "narration", text: "카드키 덕분에 한 번의 걸림도 없이 탈출에 성공한다." },
        { type: "narration", text: "새벽녘, 산속 외딴 건물에 도착한다. 메시아의 신도들이 기다리고 있다." },
        { type: "dialogue", speaker: "messiah", text: "새로운 삶이 시작된다, 형제여. 너는 이제 우리 가족이야." },
        { type: "narration", text: "**[엔딩 A+: 선택받은 자]** - 메시아의 가장 신뢰받는 조력자가 되어 탈출했다." }
      ],
      isEnding: true,
      actions: [
        {
          id: "restart",
          text: "다시 시작하기",
          nextScene: "entrance",
          effects: [{ type: "resetGame" }]
        }
      ]
    },

    ending_arsonist_safe: {
      title: "통제된 불꽃",
      description: [
        { type: "narration", text: "방화범이 동쪽 창고에만 불을 지른다. 약속대로 피해를 최소화했다." },
        { type: "narration", text: "화재 경보가 울리고 간수들이 몰려간다. 그 틈에 당신과 방화범은 담벼락을 넘는다." },
        { type: "narration", text: "돌아보니 창고만 불타고 있다. 다른 건물들은 무사하다." },
        { type: "dialogue", speaker: "arsonist", text: "...네 말이 맞네. 이 정도로도 충분히 아름다워." },
        { type: "narration", text: "방화범의 눈에 광기 대신 평온함이 어린다." },
        { type: "narration", text: "**[엔딩 C+: 구원받은 불꽃]** - 방화범의 광기를 누그러뜨리고 함께 탈출했다. 희생자 없이." }
      ],
      isEnding: true,
      actions: [
        {
          id: "restart",
          text: "다시 시작하기",
          nextScene: "entrance",
          effects: [{ type: "resetGame" }]
        }
      ]
    },

    ending_warden_route: {
      title: "약점의 대가",
      description: [
        { type: "narration", text: "새벽 3시, 간수장이 약속대로 지하 비상구를 열어준다." },
        { type: "dialogue", speaker: "warden", text: "...꺼져. 다시는 내 앞에 나타나지 마." },
        { type: "narration", text: "당신은 빗속으로 달려나간다. 뒤에서 문이 닫히는 소리가 들린다." },
        { type: "narration", text: "아무도 추격하지 않는다. 간수장이 입막음을 한 것이다." },
        { type: "narration", text: "새벽빛이 밝아온다. 당신은 자유이다. 누군가의 비밀을 이용한 더러운 방법이었지만." },
        { type: "narration", text: "**[엔딩 J: 어둠의 거래]** - 협박으로 탈출에 성공했다. 양심은 찔리지만, 살아남았다." }
      ],
      isEnding: true,
      actions: [
        {
          id: "restart",
          text: "다시 시작하기",
          nextScene: "entrance",
          effects: [{ type: "resetGame" }]
        }
      ]
    },

    ending_wall_route: {
      title: "폭풍의 밤",
      description: [
        { type: "narration", text: "폭풍우가 몰아치는 밤, 당신은 담벼락 균열 앞에 선다." },
        { type: "narration", text: "비에 젖은 콘크리트가 부서지기 쉬워졌다. 맨손으로 파헤친다." },
        { type: "narration", text: "손톱이 빠지고 피가 나지만 멈추지 않는다. 천둥소리가 작업 소리를 가려준다." },
        { type: "narration", text: "마침내 사람이 빠져나갈 수 있는 구멍이 뚫린다." },
        { type: "narration", text: "당신은 폭풍우 속으로 뛰어나간다. 번개가 길을 비춰준다." },
        { type: "narration", text: "**[엔딩 K: 폭풍을 뚫고]** - 폭풍우의 밤, 오직 의지로 담벼락을 뚫고 탈출했다." }
      ],
      isEnding: true,
      actions: [
        {
          id: "restart",
          text: "다시 시작하기",
          nextScene: "entrance",
          effects: [{ type: "resetGame" }]
        }
      ]
    },

    ending_emergency_route: {
      title: "친구의 선물",
      description: [
        { type: "narration", text: "아내 살인범이 알려준 비상구로 향한다." },
        { type: "narration", text: "지하 창고 옆, 낡은 철문이 있다. 안쪽에서 여는 건 쉽다." },
        { type: "narration", text: "문을 열자 빗줄기가 쏟아진다. 바깥세상이다." },
        { type: "narration", text: "뒤를 돌아본다. 감방에 남아있을 아내 살인범을 생각한다." },
        { type: "narration", text: "'언젠가 내 아들한테 편지 좀 전해줘.' 그의 말이 떠오른다." },
        { type: "narration", text: "당신은 폭풍우 속으로 뛰어나간다. 그의 부탁을 가슴에 새기며." },
        { type: "narration", text: "**[엔딩 L: 약속의 무게]** - 친구의 도움으로 탈출했다. 이제 그 약속을 지켜야 한다." }
      ],
      isEnding: true,
      actions: [
        {
          id: "restart",
          text: "다시 시작하기",
          nextScene: "entrance",
          effects: [{ type: "resetGame" }]
        }
      ]
    },

    // ===== 엔딩들 =====
    ending_messiah_route: {
      title: "구원의 날",
      description: [
        { type: "narration", text: "메시아의 계획대로 움직인다. 밤, 갑자기 수용소 전체가 정전된다." },
        { type: "dialogue", speaker: "messiah", text: "때가 왔다! 형제들이여, 따라와라!" },
        { type: "narration", text: "메시아와 그의 추종자들이 환기구로 향한다. 당신도 그 뒤를 따른다." },
        { type: "narration", text: "좁은 환기구를 기어가는 동안, 뒤에서 총성이 들린다. 일부는 잡혔다." },
        { type: "narration", text: "하지만 당신은... 빛이 보이는 출구를 향해 기어간다." },
        { type: "narration", text: "마침내 밖으로 나왔을 때, 밤하늘의 별이 보인다. 자유이다." },
        { type: "dialogue", speaker: "messiah", text: "보아라, 형제여... 이것이 구원이다." },
        { type: "narration", text: "**[엔딩 A: 구원의 밤]** - 메시아와 함께 탈출에 성공했다. 하지만 대가로 그의 광신도가 되어야 할지도 모른다..." }
      ],
      isEnding: true,
      actions: [
        {
          id: "restart",
          text: "다시 시작하기",
          nextScene: "entrance",
          effects: [{ type: "resetGame" }]
        }
      ]
    },

    ending_fraudster_route: {
      title: "거래의 대가",
      description: [
        { type: "narration", text: "사기꾼의 계획대로 박 간수에게 접근한다." },
        { type: "dialogue", speaker: "fraudster", text: "모든 게 준비됐어. 오늘 밤 뒷문으로 빠져나간다." },
        { type: "narration", text: "밤, 박 간수가 약속대로 뒷문을 열어준다. 당신과 사기꾼은 조용히 수용소를 빠져나간다." },
        { type: "narration", text: "하지만 수용소 밖에서 검은 승용차가 기다리고 있다." },
        { type: "dialogue", speaker: "fraudster", text: "아, 맞다. 말 안 했지? 내 조직에서 너도 데려가래. 일손이 필요하대." },
        { type: "narration", text: "사기꾼이 능글맞게 웃는다. 수용소에서는 나왔지만... 또 다른 감옥에 갇힐 운명이다." },
        { type: "narration", text: "**[엔딩 B: 새로운 족쇄]** - 탈출에는 성공했지만, 사기꾼의 조직에 얽히게 되었다." }
      ],
      isEnding: true,
      actions: [
        {
          id: "restart",
          text: "다시 시작하기",
          nextScene: "entrance",
          effects: [{ type: "resetGame" }]
        }
      ]
    },

    ending_arsonist_route: {
      title: "불의 정화",
      description: [
        { type: "narration", text: "방화범에게 기름을 전달한다. 그의 눈이 광기로 빛난다." },
        { type: "dialogue", speaker: "arsonist", text: "완벽해... 오늘 밤, 이 지옥을 태워버릴 거야." },
        { type: "narration", text: "한밤중, 수용소 곳곳에서 불길이 치솟는다. 비명소리, 사이렌, 총성이 뒤섞인다." },
        { type: "narration", text: "혼란 속에서 당신은 담벼락을 넘는다. 뒤에서 엄청난 폭발음이 들린다." },
        { type: "narration", text: "돌아보니 수용소 전체가 불타고 있다. 얼마나 많은 사람이 죽었는지는 모른다." },
        { type: "dialogue", speaker: "arsonist", text: "아름답지 않아...? 히히히..." },
        { type: "narration", text: "**[엔딩 C: 잿더미 위의 자유]** - 탈출에 성공했지만, 수많은 생명이 희생되었다. 당신의 손에도 피가 묻었다." }
      ],
      isEnding: true,
      actions: [
        {
          id: "restart",
          text: "다시 시작하기",
          nextScene: "entrance",
          effects: [{ type: "resetGame" }]
        }
      ]
    },

    // ===== 솔로 탈출 루트 =====
    solo_escape_prepared: {
      title: "완벽한 계획",
      location: "cell",
      description: [
        { type: "narration", text: "당신은 혼자 탈출을 시도하기로 한다. 하지만 이번엔 **준비가 되어 있다**." },
        { type: "narration", text: "치한에게서 들은 정보가 떠오른다. 새벽 2시, 간수가 의무실에서 한 시간 동안 사라진다." },
        { type: "narration", text: "정치범에게서 들은 정보도 있다. 지하 3층에 하수도로 연결되는 통로가 있다." },
        { type: "narration", text: "깊은 밤, 새벽 2시를 기다린다. 심장이 빠르게 뛴다." },
        { type: "narration", text: "...발소리가 멀어진다. 지금이다." }
      ],
      actions: [
        {
          id: "execute_plan",
          text: "계획을 실행한다.",
          nextScene: "solo_escape_execution"
        }
      ]
    },

    solo_escape_execution: {
      title: "탈출 실행",
      location: "corridor",
      description: [
        { type: "narration", text: "작은 드라이버로 감방 자물쇠를 딴다. 손이 떨리지만, 침착하게." },
        { type: "narration", text: "째깍... 철컥. 자물쇠가 열린다." },
        { type: "narration", text: "복도는 텅 비어 있다. 예상대로 간수가 없다." },
        { type: "narration", text: "발소리를 죽이며 계단을 내려간다. 지하 1층... 지하 2층... 그리고 **지하 3층**." },
        { type: "narration", text: "정치범이 말한 대로, 창고 구석에 낡은 {{하수도 맨홀}}이 있다." },
        { type: "narration", text: "뚜껑을 열자 악취가 코를 찌른다. 하지만 **자유의 냄새**이기도 하다." }
      ],
      actions: [
        {
          id: "enter_sewer",
          text: "하수도로 들어간다.",
          nextScene: "solo_escape_sewer"
        }
      ]
    },

    solo_escape_sewer: {
      title: "하수도",
      location: "sewer",
      description: [
        { type: "narration", text: "악취 나는 하수도를 기어간다. 어둠 속에서 손으로 벽을 더듬으며 나아간다." },
        { type: "narration", text: "얼마나 갔을까. 한 시간? 두 시간? 시간 감각이 사라진다." },
        { type: "narration", text: "갑자기 머리 위에서 **바람**이 느껴진다. 출구다!" },
        { type: "narration", text: "녹슨 사다리를 타고 올라간다. 맨홀 뚜껑을 밀어 올린다." },
        { type: "narration", text: "...별이 보인다. 차가운 밤공기가 폐를 가득 채운다." },
        { type: "narration", text: "뒤를 돌아보니, 수용소의 불빛이 저 멀리 보인다. 아무도 당신의 탈출을 눈치채지 못했다." }
      ],
      actions: [
        {
          id: "freedom",
          text: "자유를 향해 걷는다.",
          nextScene: "ending_solo_success"
        }
      ]
    },

    ending_solo_success: {
      title: "진정한 자유",
      description: [
        { type: "narration", text: "당신은 밤새 걸었다. 숲을 지나고, 들판을 건너고, 작은 마을에 도착했다." },
        { type: "narration", text: "새벽빛이 하늘을 물들이기 시작한다. 당신은 자유이다." },
        { type: "narration", text: "아무에게도 빚지지 않았다. 아무의 계획에도 휘말리지 않았다." },
        { type: "narration", text: "순전히 당신의 **지혜**와 **인내**로 이곳을 빠져나왔다." },
        { type: "narration", text: "앞으로의 삶이 어떨지는 모른다. 하지만 적어도 그것은 **당신이 선택하는 삶**일 것이다." },
        { type: "narration", text: "**[엔딩 F: 고독한 자유]** - 혼자의 힘으로 탈출에 성공했다. 진정한 자유를 얻었다." }
      ],
      isEnding: true,
      actions: [
        {
          id: "restart",
          text: "다시 시작하기",
          nextScene: "entrance",
          effects: [{ type: "resetGame" }]
        }
      ]
    },

    solo_escape_partial: {
      title: "불완전한 계획",
      location: "cell",
      description: [
        { type: "narration", text: "당신은 혼자 탈출을 시도하기로 한다." },
        { type: "narration", text: "아내 살인범이 알려준 정보가 있다. 수용소의 구조와 순찰 패턴." },
        { type: "narration", text: "하지만 확실한 탈출 경로는 모른다. 위험하지만... 시도해볼 가치는 있다." },
        { type: "narration", text: "깊은 밤, 감방 자물쇠를 따고 복도로 나선다." }
      ],
      actions: [
        {
          id: "try_basement",
          text: "지하로 내려간다.",
          nextScene: "solo_partial_basement"
        },
        {
          id: "try_roof",
          text: "옥상으로 올라간다.",
          nextScene: "solo_partial_roof"
        }
      ]
    },

    solo_partial_basement: {
      title: "지하 탐색",
      location: "basement",
      description: [
        { type: "narration", text: "아내 살인범이 말한 대로, 지하로 내려간다." },
        { type: "narration", text: "지하 1층... 창고가 있다. 지하 2층... 보일러실이다." },
        { type: "narration", text: "지하 3층으로 내려가려 하지만... **철문이 잠겨 있다**." },
        { type: "narration", text: "드라이버로는 열 수 없는 전자 잠금장치이다." },
        { type: "dialogue", speaker: "player", text: "젠장... 다른 방법을 찾아야 해." },
      ],
      actions: [
        {
          id: "enter_duct",
          text: "환기 덕트를 찾는다.",
          conditions:  [
            { type: "flagSet", flag: "knowVentDuct" }
          ],
          nextScene: "solo_partial_duct"
        },
        {
          id: "go_back",
          text: "생각이 나지 않는다. 돌아간다.",
          nextScene: "solo_escape_caught"
        }
      ]
    },

    solo_partial_duct: {
      title: "환기 덕트",
      location: "basement",
      description: [
        { type: "narration", text: "소아성폭력범이 지하 2층에 있다고 말한 {{환기 덕트}}가 생각난다."},
        { type: "narration", text: "보일러실을 뒤지니 말해준대로 그것이 있다. 좁지만 들어갈 수 있을 것 같다." },
        { type: "narration", text: "좁은 환기 덕트를 기어간다. 금속 벽이 삐걱거린다." },
        { type: "narration", text: "앞이 보이지 않는다. 그저 앞으로, 앞으로..." },
        { type: "narration", text: "갑자기 덕트가 아래로 꺾인다. 미끄러진다!" },
        { type: "narration", text: "쿵! 어딘가에 떨어진다. 충격에 정신이 아득해진다." }
      ],
      actions: [
        {
          id: "escape",
          text: "눈을 뜬다.",
          nextScene: "ending_solo_lucky"
        }
      ]
    },

    ending_solo_lucky: {
      title: "운 좋은 탈출",
      description: [
        { type: "narration", text: "...눈을 뜨니 **수용소 밖**이다. 쓰레기 처리장 같은 곳에 떨어진 것 같다." },
        { type: "narration", text: "온몸이 아프지만, 자유이다. 운이 좋았다." },
        { type: "narration", text: "당신은 절뚝거리며 어둠 속으로 사라진다." },
        { type: "narration", text: "계획대로는 아니었지만... 결과적으로 탈출에 성공했다." },
        { type: "narration", text: "아내 살인범에게 감사해야 할 것 같다. 그의 정보가 아니었다면 지하로 갈 생각도 못 했을 것이다." },
        { type: "narration", text: "어딘가에서 새 삶을 시작해야 한다. 상처투성이지만, **살아 있다**." },
        { type: "narration", text: "**[엔딩 G: 행운의 탈출]** - 불완전한 계획이었지만, 운과 용기로 탈출에 성공했다." }
      ],
      isEnding: true,
      actions: [
        {
          id: "restart",
          text: "다시 시작하기",
          nextScene: "entrance",
          effects: [{ type: "resetGame" }]
        }
      ]
    },

    solo_partial_roof: {
      title: "옥상",
      location: "roof",
      description: [
        { type: "narration", text: "계단을 올라 옥상으로 향한다." },
        { type: "narration", text: "옥상 문이 잠겨 있지만, 드라이버로 경첩을 풀어낸다." },
        { type: "narration", text: "밤하늘이 펼쳐진다. 차가운 바람이 불어온다." },
        { type: "narration", text: "옥상 가장자리에서 아래를 내려다본다. **높다**. 뛰어내리면 죽는다." },
        { type: "narration", text: "하지만 옆 건물로 이어지는 **전선**이 보인다. 위험하지만..." }
      ],
      actions: [
        {
          id: "try_wire",
          text: "전선을 타고 건너간다.",
          nextScene: "solo_roof_wire"
        },
        {
          id: "go_back_roof",
          text: "너무 위험하다. 돌아간다.",
          nextScene: "solo_escape_caught"
        }
      ]
    },

    solo_roof_wire: {
      title: "위험한 도박",
      location: "roof",
      description: [
        { type: "narration", text: "전선을 양손으로 잡고 건너간다. 아래는 까마득한 어둠이다." },
        { type: "narration", text: "팔이 떨린다. 전선이 흔들린다. 한 발, 한 발..." },
        { type: "narration", text: "절반쯤 왔을 때, 갑자기 탐조등이 켜진다!" },
        { type: "dialogue", speaker: "guard", text: "거기 멈춰! 움직이면 쏜다!" },
        { type: "narration", text: "선택의 순간이다." }
      ],
      actions: [
        {
          id: "keep_going",
          text: "무시하고 계속 간다!",
          nextScene: "solo_roof_gamble"
        },
        {
          id: "surrender",
          text: "포기하고 돌아간다.",
          nextScene: "solo_escape_caught"
        }
      ]
    },

    solo_roof_gamble: {
      title: "도박",
      location: "roof",
      description: [
        { type: "narration", text: "당신은 전선을 미친 듯이 타고 간다. 총성이 들린다!" },
        { type: "narration", text: "탕! 탕! 총알이 옆을 스쳐간다." },
        { type: "narration", text: "마지막 힘을 짜내어 옆 건물 옥상에 뛰어내린다." },
        { type: "narration", text: "쿵! 착지에 성공한다. 발목이 삐끗했지만 뼈는 멀쩡하다." },
        { type: "narration", text: "건물 아래로 뛰어내려 어둠 속으로 사라진다. 뒤에서 사이렌 소리가 울리지만, 이미 늦었다." }
      ],
      actions: [
        {
          id: "freedom",
          text: "자유를 향해 달린다.",
          nextScene: "ending_solo_daring"
        }
      ]
    },

    ending_solo_daring: {
      title: "대담한 탈출",
      description: [
        { type: "narration", text: "당신은 밤새 도망쳤다. 추격대가 따라왔지만 따돌렸다." },
        { type: "narration", text: "새벽이 밝아올 무렵, 당신은 국경 근처의 작은 마을에 도착한다." },
        { type: "narration", text: "온몸에 상처투성이이다. 하지만 **살아 있고, 자유롭다**." },
        { type: "narration", text: "이 탈출은 오래도록 전설로 남을 것이다. 총알이 빗발치는 속에서 전선을 타고 탈출한 미친 죄수의 이야기." },
        { type: "narration", text: "**[엔딩 H: 전설의 탈출]** - 대담한 도박으로 탈출에 성공했다. 당신의 이야기는 전설이 된다." }
      ],
      isEnding: true,
      actions: [
        {
          id: "restart",
          text: "다시 시작하기",
          nextScene: "entrance",
          effects: [{ type: "resetGame" }]
        }
      ]
    },

    solo_escape_unprepared: {
      title: "무모한 시도",
      location: "cell",
      description: [
        { type: "narration", text: "당신은 혼자 탈출을 시도하기로 한다. 아무도 믿을 수 없으니까." },
        { type: "narration", text: "하지만... 탈출 경로도 모르고, 간수들의 순찰 패턴도 모른다." },
        { type: "narration", text: "그래도 시도한다. 기회는 지금뿐이니까." },
        { type: "narration", text: "깊은 밤, 작은 드라이버로 감방 자물쇠를 따기 시작한다." },
        { type: "narration", text: "째깍... 째깍... 시간이 흐른다. 식은땀이 흐른다." },
        { type: "narration", text: "철컥. 자물쇠가 열린다." }
      ],
      actions: [
        {
          id: "step_out",
          text: "복도로 나선다.",
          nextScene: "solo_escape_caught"
        }
      ]
    },

    solo_escape_caught: {
      title: "발각",
      location: "corridor",
      description: [
        { type: "narration", text: "복도에 발을 내딛는 순간, 손전등 불빛이 당신을 비춘다." },
        { type: "dialogue", speaker: "guard", text: "이 새끼가... 어디 가려고?" },
        { type: "narration", text: "잡혔다. 간수들이 달려와 당신을 제압한다." },
        { type: "dialogue", speaker: "guard", text: "탈옥 시도? 좋아, 독방에서 썩어봐라." },
        { type: "narration", text: "당신은 끌려간다. 지하 깊숙한 곳으로..." }
      ],
      actions: [
        {
          id: "to_solitary",
          text: "독방으로 끌려간다.",
          nextScene: "solitary_cell"
        }
      ]
    },

    solitary_cell: {
      title: "독방",
      location: "solitary",
      description: [
        { type: "narration", text: "캄캄한 독방에 던져진다. 문이 닫히고 완전한 어둠이 찾아온다." },
        { type: "narration", text: "시간이 흐른다. 하루? 이틀? 알 수 없다." },
        { type: "narration", text: "배가 고프고, 목이 마르다. 하지만 그보다 **절망**이 더 크다." },
        { type: "narration", text: "바닥에서는 물이 흐르는 듯한 이상한 소리가 들린다. " }
      ],
      actions: [
        {
          id: "investigate",
          text: "금을 파본다.",
          conditions: [{ type: "flagSet", flag: "knowWallCrack" }],
          nextScene: "solitary_discovery"
        },
        {
          id: "give_up_solitary",
          text: "포기하고 벽에 기댄다.",
          nextScene: "ending_solo_despair"
        }
      ]
    },

    solitary_discovery: {
      title: "발견",
      location: "solitary",
      description: [
        { type: "narration", text: "손으로 바닥을 더듬어본다. 구석에 **금이 간 콘크리트**가 있다." },
        { type: "narration", text: "손톱으로 콘크리트를 긁어낸다. 손가락에서 피가 나지만 멈출 수 없다." },
        { type: "narration", text: "조금씩, 조금씩... 구멍이 커진다." },
        { type: "narration", text: "마침내, 손이 빠질 만큼의 구멍이 뚫렸다. 아래에서 **물 냄새**가 올라온다." }
      ],
      actions: [
        {
          id: "escape_sewer",
          text: "구멍을 더 넓힌다.",
          nextScene: "sewer_escape"
        },
        {
          id: "give_up_solitary",
          text: "포기하고 쉰다.",
          nextScene: "ending_solo_despair"
        }
      ]
    },

    sewer_escape: {
      title: "하수도",
      location: "sewer",
      description: [
        { type: "narration", text: "며칠에 걸쳐 구멍을 넓힌다. 손은 피투성이가 되고, 손톱은 빠지지만..." },
        { type: "narration", text: "마침내 사람이 빠져나갈 수 있는 크기가 된다." },
        { type: "narration", text: "당신은 하수도를 기어간다. 악취와 어둠 속에서 몇 시간을..." },
        { type: "narration", text: "그리고 마침내, **빛**이 보인다." }
      ],
      actions: [
        {
          id: "escape_from_sewer",
          text: "밖으로 나선다.",
          nextScene: "ending_solo_redemption"
        }
      ]
    },

    ending_solo_redemption: {
      title: "구원",
      description: [
        { type: "narration", text: "하수도 출구로 기어나온다. 숲속이다. 새가 지저귀고, 햇빛이 따사롭다." },
        { type: "narration", text: "당신은 피투성이의 손을 바라본다. 이 손으로 자유를 쟁취했다." },
        { type: "narration", text: "첫 시도는 실패했지만 포기하지 않았다. 그것이 당신을 구원했다." },
        { type: "narration", text: "**[엔딩 I: 불굴의 의지]** - 실패 후에도 포기하지 않고, 결국 혼자의 힘으로 탈출에 성공했다." }
      ],
      isEnding: true,
      actions: [
        {
          id: "restart",
          text: "다시 시작하기",
          nextScene: "entrance",
          effects: [{ type: "resetGame" }]
        }
      ]
    },

    ending_solo_despair: {
      title: "절망",
      location: "solitary",
      description: [
        { type: "narration", text: "당신은 벽에 기대어 앉는다. 더 이상 힘이 없다." },
        { type: "narration", text: "어둠 속에서 시간이 흘러간다. 의식이 흐려진다." },
        { type: "narration", text: "며칠 후, 간수가 문을 열었을 때, 당신은 거의 의식이 없는 상태였다." },
        { type: "narration", text: "의무실로 옮겨졌지만, 정신은 이미 무너져 있었다." },
        { type: "narration", text: "**[엔딩 D: 어둠 속으로]** - 탈출에 실패하고 희망을 잃었다. 독방이 당신의 무덤이 될 뻔했다." }
      ],
      isEnding: true,
      actions: [
        {
          id: "restart",
          text: "다시 시작하기",
          nextScene: "entrance",
          effects: [{ type: "resetGame" }]
        }
      ]
    },

    ending_surrender: {
      title: "체념",
      location: "cell",
      description: [
        { type: "narration", text: "당신은 탈출을 포기한다. 어차피 밖에 나가봤자 뭐가 달라지겠는가." },
        { type: "narration", text: "날이 가고, 달이 가고, 해가 간다. 당신은 수용소의 일부가 되어간다." },
        { type: "narration", text: "언젠가 메시아는 사라졌고, 사기꾼은 다른 수용소로 이감됐고, 방화범은 독방에서 미쳐버렸다." },
        { type: "narration", text: "그리고 당신은... 여전히 여기 있다." },
        { type: "narration", text: "10년 후, 형기를 마치고 나왔을 때, 세상은 완전히 변해 있었다. 당신의 자리는 어디에도 없었다." },
        { type: "narration", text: "**[엔딩 E: 잃어버린 시간]** - 살아남았지만, 삶의 의미를 잃어버렸다." }
      ],
      isEnding: true,
      actions: [
        {
          id: "restart",
          text: "다시 시작하기",
          nextScene: "entrance",
          effects: [{ type: "resetGame" }]
        }
      ]
    },

    // ===== 게임오버 씬들 =====
    gameover_wifekiller_rage: {
      title: "치명적 실수",
      location: "cell",
      description: [
        { type: "narration", text: "아내 살인범의 눈빛이 순간적으로 변한다. 깊은 슬픔이 살의로 바뀐다." },
        { type: "dialogue", speaker: "wifekiller", text: "...뭐라고 했어?" },
        { type: "narration", text: "그가 천천히 일어선다. 10년간 노동으로 단련된 근육이 팽팽해진다." },
        { type: "dialogue", speaker: "wifekiller", text: "네가... 날... 설교한다고?" },
        { type: "narration", text: "당신이 물러서려 하지만 이미 늦었다. 그의 주먹이 번개처럼 날아온다." },
        { type: "narration", text: "!!크악!!—첫 번째 타격에 코뼈가 부러지는 소리가 들린다." },
        { type: "narration", text: "바닥에 쓰러진 당신의 위로 그의 발길질이 쏟아진다. 갈비뼈가 부러지고, 숨을 쉴 수 없다." },
        { type: "dialogue", speaker: "wifekiller", text: "내 아들을... 지키려고... 그랬는데... 너 따위 변태가...!!" },
        { type: "narration", text: "다른 죄수들이 말리려 하지만, 그의 분노는 멈추지 않는다." },
        { type: "narration", text: "시야가 흐려진다. 마지막으로 들리는 건 멀리서 달려오는 간수들의 발소리..." },
        { type: "narration", text: "**[GAME OVER: 말을 함부로 하면 안 됩니다]**" },
        { type: "narration", text: "수용소에서는 누가 어떤 상처를 안고 있는지 모른다. 함부로 건드렸다가 목숨을 잃을 수 있다." }
      ],
      isEnding: true,
      actions: [
        {
          id: "restart",
          text: "다시 시작하기",
          nextScene: "entrance",
          effects: [{ type: "resetGame" }]
        }
      ]
    },

    gameover_burned_alive: {
      title: "화염 속에서",
      location: "cell",
      description: [
        { type: "narration", text: "한밤중, 굉음과 함께 눈이 번쩍 떠진다." },
        { type: "narration", text: "**불이다!!** 감방 복도가 이미 화염에 휩싸여 있다." },
        { type: "dialogue", speaker: "arsonist", text: "히히히... 아름답지 않아?" },
        { type: "narration", text: "연기 사이로 방화범의 목소리가 들린다. 그가 정말로 해냈다." },
        { type: "narration", text: "당신은 철창을 잡아당겨 본다. 잠겨 있다. 간수들은 보이지 않는다." },
        { type: "dialogue", speaker: "arsonist", text: "내가 경고했지? 내 계획을 방해하면 통구이행이라고..." },
        { type: "narration", text: "방화범이 당신의 감방 앞에 선다. 그의 손에 들린 열쇠가 반짝인다." },
        { type: "dialogue", speaker: "arsonist", text: "넌 거부했어. 그러니까... 여기서 정화되는 거야." },
        { type: "narration", text: "그가 열쇠를 주머니에 넣고 사라진다. 화염이 점점 가까워온다." },
        { type: "narration", text: "연기가 폐를 채운다. 피부가 타들어가는 고통이... 마지막 순간까지 계속된다." },
        { type: "narration", text: "**[GAME OVER: 불타는 감방]**" },
        { type: "narration", text: "방화범의 계획을 거부했다면, 그가 복수할 것을 대비했어야 한다." }
      ],
      isEnding: true,
      actions: [
        {
          id: "restart",
          text: "다시 시작하기",
          nextScene: "entrance",
          effects: [{ type: "resetGame" }]
        }
      ]
    },

    gameover_messiah_followers: {
      title: "이단자의 최후",
      location: "cell",
      description: [
        { type: "narration", text: "그날 밤." },
        { type: "narration", text: "잠든 당신의 위로 여러 개의 그림자가 드리운다." },
        { type: "narration", text: "눈을 떴을 때, 이미 입이 막혀 있다. 누군가 당신의 팔다리를 붙잡고 있다." },
        { type: "dialogue", speaker: "messiah", text: "안타깝구나, 불신자여..." },
        { type: "narration", text: "메시아가 침대 옆에 서 있다. 그의 뒤로 추종자 다섯 명이 보인다." },
        { type: "dialogue", speaker: "messiah", text: "너는 나를 '사이비 교주'라 불렀지. 구원의 손길을 뿌리치고, 모욕까지 했어." },
        { type: "narration", text: "그의 손에 날카롭게 갈린 숟가락이 들려 있다." },
        { type: "dialogue", speaker: "messiah", text: "불신자는 정화되어야 해. 이건 벌이 아니야. 구원이야." },
        { type: "narration", text: "당신의 비명은 막힌 입 밖으로 새어나오지 못한다." },
        { type: "narration", text: "다음 날 아침, 간수들이 발견한 건 피투성이가 된 시체뿐이었다." },
        { type: "narration", text: "**[GAME OVER: 이단자 처형]**" },
        { type: "narration", text: "광신자를 모욕하는 것은 죽음을 자초하는 일이다." }
      ],
      isEnding: true,
      actions: [
        {
          id: "restart",
          text: "다시 시작하기",
          nextScene: "entrance",
          effects: [{ type: "resetGame" }]
        }
      ]
    },

    gameover_guard_murder: {
      title: "본보기",
      location: "yard",
      description: [
        { type: "narration", text: "간수의 얼굴이 핏빛으로 물든다." },
        { type: "dialogue", speaker: "guard", text: "...이 새끼가 지금 뭐라고 했어?" },
        { type: "narration", text: "주변의 다른 간수들이 다가온다. 죄수들은 벽으로 물러난다." },
        { type: "dialogue", speaker: "guard", text: "야, 이리 와봐. 이 변태 새끼가 반항을 하네?" },
        { type: "narration", text: "몽둥이가 날아온다. 첫 번째, 두 번째, 세 번째—" },
        { type: "narration", text: "바닥에 쓰러진 당신을 간수들이 둘러싼다." },
        { type: "dialogue", speaker: "guard", text: "여기가 어딘 줄 알아? 너 같은 쓰레기가 깝칠 곳이 아니야." },
        { type: "narration", text: "구둣발이 얼굴을, 갈비뼈를, 온 몸을 짓밟는다." },
        { type: "dialogue", speaker: "guard", text: "이년으로 본보기를 보여줘야겠어. 독방에서 **특별 관리** 받게 해." },
        { type: "narration", text: "끌려가는 동안 의식이 희미해진다. 독방에 던져진 후..." },
        { type: "narration", text: "물도 음식도 없이 3일. 당신의 몸은 버티지 못했다." },
        { type: "narration", text: "**[GAME OVER: 반항의 대가]**" },
        { type: "narration", text: "수용소에서 간수에게 대드는 것은 자살 행위이다." }
      ],
      isEnding: true,
      actions: [
        {
          id: "restart",
          text: "다시 시작하기",
          nextScene: "entrance",
          effects: [{ type: "resetGame" }]
        }
      ]
    },

    gameover_groper_trap: {
      title: "덫",
      location: "workshop",
      description: [
        { type: "narration", text: "한참 작업에 집중하고 있는데 어디선가 중얼거리는 소리가 들린다." },
        { type: "dialogue", speaker: "groper", text: "히히... 네가 그렇게 나온다? 좋아, 좋아..." },
        { type: "narration", text: "갑자기 누군가가 당신을 밀친다." },
        { type: "narration", text: "균형을 잃고 넘어지는 순간, 프레스 기계의 날이 내려온다." },
        { type: "narration", text: "!!으아악!!—" },
        { type: "narration", text: "팔 하나가 잘려나간다. 피가 분수처럼 솟구친다." },
        { type: "dialogue", speaker: "groper", text: "앗, 이런. 산업재해네? 히히히..." },
        { type: "narration", text: "과다출혈로 의식이 흐려진다. 간수들이 달려오지만 이미 늦었다." },
        { type: "narration", text: "**[GAME OVER: 산업재해]**" },
        { type: "narration", text: "교활한 자를 함부로 적으로 만들면 언제 어디서 복수당할지 모른다." }
      ],
      isEnding: true,
      actions: [
        {
          id: "restart",
          text: "다시 시작하기",
          nextScene: "entrance",
          effects: [{ type: "resetGame" }]
        }
      ]
    },

    gameover_solitary_madness: {
      title: "독방의 끝",
      location: "solitary",
      description: [
        { type: "narration", text: "독방에 갇힌 지 며칠이 지났는지 알 수 없다." },
        { type: "narration", text: "빛도, 소리도, 아무것도 없다. 오직 어둠과 침묵뿐." },
        { type: "narration", text: "처음엔 버틸 수 있다고 생각했다. 하지만 시간이 지날수록..." },
        { type: "narration", text: "벽이 좁아지는 것 같다. 숨이 막힌다. 목소리가 들린다." },
        { type: "dialogue", speaker: "player", text: "제발... 누구 없어요...? 제발..." },
        { type: "narration", text: "아무도 대답하지 않는다. 당신은 벽을 긁기 시작한다. 손톱이 벗겨져도 멈출 수 없다." },
        { type: "narration", text: "일주일 후, 간수가 독방을 열었을 때..." },
        { type: "narration", text: "거기엔 벽에 핏자국으로 무언가를 끄적이며 웃고 있는 폐인만이 있었다." },
        { type: "narration", text: "**[GAME OVER: 정신붕괴]**" },
        { type: "narration", text: "고독은 가장 잔인한 형벌이다." }
      ],
      isEnding: true,
      actions: [
        {
          id: "restart",
          text: "다시 시작하기",
          nextScene: "entrance",
          effects: [{ type: "resetGame" }]
        }
      ]
    }
  }
};

module.exports = gameData;