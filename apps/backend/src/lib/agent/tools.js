// Tools registry and execution handler for AI agent
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";

const execAsync = promisify(exec);

/**
 * Available tools that the AI agent can use
 */
export const availableTools = [
  {
    name: "calculator",
    description: "Perform mathematical calculations. Supports basic arithmetic and common math operations.",
    parameters: {
      expression: "string - The mathematical expression to evaluate (e.g., '2 + 2', '10 * 5 + 3')",
    },
  },
  {
    name: "web_search",
    description: "Search for information on the web. Returns relevant search results.",
    parameters: {
      query: "string - The search query",
    },
  },
  {
    name: "get_current_time",
    description: "Get the current date and time in various formats.",
    parameters: {
      timezone: "string - Optional timezone (default: 'UTC', can be 'local', 'UTC', or specific timezone)",
    },
  },
  {
    name: "file_operations",
    description: "Read or list files in the current directory (restricted for security).",
    parameters: {
      operation: "string - Operation to perform: 'list' or 'read'",
      path: "string - Optional file path for 'read' operation",
    },
  },
  {
    name: "code_executor",
    description: "Execute simple code snippets in JavaScript. Use with caution.",
    parameters: {
      code: "string - JavaScript code to execute",
    },
  },
];

/**
 * Execute a tool by name with given parameters
 * @param {string} toolName - Name of the tool to execute
 * @param {Object} parameters - Parameters for the tool
 * @returns {Object} - Result of tool execution
 */
export async function executeTool(toolName, parameters = {}) {
  try {
    switch (toolName.toLowerCase()) {
      case "calculator":
        return await executeCalculator(parameters);

      case "web_search":
        return await executeWebSearch(parameters);

      case "get_current_time":
        return await getCurrentTime(parameters);

      case "file_operations":
        return await executeFileOperations(parameters);

      case "code_executor":
        return await executeCode(parameters);

      default:
        return {
          error: `Unknown tool: ${toolName}`,
          response: `The tool '${toolName}' is not available. Available tools: ${availableTools.map(t => t.name).join(", ")}`,
        };
    }
  } catch (error) {
    return {
      error: error.message,
      response: `Tool execution failed: ${error.message}`,
    };
  }
}

/**
 * Calculator tool - safely evaluate mathematical expressions
 */
async function executeCalculator(params) {
  const { expression } = params;

  if (!expression) {
    return {
      error: "Missing expression parameter",
      response: "Please provide a mathematical expression to calculate.",
    };
  }

  // Security: Only allow numbers and basic math operators
  const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, "");

  if (sanitized !== expression) {
    return {
      error: "Invalid expression",
      response: "Expression contains invalid characters. Only numbers and operators (+, -, *, /, parentheses) are allowed.",
    };
  }

  try {
    // Use Function constructor for safer evaluation than eval
    const result = new Function(`return ${sanitized}`)();

    return {
      success: true,
      result: result,
      response: `The result of ${expression} is ${result}`,
    };
  } catch (error) {
    return {
      error: "Calculation failed",
      response: `Could not calculate '${expression}'. Error: ${error.message}`,
    };
  }
}

/**
 * Web search tool - simulated (you can integrate with real search APIs)
 */
async function executeWebSearch(params) {
  const { query } = params;

  if (!query) {
    return {
      error: "Missing query parameter",
      response: "Please provide a search query.",
    };
  }

  // Note: This is a placeholder. In production, integrate with:
  // - Google Custom Search API
  // - Bing Search API
  // - DuckDuckGo API
  // - Or web scraping services

  return {
    success: true,
    query: query,
    response: `I would search for "${query}", but web search integration is not yet configured. To enable this, you need to add a search API key to your environment variables and implement the actual search logic in the tools.js file.`,
    note: "Web search is currently simulated. Add API integration for real results.",
  };
}

/**
 * Get current time tool
 */
async function getCurrentTime(params) {
  const { timezone = "UTC" } = params;

  try {
    const now = new Date();
    let timeString;
    let dateString;

    if (timezone.toLowerCase() === "local") {
      timeString = now.toLocaleTimeString();
      dateString = now.toLocaleDateString();
    } else if (timezone.toUpperCase() === "UTC") {
      timeString = now.toUTCString();
      dateString = now.toISOString().split("T")[0];
    } else {
      // Try to use the timezone
      timeString = now.toLocaleTimeString("en-US", { timeZone: timezone });
      dateString = now.toLocaleDateString("en-US", { timeZone: timezone });
    }

    return {
      success: true,
      timestamp: now.toISOString(),
      time: timeString,
      date: dateString,
      timezone: timezone,
      response: `Current time (${timezone}): ${dateString} ${timeString}`,
    };
  } catch (error) {
    return {
      error: "Invalid timezone",
      response: `Could not get time for timezone '${timezone}'. Please use 'UTC', 'local', or a valid IANA timezone name.`,
    };
  }
}

/**
 * File operations tool - restricted for security
 */
async function executeFileOperations(params) {
  const { operation, path: filePath } = params;

  if (!operation) {
    return {
      error: "Missing operation parameter",
      response: "Please specify an operation: 'list' or 'read'",
    };
  }

  try {
    if (operation === "list") {
      // List files in current directory only
      const files = await fs.readdir(process.cwd());
      return {
        success: true,
        files: files,
        response: `Files in current directory: ${files.slice(0, 20).join(", ")}${files.length > 20 ? "..." : ""}`,
      };
    } else if (operation === "read") {
      if (!filePath) {
        return {
          error: "Missing path parameter",
          response: "Please provide a file path to read.",
        };
      }

      // Security: Prevent path traversal
      const normalizedPath = path.normalize(filePath);
      if (normalizedPath.includes("..") || path.isAbsolute(normalizedPath)) {
        return {
          error: "Access denied",
          response: "Cannot access files outside the current directory for security reasons.",
        };
      }

      const content = await fs.readFile(filePath, "utf-8");
      const preview = content.length > 500 ? content.slice(0, 500) + "..." : content;

      return {
        success: true,
        path: filePath,
        size: content.length,
        preview: preview,
        response: `File content (${content.length} characters): ${preview}`,
      };
    } else {
      return {
        error: "Invalid operation",
        response: "Operation must be 'list' or 'read'",
      };
    }
  } catch (error) {
    return {
      error: error.message,
      response: `File operation failed: ${error.message}`,
    };
  }
}

/**
 * Code executor tool - execute simple JavaScript
 */
async function executeCode(params) {
  const { code } = params;

  if (!code) {
    return {
      error: "Missing code parameter",
      response: "Please provide code to execute.",
    };
  }

  // Security warning: This is dangerous in production!
  // Only enable this for trusted environments or with heavy sandboxing

  const MAX_EXECUTION_TIME = 5000; // 5 seconds timeout

  try {
    // Create a promise that will execute the code
    const executionPromise = new Promise((resolve, reject) => {
      try {
        // Create a sandboxed context (limited security)
        const result = new Function(`
          "use strict";
          ${code}
        `)();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });

    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Execution timeout")), MAX_EXECUTION_TIME)
    );

    // Race between execution and timeout
    const result = await Promise.race([executionPromise, timeoutPromise]);

    return {
      success: true,
      result: String(result),
      response: `Code executed successfully. Result: ${String(result)}`,
      warning: "Code execution is restricted for security. Some operations may not work.",
    };
  } catch (error) {
    return {
      error: error.message,
      response: `Code execution failed: ${error.message}`,
    };
  }
}

/**
 * Get tool by name
 */
export function getTool(toolName) {
  return availableTools.find(
    (tool) => tool.name.toLowerCase() === toolName.toLowerCase()
  );
}

/**
 * Validate tool parameters
 */
export function validateToolParameters(toolName, parameters) {
  const tool = getTool(toolName);

  if (!tool) {
    return {
      valid: false,
      error: `Tool '${toolName}' not found`,
    };
  }

  // Basic validation - check if required parameters are present
  // This is a simple implementation; you can make it more sophisticated

  return {
    valid: true,
    tool: tool,
  };
}
