// Ollama client library for text generation
// Supports both full text generation and streaming responses

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const DEFAULT_MODEL = process.env.OLLAMA_MODEL || "gemma2:2b";

/**
 * Generate text using Ollama API
 * @param {string} prompt - The input prompt
 * @param {Object} options - Generation options
 * @returns {Promise<string>} - Generated text
 */
async function generateText(
  prompt,
  {
    model = DEFAULT_MODEL,
    max_tokens = 512,
    temperature = 0.7,
    stream = false,
  } = {},
) {
  try {
    const res = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        prompt,
        stream: false, // We want complete response for this function
        options: {
          num_predict: max_tokens,
          temperature: temperature,
        },
      }),
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => "");
      throw new Error(
        `Ollama API error: ${res.status} ${res.statusText}. ${errorText}`,
      );
    }

    const text = await res.text();

    // Parse the response - Ollama returns NDJSON (newline-delimited JSON)
    return parseOllamaResponse(text);
  } catch (error) {
    console.error("Error in generateText:", error);
    throw new Error(`Failed to generate text: ${error.message}`);
  }
}

/**
 * Parse Ollama's response format
 * Ollama can return either NDJSON (multiple JSON objects separated by newlines)
 * or a single JSON object
 */
function parseOllamaResponse(text) {
  if (!text || text.trim() === "") {
    return "";
  }

  try {
    // Split by newlines to handle NDJSON format
    const lines = text.trim().split("\n");
    let fullResponse = "";

    for (const line of lines) {
      if (!line.trim()) continue;

      try {
        const parsed = JSON.parse(line);

        // Ollama's response structure includes a "response" field
        if (parsed.response) {
          fullResponse += parsed.response;
        }

        // Alternative field names that might be present
        if (parsed.text) {
          fullResponse += parsed.text;
        }

        if (parsed.content) {
          fullResponse += parsed.content;
        }
      } catch (e) {
        // If a line is not JSON, it might be plain text
        fullResponse += line;
      }
    }

    return fullResponse.trim() || text.trim();
  } catch (error) {
    // If all parsing fails, return the raw text
    console.warn(
      "Failed to parse Ollama response, returning raw text:",
      error.message,
    );
    return text.trim();
  }
}

/**
 * Stream text generation from Ollama
 * Returns an async generator that yields text chunks as they arrive
 * @param {string} prompt - The input prompt
 * @param {Object} options - Generation options
 * @returns {AsyncGenerator<string>} - Async generator yielding text chunks
 */
async function* streamGenerate(
  prompt,
  { model = DEFAULT_MODEL, max_tokens = 512, temperature = 0.7 } = {},
) {
  try {
    const res = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        prompt,
        stream: true,
        options: {
          num_predict: max_tokens,
          temperature: temperature,
        },
      }),
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => "");
      throw new Error(
        `Ollama stream error: ${res.status} ${res.statusText}. ${errorText}`,
      );
    }

    if (!res.body) {
      throw new Error("Response body is not readable");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      // Decode the chunk
      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      // Process complete lines from the buffer
      const lines = buffer.split("\n");
      buffer = lines.pop() || ""; // Keep incomplete line in buffer

      for (const line of lines) {
        if (!line.trim()) continue;

        try {
          const parsed = JSON.parse(line);

          // Yield the response text if available
          if (parsed.response) {
            yield parsed.response;
          }

          // Check if this is the final chunk
          if (parsed.done) {
            return;
          }
        } catch (e) {
          // If line is not valid JSON, yield it as-is
          if (line.trim()) {
            yield line;
          }
        }
      }
    }

    // Process any remaining buffer
    if (buffer.trim()) {
      try {
        const parsed = JSON.parse(buffer);
        if (parsed.response) {
          yield parsed.response;
        }
      } catch (e) {
        yield buffer;
      }
    }
  } catch (error) {
    console.error("Error in streamGenerate:", error);
    throw new Error(`Failed to stream text: ${error.message}`);
  }
}

/**
 * Chat completion using Ollama's chat API
 * @param {Array} messages - Array of message objects with role and content
 * @param {Object} options - Generation options
 * @returns {Promise<string>} - Generated response
 */
async function chatCompletion(
  messages,
  { model = DEFAULT_MODEL, temperature = 0.7, max_tokens = 512 } = {},
) {
  try {
    const res = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        stream: false,
        options: {
          num_predict: max_tokens,
          temperature: temperature,
        },
      }),
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => "");
      throw new Error(
        `Ollama chat API error: ${res.status} ${res.statusText}. ${errorText}`,
      );
    }

    const data = await res.json();

    // Extract the assistant's message
    if (data.message && data.message.content) {
      return data.message.content;
    }

    // Fallback parsing
    return parseOllamaResponse(JSON.stringify(data));
  } catch (error) {
    console.error("Error in chatCompletion:", error);
    throw new Error(`Failed to get chat completion: ${error.message}`);
  }
}

/**
 * List available models
 * @returns {Promise<Array>} - Array of available model names
 */
async function listModels() {
  try {
    const res = await fetch(`${OLLAMA_URL}/api/tags`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Failed to list models: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data.models || [];
  } catch (error) {
    console.error("Error listing models:", error);
    return [];
  }
}

/**
 * Check if Ollama server is running and accessible
 * @returns {Promise<boolean>} - True if server is accessible
 */
async function checkHealth() {
  try {
    const res = await fetch(`${OLLAMA_URL}/api/tags`, {
      method: "GET",
    });
    return res.ok;
  } catch (error) {
    console.error("Ollama health check failed:", error.message);
    return false;
  }
}

export {
  generateText,
  streamGenerate,
  chatCompletion,
  listModels,
  checkHealth,
  OLLAMA_URL,
  DEFAULT_MODEL,
};
