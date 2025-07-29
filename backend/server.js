const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/workouts', require('./routes/workoutRoutes'));
app.use('/api/diets', require('./routes/dietRoutes'));
// app.use('/api/users', require('./routes/userRoutes')); // ← Enable later when ready

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => app.listen(5000, () => console.log("✅ Server running on port 5000")))
.catch(err => console.error("❌ MongoDB connection error:", err));
