import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";

import api from "../services/api";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function PollPage() {
  const { id } = useParams();
  console.log("Poll ID:", id);


  const [poll, setPoll] = useState(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    fetchPoll();

    socket.emit("joinPoll", id);

    socket.on("updateResults", (data) => {
      setPoll(data);
    });

    return () => {
      socket.off("updateResults");
    };
  }, []);

  const fetchPoll = async () => {
    try {
      const res = await api.get(`/poll/${id}`);
      setPoll(res.data);

      if (localStorage.getItem(`voted_${id}`)) {
        setVoted(true);
      }
    } catch {
      alert("Poll not found");
    }
  };

  const vote = async (index) => {
    if (voted) return;

    try {
      const res = await api.post(`/poll/vote/${id}`, {
        optionIndex: index,
      });

      socket.emit("vote", id, res.data);

      localStorage.setItem(`voted_${id}`, true);

      setVoted(true);
    } catch {
      alert("You already voted");
    }
  };

  if (!poll) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Loading poll...
      </p>
    );
  }

  const totalVotes = poll.options.reduce(
    (sum, o) => sum + o.votes,
    0
  );

  return (
    <div className="flex justify-center mt-10">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-xl font-bold text-center mb-6">
          {poll.question}
        </h2>

        {poll.options.map((opt, i) => {
          const percent =
            totalVotes === 0
              ? 0
              : Math.round((opt.votes / totalVotes) * 100);

          return (
            <div key={i} className="mb-4">

              <button
                onClick={() => vote(i)}
                disabled={voted}
                className={`w-full p-2 rounded border text-left
                ${
                  voted
                    ? "bg-gray-100"
                    : "hover:bg-blue-50"
                }`}
              >
                {opt.text}
              </button>

              <div className="text-sm text-gray-600 mt-1">
                {opt.votes} votes ({percent}%)
              </div>

              <div className="w-full bg-gray-200 h-2 rounded mt-1">
                <div
                  className="bg-blue-500 h-2 rounded"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

            </div>
          );
        })}

        {voted && (
          <p className="text-center text-green-600 mt-4">
            Thanks for voting!
          </p>
        )}

      </div>
    </div>
  );
}

export default PollPage;
