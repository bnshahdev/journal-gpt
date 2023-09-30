"use client";

import { askQuestion } from "@/utils/api";
import { useState } from "react";

const AskQuestion = () => {
  const [value, setValue] = useState();

  const [loading, isLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    isLoading(true);
    const { data } = await askQuestion(value);
    console.log("answer", data);

    isLoading(false);
    setAnswer(data);
  };

  return (
    <div className="rounded-lg overflow-hidden shadow divide-y p-4">
      <form onSubmit={onSubmit}>
        <input
          disabled={loading}
          onChange={onChange}
          value={value}
          type="text"
          placeholder="Ask AI?"
          className="border px-6 py-2 mr-2"
        />
        <button disabled={loading} className="rounded-lg bg-blue-400 py-2 px-6">
          Ask
        </button>
      </form>
      {loading && <div>Loading...</div>}
      {answer && (
        <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow p-2 my-2 w-80">
          {answer}
        </div>
      )}
    </div>
  );
};

export default AskQuestion;
