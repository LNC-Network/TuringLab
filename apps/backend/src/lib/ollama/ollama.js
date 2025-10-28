// /C:/Users/jitde/OneDrive/Desktop/TuringLab/apps/backend/src/lib/ollama/ollama.js
// Simple helper to call a local Ollama server (default: http://localhost:11434).
// Requires Node 18+ (global fetch). Exports generateText (returns full text) and streamGenerate (async generator of raw chunks).

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";

async function generateText(
  prompt,
  { model = "gemma3:1b", max_tokens = 512, temperature = 0.7 } = {}
) {
  const res = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      prompt,
      // including common tuning options; Ollama accepts many shapes, server will ignore unknown fields
      max_tokens,
      temperature,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Ollama generate failed: ${res.status} ${res.statusText} ${body}`
    );
  }

  // Try to return the response as plain text. Ollama often streams NDJSON; many setups also return a full JSON blob.
  const raw = await res.text();
  // If it's JSON, try to extract human-readable parts heuristically
  try {
    const parsed = JSON.parse(raw);
    // common shape: parsed?.output -> array of {type: 'output_text', text: '...'}
    if (parsed && Array.isArray(parsed.output)) {
      return parsed.output.map((o) => o.text ?? o.content ?? "").join("");
    }
    // fallback: if there's a 'text' or 'answer' field
    if (parsed && (parsed.text || parsed.answer || parsed.content)) {
      return parsed.text ?? parsed.answer ?? parsed.content;
    }
  } catch (err) {
    // not JSON -> fallthrough
  }
  return raw;
}

// Async generator that yields raw decoded chunks as they arrive from Ollama (useful for streaming).
async function* streamGenerate(
  prompt,
  { model = "gemma3:1b", max_tokens = 512, temperature = 0.7 } = {}
) {
  const res = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, prompt, max_tokens, temperature }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Ollama stream failed: ${res.status} ${res.statusText} ${body}`
    );
  }

  if (!res.body || !res.body.getReader) {
    // If body isn't a stream, just yield the whole text once
    yield await res.text();
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let done = false;
  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;
    if (value) {
      const chunk = decoder.decode(value, { stream: true });
      // yield raw chunk (could be NDJSON lines or plain text depending on server)
      yield chunk;
    }
  }
}

export {
  generateText,
  streamGenerate,
};