const express = require('express');
const Devotional = require('../models/devotional');

const router = express.Router();

// Get today's devotional
router.get('/', async (req, res) => {
  try {
    const devotional = await Devotional.findOne().sort({ date: -1 });
    res.json(devotional);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch devotional' });
  }
});

// Add a new devotional (Admin only)
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newDevotional = new Devotional({ title, content });
    await newDevotional.save();
    res.status(201).json({ message: 'Devotional added successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to add devotional' });
  }
});

module.exports = router;
