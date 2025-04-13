/* eslint-disable no-unused-vars */
// src/components/QuestionForm.jsx
import { useState, useEffect } from "react";
import api from "../api";

const QuestionForm = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnswer("Thinking...");

    try {
      const res = await api.post("/ask", { question });
      setAnswer(res.data.answer);
      setQuestion("");
      fetchHistory(); // Refresh history after submission
    } catch (err) {
      setAnswer("Error getting answer");
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await api.get("/history");
      setHistory(res.data);
    } catch (err) {
      console.error("Could not fetch history");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <button type="submit">Ask</button>
      </form>

      <div className="answer">
        <h3>Answer:</h3>
        <p>{answer}</p>
      </div>

      <div className="history">
        <h3>Previous Questions</h3>
        {history.map((item) => (
          <div key={item.id} className="qa">
            <strong>Q:</strong> {item.question} <br />
            <strong>A:</strong> {item.answer}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionForm;
