"use client";

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { Autosave, useAutosave } from "react-autosave";

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [loading, setLoading] = useState(false);

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setLoading(true);
      updateEntry(entry.id, _value);
      setLoading(false);
    },
  });

  return (
    <div className="w-full h-full">
      <textarea
        className="w-full h-full p-8 text-xl bg-black outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      {loading && <div>Saving...</div>}
    </div>
  );
};

export default Editor;
