const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI not set in backend/.env');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas (test-connection.js)');
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message || err);
    process.exit(1);
  });
