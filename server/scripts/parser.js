/**
 * Story Parser - JS to JSON + Logic 변환기
 *
 * 사용법: node scripts/parser.js
 *
 * 기존 스토리 파일들을 파싱하여:
 * 1. 텍스트 데이터 → data/story_text/*.json (파일 구조 유지)
 * 2. 로직 데이터 → data/story_logic/*.js (파일 구조 유지)
 */

const fs = require('fs');
const path = require('path');

// ========== 설정 ==========
const STORY_DIR = path.join(__dirname, '../src/game/data/story');
const OUTPUT_JSON_DIR = path.join(__dirname, '../src/game/data/story_text');
const OUTPUT_LOGIC_DIR = path.join(__dirname, '../src/game/data/story_logic');

// ========== 헬퍼 함수 ==========

/**
 * 이스케이프 문자 처리
 */
function unescapeString(str) {
  return str
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, '\\');
}

/**
 * 중첩 괄호를 고려하여 매칭되는 닫는 괄호 위치 찾기
 */
function findMatchingBracket(str, startPos, openChar, closeChar) {
  let depth = 0;
  let inString = false;
  let stringChar = '';

  for (let i = startPos; i < str.length; i++) {
    const char = str[i];
    const prevChar = str[i - 1];

    // 문자열 처리
    if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
    }

    if (!inString) {
      if (char === openChar) depth++;
      if (char === closeChar) {
        depth--;
        if (depth === 0) return i;
      }
    }
  }
  return -1;
}

/**
 * defineScene 블록들을 파싱
 */
function parseDefineScene(code) {
  const scenes = {};
  const pattern = /\.\.\.defineScene\s*\(\s*["'`]([^"'`]+)["'`]\s*,\s*\{/g;

  let match;
  while ((match = pattern.exec(code)) !== null) {
    const sceneId = match[1];
    const bodyStart = match.index + match[0].length - 1; // '{' 위치

    // 매칭되는 '}' 찾기
    const bodyEnd = findMatchingBracket(code, bodyStart, '{', '}');
    if (bodyEnd === -1) {
      console.warn(`[WARN] Could not find matching bracket for scene: ${sceneId}`);
      continue;
    }

    const sceneBody = code.substring(bodyStart + 1, bodyEnd);

    try {
      const parsed = parseSceneBody(sceneId, sceneBody);
      if (parsed) {
        scenes[sceneId] = parsed;
      }
    } catch (e) {
      console.warn(`[WARN] Failed to parse scene: ${sceneId}`, e.message);
    }
  }

  return scenes;
}

/**
 * Scene body 파싱
 */
function parseSceneBody(sceneId, body) {
  const result = {
    json: { script: [], actions: [] },
    logic: { effects: null, isEnding: false, actions: [] }
  };

  // location 추출
  const locationMatch = body.match(/location\s*:\s*["'`]([^"'`]+)["'`]/);
  if (locationMatch) {
    result.json.location = locationMatch[1];
  }

  // isEnding 추출
  if (/isEnding\s*:\s*true/.test(body)) {
    result.logic.isEnding = true;
  }

  // effects 추출 (scene-level) - actions 이전의 effects만
  const effectsMatch = body.match(/^\s*effects\s*:\s*\[/m);
  if (effectsMatch) {
    const effectsStart = body.indexOf(effectsMatch[0]) + effectsMatch[0].length - 1;
    const effectsEnd = findMatchingBracket(body, effectsStart, '[', ']');
    if (effectsEnd !== -1) {
      const effectsContent = body.substring(effectsStart + 1, effectsEnd).trim();
      if (effectsContent) {
        result.logic.effects = `[${effectsContent}]`;
      }
    }
  }

  // description 추출
  const descMatch = body.match(/description\s*:\s*\[/);
  if (descMatch) {
    const descStart = body.indexOf(descMatch[0]) + descMatch[0].length - 1;
    const descEnd = findMatchingBracket(body, descStart, '[', ']');
    if (descEnd !== -1) {
      const descContent = body.substring(descStart + 1, descEnd);
      const items = extractArrayItems(descContent);

      for (const item of items) {
        const parsed = parseDescriptionItem(item.trim());
        if (parsed) {
          if (parsed.type === 'dialogue') {
            result.json.script.push(`${parsed.speaker}: ${parsed.text}`);
          } else {
            result.json.script.push(parsed.text);
          }
        }
      }
    }
  }

  // actions 추출: actions: () => [...]
  const actionsMatch = body.match(/actions\s*:\s*\(\s*\)\s*=>\s*\[/);
  if (actionsMatch) {
    const actionsStart = body.indexOf(actionsMatch[0]) + actionsMatch[0].length - 1;
    const actionsEnd = findMatchingBracket(body, actionsStart, '[', ']');
    if (actionsEnd !== -1) {
      const actionsContent = body.substring(actionsStart + 1, actionsEnd);
      const actionItems = extractArrayItems(actionsContent);

      for (const actionCode of actionItems) {
        const trimmed = actionCode.trim();
        if (trimmed.startsWith('action(')) {
          const { text, logic } = parseAction(trimmed);
          if (text) {
            result.json.actions.push(text);
          }
          result.logic.actions.push(logic);
        }
      }
    }
  }

  return result;
}

/**
 * n("text") 또는 d("speaker", "text") 파싱
 */
function parseDescriptionItem(code) {
  // n("text") 패턴
  const nMatch = code.match(/^n\s*\(\s*["'`]([\s\S]*?)["'`]\s*\)$/);
  if (nMatch) {
    return { type: 'narration', text: unescapeString(nMatch[1]) };
  }

  // d("speaker", "text") 패턴
  const dMatch = code.match(/^d\s*\(\s*["'`]([^"'`]+)["'`]\s*,\s*["'`]([\s\S]*?)["'`]\s*\)$/);
  if (dMatch) {
    return { type: 'dialogue', speaker: dMatch[1], text: unescapeString(dMatch[2]) };
  }

  return null;
}

/**
 * action 파싱: 텍스트와 로직 분리
 */
function parseAction(code) {
  // action 내부 추출
  const innerMatch = code.match(/^action\s*\(([\s\S]*)\)$/);
  if (!innerMatch) {
    return { text: null, logic: code };
  }

  const inner = innerMatch[1];
  const args = extractFunctionArgs(inner);

  if (args.length === 0) {
    return { text: null, logic: 'action()' };
  }

  // 첫 번째 인자: 텍스트
  const text = extractStringValue(args[0]);

  // 두 번째 인자: nextScene
  const nextScene = args.length > 1 ? extractStringValue(args[1]) : null;

  // 나머지 인자들
  const restArgs = args.slice(2);

  // 로직 재구성
  let logic = 'action(';
  if (nextScene) {
    logic += `"${nextScene}"`;
    if (restArgs.length > 0) {
      logic += ', ' + restArgs.join(', ');
    }
  }
  logic += ')';

  return { text, logic };
}

/**
 * 함수 인자 추출 (중첩 괄호 고려)
 */
function extractFunctionArgs(argsStr) {
  const args = [];
  let depth = 0;
  let current = '';
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < argsStr.length; i++) {
    const char = argsStr[i];
    const prevChar = argsStr[i - 1];

    // 문자열 처리
    if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
    }

    if (!inString) {
      if (char === '(' || char === '[' || char === '{') depth++;
      if (char === ')' || char === ']' || char === '}') depth--;

      if (char === ',' && depth === 0) {
        if (current.trim()) {
          args.push(current.trim());
        }
        current = '';
        continue;
      }
    }

    current += char;
  }

  if (current.trim()) {
    args.push(current.trim());
  }

  return args;
}

/**
 * 문자열 값 추출 ("text" → text)
 */
function extractStringValue(str) {
  const trimmed = str.trim();
  const match = trimmed.match(/^["'`]([\s\S]*?)["'`]$/);
  return match ? unescapeString(match[1]) : null;
}

/**
 * 배열 내용에서 개별 아이템 추출
 */
function extractArrayItems(content) {
  const items = [];
  let depth = 0;
  let current = '';
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const prevChar = content[i - 1];

    // 문자열 처리
    if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
    }

    if (!inString) {
      if (char === '(' || char === '[' || char === '{') depth++;
      if (char === ')' || char === ']' || char === '}') depth--;

      if (char === ',' && depth === 0) {
        if (current.trim()) {
          items.push(current.trim());
        }
        current = '';
        continue;
      }
    }

    current += char;
  }

  if (current.trim()) {
    items.push(current.trim());
  }

  return items;
}

/**
 * 파일 파싱
 */
function parseStoryFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return parseDefineScene(content);
}

/**
 * 로직 파일 생성
 */
function generateLogicFile(scenes, relativePath) {
  const depth = relativePath.split(/[/\\]/).filter(Boolean).length;
  const prefix = '../'.repeat(depth + 1);

  let output = `const { cond, eff, action, defineScene } = require('${prefix}SceneBuilder');\n\n`;
  output += `const scenes = {\n`;

  const sceneEntries = Object.entries(scenes);
  sceneEntries.forEach(([sceneId, data], index) => {
    const { logic } = data;

    const options = [];
    if (logic.effects) {
      options.push(`effects: ${logic.effects}`);
    }
    if (logic.isEnding) {
      options.push(`isEnding: true`);
    }

    const optionsStr = options.length > 0 ? `{ ${options.join(', ')} }, ` : '';

    output += `  ...defineScene("${sceneId}", ${optionsStr}() => [\n`;

    logic.actions.forEach((actionStr, actionIndex) => {
      const comma = actionIndex < logic.actions.length - 1 ? ',' : '';
      output += `    ${actionStr}${comma}\n`;
    });

    output += `  ])`;
    output += index < sceneEntries.length - 1 ? ',\n\n' : '\n';
  });

  output += `};\n\n`;
  output += `module.exports = scenes;\n`;

  return output;
}

/**
 * 메인 실행
 */
async function main() {
  console.log('=== Story Parser 시작 ===\n');

  // 출력 디렉토리 생성
  if (!fs.existsSync(OUTPUT_JSON_DIR)) {
    fs.mkdirSync(OUTPUT_JSON_DIR, { recursive: true });
  }
  if (!fs.existsSync(OUTPUT_LOGIC_DIR)) {
    fs.mkdirSync(OUTPUT_LOGIC_DIR, { recursive: true });
  }

  const storyFiles = [];
  let totalScenes = 0;

  // 스토리 파일 수집
  function collectFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        collectFiles(filePath);
      } else if (file.endsWith('.js') && file !== 'index.js') {
        storyFiles.push(filePath);
      }
    });
  }

  collectFiles(STORY_DIR);
  console.log(`발견된 스토리 파일: ${storyFiles.length}개\n`);

  // 각 파일 파싱 및 변환
  for (const filePath of storyFiles) {
    const relativePath = path.relative(STORY_DIR, filePath);
    const relativeDir = path.dirname(relativePath);
    const baseName = path.basename(relativePath, '.js');

    console.log(`파싱 중: ${relativePath}`);

    try {
      const scenes = parseStoryFile(filePath);
      const sceneCount = Object.keys(scenes).length;
      console.log(`  → ${sceneCount}개 장면 파싱됨`);
      totalScenes += sceneCount;

      // JSON 텍스트 파일 생성
      const jsonScenes = {};
      for (const [sceneId, data] of Object.entries(scenes)) {
        jsonScenes[sceneId] = {
          script: data.json.script,
          actions: data.json.actions
        };
        if (data.json.location) {
          jsonScenes[sceneId].location = data.json.location;
        }
      }

      const jsonOutput = { scenes: jsonScenes };
      const jsonDir = path.join(OUTPUT_JSON_DIR, relativeDir);
      if (relativeDir !== '.' && !fs.existsSync(jsonDir)) {
        fs.mkdirSync(jsonDir, { recursive: true });
      }
      const jsonPath = path.join(OUTPUT_JSON_DIR, relativeDir === '.' ? '' : relativeDir, `${baseName}.json`);
      fs.writeFileSync(jsonPath, JSON.stringify(jsonOutput, null, 2), 'utf-8');
      console.log(`  → JSON: story_text/${relativePath.replace('.js', '.json').replace(/\\/g, '/')}`);

      // 로직 파일 생성
      const logicContent = generateLogicFile(scenes, relativePath);
      const logicDir = path.join(OUTPUT_LOGIC_DIR, relativeDir);
      if (relativeDir !== '.' && !fs.existsSync(logicDir)) {
        fs.mkdirSync(logicDir, { recursive: true });
      }
      const logicPath = path.join(OUTPUT_LOGIC_DIR, relativeDir === '.' ? '' : relativeDir, `${baseName}.js`);
      fs.writeFileSync(logicPath, logicContent);
      console.log(`  → Logic: story_logic/${relativePath.replace(/\\/g, '/')}`);

    } catch (e) {
      console.error(`  [ERROR] ${e.message}`);
      console.error(e.stack);
    }
  }

  // index.js 생성
  generateLogicIndex(storyFiles);
  generateTextIndex(storyFiles);

  console.log(`\n=== 완료 ===`);
  console.log(`JSON 파일: ${OUTPUT_JSON_DIR}/`);
  console.log(`로직 파일: ${OUTPUT_LOGIC_DIR}/`);
  console.log(`총 ${totalScenes}개 장면 변환됨`);
}

/**
 * story_logic/index.js 생성
 */
function generateLogicIndex(storyFiles) {
  let content = `const SB = require('../../SceneBuilder');\n`;
  content += `const textIndex = require('../story_text');\n\n`;
  content += `// 텍스트 데이터 초기화\n`;
  content += `SB.initTextData(textIndex);\n\n`;

  const imports = [];
  const spreads = [];

  for (const filePath of storyFiles) {
    const relativePath = path.relative(STORY_DIR, filePath).replace(/\\/g, '/');
    const varName = relativePath.replace(/\//g, '_').replace('.js', '').replace(/-/g, '_');

    imports.push(`const ${varName} = require('./${relativePath}');`);
    spreads.push(`  ...${varName},`);
  }

  content += imports.join('\n') + '\n\n';
  content += `const scenes = {\n${spreads.join('\n')}\n};\n\n`;
  content += `const gameData = {\n`;
  content += `  startScene: "entrance",\n`;
  content += `  startInventory: [],\n`;
  content += `  startFlags: {},\n`;
  content += `  scenes: scenes\n`;
  content += `};\n\n`;
  content += `module.exports = gameData;\n`;

  fs.writeFileSync(path.join(OUTPUT_LOGIC_DIR, 'index.js'), content);
  console.log(`\n→ story_logic/index.js 생성됨`);
}

/**
 * story_text/index.js 생성
 */
function generateTextIndex(storyFiles) {
  let content = `/**\n * 모든 텍스트 JSON 파일을 병합하여 export\n */\n\n`;

  const imports = [];
  const merges = [];

  for (const filePath of storyFiles) {
    const relativePath = path.relative(STORY_DIR, filePath).replace(/\\/g, '/');
    const jsonPath = relativePath.replace('.js', '.json');
    const varName = relativePath.replace(/\//g, '_').replace('.js', '').replace(/-/g, '_');

    imports.push(`const ${varName} = require('./${jsonPath}');`);
    merges.push(`  ...${varName}.scenes,`);
  }

  content += imports.join('\n') + '\n\n';
  content += `const allScenes = {\n${merges.join('\n')}\n};\n\n`;
  content += `module.exports = { scenes: allScenes };\n`;

  fs.writeFileSync(path.join(OUTPUT_JSON_DIR, 'index.js'), content);
  console.log(`→ story_text/index.js 생성됨`);
}

main().catch(console.error);
