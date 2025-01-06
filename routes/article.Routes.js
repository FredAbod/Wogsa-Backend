const express = require('express');
const Article = require('../models/Article');

const router = express.Router();

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch articles' });
  }
});

// Add a new article (Admin only)
router.post('/', async (req, res) => {
  try {
    const { title, summary, content, category } = req.body;
    const newArticle = new Article({ title, summary, content, category });
    await newArticle.save();
    res.status(201).json({ message: 'Article added successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to add article' });
  }
});

module.exports = router;
