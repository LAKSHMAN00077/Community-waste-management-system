import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const classifyWaste = async (imagePath) => {
  const imageData = await fs.readFile(imagePath, { encoding: "base64" });
  const apiKey = process.env.ROBOFLOW_API_KEY;
  const modelEndpoint = "https://serverless.roboflow.com/waste-classification-mwnat-bbonb/3";
  const response = await axios.post(modelEndpoint, imageData, {
    params: { api_key: apiKey },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

export default classifyWaste;
