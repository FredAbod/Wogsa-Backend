const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Routes
const devotionalRoutes = require('./routes/devotional.Routes');
const prayerRoutes = require('./routes/prayer.Routes');
const articlesRoutes = require('./routes/article.Routes');
const eventsRoutes = require('./routes/events.Routes');
const contactRoutes = require('./routes/contact.Routes');

app.use('/api/contacts', contactRoutes);
app.use('/api/devotional', devotionalRoutes);
app.use('/api/prayer', prayerRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/events', eventsRoutes);

// Home page
app.get('/', (req, res) => {
  res.send('Welcome to the WOGSA API');
});


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
