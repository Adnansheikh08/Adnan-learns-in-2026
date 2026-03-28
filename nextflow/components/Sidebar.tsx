"use client";

import { useState } from "react";
import { useComponentStore } from "@/store/useComponentStore";
import FileTree from "../components/FileTree";

const fileTree = [
  {
    name: "NEXTFLOW",
    type: "folder",
    children: [
      { name: ".next", type: "folder", children: [] },
      { name: "app", type: "folder", children: [] },
      { name: "components", type: "folder", children: [] },
      { name: "node_modules", type: "folder", children: [] },
      { name: "public", type: "folder", children: [] },
      {
        name: "store",
        type: "folder",
        children: [
          { name: "useComponentStore.ts", type: "file" },
          { name: "useFlowStore.ts", type: "file" },
        ],
      },
      { name: "package.json", type: "file" },
      { name: "tsconfig.json", type: "file" },
    ],
  },
];


  const componentCategories = [
  {
    category: "Basic",
    items: [
      { type: "text", label: "Text", icon: "📝" },
      { type: "heading", label: "Heading", icon: "🔠" },
      { type: "paragraph", label: "Paragraph", icon: "📄" },
      { type: "button", label: "Button", icon: "🔘" },
      { type: "link", label: "Link", icon: "🔗" },
      { type: "image", label: "Image", icon: "🖼️" },
      { type: "icon", label: "Icon", icon: "⭐" },
    ],
  },
  {
    category: "Layout",
    items: [
      { type: "container", label: "Container", icon: "📦" },
      { type: "section", label: "Section", icon: "📐" },
      { type: "div", label: "Div", icon: "⬛" },
      { type: "grid", label: "Grid", icon: "🔲" },
      { type: "flex", label: "Flex", icon: "↔️" },
      { type: "navbar", label: "Navbar", icon: "📌" },
      { type: "footer", label: "Footer", icon: "📍" },
      { type: "hero", label: "Hero", icon: "🔥" },
    ],
  },
  {
    category: "Forms",
    items: [
      { type: "input", label: "Input", icon: "⌨️" },
      { type: "textarea", label: "Textarea", icon: "🧾" },
      { type: "select", label: "Select", icon: "⬇️" },
      { type: "checkbox", label: "Checkbox", icon: "☑️" },
      { type: "radio", label: "Radio", icon: "🔘" },
      { type: "form", label: "Form", icon: "📋" },
      { type: "label", label: "Label", icon: "🏷️" },
      { type: "calendar", label: "Calendar", icon: "📅" },
    ],
  },
  {
    category: "Media",
    items: [
      { type: "video", label: "Video", icon: "🎥" },
      { type: "audio", label: "Audio", icon: "🎵" },
      { type: "gallery", label: "Gallery", icon: "🖼️" },
      { type: "carousel", label: "Carousel", icon: "🎞️" },
    ],
  },
  {
    category: "Advanced",
    items: [
      { type: "card", label: "Card", icon: "🃏" },
      { type: "modal", label: "Modal", icon: "🪟" },
      { type: "tabs", label: "Tabs", icon: "📑" },
      { type: "accordion", label: "Accordion", icon: "📚" },
      { type: "table", label: "Table", icon: "📊" },
      { type: "dynamic", label: "Custom", icon: "⚡" },
    ],
  },
];

export default function Sidebar() {
  const { components } = useComponentStore();
  const [activeTab, setActiveTab] = useState("Basic");

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const activeCategory = componentCategories.find(
    (group) => group.category === activeTab,
  );

  return (
    <aside className="w-72 h-full bg-[#0f172a] p-4 flex flex-col text-white">


      <FileTree data={fileTree} />
      {/* Header */}
      <h1 className="text-xl font-bold mb-4 mt-60">🧠 Builder</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {componentCategories.map((group) => (
          <button
            key={group.category}
            onClick={() => setActiveTab(group.category)}
            className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition
              ${
                activeTab === group.category
                  ? "bg-blue-500"
                  : "bg-[#1e293b] hover:bg-[#334155]"
              }`}
          >
            {group.category}
          </button>
        ))}
      </div>

      {/* Components Grid */}
      <div className="flex flex-wrap gap-3">
        {activeCategory?.items.map((comp) => (
          <div
            key={comp.type}
            draggable
            onDragStart={(e) => onDragStart(e, comp.type)}
            className="w-[70px] h-[70px] bg-[#ba1f3e] hover:bg-[#334155] 
                 transition rounded-lg cursor-grab 
                 flex flex-col items-center justify-center 
                 text-center p-2 
                 hover:scale-105 active:scale-95 text-white"
          >
            <div className="text-xl">{comp.icon}</div>

            <div className="text-[10px] mt-1 leading-tight text-black">
              {comp.label}
            </div>
          </div>
        ))}
      </div>
      {/* Saved Components */}
      <h2 className="text-xs uppercase text-gray-400 mt-6 mb-2 tracking-wider">
        Saved Components
      </h2>

      {components.length === 0 && (
        <p className="text-xs text-gray-500">No saved components</p>
      )}

      <div className="flex flex-col gap-2">
        {components.map((comp) => (
          <div
            key={comp.id}
            draggable
            onDragStart={(e) => onDragStart(e, "custom:" + comp.id)}
            className="bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded cursor-grab text-sm"
          >
            {comp.name}
          </div>
        ))}
      </div>
    </aside>
  );
}
