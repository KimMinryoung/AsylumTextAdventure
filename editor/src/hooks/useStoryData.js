import { useState, useEffect, useCallback } from 'react';
import * as editorApi from '../api/editorApi';

export default function useStoryData() {
  const [scenes, setScenes] = useState({});
  const [textData, setTextData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 데이터 로드
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await editorApi.getScenes();
      setScenes(data.scenes || {});
      setTextData(data.textData || {});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // 초기 로드
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 씬 업데이트
  const updateScene = useCallback(async (sceneId, updates) => {
    try {
      const result = await editorApi.updateScene(sceneId, updates);

      // 로컬 상태 업데이트
      setScenes(prev => ({
        ...prev,
        [sceneId]: { ...prev[sceneId], ...updates.logic }
      }));

      if (updates.text) {
        setTextData(prev => ({
          ...prev,
          scenes: {
            ...prev.scenes,
            [sceneId]: { ...prev.scenes?.[sceneId], ...updates.text }
          }
        }));
      }

      return result;
    } catch (err) {
      throw new Error('씬 업데이트 실패: ' + err.message);
    }
  }, []);

  // 액션 업데이트
  const updateAction = useCallback(async (sceneId, actionId, updates) => {
    try {
      const result = await editorApi.updateAction(sceneId, actionId, updates);

      // 로컬 상태 업데이트
      setScenes(prev => {
        const scene = prev[sceneId];
        if (!scene) return prev;

        const updatedActions = scene.actions.map(action => {
          if (action.id === actionId) {
            return { ...action, ...updates.logic };
          }
          return action;
        });

        return {
          ...prev,
          [sceneId]: { ...scene, actions: updatedActions }
        };
      });

      if (updates.text) {
        setTextData(prev => ({
          ...prev,
          scenes: {
            ...prev.scenes,
            [sceneId]: {
              ...prev.scenes?.[sceneId],
              actions: {
                ...prev.scenes?.[sceneId]?.actions,
                [actionId]: updates.text
              }
            }
          }
        }));
      }

      return result;
    } catch (err) {
      throw new Error('액션 업데이트 실패: ' + err.message);
    }
  }, []);

  // 새 씬 생성
  const createScene = useCallback(async (sceneId, sceneData) => {
    try {
      const result = await editorApi.createScene(sceneId, sceneData);

      // 로컬 상태 업데이트
      setScenes(prev => ({
        ...prev,
        [sceneId]: sceneData.logic || {}
      }));

      if (sceneData.text) {
        setTextData(prev => ({
          ...prev,
          scenes: {
            ...prev.scenes,
            [sceneId]: sceneData.text
          }
        }));
      }

      return result;
    } catch (err) {
      throw new Error('씬 생성 실패: ' + err.message);
    }
  }, []);

  // 씬 삭제
  const deleteScene = useCallback(async (sceneId) => {
    try {
      await editorApi.deleteScene(sceneId);

      // 로컬 상태 업데이트
      setScenes(prev => {
        const updated = { ...prev };
        delete updated[sceneId];
        return updated;
      });

      setTextData(prev => {
        const updatedScenes = { ...prev.scenes };
        delete updatedScenes[sceneId];
        return { ...prev, scenes: updatedScenes };
      });
    } catch (err) {
      throw new Error('씬 삭제 실패: ' + err.message);
    }
  }, []);

  // 파일에 저장
  const saveToFiles = useCallback(async () => {
    try {
      await editorApi.saveToFiles();
    } catch (err) {
      throw new Error('파일 저장 실패: ' + err.message);
    }
  }, []);

  return {
    scenes,
    textData,
    loading,
    error,
    refreshData: fetchData,
    updateScene,
    updateAction,
    createScene,
    deleteScene,
    saveToFiles
  };
}
