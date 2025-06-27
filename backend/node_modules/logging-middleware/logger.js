import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

const LOGGING_ENDPOINT = "http://20.244.56.144/evaluation-service/logs";

// Read token from env
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

export default async function log(stack, level, pkg, message) {
  try {
    if (!ACCESS_TOKEN) {
      console.error("ACCESS_TOKEN is undefined. Please check your .env file.");  
      return;
    }

    const res = await axios.post(
      LOGGING_ENDPOINT,
      {
        stack,
        level,
        package: pkg,                                          
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Log sent:", res.status);
  } catch (err) {
    console.error("Failed to send log:", err.response?.status, err.response?.data);
  }
}
