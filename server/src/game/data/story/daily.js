const workshopScenes = require('./workshop');
const yardScenes = require('./yard');
const cafeteriaScenes = require('./cafeteria');
const sleepScenes = require('./sleep');

const dailyScenes = {
  ...workshopScenes,
  ...yardScenes,
  ...cafeteriaScenes,
  ...sleepScenes
};

module.exports = dailyScenes;
