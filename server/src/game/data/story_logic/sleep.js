const { cond, eff, action, defineScene } = require('../../SceneBuilder');

const scenes = {
  ...defineScene("first_night", () => [
    action("first_night_investigate"),
    action("arsonist_night_whisper", [cond.relMin("arsonist", 1)]),
    action("night_whisper"),
    action("first_night_sleep")
  ]),

  ...defineScene("first_night_investigate", { effects: [eff.flag("heardVentNoise")] }, () => [
    action("first_night_sleep")
  ]),

  ...defineScene("first_night_sleep", () => [
    action("first_night_wake")
  ]),

  ...defineScene("first_night_wake", () => [
    action("messiah_cryptic"),
    action("day_two_morning")
  ]),

  ...defineScene("messiah_cryptic", { effects: [eff.flag("messiahCryptic")] }, () => [
    action("day_two_morning")
  ]),

  ...defineScene("day_two_morning", {
    effects: [eff.setDay(2), eff.setTimeSlot(0), eff.moveTo("cell")]
  }, () => [
    action("workshop"),
    action("yard")
  ]),

  ...defineScene("day_two_evening", () => [
    action("education_session", [cond.notFlag("educationToday")]),
    action("day_two_early_sleep"),
    action("day_two_night_explore"),
    action("day_two_bathroom", [cond.flag("foundNote")])
  ]),

  ...defineScene("day_two_bathroom", { effects: [eff.flag("heardSewerVoice")] }, () => [
    action("sewer_voice_investigate"),
    action("day_two_nightmare")
  ]),

  ...defineScene("day_two_early_sleep", () => [
    action("day_two_nightmare")
  ]),

  ...defineScene("day_two_nightmare", () => [
    action("day_three_morning")
  ]),

  ...defineScene("day_two_night_explore", { effects: [eff.flag("knowPatrolGap")] }, () => [
    action("night_torchlight_discovery", [cond.flag("knowBeeNest")]),
    action("political_night_talk", [cond.relMin("political", 3)]),
    action("guard_night_friendly", [cond.relMin("guard", 1)]),
    action("guard_night_hostile", [cond.relMax("guard", 0)]),
    action("day_two_nightmare")
  ]),

  ...defineScene("day_three_morning", {
    effects: [eff.setDay(3), eff.setTimeSlot(0), eff.moveTo("cell")]
  }, () => [
    action("pedophile_attack", [cond.flag("helpedPedophile")]),
    action("day_three_workshop", [cond.notFlag("helpedPedophile")])
  ]),

  ...defineScene("day_three_afternoon", () => [
    action("messiah_listen_to_plan_detail", [cond.flag("knowMessiahPlan"), cond.notFlag("messiahKeyDelivered")]),
    action("arsonist_listen_to_plan_detail", [cond.flag("knowArsonistPlan"), cond.notFlag("arsonistReady")]),
    action("day_three_yard")
  ]),

  ...defineScene("day_three_dinner", () => [
    action("day_three_evening")
  ]),

  ...defineScene("day_three_evening", () => [
    action("gameover_messiah_followers", [cond.flag("messiahEnemy"), cond.relMax("fraudster", 1), cond.notFlag("knowArsonistPlan"), cond.relMax("wifekiller", 2)]),
    action("gameover_burned_alive", [cond.flag("arsonistEnemy"), cond.notFlag("knowMessiahPlan"), cond.relMax("fraudster", 1), cond.relMax("wifekiller", 2), cond.notFlag("knowEmergencyExit")]),
    action("sewer_bring_food", [cond.flag("promisedFood")]),
    action("night_torchlight_investigate", [cond.flag("suspectCultCamp"), cond.relMin("political", 2)]),
    action("day_four_final")
  ]),

  ...defineScene("day_four_final", () => [
    action("ending_messiah_enhanced", [cond.flag("messiahKeyDelivered")]),
    action("ending_messiah_route", [cond.flag("knowMessiahPlan"), cond.notFlag("messiahKeyDelivered")]),
    action("ending_cult_direct_contact", [cond.flag("cultResponseReceived")]),
    action("ending_cult_political_alliance", [cond.flag("cultContactMade"), cond.relMin("political", 3)]),
    action("ending_fraudster_route", [cond.relMin("fraudster", 2), cond.notFlag("fraudsterRefused")]),
    action("fraudster_bribe_guard", [cond.relMin("fraudster", 4)]),
    action("political_help_escape", [cond.relMin("political", 4)]),
    action("ending_arsonist_safe", [cond.flag("arsonistMinimized")]),
    action("ending_arsonist_route", [cond.flag("arsonistReady"), cond.notFlag("arsonistMinimized")]),
    action("ending_warden_route", [cond.flag("wardenBlackmailed")]),
    action("ending_wall_route", [cond.flag("wallEscapePlan")]),
    action("ending_emergency_route", [cond.flag("knowEmergencyExit")]),
    action("sewer_mystery_encounter", [cond.flag("sewerSurvivorRoute")]),
    action("solo_escape_prepared", [cond.flag("knowSewerPath"), cond.flag("knowPatrolGap")]),
    action("solo_escape_partial", [cond.relMin("wifekiller", 3)]),
    action("solo_escape_unprepared"),
    action("ending_surrender")
  ]),

  ...defineScene("night_whisper", { effects: [eff.flag("overheardArsonist")] }, () => [
    action("night_whisper_more"),
    action("day_two_morning")
  ]),

  ...defineScene("night_whisper_more", { effects: [eff.flag("knowArsonistPlan")] }, () => [
    action("day_two_morning")
  ])
};

module.exports = scenes;
