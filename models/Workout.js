const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  day: { type: String, required: true },
  exercises: { type: [String], required: true }
});

module.exports = mongoose.model("Workout", workoutSchema);
