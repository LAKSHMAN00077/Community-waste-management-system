import express from "express";
import classifyWaste from "../utils/classifyWaste.js";
import multer from "multer";
import fs from "fs/promises";
import path from "path";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/classify", upload.single("image"), async (req, res) => {
  const filePath = req.file.path;

  try {
    const result = await classifyWaste(filePath);

    const predictions = result.predictions || [];
    const counts = {};
    predictions.forEach((pred) => {
      counts[pred.class] = (counts[pred.class] || 0) + 1;
    });

    const total = predictions.length;
    const percentages = {};
    for (let key in counts) {
      percentages[key] = ((counts[key] / total) * 100).toFixed(2);
    }

    await fs.unlink(filePath);

    res.json({ predictions, percentages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Classification failed" });
  }
});

export default router;
