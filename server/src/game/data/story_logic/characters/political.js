const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

const scenes = {
  // 첫 만남 - 관계 없을 때는 경계하는 태도
  ...defineScene("talk_political", () => [
    action("political_family", [cond.relMin("political", 2)]),
    action("political_advice", [cond.relMin("political", 1)]),
    action("political_info"),
    action("political_wary")
  ]),

  // 관계가 낮을 때 경계하는 반응
  ...defineScene("political_wary", () => [
    action("political_prove_trust"),
    action("first_night")
  ]),

  // 신뢰를 증명하는 선택
  ...defineScene("political_prove_trust", { effects: [eff.rel("political")] }, () => [
    action("political_info"),
    action("first_night")
  ]),

  ...defineScene("political_family", () => [
    action("political_request"),
    action("first_night")
  ]),

  ...defineScene("political_request", { effects: [eff.getItem("정치범의 편지"), eff.flag("politicalPromise")] }, () => [
    action("political_grateful")
  ]),

  ...defineScene("political_grateful", { effects: [eff.flag("knowWednesdayGap"), eff.rel("political", 2)] }, () => [
    action("first_night")
  ]),

  // 관계가 있어야 탈출 정보 제공
  ...defineScene("political_advice", { effects: [eff.flag("knowSewerPath"), eff.rel("political")] }, () => [
    action("political_family", [cond.relMin("political", 2)]),
    action("first_night")
  ]),

  ...defineScene("political_info", () => [
    action("political_info_fraudster"),
    action("political_info_wifekiller"),
    action("political_info_messiah"),
    action("political_family", [cond.relMin("political", 2)], [eff.flag("knowPrisoners"), eff.rel("political")]),
    action("first_night", [], [eff.flag("knowPrisoners"), eff.rel("political")])
  ]),

  // 사기꾼에 대한 정치범의 평가
  ...defineScene("political_info_fraudster", { effects: [eff.flag("politicalWarnFraudster")] }, () => [
    action("political_info_wifekiller"),
    action("political_info_messiah"),
    action("first_night", [], [eff.rel("political")])
  ]),

  // 아내 살인범에 대한 정치범의 평가
  ...defineScene("political_info_wifekiller", { effects: [eff.flag("politicalKnowWifekiller")] }, () => [
    action("political_info_fraudster", [cond.notFlag("politicalWarnFraudster")]),
    action("political_info_messiah"),
    action("first_night", [], [eff.rel("political")])
  ]),

  // 메시아에 대한 정치범의 평가
  ...defineScene("political_info_messiah", { effects: [eff.flag("politicalKnowMessiah")] }, () => [
    action("political_info_fraudster", [cond.notFlag("politicalWarnFraudster")]),
    action("political_info_wifekiller", [cond.notFlag("politicalKnowWifekiller")]),
    action("first_night", [], [eff.rel("political")])
  ]),

  // 식당 - 관계에 따라 다른 반응
  ...defineScene("cafeteria_political", () => [
    action("cafeteria_political_deep", [cond.relMin("political", 3)]),
    action("cafeteria_political_book"),
    action("cafeteria_political_crime", [], [eff.rel("political")]),
    action("cafeteria_political_quiet")
  ]),

  // 관계가 높을 때만 나오는 깊은 대화
  ...defineScene("cafeteria_political_deep", { effects: [eff.rel("political")] }, () => [
    action("cafeteria_political_deep_guard"),
    action("cafeteria_political_deep_fraudster", [cond.relMin("fraudster", 1)]),
    action("cafeteria_end")
  ]),

  // 간수장의 비밀에 대한 정보
  ...defineScene("cafeteria_political_deep_guard", { effects: [eff.flag("knowGuardSecret")] }, () => [
    action("cafeteria_end")
  ]),

  // 사기꾼과 관계가 있을 때 나오는 경고
  ...defineScene("cafeteria_political_deep_fraudster", () => [
    action("cafeteria_political_ignore_warning"),
    action("cafeteria_political_heed_warning", [], [eff.flag("warnedAboutFraudster")])
  ]),

  ...defineScene("cafeteria_political_ignore_warning", () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_political_heed_warning", { effects: [eff.rel("political")] }, () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_political_book", { effects: [eff.rel("political")] }, () => [
    action("cafeteria_political_agree", [], [eff.rel("political")]),
    action("cafeteria_political_body")
  ]),

  ...defineScene("cafeteria_political_crime", { effects: [eff.flag("knowPoliticalStory")] }, () => [
    action("cafeteria_political_respect", [], [eff.rel("political", 2)]),
    action("cafeteria_political_escape")
  ]),

  ...defineScene("cafeteria_political_quiet", () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_political_agree", { effects: [eff.rel("political", 2)] }, () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_political_body", () => [
    action("cafeteria_end")
  ]),

  ...defineScene("cafeteria_political_respect", { effects: [eff.rel("political", 2)] }, () => [
    action("cafeteria_end")
  ]),

  // 관계가 높을 때만 탈출 정보 제공
  ...defineScene("cafeteria_political_escape", { effects: [eff.rel("political", 2), eff.flag("knowWednesday")] }, () => [
    action("cafeteria_end")
  ]),

  ...defineScene("political_night_talk", { effects: [eff.flag("wednesdayConfirmed")] }, () => [
    action("day_three_morning")
  ]),

  // 높은 관계에서 특별 도움
  ...defineScene("political_help_escape", { effects: [eff.flag("politicalDistraction")] }, () => [
    action("escape_with_distraction")
  ])
};

module.exports = scenes;
