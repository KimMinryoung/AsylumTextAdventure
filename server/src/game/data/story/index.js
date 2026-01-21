const fs = require('fs');
const path = require('path');
const SB = require('../../SceneBuilder');

// ===== 텍스트 데이터 로드 =====
// story_text 폴더가 있으면 새 형식, 없으면 레거시 모드
const TEXT_DIR = path.join(__dirname, '../story_text');
let textData = null;

try {
  if (fs.existsSync(TEXT_DIR) && fs.existsSync(path.join(TEXT_DIR, 'index.js'))) {
    textData = require('../story_text');
    console.log(`[Story] Loaded text data: ${Object.keys(textData.scenes || {}).length} scenes`);
  } else {
    console.log('[Story] No story_text found, using legacy mode (text in JS)');
  }
} catch (e) {
  console.warn('[Story] Failed to load text data:', e.message);
}

// SceneBuilder에 텍스트 데이터 주입
SB.initTextData(textData);

// ===== 스토리 모듈 로드 =====
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

// ===== 게임 데이터 =====
const gameData = {
  startScene: "entrance",
  startInventory: [],
  startFlags: {},
  scenes: scenes
};

module.exports = gameData;
