import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js";
import achieverRoutes from "./routes/achieverRoutes.js";
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
      "https://portfolio-three-jet-53.vercel.app"
    ],
    credentials: true,
  })
);

// Connect DB
connectDB();

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/achievers", achieverRoutes);
app.use('/api/reviews', reviewRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});
// In Express.js
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
