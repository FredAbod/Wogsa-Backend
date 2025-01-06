const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ['Church', 'Health', 'Legal', 'Business'], required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('churchArticle', articleSchema);
