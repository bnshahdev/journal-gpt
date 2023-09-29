"use client";

import { aiAnalyze } from "@/utils/ai";
import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { Autosave, useAutosave } from "react-autosave";

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry?.analysis);

  const { subject, summary, mood, negative } = analysis || {};
  const analysisData = [
    { title: "Subject", value: subject },
    { title: "Summary", value: summary },
    { title: "Mood", value: mood },
    { title: "Negative", value: negative ? "Yes" : "No" },
  ];

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setLoading(true);
      const data = await updateEntry(entry.id, _value);

      setAnalysis(data.analysis);
      setLoading(false);
    },
  });

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        <textarea
          className="w-full h-full p-8 text-xl bg-black outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
        {loading && <div>Saving...</div>}
      </div>

      <div className="border-l-white">
        <div className="p-10 bg-blue-300">
          <h2 className="text-2xl border-b m-5">Analysis</h2>
          <div>
            <ul>
              {analysisData.map((data) => {
                return (
                  <li key={data.id} className="flex justify-between">
                    <span className="text-lg font-semibold">{data.title}</span>
                    <br />
                    <span>{data.value}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
