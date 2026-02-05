#!/usr/bin/env node
/**
 * Scene Tool - DB 기반 story_text 관리 도구
 *
 * 사용법:
 *   node scripts/scene_tool.js <command> [options]
 *
 * 명령어:
 *   read <scene_id>              - 특정 scene 조회
 *   list [pattern]               - scene 목록 조회 (pattern으로 필터링 가능)
 *   create <scene_id> <file>     - 새 scene 생성 (JSON 파일에서 읽음)
 *   update <scene_id> <file>     - scene 수정 (JSON 파일에서 읽음)
 *   delete <scene_id>            - scene 삭제
 *   export <scene_id> [file]     - scene을 JSON 파일로 내보내기
 *   export-all [dir]             - 모든 scene을 JSON 파일로 내보내기
 *
 * JSON 파일 형식:
 *   {
 *     "script": ["대사1", "speaker: 대사2", ...],
 *     "actions": ["선택지1", "선택지2", ...],
 *     "location": "cell"
 *   }
 *
 * 예시:
 *   node scripts/scene_tool.js read entrance
 *   node scripts/scene_tool.js list day_
 *   node scripts/scene_tool.js create new_scene ./scenes/new_scene.json
 *   node scripts/scene_tool.js update entrance ./scenes/entrance.json
 *   node scripts/scene_tool.js export entrance ./backup/entrance.json
 */

const fs = require('fs');
const path = require('path');

// .env 로드
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Error: SUPABASE_URL and SUPABASE_KEY are required in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ============================================
// 헬퍼 함수
// ============================================

function formatScript(script) {
  if (!script || !Array.isArray(script)) return '(empty)';
  return script.map((line, i) => `  ${i + 1}. ${line}`).join('\n');
}

function formatActions(actions) {
  if (!actions || !Array.isArray(actions)) return '(empty)';
  return actions.map((action, i) => `  [${i + 1}] ${action}`).join('\n');
}

function printScene(scene) {
  console.log('\n' + '='.repeat(60));
  console.log(`Scene ID: ${scene.scene_id}`);
  console.log(`Location: ${scene.location || '(none)'}`);
  console.log(`File Path: ${scene.file_path || '(none)'}`);
  console.log('-'.repeat(60));
  console.log('Script:');
  console.log(formatScript(scene.script));
  console.log('-'.repeat(60));
  console.log('Actions:');
  console.log(formatActions(scene.actions));
  console.log('='.repeat(60) + '\n');
}

function loadJsonFile(filePath) {
  try {
    const absolutePath = path.resolve(filePath);
    const content = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading file: ${err.message}`);
    return null;
  }
}

function saveJsonFile(filePath, data) {
  try {
    const absolutePath = path.resolve(filePath);
    const dir = path.dirname(absolutePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing file: ${err.message}`);
    return false;
  }
}

// ============================================
// 명령어 구현
// ============================================

async function cmdRead(sceneId) {
  if (!sceneId) {
    console.error('Usage: scene_tool.js read <scene_id>');
    process.exit(1);
  }

  const { data, error } = await supabase
    .from('story_scenes')
    .select('*')
    .eq('scene_id', sceneId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      console.error(`Scene '${sceneId}' not found`);
    } else {
      console.error('Error:', error.message);
    }
    process.exit(1);
  }

  printScene(data);
}

async function cmdList(pattern) {
  let query = supabase
    .from('story_scenes')
    .select('scene_id, location, file_path')
    .order('scene_id');

  if (pattern) {
    query = query.ilike('scene_id', `%${pattern}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }

  console.log(`\nFound ${data.length} scenes${pattern ? ` matching '${pattern}'` : ''}:\n`);

  const maxIdLen = Math.max(...data.map(s => s.scene_id.length), 8);
  const maxLocLen = Math.max(...data.map(s => (s.location || '').length), 8);

  console.log(`${'SCENE_ID'.padEnd(maxIdLen)}  ${'LOCATION'.padEnd(maxLocLen)}  FILE_PATH`);
  console.log('-'.repeat(maxIdLen + maxLocLen + 30));

  data.forEach(scene => {
    console.log(
      `${scene.scene_id.padEnd(maxIdLen)}  ` +
      `${(scene.location || '-').padEnd(maxLocLen)}  ` +
      `${scene.file_path || '-'}`
    );
  });
  console.log();
}

async function cmdCreate(sceneId, filePath) {
  if (!sceneId || !filePath) {
    console.error('Usage: scene_tool.js create <scene_id> <json_file>');
    process.exit(1);
  }

  // 기존 scene 확인
  const { data: existing } = await supabase
    .from('story_scenes')
    .select('scene_id')
    .eq('scene_id', sceneId)
    .single();

  if (existing) {
    console.error(`Scene '${sceneId}' already exists. Use 'update' command instead.`);
    process.exit(1);
  }

  const jsonData = loadJsonFile(filePath);
  if (!jsonData) process.exit(1);

  const record = {
    scene_id: sceneId,
    file_path: jsonData.file_path || 'custom',
    script: jsonData.script || [],
    actions: jsonData.actions || [],
    location: jsonData.location || null
  };

  const { error } = await supabase
    .from('story_scenes')
    .insert(record);

  if (error) {
    console.error('Error creating scene:', error.message);
    process.exit(1);
  }

  console.log(`\n✅ Scene '${sceneId}' created successfully!`);
  await cmdRead(sceneId);
}

async function cmdUpdate(sceneId, filePath) {
  if (!sceneId || !filePath) {
    console.error('Usage: scene_tool.js update <scene_id> <json_file>');
    process.exit(1);
  }

  // 기존 scene 확인
  const { data: existing, error: fetchError } = await supabase
    .from('story_scenes')
    .select('*')
    .eq('scene_id', sceneId)
    .single();

  if (fetchError || !existing) {
    console.error(`Scene '${sceneId}' not found. Use 'create' command instead.`);
    process.exit(1);
  }

  const jsonData = loadJsonFile(filePath);
  if (!jsonData) process.exit(1);

  // 변경 사항 확인
  console.log('\n--- Current vs New ---');
  console.log('Script lines:', existing.script?.length || 0, '->', jsonData.script?.length || 0);
  console.log('Actions:', existing.actions?.length || 0, '->', jsonData.actions?.length || 0);
  console.log('Location:', existing.location || '(none)', '->', jsonData.location || '(none)');

  const updates = {};
  if (jsonData.script !== undefined) updates.script = jsonData.script;
  if (jsonData.actions !== undefined) updates.actions = jsonData.actions;
  if (jsonData.location !== undefined) updates.location = jsonData.location;
  if (jsonData.file_path !== undefined) updates.file_path = jsonData.file_path;
  updates.updated_at = new Date().toISOString();

  const { error } = await supabase
    .from('story_scenes')
    .update(updates)
    .eq('scene_id', sceneId);

  if (error) {
    console.error('Error updating scene:', error.message);
    process.exit(1);
  }

  console.log(`\n✅ Scene '${sceneId}' updated successfully!`);
  await cmdRead(sceneId);
}

async function cmdDelete(sceneId) {
  if (!sceneId) {
    console.error('Usage: scene_tool.js delete <scene_id>');
    process.exit(1);
  }

  // 기존 scene 확인
  const { data: existing } = await supabase
    .from('story_scenes')
    .select('scene_id')
    .eq('scene_id', sceneId)
    .single();

  if (!existing) {
    console.error(`Scene '${sceneId}' not found`);
    process.exit(1);
  }

  const { error } = await supabase
    .from('story_scenes')
    .delete()
    .eq('scene_id', sceneId);

  if (error) {
    console.error('Error deleting scene:', error.message);
    process.exit(1);
  }

  console.log(`\n✅ Scene '${sceneId}' deleted successfully!`);
}

async function cmdExport(sceneId, filePath) {
  if (!sceneId) {
    console.error('Usage: scene_tool.js export <scene_id> [output_file]');
    process.exit(1);
  }

  const { data, error } = await supabase
    .from('story_scenes')
    .select('*')
    .eq('scene_id', sceneId)
    .single();

  if (error || !data) {
    console.error(`Scene '${sceneId}' not found`);
    process.exit(1);
  }

  const exportData = {
    script: data.script,
    actions: data.actions,
    location: data.location
  };

  if (filePath) {
    if (saveJsonFile(filePath, exportData)) {
      console.log(`\n✅ Exported '${sceneId}' to ${filePath}`);
    }
  } else {
    console.log(JSON.stringify(exportData, null, 2));
  }
}

async function cmdExportAll(dirPath) {
  const outputDir = dirPath || './scene_backup';

  const { data, error } = await supabase
    .from('story_scenes')
    .select('*')
    .order('scene_id');

  if (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let count = 0;
  for (const scene of data) {
    const exportData = {
      script: scene.script,
      actions: scene.actions,
      location: scene.location
    };
    const filePath = path.join(outputDir, `${scene.scene_id}.json`);
    if (saveJsonFile(filePath, exportData)) {
      count++;
    }
  }

  console.log(`\n✅ Exported ${count} scenes to ${outputDir}/`);
}

// ============================================
// 메인
// ============================================

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) {
    console.log(`
Scene Tool - DB 기반 story_text 관리 도구

사용법:
  node scripts/scene_tool.js <command> [options]

명령어:
  read <scene_id>              특정 scene 조회
  list [pattern]               scene 목록 조회
  create <scene_id> <file>     새 scene 생성
  update <scene_id> <file>     scene 수정
  delete <scene_id>            scene 삭제
  export <scene_id> [file]     scene을 JSON으로 내보내기
  export-all [dir]             모든 scene 내보내기

예시:
  node scripts/scene_tool.js read entrance
  node scripts/scene_tool.js list day_
  node scripts/scene_tool.js create new_scene ./new_scene.json
  node scripts/scene_tool.js export entrance ./backup/entrance.json
`);
    process.exit(0);
  }

  switch (command) {
    case 'read':
      await cmdRead(args[1]);
      break;
    case 'list':
      await cmdList(args[1]);
      break;
    case 'create':
      await cmdCreate(args[1], args[2]);
      break;
    case 'update':
      await cmdUpdate(args[1], args[2]);
      break;
    case 'delete':
      await cmdDelete(args[1]);
      break;
    case 'export':
      await cmdExport(args[1], args[2]);
      break;
    case 'export-all':
      await cmdExportAll(args[1]);
      break;
    default:
      console.error(`Unknown command: ${command}`);
      process.exit(1);
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
