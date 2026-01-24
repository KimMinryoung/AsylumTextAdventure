const { cond, eff, action, defineScene } = require('../../SceneBuilder');

const scenes = {
  // === 소장실 접근 허브 (3가지 경로) ===
  ...defineScene("warden_office_hub", () => [
    action("warden_office_model_prisoner", [cond.workMin(3), cond.eduMin(2), cond.relMin("guard", 3)]),
    action("warden_office_blackmail", [cond.flag("knowGuardCorruption"), cond.has("증거 사진")]),
    action("warden_office_infiltrate", [cond.has("작은 드라이버"), cond.flag("knowPatrolGap")]),
    action("warden_office_not_ready")
  ]),

  // === 경로 A: 모범수 경로 ===
  ...defineScene("warden_office_model_prisoner", () => [
    action("warden_office_cleaning_duty")
  ]),

  ...defineScene("warden_office_cleaning_duty", { effects: [eff.flag("inWardenOffice")] }, () => [
    action("warden_office_pc_access")
  ]),

  // === 경로 B: 간수 협박 경로 ===
  ...defineScene("warden_office_blackmail", () => [
    action("warden_office_blackmail_success")
  ]),

  ...defineScene("warden_office_blackmail_success", { effects: [eff.flag("inWardenOffice"), eff.rel("guard", -2)] }, () => [
    action("warden_office_pc_access")
  ]),

  // === 경로 C: 야간 침투 경로 ===
  ...defineScene("warden_office_infiltrate", () => [
    action("warden_office_infiltrate_success"),
    action("warden_office_infiltrate_caught")
  ]),

  ...defineScene("warden_office_infiltrate_success", { effects: [eff.flag("inWardenOffice")] }, () => [
    action("warden_office_pc_access")
  ]),

  ...defineScene("warden_office_infiltrate_caught", () => [
    action("solitary_cell")
  ]),

  // === 준비 안 됨 ===
  ...defineScene("warden_office_not_ready", () => [
    action("cafeteria_arrival")
  ]),

  // === 소장실 PC 접근 ===
  ...defineScene("warden_office_pc_access", () => [
    action("warden_pc_login")
  ]),

  ...defineScene("warden_pc_login", () => [
    action("warden_pc_username_found", [cond.flag("recognizedMyCode")]),
    action("warden_pc_username_search")
  ]),

  // 코드 인식한 경우 바로 사용자명 확인
  ...defineScene("warden_pc_username_found", () => [
    action("warden_pc_puzzle")
  ]),

  // 코드 모르는 경우 사무실 수색
  ...defineScene("warden_pc_username_search", { effects: [eff.flag("foundAdminUsername")] }, () => [
    action("warden_pc_puzzle")
  ]),

  // === 비밀번호 퍼즐 ===
  ...defineScene("warden_pc_puzzle", () => [
    action("warden_pc_puzzle_success", [cond.flag("hasDebugHint1")]),
    action("warden_pc_puzzle_fail")
  ]),

  ...defineScene("warden_pc_puzzle_fail", { effects: [eff.flag("puzzleFailed")] }, () => [
    action("warden_office_retreat"),
    action("warden_pc_puzzle_retry", [cond.flag("hasDebugHint1")])
  ]),

  ...defineScene("warden_pc_puzzle_retry", () => [
    action("warden_pc_puzzle_success")
  ]),

  ...defineScene("warden_office_retreat", () => [
    action("cafeteria_arrival")
  ]),

  // === TRUE ADMIN 획득 ===
  ...defineScene("warden_pc_puzzle_success", {
    effects: [
      eff.flag("trueAdmin"),
      eff.flag("cameraControl"),
      eff.flag("doorControl"),
      eff.flag("alarmControl"),
      eff.flag("paControl"),
      eff.flag("scheduleAccess"),
      eff.flag("inmateDatabase"),
      eff.flag("supplyManifest"),
      eff.flag("emergencyOverride"),
      eff.flag("wardenSecrets"),
      eff.flag("cellBlockControl")
    ]
  }, () => [
    action("true_admin_menu")
  ]),

  // === TRUE ADMIN 메뉴 (5가지 엔딩 루트) ===
  ...defineScene("true_admin_menu", () => [
    action("admin_route_solo"),
    action("admin_route_warden"),
    action("admin_route_liberation"),
    action("admin_route_ghost"),
    action("admin_route_vengeance", [cond.flag("groperEnemy")])
  ]),

  // 엔딩 F: 고독한 자유 (Solo Escape)
  ...defineScene("admin_route_solo", () => [
    action("ending_solo_success")
  ]),

  // 엔딩 J: 어둠의 거래 (Warden Blackmail)
  ...defineScene("admin_route_warden", () => [
    action("ending_warden_route")
  ]),

  // 엔딩 N: 대해방 (Mass Liberation)
  ...defineScene("admin_route_liberation", () => [
    action("ending_mass_liberation")
  ]),

  // 엔딩 O: 유령 프로토콜 (Ghost Protocol)
  ...defineScene("admin_route_ghost", () => [
    action("ending_ghost_protocol")
  ]),

  // 엔딩 P: 디지털 복수 (Digital Vengeance)
  ...defineScene("admin_route_vengeance", () => [
    action("ending_vengeance")
  ])
};

module.exports = scenes;
