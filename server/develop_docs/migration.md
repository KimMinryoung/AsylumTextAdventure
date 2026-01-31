╭──────────────────────────────────────────────────────────────────────────────╮
│ Plan to implement                                                            │
│                                                                              │
│ Story Text 원격 편집 시스템 구현 계획                                        │
│                                                                              │
│ 목표                                                                         │
│                                                                              │
│ 스마트폰으로 원격에서 story_text를 편집할 수 있도록:                         │
│ 1. story_text 데이터를 Supabase PostgreSQL에 저장                            │
│ 2. 홈페이지(BichonWebpage)의 admin 섹션에 story-editor 페이지 추가           │
│ 3. 기존 세션 인증 활용                                                       │
│                                                                              │
│ 현재 상태 분석                                                               │
│                                                                              │
│ 홈페이지 (BichonWebpage)                                                     │
│                                                                              │
│ - 스택: Express + EJS + PostgreSQL (Supabase)                                │
│ - 인증: express-session + bcryptjs (세션 기반)                               │
│ - DB: Supabase PostgreSQL (이미 연결됨)                                      │
│ - Admin 영역: /admin/* 라우트, requireAuth 미들웨어                          │
│                                                                              │
│ 게임 서버 (AIToyProject)                                                     │
│                                                                              │
│ - story_text: 24개 JSON 파일, ~200개 scene                                   │
│ - 구조: { sceneId: { script: string[], actions: string[], location: string } │
│  }                                                                           │
│                                                                              │
│ ---                                                                          │
│ 구현 단계                                                                    │
│                                                                              │
│ Phase 1: Supabase 스키마 생성 (BichonWebpage DB)                             │
│                                                                              │
│ 테이블: story_scenes                                                         │
│ CREATE TABLE story_scenes (                                                  │
│     id SERIAL PRIMARY KEY,                                                   │
│     scene_id VARCHAR(100) UNIQUE NOT NULL,                                   │
│     file_path VARCHAR(200) NOT NULL,  -- 원본 파일 경로 (정리용)             │
│     script JSONB NOT NULL DEFAULT '[]',                                      │
│     actions JSONB NOT NULL DEFAULT '[]',                                     │
│     location VARCHAR(50),                                                    │
│     created_at TIMESTAMP DEFAULT NOW(),                                      │
│     updated_at TIMESTAMP DEFAULT NOW()                                       │
│ );                                                                           │
│                                                                              │
│ CREATE INDEX idx_story_scenes_file_path ON story_scenes(file_path);          │
│ CREATE INDEX idx_story_scenes_location ON story_scenes(location);            │
│                                                                              │
│ Phase 2: 데이터 마이그레이션 스크립트 (AIToyProject)                         │
│                                                                              │
│ 파일: server/scripts/migrate_to_supabase.js                                  │
│                                                                              │
│ 1. 모든 story_text JSON 파일 읽기                                            │
│ 2. 각 scene을 DB에 INSERT                                                    │
│ 3. file_path 정보 보존 (나중에 파일별 필터링용)                              │
│                                                                              │
│ Phase 3: 게임 서버 수정 (AIToyProject)                                       │
│                                                                              │
│ 수정 파일: server/src/game/data/story_text/index.js                          │
│                                                                              │
│ 1. Supabase 클라이언트 추가 (@supabase/supabase-js)                          │
│ 2. 서버 시작 시 DB에서 story_text 로드                                       │
│ 3. 메모리 캐시 + 주기적 갱신 (또는 웹훅)                                     │
│                                                                              │
│ // 옵션 A: 서버 시작 시 1회 로드 (간단)                                      │
│ // 옵션 B: 요청마다 DB 조회 (실시간, 느림)                                   │
│ // 옵션 C: 캐시 + TTL (권장)                                                 │
│                                                                              │
│ 새 파일: server/src/config/supabase.js                                       │
│ const { createClient } = require('@supabase/supabase-js');                   │
│ const supabase = createClient(                                               │
│     process.env.SUPABASE_URL,                                                │
│     process.env.SUPABASE_ANON_KEY                                            │
│ );                                                                           │
│ module.exports = supabase;                                                   │
│                                                                              │
│ Phase 4: 홈페이지에 Story Editor 추가 (BichonWebpage)                        │
│                                                                              │
│ 4.1 라우트 추가                                                              │
│                                                                              │
│ 파일: routes/admin.js                                                        │
│ // Story Editor 페이지                                                       │
│ router.get('/story-editor', requireAuth, async (req, res) => {               │
│     // 파일 목록 조회 (DISTINCT file_path)                                   │
│     const { rows: files } = await db.query(                                  │
│         'SELECT DISTINCT file_path FROM story_scenes ORDER BY file_path'     │
│     );                                                                       │
│     res.render('admin/story-editor', { files });                             │
│ });                                                                          │
│                                                                              │
│ 4.2 API 엔드포인트 추가                                                      │
│                                                                              │
│ 새 파일: routes/story-api.js                                                 │
│ // GET /api/story/files - 파일 목록                                          │
│ // GET /api/story/scenes/:filePath - 파일별 scene 목록                       │
│ // GET /api/story/scene/:sceneId - scene 상세                                │
│ // PUT /api/story/scene/:sceneId - scene 수정                                │
│                                                                              │
│ 4.3 EJS 뷰 추가                                                              │
│                                                                              │
│ 새 파일: views/admin/story-editor.ejs                                        │
│ - 기존 editor의 3-패널 레이아웃 유지                                         │
│ - Vanilla JS 로직 활용 (API 엔드포인트만 변경)                               │
│                                                                              │
│ ---                                                                          │
│ 파일 변경 요약                                                               │
│                                                                              │
│ BichonWebpage (홈페이지 repo)                                                │
│ ┌──────────────────────────────┬─────────────────────────────┐               │
│ │             파일             │            작업             │               │
│ ├──────────────────────────────┼─────────────────────────────┤               │
│ │ routes/admin.js              │ story-editor 라우트 추가    │               │
│ ├──────────────────────────────┼─────────────────────────────┤               │
│ │ routes/story-api.js          │ 신규 - Story API 엔드포인트 │               │
│ ├──────────────────────────────┼─────────────────────────────┤               │
│ │ views/admin/story-editor.ejs │ 신규 - Editor UI            │               │
│ ├──────────────────────────────┼─────────────────────────────┤               │
│ │ public/css/story-editor.css  │ 신규 - Editor 스타일        │               │
│ ├──────────────────────────────┼─────────────────────────────┤               │
│ │ public/js/story-editor.js    │ 신규 - Editor 로직          │               │
│ ├──────────────────────────────┼─────────────────────────────┤               │
│ │ server.js                    │ story-api 라우트 마운트     │               │
│ └──────────────────────────────┴─────────────────────────────┘               │
│ AIToyProject (게임 서버 repo)                                                │
│ 파일: server/scripts/migrate_to_supabase.js                                  │
│ 작업: 신규 - 마이그레이션 스크립트                                           │
│ ────────────────────────────────────────                                     │
│ 파일: server/src/config/supabase.js                                          │
│ 작업: 신규 - Supabase 클라이언트                                             │
│ ────────────────────────────────────────                                     │
│ 파일: server/src/game/data/story_text/index.js                               │
│ 작업: 수정 - DB에서 로드                                                     │
│ ────────────────────────────────────────                                     │
│ 파일: server/package.json                                                    │
│ 작업: @supabase/supabase-js 추가                                             │
│ ────────────────────────────────────────                                     │
│ 파일: server/.env                                                            │
│ 작업: SUPABASE_URL, SUPABASE_ANON_KEY 추가                                   │
│ ---                                                                          │
│ 데이터 흐름                                                                  │
│                                                                              │
│ [스마트폰 브라우저]                                                          │
│        ↓                                                                     │
│ [홈페이지 - BichonWebpage] ←→ [Supabase PostgreSQL]                          │
│        ↑                              ↑                                      │
│    (세션 인증)                         |                                     │
│                                       ↓                                      │
│                             [게임 서버 - AIToyProject]                       │
│                                  (시작 시 로드)                              │
│                                                                              │
│ ---                                                                          │
│ 환경 변수                                                                    │
│                                                                              │
│ BichonWebpage                                                                │
│                                                                              │
│ 이미 Supabase DB에 연결됨 (기존 DB_* 환경변수 사용)                          │
│                                                                              │
│ AIToyProject (추가 필요)                                                     │
│                                                                              │
│ SUPABASE_URL=https://xxx.supabase.co                                         │
│ SUPABASE_ANON_KEY=eyJ...                                                     │
│                                                                              │
│ ---                                                                          │
│ 검증 방법                                                                    │
│                                                                              │
│ 1. 마이그레이션 검증                                                         │
│   - 스크립트 실행 후 DB에서 scene 개수 확인                                  │
│   - 랜덤 scene 내용 비교                                                     │
│ 2. 게임 서버 검증                                                            │
│   - 서버 시작 후 게임 플레이 정상 동작 확인                                  │
│   - DB 수정 → 서버 재시작 → 변경 반영 확인                                   │
│ 3. Editor 검증                                                               │
│   - 홈페이지 로그인 → /admin/story-editor 접근                               │
│   - scene 수정 → 저장 → 게임에서 확인                                        │
│                                                                              │
│ ---                                                                          │
│ 고려사항                                                                     │
│                                                                              │
│ 동기화 전략                                                                  │
│                                                                              │
│ - 권장: 서버 시작 시 1회 로드 + 수동 새로고침 API                            │
│ - 이유: 게임 중 실시간 변경은 불필요, 개발 중에만 수정                       │
│                                                                              │
│ 롤백 전략                                                                    │
│                                                                              │
│ - 기존 JSON 파일 유지 (삭제하지 않음)                                        │
│ - USE_DB_STORY_TEXT=true 환경변수로 전환                                     │
│ - 문제 시 환경변수 제거하면 파일 기반으로 복귀                               │
│                                                                              │
│ 보안                                                                         │
│                                                                              │
│ - story-api는 requireAuth 미들웨어로 보호                                    │
│ - Supabase Row Level Security는 필요 없음 (서버-투-서버 통신)                │
│                                                                              │
│ ---                                                                          │
│ 작업 순서                                                                    │
│                                                                              │
│ 1. Supabase에 story_scenes 테이블 생성 (수동)                                │
│ 2. 마이그레이션 스크립트 작성 및 실행                                        │
│ 3. 게임 서버 Supabase 연동                                                   │
│ 4. 홈페이지에 story-editor 추가                                              │
│ 5. 테스트 및 배포                                                            │
╰──────────────────────────────────────────────────────────────────────────────╯