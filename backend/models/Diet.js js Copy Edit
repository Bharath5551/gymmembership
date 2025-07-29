const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema({
  meal: { type: String, required: true }, // e.g., Breakfast, Lunch, Dinner
  items: { type: [String], required: true }
});

module.exports = mongoose.model("Diet", dietSchema);
