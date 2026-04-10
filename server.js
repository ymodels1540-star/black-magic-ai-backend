const express = require("express");
const cors = require("cors");

const app = express();

// FIXED FOR RAILWAY
const PORT = process.env.PORT || 3000;

// YOUR WORKING API KEY FOR CHATBOX
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
    return res.status(401).json({
      success: false,
      error: "Missing API key"
    });
  }

  if (apiKey !== CHATBOX_API_KEY) {
    return res.status(403).json({
      success: false,
      error: "Invalid API key"
    });
  }

  if (!message) {
    return res.status(400).json({
      success: false,
      error: "Message is required"
    });
  }

  let reply = "";
  const lower = message.toLowerCase();

  if (lower.includes("hello") || lower.includes("hi")) {
    reply = "Hello, welcome to your chatbox API.";
  } else if (lower.includes("name")) {
    reply = "I am your custom Node.js chat API.";
  } else if (lower.includes("help")) {
    reply = "Send any message to test the API connection.";
  } else if (lower.includes("film")) {
    reply = "Your film platform can connect here and process chat requests securely.";
  } else if (lower.includes("shaka zulu")) {
    reply = "Shaka Zulu was a powerful king of the Zulu Kingdom and one of the greatest military leaders in African history.";
  } else {
    reply = `I understand: ${message}`;
  }

  return res.json({
    success: true,
    reply,
    apiKeyValid: true
  });
});

// MUST use dynamic PORT for Railway
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
