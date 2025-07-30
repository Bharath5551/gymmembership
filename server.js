const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB URI check
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not found in environment variables");
  process.exit(1);
} else {
  console.log("✅ MONGO_URI loaded");
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Connected to MongoDB Atlas");

  // Start server only after DB is connected
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/workouts', require('./routes/workoutRoutes'));
app.use('/api/diets', require('./routes/dietRoutes'));
// app.use('/api/users', require('./routes/userRoutes')); // Enable when ready

// Fallback test route
app.get('/', (req, res) => {
  res.send("🚀 PowerZone Gym API is running");
});
