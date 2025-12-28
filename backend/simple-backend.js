const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

console.log("Starting server...");

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

// Mock data
const assignments = [
  {
    _id: "1",
    title: "Basic SELECT Query",
    description: "Get all columns from employees",
    difficulty: "beginner"
  }
];

// Get all assignments
app.get("/api/assignments", (req, res) => {
  res.json(assignments);
});

// Get single assignment
app.get("/api/assignments/:id", (req, res) => {
  const assignment = assignments.find(a => a._id === req.params.id);
  if (!assignment) {
    return res.status(404).json({ error: "Not found" });
  }
  res.json(assignment);
});

// Execute query
app.post("/api/execute", (req, res) => {
  const { query } = req.body;
  
  if (!query) {
    return res.status(400).json({ error: "Query required" });
  }
  
  res.json({
    success: true,
    columns: ["id", "name"],
    rows: [{ id: 1, name: "John Doe" }],
    rowCount: 1,
    executionTime: 100
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("✅ Server running on http://localhost:5000");
  console.log("✅ Test: http://localhost:5000/api/health");
});