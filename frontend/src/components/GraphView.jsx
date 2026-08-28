import { useMemo, useState } from "react";

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

function GraphNode({ data }) {
  const nodeClass = [
    "graph-node",
    `graph-node-${data.type.toLowerCase()}`,
    data.isSelected ? "graph-node-selected" : "",
    data.isConnected ? "graph-node-connected" : "",
    data.isDimmed ? "graph-node-dimmed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={nodeClass}>
      <Handle type="target" position={Position.Left} />

      <div className="graph-node-type">{data.type}</div>

      <div className="graph-node-label">{data.label}</div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
}

function GraphView({ connections, onTechnologyClick }) {
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const { nodes, edges } = useMemo(() => {
    if (!connections || connections.length === 0) {
      return {
        nodes: [],
        edges: [],
      };
    }

    const nodeMap = new Map();

    connections.forEach((connection) => {
      const sourceId = `${connection.sourceType}-${connection.sourceName}`;
      const targetId = `${connection.targetType}-${connection.targetName}`;

      if (!nodeMap.has(sourceId)) {
        nodeMap.set(sourceId, {
          id: sourceId,
          type: "graphNode",
          position: {
            x: 0,
            y: 0,
          },
          data: {
            label: connection.sourceLabel,
            type: connection.sourceType,
          },
        });
      }

      if (!nodeMap.has(targetId)) {
        nodeMap.set(targetId, {
          id: targetId,
          type: "graphNode",
          position: {
            x: 0,
            y: 0,
          },
          data: {
            label: connection.targetLabel,
            type: connection.targetType,
          },
        });
      }
    });

    const nodesArray = Array.from(nodeMap.values());

    const sourceNode = nodesArray[0];
    const targetNodes = nodesArray.slice(1);

    if (sourceNode) {
      sourceNode.position = {
        x: 80,
        y: 220,
      };
    }

    const rowHeight = 110;

    targetNodes.forEach((node, index) => {
      const column = Math.floor(index / 5);
      const row = index % 5;

      node.position = {
        x: 430 + column * 280,
        y: 80 + row * rowHeight,
      };
    });

    const edgesArray = connections.map((connection, index) => {
      const sourceId = `${connection.sourceType}-${connection.sourceName}`;
      const targetId = `${connection.targetType}-${connection.targetName}`;

      return {
        id: `edge-${index}`,
        source: sourceId,
        target: targetId,
        label: connection.relationshipType,
        animated: connection.targetType === "Technology",
        markerEnd: {
          type: "arrowclosed",
        },
      };
    });

    return {
      nodes: nodesArray,
      edges: edgesArray,
    };
  }, [connections]);

  const interactiveNodes = useMemo(() => {
    if (!selectedNodeId) {
      return nodes;
    }

    const connectedNodeIds = new Set();

    edges.forEach((edge) => {
      if (edge.source === selectedNodeId) {
        connectedNodeIds.add(edge.target);
      }

      if (edge.target === selectedNodeId) {
        connectedNodeIds.add(edge.source);
      }
    });

    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        isSelected: node.id === selectedNodeId,
        isConnected: connectedNodeIds.has(node.id),
        isDimmed: node.id !== selectedNodeId && !connectedNodeIds.has(node.id),
      },
    }));
  }, [nodes, edges, selectedNodeId]);

  const interactiveEdges = useMemo(() => {
    if (!selectedNodeId) {
      return edges;
    }

    return edges.map((edge) => {
      const isConnected =
        edge.source === selectedNodeId || edge.target === selectedNodeId;

      return {
        ...edge,
        animated: isConnected || edge.animated,
        style: {
          opacity: isConnected ? 1 : 0.25,
          strokeWidth: isConnected ? 2.5 : 1,
        },
        labelStyle: {
          opacity: isConnected ? 1 : 0.35,
        },
      };
    });
  }, [edges, selectedNodeId]);

  if (!connections || connections.length === 0) {
    return <div className="empty-state">No graph relationships found.</div>;
  }

  function handleNodeClick(_, node) {
    setSelectedNodeId(node.id);

    if (node.data.type === "Technology") {
      onTechnologyClick(node.data.label);
    }
  }

  return (
    <div className="graph-container">
      <ReactFlow
        nodes={interactiveNodes}
        edges={interactiveEdges}
        nodeTypes={{
          graphNode: GraphNode,
        }}
        fitView
        attributionPosition="bottom-left"
        onNodeClick={handleNodeClick}
        onPaneClick={() => setSelectedNodeId(null)}
      >
        <Background />

        <Controls showInteractive />

        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default GraphView;
