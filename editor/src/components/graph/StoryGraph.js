import React, { useMemo, useCallback } from 'react';
import ReactFlow, {
  Controls,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';

import SceneNode from './SceneNode';
import ActionEdge from './ActionEdge';
import { scenesToNodes, scenesToEdges, calculateLayout } from '../../utils/graphUtils';
import './StoryGraph.css';

// 커스텀 노드 타입 등록
const nodeTypes = {
  sceneNode: SceneNode
};

// 커스텀 엣지 타입 등록
const edgeTypes = {
  actionEdge: ActionEdge
};

export default function StoryGraph({
  scenes,
  textData,
  orphanScenes,
  selectedNode,
  onNodeClick,
  onEdgeClick,
  onPaneClick
}) {
  // Scene 데이터를 React Flow 형식으로 변환
  const { initialNodes, initialEdges } = useMemo(() => {
    const rawNodes = scenesToNodes(scenes, textData, orphanScenes);
    const rawEdges = scenesToEdges(scenes, textData);
    const { nodes: layoutedNodes, edges: layoutedEdges } = calculateLayout(rawNodes, rawEdges);

    return {
      initialNodes: layoutedNodes,
      initialEdges: layoutedEdges
    };
  }, [scenes, textData, orphanScenes]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // 데이터가 변경되면 노드/엣지 업데이트
  React.useEffect(() => {
    const rawNodes = scenesToNodes(scenes, textData, orphanScenes);
    const rawEdges = scenesToEdges(scenes, textData);
    const { nodes: layoutedNodes, edges: layoutedEdges } = calculateLayout(rawNodes, rawEdges);

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [scenes, textData, orphanScenes, setNodes, setEdges]);

  // 선택 상태 반영
  const nodesWithSelection = useMemo(() => {
    return nodes.map(node => ({
      ...node,
      selected: selectedNode?.id === node.id,
      data: {
        ...node.data,
        selected: selectedNode?.id === node.id
      }
    }));
  }, [nodes, selectedNode]);

  // 미니맵 노드 색상
  const nodeColor = useCallback((node) => {
    switch (node.data?.nodeType) {
      case 'entrance':
        return '#4ade80';
      case 'ending':
        return '#ef4444';
      case 'orphan':
        return '#fbbf24';
      default:
        return '#60a5fa';
    }
  }, []);

  return (
    <ReactFlow
      nodes={nodesWithSelection}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      onEdgeClick={onEdgeClick}
      onPaneClick={onPaneClick}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      minZoom={0.1}
      maxZoom={2}
      defaultEdgeOptions={{
        type: 'actionEdge',
        animated: false
      }}
    >
      <Controls />
      <MiniMap
        nodeColor={nodeColor}
        nodeStrokeWidth={2}
        zoomable
        pannable
      />
      <Background variant="dots" gap={20} size={1} color="#2a2a4a" />
    </ReactFlow>
  );
}
