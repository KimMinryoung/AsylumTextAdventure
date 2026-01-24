const { cond, eff, action, defineScene } = require('../../SceneBuilder');

const scenes = {
  // 하수구 목소리 조사 (day_two_bathroom 이후 추가 선택지)
  ...defineScene("sewer_voice_investigate", { effects: [eff.flag("investigatedSewerVoice")] }, () => [
    action("sewer_voice_listen"),
    action("sewer_voice_ignore")
  ]),

  // 목소리를 더 듣는다
  ...defineScene("sewer_voice_listen", { effects: [eff.flag("knowSewerSurvivor")] }, () => [
    action("sewer_voice_promise"),
    action("sewer_voice_food"),
    action("sewer_voice_ignore")
  ]),

  // 탈출 시 데려가겠다고 약속
  ...defineScene("sewer_voice_promise", { effects: [eff.flag("promisedSewerSurvivor"), eff.flag("knowSewerExit")] }, () => [
    action("day_two_nightmare")
  ]),

  // 음식을 가져다 주겠다고 약속
  ...defineScene("sewer_voice_food", { effects: [eff.flag("promisedFood")] }, () => [
    action("day_two_nightmare")
  ]),

  // 무시하고 돌아감
  ...defineScene("sewer_voice_ignore", () => [
    action("day_two_nightmare")
  ]),

  // 음식 전달 (3일차 저녁)
  ...defineScene("sewer_bring_food", { effects: [eff.flag("fedSewerSurvivor")] }, () => [
    action("sewer_survivor_story"),
    action("day_three_evening")
  ]),

  // 생존자의 이야기
  ...defineScene("sewer_survivor_story", { effects: [eff.flag("knowRiotTruth")] }, () => [
    action("sewer_survivor_evidence"),
    action("sewer_promise_evidence"),
    action("day_three_evening")
  ]),

  // 증거물에 대해 묻는다
  ...defineScene("sewer_survivor_evidence", { effects: [eff.flag("knowEvidence")] }, () => [
    action("sewer_promise_evidence"),
    action("day_three_evening")
  ]),

  // 증거물을 가져가겠다고 약속
  ...defineScene("sewer_promise_evidence", { effects: [eff.flag("promisedEvidence"), eff.flag("sewerSurvivorRoute")] }, () => [
    action("day_three_evening")
  ]),

  // 하수도에서 생존자와 만남 (탈출 시)
  ...defineScene("sewer_mystery_encounter", () => [
    action("sewer_escape_together"),
    action("sewer_take_evidence_only")
  ]),

  // 함께 탈출
  ...defineScene("sewer_escape_together", { effects: [eff.getItem("폭동 증거물"), eff.flag("escapedWithSurvivor")] }, () => [
    action("ending_witness")
  ]),

  // 증거물만 받고 혼자 탈출
  ...defineScene("sewer_take_evidence_only", { effects: [eff.getItem("폭동 증거물")] }, () => [
    action("ending_solo_success")
  ]),

  // 엔딩: 증인
  ...defineScene("ending_witness", { effects: [eff.flag("endingWitness")] }, () => [
    action("entrance")
  ])
};

module.exports = scenes;
