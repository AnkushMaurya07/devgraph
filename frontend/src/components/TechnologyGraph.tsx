import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useNavigate } from "react-router-dom";


interface TechnologyGraphProps {
  technology: string;
  projects: string[];
  relatedTechnologies: string[];
}

function TechnologyGraph({
  technology,
  projects,
  relatedTechnologies,
}: TechnologyGraphProps) {
    const navigate = useNavigate();
  const nodes: Node[] = [
    {
      id: "technology",
      position: { x: 350, y: 200 },
      data: {
        label: technology,
      },
      style: {
        background: "#0891b2",
        color: "white",
        border: "1px solid #22d3ee",
        borderRadius: "12px",
        padding: "12px 20px",
        fontWeight: 600,
      },
    },

    ...relatedTechnologies.map((name, index) => ({
      id: `related-${index}`,
      position: {
        x: 50 + index * 180,
        y: 50,
      },
      data: {
        label: name,
      },
      style: {
        background: "#0f172a",
        color: "#cbd5e1",
        border: "1px solid #334155",
        borderRadius: "10px",
        padding: "10px 16px",
      },
    })),

    ...projects.map((name, index) => ({
      id: `project-${index}`,
      position: {
        x: 50 + index * 180,
        y: 370,
      },
      data: {
        label: name,
      },
      style: {
        background: "#0f172a",
        color: "#cbd5e1",
        border: "1px solid #334155",
        borderRadius: "10px",
        padding: "10px 16px",
      },
    })),
  ];

  

  const edges: Edge[] = [
    ...relatedTechnologies.map((_, index) => ({
      id: `related-edge-${index}`,
      source: `related-${index}`,
      target: "technology",
      label: "USED_WITH",
      animated: true,
    })),

    ...projects.map((_, index) => ({
      id: `project-edge-${index}`,
      source: "technology",
      target: `project-${index}`,
      label: "USES",
      animated: true,
    })),
  ];

  return (
    <div className="mt-8 h-[520px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable
        onNodeClick={(_, node) => {
            if (node.id === "technology") {
            return;
            }

            if (node.id.startsWith("related-")) {
            const technologyName = String(node.data.label);

            navigate(
                `/technology/${encodeURIComponent(technologyName)}`
            );

            return;
            }

            if (node.id.startsWith("project-")) {
            const projectName = String(node.data.label);

            navigate(
                `/projects/${encodeURIComponent(projectName)}`
            );
            }
        }}
        >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default TechnologyGraph;