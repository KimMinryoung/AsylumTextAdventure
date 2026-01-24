const { cond, eff, action, defineScene } = require('../../SceneBuilder');

const scenes = {
  ...defineScene("workshop", () => [
    action("gameover_groper_trap", [cond.flag("groperEnemy")]),
    action("workshop_hardwork", [cond.notFlag("groperEnemy")], [eff.work(1), eff.rel("guard", 1)]),
    action("workshop_steal_oil", [cond.flag("knowArsonistPlan"), cond.notFlag("groperEnemy")], [eff.getItem("라이터 기름")]),
    action("workshop_steal_tool", [cond.notFlag("groperEnemy")], [eff.getItem("작은 드라이버")]),
    action("workshop_normal", [cond.notFlag("groperEnemy")]),
    action("workshop_examine_press"),
    action("workshop_strange_noise"),
    action("workshop_glitch", [cond.relMin("groper", 1)]),
    action("workshop_error_discovery", [cond.notFlag("groperEnemy"), cond.notFlag("foundGhostError")])
  ]),

  ...defineScene("workshop_hardwork", () => [
    action("workshop_hardwork_reward", [cond.workMin(2)]),
    action("cafeteria_arrival")
  ]),

  ...defineScene("workshop_hardwork_reward", { effects: [eff.getItem("담배 한 갑"), eff.flag("modelPrisoner")] }, () => [
    action("cafeteria_arrival")
  ]),

  ...defineScene("workshop_examine_press", { effects: [eff.flag("knowWorkshopDanger")] }, () => [
    action("workshop_accident_truth"),
    action("workshop_normal")
  ]),

  ...defineScene("workshop_accident_truth", { effects: [eff.flag("knowGroperDanger")] }, () => [
    action("cafeteria_arrival")
  ]),

  ...defineScene("workshop_steal_oil", () => [
    action("cafeteria_arrival")
  ]),

  ...defineScene("workshop_steal_tool", () => [
    action("cafeteria_arrival")
  ]),

  ...defineScene("workshop_normal", () => [
    action("talk_wifekiller"),
    action("cafeteria_arrival")
  ]),

  ...defineScene("workshop_strange_noise", { effects: [eff.flag("heardStrangeNoise")] }, () => [
    action("workshop_ask_noise"),
    action("cafeteria_arrival")
  ]),

  ...defineScene("workshop_ask_noise", { effects: [eff.flag("knowWorkshopHistory")] }, () => [
    action("cafeteria_arrival")
  ]),

  ...defineScene("day_three_workshop", () => [
    action("fraudster_collect_debt", [cond.flag("owesFraudster")]),
    action("guard_favor_workshop", [cond.relMin("guard", 2)]),
    action("day_three_hardwork", [], [eff.work(1), eff.rel("guard", 1)]),
    action("day_three_mediator", [cond.flag("conflictMediator")]),
    action("day_three_key_heist", [cond.flag("messiahKeyMission")]),
    action("day_three_arsonist_prep", [cond.flag("knowArsonistPlan"), cond.notFlag("arsonistReady")]),
    action("day_three_fraudster_check", [cond.flag("knowFraudsterPlan")]),
    action("day_three_observe")
  ]),

  ...defineScene("day_three_hardwork", () => [
    action("day_three_hardwork_reward", [cond.workMin(3)]),
    action("day_three_afternoon")
  ]),

  ...defineScene("day_three_hardwork_reward", { effects: [eff.getItem("특별 배식권"), eff.flag("trustedByGuard")] }, () => [
    action("day_three_afternoon")
  ]),

  ...defineScene("day_three_mediator", { effects: [eff.flag("knowMessiahPlan"), eff.flag("knowArsonistPlan")] }, () => [
    action("messiah_listen_to_plan_detail", [cond.notFlag("messiahKeyDelivered")]),
    action("arsonist_listen_to_plan_detail", [cond.notFlag("arsonistReady")]),
    action("day_three_afternoon")
  ]),

  ...defineScene("day_three_key_heist", () => [
    action("key_heist_success", [cond.flag("knowKeyStructure")]),
    action("key_heist_risky"),
    action("key_heist_distraction", [cond.flag("defendedPedophile")])
  ]),

  ...defineScene("key_heist_success", { effects: [eff.getItem("환기구 카드키")] }, () => [
    action("day_three_afternoon")
  ]),

  ...defineScene("key_heist_risky", () => [
    action("key_heist_excuse_success", [cond.flag("hurtLeg")]),
    action("key_heist_caught")
  ]),

  ...defineScene("key_heist_excuse_success", () => [
    action("day_three_afternoon")
  ]),

  ...defineScene("key_heist_caught", () => [
    action("solitary_cell")
  ]),

  ...defineScene("key_heist_distraction", { effects: [eff.getItem("환기구 카드키")] }, () => [
    action("day_three_afternoon")
  ]),

  ...defineScene("day_three_observe", () => [
    action("wifekiller_final_help", [cond.relMin("wifekiller", 3)]),
    action("day_three_afternoon")
  ]),

  ...defineScene("workshop_glitch", { effects: [eff.flag("machineGlitch")] }, () => [
    action("confront_groper_workshop"),
    action("cafeteria_arrival")
  ]),

  ...defineScene("confront_groper_workshop", { effects: [eff.rel("groper", -2), eff.flag("groperTension")] }, () => [
    action("cafeteria_arrival")
  ]),

  // === 개발자의 백도어 발견 (소장실 연결) ===
  ...defineScene("workshop_error_discovery", { effects: [eff.flag("foundGhostError")] }, () => [
    action("workshop_error_examine"),
    action("cafeteria_arrival")
  ]),

  ...defineScene("workshop_error_examine", { effects: [eff.flag("recognizedMyCode")] }, () => [
    action("workshop_seek_main_terminal"),
    action("cafeteria_arrival")
  ]),

  // 메인 터미널을 찾아야 함을 깨닫는 장면
  ...defineScene("workshop_seek_main_terminal", { effects: [eff.flag("knowsWardenTerminal")] }, () => [
    action("warden_office_hub"),
    action("cafeteria_arrival")
  ])
};

module.exports = scenes;
