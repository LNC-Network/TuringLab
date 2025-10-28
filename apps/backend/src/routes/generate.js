import express from "express";
import { generateText } from "../lib/ollama/ollama.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Missing prompt" });

  try {
    const text = await generateText(prompt);
    res.status(200).json({ content: text });
  } catch (err) {
    console.error("Error during generation:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
