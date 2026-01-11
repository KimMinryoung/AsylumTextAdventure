# Text Adventure Game

Node.js + Express + React로 만든 텍스트 기반 어드벤처 웹 게임입니다.

## 프로젝트 구조

```
text-adventure-game/
├── server/                  # Express.js 백엔드
│   ├── src/
│   │   ├── index.js        # 서버 진입점
│   │   ├── routes/
│   │   │   └── game.js     # 게임 API 라우트
│   │   └── game/
│   │       ├── GameEngine.js   # 게임 엔진
│   │       └── data/
│   │           └── story.js    # 스토리 데이터
│   └── package.json
├── client/                  # React 프론트엔드
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── StartScreen.js
│   │   │   └── GameScreen.js
│   │   ├── api/
│   │   │   └── gameApi.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── package.json             # 루트 패키지
```

## 설치 및 실행

### 1. 의존성 설치

```bash
npm run install:all
```

### 2. 개발 서버 실행

```bash
npm run dev
```

- 백엔드: http://localhost:3001
- 프론트엔드: http://localhost:3000

### 개별 실행

```bash
# 백엔드만 실행
npm run server

# 프론트엔드만 실행
npm run client
```

## 스토리 커스터마이징

`server/src/game/data/story.js` 파일을 수정하여 나만의 스토리를 만들 수 있습니다.

### 스토리 데이터 구조

```javascript
const gameData = {
  title: "게임 제목",
  startScene: "시작_씬_ID",
  startInventory: [],     // 시작 시 가진 아이템
  startFlags: {},         // 시작 시 플래그

  scenes: {
    씬_ID: {
      title: "씬 제목",
      description: "씬 설명 텍스트",
      isEnding: false,    // 엔딩 씬 여부
      actions: [
        {
          id: "액션_ID",
          text: "선택지 텍스트",
          nextScene: "다음_씬_ID",
          resultText: "액션 결과 메시지",
          conditions: [],  // 조건
          effects: []      // 효과
        }
      ]
    }
  }
};
```

### 조건 (Conditions)

```javascript
// 아이템 보유 여부
{ type: "hasItem", item: "torch" }
{ type: "notHasItem", item: "torch" }

// 플래그 설정 여부
{ type: "flagSet", flag: "readSign" }
{ type: "flagNotSet", flag: "readSign" }
```

### 효과 (Effects)

```javascript
// 아이템 추가/제거
{ type: "addItem", item: "torch" }
{ type: "removeItem", item: "torch" }

// 플래그 설정/해제
{ type: "setFlag", flag: "readSign" }
{ type: "clearFlag", flag: "readSign" }
```

## 기능

- 분기형 스토리 진행
- 아이템 인벤토리 시스템
- 플래그 기반 조건 분기
- 게임 저장/불러오기 (localStorage)
- 반응형 UI

## API 엔드포인트

| 메서드 | 경로 | 설명 |
|--------|------|------|
| POST | /api/game/start | 새 게임 시작 |
| POST | /api/game/action | 액션 수행 |
| GET | /api/game/state/:sessionId | 현재 상태 조회 |
| POST | /api/game/save | 게임 저장 |
| POST | /api/game/load | 게임 불러오기 |
