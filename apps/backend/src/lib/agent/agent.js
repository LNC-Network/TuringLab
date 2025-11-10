// AI Agent orchestrator with tool execution capabilities
import { generateText } from "../ollama/ollama.js";
import { availableTools, executeTool } from "./tools.js";

/**
 * Execute an AI agent with tool-calling capabilities
 * @param {string} userPrompt - The user's input
 * @param {Array} conversationHistory - Previous conversation context
 * @returns {Object} - Response with content, tools used, and execution steps
 */
export async function executeAgentWithTools(userPrompt, conversationHistory = []) {
  const maxIterations = 5;
  let currentIteration = 0;
  const steps = [];
  const toolsUsed = [];
  let finalResponse = "";

  // Build the system prompt that teaches the LLM how to use tools
  const systemPrompt = buildSystemPrompt();

  // Build conversation context
  let context = buildContext(conversationHistory, userPrompt);

  while (currentIteration < maxIterations) {
    currentIteration++;

    // Generate response from LLM
    const llmPrompt = `${systemPrompt}\n\n${context}\n\nAssistant:`;
    const llmResponse = await generateText(llmPrompt, {
      temperature: 0.7,
      max_tokens: 1024,
    });

    steps.push({
      iteration: currentIteration,
      type: "llm_response",
      content: llmResponse,
    });

    // Check if the LLM wants to use a tool
    const toolCall = parseToolCall(llmResponse);

    if (toolCall) {
      // Execute the tool
      const toolResult = await executeTool(toolCall.name, toolCall.parameters);

      toolsUsed.push({
        name: toolCall.name,
        parameters: toolCall.parameters,
        result: toolResult,
      });

      steps.push({
        iteration: currentIteration,
        type: "tool_execution",
        tool: toolCall.name,
        parameters: toolCall.parameters,
        result: toolResult,
      });

      // Add tool result to context
      context += `\n\nAssistant: ${llmResponse}\n\nTool Result: ${JSON.stringify(toolResult)}`;

      // If tool execution failed, break and return error
      if (toolResult.error) {
        finalResponse = `I tried to use the ${toolCall.name} tool, but encountered an error: ${toolResult.error}. ${toolResult.response || ""}`;
        break;
      }
    } else {
      // No tool call detected, this is the final response
      finalResponse = cleanResponse(llmResponse);
      break;
    }
  }

  // If we hit max iterations, provide a summary
  if (currentIteration >= maxIterations && !finalResponse) {
    finalResponse = "I've completed multiple steps to help you. " +
      (toolsUsed.length > 0
        ? `I used the following tools: ${toolsUsed.map(t => t.name).join(", ")}.`
        : "");
  }

  return {
    response: finalResponse || "I apologize, but I couldn't complete that task.",
    toolsUsed,
    steps,
    iterations: currentIteration,
  };
}

/**
 * Build the system prompt that teaches the LLM how to use tools
 */
function buildSystemPrompt() {
  const toolDescriptions = availableTools.map(tool =>
    `- ${tool.name}: ${tool.description}\n  Parameters: ${JSON.stringify(tool.parameters)}`
  ).join("\n");

  return `You are an AI assistant with access to tools. You can use tools to help answer questions and complete tasks.

Available tools:
${toolDescriptions}

To use a tool, respond with the following format:
TOOL_CALL: tool_name
PARAMETERS: {"param1": "value1", "param2": "value2"}

After using a tool, you will receive the result. You can then use another tool or provide a final answer.
When you have enough information to answer the user's question, provide a clear, natural language response WITHOUT the TOOL_CALL format.

Important:
- Only use TOOL_CALL when you actually need to execute a tool
- When answering the user, do NOT use the TOOL_CALL format
- Be conversational and helpful
- If a tool fails, explain the issue to the user`;
}

/**
 * Build conversation context from history
 */
function buildContext(history, currentPrompt) {
  let context = "";

  if (history.length > 0) {
    context = history.map(msg =>
      `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
    ).join("\n");
    context += "\n";
  }

  context += `User: ${currentPrompt}`;

  return context;
}

/**
 * Parse tool call from LLM response
 * Looks for TOOL_CALL: tool_name and PARAMETERS: {...}
 */
function parseToolCall(response) {
  const toolCallMatch = response.match(/TOOL_CALL:\s*(\w+)/i);
  const parametersMatch = response.match(/PARAMETERS:\s*(\{.*?\})/is);

  if (toolCallMatch) {
    const toolName = toolCallMatch[1];
    let parameters = {};

    if (parametersMatch) {
      try {
        parameters = JSON.parse(parametersMatch[1]);
      } catch (e) {
        console.error("Failed to parse tool parameters:", e);
        parameters = {};
      }
    }

    return {
      name: toolName,
      parameters,
    };
  }

  return null;
}

/**
 * Clean the final response by removing any tool call syntax
 */
function cleanResponse(response) {
  // Remove TOOL_CALL and PARAMETERS lines
  let cleaned = response.replace(/TOOL_CALL:.*$/gim, "");
  cleaned = cleaned.replace(/PARAMETERS:.*$/gim, "");

  // Trim whitespace
  cleaned = cleaned.trim();

  return cleaned;
}

/**
 * Simple agent execution without tools (fallback)
 */
export async function executeSimpleAgent(userPrompt, conversationHistory = []) {
  const context = buildContext(conversationHistory, userPrompt);
  const prompt = `You are a helpful AI assistant. Respond to the user's question naturally and conversationally.\n\n${context}\n\nAssistant:`;

  const response = await generateText(prompt, {
    temperature: 0.7,
    max_tokens: 1024,
  });

  return {
    response: cleanResponse(response),
    toolsUsed: [],
    steps: [{
      iteration: 1,
      type: "llm_response",
      content: response,
    }],
    iterations: 1,
  };
}
