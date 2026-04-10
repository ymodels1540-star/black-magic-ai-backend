const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const CHATBOX_API_KEY = "chat_sk_amabhozza_7f92c1d8e4b6x901";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Chat API is running",
    apiKeyHeader: "x-api-key",
    endpoint: "/api/chat"
  });
});

app.post("/api/chat", (req, res) => {
  const apiKey = req.headers["x-api-key"];
  const message = req.body?.message?.trim();

  if (!apiKey) {
    return res.status(401).json({ success: false, error: "Missing API key" });
  }

  if (apiKey !== CHATBOX_API_KEY) {
    return res.status(403).json({ success: false, error: "Invalid API key" });
  }

  if (!message) {
    return res.status(400).json({ success: false, error: "Message is required" });
  }

  const lower = message.toLowerCase();
  let reply = "";

  if (lower === "hi" || lower === "hello") {
    reply = "Hello, welcome to Black Magic AI.";
  } else if (lower.includes("how are you")) {
    reply = "I am well and ready to help you.";
  } else if (lower.includes("what is your name")) {
    reply = "My name is Black Magic AI.";
  } else if (lower.includes("who is shaka zulu")) {
    reply = "Shaka Zulu was a powerful king of the Zulu Kingdom and one of the most influential military leaders in African history.";
  } else if (lower.includes("cat")) {
    reply = "A cat is a small domesticated animal often kept as a pet. Cats are known for being agile, curious, and independent.";
  } else if (lower.includes("dog")) {
    reply = "A dog is a loyal domesticated animal commonly kept as a pet, companion, or working animal.";
  } else if (lower.includes("south africa")) {
    reply = "South Africa is a country at the southern tip of Africa, known for its diverse cultures, languages, and history.";
  } else {
    reply = "I received your message, but I need more built-in knowledge or a real AI API connection to answer it properly.";
  }

  return res.json({
    success: true,
    reply
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
