const axios = require("axios");

const LOGGING_ENDPOINT = "http://20.244.56.144/evaluation-service/logs";

/**
 * Sends a structured log to the evaluation server.
 * 
 * @param {string} stack - Either "backend" or "frontend"
 * @param {string} level - One of: "debug", "info", "warn", "error", "fatal"
 * @param {string} pkgName - Name of the package/module sending the log
 * @param {string} message - Descriptive message about the event
 */
async function log(stack, level, pkgName, message) {
  try {
    const res = await axios.post(LOGGING_ENDPOINT, {
      stack,
      level,
      package: pkgName,
      message,
    });

    // Optional: Uncomment this to see log responses during dev
    // console.log("Log sent:", res.data);
  } catch (err) {
    // Local fallback log to terminal
    console.error("Failed to send log to evaluation server:", err.message);
  }
}

module.exports = log;
