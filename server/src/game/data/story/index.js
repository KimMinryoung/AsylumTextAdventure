const introScenes = require('./intro');
const dailyScenes = require('./daily');
const escapeScenes = require('./escape');
const endingScenes = require('./endings');
const characterScenes = require('./characters');

const scenes = {
  ...introScenes,
  ...dailyScenes,
  ...escapeScenes,
  ...endingScenes,
  ...characterScenes
};

const gameData = {
  title: "수용소 탈출기",
  startScene: "entrance",
  startInventory: [],
  startFlags: {},
  scenes: scenes
};

module.exports = gameData;
