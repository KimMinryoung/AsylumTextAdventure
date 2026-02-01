import { useState, useCallback, useMemo } from 'react';
import * as editorApi from '../api/editorApi';
import { findOrphanScenes, findBrokenLinks } from '../utils/graphUtils';

export default function useValidation(scenes) {
  const [validationResults, setValidationResults] = useState({
    errors: [],
    warnings: [],
    info: []
  });
  const [isValidating, setIsValidating] = useState(false);

  // 고아 씬 계산 (메모이제이션)
  const orphanScenes = useMemo(() => {
    if (!scenes || Object.keys(scenes).length === 0) {
      return new Set();
    }
    return findOrphanScenes(scenes);
  }, [scenes]);

  // 클라이언트 측 빠른 검증
  const quickValidate = useCallback(() => {
    const errors = [];
    const warnings = [];
    const info = [];

    if (!scenes || Object.keys(scenes).length === 0) {
      return { errors, warnings, info };
    }

    // 1. 고아 씬 탐지
    orphanScenes.forEach(sceneId => {
      warnings.push({
        type: 'orphan',
        sceneId,
        message: `'${sceneId}' 씬은 entrance에서 도달 불가능합니다.`
      });
    });

    // 2. 끊어진 링크 탐지
    const brokenLinks = findBrokenLinks(scenes);
    brokenLinks.forEach(({ fromScene, actionId, missingScene }) => {
      errors.push({
        type: 'broken_link',
        sceneId: fromScene,
        actionId,
        message: `'${fromScene}'의 액션 '${actionId}'이 존재하지 않는 씬 '${missingScene}'을 가리킵니다.`
      });
    });

    // 3. entrance 씬 확인
    if (!scenes['entrance']) {
      errors.push({
        type: 'missing_entrance',
        message: 'entrance 씬이 없습니다.'
      });
    }

    // 4. 엔딩 씬 확인
    const endingScenes = Object.entries(scenes).filter(([, s]) => s.isEnding);
    if (endingScenes.length === 0) {
      warnings.push({
        type: 'no_endings',
        message: '엔딩 씬이 없습니다.'
      });
    } else {
      info.push({
        type: 'endings_count',
        message: `${endingScenes.length}개의 엔딩 씬이 있습니다.`
      });
    }

    // 5. 액션 없는 비-엔딩 씬 탐지
    Object.entries(scenes).forEach(([sceneId, scene]) => {
      if (!scene.isEnding && (!scene.actions || scene.actions.length === 0)) {
        warnings.push({
          type: 'dead_end',
          sceneId,
          message: `'${sceneId}' 씬에 액션이 없어 막다른 길입니다.`
        });
      }
    });

    return { errors, warnings, info };
  }, [scenes, orphanScenes]);

  // 전체 검증 (서버 API 호출)
  const runValidation = useCallback(async () => {
    setIsValidating(true);

    try {
      // 먼저 클라이언트 측 검증
      const clientResults = quickValidate();

      // 서버 측 검증 시도
      try {
        const serverResults = await editorApi.validate();

        // 서버 결과와 병합 (중복 제거)
        const mergedErrors = [...clientResults.errors];
        const mergedWarnings = [...clientResults.warnings];

        serverResults.errors?.forEach(err => {
          if (!mergedErrors.some(e => e.message === err.message)) {
            mergedErrors.push(err);
          }
        });

        serverResults.warnings?.forEach(warn => {
          if (!mergedWarnings.some(w => w.message === warn.message)) {
            mergedWarnings.push(warn);
          }
        });

        const results = {
          errors: mergedErrors,
          warnings: mergedWarnings,
          info: clientResults.info
        };

        setValidationResults(results);
        return results;
      } catch {
        // 서버 검증 실패 시 클라이언트 결과만 사용
        setValidationResults(clientResults);
        return clientResults;
      }
    } finally {
      setIsValidating(false);
    }
  }, [quickValidate]);

  return {
    validationResults,
    isValidating,
    runValidation,
    quickValidate,
    orphanScenes
  };
}
