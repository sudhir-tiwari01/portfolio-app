const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Testimonial = require('../models/Testimonial');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI not set in .env');
  process.exit(1);
}

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const filePath = path.join(__dirname, '..', 'data', 'testimonials.json');
    if (!fs.existsSync(filePath)) {
      console.log('No testimonials.json file found to import');
      process.exit(0);
    }

    const raw = fs.readFileSync(filePath, 'utf8');
    const items = JSON.parse(raw);
    if (!Array.isArray(items) || items.length === 0) {
      console.log('No testimonials to import');
      process.exit(0);
    }

    // Optional: you may want to dedupe here; this script simply inserts
    const result = await Testimonial.insertMany(items.map(i => ({
      userName: i.userName || i.name || 'Anonymous',
      position: i.position || '',
      company: i.company || '',
      message: i.message || i.text || '',
      avatarUrl: i.avatarUrl || i.avatar || '',
      timestamp: i.timestamp ? new Date(i.timestamp) : new Date(),
      approved: i.approved === undefined ? true : !!i.approved
    })));

    console.log('Imported', result.length, 'testimonials');
    process.exit(0);
  } catch (err) {
    console.error('Import failed', err);
    process.exit(1);
  }
}

run();
