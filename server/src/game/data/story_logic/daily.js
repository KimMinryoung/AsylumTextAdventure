const { cond, eff, action, defineScene } = require('../../SceneBuilder');

const scenes = {
  // 교육 세션 (day_two_evening에서 접근)
  ...defineScene("education_session", () => [
    action("education_mental", [], [eff.edu(1)]),
    action("education_vocational", [], [eff.edu(1)]),
    action("education_skip")
  ]),

  // 정신 교육 (인성 교육, 재활 프로그램)
  ...defineScene("education_mental", { effects: [eff.rel("guard", 1)] }, () => [
    action("education_mental_participate"),
    action("education_mental_sleep")
  ]),

  ...defineScene("education_mental_participate", { effects: [eff.edu(1), eff.flag("educationActive")] }, () => [
    action("education_reward", [cond.eduMin(2)]),
    action("day_two_evening")
  ]),

  ...defineScene("education_mental_sleep", () => [
    action("day_two_evening")
  ]),

  // 직업 훈련 (기술 교육)
  ...defineScene("education_vocational", { effects: [eff.rel("guard", 1)] }, () => [
    action("education_vocational_focus"),
    action("education_vocational_slack")
  ]),

  ...defineScene("education_vocational_focus", { effects: [eff.edu(1), eff.flag("learnedSkill")] }, () => [
    action("education_reward", [cond.eduMin(2)]),
    action("day_two_evening")
  ]),

  ...defineScene("education_vocational_slack", () => [
    action("day_two_evening")
  ]),

  // 교육 스킵
  ...defineScene("education_skip", () => [
    action("day_two_evening")
  ]),

  // 교육 보상 (교육 점수 누적 시)
  ...defineScene("education_reward", { effects: [eff.getItem("교육 이수증"), eff.flag("educationCompleted")] }, () => [
    action("day_two_evening")
  ])
};

module.exports = scenes;
