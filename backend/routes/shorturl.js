const express = require("express");
const router = express.Router();

const {
  createShortUrl,
  getStats,
  redirectToUrl
} = require("../controllers/shorturlController");

// Route to create a new shortened URL
router.post("/shorturls", createShortUrl);

// Route to fetch stats for a shortcode
router.get("/shorturls/:shortcode", getStats);

// Route to redirect to original URL 
router.get("/:shortcode", redirectToUrl);

module.exports = router;
