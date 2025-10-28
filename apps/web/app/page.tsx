"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("http://localhost:3000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setResponse(data.content ?? "(no output)");
    } catch (err) {
      setResponse("Error contacting backend.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Ollama Text Generator</h1>
      <textarea
        className="border rounded p-2 w-full max-w-lg h-32"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
      >
        {loading ? "Generating..." : "Generate"}
      </button>
      <div className="mt-6 w-full max-w-lg border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">Output:</h2>
        <pre className="whitespace-pre-wrap text-sm">{response}</pre>
      </div>
    </main>
  );
}
