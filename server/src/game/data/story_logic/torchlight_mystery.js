const { cond, eff, action, defineScene } = require('../../SceneBuilder');

/**
 * 숲의 횃불 미스터리 스토리라인
 *
 * 메시아의 외부 세력(천상의 문 신도들)이 수용소 주변 숲에서 대기 중이라는
 * 미스터리를 밝혀내고, 이를 통해 새로운 탈출 루트를 열 수 있음
 */

const scenes = {
  // 밤에 창밖에서 횃불 발견
  ...defineScene("night_torchlight_discovery", { effects: [eff.flag("sawTorchlight")] }, () => [
    action("torchlight_watch_longer"),
    action("torchlight_ask_political"),
    action("torchlight_ignore")
  ]),

  // 횃불을 더 오래 관찰
  ...defineScene("torchlight_watch_longer", { effects: [eff.flag("torchlightPattern")] }, () => [
    action("torchlight_ask_political"),
    action("day_two_nightmare")
  ]),

  // 정치범에게 횃불에 대해 물어봄
  ...defineScene("torchlight_ask_political", { effects: [eff.flag("knowTorchlightRumor"), eff.rel("political", 1)] }, () => [
    action("torchlight_political_theory"),
    action("day_two_nightmare")
  ]),

  // 정치범의 추론
  ...defineScene("torchlight_political_theory", { effects: [eff.flag("suspectCultCamp")] }, () => [
    action("day_two_nightmare")
  ]),

  // 횃불 무시
  ...defineScene("torchlight_ignore", () => [
    action("day_two_nightmare")
  ]),

  // 3일차에 메시아에게 횃불에 대해 직접 물어봄 (운동장에서)
  ...defineScene("yard_ask_messiah_torchlight", { effects: [eff.rel("messiah", -1)] }, () => [
    action("messiah_torchlight_deny"),
    action("messiah_torchlight_reveal", [cond.relMin("messiah", 4)])
  ]),

  // 메시아가 부정
  ...defineScene("messiah_torchlight_deny", () => [
    action("day_three_dinner")
  ]),

  // 메시아가 진실을 밝힘 (높은 관계일 때)
  ...defineScene("messiah_torchlight_reveal", { effects: [eff.flag("knowCultCampLocation")] }, () => [
    action("messiah_offer_cult_contact"),
    action("day_three_dinner")
  ]),

  // 메시아가 외부 세력 접촉 제안
  ...defineScene("messiah_offer_cult_contact", { effects: [eff.flag("cultContactOffered")] }, () => [
    action("day_three_dinner")
  ]),

  // 3일차 밤 - 정치범과 함께 조사
  ...defineScene("night_torchlight_investigate", { effects: [eff.flag("investigatingTorchlight")] }, () => [
    action("torchlight_roof_climb"),
    action("torchlight_signal_attempt"),
    action("day_four_final")
  ]),

  // 옥상에서 관찰
  ...defineScene("torchlight_roof_climb", { effects: [eff.flag("sawCultCamp")] }, () => [
    action("torchlight_count_fires"),
    action("torchlight_signal_attempt")
  ]),

  // 불빛 개수 확인
  ...defineScene("torchlight_count_fires", { effects: [eff.flag("knowCultNumbers")] }, () => [
    action("torchlight_signal_attempt"),
    action("day_four_final")
  ]),

  // 신호 시도
  ...defineScene("torchlight_signal_attempt", () => [
    action("torchlight_signal_success", [cond.has("라이터")]),
    action("torchlight_signal_fail", [cond.notHas("라이터")])
  ]),

  // 신호 성공 (라이터 있을 때)
  ...defineScene("torchlight_signal_success", { effects: [eff.flag("cultContactMade"), eff.drop("라이터")] }, () => [
    action("cult_response_wait")
  ]),

  // 신호 실패
  ...defineScene("torchlight_signal_fail", () => [
    action("day_four_final")
  ]),

  // 외부 세력 응답 대기
  ...defineScene("cult_response_wait", { effects: [eff.flag("cultResponseReceived")] }, () => [
    action("day_four_final")
  ]),

  // 4일차 - 외부 세력과 직접 탈출 (메시아 없이)
  ...defineScene("ending_cult_direct_contact", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ]),

  // 4일차 - 정치범과 함께 외부 세력 이용 탈출
  ...defineScene("ending_cult_political_alliance", { isEnding: true }, () => [
    action("entrance", [], [eff.reset()])
  ])
};

module.exports = scenes;
