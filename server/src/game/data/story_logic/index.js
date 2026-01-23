const SB = require('../../SceneBuilder');
const textIndex = require('../story_text');

// 텍스트 데이터 초기화
SB.initTextData(textIndex);

const cafeteria = require('./cafeteria.js');
const characters_arsonist = require('./characters/arsonist.js');
const characters_fraudster = require('./characters/fraudster.js');
const characters_groper = require('./characters/groper.js');
const characters_guard = require('./characters/guard.js');
const characters_messiah = require('./characters/messiah.js');
const characters_pedophile = require('./characters/pedophile.js');
const characters_political = require('./characters/political.js');
const characters_wifekiller = require('./characters/wifekiller.js');
const daily = require('./daily.js');
const dungeon = require('./dungeon');
const endings = require('./endings.js');
const escape = require('./escape.js');
const intro = require('./intro.js');
const sleep = require('./sleep.js');
const workshop = require('./workshop.js');
const yard = require('./yard.js');

const scenes = {
  ...cafeteria,
  ...characters_arsonist,
  ...characters_fraudster,
  ...characters_groper,
  ...characters_guard,
  ...characters_messiah,
  ...characters_pedophile,
  ...characters_political,
  ...characters_wifekiller,
  ...daily,
  ...dungeon,
  ...endings,
  ...escape,
  ...intro,
  ...sleep,
  ...workshop,
  ...yard,
};

const gameData = {
  startScene: "entrance",
  startInventory: [],
  startFlags: {},
  scenes: scenes
};

module.exports = gameData;
