const express = require("express");
const cors = require("cors");
const shortUrlRoutes = require("./routes/shorturl");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/", shortUrlRoutes);

// Port config
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server is running at: http://localhost:${PORT}`);
});
