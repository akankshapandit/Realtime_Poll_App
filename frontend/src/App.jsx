import React from "react";
import { Routes, Route } from "react-router-dom";

import CreatePoll from "./components/CreatePoll.jsx";
import PollPage from "./components/PollPage.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-blue-600 text-white py-4 text-center font-bold text-xl shadow">
        Real-Time Poll App
      </header>

      {/* Main */}
      <main className="p-4">
        <Routes>
          <Route path="/" element={<CreatePoll />} />
          <Route path="/poll/:id" element={<PollPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4">
        Built by Akanksha • 2026
      </footer>

    </div>
  );
}

export default App;
