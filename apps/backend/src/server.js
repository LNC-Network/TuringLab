import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import generateRouter from "./routes/generate.js";
import agentRouter from "./routes/agent.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/api", generateRouter);
app.use("/api", agentRouter);

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "TuringLab Backend API",
    endpoints: {
      generate: "POST /api/generate",
      agent: "POST /api/agent",
    },
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server is running at http://${HOST}:${PORT}`);
  console.log(`📝 Endpoints:`);
  console.log(`   - POST http://${HOST}:${PORT}/api/generate`);
  console.log(`   - POST http://${HOST}:${PORT}/api/agent`);
});
