/**
 * Story Logic Validator
 *
 * 검증 항목:
 * 1. Broken Links - 존재하지 않는 씬 참조
 * 2. Dead Ends - 엔딩이 아닌데 액션이 없는 씬
 * 3. Orphan Scenes - 시작점에서 도달 불가능한 씬
 * 4. Ending Reachability - 엔딩에 도달 가능한지
 * 5. Text-Logic Mismatch - 액션 개수 불일치
 * 6. Invalid References - 효과/조건에서 잘못된 참조
 * 7. Hub System Validation - 동적 주입 장면 검증
 */

const path = require('path');

// .env 파일 로드
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const textData = require('../src/game/data/story_text');

// 유효한 캐릭터 ID 목록
const VALID_CHARACTERS = ['messiah', 'fraudster', 'wifekiller', 'groper', 'arsonist', 'pedophile', 'political', 'guard'];

// Hub 시스템에서 동적으로 주입되는 장면들 (정적 분석에서 orphan으로 표시되지만 실제로는 도달 가능)
const HUB_DYNAMIC_SCENES = ['location_select', 'time_advance'];

// Hub 시스템이 NPC별로 주입하는 상호작용 장면들
const HUB_NPC_SCENES = {
  messiah: { yard: 'yard_messiah', cafeteria: 'cafeteria_messiah', default: 'talk_messiah' },
  fraudster: { cafeteria: 'cafeteria_fraudster', default: 'talk_fraudster' },
  arsonist: { cafeteria: 'cafeteria_arsonist', default: 'talk_arsonist_day' },
  wifekiller: { cafeteria: 'talk_wifekiller', default: 'talk_wifekiller_intro' },
  political: { cafeteria: 'cafeteria_political', default: 'talk_political' },
  groper: { cafeteria: 'cafeteria_groper_event', default: 'talk_groper' },
  pedophile: { yard: 'yard_pedophile', default: 'pedophile_kind' },
  guard: { yard: 'yard_bow_guard', cafeteria: 'cafeteria_guard_friendly', workshop: 'guard_favor_workshop', default: 'guard_night_friendly' }
};

async function validateStory() {
  // DB에서 텍스트 데이터 로드
  console.log('Initializing story text from DB...');
  await textData.initialize();

  // story_logic은 textData 초기화 후 로드해야 함
  const gameData = require('../src/game/data/story_logic');

  const scenes = gameData.scenes;
  const sceneIds = Object.keys(scenes);
  const totalScenes = sceneIds.length;

  const errors = [];
  const warnings = [];
  const info = [];

  console.log(`\nStarting validation for ${totalScenes} scenes...\n`);

  // ==========================================
  // 1. 기본 링크 검증 (Broken Links & Dead Ends)
  // ==========================================
  sceneIds.forEach(id => {
    const scene = scenes[id];

    // 엔딩이 아닌데 액션이 없는 경우 (Dead End)
    if (!scene.isEnding && (!scene.actions || scene.actions.length === 0)) {
      errors.push(`[Dead End] Scene '${id}' has no actions but is not an ending.`);
    }

    // 각 액션의 nextScene 유효성 검증
    scene.actions?.forEach((action, idx) => {
      if (action.nextScene) {
        if (!scenes[action.nextScene]) {
          errors.push(`[Broken Link] Scene '${id}' action[${idx}] -> unknown scene '${action.nextScene}'`);
        }
      } else {
        warnings.push(`[Missing nextScene] Scene '${id}' action[${idx}] has no nextScene`);
      }
    });

    // 효과(effects) 검증
    scene.effects?.forEach((effect, idx) => {
      if (effect.type === 'increaseRelation' || effect.type === 'decreaseRelation') {
        if (!VALID_CHARACTERS.includes(effect.target)) {
          errors.push(`[Invalid Effect] Scene '${id}' effect[${idx}] references unknown character '${effect.target}'`);
        }
      }
    });

    // 액션 내 효과/조건 검증
    scene.actions?.forEach((action, actionIdx) => {
      action.effects?.forEach((effect, idx) => {
        if (effect.type === 'increaseRelation' || effect.type === 'decreaseRelation') {
          if (!VALID_CHARACTERS.includes(effect.target)) {
            errors.push(`[Invalid Effect] Scene '${id}' action[${actionIdx}] effect[${idx}] references unknown character '${effect.target}'`);
          }
        }
      });

      action.conditions?.forEach((cond, idx) => {
        if (cond.type === 'relationMin' || cond.type === 'relationMax') {
          if (!VALID_CHARACTERS.includes(cond.target)) {
            errors.push(`[Invalid Condition] Scene '${id}' action[${actionIdx}] condition[${idx}] references unknown character '${cond.target}'`);
          }
        }
      });
    });
  });

  // ==========================================
  // 2. 텍스트-로직 액션 개수 불일치 검증
  // ==========================================
  const textScenes = textData.scenes || {};
  sceneIds.forEach(id => {
    const logicScene = scenes[id];
    const textScene = textScenes[id];

    if (!textScene) {
      warnings.push(`[Missing Text] Scene '${id}' has no text data`);
    } else {
      const logicActions = logicScene.actions?.length || 0;
      const textActions = textScene.actions?.length || 0;

      if (logicActions !== textActions) {
        errors.push(`[Action Mismatch] Scene '${id}': logic has ${logicActions} actions, text has ${textActions}`);
      }
    }
  });

  // 텍스트에만 있고 로직에 없는 씬 체크
  Object.keys(textScenes).forEach(id => {
    if (!scenes[id]) {
      warnings.push(`[Orphan Text] Text scene '${id}' has no logic definition`);
    }
  });

  // ==========================================
  // 3. 고아 장면(Orphan Scene) 탐지 (BFS)
  // ==========================================
  const reachable = new Set();
  const queue = [gameData.startScene];
  reachable.add(gameData.startScene);

  while (queue.length > 0) {
    const currentId = queue.shift();
    const scene = scenes[currentId];

    if (scene && scene.actions) {
      scene.actions.forEach(action => {
        const next = action.nextScene;
        if (next && scenes[next] && !reachable.has(next)) {
          reachable.add(next);
          queue.push(next);
        }
      });
    }
  }

  // 도달 불가능한 장면 체크 (Hub 동적 장면 제외)
  sceneIds.forEach(id => {
    if (!reachable.has(id)) {
      if (HUB_DYNAMIC_SCENES.includes(id)) {
        info.push(`[Hub Dynamic] Scene '${id}' is dynamically injected by hub system`);
      } else {
        warnings.push(`[Orphan Scene] Scene '${id}' is unreachable from start`);
      }
    }
  });

  // ==========================================
  // 4. 엔딩 도달 가능성 검증
  // ==========================================
  const endings = sceneIds.filter(id => scenes[id].isEnding);
  const reachableEndings = endings.filter(id => reachable.has(id));
  const unreachableEndings = endings.filter(id => !reachable.has(id));

  if (endings.length === 0) {
    errors.push(`[No Endings] No ending scenes found (isEnding: true)`);
  } else {
    info.push(`[Endings] Found ${endings.length} endings, ${reachableEndings.length} reachable`);

    unreachableEndings.forEach(id => {
      warnings.push(`[Unreachable Ending] Ending '${id}' cannot be reached from start`);
    });
  }

  // ==========================================
  // 5. 사이클 탐지 (정보용 - 게임에서 사이클은 정상)
  // ==========================================
  const visitedForCycle = new Set();
  const cycleNodes = new Set();

  function detectCycleDFS(sceneId, recursionStack) {
    visitedForCycle.add(sceneId);
    recursionStack.add(sceneId);

    const scene = scenes[sceneId];
    if (scene && scene.actions) {
      for (const action of scene.actions) {
        const next = action.nextScene;
        if (!next || !scenes[next]) continue;

        if (!visitedForCycle.has(next)) {
          detectCycleDFS(next, new Set(recursionStack));
        } else if (recursionStack.has(next)) {
          cycleNodes.add(next);
        }
      }
    }
  }

  detectCycleDFS(gameData.startScene, new Set());

  if (cycleNodes.size > 0) {
    info.push(`[Cycles] Found ${cycleNodes.size} scenes involved in cycles (normal for adventure games)`);
    cycleNodes.forEach(id => { info.push(`[Cycles] Scene '${id}' is in a cycle`); });
  }

  // ==========================================
  // 6. Hub 시스템 장면 검증
  // ==========================================

  // Hub 동적 장면 존재 여부 확인
  HUB_DYNAMIC_SCENES.forEach(id => {
    if (!scenes[id]) {
      errors.push(`[Hub Missing] Hub dynamic scene '${id}' does not exist`);
    }
  });

  // NPC 상호작용 장면 존재 여부 확인
  let hubNpcSceneCount = 0;
  let hubNpcMissing = [];

  Object.entries(HUB_NPC_SCENES).forEach(([npc, locations]) => {
    Object.entries(locations).forEach(([location, sceneId]) => {
      hubNpcSceneCount++;
      if (!scenes[sceneId]) {
        hubNpcMissing.push(`${npc}@${location} -> ${sceneId}`);
      }
    });
  });

  if (hubNpcMissing.length > 0) {
    hubNpcMissing.forEach(missing => {
      errors.push(`[Hub NPC Missing] NPC interaction scene missing: ${missing}`);
    });
  } else {
    info.push(`[Hub System] All ${hubNpcSceneCount} NPC interaction scenes verified`);
  }

  // ==========================================
  // 7. 통계 정보
  // ==========================================
  const endingCount = endings.length;
  const orphanCount = sceneIds.filter(id => !reachable.has(id)).length;

  info.push(`[Stats] Total: ${totalScenes} scenes, ${endingCount} endings, ${orphanCount} orphans, ${reachable.size} reachable`);

  // ==========================================
  // 결과 리포트
  // ==========================================
  console.log("=== Story Validation Report ===\n");

  if (info.length > 0) {
    console.log(`[Info] ${info.length} items:`);
    info.forEach(i => console.log(`  ${i}`));
    console.log();
  }

  let hasErrors = false;

  if (errors.length > 0) {
    hasErrors = true;
    console.error(`[Errors] ${errors.length} critical issues:`);
    errors.forEach(e => console.error(`  ${e}`));
    console.log();
  }

  if (warnings.length > 0) {
    console.warn(`[Warnings] ${warnings.length} issues:`);
    warnings.forEach(w => console.warn(`  ${w}`));
    console.log();
  }

  if (!hasErrors && warnings.length === 0) {
    console.log("All validations passed.\n");
  } else if (hasErrors) {
    console.log("Please fix the errors above.\n");
    process.exit(1);
  } else {
    console.log("Completed with warnings.\n");
  }
}

validateStory().catch(err => {
  console.error('Validation failed:', err.message);
  process.exit(1);
});
