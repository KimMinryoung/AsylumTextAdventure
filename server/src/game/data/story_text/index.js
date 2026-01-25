/**
 * 모든 텍스트 JSON 파일을 병합하여 export
 */

const cafeteria = require('./cafeteria.json');
const characters_arsonist = require('./characters/arsonist.json');
const characters_fraudster = require('./characters/fraudster.json');
const characters_groper = require('./characters/groper.json');
const characters_guard = require('./characters/guard.json');
const characters_messiah = require('./characters/messiah.json');
const characters_pedophile = require('./characters/pedophile.json');
const characters_political = require('./characters/political.json');
const characters_wifekiller = require('./characters/wifekiller.json');
const daily = require('./daily.json');
const dungeon_entrance = require('./dungeon/entrance.json');
const dungeon_tunnels = require('./dungeon/tunnels.json');
const dungeon_chapel = require('./dungeon/chapel.json');
const dungeon_endings = require('./dungeon/endings.json');
const endings = require('./endings.json');
const escape = require('./escape.json');
const intro = require('./intro.json');
const sleep = require('./sleep.json');
const warden_office = require('./warden_office.json');
const workshop = require('./workshop.json');
const yard = require('./yard.json');
const sewer_mystery = require('./sewer_mystery.json');
const torchlight_mystery = require('./torchlight_mystery.json');
const wall_scratching_mystery = require('./wall_scratching_mystery.json');

const allScenes = {
  ...cafeteria.scenes,
  ...characters_arsonist.scenes,
  ...characters_fraudster.scenes,
  ...characters_groper.scenes,
  ...characters_guard.scenes,
  ...characters_messiah.scenes,
  ...characters_pedophile.scenes,
  ...characters_political.scenes,
  ...characters_wifekiller.scenes,
  ...daily.scenes,
  ...dungeon_entrance.scenes,
  ...dungeon_tunnels.scenes,
  ...dungeon_chapel.scenes,
  ...dungeon_endings.scenes,
  ...endings.scenes,
  ...escape.scenes,
  ...intro.scenes,
  ...sleep.scenes,
  ...warden_office.scenes,
  ...workshop.scenes,
  ...yard.scenes,
  ...sewer_mystery.scenes,
  ...torchlight_mystery.scenes,
  ...wall_scratching_mystery.scenes,
};

module.exports = { scenes: allScenes };
