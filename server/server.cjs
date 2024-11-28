const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Example endpoint (optional, if testing locally)
app.get("/", (req, res) => {
  res.send("Server is running.");
});

// Start the Server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
