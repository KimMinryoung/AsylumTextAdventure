/**
 * Story Text to Supabase Migration Script
 *
 * 모든 story_text JSON 파일을 Supabase PostgreSQL DB로 마이그레이션
 *
 * 사용법:
 *   SUPABASE_URL=xxx SUPABASE_KEY=xxx node scripts/migrate_to_supabase.js
 *
 * 테이블 스키마 (Supabase에서 먼저 생성 필요):
 *   CREATE TABLE story_scenes (
 *       id SERIAL PRIMARY KEY,
 *       scene_id VARCHAR(100) UNIQUE NOT NULL,
 *       file_path VARCHAR(200) NOT NULL,
 *       script JSONB NOT NULL DEFAULT '[]',
 *       actions JSONB NOT NULL DEFAULT '{}',
 *       location VARCHAR(50),
 *       created_at TIMESTAMP DEFAULT NOW(),
 *       updated_at TIMESTAMP DEFAULT NOW()
 *   );
 *   CREATE INDEX idx_story_scenes_file_path ON story_scenes(file_path);
 *   CREATE INDEX idx_story_scenes_location ON story_scenes(location);
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 환경 변수 체크
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Error: SUPABASE_URL and SUPABASE_KEY environment variables are required');
    console.error('Usage: SUPABASE_URL=xxx SUPABASE_KEY=xxx node scripts/migrate_to_supabase.js');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// story_text 디렉토리 경로
const STORY_TEXT_DIR = path.join(__dirname, '../src/game/data/story_text');

// JSON 파일 매핑 (index.js 기반)
const FILE_MAPPINGS = [
    { file: 'cafeteria.json', pathName: 'cafeteria' },
    { file: 'characters/arsonist.json', pathName: 'characters/arsonist' },
    { file: 'characters/fraudster.json', pathName: 'characters/fraudster' },
    { file: 'characters/groper.json', pathName: 'characters/groper' },
    { file: 'characters/guard.json', pathName: 'characters/guard' },
    { file: 'characters/messiah.json', pathName: 'characters/messiah' },
    { file: 'characters/pedophile.json', pathName: 'characters/pedophile' },
    { file: 'characters/political.json', pathName: 'characters/political' },
    { file: 'characters/wifekiller.json', pathName: 'characters/wifekiller' },
    { file: 'daily.json', pathName: 'daily' },
    { file: 'dungeon/entrance.json', pathName: 'dungeon/entrance' },
    { file: 'dungeon/tunnels.json', pathName: 'dungeon/tunnels' },
    { file: 'dungeon/chapel.json', pathName: 'dungeon/chapel' },
    { file: 'dungeon/endings.json', pathName: 'dungeon/endings' },
    { file: 'endings.json', pathName: 'endings' },
    { file: 'escape.json', pathName: 'escape' },
    { file: 'intro.json', pathName: 'intro' },
    { file: 'sleep.json', pathName: 'sleep' },
    { file: 'warden_office.json', pathName: 'warden_office' },
    { file: 'workshop.json', pathName: 'workshop' },
    { file: 'yard.json', pathName: 'yard' },
    { file: 'sewer_mystery.json', pathName: 'sewer_mystery' },
    { file: 'torchlight_mystery.json', pathName: 'torchlight_mystery' },
    { file: 'wall_scratching_mystery.json', pathName: 'wall_scratching_mystery' },
    { file: 'location_menu.json', pathName: 'location_menu' },
];

async function loadJsonFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content);
    } catch (err) {
        console.error(`Failed to read ${filePath}:`, err.message);
        return null;
    }
}

async function migrateScenes() {
    console.log('Starting migration to Supabase...\n');

    let totalScenes = 0;
    let successCount = 0;
    let errorCount = 0;
    const allRecords = [];

    for (const mapping of FILE_MAPPINGS) {
        const filePath = path.join(STORY_TEXT_DIR, mapping.file);

        if (!fs.existsSync(filePath)) {
            console.warn(`⚠ File not found: ${mapping.file}`);
            continue;
        }

        const data = await loadJsonFile(filePath);
        if (!data || !data.scenes) {
            console.warn(`⚠ No scenes in: ${mapping.file}`);
            continue;
        }

        const scenes = data.scenes;
        const sceneCount = Object.keys(scenes).length;
        console.log(`📁 ${mapping.file}: ${sceneCount} scenes`);

        for (const [sceneId, sceneData] of Object.entries(scenes)) {
            totalScenes++;

            const record = {
                scene_id: sceneId,
                file_path: mapping.pathName,
                script: sceneData.script || [],
                actions: sceneData.actions || {},
                location: sceneData.location || null,
            };

            allRecords.push(record);
        }
    }

    console.log(`\nTotal scenes to migrate: ${totalScenes}`);
    console.log('Uploading to Supabase...\n');

    // Batch upsert (50 records at a time)
    const BATCH_SIZE = 50;
    for (let i = 0; i < allRecords.length; i += BATCH_SIZE) {
        const batch = allRecords.slice(i, i + BATCH_SIZE);

        const { data, error } = await supabase
            .from('story_scenes')
            .upsert(batch, { onConflict: 'scene_id' });

        if (error) {
            console.error(`❌ Batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`, error.message);
            errorCount += batch.length;
        } else {
            successCount += batch.length;
            process.stdout.write(`✓ Uploaded ${Math.min(i + BATCH_SIZE, allRecords.length)}/${allRecords.length}\r`);
        }
    }

    console.log('\n\n=== Migration Complete ===');
    console.log(`✅ Success: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📊 Total: ${totalScenes}`);

    // 검증
    console.log('\nVerifying...');
    const { count, error: countError } = await supabase
        .from('story_scenes')
        .select('*', { count: 'exact', head: true });

    if (countError) {
        console.error('Verification failed:', countError.message);
    } else {
        console.log(`✅ DB contains ${count} scenes`);
    }
}

// 실행
migrateScenes().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
});
