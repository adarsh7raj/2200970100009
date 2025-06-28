import express from "express";
import {
  createShortUrl,
  getStats,
  redirectToUrl
} from "../controller/shorturlController.js"; // 

const router = express.Router();

// Route to create a new shortened URL
router.post("/shorturls", createShortUrl);

// Route to fetch stats for a shortcode
router.get("/shorturls/:shortcode", getStats);

// Route to redirect to original URL 
router.get("/:shortcode", redirectToUrl);

export default router;
