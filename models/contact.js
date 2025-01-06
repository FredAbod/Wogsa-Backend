// models/Contact.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, default: '' },
});

module.exports = mongoose.model('Contact', ContactSchema);
