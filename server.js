const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Mongo URI logging (for debugging)
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not found in environment variables");
  process.exit(1);
} else {
  console.log("✅ MONGO_URI loaded");
}

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/workouts', require('./routes/workoutRoutes'));
app.use('/api/diets', require('./routes/dietRoutes'));
// app.use('/api/users', require('./routes/userRoutes')); // Optional, for profile feature

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB Atlas");
  app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
})
.catch((err) => {
  console.error("❌ MongoDB connection error:");
  console.error(err);
});
