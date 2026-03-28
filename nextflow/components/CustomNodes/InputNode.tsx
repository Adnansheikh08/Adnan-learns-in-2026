import { Handle, Position } from "@xyflow/react";

type InputData = {
  label?: string;
};

type InputNodeProps = {
  data: InputData;
};

export default function InputNode({ data }: InputNodeProps) {
  return (
    <div className="p-3 rounded shadow border w-48 bg-white">
      <Handle type="target" position={Position.Top} />
      <input
        className="w-full border rounded px-2 py-1 text-sm"
        placeholder={data.label || "Type here"}
      />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}