import express from "express";
import cors from "cors";
import shortUrlRoutes from "./routes/shorturl.js"; // Note the `.js` extension in ESM

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/", shortUrlRoutes);

// Port config
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Server is running at: http://localhost:${PORT}`);
});
