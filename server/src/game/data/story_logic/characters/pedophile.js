const { cond, eff, action, defineScene } = require('../../../SceneBuilder');

const scenes = {
  ...defineScene("pedophile_kind", () => [
    action("cafeteria_arrival")
  ]),

  ...defineScene("pedophile_deal", { effects: [eff.flag("helpedPedophile"), eff.rel("pedophile"), eff.flag("knowVentDuct")] }, () => [
    action("cafeteria_arrival")
  ]),

  ...defineScene("pedophile_attack", () => [
    action("pedophile_help"),
    action("pedophile_ignore")
  ]),

  ...defineScene("pedophile_help", { effects: [eff.rel("pedophile", 2), eff.flag("knowWardenWeakness"), eff.flag("defendedPedophile"), eff.rel("messiah", 3), eff.rel("wifekiller", 3), eff.rel("arsonist", 3)] }, () => [
    action("day_three_workshop_contempt")
  ]),

  ...defineScene("day_three_workshop_contempt", () => [
    action("day_three_observe")
  ]),

  ...defineScene("pedophile_ignore", { effects: [eff.rel("pedophile", 4)] }, () => [
    action("day_three_workshop")
  ])
};

module.exports = scenes;
