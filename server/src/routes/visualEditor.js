const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Import story data
const storyData = require('../game/data/story_logic');
const storyText = require('../game/data/story_text');

/**
 * GET /api/visual-editor/scenes
 * 전체 씬 데이터 조회 (로직 + 텍스트)
 */
router.get('/scenes', (req, res) => {
  try {
    const scenes = storyData.scenes;
    const textData = {
      scenes: storyText.scenes || {}
    };

    // 씬 데이터를 에디터 형식으로 변환
    const editorScenes = {};

    Object.entries(scenes).forEach(([sceneId, scene]) => {
      editorScenes[sceneId] = {
        location: scene.location || 'unknown',
        isEnding: scene.isEnding || false,
        effects: scene.effects || [],
        actions: (scene.actions || []).map((action, idx) => ({
          id: action.id || `${sceneId}_act_${idx + 1}`,
          nextScene: action.nextScene,
          conditions: action.conditions || [],
          effects: action.effects || []
        }))
      };
    });

    res.json({
      success: true,
      scenes: editorScenes,
      textData
    });
  } catch (error) {
    console.error('[VisualEditor] Error loading scenes:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * POST /api/visual-editor/scene
 * 새 씬 생성
 */
router.post('/scene', (req, res) => {
  try {
    const { sceneId, logic, text } = req.body;

    if (!sceneId) {
      return res.status(400).json({
        success: false,
        message: 'sceneId is required'
      });
    }

    // 씬 ID 유효성 검사
    if (!/^[a-z_][a-z0-9_]*$/i.test(sceneId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid sceneId format (use only letters, numbers, and underscores)'
      });
    }

    // 중복 검사
    if (storyData.scenes[sceneId]) {
      return res.status(409).json({
        success: false,
        message: 'Scene already exists'
      });
    }

    // 메모리에 씬 추가 (실제 파일 저장은 save 엔드포인트에서)
    storyData.scenes[sceneId] = {
      location: logic?.location || 'cell',
      description: [],
      actions: logic?.actions || [],
      effects: logic?.effects || [],
      isEnding: logic?.isEnding || false
    };

    // 텍스트 데이터 추가
    if (!storyText.scenes) storyText.scenes = {};
    storyText.scenes[sceneId] = {
      script: text?.script || ['새 장면 설명'],
      actions: text?.actions || [],
      location: logic?.location || 'cell'
    };

    res.json({
      success: true,
      sceneId,
      message: 'Scene created in memory. Use /save to persist.'
    });
  } catch (error) {
    console.error('[VisualEditor] Error creating scene:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * PUT /api/visual-editor/scene/:id
 * 씬 수정
 */
router.put('/scene/:id', (req, res) => {
  try {
    const sceneId = req.params.id;
    const { logic, text } = req.body;

    if (!storyData.scenes[sceneId]) {
      return res.status(404).json({
        success: false,
        message: 'Scene not found'
      });
    }

    const scene = storyData.scenes[sceneId];

    // 로직 업데이트
    if (logic) {
      if (logic.location !== undefined) scene.location = logic.location;
      if (logic.isEnding !== undefined) scene.isEnding = logic.isEnding;
      if (logic.effects !== undefined) scene.effects = logic.effects;
      if (logic.actions !== undefined) {
        // 액션 업데이트 시 텍스트 보존
        const existingTexts = scene.actions.map(a => a.text);
        scene.actions = logic.actions.map((action, idx) => ({
          ...action,
          text: action.text || existingTexts[idx] || '[텍스트 없음]'
        }));
      }
    }

    // 텍스트 업데이트
    if (text && storyText.scenes) {
      if (!storyText.scenes[sceneId]) {
        storyText.scenes[sceneId] = {};
      }

      if (text.description !== undefined) {
        // description을 script 형식으로 변환
        storyText.scenes[sceneId].script = [text.description];
      }
      if (text.script !== undefined) {
        storyText.scenes[sceneId].script = text.script;
      }
      if (text.actions !== undefined) {
        storyText.scenes[sceneId].actions = text.actions;
      }
    }

    res.json({
      success: true,
      sceneId,
      message: 'Scene updated in memory. Use /save to persist.'
    });
  } catch (error) {
    console.error('[VisualEditor] Error updating scene:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * DELETE /api/visual-editor/scene/:id
 * 씬 삭제
 */
router.delete('/scene/:id', (req, res) => {
  try {
    const sceneId = req.params.id;

    if (!storyData.scenes[sceneId]) {
      return res.status(404).json({
        success: false,
        message: 'Scene not found'
      });
    }

    // 메모리에서 삭제
    delete storyData.scenes[sceneId];

    if (storyText.scenes && storyText.scenes[sceneId]) {
      delete storyText.scenes[sceneId];
    }

    res.json({
      success: true,
      message: 'Scene deleted from memory. Use /save to persist.'
    });
  } catch (error) {
    console.error('[VisualEditor] Error deleting scene:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * PUT /api/visual-editor/action/:sceneId/:actionId
 * 액션 수정
 */
router.put('/action/:sceneId/:actionId', (req, res) => {
  try {
    const { sceneId, actionId } = req.params;
    const { logic, text } = req.body;

    if (!storyData.scenes[sceneId]) {
      return res.status(404).json({
        success: false,
        message: 'Scene not found'
      });
    }

    const scene = storyData.scenes[sceneId];
    const actionIndex = scene.actions.findIndex(a => a.id === actionId);

    if (actionIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Action not found'
      });
    }

    // 로직 업데이트
    if (logic) {
      const action = scene.actions[actionIndex];
      if (logic.nextScene !== undefined) action.nextScene = logic.nextScene;
      if (logic.conditions !== undefined) action.conditions = logic.conditions;
      if (logic.effects !== undefined) action.effects = logic.effects;
    }

    // 텍스트 업데이트
    if (text !== undefined && storyText.scenes && storyText.scenes[sceneId]) {
      if (!storyText.scenes[sceneId].actions) {
        storyText.scenes[sceneId].actions = [];
      }
      // 액션 텍스트 업데이트
      storyText.scenes[sceneId].actions[actionIndex] = text;
    }

    res.json({
      success: true,
      message: 'Action updated in memory. Use /save to persist.'
    });
  } catch (error) {
    console.error('[VisualEditor] Error updating action:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * GET /api/visual-editor/validate
 * 스토리 검증
 */
router.get('/validate', (req, res) => {
  try {
    const scenes = storyData.scenes;
    const errors = [];
    const warnings = [];

    const allSceneIds = new Set(Object.keys(scenes));

    // BFS로 도달 가능한 씬 탐색
    const reachable = new Set();
    const queue = ['entrance'];

    while (queue.length > 0) {
      const current = queue.shift();
      if (reachable.has(current)) continue;

      if (!allSceneIds.has(current)) {
        continue; // broken link - 나중에 처리
      }

      reachable.add(current);

      const scene = scenes[current];
      if (!scene?.actions) continue;

      scene.actions.forEach(action => {
        if (action.nextScene && !reachable.has(action.nextScene)) {
          queue.push(action.nextScene);
        }
      });
    }

    // 고아 씬 탐지
    allSceneIds.forEach(sceneId => {
      if (!reachable.has(sceneId)) {
        warnings.push({
          type: 'orphan',
          sceneId,
          message: `Scene '${sceneId}' is not reachable from entrance`
        });
      }
    });

    // 끊어진 링크 탐지
    Object.entries(scenes).forEach(([sceneId, scene]) => {
      if (!scene.actions) return;

      scene.actions.forEach(action => {
        if (action.nextScene && !allSceneIds.has(action.nextScene)) {
          errors.push({
            type: 'broken_link',
            sceneId,
            actionId: action.id,
            targetScene: action.nextScene,
            message: `Action '${action.id}' in '${sceneId}' points to non-existent scene '${action.nextScene}'`
          });
        }
      });
    });

    // 막다른 길 탐지
    Object.entries(scenes).forEach(([sceneId, scene]) => {
      if (!scene.isEnding && (!scene.actions || scene.actions.length === 0)) {
        warnings.push({
          type: 'dead_end',
          sceneId,
          message: `Scene '${sceneId}' has no actions and is not an ending`
        });
      }
    });

    // entrance 확인
    if (!scenes['entrance']) {
      errors.push({
        type: 'missing_entrance',
        message: 'No entrance scene found'
      });
    }

    res.json({
      success: true,
      errors,
      warnings,
      stats: {
        totalScenes: allSceneIds.size,
        reachableScenes: reachable.size,
        endingScenes: Object.values(scenes).filter(s => s.isEnding).length
      }
    });
  } catch (error) {
    console.error('[VisualEditor] Error validating:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * POST /api/visual-editor/save
 * 변경사항을 파일에 저장
 *
 * 주의: 이 기능은 현재 텍스트 데이터만 저장 가능.
 * 로직 데이터는 JS 파일이라 런타임에서 수정 불가.
 */
router.post('/save', (req, res) => {
  try {
    const STORY_TEXT_DIR = path.join(__dirname, '../game/data/story_text');

    // 텍스트 데이터 저장
    // 각 파일별로 분리하여 저장해야 함
    // 현재는 단순화하여 메시지만 반환

    res.json({
      success: true,
      message: 'Save functionality is limited. Text changes are stored in memory. Restart server to reload from files.'
    });
  } catch (error) {
    console.error('[VisualEditor] Error saving:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
