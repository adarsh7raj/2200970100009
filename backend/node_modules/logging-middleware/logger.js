const axios = require("axios");
require("dotenv").config(); // 

const LOGGING_ENDPOINT = "http://20.244.56.144/evaluation-service/logs";

/**
 * Sends a log to the evaluation log server.
 * 
 * @param {string} stack - "backend" or "frontend"
 * @param {string} level - One of: "debug", "info", "warn", "error", "fatal"
 * @param {string} pkg - Package name as specified in requirements
 * @param {string} message - Log message
 */
async function log(stack, level, pkg, message) {
  try {
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
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        }
      }
    );
   
    // console.log(res.data);
  } catch (err) {
    console.error("Failed to send log:", err.message);
  }
}

module.exports = log;
