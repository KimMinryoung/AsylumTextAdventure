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
 */

const gameData = require('../src/game/data/story_logic');
const textData = require('../src/game/data/story_text');

// 유효한 캐릭터 ID 목록
const VALID_CHARACTERS = ['messiah', 'fraudster', 'wifekiller', 'groper', 'arsonist', 'pedophile', 'political', 'guard'];

function validateStory() {
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

  // 도달 불가능한 장면 체크
  sceneIds.forEach(id => {
    if (!reachable.has(id)) {
      warnings.push(`[Orphan Scene] Scene '${id}' is unreachable from start`);
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
  // 6. 통계 정보
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

validateStory();
