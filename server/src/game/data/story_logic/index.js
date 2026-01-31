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
const warden_office = require('./warden_office.js');
const workshop = require('./workshop.js');
const yard = require('./yard.js');
const sewer_mystery = require('./sewer_mystery.js');
const torchlight_mystery = require('./torchlight_mystery.js');
const wall_scratching_mystery = require('./wall_scratching_mystery.js');

let scenes = {};

function buildScenes() {
  scenes = {
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
    ...warden_office,
    ...workshop,
    ...yard,
    ...sewer_mystery,
    ...torchlight_mystery,
    ...wall_scratching_mystery,
  };

  gameData.scenes = scenes;
}

const gameData = {
  startScene: "entrance",
  startInventory: [],
  startFlags: {},
  scenes: {}
};

// Initial build
buildScenes();

module.exports = {
  ...gameData,
  reinitialize: () => {
    SB.initTextData(textIndex);
    buildScenes();
  }
};
