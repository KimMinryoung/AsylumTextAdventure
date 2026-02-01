import React, { useState, useCallback } from 'react';
import { ReactFlowProvider } from 'reactflow';
import Header from './components/layout/Header';
import SidePanel from './components/layout/SidePanel';
import StoryGraph from './components/graph/StoryGraph';
import useStoryData from './hooks/useStoryData';
import useValidation from './hooks/useValidation';

function App() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [toasts, setToasts] = useState([]);

  const {
    scenes,
    textData,
    loading,
    error,
    refreshData,
    updateScene,
    updateAction,
    createScene,
    deleteScene,
    saveToFiles
  } = useStoryData();

  const {
    validationResults,
    isValidating,
    runValidation,
    orphanScenes
  } = useValidation(scenes);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const handleNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);

  const handleEdgeClick = useCallback((event, edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  const handlePaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      await saveToFiles();
      showToast('저장 완료!', 'success');
    } catch (err) {
      showToast('저장 실패: ' + err.message, 'error');
    }
  }, [saveToFiles, showToast]);

  const handleValidate = useCallback(async () => {
    const results = await runValidation();
    if (results.errors.length === 0 && results.warnings.length === 0) {
      showToast('검증 완료: 문제 없음', 'success');
    } else {
      showToast(`검증 완료: ${results.errors.length}개 오류, ${results.warnings.length}개 경고`, 'warning');
    }
  }, [runValidation, showToast]);

  const handleSceneUpdate = useCallback(async (sceneId, updates) => {
    try {
      await updateScene(sceneId, updates);
      showToast('씬 업데이트 완료', 'success');
    } catch (err) {
      showToast('업데이트 실패: ' + err.message, 'error');
    }
  }, [updateScene, showToast]);

  const handleActionUpdate = useCallback(async (sceneId, actionId, updates) => {
    try {
      await updateAction(sceneId, actionId, updates);
      showToast('액션 업데이트 완료', 'success');
    } catch (err) {
      showToast('업데이트 실패: ' + err.message, 'error');
    }
  }, [updateAction, showToast]);

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">
          <div className="loading-spinner" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="loading">
          <p>오류: {error}</p>
          <button className="btn btn-primary" onClick={refreshData}>
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <ReactFlowProvider>
      <div className="app-container">
        <Header
          onSave={handleSave}
          onValidate={handleValidate}
          onRefresh={refreshData}
          isValidating={isValidating}
          validationResults={validationResults}
        />
        <div className="main-content">
          <div className="graph-container">
            <StoryGraph
              scenes={scenes}
              textData={textData}
              orphanScenes={orphanScenes}
              selectedNode={selectedNode}
              onNodeClick={handleNodeClick}
              onEdgeClick={handleEdgeClick}
              onPaneClick={handlePaneClick}
            />
          </div>
          <SidePanel
            selectedNode={selectedNode}
            selectedEdge={selectedEdge}
            scenes={scenes}
            textData={textData}
            onSceneUpdate={handleSceneUpdate}
            onActionUpdate={handleActionUpdate}
            onCreateScene={createScene}
            onDeleteScene={deleteScene}
            validationResults={validationResults}
          />
        </div>

        {/* Toast notifications */}
        <div className="toast-container">
          {toasts.map(toast => (
            <div key={toast.id} className={`toast ${toast.type}`}>
              {toast.message}
            </div>
          ))}
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
