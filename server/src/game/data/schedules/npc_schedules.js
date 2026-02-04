/**
 * NPC 스케줄 시스템
 *
 * 각 NPC의 일별/시간대별 위치를 정의합니다.
 * 플레이어와 NPC가 같은 위치에 있을 때만 상호작용이 가능합니다.
 */

const TIME_SLOTS = {
  MORNING: 0,    // 아침 (기상, 준비)
  LUNCH: 1,      // 점심식사
  AFTERNOON: 2,  // 낮 (작업/운동)
  EVENING: 3,    // 저녁 (자유시간/교육)
  NIGHT: 4       // 밤 (취침)
};

/**
 * NPC 스케줄 정의
 *
 * 구조: {
 *   [npc_id]: {
 *     [day_number]: { [time_slot]: "location" },
 *     default: { [time_slot]: "location" }
 *   }
 * }
 *
 * 특정 일자가 없으면 default 사용
 * 가능한 위치: cell, cafeteria, yard, workshop, corridor, solitary, basement, sewer, roof
 */
const NPC_SCHEDULES = {
  // 메시아: 탈출 계획의 리더, 주로 감방과 운동장에서 활동
  messiah: {
    1: {
      [TIME_SLOTS.MORNING]: "cell",
      [TIME_SLOTS.LUNCH]: "cafeteria",
      [TIME_SLOTS.AFTERNOON]: "cell",
      [TIME_SLOTS.EVENING]: "cell",
      [TIME_SLOTS.NIGHT]: "cell"
    },
    2: {
      [TIME_SLOTS.MORNING]: "yard",
      [TIME_SLOTS.LUNCH]: "cafeteria",
      [TIME_SLOTS.AFTERNOON]: "yard",
      [TIME_SLOTS.EVENING]: "cell",
      [TIME_SLOTS.NIGHT]: "cell"
    },
    3: {
      [TIME_SLOTS.MORNING]: "yard",
      [TIME_SLOTS.LUNCH]: "cafeteria",
      [TIME_SLOTS.AFTERNOON]: "workshop",
      [TIME_SLOTS.EVENING]: "cell",
      [TIME_SLOTS.NIGHT]: "cell"
    },
    default: {
      [TIME_SLOTS.MORNING]: "yard",
      [TIME_SLOTS.LUNCH]: "cafeteria",
      [TIME_SLOTS.AFTERNOON]: "yard",
      [TIME_SLOTS.EVENING]: "cell",
      [TIME_SLOTS.NIGHT]: "cell"
    }
  },

  // 사기꾼: 교활하고 기회주의적, 식당과 복도에서 많이 활동
  fraudster: {
    default: {
      [TIME_SLOTS.MORNING]: "corridor",
      [TIME_SLOTS.LUNCH]: "cafeteria",
      [TIME_SLOTS.AFTERNOON]: "yard",
      [TIME_SLOTS.EVENING]: "cafeteria",
      [TIME_SLOTS.NIGHT]: "cell"
    }
  },

  // 아내살해범: 조용하고 내성적, 작업장에서 열심히 일함
  wifekiller: {
    default: {
      [TIME_SLOTS.MORNING]: "cell",
      [TIME_SLOTS.LUNCH]: "cafeteria",
      [TIME_SLOTS.AFTERNOON]: "workshop",
      [TIME_SLOTS.EVENING]: "cell",
      [TIME_SLOTS.NIGHT]: "cell"
    }
  },

  // 치한: 불쾌한 성격, 운동장이나 복도에서 배회
  groper: {
    default: {
      [TIME_SLOTS.MORNING]: "corridor",
      [TIME_SLOTS.LUNCH]: "cafeteria",
      [TIME_SLOTS.AFTERNOON]: "yard",
      [TIME_SLOTS.EVENING]: "corridor",
      [TIME_SLOTS.NIGHT]: "cell"
    }
  },

  // 방화범: 불안정하고 위험, 작업장과 운동장 사이를 오감
  arsonist: {
    1: {
      [TIME_SLOTS.MORNING]: "cell",
      [TIME_SLOTS.LUNCH]: "cafeteria",
      [TIME_SLOTS.AFTERNOON]: "workshop",
      [TIME_SLOTS.EVENING]: "yard",
      [TIME_SLOTS.NIGHT]: "cell"
    },
    default: {
      [TIME_SLOTS.MORNING]: "yard",
      [TIME_SLOTS.LUNCH]: "cafeteria",
      [TIME_SLOTS.AFTERNOON]: "workshop",
      [TIME_SLOTS.EVENING]: "yard",
      [TIME_SLOTS.NIGHT]: "cell"
    }
  },

  // 소아성애자: 다른 수감자들에게 기피당함, 주로 혼자 활동
  pedophile: {
    default: {
      [TIME_SLOTS.MORNING]: "cell",
      [TIME_SLOTS.LUNCH]: "cafeteria",
      [TIME_SLOTS.AFTERNOON]: "cell",
      [TIME_SLOTS.EVENING]: "corridor",
      [TIME_SLOTS.NIGHT]: "cell"
    }
  },

  // 정치범: 지식인, 교육 프로그램과 관련된 곳에서 활동
  political: {
    default: {
      [TIME_SLOTS.MORNING]: "cell",
      [TIME_SLOTS.LUNCH]: "cafeteria",
      [TIME_SLOTS.AFTERNOON]: "yard",
      [TIME_SLOTS.EVENING]: "cell",
      [TIME_SLOTS.NIGHT]: "cell"
    }
  },

  // 간수: 감시 및 순찰, 시간대별로 다른 위치에서 감시
  guard: {
    default: {
      [TIME_SLOTS.MORNING]: "corridor",
      [TIME_SLOTS.LUNCH]: "cafeteria",
      [TIME_SLOTS.AFTERNOON]: "workshop",
      [TIME_SLOTS.EVENING]: "corridor",
      [TIME_SLOTS.NIGHT]: "corridor"
    }
  }
};

/**
 * 특정 NPC의 위치를 반환
 * @param {string} npc - NPC ID
 * @param {number} day - 현재 일자
 * @param {number} timeSlot - 현재 시간 슬롯
 * @returns {string} 위치 문자열
 */
function getNpcLocation(npc, day, timeSlot) {
  const schedule = NPC_SCHEDULES[npc];
  if (!schedule) return "unknown";

  // 특정 일자의 스케줄이 있으면 사용, 없으면 default 사용
  const daySchedule = schedule[day] || schedule.default;
  return daySchedule?.[timeSlot] || "unknown";
}

/**
 * 특정 위치에 있는 모든 NPC 목록 반환
 * @param {string} location - 위치
 * @param {number} day - 현재 일자
 * @param {number} timeSlot - 현재 시간 슬롯
 * @returns {string[]} NPC ID 배열
 */
function getNpcsAtLocation(location, day, timeSlot) {
  const npcs = Object.keys(NPC_SCHEDULES);
  return npcs.filter(npc => getNpcLocation(npc, day, timeSlot) === location);
}

/**
 * 특정 NPC의 전체 일정 반환 (디버그/UI용)
 * @param {string} npc - NPC ID
 * @param {number} day - 일자
 * @returns {object} 시간대별 위치 객체
 */
function getNpcDaySchedule(npc, day) {
  const schedule = NPC_SCHEDULES[npc];
  if (!schedule) return null;
  return schedule[day] || schedule.default;
}

module.exports = {
  TIME_SLOTS,
  NPC_SCHEDULES,
  getNpcLocation,
  getNpcsAtLocation,
  getNpcDaySchedule
};
