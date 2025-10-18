// server.js
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/predict", async (req, res) => {
  try {
    // Forward request to Python API
    const response = await axios.post("http://127.0.0.1:5000/predict", req.body);
    res.json(response.data); // Send back prediction to frontend
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Node.js backend running on port 3000");
});
