// routes/contacts.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// @route   GET /api/contacts
// @desc    Get all contact information
// @access  Public
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/contacts
// @desc    Add new contact information
// @access  Private
router.post('/', async (req, res) => {
  const { name, role, phone, email, description } = req.body;

  if (!name || !role || !phone || !email) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const newContact = new Contact({
      name,
      role,
      phone,
      email,
      description,
    });

    const contact = await newContact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({ message: 'Contact removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});


// @route   PUT /api/contacts/:id
// @desc    Edit a contact
// @access  Private
router.put('/:id', async (req, res) => {
  const { name, role, phone, email, description } = req.body;

  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.name = name || contact.name;
    contact.role = role || contact.role;
    contact.phone = phone || contact.phone;
    contact.email = email || contact.email;
    contact.description = description || contact.description;

    const updatedContact = await contact.save();
    res.json(updatedContact);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get Single Contact
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
