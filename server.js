const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Check for MongoDB URI
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not found in environment variables");
  process.exit(1);
} else {
  console.log("✅ MONGO_URI loaded");
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB Atlas");

  // Start the server after DB connection
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));         // login & register
app.use('/api/workouts', require('./routes/workoutRoutes')); // workout plans
app.use('/api/diets', require('./routes/dietRoutes'));       // diet plans
// app.use('/api/users', require('./routes/userRoutes'));    // optional

// Default route to test server
app.get('/', (req, res) => {
  res.send("🚀 PowerZone Gym API is running");
});
