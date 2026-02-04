const supabase = require('../../../config/supabase');

// Local imports for fallback
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

// 새 시스템: 허브 장면 및 장소 메뉴
const location_menu = require('./location_menu.json');
const hubs_cell = require('./hubs/cell_hub.json');
const hubs_yard = require('./hubs/yard_hub.json');
const hubs_cafeteria = require('./hubs/cafeteria_hub.json');
const hubs_workshop = require('./hubs/workshop_hub.json');
const hubs_corridor = require('./hubs/corridor_hub.json');

// 새 시스템: NPC 상호작용
const interactions_messiah = require('./interactions/messiah.json');
const interactions_fraudster = require('./interactions/fraudster.json');
const interactions_arsonist = require('./interactions/arsonist.json');
const interactions_political = require('./interactions/political.json');
const interactions_wifekiller = require('./interactions/wifekiller.json');
const interactions_groper = require('./interactions/groper.json');
const interactions_pedophile = require('./interactions/pedophile.json');
const interactions_guard = require('./interactions/guard.json');

const localScenes = {
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
  // 새 시스템: 허브 장면 및 장소 메뉴
  ...location_menu.scenes,
  ...hubs_cell.scenes,
  ...hubs_yard.scenes,
  ...hubs_cafeteria.scenes,
  ...hubs_workshop.scenes,
  ...hubs_corridor.scenes,
  // 새 시스템: NPC 상호작용
  ...interactions_messiah.scenes,
  ...interactions_fraudster.scenes,
  ...interactions_arsonist.scenes,
  ...interactions_political.scenes,
  ...interactions_wifekiller.scenes,
  ...interactions_groper.scenes,
  ...interactions_pedophile.scenes,
  ...interactions_guard.scenes,
};

let scenes = localScenes;
let autoRefreshInterval = null;
const REFRESH_INTERVAL_MS = 60 * 60 * 1000; // 1 hour

/**
 * DB에서 story_text를 로드하여 메모리에 저장
 * @returns {boolean} 로드 성공 여부
 */
async function loadFromDB() {
  if (process.env.USE_DB_STORY_TEXT !== 'true' || !supabase) {
    return false;
  }

  const { data, error } = await supabase
    .from('story_scenes')
    .select('*');

  if (error) throw error;

  if (data && data.length > 0) {
    const dbScenes = {};
    data.forEach(row => {
      dbScenes[row.scene_id] = {
        script: row.script,
        actions: row.actions,
        location: row.location
      };
    });
    scenes = dbScenes;
    return true;
  }
  return false;
}

/**
 * 초기화: DB에서 story_text를 로드
 */
async function initialize() {
  if (process.env.USE_DB_STORY_TEXT !== 'true' || !supabase) {
    console.log('ℹ Loading story text from local JSON files (fallback)');
    return;
  }

  try {
    console.log('📡 Fetching story text from Supabase...');
    const loaded = await loadFromDB();
    if (loaded) {
      console.log(`✅ Loaded ${Object.keys(scenes).length} scenes from Supabase`);
    } else {
      console.warn('⚠ No scenes found in DB, using local fallback');
    }
  } catch (err) {
    console.error('❌ Failed to load story text from DB:', err.message);
    console.log('ℹ Falling back to local JSON files');
  }
}

/**
 * 자동 갱신 시작 (1시간마다 DB에서 다시 로드)
 * @param {Function} onRefresh - 갱신 완료 후 호출될 콜백 (예: storyData.reinitialize)
 */
function startAutoRefresh(onRefresh) {
  if (process.env.USE_DB_STORY_TEXT !== 'true' || !supabase) {
    console.log('ℹ Auto-refresh disabled (USE_DB_STORY_TEXT is not true)');
    return;
  }

  if (autoRefreshInterval) {
    clearInterval(autoRefreshInterval);
  }

  console.log('🔄 Starting auto-refresh (every 1 hour)');
  autoRefreshInterval = setInterval(async () => {
    try {
      console.log('🔄 Auto-refreshing story text from Supabase...');
      const loaded = await loadFromDB();
      if (loaded) {
        console.log(`✅ Auto-refresh: Loaded ${Object.keys(scenes).length} scenes`);
        if (typeof onRefresh === 'function') {
          onRefresh();
        }
      }
    } catch (err) {
      console.error('❌ Auto-refresh failed:', err.message);
    }
  }, REFRESH_INTERVAL_MS);
}

/**
 * 자동 갱신 중지
 */
function stopAutoRefresh() {
  if (autoRefreshInterval) {
    clearInterval(autoRefreshInterval);
    autoRefreshInterval = null;
    console.log('⏹ Auto-refresh stopped');
  }
}

// 초기 로딩 (동기적으로 require 시에는 localScenes가 먼저 노출되지만,
// initialize() 호출 이후에는 scenes가 업데이트됨)
module.exports = {
  get scenes() { return scenes; },
  initialize,
  startAutoRefresh,
  stopAutoRefresh
};
