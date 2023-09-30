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
    setInterval: 20000,
    onSave: async (_value) => {
      if (_value === entry.content) return;

      setLoading(true);
      const data = await updateEntry(entry.id, _value);

      setAnalysis(data.analysis);
      setLoading(false);
    },
  });

  return (
    <div className="w-full h-full flex flex-row justify-around">
      <div className="h-full flex-grow-0 w-1/2">
        {loading && <div>Saving...</div>}

        <textarea
          className="w-full h-full p-8 text-xl outline-none"
          value={value}
          placeholder="Type note here.."
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>

      <div className="border-l-white">
        <div className="mx-5 flex flex-col justify-end">
          <h2 className="text-3xl border-b m-10">Summary</h2>
          <div>
            <ul>
              <li>
                <span className="text-xl font-semibold">{subject}</span>
              </li>
              <li>
                <span className="text-lg">{summary}</span>
              </li>
              {/* <li>
                <span className="text-lg">{negative}</span>
              </li> */}
              <li>
                <br />
                {mood && "Your mood likely to be -"}{" "}
                <span className="text-lg">{mood}</span>
              </li>
              {/* {analysisData.map((data) => {
                return (
                  <li key={data.title} className="flex justify-between">
                    <span className="text-lg font-semibold">{data.title}</span>
                    <br />
                    <span>{data.value}</span>
                  </li>
                );
              })} */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
