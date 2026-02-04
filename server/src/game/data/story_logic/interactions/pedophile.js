/**
 * 소아성애자 통합 상호작용 모듈
 *
 * 다른 수감자들에게 기피당함, 도와주면 정보를 줌
 */

const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

module.exports = {
  // ===== 메인 상호작용 진입점 =====
  ...defineScene("interact_pedophile", () => [
    // 친절하게 대함
    action("pedophile_kind_approach"),

    // 거래 제안
    action("pedophile_deal_offer", [cond.notFlag("helpedPedophile")]),

    // 무시
    action("pedophile_ignore_him"),

    action("return_to_hub")
  ]),

  // ===== 친절하게 대함 =====
  ...defineScene("pedophile_kind_approach", () => [
    action("return_to_hub")
  ]),

  // ===== 거래 제안 =====
  ...defineScene("pedophile_deal_offer", {
    effects: [eff.flag("helpedPedophile"), eff.rel("pedophile", 1), eff.flag("knowVentDuct")]
  }, () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ]),

  // ===== 무시 =====
  ...defineScene("pedophile_ignore_him", () => [
    action("return_to_hub")
  ]),

  // ===== 폭행 이벤트 =====
  ...defineScene("pedophile_attack_event", () => [
    action("pedophile_help_him"),
    action("pedophile_watch_attack")
  ]),

  // 도와주기
  ...defineScene("pedophile_help_him", {
    effects: [
      eff.rel("pedophile", 2),
      eff.flag("knowWardenWeakness"),
      eff.flag("defendedPedophile"),
      eff.rel("messiah", 3),
      eff.rel("wifekiller", 3),
      eff.rel("arsonist", 3)
    ]
  }, () => [
    action("pedophile_aftermath")
  ]),

  // 방관하기
  ...defineScene("pedophile_watch_attack", {
    effects: [eff.rel("pedophile", 4)]
  }, () => [
    action("return_to_hub")
  ]),

  // 사후 상황
  ...defineScene("pedophile_aftermath", () => [
    action("return_to_hub", [], [eff.advanceTime()])
  ])
};
