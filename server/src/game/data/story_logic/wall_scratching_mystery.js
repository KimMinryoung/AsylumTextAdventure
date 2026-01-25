const { cond, eff, action, defineScene } = require('../../SceneBuilder');

/**
 * 벽 긁는 소리 미스터리 스토리라인
 *
 * 독방 벽 너머에서 들리는 긁는 소리의 정체를 밝히고,
 * 1943년 수도원 터널을 통해 탈출하는 루트
 */

const scenes = {
  // 독방에서 벽 긁는 소리 발견
  ...defineScene("solitary_wall_scratching", { effects: [eff.flag("heardWallScratching")] }, () => [
    action("solitary_scratch_investigate"),
    action("solitary_scratch_ignore"),
    action("gameover_solitary_madness")
  ]),

  // 소리 무시
  ...defineScene("solitary_scratch_ignore", () => [
    action("solitary_scratch_louder")
  ]),

  // 소리가 점점 커짐
  ...defineScene("solitary_scratch_louder", { effects: [eff.flag("scratchingIntensified")] }, () => [
    action("solitary_scratch_investigate"),
    action("gameover_solitary_madness")
  ]),

  // 벽 조사
  ...defineScene("solitary_scratch_investigate", { effects: [eff.flag("investigatedWall")] }, () => [
    action("solitary_wall_weak_spot"),
    action("solitary_scratch_nothing")
  ]),

  // 아무것도 발견 못함
  ...defineScene("solitary_scratch_nothing", () => [
    action("solitary_scratch_louder"),
    action("ending_solo_despair")
  ]),

  // 벽의 약한 부분 발견
  ...defineScene("solitary_wall_weak_spot", { effects: [eff.flag("foundWeakWall")] }, () => [
    action("solitary_wall_dig"),
    action("ending_solo_despair")
  ]),

  // 벽을 파기 시작
  ...defineScene("solitary_wall_dig", () => [
    action("solitary_wall_breakthrough")
  ]),

  // 벽 돌파 - 터널 발견
  ...defineScene("solitary_wall_breakthrough", { effects: [eff.flag("foundSolitaryTunnel"), eff.flag("foundTunnels")] }, () => [
    action("solitary_tunnel_enter"),
    action("solitary_tunnel_wait")
  ]),

  // 터널 진입
  ...defineScene("solitary_tunnel_enter", { effects: [eff.flag("enteredFromSolitary")] }, () => [
    action("solitary_tunnel_darkness"),
    action("solitary_tunnel_feel_way")
  ]),

  // 기다림 (힘을 모음)
  ...defineScene("solitary_tunnel_wait", () => [
    action("solitary_tunnel_enter")
  ]),

  // 터널 어둠 속으로
  ...defineScene("solitary_tunnel_darkness", () => [
    action("solitary_tunnel_voice"),
    action("solitary_tunnel_crawl")
  ]),

  // 손으로 더듬으며 전진
  ...defineScene("solitary_tunnel_feel_way", () => [
    action("solitary_tunnel_voice"),
    action("solitary_tunnel_crawl")
  ]),

  // 터널에서 목소리 들림
  ...defineScene("solitary_tunnel_voice", { effects: [eff.flag("heardTunnelVoice")] }, () => [
    action("solitary_tunnel_voice_follow"),
    action("solitary_tunnel_voice_flee")
  ]),

  // 목소리 따라감 - 수호자 조우
  ...defineScene("solitary_tunnel_voice_follow", () => [
    action("solitary_guardian_encounter")
  ]),

  // 목소리에서 도망
  ...defineScene("solitary_tunnel_voice_flee", () => [
    action("solitary_tunnel_crawl")
  ]),

  // 터널 기어가기
  ...defineScene("solitary_tunnel_crawl", () => [
    action("solitary_tunnel_fork")
  ]),

  // 터널 갈림길
  ...defineScene("solitary_tunnel_fork", () => [
    action("solitary_tunnel_left"),
    action("solitary_tunnel_right"),
    action("solitary_tunnel_back")
  ]),

  // 왼쪽 터널 - 수호자
  ...defineScene("solitary_tunnel_left", () => [
    action("solitary_guardian_encounter")
  ]),

  // 오른쪽 터널 - 출구
  ...defineScene("solitary_tunnel_right", () => [
    action("solitary_tunnel_exit_light")
  ]),

  // 뒤로 돌아감 - 막힘
  ...defineScene("solitary_tunnel_back", () => [
    action("solitary_tunnel_fork")
  ]),

  // 수호자 조우
  ...defineScene("solitary_guardian_encounter", { effects: [eff.flag("metGuardian")] }, () => [
    action("solitary_guardian_pray", [cond.flag("messiahBlessing")]),
    action("solitary_guardian_diary", [cond.has("수도사 일기")]),
    action("solitary_guardian_confess"),
    action("solitary_guardian_run")
  ]),

  // 메시아 축복으로 대항
  ...defineScene("solitary_guardian_pray", { effects: [eff.flag("guardianRepelled")] }, () => [
    action("solitary_tunnel_exit_light")
  ]),

  // 수도사 일기로 대항
  ...defineScene("solitary_guardian_diary", { effects: [eff.flag("guardianRepelled")] }, () => [
    action("solitary_tunnel_exit_light")
  ]),

  // 죄를 고백
  ...defineScene("solitary_guardian_confess", { effects: [eff.flag("confessedSins")] }, () => [
    action("solitary_guardian_judgment")
  ]),

  // 수호자의 심판
  ...defineScene("solitary_guardian_judgment", () => [
    action("solitary_tunnel_exit_light")
  ]),

  // 도망
  ...defineScene("solitary_guardian_run", () => [
    action("solitary_tunnel_exit_light"),
    action("ending_guardian_consumed")
  ]),

  // 출구 빛 발견
  ...defineScene("solitary_tunnel_exit_light", () => [
    action("ending_solitary_tunnel_escape")
  ]),

  // 엔딩: 수호자에게 삼켜짐
  ...defineScene("ending_guardian_consumed", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  // 엔딩: 독방 터널 탈출
  ...defineScene("ending_solitary_tunnel_escape", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ])
};

module.exports = scenes;
