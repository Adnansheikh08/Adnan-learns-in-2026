import { Handle, Position } from "@xyflow/react";

type NodeData = {
  label?: string;
  bgColor?: string;
  fontSize?: number;
};

type TextNodeProps = {
  data: NodeData;
};

export default function TextNode({ data }: TextNodeProps) {
  return (
    <div
      className="p-3 rounded shadow border w-40"
      style={{
        backgroundColor: data.bgColor || "#fff",
        fontSize: data.fontSize || 14,
      }}
    >
      <Handle type="target" position={Position.Top} />

      {data.label}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}