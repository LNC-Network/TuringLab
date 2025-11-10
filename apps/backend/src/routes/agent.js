import express from "express";
import { generateText } from "../lib/ollama/ollama.js";
import { executeAgentWithTools } from "../lib/agent/agent.js";

const router = express.Router();

router.post("/agent", async (req, res) => {
  const { prompt, conversationHistory } = req.body;
  if (!prompt) return res.status(400).json({ error: "Missing prompt" });

  try {
    // Build context from conversation history
    let context = [];
    if (conversationHistory && Array.isArray(conversationHistory)) {
      context = conversationHistory.slice(-10); // Keep last 10 messages
    }

    // Execute agent with tool capabilities
    const result = await executeAgentWithTools(prompt, context);

    res.status(200).json({
      content: result.response,
      toolsUsed: result.toolsUsed || [],
      steps: result.steps || []
    });
  } catch (err) {
    console.error("Error during agent execution:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

export default router;
