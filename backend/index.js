require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 👉 Create Database and Table if not exists
db.query("CREATE DATABASE IF NOT EXISTS smartqa", (err) => {
  if (err) return console.error("Error creating DB:", err);

  db.query("USE smartqa", (err) => {
    if (err) return console.error("Error selecting DB:", err);

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS qa (
        id INT AUTO_INCREMENT PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    db.query(createTableQuery, (err) => {
      if (err) console.error("Error creating table:", err);
      else console.log("✅ Database and table are ready.");
    });
  });
});

// POST /ask - Get answer from LLM
app.post("/ask", async (req, res) => {
  const { question } = req.body;

  const prompt = `Question: ${question}\nAnswer:`;

  try {
    const hfResponse = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
      }
    );

    let rawAnswer = hfResponse.data[0]?.generated_text || "No response";

    // Remove question from beginning if echoed
    const answer = rawAnswer.replace(prompt, "").trim();

    // Save to DB
    db.query(
      "INSERT INTO qa (question, answer) VALUES (?, ?)",
      [question, answer],
      (err) => {
        if (err) console.error("DB Error:", err);
      }
    );

    res.json({ answer });
  } catch (err) {
    console.error("Hugging Face error:", err.message);
    res.status(500).send("Error generating answer");
  }
});

// GET /history - Fetch past Q&A
app.get("/history", (req, res) => {
  db.query("SELECT * FROM qa ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error("DB Fetch Error:", err);
      res.status(500).json({ error: "Failed to fetch history" });
    } else {
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
