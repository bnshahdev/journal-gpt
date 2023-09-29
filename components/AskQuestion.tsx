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
    const ans = await askQuestion(value);
    console.log("answer", ans);

    // isLoading(false);
    // setAnswer(ans);
  };

  return (
    <div className="rounded-lg overflow-hidden shadow divide-y p-4">
      <form onSubmit={onSubmit}>
        <input
          disabled={loading}
          onChange={onChange}
          value={value}
          type="text"
          placeholder="Ask a question?"
          className="border px-6 py-2"
        />
        <button disabled={loading} className="rounded-lg bg-blue-400 p-4 px-4">
          Ask
        </button>
      </form>
      {loading && <div>Loading...</div>}
      {answer && <div>{answer}</div>}
    </div>
  );
};

export default AskQuestion;
