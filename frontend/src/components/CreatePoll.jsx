import { useState } from "react";
import api from "../services/api";
import React from "react";

function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [link, setLink] = useState("");

  const addOption = () => {
    setOptions([...options, ""]);
  };

const createPoll = async () => {
  if (!question.trim()) {
    alert("Enter question");
    return;
  }

  if (options.some((o) => !o.trim())) {
    alert("Fill all options");
    return;
  }

  try {
   const res = await api.post("/poll/create", {
      question,
      options,
    });

    const id = res.data.id;

    // ✅ Build link properly
    setLink(`${window.location.origin}/poll/${id}`);

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};




  return (
    <div className="flex justify-center mt-10">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create a Poll
        </h2>

        <input
          className="w-full border rounded p-2 mb-4 focus:ring focus:ring-blue-200"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        {options.map((opt, i) => (
          <input
            key={i}
            className="w-full border rounded p-2 mb-3 focus:ring focus:ring-blue-200"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => {
              const arr = [...options];
              arr[i] = e.target.value;
              setOptions(arr);
            }}
          />
        ))}

        <div className="flex gap-3 mb-4">

          <button
            onClick={addOption}
            className="flex-1 bg-gray-200 py-2 rounded hover:bg-gray-300"
          >
            Add Option
          </button>

          <button
            onClick={createPoll}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Create
          </button>

        </div>

        {link && (
          <div className="bg-green-100 p-3 rounded text-sm break-all">

            <p className="font-semibold mb-1">
              Share this link:
            </p>

            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              {link}
            </a>

          </div>
        )}

      </div>
    </div>
  );
}

export default CreatePoll;
