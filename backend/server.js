const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Path to testimonials JSON file
const TESTIMONIALS_FILE = path.join(__dirname, 'data', 'testimonials.json');

// Utility function to read testimonials from file
const readTestimonials = () => {
  try {
    if (fs.existsSync(TESTIMONIALS_FILE)) {
      const data = fs.readFileSync(TESTIMONIALS_FILE, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading testimonials file:', error);
    return [];
  }
};

// Utility function to write testimonials to file
const writeTestimonials = (testimonials) => {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(TESTIMONIALS_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(TESTIMONIALS_FILE, JSON.stringify(testimonials, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing testimonials file:', error);
    return false;
  }
};

// Generate unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Routes

// GET /api/testimonials - Get all testimonials
app.get('/api/testimonials', (req, res) => {
  console.log('📡 API: GET /api/testimonials');
  const testimonials = readTestimonials();
  res.json({
    success: true,
    data: testimonials,
    count: testimonials.length
  });
});

// POST /api/testimonials - Add new testimonial
app.post('/api/testimonials', (req, res) => {
  console.log('📡 API: POST /api/testimonials');
  console.log('Request body:', req.body);
  
  const { userName, position, company, message } = req.body;
  
  // Validation
  if (!userName || !position || !company || !message) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required'
    });
  }
  
  // Create new testimonial
  const newTestimonial = {
    id: generateId(),
    userName: userName.trim(),
    position: position.trim(),
    company: company.trim(),
    message: message.trim(),
    timestamp: new Date().toISOString(),
    approved: true
  };
  
  // Read existing testimonials
  const testimonials = readTestimonials();
  
  // Add new testimonial to the beginning
  testimonials.unshift(newTestimonial);
  
  // Write back to file
  if (writeTestimonials(testimonials)) {
    console.log('✅ API: Testimonial saved successfully');
    res.status(201).json({
      success: true,
      message: 'Testimonial added successfully',
      data: newTestimonial
    });
  } else {
    console.error('❌ API: Failed to save testimonial');
    res.status(500).json({
      success: false,
      error: 'Failed to save testimonial'
    });
  }
});

// GET /api/testimonials/:id - Get specific testimonial
app.get('/api/testimonials/:id', (req, res) => {
  const testimonials = readTestimonials();
  const testimonial = testimonials.find(t => t.id === req.params.id);
  
  if (testimonial) {
    res.json({
      success: true,
      data: testimonial
    });
  } else {
    res.status(404).json({
      success: false,
      error: 'Testimonial not found'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Portfolio Testimonials API is running',
    timestamp: new Date().toISOString()
  });
});

// Default route
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio Testimonials API',
    version: '1.0.0',
    endpoints: {
      'GET /api/testimonials': 'Get all testimonials',
      'POST /api/testimonials': 'Add new testimonial',
      'GET /api/testimonials/:id': 'Get specific testimonial',
      'GET /health': 'Health check'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio Testimonials API running on port ${PORT}`);
  console.log(`📂 Testimonials file: ${TESTIMONIALS_FILE}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`📊 API endpoint: http://localhost:${PORT}/api/testimonials`);
});

module.exports = app;
