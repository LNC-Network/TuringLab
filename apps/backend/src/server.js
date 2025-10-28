import express from "express";
import router from "./routes/generate.js";

const app = express();

app.use(express.json());
// app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
