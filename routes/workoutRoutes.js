const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { day, exercises } = req.body;
    const workout = new Workout({ day, exercises });
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

module.exports = router;
