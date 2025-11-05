import React, { useState } from "react";
import { askRAG } from "../../services/ragAPI";
import "./NewsLetter.css";

const NewsLetter = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    const response = await askRAG(question);
    setAnswer(response);
    setLoading(false);
  };

  return (
    <div className="newsletter">
      <h1>Need Help? Ask Our Assistant</h1>
      <p>Ask anything about our products, delivery, or policies below 👇</p>

      <form onSubmit={handleSubmit} className="chat-box">
        <input
          type="text"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>

      {answer && (
        <div className="answer-card">
          <div className="question">🧠 <strong>You:</strong> {question}</div>
          <div className="answer">💬 <strong>Assistant:</strong> {answer}</div>
        </div>
      )}
    </div>
  );
};

export default NewsLetter;
