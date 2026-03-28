import { Handle, Position } from "@xyflow/react";

type NodeData = {
  label?: string;
  bgColor?: string;
  fontSize?: number;
};

type ButtonNodeProps = {
  data: NodeData;
};

export default function ButtonNode({ data }: ButtonNodeProps) {
  return (
    <div
      className="p-3 rounded shadow border w-40 text-center"
      style={{
        backgroundColor: data.bgColor || "#fff",
        fontSize: data.fontSize || 14,
      }}
    >
      <Handle type="target" position={Position.Top} />

      <button className="bg-black text-white px-3 py-1 rounded w-full">
        {data.label}
      </button>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}