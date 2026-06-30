import { useState, useEffect, useRef } from "react";
import "./App.css";
import { generatePlan } from "./api";

export default function App() {
  const [started, setStarted] = useState(false);

  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [typed, setTyped] = useState("");

  const [score, setScore] = useState(0);
  const [chips, setChips] = useState([]);

  const resultRef = useRef(null);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

  const handleGenerate = async () => {
    if (!task) return;

    setLoading(true);
    setResult("");
    setTyped("");

    const res = await generatePlan(task, deadline, priority);

    const calculated =
      (priority === "high" ? 75 : priority === "medium" ? 55 : 40) +
      (task.length > 20 ? 10 : 0);

    setScore(Math.min(calculated, 100));

    setChips([
      priority === "high" ? "🔥 High urgency detected" : "Normal priority",
      task.length > 20 ? "🧠 Complex task" : "⚡ Simple task",
      "🎯 Focus mode recommended",
    ]);

    // typing animation
    let i = 0;
    const interval = setInterval(() => {
      setTyped(res.slice(0, i));
      i++;
      if (i > res.length) {
        clearInterval(interval);
        setResult(res);
      }
    }, 10);

    setLoading(false);
  };

  const Circle = ({ value }) => {
    const r = 52;
    const c = 2 * Math.PI * r;
    const offset = c - (value / 100) * c;

    return (
      <svg width="130" height="130">
        <circle cx="65" cy="65" r={r} stroke="#222" strokeWidth="10" fill="none" />
        <circle
          cx="65"
          cy="65"
          r={r}
          stroke="#22d3ee"
          strokeWidth="10"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "0.8s" }}
        />
        <text x="50%" y="50%" textAnchor="middle" dy="8" fill="white">
          {value}%
        </text>
      </svg>
    );
  };

  // ---------------- LANDING PAGE ----------------
  if (!started) {
    return (
      <div className="hero">
        <div className="bg-blobs">
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
        </div>

        <h1 className="glow-title">AheadAI ⚡</h1>

        <h2 className="tagline">“Your brain is not slow. Your system is.”</h2>

        <p className="subtext">
          Turn chaos into clarity. Break tasks, structure time, and actually finish things.
        </p>

        <button className="start-btn" onClick={() => setStarted(true)}>
          Get Started
        </button>
      </div>
    );
  }

  // ---------------- MAIN APP ----------------
  return (
    <div className="page">

      <h1 className="title">AheadAI ⚡</h1>

      <div className="card">

        <input
          placeholder="Enter your task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">Select Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <button onClick={handleGenerate}>
          Generate AI Plan
        </button>

        {loading && (
          <p className="thinking">🧠 AI is thinking...</p>
        )}
      </div>

      {/* RESULT */}
      {result && (
        <div className="result-card" ref={resultRef}>
          <h3>📊 AI Productivity Plan</h3>
          <pre>{typed}</pre>
        </div>
      )}

      {/* SCORE */}
      {score > 0 && (
        <div className="score-card">
          <h3>📊 Score</h3>
          <Circle value={score} />
        </div>
      )}

      {/* CHIPS */}
      {chips.length > 0 && (
        <div className="chips">
          {chips.map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
      )}
    </div>
  );
}