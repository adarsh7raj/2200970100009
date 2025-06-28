import { nanoid } from "nanoid";
import log from "../../logging-middleware/logger.js";

import store from "../utils/store.js";

const hostname = "http://localhost:3000"; //

function isValidUrl(url) {
  try {
    console.log("hi");
    console.log("this is token: "+process.env.ACCESS_TOKEN);
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:"; // this ensures the URL is either HTTP or HTTPS
  } catch {
    return false;
  }
}


function isValidShortcode(code) {
  return /^[a-zA-Z0-9]{4,10}$/.test(code);
}

// Create a new short URL
export const createShortUrl = async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;

  if (!url || !isValidUrl(url)) {
    await log("backend", "error", "handler", "Invalid or missing URL");
    return res.status(400).json({ error: "Invalid or missing URL" });
  }

  let code = shortcode;

  if (shortcode) {
    if (!isValidShortcode(shortcode)) {
      await log("backend", "error", "handler", "Invalid custom shortcode format");
      return res.status(400).json({ error: "Shortcode must be alphanumeric (4–10 chars)" });
    }
    if (store[shortcode]) {
      await log("backend", "error", "handler", "Shortcode collision");
      return res.status(409).json({ error: "Shortcode already in use" });
    }
  } else {
    do {
      code = nanoid(6);
    } while (store[code]);
  }

  const now = new Date();
  const expiry = new Date(now.getTime() + validity * 60_000); // minutes to ms

  store[code] = {
    url,
    createdAt: now.toISOString(),
    expiry: expiry.toISOString(),
    clicks: [],
  };

  await log("backend", "info", "controller", `Short URL created: ${code}`);

  return res.status(201).json({
    shortLink: `${hostname}/${code}`,
    expiry: expiry.toISOString(),
  });
};

// Fetch statistics of a shortcode
// This endpoint returns the original URL, creation date, expiry date, click count, and click
export const getStats = async (req, res) => {
  const code = req.params.shortcode;
  const entry = store[code];

  if (!entry) {
    await log("backend", "error", "handler", "Shortcode not found");
    return res.status(404).json({ error: "Shortcode not found" });
  }

  const now = new Date();
  if (new Date(entry.expiry) < now) {
    await log("backend", "warn", "handler", "Link has expired");
    return res.status(410).json({ error: "Link has expired" });
  }

  await log("backend", "info", "controller", `Stats fetched for shortcode: ${code}`);

  return res.status(200).json({
    originalUrl: entry.url,
    createdAt: entry.createdAt,
    expiry: entry.expiry,
    clickCount: entry.clicks.length,
    clicks: entry.clicks,
  });
};

// Redirect to original URL
export const redirectToUrl = async (req, res) => {
  const code = req.params.shortcode;
  const entry = store[code];

  if (!entry) {
    await log("backend", "error", "handler", "Shortcode not found for redirect");
    return res.status(404).json({ error: "Shortcode not found" });
  }

  const now = new Date();
  if (new Date(entry.expiry) < now) {
    await log("backend", "warn", "handler", "Attempt to access expired link");
    return res.status(410).json({ error: "Link has expired" });
  }

  entry.clicks.push({
    timestamp: now.toISOString(),
    referrer: req.get("Referer") || "direct",
    location: "IN",
  });

  await log("backend", "info", "controller", `Redirecting to: ${entry.url}`);

  return res.redirect(entry.url);
};
