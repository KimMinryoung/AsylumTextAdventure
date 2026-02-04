const SB = require('../../SceneBuilder');
const textIndex = require('../story_text');

// initial setup
SB.initTextData(textIndex);

require('./cafeteria.js');
require('./characters/arsonist.js');
require('./characters/fraudster.js');
require('./characters/groper.js');
require('./characters/guard.js');
require('./characters/messiah.js');
require('./characters/pedophile.js');
require('./characters/political.js');
require('./characters/wifekiller.js');
require('./daily.js');
require('./dungeon');
require('./endings.js');
require('./escape.js');
require('./intro.js');
require('./sleep.js');
require('./warden_office.js');
require('./workshop.js');
require('./yard.js');
require('./sewer_mystery.js');
require('./torchlight_mystery.js');
require('./wall_scratching_mystery.js');

// Hub and Location System
require('./location_menu.js');
// Interactions
require('./interactions/messiah.js');
require('./interactions/fraudster.js');
require('./interactions/arsonist.js');
require('./interactions/political.js');
require('./interactions/wifekiller.js');
require('./interactions/groper.js');
require('./interactions/pedophile.js');
require('./interactions/guard.js');

const gameData = {
  startScene: "entrance",
  startInventory: [],
  startFlags: {},
  scenes: SB.rebuildAll()
};

gameData.reinitialize = () => {
  SB.initTextData(textIndex);
  gameData.scenes = SB.rebuildAll();
};

module.exports = gameData;
