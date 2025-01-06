const express = require('express');
const PrayerRequest = require('../models/prayerRequest');

const router = express.Router();

// Submit a prayer request
router.post('/', async (req, res) => {
    try {
      const { name, email, requestType, request, preferredTime } = req.body;
  
      // Validation
      if (!name || !email || !requestType || !request) {
        return res.status(400).json({ message: 'All required fields must be filled' });
      }
  
      if (requestType === 'counseling' && !preferredTime) {
        return res.status(400).json({ message: 'Preferred time is required for counseling requests' });
      }
  
      const newRequest = new PrayerRequest({
        name,
        email,
        requestType,
        request,
        preferredTime,
        status: 'pending'
      });
  
      await newRequest.save();
  
      res.status(201).json({ 
        message: `${requestType === 'prayer' ? 'Prayer' : 'Counseling'} request submitted successfully` 
      });
    } catch (err) {
      console.error('Prayer request submission error:', err);
      res.status(500).json({ message: 'Server error while submitting request' });
    }
  });
// Get all prayer requests (Admin only)
router.get('/', async (req, res) => {
  try {
    const requests = await PrayerRequest.find().sort({ date: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch prayer requests' });
  }
});

module.exports = router;
