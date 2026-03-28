"use client";

import { useState } from "react";

export default function CheckboxNode({ data }: any) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="bg-white p-3 rounded shadow w-40">
      <label className="flex items-center gap-2 text-sm text-black">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="w-4 h-4"
        />
        {data?.label || "Checkbox"}
      </label>
    </div>
  );
}