/**
 * 던전 탐험 - 수도원 지하 터널
 *
 * 수용소 지하에 숨겨진 일제 시대 수도원 터널을 탐험하는 콘텐츠.
 * basement에서 진입하여 다양한 퍼즐과 수호자(보스)를 통과해 탈출하는 선택적 경로.
 */

const entrance = require('./entrance.js');
const tunnels = require('./tunnels.js');
const chapel = require('./chapel.js');
const endings = require('./endings.js');

const scenes = {
  ...entrance,
  ...tunnels,
  ...chapel,
  ...endings
};

module.exports = scenes;
