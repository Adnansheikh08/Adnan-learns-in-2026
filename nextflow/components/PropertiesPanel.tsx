"use client";

import { useEffect } from "react";
import { useComponentStore } from "@/store/useComponentStore";
import { useFlowStore } from "@/store/useFlowStore";

type FlowNode = {
  id: string;
  type: string;
  data: Record<string, string>;
};

type PropertiesPanelProps = {
  nodes: FlowNode[];
  setNodes: (updater: (nodes: FlowNode[]) => FlowNode[]) => void;
};

const buildDefaultTemplate = (node: FlowNode) => {
  switch (node.type) {
    case "text":
      return `<p>{{label}}</p>`;
    case "button":
      return `<button style="background-color: {{bgColor}}; color: white; padding: 8px 12px; border: none; border-radius: 6px;">{{label}}</button>`;
    case "image":
      return `<img src="{{src}}" alt="{{label}}" style="max-width: 100%; border-radius: 8px;" />`;
    case "navbar":
      return `<nav style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #111827; color: #fff; border-radius: 8px;">
  <strong>{{logo}}</strong>
  <div style="display: flex; gap: 12px;">
    <span>Home</span>
    <span>About</span>
    <span>Contact</span>
  </div>
</nav>`;
    case "hero":
      return `<section style="padding: 24px; border-radius: 10px; background: linear-gradient(90deg, #2563eb, #06b6d4); color: #fff;">
  <h1 style="margin: 0 0 8px 0;">{{title}}</h1>
  <p style="margin: 0 0 12px 0;">{{desc}}</p>
  <button style="padding: 8px 12px; background: #fff; color: #111827; border: none; border-radius: 6px;">Get Started</button>
</section>`;
    case "calendar":
      return `<input type="date" value="{{date}}" style="border: 1px solid #d1d5db; padding: 8px; border-radius: 6px;" />`;
    case "dynamic":
      return `<div>Custom component</div>`;
    default:
      return `<div>{{label}}</div>`;
  }
};

export default function PropertiesPanel({ nodes, setNodes }: PropertiesPanelProps) {
  const { selectedNode } = useFlowStore();
  const { addComponent } = useComponentStore();

  const currentNode = nodes.find((n) => n.id === selectedNode?.id);

  useEffect(() => {
    if (!currentNode || currentNode.data?.code) return;

    const template = buildDefaultTemplate(currentNode);

    setNodes((nds) =>
      nds.map((node) =>
        node.id === currentNode.id
          ? {
              ...node,
              data: {
                ...node.data,
                code: template,
              },
            }
          : node,
      ),
    );
  }, [currentNode, setNodes]);

  if (!currentNode) {
    return <div>Select a node</div>;
  }

  const type = currentNode.type;

  // 🔧 UPDATE FUNCTION
  const updateNode = (key: string, value: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === currentNode.id
          ? {
              ...node,
              data: { ...node.data, [key]: value },
            }
          : node,
      ),
    );
  };

  // 🗑️ DELETE NODE
  const deleteNode = () => {
    setNodes((nds) => nds.filter((node) => node.id !== currentNode.id));
  };

  const saveAsComponent = () => {
    const template = currentNode?.data?.code || buildDefaultTemplate(currentNode);

    const defaultProps = Object.fromEntries(
      Object.entries(currentNode.data || {}).filter(([key]) => key !== "code"),
    );

    addComponent({
      id: crypto.randomUUID(),
      name: currentNode.data.label || currentNode.type || "Custom",
      template,
      defaultProps,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Properties</h2>

      {/* ================= TEXT ================= */}
      {type === "text" && (
        <div>
          <label className="text-sm">Text</label>
          <input
            value={currentNode.data.label || ""}
            onChange={(e) => updateNode("label", e.target.value)}
            className="border p-2 w-full mt-1"
          />
        </div>
      )}

      {/* ================= BUTTON ================= */}
      {type === "button" && (
        <>
          <div>
            <label className="text-sm">Button Text</label>
            <input
              value={currentNode.data.label || ""}
              onChange={(e) => updateNode("label", e.target.value)}
              className="border p-2 w-full mt-1"
            />
          </div>

          <div>
            <label className="text-sm">Background Color</label>
            <input
              type="color"
              value={currentNode.data.bgColor || "#3b82f6"}
              onChange={(e) => updateNode("bgColor", e.target.value)}
              className="w-full mt-1"
            />
          </div>
        </>
      )}

      {/* ================= IMAGE ================= */}
      {type === "image" && (
        <div>
          <label className="text-sm">Image URL</label>
          <input
            value={currentNode.data.src || ""}
            onChange={(e) => updateNode("src", e.target.value)}
            className="border p-2 w-full mt-1"
          />
        </div>
      )}

      {/* ================= NAVBAR ================= */}
      {type === "navbar" && (
        <div>
          <label className="text-sm">Logo Text</label>
          <input
            value={currentNode.data.logo || "MyBrand"}
            onChange={(e) => updateNode("logo", e.target.value)}
            className="border p-2 w-full mt-1"
          />
        </div>
      )}

      {/* ================= HERO ================= */}
      {type === "hero" && (
        <>
          <div>
            <label className="text-sm">Title</label>
            <input
              value={currentNode.data.title || ""}
              onChange={(e) => updateNode("title", e.target.value)}
              className="border p-2 w-full mt-1"
            />
          </div>

          <div>
            <label className="text-sm">Description</label>
            <input
              value={currentNode.data.desc || ""}
              onChange={(e) => updateNode("desc", e.target.value)}
              className="border p-2 w-full mt-1"
            />
          </div>
        </>
      )}

      {/* ================= CALENDAR ================= */}
      {type === "calendar" && (
        <div>
          <label className="text-sm">Default Date</label>
          <input
            type="date"
            value={currentNode.data.date || ""}
            onChange={(e) => updateNode("date", e.target.value)}
            className="border p-2 w-full mt-1"
          />
        </div>
      )}

      {/* ================= DYNAMIC ================= */}
      {type === "dynamic" && (
        <>
          <div>
            <h3 className="text-sm font-medium mt-2">Props</h3>

            {Object.keys(currentNode.data || {}).map((key) => {
              if (["code"].includes(key)) return null;

              return (
                <div key={key}>
                  <label className="text-sm">{key}</label>
                  <input
                    value={String(currentNode.data[key] ?? "")}
                    onChange={(e) => updateNode(key, e.target.value)}
                    className="border p-2 w-full mt-1"
                  />
                </div>
              );
            })}
          </div>
        </>
      )}

      <div>
        <label className="text-sm">Component Code</label>
        <textarea
          className="border p-2 w-full mt-1 h-40 font-mono text-xs"
          value={currentNode?.data?.code ?? ""}
          onChange={(e) => updateNode("code", e.target.value)}
          placeholder="Write HTML template with placeholders like {{label}}"
        />
      </div>

      {/* ================= DELETE ================= */}
      <button
        onClick={deleteNode}
        className="w-full bg-red-500 py-2 rounded"
      >
        Delete Node
      </button>

      <button
        className="w-full bg-blue-500 py-2 rounded"
        onClick={saveAsComponent}
      >
        Save as Component
      </button>
    </div>
  );
}
