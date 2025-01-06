const mongoose = require('mongoose');

const prayerRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  requestType: { 
    type: String, 
    enum: ['prayer', 'counseling'], 
    required: true 
  },
  request: { type: String, required: true },
  preferredTime: { 
    type: String,
    required: function() { return this.requestType === 'counseling'; }
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PrayerRequest', prayerRequestSchema);