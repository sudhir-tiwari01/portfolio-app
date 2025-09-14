const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  message: { type: String, required: true },
  avatarUrl: { type: String },
  timestamp: { type: Date, default: Date.now },
  approved: { type: Boolean, default: true }
});

module.exports = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
