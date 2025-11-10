import express from "express";
import { generateText } from "../lib/ollama/ollama.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { prompt, conversationHistory } = req.body;
  if (!prompt) return res.status(400).json({ error: "Missing prompt" });

  try {
    // Build context from conversation history
    let contextPrompt = prompt;
    if (conversationHistory && Array.isArray(conversationHistory)) {
      const history = conversationHistory
        .slice(-5) // Only use last 5 messages for context
        .map(
          (msg) =>
            `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`,
        )
        .join("\n");

      if (history) {
        contextPrompt = `${history}\nUser: ${prompt}\nAssistant:`;
      }
    }

    const text = await generateText(contextPrompt);
    res.status(200).json({ content: text });
  } catch (err) {
    console.error("Error during generation:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
