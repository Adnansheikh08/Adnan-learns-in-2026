"use client";

import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  Connection,
  Edge,
  Node,
  OnEdgesChange,
  OnNodesChange,
  NodeMouseHandler,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { Dispatch, SetStateAction, useCallback, useRef } from "react";

import { useFlowStore } from "@/store/useFlowStore";

import InputNode from "./CustomNodes/InputNode";
import ButtonNode from "./CustomNodes/ButtonNode";
import TextNode from "./CustomNodes/TextNode";
import DynamicNode from "./CustomNodes/DynamicNode";
import { useComponentStore } from "@/store/useComponentStore";
import ImageNode from "./CustomNodes/ImageNode";
import NavbarNode from "./CustomNodes/NavbarNode";
import HeroSectionNode from "./CustomNodes/HeroSection";
import CalendarNode from "./CustomNodes/CalendarNode";
import CheckboxNode from "./CustomNodes/CheckboxNode";

const nodeTypes = {
  input: InputNode,
  button: ButtonNode,
  text: TextNode,
  dynamic: DynamicNode,
  image: ImageNode,
  navbar: NavbarNode,
  hero: HeroSectionNode,
  calendar: CalendarNode,
  checkbox:CheckboxNode
};

type NodeData = Record<string, string>;
type FlowNode = Node<NodeData>;

type CanvasProps = {
  nodes: FlowNode[];
  edges: Edge[];
  setNodes: Dispatch<SetStateAction<FlowNode[]>>;
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  onNodesChange: OnNodesChange<FlowNode>;
  onEdgesChange: OnEdgesChange<Edge>;
};

export default function Canvas({
  nodes,
  edges,
  setNodes,
  setEdges,
  onNodesChange,
  onEdgesChange,
}: CanvasProps) {
  const { components } = useComponentStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { setSelectedNode } = useFlowStore();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick: NodeMouseHandler<FlowNode> = (_, node) => {
    setSelectedNode({ id: node.id });
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      const bounds = reactFlowWrapper.current?.getBoundingClientRect();

      const position = {
        x: event.clientX - (bounds?.left || 0),
        y: event.clientY - (bounds?.top || 0),
      };

      let nodeData: NodeData = {
        label: type,
      };

      let nodeType = type;

      if (type.startsWith("custom:")) {
        const compId = type.split(":")[1];
        const comp = components.find((c) => c.id === compId);

        if (!comp) return;

        nodeType = "dynamic";

        nodeData = {
          ...comp.defaultProps,
          code: comp.template,
          label: comp.name,
        };
      }

      const newNode: FlowNode = {
        id: crypto.randomUUID(),
        type: nodeType,
        position,
        data: nodeData,
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [components, setNodes],
  );

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div ref={reactFlowWrapper} className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}