const express = require("express");
const router = express.Router();
const Diet = require("../models/Diet");

router.get("/", async (req, res) => {
  try {
    const diets = await Diet.find();
    res.json(diets);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { meal, items } = req.body;
    const diet = new Diet({ meal, items });
    await diet.save();
    res.status(201).json(diet);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

module.exports = router;
