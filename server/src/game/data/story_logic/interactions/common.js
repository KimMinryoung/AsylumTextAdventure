/**
 * 공통 상호작용 로직
 *
 * 모든 NPC 상호작용에서 공통으로 사용하는 장면들(예: return_to_hub)을 정의합니다.
 */

const { cond, eff, action, defineScene } = require('../../SceneBuilder');

module.exports = {
    // ===== 허브로 돌아가기 =====
    // NPC 대화 종료 후 플레이어의 현재 위치에 맞는 메인 장면으로 복귀
    ...defineScene("return_to_hub", () => [
        action("cell_arrival", [cond.playerAt("cell")]),
        action("yard", [cond.playerAt("yard")]),
        action("cafeteria_arrival", [cond.playerAt("cafeteria")]),
        action("workshop", [cond.playerAt("workshop")]),
        action("hub_corridor", [cond.playerAt("corridor")]),
        // 폴백: 위치를 알 수 없는 경우 장소 선택으로
        action("location_select")
    ])
};
