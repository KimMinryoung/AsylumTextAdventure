/**
 * 허브 장면 통합 모듈
 *
 * 각 장소별 허브 장면을 모아서 내보냅니다.
 */

require('./cell_hub');
require('./yard_hub');
require('./cafeteria_hub');
require('./workshop_hub');
require('./corridor_hub');

// 모든 허브가 SceneBuilder에 등록됨
module.exports = {};
