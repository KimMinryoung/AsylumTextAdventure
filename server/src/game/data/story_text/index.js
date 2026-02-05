/**
 * Story Text Loader (DB Only)
 *
 * Supabase DB를 single source of truth로 사용합니다.
 * 로컬 JSON 파일은 더 이상 사용하지 않습니다.
 */

const supabase = require('../../../config/supabase');

let scenes = {};
let autoRefreshInterval = null;
const REFRESH_INTERVAL_MS = 60 * 60 * 1000; // 1 hour

/**
 * DB에서 story_text를 로드하여 메모리에 저장
 * @returns {boolean} 로드 성공 여부
 */
async function loadFromDB() {
  if (!supabase) {
    throw new Error('Supabase client not configured');
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
  if (!supabase) {
    throw new Error('Supabase client not configured. Check SUPABASE_URL and SUPABASE_KEY environment variables.');
  }

  console.log('📡 Fetching story text from Supabase...');
  const loaded = await loadFromDB();
  if (loaded) {
    console.log(`✅ Loaded ${Object.keys(scenes).length} scenes from Supabase`);
  } else {
    throw new Error('No scenes found in DB. Please run migration script first.');
  }
}

/**
 * 자동 갱신 시작 (1시간마다 DB에서 다시 로드)
 * @param {Function} onRefresh - 갱신 완료 후 호출될 콜백 (예: storyData.reinitialize)
 */
function startAutoRefresh(onRefresh) {
  if (!supabase) {
    console.warn('⚠ Auto-refresh disabled (Supabase not configured)');
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

module.exports = {
  get scenes() { return scenes; },
  initialize,
  startAutoRefresh,
  stopAutoRefresh
};
