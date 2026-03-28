"use client";

import { Handle, Position } from "@xyflow/react";

type DynamicData = Record<string, string | number | undefined>;

function renderTemplate(template: string, props: DynamicData) {
  let output = template;

  Object.keys(props || {}).forEach((key) => {
    output = output.replaceAll(`{{${key}}}`, String(props[key] ?? ""));
  });

  return output;
}

type DynamicNodeProps = {
  data: DynamicData;
};

export default function DynamicNode({ data }: DynamicNodeProps) {
  return (
    <div className="p-3 border rounded bg-white min-w-50">
      <Handle type="target" position={Position.Top} />

      <div
        dangerouslySetInnerHTML={{
          __html: renderTemplate(String(data.code ?? ""), data),
        }}
      />

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}