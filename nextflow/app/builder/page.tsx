"use client";
import Canvas from "@/components/Canvas";
import PropertiesPanel from "@/components/PropertiesPanel";
import Sidebar from "@/components/Sidebar";
import { useEdgesState, useNodesState } from "@xyflow/react";

export default function BuilderPage() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <div className="h-screen flex">
      <div className="w-64 bg-gray-100 p-4">
        <Sidebar/>
      </div>

      <div className="flex-1">
        <Canvas
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
          setEdges={setEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
        />
      </div>

      <div className="w-72 bg-gray-100 p-4">
        <PropertiesPanel nodes={nodes} setNodes={setNodes}/>
      </div>
    </div>
  );
}