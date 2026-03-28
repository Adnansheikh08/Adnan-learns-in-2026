"use client";

import { useState } from "react";

export default function FileTree({ data }: any) {
    
  return (
    <div className="text-sm">
      {data.map((item: any, index: number) => (
        <TreeNode key={index} node={item} />
      ))}
    </div>
  );
}

function TreeNode({ node }: any) {
  const [open, setOpen] = useState(true);

  if (node.type === "folder") {
    return (
      <div className="ml-2">
        <div
          onClick={() => setOpen(!open)}
          className="cursor-pointer text-gray-300 hover:text-white"
        >
          📁 {node.name}
        </div>

        {open && (
          <div className="ml-4">
            {node.children.map((child: any, i: number) => (
              <TreeNode key={i} node={child} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="ml-6 text-gray-400 hover:text-white cursor-pointer">
      📄 {node.name}
    </div>
  );
}